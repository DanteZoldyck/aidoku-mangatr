const BASE = "https://manga-tr.com";

const headers = {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  "Referer": BASE
};

// Manga listesi
async function getMangaList(filters, page) {
  const url = page === 1
    ? `${BASE}/?sayfa=${page}`
    : `${BASE}/manga-list.html?listType=pagination&sayfa=${page}`;

  const html = await fetch(url, { headers }).then(r => r.text());
  const doc = new DOMParser().parseFromString(html, "text/html");
  const results = [];

  doc.querySelectorAll("a[href$='.html']").forEach(el => {
    const href = el.getAttribute("href") || "";
    if (href.includes("bolum") || href.includes("index") || href.includes("arama") || href.includes("list")) return;
    const title = el.getAttribute("title") || el.querySelector("img")?.getAttribute("alt") || el.textContent.trim();
    const cover = el.querySelector("img")?.getAttribute("src") || "";
    const id = href.replace(".html", "").split("/").pop();
    if (title && id && title.length > 2) {
      re
