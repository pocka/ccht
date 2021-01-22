module.exports = {
  docs: [
    "introduction",
    "quickstart",
    {
      type: "category",
      label: "Recipes",
      items: [
        "recipes/exclude_urls",
        "recipes/puppeteer_crawler",
        "recipes/pipe",
      ],
    },
  ],
  api: ["cli", "node_api"],
};
