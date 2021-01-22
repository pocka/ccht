const pkg = require("../package.json");

const siteUrl = new URL(pkg.homepage);

module.exports = {
  title: pkg.name,
  url: pkg.homepage,
  baseUrl: siteUrl.pathname,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "pocka",
  projectName: pkg.name,
  themeConfig: {
    navbar: {
      title: pkg.name.toUpperCase(),
      items: [
        {
          type: "doc",
          docId: "introduction",
          label: "Docs",
          position: "left",
        },
        {
          type: "doc",
          docId: "cli",
          label: "API",
          position: "left",
        },
        {
          href: pkg.repository.url,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/",
            },
            {
              label: "Quick Start",
              to: "/quickstart",
            },
          ],
        },
        {
          title: "API",
          items: [
            {
              label: "CLI",
              to: "/cli",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "NPM Package",
              to: `https://www.npmjs.com/package/${pkg.name}`,
            },
            {
              label: "Repository",
              href: pkg.repository.url,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${
        pkg.contributors[0].name
      }. Built with Docusaurus.`,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/pocka/ccht/edit/master/website/",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
