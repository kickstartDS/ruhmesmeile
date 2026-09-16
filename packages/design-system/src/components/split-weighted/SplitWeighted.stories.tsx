import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { SplitWeighted } from "./SplitWeightedComponent";
import { Text } from "../text/TextComponent";
import schema from "./split-weighted.schema.dereffed.json";
import customProperties from "./split-weighted-tokens.json";
import { Headline } from "../headline/HeadlineComponent";
import { Contact } from "../contact/ContactComponent";
import { TeaserCard } from "../teaser-card/TeaserCardComponent";
import { Cta } from "../cta/CtaComponent";
import { ImageText } from "../image-text/ImageTextComponent";

const meta: Meta = {
  title: "Layout/Split Weighted",
  component: SplitWeighted,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof SplitWeighted>;

export const TextWithContact: Story = {
  parameters: {
    viewport: {
      width: 1630,
      height: 376,
    },
  },
  args: pack({
    verticalGutter: "large",
    asideLayout: {
      minWidth: "wide",
    },
    main: (
      <>
        <Cta
          headline="Buche einen CMS & Headless Check mit Daniel"
          text={`In 30 Minuten klären wir, ob Headless CMS, Design System oder ein Website Accelerator der richtige Weg für euch ist – und was das für euren Relaunch bedeutet.

Ihr bekommt eine ehrliche Einschätzung zu Aufwand, Technologie und Reihenfolge. Ohne Verkaufsdruck.`}
          buttons={[{ label: "Zur Terminbuchung" }]}
        />
      </>
    ),
    aside: (
      <>
        <Contact
          title={"Daniel Ley"}
          subtitle={"Geschäftsführer"}
          image={{
            src: "https://a.storyblok.com/f/297364/1000x667/dc09a74752/daniel-ley.png",
            aspectRatio: "wide",
          }}
          links={[
            {
              icon: "linkedin",
              url: "https://www.linkedin.com/company/ruhmesmeile/",
              label: "ruhmesmeile",
              ariaLabel: "ruhmesmeile auf LinkedIn",
            },
            {
              url: "mailto:mail@ruhmesmeile.com",
              icon: "email",
              label: "mail@ruhmesmeile.com",
              ariaLabel: "E-Mail an ruhmesmeile",
            },
          ]}
        />
      </>
    ),
  }),
};

export const TextWithTeaser: Story = {
  parameters: {
    viewport: {
      width: 1200,
      height: 600,
    },
  },
  args: pack({
    mainLayout: {
      gutter: "small",
      minWidth: "narrow",
    },
    asideLayout: {
      minWidth: "wide",
    },
    main: (
      <>
        <Headline
          text={"Dein CMS kann jetzt denken"}
          level={"h2"}
          spaceAfter="minimum"
        />
        <Text
          highlightText
          text={`Designsysteme bringen Konsistenz und Effizienz, auch für Content. Mit maschinenlesbaren Komponenten erzeugt KI automatisch passgenaue Inhalte, ganz ohne Training oder Prompt-Bastelei.

Möglich macht das MCP: der Standard, der KI direkt mit deinem CMS verbindet.`}
        />
      </>
    ),
    aside: (
      <TeaserCard
        layout="row"
        button={{
          chevron: false,
          hidden: false,
          label: "Artikel lesen",
        }}
        imageRatio="landscape"
        headline="Content Operations mit KI automatisieren"
        text="Wie MCP KI direkt mit deinem CMS verbindet."
        image="https://a.storyblok.com/f/297364/856x540/507306688b/teaser-glossary-mcp.png"
        url="/design-system-insights/dein-cms-kann-jetzt-denken"
      />
    ),
  }),
};

export const TextWithTeaserTiles: Story = {
  parameters: {
    viewport: {
      width: 1200,
      height: 600,
    },
  },
  args: pack({
    horizontalGutter: "small",
    order: {
      desktop: "asideFirst",
      mobile: "asideFirst",
    },
    mainLayout: {
      gutter: "small",
      minWidth: "narrow",
      layout: "smallTiles",
      stretchVertically: true,
    },
    asideLayout: {
      stretchVertically: true,
      minWidth: "wide",
      gutter: "small",
    },
    aside: (
      <>
        <ImageText
          text={`Dieser Absatz hebt **Informationen** hervor und enthält einen Textlink für weiterführende Inhalte. Mehr Details findet ihr im **[Insight zu Designsystemen](/design-system-insights/die-zeit-ist-reif-fuer-designsysteme)**.

*Dieser Absatz demonstriert kursive Auszeichnung.*`}
          image={{
            src: "https://a.storyblok.com/f/297364/1300x600/750e6b7a9f/rm_hero_cms-starter_2.png",
            alt: "",
          }}
          layout={"above"}
        />
      </>
    ),
    main: (
      <>
        <TeaserCard
          url={"/design-system-insights/dein-cms-kann-jetzt-denken"}
          headline="Dein CMS kann jetzt denken – Content Operations mit KI automatisieren"
          image="https://a.storyblok.com/f/297364/856x540/507306688b/teaser-glossary-mcp.png"
          imageRatio="square"
          layout="compact"
        />
        <TeaserCard
          url={"/design-system-insights/websites-muessen-ab-jetzt-neu-gedacht-werden"}
          headline="Das Ende des Monokanals – das Web bekommt zwei Gesichter"
          image="https://a.storyblok.com/f/297364/1536x1024/6c383d5ded/mcp-readiness.png"
          imageRatio="square"
          layout="compact"
        />
        <TeaserCard
          url={"/design-system-insights/moderne-unternehmenswebsite-schnell-markenkonform"}
          headline="Schneller zur modernen Unternehmenswebsite – markenkonform und wartungsarm"
          image="https://a.storyblok.com/f/297364/2030x1100/552cb82cce/rm-corporate-ui-cover.png"
          imageRatio="square"
          layout="compact"
        />
        <TeaserCard
          url={"/design-system-insights/vereinfache-den-switch-zu-headless-cms"}
          headline="Vereinfache den Switch zu Headless CMS"
          image="https://a.storyblok.com/f/297364/1300x721/d211c2a5cf/rm_insight-headless.png"
          imageRatio="square"
          layout="compact"
        />
        <TeaserCard
          url={"/design-system-insights/design-systeme-das-fehlende-puzzle-teil-in-mach-architekturen"}
          headline="Warum ein Designsystem das fehlende Stück in der MACH-Architektur ist"
          image="https://a.storyblok.com/f/297364/960x540/fd30519e08/blog-post_mach-alliance.png"
          imageRatio="square"
          layout="compact"
        />
        <TeaserCard
          url={"/design-system-insights/die-zeit-ist-reif-fuer-designsysteme"}
          headline="Die Zeit ist reif für Designsysteme"
          image="https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png"
          imageRatio="square"
          layout="compact"
        />
      </>
    ),
  }),
};
