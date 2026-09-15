/**
 * Re-initialises the design system's client behaviours after React has swapped
 * content in — most visibly in the Storyblok Visual Editor, where the bridge
 * replaces the page's content on every change.
 *
 * The design system attaches a component by scanning for `[ks-component="<name>"]`
 * once, when the component is defined, and then through a MutationObserver. In
 * practice only that first pass lands: DOM that arrives later (a new slide, a new
 * teaser card, a whole page after a client-side navigation) renders its markup but
 * never gets its behaviour. Measured on the production site — a teaser card
 * inserted after load stays inert, while the same card initialises normally when
 * it is part of the initial payload.
 *
 * Toggling the attribute the framework's own observer watches (`attributeFilter`
 * is `[ks-component, …]`) runs both halves of its handler: the removal tears the
 * old instance down and the re-add attaches a fresh one. That is the supported
 * hook — the observer reacts to exactly this attribute — and a full page of
 * components re-initialises in a few milliseconds. Verified the same way: a card
 * inserted after load becomes clickable once the attribute is toggled.
 */
export const reinitClientScripts = (root: ParentNode = document.body) => {
  const elements = root.querySelectorAll("[ks-component]");

  for (const element of Array.from(elements)) {
    const name = element.getAttribute("ks-component");
    if (!name) continue;

    element.removeAttribute("ks-component");
    element.setAttribute("ks-component", name);
  }
};
