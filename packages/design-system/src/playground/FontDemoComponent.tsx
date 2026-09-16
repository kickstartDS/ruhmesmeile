import { Section } from "../components/section/SectionComponent";
import { SelectField } from "@kickstartds/form/lib/select-field";
import { TextArea } from "@kickstartds/form/lib/text-area";
import { CheckboxGroup } from "@kickstartds/form/lib/checkbox-group";
import { Button } from "../components/button/ButtonComponent";
import { TeaserCard } from "../components/teaser-card/TeaserCardComponent";
import { RadioGroup } from "@kickstartds/form/lib/radio-group";
import { TextField } from "@kickstartds/form/lib/text-field";
import { Headline } from "../components/headline/HeadlineComponent";
import { Downloads } from "../components/downloads/DownloadsComponent";
import { Breadcrumb } from "../components/breadcrumb/BreadcrumbComponent";
import { SearchResult } from "../components/search-result/SearchResultComponent";
import { Features } from "../components/features/FeaturesComponent";
import { Stats } from "../components/stats/StatsComponent";
import { Cta } from "../components/cta/CtaComponent";

const FontDemo = () => (
  <div className="playground-preview-page">
    <Section
      content={{
        mode: "default",
        gutter: "large",
      }}
      spaceAfter="small"
      width="wide"
    >
      <Cta
        highlightText
        headline="Modulare Web-Frontends für euren Relaunch"
        sub="Beratung, Design und Entwicklung von Headless CMS"
        text="Wir arbeiten mit euch: **Headless CMS** als Basis, Design Systeme als Baukasten und Composable Frontends für *markenkonforme* Websites. Redaktion und Frontend bleiben sauber entkoppelt, eure Inhalte werden wiederverwendbar – wartungsarm und skalierbar."
      />

      <div>
        <Cta
          headline="In 48 Stunden zur produktiven Website"
          sub="Was wir liefern und wie wir zusammenarbeiten"
          text="Wir liefern:
- Klare Architektur statt gewachsener Alt-Systeme
- *Feste* Ansprechpartner von der Beratung bis zum Launch

`// Example: driveValue(innovation)`

> Erst verstehen, dann bauen.
"
        />
      </div>
    </Section>
    <Section
      content={{
        mode: "default",
      }}
      width="wide"
      spaceBefore="none"
      spaceAfter="small"
    >
      <TeaserCard
        headline="CMS Website Accelerator"
        text="Wir lösen starre Alt-Systeme ab und überführen eure Inhalte automatisiert in markenkonforme, wiederverwendbare Frontend-Module – live in Wochen statt Monaten."
        url={"https://www.ruhmesmeile.com/kontakt"}
        button={{
          label: "Beratung starten",
        }}
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
              "Wie euer Headless-Projekt durch einen Website Accelerator zum Erfolg wird.",
            title: "Vereinfache den Switch zu Headless CMS",
            url: "#",
          },
        ]}
        showLink
        title="Insights von ruhmesmeile"
        url="https://www.ruhmesmeile.com/insights"
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
              label: "Was sind Headless CMS?",
              url: "#",
            },
            icon: "home",
            text: "Skalierbar, flexibel bei hocheffizienter Redaktion – wir beraten, gestalten und entwickeln eure Headless CMS Website.",
            title: "Headless CMS",
          },
        ]}
        layout="smallTiles"
        style="stack"
      />
    </Section>
    <Section
      content={{
        tileWidth: "medium",
        gutter: "large",
        mode: "default",
      }}
      width="wide"
      spaceBefore="small"
      spaceAfter="small"
    >
      <TeaserCard
        headline="Design Systeme & Composable Frontends"
        text="Egal, wie viele Marken oder Produkte ihr habt – unser Design ist skalierbar. Wir entwickeln Design Systeme, die mit eurem Unternehmen wachsen."
        url={"https://www.ruhmesmeile.com/case-studies"}
        button={{
          label: "Case Studies ansehen",
        }}
      />
      <SearchResult
        imageColSize="none"
        initialMatch="Wann lohnt sich ein **Design System**?"
        matches={[
          {
            snippet:
              "Ein Design System hält jede Marke konsistent und macht euer Frontend wartungsarm.",
            title:
              "Warum ein Designsystem das fehlende Stück in der MACH-Architektur ist",
            url: "#",
          },
        ]}
        showLink
        title="Case Studies von ruhmesmeile"
        url="https://www.ruhmesmeile.com/case-studies"
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
              url: "#",
            },
            icon: "home",
            text: "Wir entwickeln Design Systeme, die mit eurem Unternehmen wachsen – von Tokens über Komponenten bis zur Dokumentation.",
            title: "Skalierbare Architektur",
          },
        ]}
        layout="smallTiles"
        style="stack"
      />
    </Section>
    <Section
      width="wide"
      spaceBefore="small"
      spaceAfter="small"
      content={{
        gutter: "large",
        mode: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ks-spacing-stack-m)",
        }}
      >
        <Headline
          text="Beratung, Design und Entwicklung aus einer Hand"
          sub="Wir bauen mit euch, nicht für euch"
          spaceAfter="minimum"
          level="h3"
          style="h3"
        />
        <TextArea label="Euer Vorhaben" />
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ks-spacing-stack-m)",
        }}
      >
        <Headline
          text="In Wochen live statt in Monaten"
          level="h4"
          style="h4"
          spaceAfter="minimum"
        />
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
        <Button
          style={{ width: "fit-content" }}
          label="Beratung starten"
          size="large"
        />
        <Button
          style={{ width: "fit-content" }}
          label="Zur Terminbuchung"
          size="medium"
        />
        <Button
          style={{ width: "fit-content" }}
          label="Projektanfrage"
          size="small"
        />
      </div>
    </Section>
  </div>
);

export default FontDemo;

export const Font = {};
