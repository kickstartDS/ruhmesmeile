import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { EventRegistration } from "./EventRegistrationComponent";
import schema from "./event-registration.schema.dereffed.json";

const meta: Meta<typeof EventRegistration> = {
  title: "Event/ Event Registration",
  component: EventRegistration,
  parameters: {
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof EventRegistration>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 618,
    },
  },
  args: pack({
    label: "Anmeldung",
    title: "Headless CMS Workshop",
    location: {
      name: "ruhmesmeile GmbH",
      address: `Mozartstraße 4-10<br/>53115 Bonn`,
    },
    date: "08.10.2026",
    time: "09:00 – 17:00",
    nameInput: {
      label: "Name*",
      placeholder: "Euer Name",
    },
    emailInput: {
      label: "E-Mail*",
      placeholder: "Eure E-Mail-Adresse",
    },
    confirmationCheckboxLabel: `Ich habe die Teilnahmebedingungen gelesen und stimme ihnen zu*`,
    mandatoryText: "_* Pflichtfeld_",
    cta: {
      label: "Anmeldung senden",
      url: "#",
      ariaLabel: "Für den Headless CMS Workshop am 8. Oktober 2026 anmelden",
    },
  }),
};
