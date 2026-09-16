import { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { JSONSchema7 } from "json-schema";
import { pack, getArgsShared } from "@kickstartds/core/lib/storybook";

import { CookieConsent, CookieConsentProps } from "./CookieConsentComponent";
import customProperties from "./cookie-consent-tokens.json";
import schema from "./cookie-consent.schema.dereffed.json";

import { define } from "@kickstartds/core/lib/component";
import { configureConsentManager, createConsentManagerStore } from "c15t";
import { baseTranslations } from "@c15t/translations";
import { Button } from "../button/ButtonComponent";
import CookieConsentC15t from "./C15t.client";

const PureCookieConsent = (props: CookieConsentProps) => {
  useEffect(() => {
    window._ks.radio.emit("dsa.cookie-consent.showNotice", true);
  }, []);
  return <CookieConsent {...props} />;
};

const meta: Meta = {
  title: "Corporate/Cookie Consent",
  component: CookieConsent,
  parameters: {
    jsonschema: { schema },
    cssprops: { customProperties },
  },
  ...getArgsShared(schema as JSONSchema7),
  render(args) {
    return <PureCookieConsent {...args} />;
  },
};

export default meta;

type Story = StoryObj<typeof CookieConsent>;

export const Card: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 472,
    },
  },
  args: pack({
    notice: {
      displayMode: "card",
      title: "Wir nutzen Cookies",
      description:
        "Wir nutzen Cookies, um euch die beste Erfahrung auf unserer Website zu bieten. Ihr entscheidet, welche Kategorien wir setzen dürfen.",
      acceptButton: {
        label: "Alle akzeptieren",
      },
      rejectButton: {
        label: "Alle ablehnen",
      },
      decisionButtonVariant: "primary",
      customizeButton: {
        label: "Einstellungen anpassen",
        variant: "tertiary",
      },
    },
    dialog: {
      title: "Cookie-Einstellungen",
      description: "Verwaltet hier, welche Cookies wir setzen dürfen.",
      buttons: {
        acceptLabel: "Alle akzeptieren",
        rejectLabel: "Alle ablehnen",
        savePreferencesLabel: "Auswahl speichern",
      },
      toggleLabels: {
        accept: "Zulassen",
        reject: "Ablehnen",
      },
      alwaysActiveLabel: "Immer aktiv",
      required: [
        {
          key: "necessary",
          name: "Notwendige Cookies",
          description:
            "Diese Cookies sind für den Betrieb der Website erforderlich und lassen sich nicht abwählen.",
        },
      ],
      options: [
        {
          key: "measurement",
          name: "Statistik-Cookies",
          description:
            "Diese Cookies helfen uns zu verstehen, wie Besucher:innen unsere Website nutzen.",
        },
        {
          key: "marketing",
          name: "Marketing-Cookies",
          description:
            "Diese Cookies nutzen wir, um euch passende Inhalte und Kampagnen auszuspielen.",
        },
        {
          key: "functionality",
          name: "Funktionale Cookies",
          description:
            "Diese Cookies merken sich eure Einstellungen und sorgen für mehr Komfort auf der Website.",
        },
        {
          key: "experience",
          name: "Performance-Cookies",
          description:
            "Diese Cookies zeigen uns, welche Seiten häufig aufgerufen werden und wo es noch hakt.",
        },
      ],
    },
    revisitButton: {
      label: "Cookie-Einstellungen",
    },
  }),
};

export const Banner: Story = {
  parameters: {
    viewport: {
      width: 1000,
      height: 472,
    },
  },
  args: pack({
    notice: {
      displayMode: "banner",
      title: "Eure Privatsphäre ist uns wichtig",
      description:
        "Wir nutzen Cookies und ähnliche Technologien, um Inhalte zu personalisieren, Funktionen für soziale Netzwerke anzubieten und unseren Traffic auszuwerten. Ihr entscheidet, welche Kategorien wir setzen dürfen, und ändert eure Auswahl jederzeit. Mehr dazu in unserer Datenschutzerklärung.",
      decisionButtonVariant: "tertiary",
      acceptButton: {
        label: "Alle akzeptieren",
      },
      customizeButton: {
        label: "Einstellungen anpassen",
        variant: "secondary",
      },
      rejectButton: {
        label: "Nicht notwendige ablehnen",
      },
    },
    dialog: {
      title: "Cookie-Einstellungen verwalten",
      description:
        "Hier könnt ihr die einzelnen Kategorien aktivieren oder deaktivieren. Notwendige Cookies bleiben immer aktiv, damit die Website funktioniert. Eure Auswahl könnt ihr jederzeit ändern – einige Cookies sorgen für ein besseres Erlebnis auf unserer Website.",
      buttons: {
        acceptLabel: "Alle akzeptieren",
        rejectLabel: "Alle ablehnen",
        savePreferencesLabel: "Auswahl speichern",
      },
      toggleLabels: {
        accept: "Zulassen",
        reject: "Ablehnen",
      },
      alwaysActiveLabel: "Immer aktiv",
      required: [
        {
          name: "Notwendige Cookies",
          description:
            "Diese Cookies braucht die Website für den grundlegenden Betrieb: Seitennavigation, Formulare und sichere Bereiche. Ohne sie läuft nichts.",
        },
      ],
      decisionButtonVariant: "tertiary",
      options: [
        {
          name: "Statistik-Cookies",
          description:
            "Diese Cookies helfen uns zu verstehen, wie Besucher:innen mit unserer Website interagieren – zusammengefasst und anonym.",
        },
        {
          name: "Personalisierungs-Cookies",
          description:
            "Diese Cookies merken sich eure Auswahl, etwa Sprache oder Region, und machen die Website persönlicher.",
        },
        {
          name: "Werbe-Cookies",
          description:
            "Werbe-Cookies nutzen wir, um euch relevante Kampagnen auszuspielen. Sie verfolgen Besucher:innen über Websites hinweg und sammeln Informationen für passende Anzeigen.",
        },
      ],
    },
    revisitButton: {
      label: "Cookie-Einstellungen",
    },
  }),
};

const c15cStore = createConsentManagerStore(
  configureConsentManager({ mode: "offline" }),
  {
    initialTranslationConfig: {
      translations: baseTranslations,
      disableAutoLanguageSwitch: false,
    },
    ignoreGeoLocation: true, // Useful for development to always view the banner.
  }
);
define(
  "dsa.cookie-consent.c15t.offline",
  class extends CookieConsentC15t {
    static store = c15cStore;
  }
);

export const C15t: Story = {
  parameters: Card.parameters,
  args: pack({
    notice: {
      displayMode: "card",
      decisionButtonVariant: "primary",
      customizeButton: { variant: "tertiary" },
    },
    dialog: {
      required: [{ key: "necessary" }],
      options: [
        { key: "measurement" },
        { key: "marketing" },
        { key: "functionality" },
        { key: "experience" },
      ],
    },
    component: "dsa.cookie-consent.c15t.offline",
  }),
  render(args) {
    return (
      <>
        <Button
          size="small"
          label="Zurücksetzen"
          onClick={() => {
            const state = c15cStore.getState();
            state.resetConsents();
            state.setShowPopup(true);
          }}
        />
        <hr />
        <CookieConsent {...args} />
      </>
    );
  },
};
