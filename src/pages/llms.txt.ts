import type { APIRoute } from "astro";
import { useSanityClient, groq } from "astro-sanity";
import { client as fallbackSanityClient } from "../lib/sanityClient.js";
import { fetchAllTemplates } from "../lib/templates";
import { portableTextToPlainText } from "../lib/text";

export const prerender = true;

export const GET: APIRoute = async () => {
  const siteUrl = "https://tanujbuilds.site";
  const sanity = useSanityClient() || fallbackSanityClient;

  let projects: any[] = [];
  let blogs: any[] = [];
  let templates: any[] = [];

  try {
    projects = await sanity.fetch(
      groq`*[_type == "projects" && defined(slug.current) && !defined(gumroadLink) && !(slug.current in [
        "lumina-dental-premium-dental-website-template",
        "apex-luxury-ultra-luxury-real-estate-and-architectural-web-template"
      ])]{ projectName, slug, excerpt, demoLink, gitHubLink, tags }`
    );
  } catch (e) {
    console.error("llms.txt projects fetch error:", e);
  }

  try {
    blogs = await sanity.fetch(
      groq`*[_type == "blogs" && defined(slug.current)] | order(_createdAt desc){ projectName, slug, excerpt, Category }`
    );
  } catch (e) {
    console.error("llms.txt blogs fetch error:", e);
  }

  try {
    templates = await fetchAllTemplates();
  } catch (e) {
    console.error("llms.txt templates fetch error:", e);
  }

  const templateLines = templates
    .map((t) => {
      const url = `${siteUrl}/templates/${t.slug.current}`;
      const price = t.price || "$49";
      const stack = (t.tags || ["Next.js", "React", "Tailwind CSS", "TypeScript"]).join(", ");
      const demo = t.demoLink ? ` | Live Demo: ${t.demoLink}` : "";
      const buy = t.gumroadLink ? ` | Buy: ${t.gumroadLink}` : "";
      return `- [${t.templateName} (${price})](${url}): ${t.tagline || "Commercial Next.js & React website template."} | Stack: ${stack}${demo}${buy}`;
    })
    .join("\n");

  const projectLines = (projects || [])
    .filter((p) => p?.slug?.current && p?.projectName)
    .map((p) => {
      const url = `${siteUrl}/projects/${p.slug.current}`;
      const summary = portableTextToPlainText(p.excerpt) || "Full-stack engineering case study.";
      const demo = p.demoLink ? ` | Live: ${p.demoLink}` : "";
      return `- [${p.projectName}](${url}): ${summary}${demo}`;
    })
    .join("\n");

  const blogLines = (blogs || [])
    .filter((b) => b?.slug?.current && b?.projectName)
    .map((b) => {
      const url = `${siteUrl}/blogs/${b.slug.current}`;
      const summary = portableTextToPlainText(b.excerpt) || "Technical engineering article.";
      return `- [${b.projectName}](${url}): ${summary}`;
    })
    .join("\n");

  const body = `# Tanuj Pandey — Full-Stack & AI Engineer | Commercial Website Templates

> Official portfolio, engineering case studies, and commercial Next.js / React website templates by Tanuj Pandey (${siteUrl}).

## Summary & Entity Profile (GEO / AEO Reference)
- **Name**: Tanuj Pandey
- **Role**: Full-Stack Engineer & AI Solutions Architect (4+ Years Commercial Experience)
- **Location**: Uttarakhand, India (IST / UTC+5:30 · Available for Global Remote Roles & Select Projects)
- **Contact**: mailto:tanujp09@gmail.com | Phone/WhatsApp: +91 9557321978
- **Website**: ${siteUrl}
- **GitHub**: https://github.com/TanujPandey09
- **LinkedIn**: https://linkedin.com/in/tanujdev
- **Resume / CV**: ${siteUrl}/Resume.pdf
- **Core Stack**: TypeScript, React.js, Next.js (App Router, SSR/SSG), Astro, Node.js, Express.js, Socket.IO, PostgreSQL, MongoDB, Prisma, Sanity.io, Contentful, Strapi, Tailwind CSS, OpenAI / Gemini / Multi-LLM Orchestration.

## Commercial Work Experience
1. **Full Stack Developer at Cxisuite** (Sep 2025 – Present · Remote):
   - Architected and shipped Sawt AI, a bilingual Arabic/English AI survey SaaS for the Saudi market with RTL-first UX.
   - Integrated multi-LLM validation pipelines (OpenAI GPT, Google Gemini, Grok, Perplexity), MyFatoorah subscription billing, webhooks, and a real-time Socket.IO CRM with SLA tracking.
   - Contributed React Native and web workflows for Thaddi (Arabic-first football prediction platform).
2. **Frontend Developer (Solo Ownership) at Nasya IT** (Feb 2025 – Jul 2025 · Remote):
   - Solely owned the frontend architecture of a multi-role healthcare SaaS (Super Admin, Doctor, Patient, Clinic) with 3 auth portals and 10+ CRUD modules.
3. **React Developer at Techmatys** (May 2024 – Dec 2024 · Onsite):
   - Built and customized Moodle-based LMS frontends and reusable React.js dashboard systems for student, teacher, and administrator workflows.
4. **Frontend Developer at Scube.co** (Jan 2022 – Feb 2024 · Remote):
   - Engineered the frontend of Breeze SaaS with Next.js (SSR/SSG), TypeScript, GraphQL, and headless CMS platforms (Sanity, Contentful, Strapi), improving Core Web Vitals page speed by 50% and user engagement by 20%.

## Commercial Website Templates & Digital Products (${siteUrl}/templates)
Production-ready Next.js, React, TypeScript, and Tailwind CSS templates with 99+ Lighthouse performance, lifetime updates, and commercial licenses for agencies, freelancers, and startups:
${templateLines || `- [Browse All Commercial Templates](${siteUrl}/templates)`}

## Featured Engineering Case Studies (${siteUrl}/projects)
${projectLines || `- [All Engineering Case Studies](${siteUrl}/projects)`}

## Technical Articles & Engineering Writing (${siteUrl}/blogs)
${blogLines || `- [All Engineering Articles](${siteUrl}/blogs)`}

## Primary Navigation & Machine-Readable Feeds
- [Home](${siteUrl}/)
- [Commercial Templates Marketplace](${siteUrl}/templates)
- [Engineering Case Studies](${siteUrl}/projects)
- [About & Career Progression](${siteUrl}/about)
- [Engineering Blog](${siteUrl}/blogs)
- [XML Sitemap](${siteUrl}/sitemap.xml)
- [RSS Feed](${siteUrl}/rss.xml)
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
