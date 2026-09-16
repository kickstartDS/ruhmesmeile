import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { BusinessCard } from "./BusinessCardComponent";
import schema from "./business-card.schema.dereffed.json";

const meta: Meta<typeof BusinessCard> = {
  title: "Corporate / Business Card",
  component: BusinessCard,
  parameters: {
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof BusinessCard>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 650,
      height: 838,
    },
  },
  args: pack({
    centered: false,
    image: {
      src: "img/placeholder/avatar-square.svg",
      alt: "Daniel Ley",
    },
    logo: {
      src: "logo.svg",
      alt: "ruhmesmeile Logo",
      url: "https://www.ruhmesmeile.com/",
    },
    topic: "Geschäftsführer",
    address: `Mozartstraße 4-10<br />53115 Bonn<br />Deutschland`,
    avatar: {
      src: "img/placeholder/avatar-business-card-round.svg",
      alt: "Daniel Ley",
    },
    contactLinks: [
      {
        icon: "phone",
        label: "+49 228 30412660",
        url: "tel:+4922830412660",
      },
      {
        icon: "email",
        label: "mail@ruhmesmeile.com",
        url: "mailto:mail@ruhmesmeile.com",
      },
      {
        icon: "linkedin",
        label: "ruhmesmeile",
        url: "#",
      },
    ],
    buttons: [
      {
        label: "Kontakt aufnehmen",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
      },
    ],
  }),
};

export const Centered: Story = {
  parameters: {
    viewport: {
      width: 650,
      height: 838,
    },
  },
  args: pack({
    centered: true,
    image: {
      src: "img/placeholder/avatar-square.svg",
      alt: "Daniel Ley",
    },
    logo: {
      src: "logo.svg",
      alt: "ruhmesmeile Logo",
      url: "https://www.ruhmesmeile.com/",
    },
    topic: "Geschäftsführer",
    address: `Mozartstraße 4-10<br />53115 Bonn<br />Deutschland`,
    avatar: {
      src: "img/placeholder/avatar-business-card-round.svg",
      alt: "Daniel Ley",
    },
    contactLinks: [
      {
        icon: "phone",
        label: "+49 228 30412660",
        url: "tel:+4922830412660",
      },
      {
        icon: "email",
        label: "mail@ruhmesmeile.com",
        url: "mailto:mail@ruhmesmeile.com",
      },
      {
        icon: "linkedin",
        label: "ruhmesmeile",
        url: "#",
      },
    ],
    buttons: [
      {
        label: "Kontakt aufnehmen",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
      },
    ],
  }),
};

export const WithoutImage: Story = {
  parameters: {
    viewport: {
      width: 740,
      height: 438,
    },
  },
  args: pack({
    centered: false,
    logo: {
      src: "logo.svg",
      alt: "ruhmesmeile Logo",
      url: "https://www.ruhmesmeile.com/",
    },
    topic: "Geschäftsführer",
    address: `Mozartstraße 4-10<br />53115 Bonn<br />Deutschland`,
    avatar: {
      src: "img/placeholder/avatar-business-card-round.svg",
      alt: "Daniel Ley",
    },
    contactLinks: [
      {
        icon: "phone",
        label: "+49 228 30412660",
        url: "tel:+4922830412660",
      },
      {
        icon: "email",
        label: "mail@ruhmesmeile.com",
        url: "mailto:mail@ruhmesmeile.com",
      },
      {
        icon: "linkedin",
        label: "ruhmesmeile",
        url: "#",
      },
    ],
    buttons: [
      {
        label: "Kontakt aufnehmen",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
      },
    ],
  }),
};
