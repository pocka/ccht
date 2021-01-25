---
title: Node API
slug: /api
---

[types-ts]: https://github.com/pocka/ccht/blob/master/src/types.ts

With ccht's Node.js API, you have more control over crawling and reporting.
In fact, `ccht` CLI is just a wrapper for the Node.js API.

:::info TL;DR
See [our type definition file][types-ts].
:::

## Basic Usage

Run `checkAndReport` function with a crawler and JSON Reporter.
This will cover the most of usecases.

```ts title="Get a result in JSON"
import { checkAndReport, NodeHttpCrawler, JsonReporter } from "ccht";

const results = await checkAndReport(
  new NodeHttpCrawler({
    concurrency: 1,
    timeout: 5000,
    useragent: "ccht/node",
  }),
  new JsonReporter({}),
  "https://example.com",
  {
    // [Required]
    // You need set includeUrls manually
    includeUrls: ["https://example.com"],

    // [Required]
    excludeUrls: [
      // You can use RegExp and Function for match patterns!
      // (same for includeUrls)
      /\.htm$/,
      (url) => url.includes("auth"),
    ],

    // [Required]
    expectedStatus: /^[123]\d\d$/,

    reportTypes: ["error", "unexpected_status"],

    // [Required]
    reportSeverities: ["danger", "warning", "info", "debug"],

    // [Required]
    exitErrorSeverities: ["danger"],
  }
);

// Since reporter always emits strings, you need to deserialize the result.
console.log(JSON.parse(results));
```

For more about the checker options, see `CheckerOptions` in [`types.ts`][types-ts].

## Using your own crawler

Crawler is a simple JavaScript object, implements `visit` method and `destroy` method.

The `visit` async method takes an URL, checks for it somehow, and returns URLs to be crawled later.
To crawl effeciently, you should set and check the second parameter, which is a Map of [`VisitedLink` object](https://github.com/pocka/ccht/blob/master/src/types.ts#L1). A caller checks duplication too, but you need check in the `visit` method especially if your crawler support concurrency.

The `destroy` async method will be called when there is no more resources to crawl.
Free resources in the method (or don't, but your crawler must have the method).

See more at `interface Crawler` in [`types.ts`][types-ts].

```ts title="Ways to implement crawlers"
import { checkAndReport } from "ccht";
import fetch from "node-fetch";

// Simple object with required methods
const objectCrawler = {
  async visit(url, visited) {
    /*...*/
  },
  async destroy() {
    /*...*/
  },
};

await checkAndReport(objectCrawler /*...*/);

// A function that returns a crawle
const functionCrawler = (...params) => {
  return {
    async visit(url, visited) {
      /*...*/
    },
    async destroy() {
      /*...*/
    },
  };
};

await checkAndReport(functionCrawler(foo) /*...*/);

// Class style
class ClassCrawler {
  async visit(url, visited) {
    /*...*/
  }

  async destroy() {
    /*...*/
  }
}

await checkAndReport(new ClassCrawler() /*...*/);

// If you're using TypeScript, you should use `Crawler` interface type.
class ClassCrawler implements Crawler {
  /*...*/
}
const objectCrawler: Crawler = {
  /*...*/
};
const functionCrawler = (): Crawler => {
  /*...*/
};
```
