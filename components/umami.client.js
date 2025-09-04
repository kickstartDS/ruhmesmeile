import { events as lazyEvents } from "@kickstartds/core/lib/core";

if (window.location.hash === "#disable-umami")
  localStorage.setItem("umami.disabled", 1);

document.querySelectorAll("a").forEach((a) => {
  if (!a.dataset["umami-event"]) {
    a.dataset["umami-event"] =
      a.host !== window.location.host
        ? (a.dataset["umami-event"] = "click.link.outbound")
        : (a.dataset["umami-event"] = "click.link.internal");
    a.dataset["umami-event-url"] = a.href;
    a.dataset["umami-event-label"] = a.innerText;
  }
});

document
  .querySelectorAll("main section.l-section")
  .forEach((section, index) => {
    section.classList.add("lazyload");
    section.dataset.expand = "-1";
    section.dataset.title =
      section.querySelector("h1, h2, h3, h4, h5, h6")?.innerText || "No title";
    section.dataset.index = index;
  });

window._ks.radio.on(lazyEvents.beforeunveil, (_, el) => {
  if (el.tagName === "SECTION") {
    window.umami.track("view.section.reached", {
      title: el.dataset.title,
      index: parseInt(el.dataset.index, 10) + 1,
    });
  }
});
