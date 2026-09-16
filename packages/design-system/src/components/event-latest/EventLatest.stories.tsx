import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { EventLatest } from "./EventLatestComponent";
import schema from "./event-latest.schema.dereffed.json";
import customProperties from "./event-latest-tokens.json";

const meta: Meta<typeof EventLatest> = {
  title: "Event/ Event Latest",
  component: EventLatest,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof EventLatest>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 790,
      height: 580,
    },
  },
  args: pack({
    events: [
      {
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
      },
      {
        date: "05.11.2026",
        title: "Design System Sprechstunde",
        location: "Online",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
        cta: "Zur Terminbuchung",
        calendar: {
          day: "05",
          month: "Nov",
        },
        ariaLabel: "Design System Sprechstunde am 5. November 2026 online",
      },
      {
        date: "26.11.2026",
        title: "Storyblok Deep Dive: Content-Modelle",
        location: "Bonn",
        url: "#",
        cta: "Zur Anmeldung",
        calendar: {
          day: "26",
          month: "Nov",
        },
        ariaLabel: "Storyblok Deep Dive am 26. November 2026 in Bonn",
      },
      {
        date: "03.12.2026",
        title: "CMS-Relaunch: Ask Me Anything",
        location: "Online",
        url: "#",
        cta: "Frage einreichen",
        calendar: {
          day: "03",
          month: "Dez",
        },
        ariaLabel: "CMS Relaunch Ask Me Anything am 3. Dezember 2026 online",
      },
    ],
  }),
};
