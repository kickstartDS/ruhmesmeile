import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Features } from "./FeaturesComponent";
import schema from "./features.schema.dereffed.json";
import customProperties from "./features-tokens.json";

const meta: Meta<typeof Features> = {
  title: "Components/Features",
  component: Features,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Features>;

export const IconCentered: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 636,
    },
  },
  args: pack({
    style: "centered",
    layout: "largeTiles",
    feature: [
      {
        icon: "star",
        title: "Headless CMS",
        text: "Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites.",
        cta: {
          url: "#",
          label: "Headless CMS Services",
        },
      },
      {
        icon: "time",
        title: "Design Systeme & Composable Frontends",
        text: "Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen.",
        cta: {
          url: "#",
          label: "Design System Services",
        },
      },
      {
        icon: "upload",
        title: "User Experience Design",
        text: "Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation.",
        cta: {
          url: "#",
          label: "UX Strategie & Beratung",
        },
      },
      {
        icon: "login",
        title: "Berater für euren CMS Relaunch",
        text: "Wir finden die perfekte Lösung für deine Bedürfnisse. Dabei nehmen wir uns die Zeit, um deine Ziele und Anforderungen genau zu verstehen und herauszufordern.",
        cta: {
          url: "#",
          label: "Über uns",
        },
      },
      {
        icon: "person",
        title: "CMS Website Accelerator",
        text: "Blitzschneller Go-Live in Wochen statt Monaten: CMS-Integration inklusive, skalierbar angelegt und investitionssicher für die nächsten Jahre.",
        cta: {
          url: "#",
          label: "CMS Pakete & Preise",
        },
      },
      {
        icon: "map",
        title: "White-Label Frontends",
        text: "Unsere Komponentenbibliothek liefert wiederverwendbare, modulare Bausteine – als White-Label-Frontend für eure Marken, Produkte und Landingpages.",
        cta: {
          url: "#",
          label: "Mehr über Composable Frontends",
        },
      },
    ],
  }),
};

export const StackWithButton: Story = {
  parameters: {
    viewport: {
      width: 1230,
      height: 463,
    },
  },
  args: pack({
    style: "stack",
    layout: "smallTiles",
    ctas: {
      style: "button",
    },
    feature: [
      {
        icon: "star",
        title: "Headless CMS",
        text: "Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites.",
        cta: {
          url: "#",
          label: "Headless CMS Services",
        },
      },
      {
        icon: "time",
        title: "Design Systeme & Composable Frontends",
        text: "Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen.",
        cta: {
          url: "#",
          label: "Design System Services",
        },
      },
      {
        icon: "upload",
        title: "User Experience Design",
        text: "Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation.",
        cta: {
          url: "#",
          label: "UX Strategie & Beratung",
        },
      },
      {
        icon: "login",
        title: "Berater für euren CMS Relaunch",
        text: "Wir finden die perfekte Lösung für deine Bedürfnisse. Dabei nehmen wir uns die Zeit, um deine Ziele und Anforderungen genau zu verstehen und herauszufordern.",
        cta: {
          url: "#",
          label: "Über uns",
        },
      },
    ],
  }),
};

export const ListView: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 844,
    },
  },
  args: pack({
    style: "besideLarge",
    layout: "list",
    ctas: {
      style: "intext",
      toggle: false,
    },
    feature: [
      {
        icon: "star",
        title: "Headless CMS",
        text: "Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites.",
        cta: {
          url: "#",
          label: "Headless CMS Services",
        },
      },
      {
        icon: "time",
        title: "Design Systeme & Composable Frontends",
        text: "Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen.",
        cta: {
          url: "#",
          label: "Design System Services",
        },
      },
      {
        icon: "upload",
        title: "User Experience Design",
        text: "Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation.",
        cta: {
          url: "#",
          label: "UX Strategie & Beratung",
        },
      },
      {
        icon: "login",
        title: "Berater für euren CMS Relaunch",
        text: "Wir finden die perfekte Lösung für deine Bedürfnisse. Dabei nehmen wir uns die Zeit, um deine Ziele und Anforderungen genau zu verstehen und herauszufordern.",
        cta: {
          url: "#",
          label: "Über uns",
        },
      },
      {
        icon: "person",
        title: "CMS Website Accelerator",
        text: "Blitzschneller Go-Live in Wochen statt Monaten: CMS-Integration inklusive, skalierbar angelegt und investitionssicher für die nächsten Jahre.",
        cta: {
          url: "#",
          label: "CMS Pakete & Preise",
        },
      },
      {
        icon: "map",
        title: "White-Label Frontends",
        text: "Unsere Komponentenbibliothek liefert wiederverwendbare, modulare Bausteine – als White-Label-Frontend für eure Marken, Produkte und Landingpages.",
        cta: {
          url: "#",
          label: "Mehr über Composable Frontends",
        },
      },
    ],
  }),
};

