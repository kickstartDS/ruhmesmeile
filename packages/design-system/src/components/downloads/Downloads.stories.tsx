import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Downloads } from "./DownloadsComponent";
import customProperties from "./downloads-tokens.json";
import schema from "./downloads.schema.dereffed.json";

const meta: Meta = {
  title: "Corporate/Downloads",
  component: Downloads,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Downloads>;

export const TechnicalDetailsOnly: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 416,
    },
  },
  args: pack({
    download: [
      {
        name: "Whitepaper: Headless CMS vs. Monolith",
        format: "PDF",
        size: "2,4 MB",
        previewImage: "img/offset-image.png",
        url: "#",
      },
      {
        name: "Case Study: Design System der RUB",
        previewImage: "img/kickstartDS/CMS-Starter producthunt-slide-01.svg",
        format: "PDF",
        size: "3,2 MB",
        url: "#",
      },
      {
        name: "Checkliste: Anforderungen an ein neues CMS",
        format: "DOC",
        size: "20 KB",
        url: "#",
      },
      {
        name: "Design-Token-Referenz",
        format: "TXT",
        size: "12 KB",
        url: "#",
      },
    ],
  }),
};

export const DescriptionOnly: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 460,
    },
  },
  args: pack({
    download: [
      {
        name: "Whitepaper: Headless CMS vs. Monolith",
        description:
          "Wann sich der Wechsel vom Monolithen lohnt – mit Entscheidungshilfe, Kostenrahmen und Checkliste für euer Team.",
        previewImage: "img/offset-image.png",
      },
      {
        name: "Checkliste: Anforderungen an ein neues CMS",
        description:
          "Die Fragen, die ihr vor der Ausschreibung klärt – gesammelt aus über 250 Projekten.",
        previewImage: "img/kickstartDS/CMS-Starter producthunt-slide-01.svg",
      },
      {
        name: "Präsentation: Design System Beratung",
        description:
          "Wie wir Design Systeme aufsetzen, einführen und dauerhaft in euren Teams verankern.",
        previewImage: "img/about/cta.png",
      },
      {
        name: "Referenzübersicht: Unsere Kunden",
        description:
          "Dachser, Telekom, maxcluster, wolfcraft, HPP Architekten und die RUB im Überblick.",
        previewImage: "img/view-modern-office.jpg",
      },
    ],
  }),
};

export const Complete: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 516,
    },
  },
  args: pack({
    download: [
      {
        name: "Whitepaper: Headless CMS vs. Monolith",
        format: "PDF",
        size: "2,4 MB",
        description:
          "Wann sich der Wechsel vom Monolithen lohnt – mit Entscheidungshilfe, Kostenrahmen und Checkliste für euer Team.",
        previewImage: "img/offset-image.png",
      },
      {
        name: "Case Study: Design System der RUB",
        description:
          "Wie die Ruhr-Universität Bochum ihre Komponenten in Storybook dokumentiert und pflegt.",
        previewImage: "img/kickstartDS/CMS-Starter producthunt-slide-01.svg",
        format: "PDF",
        size: "3,2 MB",
      },
      {
        name: "Checkliste: Anforderungen an ein neues CMS",
        description:
          "Die Fragen, die ihr vor der Ausschreibung klärt – gesammelt aus über 250 Projekten.",
        format: "DOC",
        size: "20 KB",
      },
      {
        name: "Design-Token-Referenz",
        description:
          "Alle Tokens aus kickstartDS: Farben, Abstände, Typografie – als Nachschlagewerk für euer Team.",
        format: "TXT",
        size: "12 KB",
      },
    ],
  }),
};

export const Mixed: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 460,
    },
  },
  args: pack({
    download: [
      {
        name: "Whitepaper: Headless CMS vs. Monolith",
        format: "PDF",
        size: "2,4 MB",
        description:
          "Wann sich der Wechsel vom Monolithen lohnt – mit Entscheidungshilfe, Kostenrahmen und Checkliste für euer Team.",
        previewImage: "img/offset-image.png",
      },
      {
        name: "Checkliste: Anforderungen an ein neues CMS",
        format: "PDF",
        size: "1,2 MB",
        previewImage: "img/about/cta.png",
      },
      {
        name: "Design-Token-Referenz",
        previewImage: "img/kickstartDS/CMS-Starter producthunt-slide-01.svg",
      },
      {
        name: "Referenzübersicht: Unsere Kunden",
        description:
          "Dachser, Telekom, maxcluster, wolfcraft, HPP Architekten und die RUB im Überblick.",
      },
    ],
  }),
};
