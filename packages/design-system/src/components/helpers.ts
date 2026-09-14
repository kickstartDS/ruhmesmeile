/**
 * `structuredClone` is available in every runtime that runs this code, browser
 * and Node alike, and it throws on values it cannot clone (functions, DOM
 * nodes, class instances with private state). Use it directly: the previous
 * `window.postMessage` probe only answered correctly in a browser, so on the
 * server every value looked uncloneable and `deepMergeDefaults` handed out the
 * module-level `defaults` objects themselves. A consumer that then wrote into
 * a nested default — `unflatten` folding `link_url` into `link`, say — polluted
 * that default for every sibling rendered afterwards, which is how a list of
 * teasers ended up all pointing at the first teaser's link.
 */
export function canBeCloned(val: unknown): boolean {
  if (typeof structuredClone !== "function") return false;
  try {
    structuredClone(val);
    return true;
  } catch {
    return false;
  }
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export function deepMergeDefaults<T extends Record<string, any>>(
  defaults: DeepPartial<T>,
  props: T,
  replaceExamples: boolean = false
): T {
  const keys = Array.from(
    new Set([...Object.keys(defaults), ...Object.keys(props)])
  );

  return keys.reduce((acc, key) => {
    const val1 = defaults[key] as unknown;
    const val2 = props[key] as unknown;

    if (Array.isArray(val1) && Array.isArray(val2)) {
      acc[key] =
        key === "examples" && replaceExamples
          ? val2
          : (acc[key] = [...val1, ...val2].filter((value, index, self) => {
              return self.findIndex((v) => v === value) === index;
            }));
    } else if (
      typeof val1 === "object" &&
      val1 !== null &&
      typeof val2 === "object" &&
      val2 !== null
    ) {
      acc[key] = deepMergeDefaults(val1, val2, replaceExamples);
    } else if (key in props) {
      acc[key] = canBeCloned(val2) ? structuredClone(val2) : val2;
    } else {
      acc[key] = canBeCloned(val1) ? structuredClone(val1) : val1;
    }

    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any) as T;
}
