---
title: Using with other program
---

With JSON reporter, you can easily combine ccht with other program accepts JSON.

```shell title="jq example"
$ npx ccht https://example.com --reporter json | jq
```

:::info
Use `npx` instead of `yarn`. `yarn` emit its output to stdout.
:::

Use [Node API](../node_api.md) for more programmatic usage.
