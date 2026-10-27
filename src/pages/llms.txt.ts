import type { APIRoute } from "astro";
import { useSanityClient, groq } from "astro-sanity";
import { portableTextToPlainText } from "../lib/text";

const siteUrl = "https://tanujbuilds.site";

type Project = {
  projectName?: string;
  slug?: { current?: string };
  excerpt?: Array<{ _type?: string; children?: Array<{ text?: string }> }>;
  gumroadLink?: string;
  _updatedAt?: string;
};

type Blog = {
  projectName?: string;
  slug?: { current?: string };
  excerpt?: Array<{ _type?: string; children?: Array<{ text?: string }> }>;
  _updatedAt?: string;
};

const clean = (value?: string): string => (value || "").replace(/\s+/g, " ").trim();

export const GET: APIRoute = async () => {
  let projects: Project[] = [];
  let blogs: Blog[] = [];

  try {
    projects = await useSanityClient().fetch(
      groq`*[_type == "projects" && defined(slug.current)] | order(_updatedAt desc){
        projectName,
        slug,
        excerpt,
        gumroadLink,
        _updatedAt
      }`
    );
  } catch (error) {
    console.error("llms.txt fetch projects error:", error);
  }

  try {
    blogs = await useSanityClient().fetch(
      groq`*[_type == "blogs" && defined(slug.current)] | order(_updatedAt desc){
        projectName,
        slug,
        excerpt,
        _updatedAt
      }`
    );
  } catch (error) {
    console.error("llms.txt fetch blogs error:", error);
  }

  const products = projects.filter((project) => project.gumroadLink);
  const caseStudies = projects.filter((project) => !project.gumroadLink);

  const projectLines = caseStudies
    .map((project) => {
      const description = clean(portableTextToPlainText(project.excerpt));
      return `- [${clean(project.projectName)}](${siteUrl}/projects/${project.slug!.current})${description ? `: ${description}` : ""}`;
    })
    .join("\n");

  const productLines = products
    .map((project) => {
      const description = clean(portableTextToPlainText(project.excerpt));
      return `- [${clean(project.projectName)}](${siteUrl}/templates/${project.slug!.current})${description ? `: ${description}` : ""} (Gumroad: ${project.gumroadLink})`;
    })
    .join("\n");

  const blogLines = blogs
    .map((blog) => {
      const description = clean(portableTextToPlainText(blog.excerpt));
      return `- [${clean(blog.projectName)}](${siteUrl}/blogs/${blog.slug!.current})${description ? `: ${description}` : ""}`;
    })
    .join("\n");

  const content = `# Tanuj Pandey

> Full Stack Engineer and AI Solutions Architect with 4+ years of experience building secure, high-performance web applications, scalable APIs, headless CMS integrations, and AI chatbot workflows.

## Navigation
- [About Tanuj Pandey](${siteUrl}/about): Background, technical expertise, and professional experience.
- [Projects](${siteUrl}/projects): Portfolio of production web applications and custom case studies.
- [Templates](${siteUrl}/templates): Production-ready commercial website templates available on Gumroad.
- [Blog](${siteUrl}/blogs): Technical articles on Astro, React, Node.js, Sanity CMS, and AI integrations.

## Case Studies
${projectLines || "- No case studies published yet."}

## Commercial Website Templates
${productLines || "- No templates published yet."}

## Writing
${blogLines || "- No articles published yet."}

## Contact
- Email: tanujp09@gmail.com
- GitHub: https://github.com/TanujPandey09
- LinkedIn: https://linkedin.com/in/tanujdev
- X: https://x.com/TanujPandey
- Sitemap: ${siteUrl}/sitemap.xml
- RSS: ${siteUrl}/rss.xml
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
