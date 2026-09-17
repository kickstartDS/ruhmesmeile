/**
 * The editable layers the preview can leave out.
 *
 * The editor injects two stylesheets into `preview.html` — the brand token layer
 * (`tokensToCss` over the branding tokens) and the component token layer
 * (`componentTokensToCss` over the component tokens) — plus whatever the design
 * system itself ships. Turning one off shows what that layer is actually adding,
 * which is the only way to tell brand customisation from design-system defaults.
 *
 * Note what is *not* in here: component rules. Styles like the button's
 * `inset 0 -3px 0` edge live in the design system's own component stylesheets
 * (`dist/components/button/button.css`, imported by the component), so they are
 * part of the design system rather than a layer on top of it, and they stay
 * applied with both flags off. That is the intended end state — the site and the
 * preview load the same CSS.
 *
 * These keys are a contract between two bundles: this app writes them, the
 * `preview.html` entry reads them and reacts to `storage` events, so toggling
 * here updates a running preview without reloading the iframe.
 */
export const PREVIEW_LAYER_KEYS = {
  brand: "preview:brand-layer",
  component: "preview:component-layer",
} as const;

export type PreviewLayer = keyof typeof PREVIEW_LAYER_KEYS;

/** Absent means on: the preview has always shown both layers. */
export const isLayerEnabled = (key: string): boolean =>
  localStorage.getItem(key) !== "off";

export const setLayerEnabled = (key: string, enabled: boolean): void => {
  localStorage.setItem(key, enabled ? "on" : "off");
};
