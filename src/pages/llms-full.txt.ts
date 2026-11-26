import type { APIRoute } from "astro";
import { useSanityClient, groq } from "astro-sanity";
import { client as fallbackSanityClient } from "../lib/sanityClient.js";
import { fetchAllTemplates } from "../lib/templates";
import { portableTextToPlainText } from "../lib/text";

export const prerender = false;

export const GET: APIRoute = async () => {
  const siteUrl = "https://tanujbuilds.site";
  const fetchSafe = async (query: string) => {
    try {
      const client = useSanityClient();
      const res = await client.fetch(query);
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return fallbackSanityClient.fetch(query);
  };

  let projects: any[] = [];
  let blogs: any[] = [];
  let templates: any[] = [];

  try {
    projects = await fetchSafe(
      groq`*[_type == "projects" && defined(slug.current) && !defined(gumroadLink) && !(slug.current in [
        "lumina-dental-premium-dental-website-template",
        "apex-luxury-ultra-luxury-real-estate-and-architectural-web-template"
      ])] | order(_createdAt desc){
        projectName, slug, category, role, tags, headlineMetrics, excerpt, projectcontent, demoLink, gitHubLink
      }`
    );
  } catch (e) {
    console.error("llms-full.txt projects fetch error:", e);
  }

  try {
    blogs = await fetchSafe(
      groq`*[_type == "blogs" && defined(slug.current)] | order(_createdAt desc){
        projectName, slug, Category, tags, excerpt, _createdAt
      }`
    );
  } catch (e) {
    console.error("llms-full.txt blogs fetch error:", e);
  }

  try {
    templates = await fetchAllTemplates();
  } catch (e) {
    console.error("llms-full.txt templates fetch error:", e);
  }

  const projectSections = (projects || [])
    .filter((p) => p?.slug?.current && p?.projectName)
    .map((p, idx) => {
      const url = `${siteUrl}/projects/${p.slug.current}`;
      const summary = portableTextToPlainText(p.excerpt) || "Production full-stack engineering case study.";
      const fullContent = portableTextToPlainText(p.projectcontent).slice(0, 900);
      const demoUrl = typeof p.demoLink === "string" ? p.demoLink : p.demoLink?.current;
      const githubUrl = typeof p.gitHubLink === "string" ? p.gitHubLink : p.gitHubLink?.current;
      const metrics = Array.isArray(p.headlineMetrics) && p.headlineMetrics.length
        ? `\n- **Key Outcomes**: ${p.headlineMetrics.join(" | ")}`
        : "";
      const stack = Array.isArray(p.tags) && p.tags.length
        ? `\n- **Tech Stack**: ${p.tags.join(", ")}`
        : "";
      const links = [
        `Case Study: ${url}`,
        demoUrl ? `Live App: ${demoUrl}` : "",
        githubUrl ? `GitHub: ${githubUrl}` : "",
      ].filter(Boolean).join(" | ");

      return `### ${idx + 1}. ${p.projectName}
- **Category**: ${p.category || "Full-Stack SaaS"}
- **Role**: ${p.role || "Lead Full-Stack Engineer"}${stack}${metrics}
- **Links**: ${links}
- **Summary**: ${summary}${fullContent ? `\n- **Architectural Details**: ${fullContent}${fullContent.length >= 900 ? "..." : ""}` : ""}`;
    })
    .join("\n\n");

  const templateSections = (templates || [])
    .filter((t) => t?.slug?.current && t?.templateName)
    .map((t, idx) => {
      const url = `${siteUrl}/templates/${t.slug.current}`;
      const stack = (t.tags || ["Next.js", "React", "TypeScript", "Tailwind CSS"]).join(", ");
      return `### ${idx + 1}. ${t.templateName} (${t.price || "$49"})
- **URL**: ${url}${t.demoLink ? ` | **Live Demo**: ${t.demoLink}` : ""}${t.gumroadLink ? ` | **Buy**: ${t.gumroadLink}` : ""}
- **Stack**: ${stack}
- **Description**: ${t.tagline || "Production-ready commercial website template with 99+ Lighthouse performance."}`;
    })
    .join("\n\n");

  const blogSections = (blogs || [])
    .filter((b) => b?.slug?.current && b?.projectName)
    .map((b) => {
      const url = `${siteUrl}/blogs/${b.slug.current}`;
      const summary = portableTextToPlainText(b.excerpt) || "Technical engineering article.";
      const cat = b.Category ? ` [${b.Category}]` : "";
      return `- **[${b.projectName}](${url})**${cat}: ${summary}`;
    })
    .join("\n");

  const body = `# Tanuj Pandey — Full Knowledge Base (GEO / AEO)

> Authoritative, machine-readable reference for **Tanuj Pandey** (Full-Stack & AI Engineer) and **NovaStack Studio** (${siteUrl}/agency).
> Short index: ${siteUrl}/llms.txt | Sitemap: ${siteUrl}/sitemap.xml

## Identity & Contact
- **Full Name**: Tanuj Pandey (also known as Tanuj Builds)
- **Title**: Full-Stack Engineer & AI Solutions Architect (4+ Years Commercial Experience)
- **Agency Studio**: NovaStack Studio (${siteUrl}/agency) — Founder-led SaaS, Web, & AI Engineering Studio
- **Location**: Pauri Garhwal, Uttarakhand, India (IST / UTC+5:30 · Serving global remote clients across US, UK, EU, Middle East, and India)
- **Email**: tanujp09@gmail.com
- **Phone / WhatsApp**: +91 9557321978
- **Website**: ${siteUrl}
- **GitHub**: https://github.com/TanujPandey09
- **LinkedIn**: https://www.linkedin.com/in/tanujdev/
- **Resume**: ${siteUrl}/Resume.pdf

## Core Technical Capabilities
- **Frontend & Frameworks**: Next.js (App Router, SSR/SSG), React.js, Astro.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, RTL Arabic/English UX.
- **Backend & Real-Time Systems**: Node.js, Express.js, Socket.IO, REST & GraphQL APIs, PostgreSQL, Prisma ORM, MongoDB, Redis, RBAC, Multi-Tenant SaaS architecture.
- **AI & Multi-LLM Engineering**: OpenAI GPT, Google Gemini, Grok, Perplexity orchestration, output validation pipelines, RAG systems, autonomous AI workflows.
- **Payments & Headless CMS**: Stripe, MyFatoorah, Gumroad, Sanity.io, Contentful, Strapi.

## Verified Work History
1. **Cxisuite** — Full Stack Developer (Sep 2025 – Present · Remote)
   - Architected Sawt AI, a bilingual Arabic/English RTL-first AI survey SaaS for the Saudi market.
   - Built multi-LLM validation pipelines (OpenAI, Gemini, Grok, Perplexity), MyFatoorah subscription billing & webhooks, and a real-time Socket.IO CRM with SLA tracking.
   - Contributed React Native and web features for Thaddi (Arabic-first football prediction app).
2. **Nasya IT** — Frontend Developer, Solo Ownership (Feb 2025 – Jul 2025 · Remote)
   - Owned end-to-end frontend architecture of a multi-role healthcare SaaS (Super Admin, Doctor, Patient, Clinic) with 3 authentication portals and 10+ CRUD modules.
3. **Techmatys** — React Developer (May 2024 – Dec 2024 · Onsite)
   - Built reusable React.js dashboards and customized Moodle LMS interfaces for student, teacher, and admin workflows.
4. **Scube.co** — Frontend Developer (Jan 2022 – Feb 2024 · Remote)
   - Engineered Breeze SaaS using Next.js (SSR/SSG), TypeScript, GraphQL, and Sanity/Contentful/Strapi, improving Core Web Vitals page speed by 50% and user engagement by 20%.

## Engineering Case Studies (${siteUrl}/projects)
${projectSections || `Browse all case studies at ${siteUrl}/projects`}

## Commercial Website Templates (${siteUrl}/templates)
${templateSections || `Browse all templates at ${siteUrl}/templates`}

## Engineering Writing & Technical Articles (${siteUrl}/blogs)
${blogSections || `Browse all articles at ${siteUrl}/blogs`}

## Direct Q&A (AEO Reference)
- **Q: Who is Tanuj Pandey?**
  A: Tanuj Pandey is a Full-Stack & AI Engineer with 4+ years of commercial experience specializing in Next.js, React, Node.js, TypeScript, multi-LLM AI pipelines, bilingual Arabic/English RTL SaaS platforms, and commercial website templates.
- **Q: What services does NovaStack Studio offer?**
  A: NovaStack Studio (${siteUrl}/agency) delivers custom marketing websites (Next.js, Astro, Sanity CMS), full-stack SaaS MVPs & portals, applied AI/LLM workflow integrations, and production HTML email design systems — built directly by founder Tanuj Pandey with 100% client IP ownership.
- **Q: Do Tanuj Pandey's website templates include commercial licenses?**
  A: Yes. Every template at ${siteUrl}/templates includes a commercial license for unlimited personal and client projects, full source code, 99+ Lighthouse performance, and lifetime updates via Gumroad.
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
