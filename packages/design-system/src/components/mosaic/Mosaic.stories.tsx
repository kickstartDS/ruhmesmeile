import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Mosaic } from "./MosaicComponent";
import schema from "./mosaic.schema.dereffed.json";
import customProperties from "./mosaic-tokens.json";

const meta: Meta = {
  title: "Components/Mosaic",
  component: Mosaic,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Mosaic>;

export const ColorfulTiles: Story = {
  parameters: {
    viewport: {
      width: 1010,
      height: 1480,
    },
  },
  args: pack({
    layout: "alternate",
    tile: [
      {
        backgroundColor: "#ffd4f1",
        headline: "Schnell live",
        text: "Kurze Umsetzungszeiten, klar strukturierte Setups – euer Projekt ist in Wochen online, nicht in Monaten.",
        image: {
          src: "img/placeholder/avatar-square.svg",
        },
        button: {
          label: "Beratung starten",
        },
      },
      {
        backgroundColor: "#d8e8f",
        headline: "Flexibel erweiterbar",
        text: "Modular angelegt für langfristige Skalierung: neue Module und Marken kommen dazu, ohne dass alles neu gebaut werden muss.",
        image: {
          src: "img/placeholder/avatar-square.svg",
        },
        button: {
          label: "Case Studies ansehen",
        },
      },
      {
        backgroundColor: "#ddfffe",
        headline: "Markenkonsistent",
        text: "Einheitlicher Auftritt über alle Inhalte und Formate hinweg – 100% Brand-Konsistenz, auch bei vielen Marken.",
        image: {
          src: "img/placeholder/avatar-square.svg",
        },
        button: {
          label: "Über uns",
        },
      },
    ],
  }),
};

export const ColorfulTextWithImagesBeside: Story = {
  parameters: {
    viewport: {
      width: 1010,
      height: 1480,
    },
  },
  args: pack({
    layout: "textLeft",
    tile: [
      {
        textColor: "#086d10ff",
        button: {
          toggle: false,
        },
        headline: "CMS Website Accelerator",
        text: "Wir unterstützen euch bei der Erprobung neuer Web-Technologien zur Ablösung von starren Alt-Systemen.",
        image: {
          src: "img/placeholder/product-shot-sqaure-spacing.svg",
        },
      },
      {
        textColor: "#5717b0ff",
        button: {
          toggle: false,
        },
        headline: "Design System Beratung",
        text: "Wir beraten euch bei Prozessen, Tools und Software für moderne Frontend-Architekturen.",
        image: {
          src: "img/placeholder/product-shot-sqaure-spacing.svg",
        },
      },
      {
        textColor: "#007387ff",
        button: {
          toggle: false,
        },
        headline: "Composable Frontends",
        text: "Wiederverwendbare, modulare Komponenten für flexible und anpassbare UIs – unabhängig vom CMS.",
        image: {
          src: "img/placeholder/product-shot-sqaure-spacing.svg",
        },
      },
    ],
  }),
};
