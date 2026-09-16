import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { SearchResult } from "./SearchResultComponent";
import schema from "./search-result.schema.dereffed.json";

const meta: Meta<typeof SearchResult> = {
  title: "Corporate / Search Result",
  component: SearchResult,
  parameters: {
    jsonschema: { schema },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof SearchResult>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 780,
      height: 636,
    },
  },
  args: pack({
    title:
      "Warum ein Designsystem das fehlende Stück in der MACH-Architektur ist",
    previewImage:
      "https://a.storyblok.com/f/297364/960x540/fd30519e08/blog-post_mach-alliance.png",
    initialMatch:
      "Inmitten all der Möglichkeiten von MACH-Architekturen übersehen Unternehmen oft einen wichtigen Bestandteil einer effizienten digitalen Landschaft: ein digitales **Designsystem**.",
    matches: [
      {
        title: "Die Zeit ist reif für Designsysteme",
        snippet:
          "Ein **Designsystem** sorgt für konsistente Gestaltung und Effizienz in der Entwicklung – und steigert den Wert eures Produkts.",
        url: "https://www.ruhmesmeile.com/design-system-insights/die-zeit-ist-reif-fuer-designsysteme",
      },
      {
        title: "Warum entwickeln wir kickstartDS?",
        snippet:
          "Wir geben euch die optimale Grundlage für euer eigenes **Designsystem** an die Hand – mit bewährten Konzepten und offenen Standards.",
        url: "https://www.ruhmesmeile.com/design-system-insights/warum-entwickeln-wir-kickstartds",
      },
      {
        title:
          "Schneller zur modernen Unternehmenswebsite – markenkonform und wartungsarm",
        snippet:
          "Das Frontend Package: modulare Bausteine wie ein digitaler LEGO-Baukasten für starke Markenauftritte ohne Entwickleraufwand.",
        url: "https://www.ruhmesmeile.com/design-system-insights/moderne-unternehmenswebsite-schnell-markenkonform",
      },
    ],
    url: "https://www.ruhmesmeile.com/design-system-insights/design-systeme-das-fehlende-puzzle-teil-in-mach-architekturen",
  }),
};
