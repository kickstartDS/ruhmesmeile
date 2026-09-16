import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { EventHeader } from "./EventHeaderComponent";
import schema from "./event-header.schema.dereffed.json";

const meta: Meta<typeof EventHeader> = {
  title: "Event/ Event Header",
  component: EventHeader,
  parameters: {
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof EventHeader>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 314,
    },
  },
  args: pack({
    title: "Headless CMS Workshop",
    categories: [{ label: "Workshop" }, { label: "Bonn" }],
    intro:
      "Von der Content-Modellierung bis zum Go-Live: An zwei Tagen bauen wir gemeinsam eine Website auf Storyblok – markenkonform, wartungsarm und in Wochen statt Monaten live.",
  }),
};
