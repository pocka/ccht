---
id: introduction
title: Introduction
slug: /
---

ccht is a Node.js library to crawl website and report dead links (broken links), or its wrapper CLI.
The most common usage is detecting pages or resources that return 4xx/5xx HTTP status code.

## What ccht does

At first, ccht loads specified website recursively by Node.js's HTTP module or Headless Chromium browser via [puppeteer](https://github.com/puppeteer/puppeteer).
Then, ccht reports what pages or assets (we call them _resources_) we loaded and how was them, such as HTTP status codes or network connection failure.

You can configure the report threshold.
For example, you can switch whether to show HTTP redirect or not.

## What ccht does not

Site validity check, such as HTML validation or checking HTTP headers.
You can use other tools. (e.g. [webhint](https://webhint.io/))

You can combine existing softwares with ccht by [JSON reporter](#) and [configuring report severity](#).
