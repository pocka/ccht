import type { Browser, Page } from "puppeteer-core";

import { Pool } from "../pool.js";

import type { Crawler, VisitedLink, VisitResult } from "../types";

type EndpointType =
  | {
      type: "ws";
      url: string;
    }
  | {
      type: "http";
      url: string;
    }
  | {
      type: "unknown";
      input: string;
    }
  | {
      type: "none";
    };

type WaitUntil = Required<Parameters<Page["goto"]>>[1]["waitUntil"];

export interface PuppeteerCrawlerOptions {
  concurrency?: number;
  timeout?: number;

  /**
   * `waitUntil` option for puppeteer::Page.goto.
   * https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagegotourl-options
   */
  waitUntil?: WaitUntil;

  executablePath?: string;

  /**
   * Browser's DevTool endpoint.
   * We put this into:
   * - browserWSEndpoint when it starts from "ws://"
   * - browserURL when it starts from "http://" or "https://"
   * PuppeteerCrawler.make will throw an error if this property is not a
   * WebSocket URL nor HTTP(S) URL.
   */
  browserEndpoint?: string;
}

export class PuppeteerCrawler implements Crawler {
  #browser: Browser;
  #pagePool: Pool<Page>;
  #waitUntil: WaitUntil;
  #timeout: number;

  /**
   * Use PuppeteerCrawler.make instead.
   */
  constructor(
    browser: Browser,
    pagePool: Pool<Page>,
    waitUntil: WaitUntil,
    timeout: number
  ) {
    this.#browser = browser;
    this.#pagePool = pagePool;
    this.#waitUntil = waitUntil;
    this.#timeout = timeout;
  }

  async visit(
    url: string,
    visited: Map<string, VisitedLink>
  ): Promise<VisitResult> {
    if (process.env.DEBUG) {
      console.error(`Visiting ${url} ...`);
    }

    const page = await this.#pagePool.take();

    try {
      if (visited.has(url)) {
        return { next: [] };
      }

      page.on("response", (res) => {
        const resourceUrl = res.url();
        const headers = res.headers();

        // Ignore fetched HTML.
        // We'll grab every reachable HTML by crawling.
        if ((headers["content-type"] || "").indexOf("text/html") === 0) {
          return;
        }

        const existing = visited.get(resourceUrl);

        visited.set(resourceUrl, {
          type: "visited",
          status: res.status(),
          referredBy: existing ? [...existing.referredBy, url] : [url],
          headers,
        });
      });

      const pageResponse = await page.goto(url, {
        timeout: this.#timeout,
        waitUntil: this.#waitUntil,
      });

      if (!pageResponse) {
        throw new Error("No response returned by page.goto");
      }

      if (visited.has(url)) {
        return { next: [] };
      }

      const headers = pageResponse.headers();

      visited.set(url, {
        type: "visited",
        status: pageResponse.status(),
        referredBy: [],
        headers,
      });

      // Do not crawl non-HTML contents
      if ((headers["content-type"] || "").indexOf("text/html") !== 0) {
        return { next: [] };
      }

      const baseHref = await page.$$eval(
        "base[href]",
        (base) => base.map((b) => b.getAttribute("href"))[0]
      );
      const baseUrl = baseHref ? new URL(baseHref, url) : url;

      const hrefs = await page.$$eval("a[href]", (anchors) =>
        anchors.map((a) => a.getAttribute("href"))
      );

      return {
        next: hrefs
          .filter((link): link is string => !!link)
          .map((link) => {
            const url = new URL(link, baseUrl);
            // Ignore hash
            url.hash = "";

            return url.href;
          })
          .filter((url, i, urls) => urls.indexOf(url) === i),
      };
    } catch (error) {
      visited.set(url, {
        type: "error",
        error,
        referredBy: [],
      });

      return { next: [] };
    } finally {
      page.removeAllListeners();
      await this.#pagePool.release(page);
    }
  }

  async destroy() {
    this.#pagePool.destroy();
    await this.#browser.close();
  }

  /**
   * Instantiate the crawler from given options.
   */
  static async make({
    concurrency = 1,
    timeout = 5000,
    waitUntil = "domcontentloaded",
    executablePath,
    browserEndpoint,
  }: PuppeteerCrawlerOptions): Promise<PuppeteerCrawler> {
    // Use "puppeteer" package only when a user did not specify a browser
    const { default: puppeteer } =
      !executablePath && !browserEndpoint
        ? await import("puppeteer")
        : await import("puppeteer-core");

    const endpoint: EndpointType =
      executablePath || !browserEndpoint
        ? { type: "none" }
        : browserEndpoint.indexOf("ws://") === 0
        ? { type: "ws", url: browserEndpoint }
        : /^https?:\/\//.test(browserEndpoint)
        ? { type: "http", url: browserEndpoint }
        : { type: "unknown", input: browserEndpoint };

    if (endpoint.type === "unknown") {
      throw new Error("Unknown Puppeteer endpoint: " + endpoint.input);
    }

    const browser =
      endpoint.type === "none"
        ? await puppeteer.launch({
            executablePath,
          })
        : await puppeteer.connect({
            browserWSEndpoint:
              endpoint.type === "ws" ? endpoint.url : undefined,
            browserURL: endpoint.type === "http" ? endpoint.url : undefined,
          });

    const pagePool = await Pool.make(async () => {
      const page = await browser.newPage();

      page.setCacheEnabled(false);

      return page;
    }, concurrency);

    return new PuppeteerCrawler(browser, pagePool, waitUntil, timeout);
  }
}
