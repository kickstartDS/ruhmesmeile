import localFont from "next/font/local";

const displayFont = localFont({
  src: [
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--ks-brand-font-family-display",
  fallback: [
    "Baskerville",
    "'Baskerville Old Face'",
    "'Hoefler Text'",
    "'Times New Roman'",
    "serif",
  ],
  adjustFontFallback: false,
});

const displayFontPreview = localFont({
  src: [
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../design-system/dist/static/fonts/Metropolis-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  preload: false,
  display: "auto",
  variable: "--ks-brand-font-family-display",
  fallback: [
    "Baskerville",
    "'Baskerville Old Face'",
    "'Hoefler Text'",
    "'Times New Roman'",
    "serif",
  ],
  adjustFontFallback: false,
});

export const fontClassNames = displayFont.variable;
export const fontClassNamesPreview = displayFontPreview.variable;

// Internal font-family strings as resolved by next/font (e.g. "__displayFont_47f601").
// Used to rewrite matching theme CSS values so the browser uses next/font's
// already-declared @font-face instead of looking up the human-readable name.
// The copy and interface families are plain system stacks and are never loaded
// as webfonts, so all three keys point at the single local font.
export const nextFontFamilies = {
  display: displayFont.style.fontFamily,
  copy: displayFont.style.fontFamily,
  interface: displayFont.style.fontFamily,
};

// The human-readable name stored in Storyblok theme tokens for the locally-loaded
// font. Used to detect which themes reference this font so we can rewrite the
// CSS value to next/font's synthetic name before body injection.
export const localFontFamilyName = "Metropolis";
