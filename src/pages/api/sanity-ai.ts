import type { APIRoute } from "astro";

export const prerender = false;

interface PortableBlockInput {
  style?: "normal" | "h2" | "h3" | "blockquote";
  listItem?: "bullet" | "number";
  text: string;
}

const isAllowedOrigin = (origin: string | null): string => {
  if (!origin) return "*";
  if (
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:") ||
    origin === "https://tanujbuilds.site" ||
    origin === "https://www.tanujbuilds.site" ||
    /^https:\/\/[a-z0-9-]+\.sanity\.studio$/i.test(origin)
  ) {
    return origin;
  }
  return "https://tanujbuilds.site";
};

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": isAllowedOrigin(origin),
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-sanity-ai-secret",
  "Content-Type": "application/json",
});

const randomKey = () => Math.random().toString(36).slice(2, 12);

const toPortableTextBlocks = (items: PortableBlockInput[] = []) => {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && typeof item.text === "string" && item.text.trim().length > 0)
    .map((item) => {
      const style =
        item.style === "h2" || item.style === "h3" || item.style === "blockquote"
          ? item.style
          : "normal";
      const block: Record<string, any> = {
        _type: "block",
        _key: randomKey(),
        style,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: randomKey(),
            text: item.text.trim(),
            marks: [],
          },
        ],
      };
      if (item.listItem === "bullet" || item.listItem === "number") {
        block.listItem = item.listItem;
        block.level = 1;
      }
      return block;
    });
};

const toSlug = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

const buildPrompt = (docType: string, title: string, notes: string, existingTags: string[]) => {
  const contextBlock = [
    `Document Type: ${docType}`,
    `Title: ${title || "Not set yet — infer a strong, accurate title from the notes"}`,
    existingTags.length ? `Existing Tags: ${existingTags.join(", ")}` : "",
    notes ? `Author Notes / Brief:\n${notes}` : "Author Notes: None provided — infer clean, realistic, non-exaggerated technical structure based on the title.",
  ]
    .filter(Boolean)
    .join("\n");

  if (docType === "projects") {
    return `You are a senior staff full-stack engineer writing a sharp, credible engineering case study for Tanuj Pandey's portfolio and NovaStack Studio.
Rules:
- Be concise, architectural, and concrete. Zero hype, zero generic buzzwords, zero emojis.
- Never fabricate fake revenue numbers, fake URLs, or fake client testimonials if not mentioned in the notes.
- Return ONLY valid JSON matching this exact schema:
{
  "projectName": "Clean project name (e.g. Tablely — Multi-Tenant QR Menu SaaS)",
  "adminstrativetitle": "Short admin title for CMS list (e.g. Tablely — QR Menu & Ordering SaaS)",
  "slug": "url-friendly-kebab-case-slug",
  "category": "Short 2-4 word domain label (e.g. B2B SaaS · Multi-Tenant Hospitality)",
  "role": "Engineering role (e.g. Lead Full-Stack Architect)",
  "agencyHeroTag": "Short 2-3 word badge label (e.g. Hospitality SaaS)",
  "agencyHeroBadgeTheme": "one of: sage, cobalt, ice, amber, peach, lavender",
  "demoLink": "Live URL ONLY if explicitly present in notes, otherwise empty string",
  "gitHubLink": "GitHub URL ONLY if explicitly present in notes, otherwise empty string",
  "tags": ["5 to 7 concise tech stack strings"],
  "headlineMetrics": ["4 concise engineering/product outcome statements (max 8 words each)"],
  "excerptText": "A crisp 1-2 sentence executive summary (max 38 words)",
  "contentBlocks": [
    { "style": "h2", "text": "Overview & Problem" },
    { "style": "normal", "text": "..." },
    { "style": "h2", "text": "Architecture & Implementation" },
    { "style": "normal", "text": "..." },
    { "style": "normal", "listItem": "bullet", "text": "..." },
    { "style": "h2", "text": "Key Engineering Decisions" },
    { "style": "normal", "listItem": "bullet", "text": "..." },
    { "style": "h2", "text": "Outcome & Production Readiness" },
    { "style": "normal", "text": "..." }
  ]
}

${contextBlock}`;
  }

  if (docType === "blogs") {
    return `You are a senior full-stack and AI systems engineer writing a crisp, practical technical blog post for Tanuj Pandey's engineering blog.
Rules:
- Write with clarity, concrete architectural patterns, and zero fluff or emojis.
- Return ONLY valid JSON matching this exact schema:
{
  "projectName": "Compelling technical blog title",
  "adminstrativetitle": "Short admin title for CMS list",
  "slug": "url-friendly-kebab-case-slug",
  "Category": "one of: technology, headlesscms, frameworks, integrations",
  "tags": ["4 to 6 concise technical tags"],
  "excerptText": "A crisp 1-2 sentence article summary for SEO and cards (max 35 words)",
  "contentBlocks": [
    { "style": "h2", "text": "Introduction" },
    { "style": "normal", "text": "..." },
    { "style": "h2", "text": "Core Architecture Pattern" },
    { "style": "normal", "text": "..." },
    { "style": "normal", "listItem": "bullet", "text": "..." },
    { "style": "h2", "text": "Production Pitfalls & Tradeoffs" },
    { "style": "normal", "listItem": "bullet", "text": "..." },
    { "style": "h2", "text": "Key Takeaways" },
    { "style": "normal", "text": "..." }
  ]
}

${contextBlock}`;
  }

  return `You are a senior product engineer writing crisp technical product copy for a commercial Next.js / React website template sold by Tanuj Pandey.
Rules:
- Clear, conversion-ready, technical, zero hype or emojis.
- Return ONLY valid JSON matching this exact schema:
{
  "templateName": "Clean commercial template name",
  "adminstrativetitle": "Short admin title for CMS list",
  "slug": "url-friendly-kebab-case-slug",
  "category": "one of: real-estate, healthcare, saas, ai-automation, portfolio, ecommerce, dashboard, fintech, other",
  "badge": "Short status badge (e.g. Featured or New)",
  "tagline": "1-line crisp value proposition (max 18 words)",
  "tags": ["4 to 6 stack tags"],
  "highlights": ["6 concise feature & performance highlights"],
  "included": ["5 concrete deliverables included in the download"],
  "excerptText": "A crisp 1-2 sentence SEO summary (max 35 words)",
  "contentBlocks": [
    { "style": "h2", "text": "Architecture Overview" },
    { "style": "normal", "text": "..." },
    { "style": "h2", "text": "Included Sections & Components" },
    { "style": "normal", "listItem": "bullet", "text": "..." },
    { "style": "h2", "text": "Customization & Deployment" },
    { "style": "normal", "text": "..." }
  ]
}

${contextBlock}`;
};

