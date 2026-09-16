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

import { NavDropdown } from "../components/nav-dropdown/NavDropdownComponent";

import { Faq } from "../components/faq/FaqComponent";
import { SearchFilter } from "../components/search-filter/SearchFilterComponent";
import { CookieConsentDialog } from "../components/cookie-consent/CookieConsentDialogPartial";
import { SearchResult } from "../components/search-result/SearchResultComponent";
import { Divider } from "../components/divider/DividerComponent";

const BorderDemo = () => (
  <div className="playground-preview-page">
    <Section
      width="wide"
      content={{
        mode: "default",
      }}
      spaceAfter="none"
      spaceBefore="none"
    >
      <CookieConsentDialog
        open
        dialog={{
          alwaysActiveLabel: "Immer aktiv",
          buttons: {
            acceptLabel: "Alle akzeptieren",
            rejectLabel: "Alle ablehnen",
            savePreferencesLabel: "Einstellungen speichern",
          },
          description:
            "Hier legt ihr fest, welche Cookies wir setzen dürfen.",
          options: [
            {
              description:
                "Diese Cookies zeigen uns, wie Besucher:innen unsere Website nutzen.",
              key: "measurement",
              name: "Statistik",
            },
          ],
          required: [
            {
              description:
                "Diese Cookies braucht die Website, damit sie überhaupt funktioniert.",
              key: "necessary",
              name: "Notwendig",
            },
          ],
          title: "Cookie-Einstellungen",
          toggleLabels: {
            accept: "Zulassen",
            reject: "Ablehnen",
          },
        }}
      />
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
    </Section>
    <Section spaceBefore="small" spaceAfter="small" width="wide">
      <Divider />
    </Section>
    <Section
      className="dsa-section--component-preview"
      content={{
        mode: "default",
        gutter: "large",
      }}
      width="wide"
      spaceBefore="none"
      spaceAfter="none"
    >
      <TeaserCard
        label="Angebot"
        button={{
          chevron: false,
          hidden: true,
          label: "Beratung starten",
        }}
        headline="CMS Website Accelerator"
        image="https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png"
        imageAlt="Mit dem CMS Website Accelerator erstellte Landingpage"
        imageRatio="wide"
        layout="stack"
        text="Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten."
        url="https://www.ruhmesmeile.com/kontakt"
      />
      <SearchResult
        imageColSize="none"
        initialMatch="Wie startet man mit **Headless CMS**?"
        matches={[
          {
            snippet:
              "Wie dein Headless-Projekt durch einen Website Accelerator zu einem Erfolg wird.",
            title: "Vereinfache den Switch zu Headless CMS",
            url: "https://www.ruhmesmeile.com/insights",
          },
          {
            snippet:
              "Warum ein Designsystem das fehlende Stück in der MACH-Architektur ist – und was das für euren Relaunch bedeutet.",
            title: "Warum ein Designsystem das fehlende Stück in der MACH-Architektur ist",
            url: "https://www.ruhmesmeile.com/insights",
          },
          {
            snippet:
              "Markenkonform und wartungsarm: wie ihr ohne monatelange Abstimmungsschleifen zur modernen Unternehmenswebsite kommt.",
            title: "Schneller zur modernen Unternehmenswebsite – markenkonform und wartungsarm",
            url: "https://www.ruhmesmeile.com/insights",
          },
        ]}
        previewImage="img/full-shot-different-people-working-together.png"
        showLink
        title="Insights von ruhmesmeile"
        url="https://www.ruhmesmeile.com/insights"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ks-spacing-stack-m)",
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
              url: "#",
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
        <Faq
          questions={[
            {
              answer:
                "Ein Headless CMS trennt Redaktion und Frontend: Die Inhalte liegen in einer API, das Frontend holt sie sich von dort. So könnt ihr Layouts ändern, ohne Inhalte anzufassen, und Inhalte pflegen, ohne im Code zu arbeiten.",
              question: "Was ist ein Headless CMS?",
            },
            {
              answer:
                "Sobald mehr als eine Marke, ein Produkt oder ein Team beteiligt ist. Ein Design System hält Komponenten, Tokens und Freigaben an einer Stelle – und macht jeden Relaunch danach deutlich kürzer.",
              question: "Wann lohnt sich ein Design System?",
            },
          ]}
        />
      </div>
    </Section>
    <Section spaceBefore="small" spaceAfter="small" width="wide">
      <Divider />
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
      <TeaserCard
        label="Case Study"
        button={{
          chevron: false,
          hidden: true,
          label: "Case Studies ansehen",
        }}
        headline="Design Systeme & Composable Frontends"
        image="https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png"
        imageAlt="Design System Case Study einer deutschen Universität"
        imageRatio="wide"
        layout="compact"
        text="Egal, wie viele Marken oder Produkte ihr habt – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit eurem Unternehmen wachsen."
        url="https://www.ruhmesmeile.com/case-studies"
      />
      <div
        style={{
          display: "flex",
          gap: "var(--ks-spacing-stack-m)",
          flexDirection: "column",
        }}
      >
        <SearchFilter
          categories={[
            {
              amount: "10",
              title: "Seiten",
              url: "#",
            },
            {
              amount: "5",
              title: "Insights",
              url: "#",
            },
            {
              amount: "8",
              title: "Case Studies",
              url: "#",
            },
          ]}
          title="Nach Kategorie filtern"
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
        <TextField label="Euer Name" placeholder="Vor- und Nachname" />
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
        <TextArea
          label="Euer Vorhaben"
          placeholder="Website-Relaunch, Headless CMS oder Design System?"
        />
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
  </div>
);

export default BorderDemo;
