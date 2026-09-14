import { forwardRef } from "react";
import { FeaturesContextDefault } from "@kickstartds/design-system/features";
import { FeatureContext } from "@kickstartds/design-system/feature";
import { StoryblokSubComponent } from "@/components/StoryblokSubComponent";

/** Flat CTA fields the CMS `feature` blok still carries from before the migration. */
type LegacyFeatureCta = {
  cta_label?: string;
  cta_url?: string;
  cta_style?: string;
  cta_toggle?: boolean;
  cta_icon?: string;
};

/** Shape the current design system's feature component reads. */
type FeatureCta = {
  label?: string;
  url?: string;
  style?: string;
  toggle?: boolean;
  icon?: string;
};

/**
 * Before the migration the `feature` blok stored its call to action in the flat
 * `cta_*` fields, and those won over the container's `ctas` group: a feature
 * that declares `cta_style` / `cta_toggle` rendered exactly that, and the
 * container's `ctas_style` / `ctas_toggle` only reached features that carry
 * none of the flat fields. The home page relies on it - its container says
 * `ctas_style: intext` / `ctas_toggle: false` while all four features ask for a
 * `link` with `toggle: true`.
 *
 * The current design system maps every feature to the container's `ctas`
 * instead (`FeaturesComponent`), and the fold in `unflatten` cannot recover the
 * flat fields afterwards: the mapped `cta` object and the component defaults
 * are merged in first, so a truthy container style sticks while a falsy
 * `toggle: false` is overwritten. Resolve the two per feature here, where the
 * Storyblok field shape is known.
 */
const resolveCta = (
  blok: LegacyFeatureCta,
  cta?: FeatureCta,
): FeatureCta => ({
  label: blok.cta_label ?? cta?.label,
  url: blok.cta_url ?? cta?.url,
  style: blok.cta_style ?? cta?.style,
  toggle: blok.cta_toggle ?? cta?.toggle,
  icon: blok.cta_icon ?? cta?.icon,
});

/**
 * Resolves a feature of a `features` container. The container has already
 * mapped the container-level `ctas` into `cta`; the feature's own flat fields
 * take precedence here, then get consumed so they cannot fold back over the
 * resolved value on the way to the `feature` blok component.
 */
const FeatureWithLegacyCta = forwardRef<HTMLElement>((props, ref) => {
  const { cta, cta_label, cta_url, cta_style, cta_toggle, cta_icon, ...rest } =
    props as Record<string, any>;

  // `StoryblokSubComponent` declares no props of its own (it resolves whatever
  // it is handed through the blok's `component` field), so the resolved props
  // are handed over as one object rather than as a named prop.
  const featureProps = {
    ...rest,
    cta: resolveCta({ cta_label, cta_url, cta_style, cta_toggle, cta_icon }, cta),
  };

  return <StoryblokSubComponent {...featureProps} ref={ref} />;
});
FeatureWithLegacyCta.displayName = "Feature With Legacy CTA";

export const FeaturesComponent = forwardRef<HTMLDivElement, Record<string, any>>(
  (props, ref) => (
    <FeatureContext.Provider value={FeatureWithLegacyCta}>
      <FeaturesContextDefault {...props} ref={ref} />
    </FeatureContext.Provider>
  ),
);
FeaturesComponent.displayName = "Features";

export default FeaturesComponent;