const discoverActiveGeminiModels = async (apiKey: string): Promise<string[]> => {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data?.models) ? data.models : [];
    const supported = list
      .filter(
        (m: any) =>
          typeof m?.name === "string" &&
          Array.isArray(m?.supportedGenerationMethods) &&
          m.supportedGenerationMethods.includes("generateContent")
      )
      .map((m: any) => String(m.name).replace(/^models\//, ""));

    const flashModels = supported.filter((name: string) => /gemini.*flash/i.test(name));
    const otherGemini = supported.filter(
      (name: string) => /^gemini/i.test(name) && !flashModels.includes(name)
    );
    return [...flashModels.reverse(), ...otherGemini.reverse()].slice(0, 6);
  } catch {
    return [];
  }
};

const callGeminiJson = async (apiKey: string, prompt: string) => {
  const defaultModels = ["gemini-3.8-flash", "gemini-3.0-flash", "gemini-2.5-flash"];
  const discovered = await discoverActiveGeminiModels(apiKey);
  const models = Array.from(new Set([...defaultModels, ...discovered]));
  let lastError = "Unknown Gemini API error";

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!res.ok) {
      let detail = res.statusText;
      try {
        const errJson = await res.json();
        detail = errJson?.error?.message || detail;
      } catch {}
      lastError = `${model} (${res.status}): ${detail}`;
      continue;
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      lastError = `${model}: Empty response`;
      continue;
    }

    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return JSON.parse(cleaned);
  }

  throw new Error(lastError);
};

