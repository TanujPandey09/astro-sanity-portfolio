import type { APIRoute } from "astro";
import { useSanityClient, groq } from "astro-sanity";
import { client as fallbackSanityClient } from "../lib/sanityClient.js";
import { escapeXml, portableTextToPlainText } from "../lib/text";

export const prerender = true;

const siteUrl = "https://tanujbuilds.site";

type Blog = {
  projectName?: string;
  slug?: { current?: string };
  excerpt?: Array<{ _type?: string; children?: Array<{ text?: string }> }>;
  Category?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export const GET: APIRoute = async () => {
  const sanity = useSanityClient() || fallbackSanityClient;
  let blogs: Blog[] = [];

  try {
    blogs = await sanity.fetch(
      groq`*[_type == "blogs" && defined(slug.current)] | order(_createdAt desc){
        projectName,
        slug,
        excerpt,
        Category,
        _createdAt,
        _updatedAt
      }`
    );
  } catch (error) {
    console.error("RSS fetch blogs error:", error);
  }

  const items = blogs
    .filter((blog) => blog.slug?.current && blog.projectName)
    .map((blog) => {
      const url = `${siteUrl}/blogs/${blog.slug!.current}`;
      const description =
        portableTextToPlainText(blog.excerpt) ||
        `A new technical article by Tanuj Pandey: ${blog.projectName}`;
      const published = blog._createdAt ? new Date(blog._createdAt) : new Date();
      const pubDate = Number.isNaN(published.getTime()) ? new Date() : published;

      return `    <item>
      <title>${escapeXml(blog.projectName!)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      ${blog.Category ? `<category>${escapeXml(blog.Category)}</category>` : ""}
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tanuj Pandey — Blog</title>
    <link>${siteUrl}/blogs</link>
    <description>Technical articles and insights on full stack engineering, web architecture, and AI integrations.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
