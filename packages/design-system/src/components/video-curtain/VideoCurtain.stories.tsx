import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { VideoCurtain } from "./VideoCurtainComponent";
import schema from "./video-curtain.schema.dereffed.json";
import customProperties from "./video-curtain-tokens.json";

const meta: Meta = {
  title: "Components/Video Curtain",
  component: VideoCurtain,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof VideoCurtain>;

export const AtmosphericVideoWithOverlay: Story = {
  parameters: {
    viewport: {
      width: 1280,
      height: 800,
    },
  },
  args: pack({
    headline: "Wir entwickeln & launchen. In Wochen, nicht Monaten.",
    sub: "Spezialisierte Beratung für modulare Web-Frontends & Headless CMS",
    text: "Wir bauen digitale Plattformen, die sich an euer Business anpassen – nicht umgekehrt. Headless, markenkonform und von Anfang an skalierbar.",
    overlay: true,
    textPosition: "center",
    buttons: [
      {
        label: "Beratung starten",
      },
    ],
    video: {
      srcMobile: "img/videos/video-720.mp4",
      srcTablet: "img/videos/video-720.mp4",
      srcDesktop: "img/videos/video-720.mp4",
    },
  }),
};

export const ColorNeutralText: Story = {
  parameters: {
    viewport: {
      width: 1280,
      height: 800,
    },
  },
  args: pack({
    headline: "Was früher Wochen dauerte, geht jetzt in Minuten",
    sub: "Case Study: Landingpages im Baukasten",
    text: "Erfahre, wie eine NGO mit unserem Accelerator schnell, flexibel und kosteneffizient eigene Landing Pages erstellt – ganz ohne externe Hilfe.",
    textPosition: "corner",
    colorNeutral: true,
    highlightText: true,
    overlay: true,
    buttons: [
      {
        label: "Case Studies ansehen",
      },
    ],
    video: {
      srcMobile: "img/videos/video-agency.mp4",
      srcTablet: "img/videos/video-agency.mp4",
      srcDesktop: "img/videos/video-agency.mp4",
    },
  }),
};

export const ColorNeutralVideo: Story = {
  parameters: {
    viewport: {
      width: 1280,
      height: 800,
    },
  },
  args: pack({
    headline: "Dein CMS kann jetzt denken",
    sub: "Content Operations mit KI automatisieren",
    text: "Mit maschinenlesbaren Komponenten erzeugt KI automatisch passgenaue Inhalte – ganz ohne Training oder Prompt-Bastelei. Möglich macht das MCP.",
    textPosition: "center",
    highlightText: true,
    overlay: true,
    buttons: [
      {
        label: "Alle Insights",
      },
    ],
    video: {
      srcMobile: "img/videos/handshake-bw.mp4",
      srcTablet: "img/videos/handshake-bw.mp4",
      srcDesktop: "img/videos/handshake-bw.mp4",
    },
  }),
};
