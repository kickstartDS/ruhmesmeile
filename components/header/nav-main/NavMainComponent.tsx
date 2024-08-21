import classnames from "classnames";
import { FC } from "react";
import { NavMainProps } from "./NavMainProps";
import { Logo } from "@kickstartds/ds-agency-premium/logo";
import "./js/NavToggle.client";
import "./js/navMainEvents.client";
import { NavList } from "./NavListComponent";
import { NavToggleComponent } from "./NavToggleComponent";

export const NavMain: FC<NavMainProps> = ({
  logo,
  navItems,
  flyoutInverted,
  cta,
}) =>
  navItems && navItems.length > 0 ? (
    <div className="dsa-nav-main__wrap">
      <NavToggleComponent />
      <nav
        className="dsa-nav-topbar"
        id="dsa-nav-main"
        aria-label="Hauptnavigation"
      >
        <NavList
          className="dsa-nav-list--dropdown"
          navItems={navItems}
          active={undefined}
        />
      </nav>
      <nav
        className="dsa-nav-flyout"
        ks-inverted={flyoutInverted.toString()}
        id="dsa-nav-main"
        aria-label="Hauptnavigation"
      >
        <Logo {...logo} className="dsa-nav-main__logo" />
        <NavList navItems={navItems} />
      </nav>
    </div>
  ) : null;
