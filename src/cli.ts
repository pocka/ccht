import { program } from "commander";

import {
  checkAndReport,
  NodeHttpCrawler,
  CodeFrameReporter,
  JsonReporter,
  PuppeteerCrawler,
  PuppeteerCrawlerOptions,
} from "./index.js";

import type { CheckOptions, Crawler, Reporter, Severity } from "./types";

import * as pkg from "../package.json";

const severities: Severity[] = ["danger", "warning", "info", "debug"];

program
  .version(pkg.version)
  .arguments("<url>")
  .description("Crawl a site starting from the URL then report the result", {
    url: "URL to start from",
  })
  .option("--crawler <name>", "name of crawler", "node-http")
  .option("--reporter <name>", "name of reporter", "code-frame")
  .option("--timeout <ms>", "timeout duration for each pages", "3000")
  .option("--concurrency <int>", "crawling concurrency", "1")
  .option(
    "--useragent <ua string>",
    "[Node-Http crawler] user-agent header value",
    `ccht/${pkg.version}`
  )
  .option(
    "--wait-until <type>",
    "[Puppeteer crawler] waitUntil option for page.goto." +
      "See https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagegotourl-options for available types.",
    "domcontentloaded"
  )
  .option("--include <url>", "comma separated list of include URLs")
  .option("--exclude <url>", "comma separated list of exclude URLs")
  .option(
    "--expected-status <code>",
    "comma separated list of expected HTTP status codes",
    "200"
  )
  .option(
    "--report-type <types>",
    "comma separated list of report types: error, unexpected_status, ok, redirect"
  )
  .option(
    "--report-severity <severities>",
    "comma separated list of severities to report, ignored when --report-type is specified: " +
      severities.join(", "),
    "danger,warning,info"
  )
  .option(
    "--exit-error-severity <severities>",
    "comma separated list of severities to cause an error exit status: " +
      severities.join(", "),
    "danger"
  )
  .option("--json-pretty", "[JSON reporter] enable pretty print")
  .option(
    "--code-frame-full-referrer",
    "[CodeFrame reporter] show every referres"
  )
  .action((url) => {
    run(url, program)
      .then(() => process.exit(0))
      .catch((err) => {
        console.error(err);

        process.exit(1);
      });
  });

program.parse(process.argv);

async function run(
  url: string,
  { crawler, reporter, ...options }: Record<string, string> = {}
) {
  const concurrency = Math.max(1, Number(options.concurrency));
  const timeout = Math.max(0, Number(options.timeout));

  const crawlers: Record<string, () => Promise<Crawler>> = {
    "node-http": async () =>
      new NodeHttpCrawler({
        concurrency,
        timeout,
        useragent: options.useragent,
      }),
    puppeteer: () =>
      PuppeteerCrawler.make({
        concurrency,
        timeout,
        waitUntil: options.waitUntil as PuppeteerCrawlerOptions["waitUntil"],
      }),
  };

  if (!crawlers[crawler]) {
    console.error("Unknown crawler name: " + crawler);
    process.exit(1);
  }

  const reporters: Record<string, () => Reporter> = {
    json: () =>
      new JsonReporter({
        pretty: !!options.jsonPretty,
      }),
    "code-frame": () =>
      new CodeFrameReporter({
        showFullUrl: !!options.codeFrameFullReferrer,
      }),
  };

  if (!reporters[reporter]) {
    console.error("Unknown reporter name: " + reporter);
    process.exit(1);
  }

  return checkAndReport(await crawlers[crawler](), reporters[reporter](), url, {
    includeUrls: options.include ? optionToList(options.include) : [url],
    excludeUrls: options.exclude ? optionToList(options.exclude) : [],
    expectedStatus: options.expectedStatus
      .split(",")
      .map((str) => parseInt(str)),
    reportTypes: options.reportType
      ? (optionToList(options.reportType) as CheckOptions["reportTypes"])
      : undefined,
    reportSeverities: optionToList(options.reportSeverity) as Severity[],
    exitErrorSeverities: optionToList(options.exitErrorSeverity) as Severity[],
  });
}

/**
 * Parse comma separated list
 */
function optionToList(raw: string): string[] {
  return raw.split(",").map((s) => s.trim());
}
