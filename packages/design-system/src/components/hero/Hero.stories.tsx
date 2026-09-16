import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Hero } from "./HeroComponent";
import schema from "./hero.schema.dereffed.json";
import customProperties from "./hero-tokens.json";

const meta: Meta = {
  title: "Components/Hero",
  component: Hero,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const TextBelowImage: Story = {
  parameters: {
    viewport: {
      width: 1024,
      height: 884,
    },
  },
  args: pack({
    headline:
      "Spezialisierte Beratung für modulare Web-Frontends & Headless CMS im KI-Zeitalter",
    sub: "Wir entwickeln & launchen. In Wochen, nicht Monaten.",
    text: "Wir begleiten euch von der Strategie über das Design bis zum Go-Live – mit Headless CMS, Design Systemen und Composable Frontends.",
    highlightText: true,
    textbox: false,
    overlay: true,
    textPosition: "below",
    image: {
      srcMobile:
        "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png/m/640x480",
      srcTablet:
        "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png/m/1080x810",
      srcDesktop:
        "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png/m/1920x1440",
      src: "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png/m/1080x810",
    },
    buttons: [
      {
        label: "Beratung starten",
        icon: "arrow-down",
        url: "#",
      },
    ],
  }),
};

export const TextOnImageWithOverlay: Story = {
  parameters: {
    viewport: {
      width: 1024,
      height: 738,
    },
  },
  args: pack({
    headline: "In Wochen, nicht Monaten",
    text: "Wir entwickeln und launchen eure Website auf Basis von Headless CMS und Design System – modular, markenkonform und wartungsarm.",
    textbox: false,
    colorNeutral: true,
    height: "fullImage",
    overlay: true,
    textPosition: "bottom",
    image: {
      srcMobile:
        "https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png/m/640x480",
      srcTablet:
        "https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png/m/1080x810",
      srcDesktop:
        "https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png/m/1920x1440",
      src: "https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png/m/1080x810",
    },
    buttons: [
      {
        label: "Case Studies ansehen",
        icon: "arrow-right",
        url: "#",
      },
    ],
  }),
};

export const TextBoxOnFullScreen: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 900,
    },
  },
  args: pack({
    headline: "Design Systeme & Composable Frontends",
    sub: "Skalierbar, flexibel bei hocheffizienter Redaktion",
    text: "Egal, wie viele Marken oder Produkte ihr habt – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit eurem Unternehmen wachsen.",
    textbox: true,
    height: "fullScreen",
    highlightText: false,
    skipButton: true,
    textPosition: "left",
    image: {
      srcMobile:
        "https://a.storyblok.com/f/297364/1193x885/21d9a5dfa9/img_2899-1.jpg/m/640x480",
      srcTablet:
        "https://a.storyblok.com/f/297364/1193x885/21d9a5dfa9/img_2899-1.jpg/m/1080x810",
      srcDesktop:
        "https://a.storyblok.com/f/297364/1193x885/21d9a5dfa9/img_2899-1.jpg/m/1193x885",
      src: "https://a.storyblok.com/f/297364/1193x885/21d9a5dfa9/img_2899-1.jpg/m/1080x810",
    },
    buttons: [
      {
        label: "Beratung starten",
        icon: "",
        url: "#",
      },
      {
        label: "Über uns",
        icon: "",
        url: "#",
      },
    ],
  }),
};
