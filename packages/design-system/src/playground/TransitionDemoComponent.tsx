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
import { NavDropdown } from "../components/nav-dropdown/NavDropdownComponent";
import { ContentNav } from "../components/content-nav/ContentNavComponent";
import { BlogTeaser } from "../components/blog-teaser/BlogTeaserComponent";
import { SplitWeighted } from "../components/split-weighted/SplitWeightedComponent";
import { Downloads } from "../components/downloads/DownloadsComponent";
import { Faq } from "../components/faq/FaqComponent";

const TransitionDemo = () => (
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
      <TeaserCard
        button={{
          chevron: true,
          label: "Beratung starten",
        }}
        image="https://a.storyblok.com/f/297364/1099x731/28a441c2ee/rm_lp-industry-electronics.png"
        imageRatio="landscape"
        text="Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten."
        headline="CMS Website Accelerator"
        url="https://www.ruhmesmeile.com/kontakt"
      />
      <TeaserCard
        button={{
          chevron: true,
          label: "Case Studies ansehen",
        }}
        layout="compact"
        image="https://a.storyblok.com/f/297364/1080x810/70a6e8e1ab/teaser_uni-design-system.png"
        imageRatio="landscape"
        text="Egal, wie viele Marken oder Produkte ihr habt – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit eurem Unternehmen wachsen."
        headline="Design Systeme & Composable Frontends"
        url="https://www.ruhmesmeile.com/case-studies"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ks-spacing-stack-s)",
        }}
      >
        <Downloads
          download={[
            {
              format: "PDF",
              name: "CMS Website Accelerator – Leistungsüberblick",
              previewImage: "img/offset-image.png",
              size: "2.5 MB",
              url: "#",
            },
            {
              format: "PDF",
              name: "Design System Services – Vorgehen",
              previewImage:
                "img/kickstartDS/CMS-Starter producthunt-slide-01.svg",
              size: "3.2 MB",
              url: "#",
            },
            {
              format: "DOC",
              name: "Headless CMS – Checkliste für den Relaunch",
              size: "20 KB",
              url: "#",
            },
            {
              format: "PPT",
              name: "Composable Frontends – Architektur",
              size: "5 MB",
              url: "#",
            },
          ]}
        />
        <Faq
          questions={[
            {
              question: "Was ist ein Headless CMS?",
              answer:
                "Ein Headless CMS trennt Redaktion und Frontend: Inhalte liegen in einer API, das Frontend holt sie sich von dort. So pflegt ihr Inhalte einmal und spielt sie auf Website, Landingpage und App aus.",
            },
            {
              question: "Wie lange dauert ein Relaunch mit dem Accelerator?",
              answer:
                "Der CMS Website Accelerator liefert eure Website in 48 Stunden produktiv aus. Individuelle Module und weitere Marken bauen wir danach in Wochen statt Monaten ein.",
            },
          ]}
        />
      </div>
    </Section>
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
        order={{
          desktop: "asideFirst",
        }}
        main={
          <BlogTeaser
            alt="Daniel Ley von ruhmesmeile"
            author={{
              image:
                "https://a.storyblok.com/f/297364/1000x667/dc09a74752/daniel-ley.png",
              name: "Daniel Ley",
              title: "Geschäftsführer",
            }}
            date="08.10.2026"
            headline="Vereinfache den Switch zu Headless CMS"
            image="https://a.storyblok.com/f/297364/1000x667/dc09a74752/daniel-ley.png"
            link={{
              text: "Alle Insights",
              url: "https://www.ruhmesmeile.com/insights",
            }}
            readingTime="6 Min. Lesezeit"
            tags={[
              {
                entry: "Headless CMS",
              },
              {
                entry: "Relaunch",
              },
            ]}
            teaserText="Wie euer Headless-Projekt durch einen Website Accelerator zum Erfolg wird: Wir lösen starre Alt-Systeme ab, entkoppeln Redaktion und Frontend und überführen eure Inhalte in modulare, markenkonforme Bausteine."
          />
        }
        aside={
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
        <ContentNav
          initiallyShown={4}
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
              url: "#",
            },
            {
              label: "CMS Website-Accelerator",
              url: "#",
            },
            {
              label: "Whitelabel Frontends",
              url: "#",
            },
          ]}
          topic="Was wir bieten"
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
          name="Checkboxes"
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
          name="Radio Buttons"
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
            {
              label: "Case Studies",
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

export default TransitionDemo;
