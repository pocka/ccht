---
title: Excluding URLs
---

You can skip checking URLs by passing `--exclude` option.

Assume we have a website `https://example.com`, and it has below structure:

```
example.com/
+-- / (has links for /page1 and /page3)
    +-- /page1 (has links for /page1/subpage and /page2)
    |   +-- /page1/subpage
    +-- /page2
    +-- /page3
```

And we get a result for `/` and `/page3` if we run below command:

```shell
$ npx ccht https://example.com --exclude https://example.com/page1,https://example.com/page2
```

:::info
ccht checks excluded URLs by forward matching.
:::
