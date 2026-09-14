/**
 * Rebuild the nested shape Storyblok stores flat: `image_src` / `image_alt` /
 * `image_fullWidth` become `image.src` / `image.alt` / `image.fullWidth`, which
 * is what the design system's prop types expect (`Contact.image` is an object).
 *
 * A blob can legitimately carry both a nested component under a key *and*
 * flat `<key>_*` siblings — `blog-aside` has an `author` blok plus legacy
 * `author_name` / `author_email` / `author_image` fields, and those assemble
 * into an `author` that may collide with the blok. Folding must therefore only
 * ever descend into plain maps this function built itself:
 *
 * - never into a nested blok (an object with `component`) — folding there
 *   mutates that blok, and because the same object is usually also referenced
 *   from an array, the mutation leaks into the other reference too;
 * - never into an array;
 * - never into a scalar. The old implementation did, which both threw
 *   (`Cannot create property 'alt' on string '…'`) and lost the value.
 *
 * When folding is not legal the key stays flat, which is what the components
 * that own such legacy fields read anyway.
 */
const isFoldableContainer = (
  value: unknown,
): value is Record<string, any> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  !("component" in value);

export function unflatten(blok: Record<string, any>) {
  return Object.entries(blok).reduce((a, [k, v]) => {
    if (k.startsWith("_")) {
      a[k] = v;
      return a;
    }

    const segments = k.split("_");
    const last = segments.pop() as string;

    let target: Record<string, any> = a;
    let foldable = true;

    for (const segment of segments) {
      const existing = target[segment];
      if (!existing) {
        target[segment] = {};
      } else if (!isFoldableContainer(existing)) {
        foldable = false;
        break;
      }
      target = target[segment];
    }

    if (!foldable) {
      a[k] = v;
    } else if (!target[last]) {
      target[last] = v;
    }

    return a;
  }, {} as Record<string, any>);
}

// TODO test this for content automation (GTP -> Storyblok)
export function flatten(blok: Record<string, any>) {
  return Object.entries(blok).reduce((a, [k, v]) => {
    if (k.startsWith("_")) {
      a[k] = v;
      return a;
    }

    const keys = k.split("_");
    let r = a;
    keys.forEach((e, i) => {
      if (i === keys.length - 1) {
        r[e] = v;
      } else {
        r[e] = r[e] || {};
        r = r[e];
      }
    });

    return a;
  }, {} as Record<string, any>);
}
