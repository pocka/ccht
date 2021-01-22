---
title: CLI
---

To get a full list of options, run following:

```shell
$ npx ccht --help
```

## Global Options

### `--crawler <name>`

<dl>
  <dt>Available Values</dt>
  <dd><code>node-http</code>, <code>puppeteer</code></dd>

  <dt>Default Value</dt>
  <dd><code>node-http</code></dd>
</dl>

Specify which crawler to use.

#### NodeHTTP Crawler

Use Node.js' HTTP module and [cheerio](https://github.com/cheeriojs/cheerio) for crawling.
Only checks HTML resources.

#### Puppeteer Crawler

Use Chrome or Chromium via puppeteer for crawling.
Checks HTML and every resources loaded by the browser.

### `--reporter <name>`

<dl>
  <dt>Available Values</dt>
  <dd><code>code-frame</code>, <code>json</code></dd>

  <dt>Default Value</dt>
  <dd><code>code-frame</code></dd>
</dl>

Specify which reporter to use.

#### CodeFrame Reporter

Outputs human friendly result, looks simlar to Jest.

#### JSON Reporter

Outputs JSON. Useful for integration or programatic usage.

### `--include <urls>`

<dl>
  <dt>Available Values</dt>
  <dd>Comma separated list of URL</dd>

  <dt>Default Value</dt>
  <dd>Entrypoint URL</dd>
</dl>

URLs to check. ccht ignores URLs does not match to these URLs.

:::info
ccht uses forward matching.
:::

### `--exclude <urls>`

<dl>
  <dt>Available Values</dt>
  <dd>Comma separated list of URL</dd>
</dl>

URLs to ignore. ccht ignores URLs matches to these URLs.

:::info
ccht uses forward matching.
:::

### `--expected-status <list>`

<dl>
  <dt>Available Values</dt>
  <dd>Comma separated list of HTTP status code</dd>

  <dt>Default Value</dt>
  <dd><code>200</code></dd>
</dl>

Expected HTTP status codes.

### `--exit-error-severity <severity>`

<dl>
  <dt>Available Values</dt>
  <dd><code>debug</code>, <code>info</code>, <code>warning</code>, <code>danger</code></dd>

  <dt>Default Value</dt>
  <dd><code>danger</code></dd>
</dl>

ccht will exit with 1 (error status) when one or more of result's serverity matches to the value.

#### How ccht determines severity

- Matches ... OK(DEBUG)
- Does not match but 3xx ... REDIRECT(INFO)
- Does not match ... UNEXPECTED_STATUS(DANGER)

## Crawler Options

### `--timeout <ms>`

<dl>
  <dt>Available for</dt>
  <dd>NodeHTTP, Puppeteer</dd>

  <dt>Available Values</dt>
  <dd>Number (ms)</dd>

  <dt>Default Value</dt>
  <dd><code>3000</code> (3s)</dd>
</dl>

Specifies timeout value for each pages.

### `--concurrency <max>`

<dl>
  <dt>Available for</dt>
  <dd>NodeHTTP, Puppeteer</dd>

  <dt>Available Values</dt>
  <dd>Number (integer, greater than 0)</dd>

  <dt>Default Value</dt>
  <dd><code>1</code></dd>
</dl>

Sets max crawling concurrency.

### `--useragent <string>`

<dl>
  <dt>Available for</dt>
  <dd>NodeHTTP</dd>

  <dt>Available Values</dt>
  <dd>String</dd>

  <dt>Default Value</dt>
  <dd><code>ccht/[version number]</code></dd>
</dl>

Sets UserAgent string used by NodeHTTP Crawler.

### `--wait-until <type>`

<dl>
  <dt>Available for</dt>
  <dd>Puppeteer</dd>

  <dt>Available Values</dt>
  <dd>String</dd>
</dl>

`waitUntil` option for puppeteer's [`page.goto` method](https://pptr.dev/#?product=Puppeteer&version=v5.5.0&show=api-pagegotourl-options).

## Reporter Options

### `--report-type <type>`

<dl>
  <dt>Available for</dt>
  <dd>CodeFrame, JSON</dd>

  <dt>Available Values</dt>
  <dd><code>ok</code>, <code>redirect</code>, <code>unexpected_status</code>, <code>error</code></dd>
</dl>

Sets which result type to report. Setting this option will disable `--report-severity` option.

### `--report-severity <severity>`

<dl>
  <dt>Available for</dt>
  <dd>CodeFrame, JSON</dd>

  <dt>Available Values</dt>
  <dd><code>debug</code>, <code>info</code>, <code>warning</code>, <code>danger</code></dd>

  <dt>Default Value</dt>
  <dd><code>danger,warning,info</code></dd>
</dl>

Sets which result severity to report.

### `--json-pretty`

<dl>
  <dt>Available for</dt>
  <dd>JSON</dd>
</dl>

Enables pretty-print JSON.

### `--code-frame-full-referrer`

<dl>
  <dt>Available for</dt>
  <dd>CodeFrame</dd>
</dl>

Always show all referrers.
