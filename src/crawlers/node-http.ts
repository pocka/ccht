import fetch from "node-fetch";
import * as cheerio from "cheerio";

import { Pool } from "../pool.js";

import type { Crawler, VisitedLink, VisitResult } from "../types";

export interface NodeHttpCrawlerOptions {
  /**
   * @default 1
   */
  concurrency?: number;

  /**
   * Timeout for HTTP requests in ms.
   * @default 3000
   */
  timeout?: number;

  /**
   * UA string
   */
  useragent?: string;
}

export class NodeHttpCrawler implements Crawler {
  #timeout: number;
  #pool: Pool<boolean>;
  #useragent?: string;

  constructor({
    concurrency = 1,
    timeout = 3000,
    useragent,
  }: NodeHttpCrawlerOptions) {
    this.#timeout = timeout;
    this.#pool = new Pool(Array.from({ length: concurrency }).map(() => true));
    this.#useragent = useragent;
  }

  async visit(
    url: string,
    visited: Map<string, VisitedLink>
  ): Promise<VisitResult> {
    if (visited.has(url)) {
      return { next: [] };
    }

    const r = await this.#pool.take();

    try {
      return await this.__visitInternal(url, visited);
    } finally {
      await this.#pool.release(r);
    }
  }

  __visitInternal(
    url: string,
    visited: Map<string, VisitedLink>
  ): Promise<VisitResult> {
    if (visited.has(url)) {
      return Promise.resolve({
        next: [],
      });
    }

    if (process.env.DEBUG) {
      console.error("Visiting " + url + " ...");
    }

    return fetch(url, {
      method: "GET",
      timeout: this.#timeout,
      redirect: "manual",
      headers: {
        "user-agent": this.#useragent || "ccht/unknown",
      },
    })
      .then(async (res) => {
        if (visited.has(url)) {
          return { next: [] };
        }

        visited.set(url, {
          type: "visited",
          status: res.status,
          referredBy: [],
          headers: res.headers.has("location")
            ? {
                location: res.headers.get("location")!,
              }
            : {},
        });

        if (/^text\/html/.test(res.headers.get("content-type") || "")) {
          return {
            next: crawlLinks(await res.text(), url),
          };
        }

        return { next: [] };
      })
      .catch((error) => {
        if (!visited.has(url)) {
          visited.set(url, {
            type: "error",
            error,
            referredBy: [],
          });
        }

        return { next: [] };
      });
  }

  async destroy() {
    this.#pool.destroy();
  }
}

export function crawlLinks(html: string, currentUrl: string): string[] {
  const $ = cheerio.load(html);

  const baseHref = $("base[href]").attr("href");
  const baseUrl = baseHref ? new URL(baseHref, currentUrl) : currentUrl;

  const hrefs: string[] = $("a[href]")
    .map((i, el) => $(el).attr("href"))
    .get();

  return hrefs
    .filter((href) => !/^mailto:/.test(href))
    .map((href) => {
      if (/^(.+)?:\/\//.test(href)) {
        return href;
      }

      const url = new URL(href, baseUrl);
      url.hash = "";

      return url.href;
    });
}
