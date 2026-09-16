import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { EventLatestTeaser } from "./EventLatestTeaserComponent";
import schema from "./event-latest-teaser.schema.dereffed.json";
import customProperties from "./event-latest-teaser-tokens.json";

const meta: Meta<typeof EventLatestTeaser> = {
  title: "Event/ Event Latest Teaser",
  component: EventLatestTeaser,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof EventLatestTeaser>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 790,
      height: 248,
    },
  },
  args: pack({
    date: "08.10.2026",
    title: "Headless CMS Workshop",
    location: "Bonn",
    url: "#",
    cta: "Zur Anmeldung",
    calendar: {
      day: "08",
      month: "Okt",
    },
    ariaLabel: "Headless CMS Workshop am 8. Oktober 2026 in Bonn",
  }),
};
