const path = require("path");
const StyleDictionary = require("style-dictionary");
const { config } = require("@kickstartds/style-dictionary");
const svgsToReactComponent = require("./scripts/svgsToReactComponent.js");

module.exports = StyleDictionary.extend(config)
  .registerFormat({
    name: "tsx/icons",
    formatter: svgsToReactComponent,
  })
  .extend({
    source: [
      "token/dictionary/**/*.json",
      path.join(__dirname, "token/dictionary/**/*.svg"),
      path.join(
        "source/design-tokens/icons/*.svg",
        path.dirname(require.resolve("@kickstartds/core/package.json"))
      ),
    ],
    platforms: {
      css: {
        buildPath: "token/",
      },
      svgIcons: {
        buildPath: "token/",
        files: [
          {
            format: "tsx/icons",
            destination: "InlineIcon.tsx",
            filter: "includeIcons",
          },
        ],
      },
      storybook: {
        buildPath: "token/storybook/",
      },
      js: {
        transforms: [
          "attribute/cti",
          "name/cti/pascal",
          "size/rem",
          "color/css",
        ],
        buildPath: "token/",
        files: [
          {
            destination: "tokens.js",
            format: "javascript/es6",
          },
        ],
      },
    },
  });
