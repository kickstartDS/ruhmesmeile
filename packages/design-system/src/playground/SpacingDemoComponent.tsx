import { Features } from "../components/features/FeaturesComponent";
import { Section } from "../components/section/SectionComponent";
import { Stats } from "../components/stats/StatsComponent";
import { TeaserCard } from "../components/teaser-card/TeaserCardComponent";
import { SearchResult } from "../components/search-result/SearchResultComponent";
import { Breadcrumb } from "../components/breadcrumb/BreadcrumbComponent";
import { Downloads } from "../components/downloads/DownloadsComponent";
import { EventLatestTeaser } from "../components/event-latest-teaser/EventLatestTeaserComponent";
import { EventLocation } from "../components/event-location/EventLocationComponent";
import { EventListTeaser } from "../components/event-list-teaser/EventListTeaserComponent";
import { BlogAside } from "../components/blog-aside/BlogAsideComponent";
import { EventFilter } from "../components/event-filter/EventFilterComponent";
import { BusinessCard } from "../components/business-card/BusinessCardComponent";
import { ContentNav } from "../components/content-nav/ContentNavComponent";

const ColorDemo = () => (
  <div className="playground-preview-page">
    <Section
      className="dsa-section--component-preview"
      content={{
        gutter: "large",
        mode: "tile",
      }}
      width="wide"
      spaceBefore="small"
      spaceAfter="none"
    >
      <TeaserCard
        imageRatio="landscape"
        headline="Design Systeme & Composable Frontends"
        text="Egal, wie viele Marken oder Produkte ihr habt – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit eurem Unternehmen wachsen."
        url={"https://www.ruhmesmeile.com/case-studies"}
        button={{
          label: "Case Studies ansehen",
          chevron: true,
        }}
      />
      <Features
        ctas={{
          style: "link",
          toggle: true,
        }}
        feature={[
          {
            cta: {
              icon: "arrow-right",
              label: "Beratung starten",
              url: "https://www.ruhmesmeile.com/kontakt",
            },
            icon: "home",
            text: "Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module.",
            title: "Skalierbare Architektur",
          },
        ]}
        layout="smallTiles"
        style="stack"
      />
      <Stats
        stat={[
          {
            icon: "person",
            number: "20",
            title: "Jahre Erfahrung",
            description:
              "Wir bauen seit über zwei Jahrzehnten Frontends, Design Systeme und CMS-Architekturen.",
          },
        ]}
      />
      <BlogAside
        author={{
          byline: "CTO & Founder",

          links: [
            {
              ariaLabel: "Kontakt zu Jonas Ulrich",
              icon: "twitter",
              label: "+49 228 30412660",
              newTab: false,
              url: "tel:+4922830412660",
            },
            {
              ariaLabel: "Kontakt zu Jonas Ulrich",
              icon: "email",
              label: "mail@ruhmesmeile.com",
              newTab: false,
              url: "mailto:mail@ruhmesmeile.com",
            },
          ],
          name: "Jonas Ulrich",
        }}
        date="08.10.2026"
        readingTime="6 Min. Lesezeit"
        socialSharing={[
          {
            icon: "twitter",
            title: "Auf X teilen",
            url: "https://twitter.com/share?text=ruhmesmeile&url=https://www.ruhmesmeile.com/insights",
          },
          {
            icon: "linkedin",
            title: "Auf LinkedIn teilen",
            url: "https://www.linkedin.com/shareArticle?mini=true&url=https://www.ruhmesmeile.com/insights",
          },
        ]}
      />
    </Section>
    <Section
      className="dsa-section--component-preview"
      width="wide"
      content={{
        mode: "default",
      }}
      spaceAfter="none"
      spaceBefore="small"
    >
      <div
        style={{
          height: "fit-content",
        }}
      >
        <EventFilter
          applyButton={{
            label: "Termine filtern",
          }}
          categories={{
            categoryCheckboxes: [
              "Alle",
              "Headless CMS",
              "Design System",
              "Case Studies",
            ],
            title: "Kategorien",
            toggle: true,
          }}
          datePicker={{
            dateFromInput: {
              label: "Von",
              placeholder: "Datum wählen",
            },
            dateToInput: {
              label: "Bis",
              placeholder: "Datum wählen",
            },
            title: "Termin finden",
            toggle: true,
          }}
          resetButton={{
            label: "Filter zurücksetzen",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "var(--ks-spacing-stack-m)",
          flexDirection: "column",
        }}
      >
        <EventLocation
          address="Mozartstraße 4-10<br />53115 Bonn"
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
          gap: "var(--ks-spacing-stack-s)",
        }}
      >
        <ContentNav
          initiallyShown={3}
          links={[
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
            {
              label: "Case Studies",
              url: "https://www.ruhmesmeile.com/case-studies",
            },
            {
              label: "CMS Website-Accelerator",
              url: "#",
            },
            {
              label: "Whitelabel Frontends",
              url: "#",
            },
            {
              label: "Agentur & Beratung",
              url: "#",
            },
          ]}
          topic="Was wir bieten"
        />
        <BusinessCard
          address="Mozartstraße 4-10<br />53115 Bonn"
          avatar={{
            alt: "Daniel Ley",
            src: "img/people/contact-person.png",
          }}
          buttons={[
            {
              label: "Zur Terminbuchung",
              url: "#",
            },
          ]}
          contact={[
            {
              icon: "phone",
              label: "+49 228 30412660",
              url: "tel:+4922830412660",
            },
            {
              icon: "email",
              label: "mail@ruhmesmeile.com",
              url: "mailto:mail@ruhmesmeile.com",
            },
            {
              icon: "linkedin",
              label: "ruhmesmeile",
              url: "https://www.ruhmesmeile.com/ueber-uns",
            },
          ]}
          logo={{
            alt: "ruhmesmeile Logo",
            src: "logo.svg",
            url: "#",
          }}
          topic="Euer Ansprechpartner"
        />
      </div>
    </Section>
    <Section content={{ mode: "default" }} spaceBefore="small" width="wide">
      <EventListTeaser
        category="Webinar"
        ctaText="Zum Webinar"
        date="08.10.2026"
        location={{
          address: "Mozartstraße 4-10<br />53115 Bonn",
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
          flexDirection: "column",
          gap: "var(--ks-spacing-stack-l)",
        }}
      >
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
          ]}
          showLink
          title="Insights von ruhmesmeile"
          url="https://www.ruhmesmeile.com/insights"
        />
        <Downloads
          download={[
            {
              format: "PDF",
              name: "CMS Website Accelerator – Leistungsüberblick",
              previewImage: "img/offset-image.png",
              size: "2.5 MB",
              url: "#",
            },
          ]}
        />
        <Breadcrumb
          pages={[
            {
              label: "Startseite",
              url: "https://www.ruhmesmeile.com/",
            },
            {
              label: "Über uns",
              url: "https://www.ruhmesmeile.com/ueber-uns",
            },
            {
              label: "Kontakt",
              url: "https://www.ruhmesmeile.com/kontakt",
            },
          ]}
        />
      </div>
    </Section>
  </div>
);

export default ColorDemo;