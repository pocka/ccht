# ccht

[![npm](https://img.shields.io/npm/v/ccht)](https://www.npmjs.com/package/ccht)
[![Test and Lint Workflow Status](https://img.shields.io/github/workflow/status/pocka/ccht/Test%20and%20Lint?label=test)](https://github.com/pocka/ccht/actions?query=workflow%3A%22Test+and+Lint%22)
[![Publish Package Workflow Status](https://img.shields.io/github/workflow/status/pocka/ccht/Publish%20package?label=publish)](https://github.com/pocka/ccht/actions?query=workflow%3A%22Publish+package%22)

> Command-line Crawling HTTP Testing tool

ccht is a simple command-line tool to crawl and test your website resources' HTTP status code, like broken link checker.

## Installation

You can skip installation if you use `npx` for one-time invocation.

```sh
$ npm i -D ccht

# or
$ yarn add -D ccht
```

## Usage

```
ccht [options] <url>
```

```sh
# to crawl and test "https://example.com"
$ npx ccht 'https://example.com'

# to show help
$ npx ccht --help
```

ccht will crawl the site starting from the given URL.

## Options

To see more options, run `npx ccht --help`.

### Global Options

#### `--crawler <name>`

Choose crawler. Available crawlers:

##### `node-http`

Default. Crawls pages by using Node.js' HTTP module and [cheerio](https://www.npmjs.com/package/cheerio).

##### `puppeteer`

Crawls pages by using a real browser through [Puppeteer](https://pptr.dev/).
You need to install puppeteer (`npm i -D puppeteer`) or configure your environment (browser DevTool protocol connection, executable.)

#### `--reporter <name>`

Specify reporter, which formats and outputs the test result.

##### `code-frame`

Default. Outputs human-friendly visuallized result.

##### `json`

Prints JSON string.
Useful for a programmatic access to results.

```sh
$ npx ccht 'https://example.com' --reporter=json | jq
```

#### `--include <urls>`

A comma separated list of a URL to include in a result.
Any URLs forward-matching will be crawled and be reported.

Defaults to the given URL.
For example, given `npx ccht 'https://example.com'` then `--include` will be `https://example.com`.

#### `--exclude <urls>`

A comma separated list of a URL to exclude from a result.
Any URLs forward-matching will be skipped nor be removed from a result.

#### `--expected-status <HTTP status codes>`

A comma separated list of an expected HTTP status code for pages.
Any pages responded with other status codes result in error (`unexpected_status`).

Defaults to `200`.

#### `--exit-error-severity <list of severity>`

Change which severities occurs exit status `1`.
Available severities are below:

- `danger`
- `warning`
- `info`
- `debug`

Defaults to `danger`.

### Crawler Options

#### `--timeout <ms>`

Timeout for each page to load/response in crawling phase.
This option value is directly goes to `node-fetch`'s or `puppeteer`'s one.

Defaults to `3000` (3s).

#### `--concurrency <uint>`

How many connection can exist at the same time, a size for connection pool.

Defaults to `1`.
