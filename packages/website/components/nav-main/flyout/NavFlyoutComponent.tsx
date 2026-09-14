/*  eslint react/display-name: 0 */
import {
  ComponentProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";
import {
  NavFlyoutContextDefault as DsaNavFlyout,
  NavFlyoutContext,
} from "@kickstartds/design-system/nav-flyout";
import { Logo } from "@kickstartds/design-system/components/logo/index.js";
import { Button } from "@kickstartds/design-system/button";
import { Link } from "@kickstartds/base/lib/link";

/**
 * Site override of the design system's `NavFlyout` (the mobile menu).
 *
 * Two deliberate differences from the design system's version, both restoring
 * what the pre-migration site rendered:
 *
 * - the logo is drawn again. `nav-flyout` still declares a `logo` prop, but
 *   its component ignores it, so the mobile menu had lost its branding;
 * - the "Projektanfrage" CTA is appended, matching the topbar override.
 *
 * The sub-list guard is also a real ternary: the design system writes
 * `{subItems && subItems.length && subItems.length > 0 && (<ul>…)}`, which
 * renders a literal `0` into every nav item whose `items` is an empty array.
 */
export const NavFlyoutContextDefault = forwardRef<
  HTMLElement,
  ComponentProps<typeof DsaNavFlyout> & HTMLAttributes<HTMLElement>
>(({ items, inverted, logo }, ref) =>
  items && items.length > 0 ? (
    <nav
      className="dsa-nav-flyout"
      ks-inverted={inverted?.toString()}
      id="dsa-nav-flyout"
      aria-label="Main Navigation"
      ref={ref}
    >
      <Logo {...logo} className="dsa-nav-flyout__logo" />

      <ul className="dsa-nav-flyout__list">
        {items.map(({ label, url, active, items: subItems }) => {
          return (
            <li
              className={[
                "dsa-nav-flyout__item",
                active ? "dsa-nav-flyout__item--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={url}
            >
              {subItems?.length ? (
                <span className="dsa-nav-flyout__label">{label}</span>
              ) : (
                <Link
                  href={url}
                  className={`dsa-nav-flyout__label dsa-nav-flyout__link`}
                >
                  {label}
                </Link>
              )}
              {subItems?.length ? (
                <ul className="dsa-nav-flyout__sublist">
                  {subItems.map(({ label, url, active }) => {
                    return (
                      <li
                        className={[
                          "dsa-nav-flyout__item",
                          active ? "dsa-nav-flyout__item--active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        key={url}
                      >
                        <Link
                          href={url}
                          className={`dsa-nav-flyout__label dsa-nav-flyout__link`}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
        <li className="dsa-nav-flyout__item">
          <Button
            className="dsa-nav-flyout__cta"
            label="Projektanfrage"
            icon="chevron-right"
            url="/ueber-uns/kontakt"
            size="small"
          />
        </li>
      </ul>
    </nav>
  ) : null
);

export const NavFlyoutProvider: FC<PropsWithChildren> = (props) => (
  <NavFlyoutContext.Provider {...props} value={NavFlyoutContextDefault} />
);
