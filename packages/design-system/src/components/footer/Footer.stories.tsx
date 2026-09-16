import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, unpack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Footer as FooterComponent } from "./FooterComponent";
import schema from "./footer.schema.dereffed.json";
import customProperties from "./footer-tokens.json";

const { args, argTypes } = getArgsShared(schema as JSONSchema7);
export const footerProps = {
  ...unpack(args),
  logo: {
    src: "/logo.svg",
    srcInverted: "/logo-inverted.svg",
    inverted: false,
    homepageHref: "#",
    alt: "ruhmesmeile",
    // The site's wordmark is 271x39; the previous values were derived from the
    // upstream 121x24 asset and would render ours squashed.
    width: 271,
    height: 39,
  },
  navGroups: [
    {
      heading: "Was wir bieten",
      items: [
        {
          label: "Design System Services",
          url: "https://www.ruhmesmeile.com/design-system-services",
        },
        {
          label: "Headless CMS Services",
          url: "https://www.ruhmesmeile.com/headless-cms/headless-cms-services",
        },
        {
          label: "UX-Strategie & Beratung",
          url: "https://www.ruhmesmeile.com/ux-strategie-beratung",
        },
        {
          label: "Für Industrieunternehmen",
          url: "https://www.ruhmesmeile.com/marketing/cms-accelerator-industriekunden",
        },
      ],
    },
    {
      heading: "Was wir machen",
      items: [
        {
          label: "Case Studies",
          url: "https://www.ruhmesmeile.com/case-studies",
        },
        {
          label: "CMS Website-Accelerator",
          url: "https://www.ruhmesmeile.com/headless-cms/cms-website-accelerator",
        },
        {
          label: "Whitelabel Frontends",
          url: "https://www.ruhmesmeile.com/headless-cms/composable-frontends",
        },
        {
          label: "Insights",
          url: "https://www.ruhmesmeile.com/design-system-insights",
        },
      ],
    },
    {
      heading: "Kontakt & Rechtliches",
      items: [
        {
          label: "Datenschutz",
          url: "https://www.ruhmesmeile.com/datenschutz",
        },
        { label: "Glossar", url: "https://www.ruhmesmeile.com/glossar" },
        { label: "mail@ruhmesmeile.com", url: "mailto:mail@ruhmesmeile.com" },
        { label: "+49 228 30412660", url: "tel:+4922830412660" },
      ],
    },
  ],
  socialLinks: [
    {
      icon: "linkedin",
      url: "https://www.linkedin.com/company/ruhmesmeile/",
      ariaLabel: "ruhmesmeile auf LinkedIn",
    },
  ],
  copyright: "© 2026 ruhmesmeile GmbH · Mozartstraße 4-10 · 53115 Bonn",
  legalLink: {
    label: "Impressum",
    url: "https://www.ruhmesmeile.com/impressum",
  },
};

const meta: Meta = {
  title: "Layout/Footer",
  args: pack(footerProps),
  argTypes,
  component: FooterComponent,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  excludeStories: ["footerProps"],
};

export default meta;

type Story = StoryObj<typeof FooterComponent>;

export const Footer: Story = {
  parameters: {
    viewport: {
      width: 1280,
      height: 330,
    },
  },
};
