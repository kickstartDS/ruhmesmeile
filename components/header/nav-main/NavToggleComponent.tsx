import { FC } from "react";

export const NavToggleComponent: FC = () => (
  <button
    type="button"
    className="dsa-nav-toggle"
    id="toggle-sidebar"
    aria-controls="dsa-nav-main"
    aria-expanded="false"
    ks-component="base.nav-toggle"
  >
    <span className="dsa-nav-toggle__label">toggle navigation</span>
    <span className="dsa-nav-toggle__icon">
      <span className="dsa-nav-toggle__icon__middle"></span>
    </span>
  </button>
);
