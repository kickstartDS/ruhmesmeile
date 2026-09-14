/*  eslint react/display-name: 0 */
import {
  ComponentProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";
import {
  FooterContextDefault as DsaFooter,
  FooterContext,
} from "@kickstartds/design-system/footer";
import { Link } from "@kickstartds/base/lib/link";
import { Icon } from "@kickstartds/base/lib/icon";

/**
 * Site-local footer.
 *
 * The design system footer is CMS-driven (`navGroups`, `socialLinks`,
 * `copyright`, `legalLink`); this site's footer navigation, address and contact
 * details are hardcoded, so the override replaces the whole component and only
 * keeps `inverted` from the settings story. Registered through
 * `FooterProvider` in ../ComponentProviders.tsx, which is what `_app.tsx`'s
 * `<Footer />` resolves via `FooterContext`.
 */
export const FooterContextDefault = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof DsaFooter> & HTMLAttributes<HTMLDivElement>
>(({ inverted }, ref) => {
  return (
    <div
      className="dsa-footer"
      ks-inverted={(inverted ?? false).toString()}
      ref={ref}
    >
      <div className="dsa-footer__content dsa-footer__content--top">
        <address className="dsa-footer__column dsa-footer__address">
          <ul className="dsa-footer__contact">
            <li>
              <Link
                className="dsa-footer__headline"
                href="mailto:mail@ruhmesmeile.com"
              >
                mail@ruhmesmeile.com
              </Link>
            </li>
            <li>
              <Link
                className="dsa-footer__headline"
                href="tel:+49 228 30412660"
              >
                +49 228 30412660
              </Link>
            </li>
          </ul>
          <span className="dsa-footer__item">ruhmesmeile GmbH</span>
          <span className="dsa-footer__item">Mozartstraße 4 - 10</span>
          <span className="dsa-footer__item">53115 Bonn</span>
        </address>

        <ul className="dsa-footer__links dsa-footer__links--top">
          <li className="dsa-footer__column">
            <Link className="dsa-footer__headline" href="/services">
              Was wir bieten
            </Link>
            <ul className="dsa-footer__sublist">
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/design-system-services"
                >
                  Design System Services
                </Link>
              </li>
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/headless-cms/headless-cms-services"
                >
                  Headless CMS Services
                </Link>
              </li>
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/ux-strategie-beratung"
                >
                  UX-Strategie & Beratung
                </Link>
              </li>
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/marketing/cms-webseite-accelerator-fuer-energie-unternehmen"
                >
                  Für Energieunternehmen
                </Link>
              </li>
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/marketing/cms-accelerator-industriekunden"
                >
                  Für Industrieunternehmen
                </Link>
              </li>
            </ul>
          </li>
          <li className="dsa-footer__column">
            <Link className="dsa-footer__headline" href="/case-studies">
              Was wir machen
            </Link>
            <ul className="dsa-footer__sublist">
              <li>
                <Link className="dsa-footer__link" href="/case-studies">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/headless-cms/cms-website-accelerator"
                >
                  CMS Website-Accelerator
                </Link>
              </li>
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/headless-cms/composable-frontends"
                >
                  Whitelabel Frontends
                </Link>
              </li>
            </ul>
          </li>
          <li className="dsa-footer__column">
            <Link className="dsa-footer__headline" href="/ueber-uns/">
              Wer wir sind
            </Link>
            <ul className="dsa-footer__sublist">
              <li>
                <Link className="dsa-footer__link" href="/ueber-uns/">
                  Agentur & Beratung
                </Link>
              </li>
              <li>
                <Link
                  className="dsa-footer__link"
                  href="/design-system-insights"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link className="dsa-footer__link" href="/ueber-uns/kontakt">
                  Kontakt
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="dsa-footer__content dsa-footer__content--bottom">
        <ul className="dsa-footer__links dsa-footer__links--bottom">
          <li>
            <Link className="dsa-footer__link" href="/impressum">
              Impressum
            </Link>
          </li>
          <li>
            <Link className="dsa-footer__link" href="/datenschutz">
              Datenschutz
            </Link>
          </li>
          <li>
            <Link className="dsa-footer__link" href="/glossar">
              Glossar
            </Link>
          </li>
        </ul>
        <ul className="dsa-footer__social">
          <li>
            <Link
              className="dsa-footer__link"
              href="https://www.linkedin.com/company/ruhmesmeile/"
              target="_blank"
              aria-label="Visit our LinkedIn"
            >
              <Icon icon="linkedin" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export const FooterProvider: FC<PropsWithChildren> = (props) => (
  <FooterContext.Provider {...props} value={FooterContextDefault} />
);
