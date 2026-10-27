import type { APIRoute } from 'astro';
import { useSanityClient, groq } from 'astro-sanity';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://tanujbuilds.site';

  let projects: Array<{ slug?: { current?: string }, _updatedAt?: string }> = [];
  let blogs: Array<{ slug?: { current?: string }, _updatedAt?: string }> = [];
  let templates: Array<{ slug?: { current?: string }, _updatedAt?: string }> = [];

  try {
    projects = await useSanityClient().fetch(
      groq`*[_type == "projects" && defined(slug.current) && !defined(gumroadLink) && !(slug.current in [
        "lumina-dental-premium-dental-website-template",
        "apex-luxury-ultra-luxury-real-estate-and-architectural-web-template"
      ])]{ slug, _updatedAt }`
    );
  } catch (e) {
    console.error('Sitemap fetch projects error:', e);
  }

  try {
    blogs = await useSanityClient().fetch(groq`*[_type == "blogs" && defined(slug.current)]{ slug, _updatedAt }`);
  } catch (e) {
    console.error('Sitemap fetch blogs error:', e);
  }

  try {
    const newTemplates = await useSanityClient().fetch(groq`*[_type == "templates" && defined(slug.current)]{ slug, _updatedAt }`);
    const legacyTemplates = await useSanityClient().fetch(
      groq`*[_type == "projects" && (defined(gumroadLink) || slug.current in [
        "lumina-dental-premium-dental-website-template",
        "apex-luxury-ultra-luxury-real-estate-and-architectural-web-template"
      ])]{ slug, _updatedAt }`
    );
    const slugSet = new Set((newTemplates || []).map((t: any) => t.slug?.current));
    templates = [...(newTemplates || [])];
    for (const leg of legacyTemplates || []) {
      if (!slugSet.has(leg.slug?.current)) {
        templates.push(leg);
      }
    }
  } catch (e) {
    console.error('Sitemap fetch templates error:', e);
  }

  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
    { url: `${siteUrl}/projects`, changefreq: 'weekly', priority: '0.9' },
    { url: `${siteUrl}/templates`, changefreq: 'weekly', priority: '0.9' },
    { url: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.8' },
    { url: `${siteUrl}/blogs`, changefreq: 'weekly', priority: '0.8' },
  ];

  const projectUrls = projects
    .filter((p) => p.slug?.current)
    .map((p) => ({
      url: `${siteUrl}/projects/${p.slug!.current}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: p._updatedAt ? p._updatedAt.split('T')[0] : currentDate,
    }));

  const templateUrls = templates
    .filter((t) => t.slug?.current)
    .map((t) => ({
      url: `${siteUrl}/templates/${t.slug!.current}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: t._updatedAt ? t._updatedAt.split('T')[0] : currentDate,
    }));

  const blogUrls = blogs
    .filter((b) => b.slug?.current)
    .map((b) => ({
      url: `${siteUrl}/blogs/${b.slug!.current}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: b._updatedAt ? b._updatedAt.split('T')[0] : currentDate,
    }));

  const allUrls = [...staticPages, ...projectUrls, ...templateUrls, ...blogUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    ${'lastmod' in item ? `<lastmod>${item.lastmod}</lastmod>\n    ` : ''}<changefreq>${item.changefreq}</changefreq>
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
