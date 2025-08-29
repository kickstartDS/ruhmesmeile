const linkTag = document.createElement("link");
linkTag.href = "/pagefind/pagefind-ui.css";
linkTag.rel = "stylesheet";
document.head.appendChild(linkTag);

await import("/pagefind/pagefind-ui.js");

new PagefindUI({ element: "#search", showSubResults: true });
