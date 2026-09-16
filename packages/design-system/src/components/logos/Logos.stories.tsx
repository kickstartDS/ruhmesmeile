import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Logos } from "./LogosComponent";
import schema from "./logos.schema.dereffed.json";
import customProperties from "./logos-tokens.json";

const meta: Meta<typeof Logos> = {
  title: "Components/Logos",
  component: Logos,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Logos>;

export const CenteredWithButton: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 492,
    },
  },
  args: pack({
    tagline: "Unsere Kunden",
    logo: [
      {
        src: "https://a.storyblok.com/f/297364/200x70/de377c4c40/logo-telekom.svg",
        alt: "Deutsche Telekom",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/9ef50ca58f/dachser.svg",
        alt: "DACHSER Intelligent Logistics",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/a3ca17a410/rewe.svg",
        alt: "REWE Group",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/6d81aafe99/postbank.svg",
        alt: "Postbank",
      },
      {
        src: "https://a.storyblok.com/f/297364/200x60/640dee0e0f/logo_maxcluster.svg",
        alt: "maxcluster",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/8209045bb7/tectrion.svg",
        alt: "Tectrion",
      },
    ],
    cta: {
      toggle: true,
      style: "button",
      text: "Über 250 Projekte für Marken wie Telekom, DACHSER, REWE und Postbank.",
      label: "Beratung starten",
    },
  }),
};

export const LeftAlignedWithTextLink: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 420,
    },
  },
  args: pack({
    tagline: "Unsere Kunden",
    logo: [
      {
        src: "https://a.storyblok.com/f/297364/200x70/de377c4c40/logo-telekom.svg",
        alt: "Deutsche Telekom",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/9ef50ca58f/dachser.svg",
        alt: "DACHSER Intelligent Logistics",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/a3ca17a410/rewe.svg",
        alt: "REWE Group",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/6d81aafe99/postbank.svg",
        alt: "Postbank",
      },
      {
        src: "https://a.storyblok.com/f/297364/200x60/640dee0e0f/logo_maxcluster.svg",
        alt: "maxcluster",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/8209045bb7/tectrion.svg",
        alt: "Tectrion",
      },
    ],
    cta: {
      toggle: true,
      text: "Wir zeigen euch, wie Unternehmen ihre Frontends und ihr CMS modernisiert haben.",
      label: "Case Studies ansehen",
    },
    align: "left",
  }),
};

export const LogoWall: Story = {
  parameters: {
    viewport: {
      width: 1080,
      height: 546,
    },
  },
  args: pack({
    tagline: "Unsere Kunden",
    logosPerRow: 4,
    logo: [
      {
        src: "https://a.storyblok.com/f/297364/200x70/de377c4c40/logo-telekom.svg",
        alt: "Deutsche Telekom",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/9ef50ca58f/dachser.svg",
        alt: "DACHSER Intelligent Logistics",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/a3ca17a410/rewe.svg",
        alt: "REWE Group",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/6d81aafe99/postbank.svg",
        alt: "Postbank",
      },
      {
        src: "https://a.storyblok.com/f/297364/200x60/640dee0e0f/logo_maxcluster.svg",
        alt: "maxcluster",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/8209045bb7/tectrion.svg",
        alt: "Tectrion",
      },
      {
        src: "https://a.storyblok.com/f/297364/200x60/d3f740f44d/logo_rub.svg",
        alt: "RUB",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/6ebf09d690/wolfcraft.svg",
        alt: "Wolfcraft",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/9d490af3db/hpp.svg",
        alt: "HPP Architekten",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/d8e61f953f/sparstrom.svg",
        alt: "Sparstrom",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/ad08e1cf5e/deloro.svg",
        alt: "Deloro",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/0e26d4335b/noweda.svg",
        alt: "Noweda",
      },
    ],

    cta: {
      toggle: false,
    },
  }),
};

export const LogoRow: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 248,
    },
  },
  args: pack({
    tagline: "Unsere Kunden",
    logosPerRow: 6,
    logo: [
      {
        src: "https://a.storyblok.com/f/297364/200x70/de377c4c40/logo-telekom.svg",
        alt: "Deutsche Telekom",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/9ef50ca58f/dachser.svg",
        alt: "DACHSER Intelligent Logistics",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/a3ca17a410/rewe.svg",
        alt: "REWE Group",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/6d81aafe99/postbank.svg",
        alt: "Postbank",
      },
      {
        src: "https://a.storyblok.com/f/297364/200x60/640dee0e0f/logo_maxcluster.svg",
        alt: "maxcluster",
      },
      {
        src: "https://a.storyblok.com/f/297364/1100x380/8209045bb7/tectrion.svg",
        alt: "Tectrion",
      },
    ],

    cta: {
      toggle: false,
    },
  }),
};
