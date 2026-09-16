import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Stats } from "./StatsComponent";
import schema from "./stats.schema.json";
import customProperties from "./stats-tokens.json";

const meta: Meta = {
  title: "Components/Stats",
  component: Stats,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Stats>;

export const CountUpWithIcons: Story = {
  parameters: {
    viewport: {
      width: 790,
      height: 318,
    },
  },
  args: pack({
    stat: [
      { number: "20+", title: "Jahre Erfahrung", icon: "person" },
      { number: "250+", title: "Erfolgreiche Projekte", icon: "star" },
      { number: "48h", title: "Time-to-Market", icon: "time" },
    ],
  }),
};

export const CountUpWithDescription: Story = {
  parameters: {
    viewport: {
      width: 700,
      height: 278,
    },
  },
  args: pack({
    align: "left",
    stat: [
      {
        number: "100%",
        title: "Brand-Konsistenz",
        description:
          "Für die Deutsche Telekom entwickelten wir einen Webbaukasten, der 400+ Vertriebspartnern markenkonforme Webseiten ermöglicht.",
      },
      {
        number: "400+",
        title: "Vertriebspartner",
        description:
          "Ein Baukasten, der jede Landingpage im Corporate Design ausliefert – ohne Entwickleraufwand und ohne Abstimmungsrunden.",
      },
    ],
  }),
};
