import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { ContentNav } from "./ContentNavComponent";
import schema from "./content-nav.schema.dereffed.json";

const meta: Meta<typeof ContentNav> = {
  title: "Corporate / Content Nav",
  component: ContentNav,
  parameters: {
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof ContentNav>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 640,
      height: 652,
    },
  },
  args: pack({
    image: {
      src: "https://a.storyblok.com/f/297364/330x330/e426dfbd49/hp-deko-illu-systems.svg",
      alt: "Illustration: Systeme und Module von ruhmesmeile",
    },
    topic: "Unser Angebot",
    links: [
      {
        label: "Headless CMS",
        url: "https://www.ruhmesmeile.com/headless-cms/headless-cms-services",
      },
      {
        label: "User Experience Design",
        url: "https://www.ruhmesmeile.com/ux-strategie-beratung",
      },
      {
        label: "Design Systeme",
        url: "https://www.ruhmesmeile.com/design-system-services",
      },
      {
        label: "Composable Frontends",
        url: "https://www.ruhmesmeile.com/headless-cms/composable-frontends",
      },
      {
        label: "CMS Website Accelerator",
        url: "https://www.ruhmesmeile.com/headless-cms/cms-website-accelerator",
      },
      {
        label: "Case Studies",
        url: "https://www.ruhmesmeile.com/case-studies/",
      },
      {
        label: "Insights",
        url: "https://www.ruhmesmeile.com/design-system-insights/",
      },
      {
        label: "Über uns",
        url: "https://www.ruhmesmeile.com/ueber-uns/",
      },
      {
        label: "Kontakt",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
      },
    ],
    initiallyShown: 4,
  }),
};
