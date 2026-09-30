const SITES = {
  "westwardcampus.fr": { route: "campus", primary: "westwardcampus.fr" },
  "www.westwardcampus.fr": { route: "campus", primary: "westwardcampus.fr" },
  "westwarddigital.fr": { route: "digital", primary: "westwarddigital.fr" },
  "www.westwarddigital.fr": { route: "digital", primary: "westwarddigital.fr" },
  "westwardcoffee.fr": { route: "coffee-shop", primary: "westwardcoffee.fr" },
  "www.westwardcoffee.fr": { route: "coffee-shop", primary: "westwardcoffee.fr" },
  "cowboyculture.fr": { route: "cowboy-culture", primary: "cowboyculture.fr" },
  "www.cowboyculture.fr": { route: "cowboy-culture", primary: "cowboyculture.fr" }
};

function destinationPath(pathname, route) {
  if (pathname === "/" || pathname === "/index.html") return `/${route}/`;
  if (pathname === "/en" || pathname === "/en/") return `/en/${route}/`;
  if (pathname === "/es" || pathname === "/es/") return `/es/${route}/`;
  return pathname;
}

function localizeSiteHtml(html, route, primary) {
  const replacements = [
    [`https://westwardco.fr/en/${route}/`, `https://${primary}/en/`],
    [`https://westwardco.fr/es/${route}/`, `https://${primary}/es/`],
    [`https://westwardco.fr/${route}/`, `https://${primary}/`],
    [`href="/en/${route}/"`, 'href="/en/"'],
    [`href="/es/${route}/"`, 'href="/es/"'],
    [`href="/${route}/"`, 'href="/"']
  ];

  for (const [from, to] of replacements) html = html.split(from).join(to);
  return html;
}

function sitemap(primary) {
  const urls = ["", "en/", "es/"]
    .map(path => `  <url><loc>https://${primary}/${path}</loc><changefreq>monthly</changefreq><priority>${path ? "0.8" : "1.0"}</priority></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const site = SITES[url.hostname.toLowerCase()];

    if (!site) return env.ASSETS.fetch(request);

    if (url.hostname !== site.primary) {
      url.hostname = site.primary;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/robots.txt") {
      return new Response(`User-agent: *\nAllow: /\nSitemap: https://${site.primary}/sitemap.xml\n`, {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    if (url.pathname === "/sitemap.xml") {
      return new Response(sitemap(site.primary), {
        headers: { "content-type": "application/xml; charset=utf-8" }
      });
    }

    const assetUrl = new URL(request.url);
    assetUrl.pathname = destinationPath(url.pathname, site.route);
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) return response;

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    const html = localizeSiteHtml(await response.text(), site.route, site.primary);
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
