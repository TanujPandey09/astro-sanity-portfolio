import type { APIRoute } from 'astro';
import { useSanityClient, groq } from 'astro-sanity';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://tanujbuilds.site';

  let projects: Array<{ slug?: { current?: string }, _updatedAt?: string }> = [];
  let blogs: Array<{ slug?: { current?: string }, _updatedAt?: string }> = [];

  try {
    projects = await useSanityClient().fetch(groq`*[_type == "projects" && defined(slug.current)]{ slug, _updatedAt }`);
  } catch (e) {
    console.error('Sitemap fetch projects error:', e);
  }

  try {
    blogs = await useSanityClient().fetch(groq`*[_type == "blogs" && defined(slug.current)]{ slug, _updatedAt }`);
  } catch (e) {
    console.error('Sitemap fetch blogs error:', e);
  }

  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0', lastmod: currentDate },
    { url: `${siteUrl}/projects`, changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { url: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.8', lastmod: currentDate },
    { url: `${siteUrl}/blogs`, changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
  ];

  const projectUrls = projects
    .filter((p) => p.slug?.current)
    .map((p) => ({
      url: `${siteUrl}/projects/${p.slug!.current}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: p._updatedAt ? p._updatedAt.split('T')[0] : currentDate,
    }));

  const blogUrls = blogs
    .filter((b) => b.slug?.current)
    .map((b) => ({
      url: `${siteUrl}/blogs/${b.slug!.current}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: b._updatedAt ? b._updatedAt.split('T')[0] : currentDate,
    }));

  const allUrls = [...staticPages, ...projectUrls, ...blogUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
