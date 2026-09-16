import { Section } from "../components/section/SectionComponent";
import { TeaserCard } from "../components/teaser-card/TeaserCardComponent";
import { SelectField } from "@kickstartds/form/lib/select-field";
import { TextArea } from "@kickstartds/form/lib/text-area";
import { CheckboxGroup } from "@kickstartds/form/lib/checkbox-group";
import { RadioGroup } from "@kickstartds/form/lib/radio-group";
import { Button } from "../components/button/ButtonComponent";
import { TextField } from "@kickstartds/form/lib/text-field";
import { EventLatestTeaser } from "../components/event-latest-teaser/EventLatestTeaserComponent";
import { EventLocation } from "../components/event-location/EventLocationComponent";
import { EventListTeaser } from "../components/event-list-teaser/EventListTeaserComponent";
import { CookieConsent } from "../components/cookie-consent/CookieConsentComponent";
import { Hero } from "../components/hero/HeroComponent";
import { NavDropdown } from "../components/nav-dropdown/NavDropdownComponent";
import { SplitWeighted } from "../components/split-weighted/SplitWeightedComponent";

const ShadowDemo = () => (
  <div className="playground-preview-page">
    <Section
      className="dsa-section--component-preview"
      content={{
        mode: "default",
        gutter: "large",
      }}
      width="wide"
      spaceBefore="small"
      spaceAfter="small"
    >
      <SplitWeighted
        asideLayout={{
          stretchVertically: true,
        }}
        mainLayout={{ minWidth: "narrow" }}
        main={
          <Hero
            buttons={[
              {
                icon: "",
                label: "Beratung starten",
                url: "https://www.ruhmesmeile.com/kontakt",
              },
              {
                icon: "",
                label: "Über uns",
                url: "https://www.ruhmesmeile.com/ueber-uns",
              },
            ]}
            headline="Spezialisierte Beratung für modulare Web-Frontends und Headless CMS"
            height="small"
            image={{
              indent: "none",
              src: "https://a.storyblok.com/f/297364/1440x600/d10fe4b63c/rm_hero_homepage-dunkler3.jpg",
              srcDesktop: "img/placeholder/image-gallery-02.svg",
              srcMobile: "img/placeholder/image-gallery-02.svg",
              srcTablet: "img/placeholder/image-gallery-02.svg",
            }}
            mobileTextBelow={false}
            skipButton
            text="Wir entwickeln und launchen zukunftssichere Webseiten und Design Systeme, die sich an euer Business anpassen – nicht umgekehrt."
            textPosition="left"
            textbox
          />
        }
        aside={
          <TeaserCard
            button={{
              chevron: false,
              hidden: true,
              label: "Case Studies ansehen",
            }}
            headline="Design Systeme & Composable Frontends"
            image="https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png"
            imageRatio="wide"
            layout="stack"
            text="Egal, wie viele Marken oder Produkte ihr habt – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit eurem Unternehmen wachsen."
            url="https://www.ruhmesmeile.com/case-studies"
          />
        }
      />
    </Section>
    <Section
      className="dsa-section--component-preview"
      width="wide"
      content={{
        gutter: "large",
        mode: "tile",
      }}
      spaceAfter="small"
      spaceBefore="none"
    >
      <EventListTeaser
        category="Webinar"
        ctaText="Zum Webinar"
        date="08.10.2026"
        location={{
          address: "Mozartstraße 4-10<br />\n53115 Bonn",
          name: "ruhmesmeile, Bonn",
        }}
        tags={["Headless CMS"]}
        text="In 45 Minuten zeigen wir, wie ein Headless CMS Redaktion und Frontend entkoppelt – und was das für euren Relaunch bedeutet."
        time="16:00"
        title="Live-Webinar: Was sind Headless CMS?"
        url="https://www.ruhmesmeile.com/insights"
      />
      <div
        style={{
          display: "flex",
          gap: "var(--ks-spacing-stack-m)",
          flexDirection: "column",
        }}
      >
        <EventLocation
          address="Mozartstraße 4-10<br />
  53115 Bonn"
          dates={[
            {
              ariaLabel:
                "Termin am 8. Oktober 2026 von 16:00 bis 17:00 Uhr",
              date: "08.10.2026",
              label: "Termin sichern",
              newTab: true,
              time: "16:00 – 17:00",
              url: "https://www.ruhmesmeile.com/kontakt",
            },
          ]}
          displayMode="spacious"
          links={[
            {
              label: "Route berechnen",
              newTab: true,
              url: "https://maps.google.com/?q=Mozartstra%C3%9Fe+4-10+Bonn",
            },
          ]}
          locationName="ruhmesmeile, Bonn"
        />
        <EventLatestTeaser
          ariaLabel="Termin: Live-Webinar Headless CMS"
          calendar={{
            day: "8",
            month: "Okt",
          }}
          cta="Zum Webinar"
          date="08.10.2026"
          location="Online"
          title="Live-Webinar: Was sind Headless CMS?"
          url="https://www.ruhmesmeile.com/insights"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ks-spacing-stack-m)",
        }}
      >
        <SelectField
          icon="chevron-down"
          label="Womit können wir starten?"
          options={[
            {
              label: "CMS Website Accelerator",
            },
            {
              label: "Design System Beratung",
            },
            {
              label: "Composable Frontends",
            },
          ]}
        />
        <TextField label="Euer Name" />
        <CheckboxGroup
          label={"Interessiert an"}
          options={[
            {
              //@ts-expect-error
              checked: true,
              label: "Headless CMS",
            },
            {
              label: "Design System",
            },
            {
              label: "Composable Frontends",
              disabled: true,
            },
          ]}
        />
        <TextArea label="Euer Vorhaben" />
        <RadioGroup
          label={"Wie groß ist euer Projekt?"}
          options={[
            {
              label: "Website-Relaunch",
            },
            {
              //@ts-expect-error
              checked: true,
              label: "Design System aufbauen",
            },
            {
              label: "Nur eine Beratung",
              disabled: true,
            },
          ]}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ks-spacing-stack-m)",
        }}
      >
        <Button icon="arrow-right" variant="primary" label={"Beratung starten"} />
        <Button icon="date" variant="secondary" label={"Zur Terminbuchung"} />
        <Button icon="upload" variant="tertiary" label={"Projektanfrage"} />
        <NavDropdown
          style={{
            position: "relative",
            height: "fit-content",
            top: "0",
            margin: "0",
          }}
          items={[
            {
              label: "Design System Services",
              url: "#",
            },
            {
              label: "Headless CMS Services",
              url: "#",
            },
            {
              label: "UX-Strategie & Beratung",
              url: "#",
            },
            {
              label: "Für Energieunternehmen",
              url: "#",
            },
            {
              label: "Für Industrieunternehmen",
              url: "#",
            },
          ]}
        />
      </div>
    </Section>

    <Section>
      <CookieConsent
        notice={{
          displayMode: "card",
          title: "Wir verwenden Cookies",
          acceptButton: {
            label: "Alle akzeptieren",
          },
          rejectButton: {
            label: "Alle ablehnen",
          },
          customizeButton: {
            label: "Einstellungen",
            variant: "tertiary",
          },
          decisionButtonVariant: "primary",
          description:
            "Wir nutzen Cookies, um unsere Website für euch besser zu machen. Ihr entscheidet, was ihr zulasst.",
        }}
        revisitButton={{
          label: "Cookies verwalten",
        }}
        dialog={{
          title: "Cookie-Einstellungen",
          description: "Hier legt ihr fest, welche Cookies wir setzen dürfen.",
          required: [
            {
              key: "necessary",
              name: "Notwendig",
              description:
                "Diese Cookies braucht die Website, damit sie überhaupt funktioniert.",
            },
          ],
          buttons: {
            acceptLabel: "Alle akzeptieren",
            rejectLabel: "Alle ablehnen",
            savePreferencesLabel: "Einstellungen speichern",
          },
          options: [
            {
              key: "measurement",
              name: "Statistik",
              description:
                "Diese Cookies zeigen uns, wie Besucher:innen unsere Website nutzen.",
            },
            {
              key: "marketing",
              name: "Marketing",
              description:
                "Diese Cookies nutzen wir für relevante Werbung.",
            },
            {
              key: "functionality",
              name: "Funktionen",
              description:
                "Diese Cookies merken sich eure Einstellungen.",
            },
            {
              key: "experience",
              name: "Performance",
              description:
                "Diese Cookies messen Ladezeiten und Fehler.",
            },
          ],
          toggleLabels: {
            accept: "Zulassen",
            reject: "Ablehnen",
          },
          alwaysActiveLabel: "Immer aktiv",
        }}
      />
    </Section>
  </div>
);

export default ShadowDemo;
