import { FC } from "react";
import classnames from "classnames";
import { useKsComponent } from "@kickstartds/core/lib/react";

export interface OnPageNavProps {
  enabled?: boolean;
  firstLabel?: string;
  floating?: boolean;
}

/**
 * Anchor navigation bar for a page's main sections. The links and the active
 * state are built by `on-page-nav.client.js` from the rendered headlines —
 * `main .dsa-headline--h1[id]` in document order — because the CMS-side
 * `headline.large` flag is not set consistently on the live pages.
 */
export const OnPageNav: FC<OnPageNavProps> = ({
  enabled = false,
  firstLabel,
  floating = false,
}) => {
  const componentProps = useKsComponent<HTMLElement>("dsa.on-page-nav");

  if (!enabled) return null;

  return (
    <nav
      {...componentProps}
      className={classnames(
        "dsa-on-page-nav",
        floating && "dsa-on-page-nav--floating"
      )}
      aria-label="Auf dieser Seite"
      data-first-label={firstLabel || undefined}
    >
      <ul className="dsa-on-page-nav__list" />
    </nav>
  );
};
