// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const replacementPlugin = require("./src/remark/replacement").default;

import { themes as prismThemes } from "prism-react-renderer";

const fs = require("fs");
const path = require("path");

// Get all versions from the versioned_docs directory
const apiFolder = (version) => {
  const apiFolders = {
    "version-0.8": "api",
    "version-0.9": "api",
    "version-1.0": "api",
    "version-2.0": "api-reference",
  };

  return apiFolders[version] || "rollups-apis";
};

const versionsDir = path.join(__dirname, "cartesi-rollups_versioned_docs");
const versions = fs
  .readdirSync(versionsDir)
  .filter((dir) => dir.startsWith("version-"));

const openApiDocsConfig = versions.reduce((config, version) => {
  config[`${version}-backEndApi`] = {
    specPath: path.join(
      versionsDir,
      version,
      apiFolder(version),
      "rollup.yaml"
    ),
    outputDir: path.join(versionsDir, version, apiFolder(version), "rollup"),
    sidebarOptions: {
      groupPathsBy: "tag",
    },
  };

  config[`${version}-frontEndApi`] = {
    specPath: path.join(
      versionsDir,
      version,
      apiFolder(version),
      "inspect.yaml"
    ),
    outputDir: path.join(versionsDir, version, apiFolder(version), "inspect"),
  };

  return config;
}, {});

