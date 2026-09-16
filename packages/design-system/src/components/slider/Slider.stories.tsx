import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Slider } from "./SliderComponent";
import { TeaserCard } from "../teaser-card/TeaserCardComponent";
import schema from "./slider.schema.dereffed.json";
import customProperties from "./slider-tokens.json";

const meta: Meta = {
  title: "Layout/Slider",
  component: Slider,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
  render: (args) => (
    <Slider {...args}>
      <TeaserCard
        layout="row"
        headline="CMS Website Accelerator"
        text="Wir unterstützen euch bei der Erprobung neuer Web-Technologien zur Ablösung von starren Alt-Systemen – skalierbar und investitionssicher."
        image="https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png"
        url="/headless-cms/cms-website-accelerator"
        button={{
          label: "Mehr erfahren",
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
          label: "Mehr erfahren",
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
          label: "Mehr erfahren",
          hidden: true,
        }}
      />
    </Slider>
  ),
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const WithArrows: Story = {
  parameters: {
    viewport: {
      width: 1024,
      height: 530,
    },
  },
  args: pack({
    gap: 15,
    arrows: true,
  }),
};

export const WithTeasedNeighbours: Story = {
  parameters: {
    viewport: {
      width: 1024,
      height: 760,
    },
  },
  args: pack({
    gap: 15,
    teaseNeighbours: true,
    arrows: true,
    nav: true,
  }),
};

export const WithNav: Story = {
  parameters: {
    viewport: {
      width: 1024,
      height: 530,
    },
  },
  args: pack({
    gap: 15,
    arrows: true,
    nav: true,
  }),
};

export const WithAutoplay: Story = {
  parameters: {
    viewport: {
      width: 1024,
      height: 530,
    },
  },
  args: pack({
    gap: 15,
    nav: true,
    arrows: true,
    autoplay: true,
  }),
};
