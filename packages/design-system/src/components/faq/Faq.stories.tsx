import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Faq } from "./FaqComponent";
import schema from "./faq.schema.dereffed.json";
import customProperties from "./faq-tokens.json";

const meta: Meta = {
  title: "Components/Faq",
  component: Faq,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Faq>;

export const DropdownList: Story = {
  parameters: {
    viewport: {
      width: 820,
      height: 348,
    },
  },
  args: pack({
    questions: [
      {
        question: "Headless CMS oder Monolith – was passt zu uns?",
        answer:
          "Monolithen wie TYPO3 oder WordPress sind schnell aufgesetzt, aber starr: Frontend, Redaktion und Auslieferung hängen aneinander. Headless trennt die Inhalte von der Darstellung. Ihr entscheidet später, ob Website, Shop oder App auf dieselben Inhalte zugreifen, und könnt Frontend und CMS unabhängig voneinander weiterentwickeln. Wir schauen uns euren Anwendungsfall an und sagen euch ehrlich, ob sich der Wechsel für euch rechnet – oder ob ein sauber aufgesetzter Monolith die günstigere Wahl bleibt.",
      },
      {
        question: "Was kostet eine Website mit Headless CMS?",
        answer:
          "Wir arbeiten mit Festpreisen pro Paket statt mit offenen Tagessätzen. Nach einem Erstgespräch wissen wir, welches Paket zu eurem Umfang passt, und ihr bekommt ein Angebot, bevor wir anfangen. Wartung, Hosting und Erweiterungen kalkulieren wir von Anfang an mit.",
      },
      {
        question: "Wie lange dauert ein Relaunch?",
        answer:
          "Ein CMS Website Accelerator geht in Wochen live, nicht in Monaten. Ein kompletter Relaunch mit eigenem Design System dauert je nach Anzahl der Marken und Templates länger – den Ablauf planen wir gemeinsam in Etappen.",
      },
    ],
  }),
};

export const SingleDropdown: Story = {
  parameters: {
    viewport: {
      width: 820,
      height: 216,
    },
  },
  args: pack({
    questions: [
      {
        question: "Wie läuft die Migration von unserem alten System?",
        answer:
          "Wir starten mit einer Analyse: Welche Inhalte werden wirklich gebraucht, welche Strukturen tragen, welche Templates lassen sich zusammenfassen? Danach modellieren wir die Inhalte im neuen CMS, bauen die Komponenten und migrieren die Seiten, wo es geht, automatisiert. Euer Alt-System läuft währenddessen weiter, ihr geht erst live, wenn die wichtigsten Seiten abgenommen sind. Nach dem Go-Live begleiten wir eure Redaktion in der Einarbeitung.",
      },
    ],
  }),
};
