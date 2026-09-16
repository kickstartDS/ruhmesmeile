import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { ImageText } from "./ImageTextComponent";
import schema from "./image-text.schema.dereffed.json";
import customProperties from "./image-text-tokens.json";

const meta: Meta = {
  title: "Components/Image Text",
  component: ImageText,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof ImageText>;

export const BesideRightLayout: Story = {
  parameters: {
    viewport: {
      width: 1240,
      height: 515,
    },
  },
  args: pack({
    text: `Headless CMS und Design Systeme sind kein Selbstzweck. Sie sorgen dafür, dass eure Inhalte schneller live gehen und überall gleich aussehen.

Wie das konkret aussieht, zeigen wir in unseren **Case Studies**: von der **Universität** über die [Deutsche Telekom](#) bis zu DACHSER und REWE – inklusive der Zahlen zu Time-to-Market und Brand-Konsistenz.

*Wir arbeiten dabei mit festen Ansprechpartnern statt mit großen Agentur-Teams: Boutique-Ansatz statt Overhead.*`,
    image: {
      src: "https://a.storyblok.com/f/297364/1080x810/6a4ce7621a/dachser_teaser_4zu3.png/m/1080x810",
      alt: "Dachser Design System – Projektvisual",
    },
    layout: "beside-right",
  }),
};

export const AboveLayout: Story = {
  parameters: {
    viewport: {
      width: 760,
      height: 788,
    },
  },
  args: pack({
    text: `Headless CMS und Design Systeme sind kein Selbstzweck. Sie sorgen dafür, dass eure Inhalte schneller live gehen und überall gleich aussehen.

Wie das konkret aussieht, zeigen wir in unseren **Case Studies**: von der **Universität** über die [Deutsche Telekom](#) bis zu DACHSER und REWE – inklusive der Zahlen zu Time-to-Market und Brand-Konsistenz.

*Wir arbeiten dabei mit festen Ansprechpartnern statt mit großen Agentur-Teams: Boutique-Ansatz statt Overhead.*`,
    image: {
      src: "https://a.storyblok.com/f/297364/1080x810/90f97374e7/projekte_teaser_ngo.png/m/1080x810",
      alt: "Landing-Page-Baukasten für eine NGO – Projektvisual",
    },
    layout: "above",
  }),
};
