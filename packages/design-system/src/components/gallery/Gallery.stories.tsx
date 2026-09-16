import { Meta, StoryObj } from "@storybook/react-vite";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { Gallery } from "./GalleryComponent";
import schema from "./gallery.schema.dereffed.json";
import customProperties from "./gallery-tokens.json";

const meta: Meta<typeof Gallery> = {
  title: "Components/Gallery",
  component: Gallery,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
};

export default meta;

type Story = StoryObj<typeof Gallery>;

export const SmallSquaresWithLightbox: Story = {
  parameters: {
    viewport: {
      width: 1100,
      height: 702,
    },
  },
  args: pack({
    aspectRatio: "square",
    layout: "smallTiles",
    lightbox: true,
    images: [
      {
        src: "https://a.storyblok.com/f/297364/1080x810/75a4143d37/wolfcraft_teaser_4zu3.jpg",
        caption: "wolfcraft: CMS-Website",
        alt: "Startseite der neuen wolfcraft-Website auf Basis von Storyblok",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/6a4ce7621a/dachser_teaser_4zu3.png",
        caption: "Dachser: Design System",
        alt: "Komponentenübersicht des Dachser Design Systems",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png",
        caption: "Telekom: Web-Baukasten",
        alt: "Landingpage-Baukasten für die Deutsche Telekom",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x811/cb3a55f5c8/hpp-teaser_01.jpg",
        caption: "HPP Architekten: Relaunch",
        alt: "Startseite der neuen Website von HPP Architekten",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e6634e2b94/lughausen_teaser.png",
        caption: "Lüghausen: Storyblok-Website",
        alt: "Website der Lüghausen-Gruppe auf Basis von Storyblok",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/90f97374e7/projekte_teaser_ngo.png",
        caption: "NGO: Landingpage-Baukasten",
        alt: "Redaktionell erstellte Landingpages einer NGO",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png",
        caption: "RUB: Design System",
        alt: "Design System der Ruhr-Universität Bochum in Storybook",
      },
    ],
  }),
};

export const LargeLandscapeTiles: Story = {
  parameters: {
    viewport: {
      width: 1440,
      height: 724,
    },
  },
  args: pack({
    layout: "largeTiles",
    aspectRatio: "landscape",
    images: [
      {
        src: "https://a.storyblok.com/f/297364/1080x810/6a4ce7621a/dachser_teaser_4zu3.png",
        caption: "Dachser: Design System",
        alt: "Komponentenübersicht des Dachser Design Systems",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/75a4143d37/wolfcraft_teaser_4zu3.jpg",
        caption: "wolfcraft: CMS-Website",
        alt: "Startseite der neuen wolfcraft-Website auf Basis von Storyblok",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x811/cb3a55f5c8/hpp-teaser_01.jpg",
        caption: "HPP Architekten: Relaunch",
        alt: "Startseite der neuen Website von HPP Architekten",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/dfdcfccf56/maxcluster_teaser.png",
        caption: "maxcluster: Design System",
        alt: "Design System und Komponenten von maxcluster",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e6634e2b94/lughausen_teaser.png",
        caption: "Lüghausen: Storyblok-Website",
        alt: "Website der Lüghausen-Gruppe auf Basis von Storyblok",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png",
        caption: "Telekom: Web-Baukasten",
        alt: "Landingpage-Baukasten für die Deutsche Telekom",
      },
    ],
  }),
};

export const FreeAspectRatio: Story = {
  parameters: {
    viewport: {
      width: 1040,
      height: 818,
    },
  },
  args: pack({
    layout: "smallTiles",
    lightbox: true,
    images: [
      {
        src: "https://a.storyblok.com/f/297364/1080x810/6a4ce7621a/dachser_teaser_4zu3.png",
        caption: "Dachser: Design System",
        alt: "Komponentenübersicht des Dachser Design Systems",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/dfdcfccf56/maxcluster_teaser.png",
        caption: "maxcluster: Design System",
        alt: "Design System und Komponenten von maxcluster",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/62e5bb7883/ngo_teaser.png",
        caption: "NGO: Landingpage-Baukasten",
        alt: "Landingpages einer NGO aus wiederverwendbaren Komponenten",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png",
        caption: "RUB: Design System",
        alt: "Design System der Ruhr-Universität Bochum in Storybook",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e6634e2b94/lughausen_teaser.png",
        caption: "Lüghausen: Storyblok-Website",
        alt: "Website der Lüghausen-Gruppe auf Basis von Storyblok",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x811/cb3a55f5c8/hpp-teaser_01.jpg",
        caption: "HPP Architekten: Relaunch",
        alt: "Startseite der neuen Website von HPP Architekten",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png",
        caption: "Telekom: Web-Baukasten",
        alt: "Landingpage-Baukasten für die Deutsche Telekom",
      },
    ],
  }),
};

export const StackLandscape: Story = {
  parameters: {
    viewport: {
      width: 846,
      height: 1512,
    },
  },
  args: pack({
    aspectRatio: "landscape",
    images: [
      {
        src: "https://a.storyblok.com/f/297364/1080x810/6a4ce7621a/dachser_teaser_4zu3.png",
        caption: "Dachser: Design System",
        alt: "Komponentenübersicht des Dachser Design Systems",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x811/cb3a55f5c8/hpp-teaser_01.jpg",
        caption: "HPP Architekten: Relaunch",
        alt: "Startseite der neuen Website von HPP Architekten",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/75a4143d37/wolfcraft_teaser_4zu3.jpg",
        caption: "wolfcraft: CMS-Website",
        alt: "Startseite der neuen wolfcraft-Website auf Basis von Storyblok",
      },
    ],
    layout: "stack",
  }),
};

export const SliderGallery: Story = {
  parameters: {
    viewport: {
      width: 1200,
      height: 600,
    },
  },
  args: pack({
    layout: "slider",
    lightbox: true,
    images: [
      {
        src: "https://a.storyblok.com/f/297364/1080x810/75a4143d37/wolfcraft_teaser_4zu3.jpg",
        caption: "wolfcraft: CMS-Website",
        alt: "Startseite der neuen wolfcraft-Website auf Basis von Storyblok",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/6a4ce7621a/dachser_teaser_4zu3.png",
        caption: "Dachser: Design System",
        alt: "Komponentenübersicht des Dachser Design Systems",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e5b08059cf/projekte_teaser_telekom.png",
        caption: "Telekom: Web-Baukasten",
        alt: "Landingpage-Baukasten für die Deutsche Telekom",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x811/cb3a55f5c8/hpp-teaser_01.jpg",
        caption: "HPP Architekten: Relaunch",
        alt: "Startseite der neuen Website von HPP Architekten",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/e6634e2b94/lughausen_teaser.png",
        caption: "Lüghausen: Storyblok-Website",
        alt: "Website der Lüghausen-Gruppe auf Basis von Storyblok",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/90f97374e7/projekte_teaser_ngo.png",
        caption: "NGO: Landingpage-Baukasten",
        alt: "Redaktionell erstellte Landingpages einer NGO",
      },
      {
        src: "https://a.storyblok.com/f/297364/1080x810/dfdcfccf56/maxcluster_teaser.png",
        caption: "maxcluster: Design System",
        alt: "Design System und Komponenten von maxcluster",
      },
    ],
  }),
};
