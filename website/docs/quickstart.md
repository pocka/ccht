---
id: quickstart
title: Quick Start
---

## Run without installation

To invoke ccht immediately, just run `npx ccht <your-site-url>` on your terminal.
This will temporarily download ccht package and execute it.

```shell
$ npx ccht https://example.com
```

## Run as project dependency

If you intented to use ccht more than once or integrate into your project, install ccht locally and invoke it.

```shell
$ yarn add -D ccht

# or using npm
$ npm i -D ccht
```

You can now invoke ccht with `npx` command or in npm scripts.

```shell
# This does not download ccht package,
# since it's already in project's node_modules directory
$ npx ccht https://example.com
```

```json title="package.json" {3}
{
  "scripts": {
    "test-site": "ccht https://example.com"
  },
  "devDependencies": {
    "ccht": "^0.1.1"
  }
}
```

## Install globally

:::caution
We recommend not to install globally, especially if you're working with teams.
:::

Also, you can install it globally and invoke it as global command.

```shell
$ npm i -g ccht

# you can now invoke ccht without npx
$ ccht https://example.com
```