export const OPTIONS: APIRoute = async ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
};

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const expectedSecret = import.meta.env.SANITY_AI_SECRET || process.env.SANITY_AI_SECRET;
    if (expectedSecret) {
      const provided = request.headers.get("x-sanity-ai-secret");
      if (provided !== expectedSecret) {
        return new Response(JSON.stringify({ error: "Unauthorized request" }), {
          status: 401,
          headers,
        });
      }
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "GEMINI_API_KEY is not configured in the Astro server environment.",
        }),
        { status: 500, headers }
      );
    }

    const body = await request.json();
    const docType = String(body?.docType || "projects");
    const title = String(body?.title || "").trim();
    const notes = String(body?.notes || "").trim();
    const existingTags = Array.isArray(body?.tags)
      ? body.tags.filter((t: unknown) => typeof t === "string" && t.trim())
      : [];

    if (!title && !notes) {
      return new Response(
        JSON.stringify({ error: "Please provide at least a document title or brief notes." }),
        { status: 400, headers }
      );
    }

    const prompt = buildPrompt(docType, title, notes, existingTags);
    const aiResult = await callGeminiJson(apiKey, prompt);

    const excerptBlocks = aiResult?.excerptText
      ? toPortableTextBlocks([{ style: "normal", text: String(aiResult.excerptText) }])
      : [];
    const contentBlocks = toPortableTextBlocks(aiResult?.contentBlocks || []);

    const patch: Record<string, any> = {};
    const validThemes = new Set(["sage", "cobalt", "ice", "amber", "peach", "lavender"]);
    const validBlogCategories = new Set(["technology", "headlesscms", "frameworks", "integrations"]);
    const validTemplateCategories = new Set([
      "real-estate",
      "healthcare",
      "saas",
      "ai-automation",
      "portfolio",
      "ecommerce",
      "dashboard",
      "fintech",
      "other",
    ]);

    if (docType === "projects") {
      const resolvedName = String(aiResult?.projectName || title || "").trim();
      if (resolvedName) patch.projectName = resolvedName;
      if (aiResult?.adminstrativetitle || resolvedName) {
        patch.adminstrativetitle = String(aiResult?.adminstrativetitle || resolvedName).trim();
      }
      const resolvedSlug = toSlug(String(aiResult?.slug || resolvedName || ""));
      if (resolvedSlug) patch.slug = { _type: "slug", current: resolvedSlug };
      if (aiResult?.category) patch.category = String(aiResult.category);
      if (aiResult?.role) patch.role = String(aiResult.role);
      if (aiResult?.agencyHeroTag) patch.agencyHeroTag = String(aiResult.agencyHeroTag);
      if (validThemes.has(String(aiResult?.agencyHeroBadgeTheme || ""))) {
        patch.agencyHeroBadgeTheme = String(aiResult.agencyHeroBadgeTheme);
      }
      if (typeof aiResult?.demoLink === "string" && /^https?:\/\//i.test(aiResult.demoLink.trim())) {
        patch.demoLink = aiResult.demoLink.trim();
      }
      if (typeof aiResult?.gitHubLink === "string" && /^https?:\/\//i.test(aiResult.gitHubLink.trim())) {
        patch.gitHubLink = aiResult.gitHubLink.trim();
      }
      if (Array.isArray(aiResult?.tags) && aiResult.tags.length) patch.tags = aiResult.tags.slice(0, 7);
      if (Array.isArray(aiResult?.headlineMetrics) && aiResult.headlineMetrics.length) {
        patch.headlineMetrics = aiResult.headlineMetrics.slice(0, 4);
      }
      if (excerptBlocks.length) patch.excerpt = excerptBlocks;
      if (contentBlocks.length) patch.projectcontent = contentBlocks;
    } else if (docType === "blogs") {
      const resolvedName = String(aiResult?.projectName || title || "").trim();
      if (resolvedName) patch.projectName = resolvedName;
      if (aiResult?.adminstrativetitle || resolvedName) {
        patch.adminstrativetitle = String(aiResult?.adminstrativetitle || resolvedName).trim();
      }
      const resolvedSlug = toSlug(String(aiResult?.slug || resolvedName || ""));
      if (resolvedSlug) patch.slug = { _type: "slug", current: resolvedSlug };
      if (validBlogCategories.has(String(aiResult?.Category || ""))) {
        patch.Category = String(aiResult.Category);
      }
      if (Array.isArray(aiResult?.tags) && aiResult.tags.length) patch.tags = aiResult.tags.slice(0, 6);
      if (excerptBlocks.length) patch.excerpt = excerptBlocks;
      if (contentBlocks.length) patch.blogcontent = contentBlocks;
    } else if (docType === "templates") {
      const resolvedName = String(aiResult?.templateName || title || "").trim();
      if (resolvedName) patch.templateName = resolvedName;
      if (aiResult?.adminstrativetitle || resolvedName) {
        patch.adminstrativetitle = String(aiResult?.adminstrativetitle || resolvedName).trim();
      }
      const resolvedSlug = toSlug(String(aiResult?.slug || resolvedName || ""));
      if (resolvedSlug) patch.slug = { _type: "slug", current: resolvedSlug };
      if (validTemplateCategories.has(String(aiResult?.category || ""))) {
        patch.category = String(aiResult.category);
      }
      if (aiResult?.badge) patch.badge = String(aiResult.badge);
      if (aiResult?.tagline) patch.tagline = String(aiResult.tagline);
      if (Array.isArray(aiResult?.tags) && aiResult.tags.length) patch.tags = aiResult.tags.slice(0, 6);
      if (Array.isArray(aiResult?.highlights) && aiResult.highlights.length) {
        patch.highlights = aiResult.highlights.slice(0, 6);
      }
      if (Array.isArray(aiResult?.included) && aiResult.included.length) {
        patch.included = aiResult.included.slice(0, 6);
      }
      if (excerptBlocks.length) patch.excerpt = excerptBlocks;
      if (contentBlocks.length) patch.templateContent = contentBlocks;
    }

    return new Response(JSON.stringify({ ok: true, patch }), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to generate content with Gemini AI." }),
      { status: 500, headers }
    );
  }
};
