import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { EventListTeaser } from "./EventListTeaserComponent";
import schema from "./event-list-teaser.schema.dereffed.json";
import customProperties from "./event-list-teaser-tokens.json";

const meta: Meta<typeof EventListTeaser> = {
  title: "Event/ Event List Teaser",
  component: EventListTeaser,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof EventListTeaser>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 1024,
      height: 524,
    },
  },
  args: pack({
    text: "Zwei Tage Workshop in Bonn: Wir modellieren mit euch die Inhalte, bauen die Komponenten und zeigen, wie Redaktion und Entwicklung zusammenspielen. Bringt euren Case mit – wir arbeiten direkt daran.",
    date: "08.10.2026",
    time: "09:00 – 17:00",
    location: {
      name: "ruhmesmeile, Bonn",
      address: `Mozartstraße 4-10<br />
53115 Bonn`,
    },
    title: "Headless CMS Workshop",
    category: "Workshop",
    image: {
      src: "https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png",
      alt: "Komponenten und Design Tokens im Storybook während des Workshops",
    },
    url: "#",
    ctaText: "Zur Anmeldung",
  }),
};
