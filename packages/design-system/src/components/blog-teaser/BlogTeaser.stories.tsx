import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { BlogTeaser } from "./BlogTeaserComponent";
import schema from "./blog-teaser.schema.dereffed.json";
import customProperties from "./blog-teaser-tokens.json";

const meta: Meta<typeof BlogTeaser> = {
  title: "Blog/ Blog Teaser",
  component: BlogTeaser,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof BlogTeaser>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 438,
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
    teaserText:
      "Kennst du das? 50 Landingpages für die nächste Messe, ein neuer Blogpost pro Woche, jede Seite manuell zusammengeklickt. Wir zeigen euch, wie ihr die Content-Produktion mit dem Design System als API-Vertrag für die KI automatisiert: strukturierte Inhalte direkt aus dem Schema, generiert über den Storyblok MCP Server – und vor dem Speichern gegen das Design System validiert.",
    image:
      "https://a.storyblok.com/f/297364/856x540/507306688b/teaser-glossary-mcp.png",
    alt: "Illustration: Content Operations mit KI automatisieren",
    link: {
      url: "https://www.ruhmesmeile.com/design-system-insights/dein-cms-kann-jetzt-denken",
      text: "Artikel lesen",
    },
    readingTime: "5 Min. Lesezeit",
    author: {
      name: "Jonas Ulrich",
      title: "Autor",
      image:
        "https://a.storyblok.com/f/297364/1210x1040/e45abcc23a/jonas-ulrich-anschnitt2.png",
    },
  }),
};
