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

const buildPrompt = (docType: string, title: string, notes: string, existingTags: string[]) => {
  const contextBlock = [
    `Document Type: ${docType}`,
    `Title: ${title || "Untitled"}`,
    existingTags.length ? `Existing Tags: ${existingTags.join(", ")}` : "",
    notes ? `Author Notes / Brief:\n${notes}` : "Author Notes: None provided — infer clean, realistic, non-exaggerated technical structure based on the title.",
  ]
    .filter(Boolean)
    .join("\n");

  if (docType === "projects") {
    return `You are a senior staff full-stack engineer writing a sharp, credible engineering case study for Tanuj Pandey's portfolio and NovaStack Studio.
Rules:
- Be concise, architectural, and concrete. Zero hype, zero generic buzzwords, zero emojis.
- Never fabricate fake revenue numbers or fake client testimonials if not mentioned in the notes.
- Return ONLY valid JSON matching this exact schema:
{
  "category": "Short 2-4 word domain label (e.g. B2B SaaS · Multi-LLM AI)",
  "role": "Engineering role (e.g. Lead Full-Stack & AI Engineer)",
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

const callGeminiJson = async (apiKey: string, prompt: string) => {
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError = "Unknown Gemini API error";

  for (const model of models) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!res.ok) {
      lastError = `${model}: ${res.status} ${res.statusText}`;
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

    if (docType === "projects") {
      if (aiResult?.category) patch.category = String(aiResult.category);
      if (aiResult?.role) patch.role = String(aiResult.role);
      if (Array.isArray(aiResult?.tags) && aiResult.tags.length) patch.tags = aiResult.tags.slice(0, 7);
      if (Array.isArray(aiResult?.headlineMetrics) && aiResult.headlineMetrics.length) {
        patch.headlineMetrics = aiResult.headlineMetrics.slice(0, 4);
      }
      if (excerptBlocks.length) patch.excerpt = excerptBlocks;
      if (contentBlocks.length) patch.projectcontent = contentBlocks;
    } else if (docType === "blogs") {
      if (Array.isArray(aiResult?.tags) && aiResult.tags.length) patch.tags = aiResult.tags.slice(0, 6);
      if (excerptBlocks.length) patch.excerpt = excerptBlocks;
      if (contentBlocks.length) patch.blogcontent = contentBlocks;
    } else if (docType === "templates") {
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
