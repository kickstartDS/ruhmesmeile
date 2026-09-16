import { Features } from "../components/features/FeaturesComponent";
import { Section } from "../components/section/SectionComponent";
import { Stats } from "../components/stats/StatsComponent";
import { TeaserCard } from "../components/teaser-card/TeaserCardComponent";
import { SelectField } from "@kickstartds/form/lib/select-field";
import { TextArea } from "@kickstartds/form/lib/text-area";
import { CheckboxGroup } from "@kickstartds/form/lib/checkbox-group";
import { RadioGroup } from "@kickstartds/form/lib/radio-group";
import { Button } from "../components/button/ButtonComponent";
import { SearchResult } from "../components/search-result/SearchResultComponent";
import { Breadcrumb } from "../components/breadcrumb/BreadcrumbComponent";
import { Downloads } from "../components/downloads/DownloadsComponent";
import { Pagination } from "../components/pagination/PaginationComponent";
import { TextField } from "@kickstartds/form/lib/text-field";
import { EventLatestTeaser } from "../components/event-latest-teaser/EventLatestTeaserComponent";
import { EventLocation } from "../components/event-location/EventLocationComponent";
import { EventListTeaser } from "../components/event-list-teaser/EventListTeaserComponent";
import { BlogAside } from "../components/blog-aside/BlogAsideComponent";

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
      spaceAfter="small"
    >
      <TeaserCard
        imageRatio="landscape"
        headline="CMS Website Accelerator"
        text="Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten."
        url={"https://www.ruhmesmeile.com/kontakt"}
        button={{
          label: "Beratung starten",
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
              label: "Case Studies ansehen",
              url: "https://www.ruhmesmeile.com/case-studies",
            },
            icon: "home",
            text: "Wir bauen modulare Frontends, die mit euren Anforderungen wachsen: Design System, Headless CMS und Komponenten, die ihr wiederverwenden könnt.",
            title: "Skalierbare Frontends",
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
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <Button icon="arrow-right" variant="primary" label={"Beratung starten"} />
        <Button icon="date" variant="secondary" label={"Zur Terminbuchung"} />
        <Button icon="upload" variant="tertiary" label={"Projektanfrage"} />
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
      </div>
    </Section>
    <Section
      className="dsa-section--component-preview"
      spaceAfter="small"
      spaceBefore="none"
      width="wide"
    >
      <div
        style={{
          display: "flex",
          gap: "var(--ks-spacing-inline-m)",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flexGrow: "1" }}>
          <Breadcrumb
            pages={[
              {
                label: "Startseite",
                url: "https://www.ruhmesmeile.com/",
              },
              {
                label: "Case Studies",
                url: "https://www.ruhmesmeile.com/case-studies",
              },
              {
                label: "Insights",
                url: "https://www.ruhmesmeile.com/insights",
              },
            ]}
          />
        </div>
        <div style={{ flexGrow: "3" }}>
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
        </div>
        <div style={{ flexGrow: "3" }}>
          <Pagination
            ariaLabels={{
              goToPage: "Gehe zu Seite",
              nextPage: "Zur nächsten Seite",
              previousPage: "Zur vorherigen Seite",
              skipToFirstPage: "Zur ersten Seite springen",
              skipToLastPage: "Zur letzten Seite springen",
            }}
            pages={[
              {
                active: false,
                url: "https://www.ruhmesmeile.com/insights",
              },
              {
                active: true,
                url: "https://www.ruhmesmeile.com/case-studies",
              },
              {
                active: false,
                url: "https://www.ruhmesmeile.com/ueber-uns",
              },
              {
                active: false,
                url: "https://www.ruhmesmeile.com/kontakt",
              },
            ]}
          />
        </div>
      </div>
    </Section>
  </div>
);

export default ColorDemo;
