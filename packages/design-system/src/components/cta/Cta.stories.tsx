import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Cta } from "./CtaComponent";
import customProperties from "./cta-tokens.json";
import schema from "./cta.schema.dereffed.json";

const meta: Meta = {
  title: "Components/Cta",
  component: Cta,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Cta>;

export const Banner: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 328,
    },
  },
  args: pack({
    headline: "Die Beratung für modulare Web-Frontends & Headless CMS",
    sub: "Wir entwickeln & launchen. In Wochen, nicht in Monaten.",
    text: "Spezialisierte Beratung für modulare Web-Frontends & Headless CMS im KI-Zeitalter – kurze Wege, direkte Zusammenarbeit mit Senior-Expert:innen.",
    textAlign: "center",
    buttons: [
      {
        label: "Beratung starten",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
        icon: "chevron-right",
      },
      {
        label: "Case Studies ansehen",
        url: "https://www.ruhmesmeile.com/case-studies/",
        icon: "",
      },
    ],
  }),
};

export const Highlighted: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 390,
    },
  },
  args: pack({
    headline: "Design Systeme, die mit eurem Unternehmen wachsen",
    sub: "20+ Jahre Erfahrung, 250+ erfolgreiche Projekte",
    highlightText: true,
    textAlign: "center",
    text: "Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar.",
    buttons: [
      {
        label: "Projektanfrage",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
        icon: "chevron-right",
      },
    ],
  }),
};

export const LeftAligned: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 354,
    },
  },
  args: pack({
    headline: "Von der Beratung bis zum Go-Live",
    sub: "Headless CMS, Design Systeme, Composable Frontends",
    text: "Wir unterstützen euch bei der Erprobung neuer Web-Technologien zur Ablösung von starren Alt-Systemen – skalierbar und investitionssicher.",
    buttons: [
      {
        label: "Alle Insights",
        url: "https://www.ruhmesmeile.com/design-system-insights/",
        icon: "chevron-right",
      },
    ],
  }),
};

export const ProductAdvertisement: Story = {
  parameters: {
    viewport: {
      width: 1400,
      height: 690,
    },
  },
  args: pack({
    headline: "CMS Website Accelerator: in 48 Stunden live",
    sub: "Blitzschneller Go-Live, inklusive CMS-Integration",
    text: "Wir unterstützen euch bei der Erprobung neuer Web-Technologien zur Ablösung von starren Alt-Systemen.",
    backgroundImage: "img/bg_dot-carpet-blue.svg",
    highlightText: true,
    padding: true,
    order: {
      desktopImageLast: false,
    },
    image: {
      padding: false,
      src: "img/placeholder/cta-product-shot.svg",
      alt: "Vorschau des CMS Website Accelerators",
    },
    buttons: [
      {
        label: "CMS Pakete & Preise",
        url: "https://www.ruhmesmeile.com/headless-cms/cms-website-accelerator",
        icon: "chevron-right",
      },
    ],
  }),
};

export const ContactBanner: Story = {
  parameters: {
    viewport: {
      width: 1600,
      height: 628,
    },
  },
  args: pack({
    headline: "Sprecht mit uns über euer Projekt",
    sub: "Daniel und Jonas nehmen sich Zeit für eure Fragen",
    text: "Schreibt uns, worum es geht – oder bucht direkt einen Termin. Ihr bekommt eine technische Einschätzung, keine Hochglanz-Präsentation.",
    padding: true,
    image: {
      src: "img/placeholder/cta-contact-banner.svg",
      padding: false,
    },
    order: {
      desktopImageLast: false,
    },
    buttons: [
      {
        label: "Kontakt aufnehmen",
        icon: "person",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
      },
      {
        label: "Zur Terminbuchung",
        icon: "date",
        url: "https://app.lemcal.com/@daniel-ley",
      },
    ],
  }),
};

export const SplitBanner: Story = {
  parameters: {
    viewport: {
      width: 1680,
      height: 788,
    },
  },
  args: pack({
    headline: "Composable Frontends für euren Baukasten",
    sub: "Wiederverwendbare Module statt Einzellösungen",
    text: "Unsere UI-Komponentenbibliothek liefert modulare Bausteine, mit denen euer Team Landingpages selbst zusammenstellt – schnell, markenkonform und wartungsarm.",
    colorNeutral: true,
    backgroundColor: "#d9e4ff",
    padding: true,
    order: {
      desktopImageLast: false,
    },
    image: {
      src: "img/placeholder/cta-split-banner.svg",
      padding: false,
    },
    buttons: [
      {
        label: "Mehr über Composable Frontends",
        icon: "",
        url: "https://www.ruhmesmeile.com/headless-cms/composable-frontends",
      },
    ],
  }),
};

export const AngledImage: Story = {
  parameters: {
    viewport: {
      width: 1670,
      height: 788,
    },
  },
  args: pack({
    headline:
      "Wir entwickeln **Design Systeme**, die mit eurem Unternehmen wachsen",
    text: `Markenkonform, wartungsarm und schnell: Wir bauen die Basis, auf der eure Teams Landingpages im Baukasten-Prinzip zusammenstellen.`,
    sub: "Design Systeme & Composable Frontends",
    padding: true,
    image: {
      src: "img/placeholder/cta-angled-image.svg",
      padding: false,
    },
    order: {
      desktopImageLast: true,
    },
    buttons: [
      {
        label: "Design System Services",
        icon: "",
        url: "https://www.ruhmesmeile.com/design-system-services",
      },
    ],
  }),
};

export const ColoredBanner: Story = {
  parameters: {
    viewport: {
      width: 1350,
      height: 484,
    },
  },
  args: pack({
    headline: "Headless CMS, kurz erklärt",
    text: "Inhalte liegen getrennt vom Frontend und werden über APIs ausgeliefert. Das macht euch flexibel bei Marken, Kanälen und Relaunches – ohne starre Templates.",
    sub: "In fünf Minuten erklärt",
    highlightText: true,
    colorNeutral: true,
    backgroundColor: "#a1d5d6ff",
    padding: true,
    buttons: [
      {
        label: "Was sind Headless CMS?",
        url: "https://www.ruhmesmeile.com/headless-cms/was-ist-ein-headless-cms",
      },
      {
        label: "Zur Terminbuchung",
        url: "https://app.lemcal.com/@daniel-ley",
      },
    ],
  }),
};

export const AlignBottom: Story = {
  parameters: {
    viewport: {
      width: 1680,
      height: 905,
    },
  },
  args: pack({
    headline: "Bereit für ein Frontend, das mit euch wächst?",
    text: `Wir zeigen euch in 30 Minuten, wie ein Headless-Setup bei euch aussehen kann – konkret an euren Seiten, nicht an Folien.`,
    sub: "Termin buchen, offene Fragen klären",
    backgroundImage: "img/grid-bg-light.svg",
    align: "bottom",
    image: {
      src: "img/placeholder/cta-align-bottom.svg",
    },
    order: {
      desktopImageLast: false,
    },
    buttons: [
      {
        label: "Beratung starten",
        url: "https://www.ruhmesmeile.com/ueber-uns/kontakt",
      },
    ],
  }),
};
