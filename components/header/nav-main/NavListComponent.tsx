import classnames from "classnames";
import { FC } from "react";
import { Link } from "@kickstartds/base/lib/link";
import { Icon } from "@kickstartds/base/lib/icon";

export const NavList = ({
  navItems,
  level = 1,
  active,
  children,
  inverted,
  className,
}) => (
  <ul
    ks-inverted={inverted}
    className={classnames(
      `dsa-nav-list dsa-nav-list--level-${level}`,
      className
    )}
  >
    {navItems.map(({ label, href, id, navItems: subItems }) => {
      const isActive =
        active === href || subItems?.some((navItem) => active === navItem.href);
      return (
        <li
          className={classnames(
            "dsa-nav-item",
            `dsa-nav-item--level-${level}`,
            isActive && "dsa-nav-item--active"
          )}
          key={id}
        >
          <Link
            href={href}
            className={`dsa-nav-item__link dsa-nav-item__link--level-${level}`}
          >
            {label}
            {subItems?.length ? (
              <Icon className="dsa-nav-item__link__icon" icon="chevron-down" />
            ) : (
              ""
            )}
          </Link>

          {subItems?.length ? (
            <>
              <NavList
                className="dsa-nav-list--sublist"
                navItems={subItems}
                level={level + 1}
                active={active}
                children={undefined}
              />
            </>
          ) : null}
        </li>
      );
    })}
    {children}
  </ul>
);
