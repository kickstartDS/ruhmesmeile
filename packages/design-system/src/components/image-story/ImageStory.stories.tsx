import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { ImageStory } from "./ImageStoryComponent";
import schema from "./image-story.schema.dereffed.json";
import customProperties from "./image-story-tokens.json";

const meta: Meta = {
  title: "Components/Image Story",
  component: ImageStory,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof ImageStory>;

export const StickyImageNextToScrollingText: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 1144,
    },
  },
  args: pack({
    headline: "Telekom Exklusivpartner Webbaukasten",
    sub: "Ein Web-Baukasten für über 400 Vertriebspartner",
    text: `
Für die Deutsche Telekom entwickelten wir einen Webbaukasten, mit dem exklusive Vertriebspartner ihre eigenen Webseiten erstellen – ohne Agentur, ohne Design-Kenntnisse und ohne Abstriche bei der Marke.

### Ausgangslage
Über 400 Partner brauchten eigene Auftritte für ihre Region. Eine zentrale Vorlage für alle war zu starr, individuelle Projekte zu teuer und zu langsam – und jede Abweichung ein Risiko für die Marke.

### Unser Ansatz
Wir haben die Marke in ein Design System übersetzt: wiederverwendbare Module, klare Regeln und ein Redaktionssystem, in dem die Partner ihre Inhalte selbst pflegen. Komponenten führen die Redaktion, statt sie in Freigabeschleifen zu schicken.

### Umsetzung
Auf Basis des CMS Website Accelerators entstand ein modularer Baukasten aus Headless CMS und Composable Frontend. Die Inhalte liegen strukturiert in Storyblok, das Frontend liefert sie markenkonform aus – schnell, wartungsarm und unabhängig vom Kanal.

### Ergebnis
100% Brand-Konsistenz bei über 400 Vertriebspartnern. Neue Seiten entstehen heute in Stunden statt in Wochen, und die Zentrale pflegt Richtlinien an einer einzigen Stelle.

Wollt ihr euren eigenen Webbaukasten aufsetzen?
    `,
    largeHeadline: true,
    image: {
      src: "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png/m/1080x810",
      alt: "Telekom Exklusivpartner Webbaukasten – Projektvisual",
      aspectRatio: "unset",
      vAlign: "top",
    },
    buttons: [
      {
        label: "Case Study ansehen",
        url: "#",
        icon: "arrow-right",
      },
    ],
  }),
};
