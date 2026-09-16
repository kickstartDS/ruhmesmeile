import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Html } from "./HtmlComponent";
import schema from "./html.schema.dereffed.json";

const meta: Meta = {
  title: "Components/HTML",
  component: Html,
  parameters: {
    jsonschema: { schema },
    viewport: {
      width: 770,
      height: 198,
    },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Html>;

export const HTML: Story = {
  args: pack({
    html: `<p style="color: var(--ks-text-color-default);">Headless CMS, Design Systeme und Composable Frontends – als HTML-Fragment direkt aus dem CMS.</p>`,
  }),
};

export const WithConsent: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 512,
    },
  },
  args: pack({
    html: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/oGGIkuGY-7U?si=Y5_JHflGsNwRCLu_" title="YouTube-Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    consent: true,
    consentText: "Möchtet ihr das Video ansehen?",
    consentButtonLabel: "Video laden",
    consentBackgroundImage: "img/02.jpg",
  }),
};

export const WithScript: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 512,
    },
  },
  args: pack({
    html: `<script>alert("Hallo :)")</script><p style="color: var(--ks-text-color-default);">Schön, dass ihr da seid!</p>`,
    consent: true,
    consentButtonLabel: "Hallo sagen",
  }),
};
