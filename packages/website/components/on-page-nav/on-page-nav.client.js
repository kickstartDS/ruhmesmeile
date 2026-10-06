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

const collectTargets = () =>
  Array.from(document.querySelectorAll(targetSelector))
    .map((target) => ({
      target,
      id: target.id,
      label:
        target.querySelector(labelSelector)?.textContent?.trim() ||
        target.textContent.trim(),
    }))
    .filter(({ id, label }) => id && label);

class OnPageNav extends Component {
  constructor(element) {
    super(element);

    const list = element.querySelector(".dsa-on-page-nav__list");
    if (!list) return;

    let targets = [];
    let links = [];
    let signature = null;

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
      if (!links.length) return;

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

    // React reuses this <nav> across client-side route changes — `_app.tsx`
    // renders it as a sibling of the page component, so the main navigation and
    // the "Weitere Projekte" cards swap the page content without touching the
    // bar. The Storyblok Visual Editor replaces sections the same way, without a
    // route change at all. Rebuilding from the headlines when the page content
    // changes keeps the previous page's labels and `#targets` out of the bar,
    // and keeps the scroll-spy from comparing against detached elements.
    const build = () => {
      const next = collectTargets();
      const firstLabel = element.dataset.firstLabel;
      const nextSignature = `${firstLabel || ""}\u0000${next
        .map(({ id, label }) => `${id}\u0000${label}`)
        .join("\u0001")}`;
      const sameTargets = next.every(
        (item, index) => item.target === targets[index]?.target,
      );

      // A single section is not navigation worth a bar.
      element.hidden = next.length < 2;
      if (next.length < 2) {
        // Only touch the DOM when there is something to clear: the observer
        // would otherwise keep waking up on an already-empty list.
        if (links.length) list.replaceChildren();
        targets = [];
        links = [];
        signature = null;
        return;
      }

      if (nextSignature === signature && sameTargets) return;

      targets = next;
      signature = nextSignature;
      list.replaceChildren();
      links = targets.map(({ id, label }, index) => {
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

      setScrollOffset();
      setActiveLink();
    };

    const onResize = () => {
      setScrollOffset();
      onScroll();
    };

    // Rebuilds triggered by the page-content swap also fire for the bar's own
    // list mutation; the signature check makes those a no-op instead of a loop.
    const observer = new MutationObserver(build);

    build();
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    this.onDisconnect(() => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty(offsetProperty);
    });
  }
}

define(identifier, OnPageNav);

export { identifier };
