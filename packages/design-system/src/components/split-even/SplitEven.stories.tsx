import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { SplitEven } from "./SplitEvenComponent";
import schema from "./split-even.schema.dereffed.json";
import customProperties from "./split-even-tokens.json";
import { Logos } from "../logos/LogosComponent";
import { Headline } from "../headline/HeadlineComponent";
import { Faq } from "../faq/FaqComponent";
import { TextArea } from "@kickstartds/form/lib/text-area";
import { Button } from "../button/ButtonComponent";
import { Cta } from "../cta/CtaComponent";
import { TeaserCard } from "../teaser-card/TeaserCardComponent";

const meta: Meta = {
  title: "Layout/Split Even",
  component: SplitEven,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof SplitEven>;

export const TextWithLogos: Story = {
  parameters: {
    viewport: {
      width: 1690,
      height: 530,
    },
  },
  args: pack({
    contentGutter: "small",
    verticalAlign: "center",
    contentMinWidth: "wide",
    firstComponents: (
      <>
        <Cta
          highlightText
          headline="Marken, die auf modulare Frontends setzen"
          text={`Wir beraten, gestalten und entwickeln Headless CMS Websites und Design Systeme – für Energie- und Industrieunternehmen genauso wie für Universitäten und den Mittelstand.

Statt starrer Alt-Systeme bekommt ihr wiederverwendbare Komponenten, die eure Teams selbst zusammensetzen – markenkonform und wartungsarm.`}
          buttons={[{ label: "Case Studies ansehen" }]}
        />
      </>
    ),
    secondComponents: (
      <>
        <Logos
          logosPerRow={3}
          logo={[
            {
              src: "https://a.storyblok.com/f/297364/1100x380/9ef50ca58f/dachser.svg",
              alt: "Dachser Intelligent Logistics",
            },
            {
              src: "https://a.storyblok.com/f/297364/1100x380/6d81aafe99/postbank.svg",
              alt: "Postbank",
            },
            {
              src: "https://a.storyblok.com/f/297364/200x70/de377c4c40/logo-telekom.svg",
              alt: "Deutsche Telekom AG",
            },
            {
              src: "https://a.storyblok.com/f/297364/1100x380/db1caceacf/rewe.svg",
              alt: "REWE",
            },
            {
              src: "https://a.storyblok.com/f/297364/1100x380/6ebf09d690/wolfcraft.svg",
              alt: "Wolfcraft",
            },
            {
              src: "https://a.storyblok.com/f/297364/200x60/640dee0e0f/logo_maxcluster.svg",
              alt: "maxcluster",
            },
          ]}
        />
      </>
    ),
  }),
};

export const FAQWithForm: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 464,
    },
  },
  args: pack({
    contentGutter: "small",
    verticalAlign: "top",
    sectionMinWidth: "medium",
    horizontalGutter: "large",
    verticalGutter: "large",
    firstComponents: (
      <>
        <Headline text={"Häufige Fragen"} level={"h2"} />
        <Faq
          questions={[
            {
              answer:
                "Ein Design System ist die Sammlung wiederverwendbarer Komponenten, Design-Tokens und Regeln, mit der eure Teams konsistente Oberflächen bauen – unabhängig davon, wer gerade entwickelt.",
              question: "Was ist ein Design System?",
            },
            {
              answer:
                "Konsistenz, Geschwindigkeit und Wartbarkeit: Änderungen passieren einmal zentral und wirken überall. Eine Universität setzt ihre Projekte seitdem 40% schneller um als vorher.",
              question: "Was bringt euch ein Design System?",
            },
            {
              answer:
                "Ein Headless CMS trennt Inhalte von der Darstellung. Die Präsentationsschicht bleibt damit austauschbar, Inhalte bleiben über alle Kanäle konsistent – die Grundlage für modulare, markenkonforme Frontends.",
              question:
                "Welche Rolle spielt ein Headless CMS in einem Design System?",
            },
          ]}
        />
      </>
    ),
    secondComponents: (
      <>
        <Headline
          text="Noch Fragen?"
          level="h3"
          style="h3"
          spaceAfter="minimum"
        />
        <TextArea label="Schreibt uns direkt!" />
        <Button label={"Absenden"} />
      </>
    ),
  }),
};

export const MainTeaserWithGrid: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 464,
    },
  },
  args: pack({
    contentGutter: "medium",
    verticalAlign: "stretch",
    sectionMinWidth: "narrow",
    horizontalGutter: "small",
    verticalGutter: "small",
    secondLayout: {
      layout: "smallTiles",
      stretchVertically: true,
      gutter: "small",
    },
    firstLayout: {
      stretchVertically: true,
      gutter: "small",
    },
    firstComponents: (
      <>
        <TeaserCard
          layout="compact"
          url={"/case-studies/design-system-fuer-universitaet"}
          headline="Design System für eine Universität"
          image="https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png"
          text="Projekte sind 40% schneller umgesetzt als vorher."
          imageRatio="landscape"
          button={{
            label: "Mehr erfahren",
            chevron: true,
          }}
        />
      </>
    ),
    secondComponents: (
      <>
        <TeaserCard
          layout="compact"
          url={"/headless-cms/cms-website-accelerator"}
          headline="CMS Website Accelerator"
          image="https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png"
        />
        <TeaserCard
          layout="compact"
          url={"/design-system-services/vorteile-eines-design-systems"}
          headline="Design System Beratung"
          image="https://a.storyblok.com/f/297364/2030x1100/552cb82cce/rm-corporate-ui-cover.png"
        />
        <TeaserCard
          layout="compact"
          url={"/headless-cms/composable-frontends"}
          headline="Composable Frontends"
          image="https://a.storyblok.com/f/297364/330x330/e426dfbd49/hp-deko-illu-systems.svg"
        />
        <TeaserCard
          layout="compact"
          url={"/case-studies/ngo-landing-page-builder"}
          headline="Landing Page Accelerator für NGO"
          image="https://a.storyblok.com/f/297364/1080x810/90f97374e7/projekte_teaser_ngo.png"
        />
        <TeaserCard
          layout="compact"
          url={
            "/case-studies/deutsche-telekom-exklusivpartner-web-baukasten"
          }
          headline="Telekom Exklusivpartner Webbaukasten"
          image="https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png"
        />
        <TeaserCard
          layout="compact"
          url={"/case-studies/dachser-design-system"}
          headline="Dachser Design System"
          image="https://a.storyblok.com/f/297364/1080x810/6a4ce7621a/dachser_teaser_4zu3.png"
        />
      </>
    ),
  }),
};
