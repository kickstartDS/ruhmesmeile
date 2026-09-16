import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";
import sectionStories from "@kickstartds/base/lib/section/section.stories";

import { TeaserCard } from "../teaser-card/TeaserCardComponent";
import { Section } from "./SectionComponent";
import schema from "./section.schema.dereffed.json";
import customProperties from "./section-tokens.json";

const meta: Meta = {
  ...sectionStories,
  title: "Layout/Section",
  component: Section,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
  render: (args) => (
    <Section {...args}>
      <TeaserCard
        layout="row"
        headline="Headless CMS"
        text="Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites."
        image="https://a.storyblok.com/f/297364/1300x721/d211c2a5cf/rm_insight-headless.png"
        url="/headless-cms/headless-cms-services"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="User Experience Design"
        text="Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation."
        image="https://a.storyblok.com/f/297364/1300x600/750e6b7a9f/rm_hero_cms-starter_2.png"
        url="/ux-strategie-beratung"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="Design Systeme & Composable Frontends"
        text="Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen."
        image="https://a.storyblok.com/f/297364/2030x1100/552cb82cce/rm-corporate-ui-cover.png"
        url="/design-system-services"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
    </Section>
  ),
};

export default meta;

type Story = StoryObj<typeof Section>;

export const DynamicLayout: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 846,
    },
  },
  args: pack({
    content: {
      mode: "flex",
    },
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "center",
    },
    buttons: [],
  }),
  render: (args) => (
    <Section {...args}>
      <TeaserCard
        layout="row"
        headline="Headless CMS"
        text="Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites."
        image="https://a.storyblok.com/f/297364/1300x721/d211c2a5cf/rm_insight-headless.png"
        url="/headless-cms/headless-cms-services"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="User Experience Design"
        text="Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation."
        image="https://a.storyblok.com/f/297364/1300x600/750e6b7a9f/rm_hero_cms-starter_2.png"
        url="/ux-strategie-beratung"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
    </Section>
  ),
};

export const TileLayout: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 744,
    },
  },
  args: pack({
    width: "default",
    content: {
      mode: "tile",
    },
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "center",
    },
    buttons: [],
  }),
  render: (args) => (
    <Section {...args}>
      <TeaserCard
        layout="row"
        headline="Headless CMS"
        text="Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites."
        image="https://a.storyblok.com/f/297364/1300x721/d211c2a5cf/rm_insight-headless.png"
        url="/headless-cms/headless-cms-services"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="User Experience Design"
        text="Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation."
        image="https://a.storyblok.com/f/297364/1300x600/750e6b7a9f/rm_hero_cms-starter_2.png"
        url="/ux-strategie-beratung"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="Design Systeme & Composable Frontends"
        text="Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen."
        image="https://a.storyblok.com/f/297364/2030x1100/552cb82cce/rm-corporate-ui-cover.png"
        url="/design-system-services"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
    </Section>
  ),
};

export const ListLayout: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 1416,
    },
  },
  args: pack({
    content: {
      mode: "list",
    },
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "center",
    },
    buttons: [],
  }),
};

export const Slider: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 816,
    },
  },
  args: pack({
    content: {
      mode: "slider",
    },
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "left",
    },
    buttons: [],
  }),
  render: (args) => (
    <Section {...args}>
      <TeaserCard
        layout="row"
        headline="Headless CMS"
        text="Skalierbar, flexibel bei hocheffizienter Redaktion – Unternehmen beauftragen uns mit der Beratung, dem Design und der Entwicklung von Headless CMS Websites."
        image="https://a.storyblok.com/f/297364/1300x721/d211c2a5cf/rm_insight-headless.png"
        url="/headless-cms/headless-cms-services"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="User Experience Design"
        text="Wir begleiten Teams bei dem Change in eine kunden- und nutzerzentrierte Produktorganisation mit der richtigen Methode, Struktur und Moderation."
        image="https://a.storyblok.com/f/297364/1300x600/750e6b7a9f/rm_hero_cms-starter_2.png"
        url="/ux-strategie-beratung"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="Design Systeme & Composable Frontends"
        text="Egal, wie viele Marken oder Produkte du hast – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit deinem Unternehmen wachsen."
        image="https://a.storyblok.com/f/297364/2030x1100/552cb82cce/rm-corporate-ui-cover.png"
        url="/design-system-services"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="Berater für euren CMS Relaunch"
        text="Wir finden die perfekte Lösung für deine Bedürfnisse. Dabei nehmen wir uns die Zeit, um deine Ziele und Anforderungen genau zu verstehen und herauszufordern."
        image="https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png"
        url="/ueber-uns"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="CMS Website Accelerator"
        text="Wir unterstützen euch bei der Erprobung neuer Web-Technologien zur Ablösung von starren Alt-Systemen – skalierbar und investitionssicher."
        image="https://a.storyblok.com/f/297364/1080x810/90f97374e7/projekte_teaser_ngo.png"
        url="/headless-cms/cms-website-accelerator"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="Design System Beratung"
        text="Wir beraten euch bei Prozessen, Tools und Software für moderne Frontend-Architekturen – von der Strategie bis zur Implementierung."
        image="https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png"
        url="/design-system-services/vorteile-eines-design-systems"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
      <TeaserCard
        layout="row"
        headline="Composable Frontends"
        text="Unsere UI-Komponentenbibliothek liefert wiederverwendbare, modulare Bausteine für schnelle, flexible und anpassbare UIs."
        image="https://a.storyblok.com/f/297364/330x330/e426dfbd49/hp-deko-illu-systems.svg"
        url="/headless-cms/composable-frontends"
        button={{
          label: "Beratung starten",
          hidden: true,
        }}
      />
    </Section>
  ),
};

export const Inverted: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 744,
    },
  },
  args: pack({
    inverted: true,
    content: { mode: "default" },
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
    },
    buttons: [],
  }),
};

export const AccentBackground: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 744,
    },
  },
  args: pack({
    backgroundColor: "accent",
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "center",
    },
    buttons: [],
  }),
};

export const BoldBackground: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 744,
    },
  },
  args: pack({
    backgroundColor: "bold",
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "center",
    },
    buttons: [],
  }),
};

export const Framed: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 888,
    },
  },
  args: pack({
    width: "wide",
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "center",
    },
    style: "framed",
    buttons: [],
  }),
};

export const BackgroundImage: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 744,
    },
  },
  args: pack({
    backgroundImage: "/img/bg_dot-carpet-blue.svg",
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
    },
    content: {
      mode: "default",
    },
    buttons: [],
  }),
};

export const WithButtons: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 818,
    },
  },
  args: pack({
    headline: {
      text: "Unser Angebot",
      sub: "Vier Säulen für modulare Web-Frontends und Headless CMS.",
      align: "center",
    },
    buttons: [
      {
        disabled: false,
        icon: "arrow-right",
        label: "Beratung starten",
        size: "medium",
        variant: "secondary",
      },
      {
        disabled: false,
        icon: "",
        label: "Case Studies ansehen",
        size: "medium",
        variant: "secondary",
      },
    ],
  }),
};
