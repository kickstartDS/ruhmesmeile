// Anchor navigation for a page's main sections.
//
// The links are built from the rendered headlines rather than from the CMS
// content: the ticket defines a "main section" as a headline rendered and
// styled as `h1`, and `section.headline.large` is not set consistently on the
// live pages (`/case-studies/hpp-architekten-website-relaunch` renders two main
// sections as plain `h2`, `/case-studies/lueghausen-storyblok-webseite` has its
// `Impact` headline inside a cta blok). The design system renders such a
// headline as `<header class="dsa-headline dsa-headline--h1" id="…">`, and the
// website's `HeadlineProvider` slugifies its text into that id — so reading
// them from the DOM is what keeps the bar in sync with the page.
import { define, Component } from "@kickstartds/core/lib/component";

const identifier = "dsa.on-page-nav";
const targetSelector = "main .dsa-headline--h1[id]";
const labelSelector = ".dsa-headline__headline";
const offsetProperty = "--dsa-on-page-nav--scroll-offset";

class OnPageNav extends Component {
  constructor(element) {
    super(element);

    const targets = Array.from(document.querySelectorAll(targetSelector))
      .map((target) => ({
        target,
        id: target.id,
        label:
          target.querySelector(labelSelector)?.textContent?.trim() ||
          target.textContent.trim(),
      }))
      .filter(({ id, label }) => id && label);

    const list = element.querySelector(".dsa-on-page-nav__list");
    // No sections worth navigating — a single link bar would not be navigation.
    if (!list || targets.length < 2) {
      element.hidden = true;
      return;
    }

    const firstLabel = element.dataset.firstLabel;
    const links = targets.map(({ id, label }, index) => {
      const item = document.createElement("li");
      item.className = "dsa-on-page-nav__item";
      const link = document.createElement("a");
      link.className = "dsa-on-page-nav__link";
      link.href = `#${id}`;
      link.textContent = index === 0 && firstLabel ? firstLabel : label;
      item.append(link);
      list.append(item);
      return link;
    });

    // The bar is sticky, so a clicked anchor has to stop below it instead of at
    // the very top of the viewport. `--dsa-on-page-nav--scroll-offset` is what
    // `on-page-nav.scss` feeds into the section headlines' `scroll-margin-top`.
    const setScrollOffset = () => {
      document.documentElement.style.setProperty(
        offsetProperty,
        `${element.offsetHeight}px`,
      );
    };

    let frame = 0;
    const setActiveLink = () => {
      frame = 0;
      const threshold = element.getBoundingClientRect().bottom;
      let active = 0;

      targets.forEach(({ target }, index) => {
        if (target.getBoundingClientRect().top <= threshold) active = index;
      });

      links.forEach((link, index) => {
        if (index === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(setActiveLink);
    };

    const onResize = () => {
      setScrollOffset();
      onScroll();
    };

    setScrollOffset();
    setActiveLink();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    this.onDisconnect(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty(offsetProperty);
    });
  }
}

define(identifier, OnPageNav);

export { identifier };
