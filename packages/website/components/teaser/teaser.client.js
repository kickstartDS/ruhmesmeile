// Makes a whole teaser card clickable: registers the `base.teaser` component,
// which finds `.c-teaser__link a` inside the card and forwards clicks on the
// card (and on `[ks-incoming]` descendants) to that link.
//
// `@kickstartds/design-system/components/teaser-card` renders the markup but
// only *defines* the component; it has to be imported from an app-level client
// script to be instantiated. `blog-teaser` renders the same `.c-teaser` markup,
// so this covers the blog cards on `/design-system-insights` too.
import "@kickstartds/base/lib/teaser/lazyTeaser";
