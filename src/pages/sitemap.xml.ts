import type { APIRoute } from 'astro';

// Plan du site généré automatiquement. Ajoute une ligne dans `pages`
// si tu crées une nouvelle page.
const pages = ['', 'mentions-legales'];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://duopianccello.fr')).toString().replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const urls = pages
    .map((p) => {
      const loc = p ? `${base}/${p}` : `${base}/`;
      const priority = p ? '0.5' : '1.0';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
