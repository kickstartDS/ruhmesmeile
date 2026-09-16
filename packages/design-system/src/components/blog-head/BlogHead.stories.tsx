import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { BlogHead } from "./BlogHeadComponent";
import schema from "./blog-head.schema.dereffed.json";
import customProperties from "./blog-head-tokens.json";

const meta: Meta<typeof BlogHead> = {
  title: "Blog/ Blog Head",
  component: BlogHead,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof BlogHead>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 844,
    },
  },
  args: pack({
    date: "26.02.2026",
    tags: [
      {
        entry: "Content Ops",
      },
      {
        entry: "KI",
      },
    ],
    headline:
      "Dein CMS kann jetzt denken – Content Operations mit KI automatisieren",
    image:
      "https://a.storyblok.com/f/297364/856x540/507306688b/teaser-glossary-mcp.png",
    alt: "Illustration: Content Operations mit KI automatisieren",
  }),
};
