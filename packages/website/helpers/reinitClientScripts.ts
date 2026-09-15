/**
 * Re-initialises the design system's client behaviours after React has swapped
 * content in — the Storyblok Visual Editor does this on every change, without a
 * route change.
 *
 * The design system attaches a component by scanning for `[ks-component="<name>"]`
 * once, when the component is defined, and then through a MutationObserver. In
 * practice only that first pass lands: DOM that arrives later (a new slide, a new
 * teaser card) renders its markup but never gets its behaviour. Measured on the
 * production site — a teaser card inserted after load stays inert, while the same
 * card initialises normally when it arrives with the initial payload.
 *
 * Toggling the attribute the framework's own observer filters on (`ks-component`)
 * runs both halves of its handler: the removal tears the old instance down, the
 * re-add attaches a fresh one. That is the supported hook, and a full page of
 * components re-initialises in a few milliseconds.
 *
 * Callers pass the subtree(s) that actually changed, so the editor's live updates
 * don't tear down and restart behaviour in parts of the page nobody touched —
 * that is also what keeps the preview from jumping or losing scroll position.
 */
export const reinitClientScripts = (roots: ParentNode[] = [document.body]) => {
  const elements = new Set<Element>();

  for (const root of roots) {
    // `querySelectorAll` skips the root itself, and a changed section *is* a
    // component (`.dsa.section`), so it has to be considered separately.
    if (root instanceof Element && root.hasAttribute("ks-component")) {
      elements.add(root);
    }
    for (const element of Array.from(root.querySelectorAll("[ks-component]"))) {
      elements.add(element);
    }
  }

  for (const element of Array.from(elements)) {
    const name = element.getAttribute("ks-component");
    if (!name) continue;

    element.removeAttribute("ks-component");
    element.setAttribute("ks-component", name);
  }
};

/**
 * Cheap, stable hash of a piece of story content, used to tell which sections the
 * editor actually changed between two bridge updates.
 */
export const contentHash = (value: unknown) => {
  const serialized = JSON.stringify(value ?? null);
  let hash = 0;

  for (let i = 0; i < serialized.length; i += 1) {
    hash = (hash * 31 + serialized.charCodeAt(i)) | 0;
  }

  return hash;
};