const isStaging = process.env.DEPLOYMENT_BRANCH === "Staging";
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Cartesi Documentation",
  tagline: "Application-specific rollups with a Linux runtime.",
  url: isStaging ? "https://staging.mugen.builders" : "https://docs.cartesi.io",
  deploymentBranch: isStaging ? "staging" : "main",
  baseUrl: "/",
  trailingSlash: true,
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "cartesi", // Usually your GitHub org/user name.
  projectName: "cartesi", // Usually your repo name.
  scripts: ["/js/index.js"],
  // markdown: { format: "md" }, // NOTE: Use this to disable MDX and use MD instead
  presets: [
    [
      "classic",

      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          docItemComponent: "@theme/ApiItem",
          // Please change this to your repo.
          editUrl: "https://github.com/cartesi/docs/tree/develop",

          remarkPlugins: [replacementPlugin],
          admonitions: {
            keywords: [
              "note",
              "tip",
              "danger",
              "info",
              "caution",
              "goal",
              "troubleshoot",
            ],
          },
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "GTM-NGX36B79",
          anonymizeIP: true,
        },

        googleTagManager: {
          containerId: "GTM-NGX36B79",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      typesense: {
        typesenseCollectionName: "cartesi_1724150916",

        typesenseServerConfig: {
          nodes: [
            {
              host: "rjh5fcveu4z3l7oqp-1.a1.typesense.net",
              port: 443,
              protocol: "https",
            },
          ],
          apiKey: "FMbnaJ3rp6NHGCzzi6obgDTDy2lGoAiv",
        },

        // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
        typesenseSearchParameters: {},

        // Optional
        contextualSearch: true,
      },
      hotjar: {
        applicationId: "3103959",
      },
      image: "img/socialLogo2023.png",
      navbar: {
        logo: {
          alt: "Cartesi Logo",
          src: "img/logo.svg",
          srcDark: "img/logo_dark.svg",
          height: "52px",
        },
        items: [
          // {
          //   type: "dropdown",
          //   label: "Tools",
          //   position: "left",
          //   items: [
          //     {
          //       label: "NoNodo",
          //       href: "https://github.com/gligneul/nonodo/blob/main/README.md",
          //     },
          //     { label: "Cartesi Scan", href: "https://cartesiscan.io/" },
          //   ],
          // },
          // {
          //   type: "dropdown",
          //   label: "Learn",
          //   position: "left",
          //   items: [
          //     {
          //       label: "Free Udemy Course",
          //       href: "https://www.udemy.com/course/the-cartesi-dapp-developer-masterclass",
          //     },
          //     // {
          //     //   label: "Cartesi Machine",
          //     //   href: "/machine/",
          //     // },
          //   ],
          // },
          {
            label: "Video Tutorial",
            href: "https://www.udemy.com/course/cartesi-masterclass/",
            position: "left",
          },
          {
            type: "dropdown",
            label: "Community",
            position: "left",
            items: [
              {
                label: "Twitter",
                href: "https://www.twitter.com/cartesiproject",
              },
              { label: "Discord", href: "https://discord.gg/cWGbyFkQ2W" },
              { label: "Reddit", href: "https://www.reddit.com/r/cartesi/" },
              {
                label: "YouTube",
                href: "https://www.youtube.com/c/Cartesiproject/videos",
              },
              { label: "Telegram", href: "https://t.me/cartesiannouncements" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/cartesi/",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/cartesiproject/",
              },
              {
                label: "Blog",
                href: "https://cartesi.io/blog/",
              },
              {
                label: "Built with Cartesi",
                href: "https://rolluplab.io/",
              },
              {
                label: "Technical Vision Forum",
                href: "https://governance.cartesi.io/c/technical-vision-forum/13",
              },
            ],
          },
          // {
          //   type: "dropdown",
          //   label: "Developers",
          //   position: "left",
          //   items: [
          //     { label: "Code snippets", href: "#" },
          //     { label: "Quick start tutorials", href: "#" },
          //   ],
          // },
          {
            label: "Cartesi Home",
            to: "//cartesi.io",
            position: "left",
          },

          // {
          //   type: "docsVersionDropdown",
          //   position: "right",
          //   docsPluginId: "cartesi-rollups",
          //   label: "Version",
          // },

          {
            type: "search",
            className: "navbar-search-custom",
            position: "right",
          },

          {
            to: "https://discord.gg/cWGbyFkQ2W",
            position: "right",
            className: "header-discord-link",
            "aria-label": "Discord",
          },
          {
            to: "https://github.com/cartesi/docs/",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      announcementBar: {
        id: "mainnet",
        // content:
        //   'Cartesi Rollups is Mainnet Ready! {{balance}} in {{symbol}} is up for grabs... if you can <a href="https://honeypot.cartesi.io/" target="_blank" rel="noopener noreferrer">hack Cartesi Rollups</a>.',
        content:
          'Build your most ambitious dApp yet with Cartesi - grant applications open! <a href="https://bit.ly/49EE31V" target="_blank" rel="noopener noreferrer">APPLY NOW</a>',
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        textColor: "#FFFFFF",
        isCloseable: true,
      },
      footer: {
        links: [
          {
            title: "Ecosystem",
            items: [
              {
                label: "Cartesi",
                to: "https://cartesi.io/",
              },
              {
                label: "Our Whitepaper",
                to: "https://cartesi.io/cartesi_whitepaper.pdf",
              },
              {
                label: "Foundation Notice",
                to: "https://cartesi.io/foundation_notice.pdf",
              },
            ],
          },
          {
            title: "Developers",
            items: [
              {
                label: "Template dApp",
                to: "https://github.com/cartesi/rollups-examples/tree/main/custom-dapps",
              },
              {
                label: "Tech Articles",
                to: "https://medium.com/cartesi/tagged/tech",
              },
              {
                label: "Bug Bounty",
                to: "https://immunefi.com/bounty/cartesi/",
              },
              {
                label: "Run a Node",
                to: "https://explorer.cartesi.io/staking",
              },
              {
                label: "CIP Process",
                to: "https://github.com/cartesi/cips",
              },
            ],
          },
          {
            title: "Github",
            items: [
              {
                label: "Rollups Examples",
                to: "https://github.com/cartesi/rollups-examples",
              },
              {
                label: "Machine Emulator",
                to: "https://github.com/cartesi/machine-emulator-tools",
              },
              {
                label: "Noether Node",
                to: "https://github.com/cartesi/noether",
              },
              {
                label: "Cartesi Compute Tutorials",
                to: "https://github.com/cartesi/compute-tutorials",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Youtube",
                to: "https://www.youtube.com/c/Cartesiproject/videos",
              },
              {
                label: "Discord",
                to: "https://discord.gg/cWGbyFkQ2W",
              },
              {
                label: "Medium",
                to: "https://www.medium.com/cartesi",
              },
              {
                label: "Twitter",
                to: "https://www.twitter.com/cartesiproject",
              },
              {
                label: "Telegram",
                to: "https://t.me/cartesiannouncements",
              },
              {
                label: "Reddit",
                to: "https://www.reddit.com/r/cartesi/",
              },
            ],
          },
        ],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 2,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["lua"],
      },
    }),
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "cartesi-rollups",
        path: "cartesi-rollups",
        routeBasePath: "cartesi-rollups",
        // sidebarPath: require.resolve("./sidebarsRollups.js"),
        editUrl: "https://github.com/cartesi/docs/tree/main",
        // docLayoutComponent: "@theme/DocRoot",
        // docRootComponent: "@theme/DocPage",
        docItemComponent: "@theme/ApiItem",
        includeCurrentVersion: false,
        lastVersion: "1.5",
        admonitions: {
          keywords: [
            "note",
            "tip",
            "danger",
            "info",
            "caution",
            "goal",
            "troubleshoot",
          ],
        },
        versions: {
          1.5: {
            label: "1.5",
            path: "1.5",
          },
          "2.0": {
            label: "2.0",
            path: "2.0",
          },
        },
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/cartesi-rollups/1.5/", // Redirects /cartesi-rollups/ to the latest version
            from: "/cartesi-rollups/",
          },
          {
            to: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/inputs/",
            from: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/list_inputs/",
          },
          {
            to: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/notices/",
            from: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/list_notices/",
          },
          {
            to: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/vouchers/",
            from: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/list-vouchers/",
          },
          {
            to: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/reports/",
            from: "/cartesi-rollups/1.5/rollups-apis/graphql/queries/list_reports/",
          },
          {
            to: "/cartesi-rollups/1.5/development/cli-commands/",
            from: "/cartesi-rollups/1.5/development/node-configuration/",
          },
          {
            to: "/cartesi-rollups/1.3/",
            from: "/cartesi-rollups/overview",
          },
          {
            to: "/cartesi-machine/",
            from: ["/machine/", "/machine/intro/"],
          },

          {
            to: "/cartesi-machine/host/",
            from: ["/machine/host/"],
          },
          {
            to: "/cartesi-machine/host/cmdline/",
            from: ["/machine/host/cmdline/"],
          },
          {
            to: "/cartesi-machine/host/lua/",
            from: ["/machine/host/lua/"],
          },
          {
            to: "/cartesi-machine/target/",
            from: ["/machine/target/"],
          },
          {
            to: "/cartesi-machine/target/linux/",
            from: ["/machine/target/linux/"],
          },
          {
            to: "/cartesi-machine/target/architecture/",
            from: ["/machine/target/architecture/"],
          },
          {
            to: "/cartesi-machine/blockchain/",
            from: ["/machine/blockchain/"],
          },
          {
            to: "/cartesi-machine/blockchain/hash/",
            from: ["/machine/blockchain/hash"],
          },
          {
            to: "/cartesi-machine/blockchain/vg/",
            from: ["/machine/blockchain/vg/"],
          },
          {
            to: "/cartesi-rollups/2.0/getting-started/quickstart/",
            from: "/cartesi-rollups/2.0/quickstart/",
          },
          // {
          //   to: "/cartesi-rollups/2.0/api-reference/architecture/",
          //   from: "/cartesi-rollups/2.0/core-concepts/optimistic-rollups/",
          // },
          // {
          //   to: "/cartesi-rollups/2.0/api-reference/architecture/",
          //   from: "/cartesi-rollups/2.0/core-concepts/architecture/",
          // },
          {
            to: "/cartesi-rollups/2.0/resources/mainnet-considerations/",
            from: "/cartesi-rollups/2.0/core-concepts/mainnet-considerations/",
          },
          {
            to: "/cartesi-rollups/2.0/development/building-a-dapp/",
            from: "/cartesi-rollups/2.0/development/creating-application/",
          },
          {
            to: "/cartesi-rollups/2.0/development/building-a-dapp/",
            from: "/cartesi-rollups/2.0/development/building-the-application/",
          },
          {
            to: "/cartesi-rollups/2.0/development/building-a-dapp/",
            from: "/cartesi-rollups/2.0/development/running-the-application/",
          },
          {
            to: "/cartesi-rollups/2.0/development/send-inputs/",
            from: "/cartesi-rollups/2.0/development/send-requests/",
          },
          {
            to: "/cartesi-rollups/2.0/development/query-outputs/",
            from: "/cartesi-rollups/2.0/development/retrieve-outputs/",
          },
          {
            to: "/cartesi-rollups/2.0/resources/migration-guide/",
            from: "/cartesi-rollups/2.0/development/migration/",
          },
          {
            to: "/cartesi-rollups/2.0/resources/community-tools/",
            from: "/cartesi-rollups/2.0/development/community-tools/",
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes("/cartesi-rollups/1.0/")) {
            // only top level URLs needed. All sub levels will be matched automatically. i.e. if /cartesi-rollups/api/ added, the plugin will automatically capture /cartesi-rollups/api/json-rpc/relays/DAppAddressRelay/ etc.
            return [
              existingPath.replace(
                "/cartesi-rollups/1.5/",
                "/cartesi-rollups/1.5/",
                "/cartesi-rollups/overview"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.5/development/node-configuration/",
                "/cartesi-rollups/1.5/development/cli-commands/"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/main-concepts",
                "/cartesi-rollups/main-concepts"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/mainnet-risks",
                "/cartesi-rollups/mainnet-risks"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/sending-requests",
                "/cartesi-rollups/sending-requests"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/reading-outputs",
                "/cartesi-rollups/reading-outputs"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/assets-handling",
                "/cartesi-rollups/assets-handling"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/dapp-architecture",
                "/cartesi-rollups/dapp-architecture"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/api",
                "/cartesi-rollups/api"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/http-api",
                "/cartesi-rollups/http-api"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/dapp-life-cycle",
                "/cartesi-rollups/dapp-life-cycle"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/build-dapps",
                "/cartesi-rollups/build-dapps"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/references",
                "/cartesi-rollups/references"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/migration-guides",
                "/cartesi-rollups/migration-guides"
              ),
              existingPath.replace(
                "/cartesi-rollups/1.0/challenges",
                "/cartesi-rollups/challenges"
              ),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
    "docusaurus-plugin-hotjar",
    async function AddTailwindCss(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "apiDocs",
        docsPluginId: "cartesi-rollups",
        config: openApiDocsConfig,
      },
    ],

    [
      "@graphql-markdown/docusaurus",
      /** @type {import('@graphql-markdown/types').ConfigOptions} */
      {
        schema: "cartesi-rollups/rollups-apis/typeDefs.graphql",
        rootPath: "cartesi-rollups", // docs will be generated under './docs/swapi' (rootPath/baseURL)
        baseURL: "api/graphql",
      },
    ],
  ],
  themes: [
    "docusaurus-theme-openapi-docs",
    "docusaurus-theme-search-typesense",
  ],
};

module.exports = config;
