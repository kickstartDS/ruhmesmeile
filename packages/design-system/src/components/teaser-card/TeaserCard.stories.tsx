import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { TeaserCard } from "./TeaserCardComponent";
import schema from "./teaser-card.schema.dereffed.json";
import customProperties from "./teaser-card-tokens.json";

const meta: Meta<typeof TeaserCard> = {
  title: "Components/Teaser Card",
  component: TeaserCard,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof TeaserCard>;

export const ProductTiles: Story = {
  parameters: {
    viewport: {
      width: 650,
      height: 678,
    },
  },
  args: pack({
    headline: "CMS Website Accelerator",
    text: "Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten.",
    image:
      "https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png",
    imageAlt:
      "Mit dem CMS Website Accelerator erstellte Landingpage für Industrieunternehmen",
    url: "https://www.ruhmesmeile.com/kontakt",
    button: {
      label: "Beratung starten",
      hidden: true,
    },
  }),
};

export const Compact: Story = {
  parameters: {
    viewport: {
      width: 650,
      height: 678,
    },
  },
  args: pack({
    layout: "compact",
    headline: "CMS Website Accelerator",
    text: "Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten.",
    image:
      "https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png",
    imageAlt:
      "Mit dem CMS Website Accelerator erstellte Landingpage für Industrieunternehmen",
    url: "https://www.ruhmesmeile.com/kontakt",
    button: {
      label: "Beratung starten",
    },
  }),
};

export const PageNavigation: Story = {
  parameters: {
    viewport: {
      width: 650,
      height: 640,
    },
  },
  args: pack({
    headline: "CMS Website Accelerator",
    text: "Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten.",
    image:
      "https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png",
    imageAlt:
      "Mit dem CMS Website Accelerator erstellte Landingpage für Industrieunternehmen",
    imageRatio: "landscape",
    url: "https://www.ruhmesmeile.com/kontakt",
    button: {
      label: "Beratung starten",
    },
  }),
};

export const ShowcasePreview: Story = {
  parameters: {
    viewport: {
      width: 650,
      height: 738,
    },
  },
  args: pack({
    label: "Angebot",
    layout: "row",
    imageRatio: "wide",
    headline: "CMS Website Accelerator",
    text: "Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten.",
    image:
      "https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png",
    imageAlt:
      "Mit dem CMS Website Accelerator erstellte Landingpage für Industrieunternehmen",
    url: "https://www.ruhmesmeile.com/kontakt",
    button: {
      label: "Beratung starten",
    },
  }),
};