export const IconBesideWithLinkInText: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 476,
    },
  },
  args: pack({
    style: "intext",
    layout: "smallTiles",
    ctas: {
      style: "intext",
    },
    feature: [
      {
        icon: "star",
        title: "Headless CMS",
        text: "Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites.",
        cta: {
          url: "#",
          label: "Headless CMS Services",
        },
      },
      {
        icon: "time",
        title: "Design Systeme & Composable Frontends",
        text: "Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen.",
        cta: {
          url: "#",
          label: "Design System Services",
        },
      },
      {
        icon: "upload",
        title: "User Experience Design",
        text: "Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation.",
        cta: {
          url: "#",
          label: "UX Strategie & Beratung",
        },
      },
      {
        icon: "login",
        title: "Berater für euren CMS Relaunch",
        text: "Wir finden die perfekte Lösung für deine Bedürfnisse. Dabei nehmen wir uns die Zeit, um deine Ziele und Anforderungen genau zu verstehen und herauszufordern.",
        cta: {
          url: "#",
          label: "Über uns",
        },
      },
      {
        icon: "person",
        title: "CMS Website Accelerator",
        text: "Blitzschneller Go-Live in Wochen statt Monaten: CMS-Integration inklusive, skalierbar angelegt und investitionssicher für die nächsten Jahre.",
        cta: {
          url: "#",
          label: "CMS Pakete & Preise",
        },
      },
      {
        icon: "map",
        title: "White-Label Frontends",
        text: "Unsere Komponentenbibliothek liefert wiederverwendbare, modulare Bausteine – als White-Label-Frontend für eure Marken, Produkte und Landingpages.",
        cta: {
          url: "#",
          label: "Mehr über Composable Frontends",
        },
      },
    ],
  }),
};

export const IconIntextWithLink: Story = {
  parameters: {
    viewport: {
      width: 1232,
      height: 524,
    },
  },
  args: pack({
    style: "intext",
    ctas: {
      style: "link",
    },
    feature: [
      {
        icon: "star",
        title: "Headless CMS",
        text: "Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites.",
        cta: {
          url: "#",
          label: "Headless CMS Services",
        },
      },
      {
        icon: "time",
        title: "Design Systeme & Composable Frontends",
        text: "Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen.",
        cta: {
          url: "#",
          label: "Design System Services",
        },
      },
      {
        icon: "upload",
        title: "User Experience Design",
        text: "Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation.",
        cta: {
          url: "#",
          label: "UX Strategie & Beratung",
        },
      },
      {
        icon: "login",
        title: "Berater für euren CMS Relaunch",
        text: "Wir finden die perfekte Lösung für deine Bedürfnisse. Dabei nehmen wir uns die Zeit, um deine Ziele und Anforderungen genau zu verstehen und herauszufordern.",
        cta: {
          url: "#",
          label: "Über uns",
        },
      },
      {
        icon: "person",
        title: "CMS Website Accelerator",
        text: "Blitzschneller Go-Live in Wochen statt Monaten: CMS-Integration inklusive, skalierbar angelegt und investitionssicher für die nächsten Jahre.",
        cta: {
          url: "#",
          label: "CMS Pakete & Preise",
        },
      },
      {
        icon: "map",
        title: "White-Label Frontends",
        text: "Unsere Komponentenbibliothek liefert wiederverwendbare, modulare Bausteine – als White-Label-Frontend für eure Marken, Produkte und Landingpages.",
        cta: {
          url: "#",
          label: "Mehr über Composable Frontends",
        },
      },
    ],
  }),
};
