---
title: Crawl using Headless Chrome (Chromium)
---

You can crawl a website using Headless Chrome (Chromium) by using Puppeteer Crawler.

The Puppeteer Crawler does not only check pages, but also other site resources such as images, CSS files, and JavaScript files.

## Setup

### With `puppeteer` npm package

In order to use Puppeteer Crawler, you need to make sure you have valid Chrome (Chromium) installation available.
The easiest way to do this is use ccht as a project dependency and install [`puppeteer` package](https://www.npmjs.com/package/puppeteer).
The `puppeteer` package automatically downloads the latest Chromium binary at installation.
ccht use the binary if the `puppeteer` package is available.

```shell
$ yarn add -D ccht puppeteer

# or
$ npm i -D ccht puppeteer
```

## Run

Using Puppeteer Crawler is simple: just add `--crawler puppeteer`.

```shell
$ npx ccht --crawler puppeteer https://example.com
```
