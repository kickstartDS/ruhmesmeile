import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Text } from "./TextComponent";
import schema from "./text.schema.dereffed.json";
import customProperties from "./text-tokens.json";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Text>;

export const SingleColumn: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 316,
    },
  },
  args: pack({
    layout: "singleColumn",
    text: `Ein Headless CMS trennt die Inhalte von ihrer Ausgabe. Redaktion und Frontend arbeiten dadurch entkoppelt: Inhalte werden einmal strukturiert gepflegt und lassen sich in Website, App und Landingpage gleichermaßen ausliefern – statt Seite für Seite neu zu bauen.

Der Unterschied zeigt sich im Redaktionsalltag. Statt fertiger Seiten entstehen **wiederverwendbare Module**, die sich frei kombinieren lassen. Wie das konkret aussieht, zeigen wir in unseren **[Case Studies](https://www.ruhmesmeile.com/case-studies)**.

*Kurz gesagt: Headless ist kein Werkzeugwechsel, sondern eine Entscheidung für Geschwindigkeit und Markenkonsistenz.*`,
  }),
};

export const Centered: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 314,
    },
  },
  args: pack({
    align: "center",
    text: `Ein Headless CMS trennt die Inhalte von ihrer Ausgabe. Redaktion und Frontend arbeiten dadurch entkoppelt: Inhalte werden einmal strukturiert gepflegt und lassen sich in Website, App und Landingpage gleichermaßen ausliefern – statt Seite für Seite neu zu bauen.

Der Unterschied zeigt sich im Redaktionsalltag. Statt fertiger Seiten entstehen **wiederverwendbare Module**, die sich frei kombinieren lassen. Wie das konkret aussieht, zeigen wir in unseren **[Case Studies](https://www.ruhmesmeile.com/case-studies)**.

*Kurz gesagt: Headless ist kein Werkzeugwechsel, sondern eine Entscheidung für Geschwindigkeit und Markenkonsistenz.*`,
  }),
};

export const MultiColumn: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 298,
    },
  },
  args: pack({
    layout: "multiColumn",
    text: `Ein Headless CMS trennt die Inhalte von ihrer Ausgabe. Redaktion und Frontend arbeiten dadurch entkoppelt: Inhalte werden einmal strukturiert gepflegt und lassen sich in Website, App und Landingpage gleichermaßen ausliefern – statt Seite für Seite neu zu bauen.

Der Unterschied zeigt sich im Redaktionsalltag. Statt fertiger Seiten entstehen **wiederverwendbare Module**, die sich frei kombinieren lassen. Wie das konkret aussieht, zeigen wir in unseren **[Case Studies](https://www.ruhmesmeile.com/case-studies)**.

*Kurz gesagt: Headless ist kein Werkzeugwechsel, sondern eine Entscheidung für Geschwindigkeit und Markenkonsistenz.*`,
  }),
};

export const Highlight: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 380,
    },
  },
  args: pack({
    highlightText: true,
    text: `Ein Headless CMS trennt die Inhalte von ihrer Ausgabe. Redaktion und Frontend arbeiten dadurch entkoppelt: Inhalte werden einmal strukturiert gepflegt und lassen sich in Website, App und Landingpage gleichermaßen ausliefern – statt Seite für Seite neu zu bauen.

Der Unterschied zeigt sich im Redaktionsalltag. Statt fertiger Seiten entstehen **wiederverwendbare Module**, die sich frei kombinieren lassen. Wie das konkret aussieht, zeigen wir in unseren **[Case Studies](https://www.ruhmesmeile.com/case-studies)**.

*Kurz gesagt: Headless ist kein Werkzeugwechsel, sondern eine Entscheidung für Geschwindigkeit und Markenkonsistenz.*`,
  }),
};
