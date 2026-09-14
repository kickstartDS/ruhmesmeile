/*  eslint react/display-name: 0 */
import {
  ComponentProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";
import {
  NavTopbarContextDefault as DsaNavTopbar,
  NavTopbarContext,
} from "@kickstartds/design-system/nav-topbar";
import { NavDropdown } from "@kickstartds/design-system/components/nav-dropdown/index.js";
import { Button } from "@kickstartds/design-system/button";
import { Link } from "@kickstartds/base/lib/link";
import { Icon } from "@kickstartds/base/lib/icon";

/**
 * Site override of the design system's `NavTopbar`.
 *
 * Identical markup, plus the site's own "Projektanfrage" CTA appended to the
 * topbar list. The design system's topbar has no CTA slot at all, and this
 * button is ruhmesmeile.com's primary call to action on every page, so it is
 * restored here rather than dropped. Styling lives in
 * `components/nav-main/topbar/nav-topbar.scss` (`.dsa-nav-topbar__cta`).
 */
export const NavTopbarContextDefault = forwardRef<
  HTMLElement,
  ComponentProps<typeof DsaNavTopbar> & HTMLAttributes<HTMLElement>
>(({ items, inverted }, ref) =>
  items && items.length > 0 ? (
    <nav
      className="dsa-nav-topbar"
      id="dsa-nav-topbar"
      aria-label="Main Navigation"
      ref={ref}
    >
      <ul className="dsa-nav-topbar__list">
        {items.map(({ label, url, active, items: subItems }) => {
          return (
            <li
              className={[
                "dsa-nav-topbar__item",
                active ? "dsa-nav-topbar__item--active" : "",
                subItems?.length ? "dsa-nav-topbar__item--dropdown" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={url}
            >
              {subItems?.length ? (
                <span className="dsa-nav-topbar__label">
                  {label}
                  <Icon
                    className="dsa-nav-topbar__label__icon"
                    icon="chevron-down"
                    role="presentation"
                    aria-hidden
                    focusable={false}
                  />
                </span>
              ) : (
                <Link
                  href={url}
                  className={`dsa-nav-topbar__label dsa-nav-topbar__link`}
                >
                  {label}
                </Link>
              )}

              {subItems?.length ? (
                <NavDropdown items={subItems} inverted={inverted} />
              ) : null}
            </li>
          );
        })}
        <li className="dsa-nav-topbar__item">
          <Button
            className="dsa-nav-topbar__cta"
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

export const NavTopbarProvider: FC<PropsWithChildren> = (props) => (
  <NavTopbarContext.Provider {...props} value={NavTopbarContextDefault} />
);
