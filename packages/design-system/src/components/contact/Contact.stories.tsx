import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Contact } from "./ContactComponent";
import schema from "./contact.schema.dereffed.json";
import customProperties from "./contact-tokens.json";

const meta: Meta = {
  title: "Components/Contact",
  component: Contact,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Contact>;

export const WideImage: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 276,
    },
  },
  args: pack({
    title: "Daniel Ley",
    subtitle: "Geschäftsführer",
    image: {
      src: "https://a.storyblok.com/f/297364/1000x667/dc09a74752/daniel-ley.png",
      alt: "Daniel Ley, Geschäftsführer von ruhmesmeile",
      aspectRatio: "wide",
    },
    links: [
      {
        icon: "xing",
        url: "#",
        label: "ruhmesmeile",
        ariaLabel: "ruhmesmeile auf Xing",
      },
      {
        url: "#",
        icon: "linkedin",
        label: "Daniel Ley",
        ariaLabel: "Daniel Ley auf LinkedIn",
      },
    ],
  }),
};

export const CircularAvatar: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 332,
    },
  },
  args: pack({
    title: "Daniel Ley",
    subtitle: "Geschäftsführer",
    image: {
      src: "https://a.storyblok.com/f/297364/1000x667/dc09a74752/daniel-ley.png",
      alt: "Daniel Ley, Geschäftsführer von ruhmesmeile",
    },
    copy: "Beratung auf Augenhöhe: Wir kennen Marke, Redaktion und Technik – und bauen Websites, die euer Team selbst pflegen kann.",
    links: [
      {
        icon: "xing",
        url: "#",
        label: "ruhmesmeile",
        ariaLabel: "ruhmesmeile auf Xing",
      },
      {
        url: "#",
        icon: "linkedin",
        label: "Daniel Ley",
        ariaLabel: "Daniel Ley auf LinkedIn",
      },
    ],
  }),
};

export const VerticalImageWithParagraph: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 376,
    },
  },
  args: pack({
    title: "Jonas Ulrich",
    subtitle: "Consultant Headless CMS",
    image: {
      src: "https://a.storyblok.com/f/297364/1210x1040/e45abcc23a/jonas-ulrich-anschnitt2.png",
      alt: "Jonas Ulrich von ruhmesmeile",
      aspectRatio: "vertical",
    },
    copy: "Wir begleiten euch von der ersten Beratung bis zum Relaunch: Strategie, Content-Operations und die Auswahl des passenden CMS – technisch fundiert und ohne Umwege.",
    links: [
      {
        icon: "xing",
        url: "#",
        label: "ruhmesmeile",
        ariaLabel: "ruhmesmeile auf Xing",
      },
      {
        url: "#",
        icon: "linkedin",
        label: "Jonas Ulrich",
        ariaLabel: "Jonas Ulrich auf LinkedIn",
      },
    ],
  }),
};

export const FullImageWidth: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 360,
    },
  },
  args: pack({
    title: "Daniel Ley",
    subtitle: "Geschäftsführer",
    image: {
      src: "https://a.storyblok.com/f/297364/1000x667/dc09a74752/daniel-ley.png",
      alt: "Daniel Ley, Geschäftsführer von ruhmesmeile",
      aspectRatio: "wide",
      fullWidth: true,
    },
    copy: "Komplexe Anforderungen werden zu klaren Oberflächen: Wir bauen Frontends, die Redaktion und Entwicklung entlasten und mit euren Marken wachsen.",
    links: [
      {
        url: "mailto:mail@ruhmesmeile.com",
        icon: "email",
        label: "mail@ruhmesmeile.com",
        newTab: false,
        ariaLabel: "E-Mail an ruhmesmeile schreiben",
      },
    ],
  }),
};
