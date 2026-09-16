import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Pagination } from "./PaginationComponent";
import customProperties from "./pagination-tokens.json";
import schema from "./pagination.schema.dereffed.json";

const meta: Meta = {
  title: "Corporate/Pagination",
  component: Pagination,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  parameters: {
    viewport: {
      width: 990,
      height: 192,
    },
  },
  args: pack({
    ariaLabels: {
      previousPage: "Vorherige Seite",
      nextPage: "Nächste Seite",
      skipToFirstPage: "Zur ersten Seite springen",
      skipToLastPage: "Zur letzten Seite springen",
      goToPage: "Gehe zu Seite",
    },
    pages: [
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=1",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=2",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=3",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=4",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=5",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=6",
        active: true,
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=7",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=8",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=9",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=10",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=11",
      },
      {
        url: "https://www.ruhmesmeile.com/design-system-insights?seite=12",
      },
    ],
  }),
};
