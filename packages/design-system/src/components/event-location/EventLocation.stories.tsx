import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { EventLocation } from "./EventLocationComponent";
import schema from "./event-location.schema.dereffed.json";

const meta: Meta<typeof EventLocation> = {
  title: "Event/ Event Location",
  component: EventLocation,
  parameters: {
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof EventLocation>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 382,
    },
  },
  args: pack({
    locationName: "ruhmesmeile GmbH",
    address: `Mozartstraße 4-10<br />
  53115 Bonn`,
    dates: [
      {
        date: "08.10.2026",
        time: "09:00 – 17:00",
        label: "Anmelden",
        url: "#",
        ariaLabel:
          "Anmeldung für den Workshop am 8. Oktober 2026 von 09:00 bis 17:00 Uhr",
      },
      {
        date: "26.11.2026",
        time: "10:00 – 16:00",
        label: "Anmelden",
        url: "#",
        ariaLabel:
          "Anmeldung für den Workshop am 26. November 2026 von 10:00 bis 16:00 Uhr",
      },
    ],
    links: [
      {
        url: "https://maps.google.com/?q=Mozartstra%C3%9Fe+4-10+53115+Bonn",
        label: "In Google Maps öffnen",
      },
      {
        url: "https://www.ruhmesmeile.com/",
        label: "Website von ruhmesmeile",
      },
    ],
  }),
};
