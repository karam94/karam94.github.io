/**
 * Custom Sitemap with lastmod dates
 *
 * Generates a sitemap with proper lastmod timestamps
 * from blog post updatedDate or pubDate.
 */

import { getCollection } from 'astro:content';
import { getSlug } from '../utils/getSlug';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const site = context.site?.toString() || 'https://www.karam.io';

  const staticPages = [
    {
      url: site,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      url: `${site}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.9',
    },
    {
      url: `${site}/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.5',
    },
    {
      url: `${site}/cv`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.5',
    },
  ];

  const blogPages = posts.map((post) => {
    const lastmod = post.data.updatedDate || post.data.pubDate;
    return `
      <url>
        <loc>${site}/blog/${getSlug(post.id)}</loc>
        <lastmod>${lastmod.toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  }).join('');

  const staticPagesXml = staticPages
    .map(
      (page) => `
      <url>
        <loc>${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `
    )
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPagesXml}
${blogPages}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
