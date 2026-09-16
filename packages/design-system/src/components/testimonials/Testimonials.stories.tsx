import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Testimonials } from "./TestimonialsComponent";
import schema from "./testimonials.schema.dereffed.json";
import customProperties from "./testimonials-tokens.json";

const meta: Meta<typeof Testimonials> = {
  title: "Components/Testimonials",
  component: Testimonials,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Testimonials>;

export const Simple: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 409,
    },
  },
  args: pack({
    testimonial: [
      {
        quote: `Wir hatten drei Marken und vier Websites, die sich auseinanderentwickelt haben. Mit dem Design System von ruhmesmeile liefern wir heute alles aus einer Basis – und neue Seiten stehen in Tagen statt Wochen.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Katrin Behrens",
        },
        name: "Katrin Behrens",
        title: "Leiterin Digitale Produkte, Energieversorger",
      },
    ],
  }),
};

export const WithTitle: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 409,
    },
  },
  args: pack({
    testimonial: [
      {
        quote: `Der Switch auf ein Headless CMS war unser größtes Risiko in diesem Jahr. ruhmesmeile hat daraus Routine gemacht: Redaktion, Vertrieb und Entwicklung arbeiten heute im selben Baukasten.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Markus Vogel",
        },
        name: "Markus Vogel",
        title: "Leiter Marketing, Industrieunternehmen",
      },
    ],
  }),
};

export const ListLayout: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 996,
    },
  },
  args: pack({
    layout: "list",
    testimonial: [
      {
        quote: `Wir hatten drei Marken und vier Websites, die sich auseinanderentwickelt haben. Mit dem Design System von ruhmesmeile liefern wir heute alles aus einer Basis – und neue Seiten stehen in Tagen statt Wochen.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Katrin Behrens",
        },
        name: "Katrin Behrens",
        title: "Leiterin Digitale Produkte, Energieversorger",
        rating: 5,
      },
      {
        quote: `Unsere Landingpages bauen wir jetzt selbst. Statt Ticket und sechs Wochen Wartezeit sind es zwei Stunden im Baukasten – und es sieht trotzdem nach unserer Marke aus.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Sabine Krüger",
        },
        name: "Sabine Krüger",
        title: "Online-Marketing, Maschinenbau",
        rating: 4,
      },
      {
        quote: `Der Switch auf ein Headless CMS war unser größtes Risiko in diesem Jahr. ruhmesmeile hat daraus Routine gemacht: Redaktion, Vertrieb und Entwicklung arbeiten heute im selben Baukasten.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Markus Vogel",
        },
        name: "Markus Vogel",
        title: "Leiter Marketing, Industrieunternehmen",
        rating: 5,
      },
    ],
  }),
};

export const SliderLayout: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 450,
    },
  },
  args: pack({
    testimonial: [
      {
        quote: `Der Switch auf ein Headless CMS war unser größtes Risiko in diesem Jahr. ruhmesmeile hat daraus Routine gemacht: Redaktion, Vertrieb und Entwicklung arbeiten heute im selben Baukasten.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Markus Vogel",
        },
        name: "Markus Vogel",
        title: "Leiter Marketing, Industrieunternehmen",
      },
      {
        quote: `Content Operations hat bei uns vorher niemanden begeistert. Heute ist der Redaktionsprozess schneller als unser Freigabeweg.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Tobias Wendt",
        },
        name: "Tobias Wendt",
        title: "Redaktionsleitung, Verband",
      },
      {
        quote: `Ein Design System ist kein Projekt, sondern eine Entscheidung. ruhmesmeile hat uns zwei Jahre begleitet, ohne uns ein Framework aufzudrängen.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Nadine Sander",
        },
        name: "Nadine Sander",
        title: "Head of UX, Softwareunternehmen",
      },
    ],
  }),
};

export const WithRating: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 450,
    },
  },
  args: pack({
    testimonial: [
      {
        quote: `Unsere Landingpages bauen wir jetzt selbst. Statt Ticket und sechs Wochen Wartezeit sind es zwei Stunden im Baukasten – und es sieht trotzdem nach unserer Marke aus.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Sabine Krüger",
        },
        name: "Sabine Krüger",
        title: "Online-Marketing, Maschinenbau",
        rating: 5,
      },
      {
        quote: `Content Operations hat bei uns vorher niemanden begeistert. Heute ist der Redaktionsprozess schneller als unser Freigabeweg.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Tobias Wendt",
        },
        name: "Tobias Wendt",
        title: "Redaktionsleitung, Verband",
        rating: 4,
      },
      {
        quote: `Ein Design System ist kein Projekt, sondern eine Entscheidung. ruhmesmeile hat uns zwei Jahre begleitet, ohne uns ein Framework aufzudrängen.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Nadine Sander",
        },
        name: "Nadine Sander",
        title: "Head of UX, Softwareunternehmen",
        rating: 5,
      },
    ],
  }),
};

export const AlternatingLayout: Story = {
  parameters: {
    viewport: {
      width: 770,
      height: 996,
    },
  },
  args: pack({
    layout: "alternating",
    testimonial: [
      {
        quote: `Ein Design System ist kein Projekt, sondern eine Entscheidung. ruhmesmeile hat uns zwei Jahre begleitet, ohne uns ein Framework aufzudrängen.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Nadine Sander",
        },
        name: "Nadine Sander",
        title: "Head of UX, Softwareunternehmen",
      },
      {
        quote: `Wir hatten drei Marken und vier Websites, die sich auseinanderentwickelt haben. Mit dem Design System von ruhmesmeile liefern wir heute alles aus einer Basis – und neue Seiten stehen in Tagen statt Wochen.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Katrin Behrens",
        },
        name: "Katrin Behrens",
        title: "Leiterin Digitale Produkte, Energieversorger",
      },
      {
        quote: `Unsere Landingpages bauen wir jetzt selbst. Statt Ticket und sechs Wochen Wartezeit sind es zwei Stunden im Baukasten – und es sieht trotzdem nach unserer Marke aus.`,
        image: {
          src: "img/placeholder/avatar-round.svg",
          alt: "Porträt von Sabine Krüger",
        },
        name: "Sabine Krüger",
        title: "Online-Marketing, Maschinenbau",
      },
    ],
  }),
};
