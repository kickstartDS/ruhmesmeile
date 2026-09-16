import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { EventFilter } from "./EventFilterComponent";
import schema from "./event-filter.schema.dereffed.json";

const meta: Meta<typeof EventFilter> = {
  title: "Event/ Event Filter",
  component: EventFilter,
  parameters: {
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof EventFilter>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 778,
    },
  },
  args: pack({
    datePicker: {
      title: "Termine eingrenzen",
      dateFromInput: {
        label: "Von",
        placeholder: "Datum wählen",
      },
      dateToInput: {
        label: "Bis",
        placeholder: "Datum wählen",
      },
      toggle: true,
    },
    categories: {
      title: "Formate",
      categoryCheckboxes: [
        "Alle",
        "Workshop",
        "Webinar",
        "Sprechstunde",
        "Vortrag",
        "Meetup",
      ],
      toggle: true,
    },
    applyButton: {
      label: "Filter anwenden",
    },
    resetButton: {
      label: "Filter zurücksetzen",
    },
  }),
};
