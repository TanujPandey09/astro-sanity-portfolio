import { useSanityClient } from "astro-sanity";

// GET request returns FAQ/intent list for static client load
export const GET = async () => {
  try {
    const query = `*[_type == "chatbot"]{
      userQuestions,
      intentName,
      intent,
      botResponse,
      linkedBlog->{slug}
    }`;
    
    const client = useSanityClient();
    const data = await client.fetch(query);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const systemPrompt = `You are Tanuj's Portfolio AI Assistant, representing Tanuj Pandey, a professional Full Stack Engineer with 4 years of software development experience (3+ years frontend and deep full-stack SaaS experience).
Your tone should be helpful, technical, confident, and conversational.
Here are the official facts about Tanuj:
- Core stack: React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, PostgreSQL, Prisma, MongoDB, Socket.IO, Tailwind CSS, React Native, Expo.
- AI Experience: Multi-provider orchestration (OpenAI GPT, Gemini, Grok, Perplexity), RAG pipelines, Prompt Engineering, response validation workflows.
- Professional Experience:
  1. Cxisuite (Full Stack Developer, Remote — Sep 2025 - Present):
     - Developed and shipped Sawt AI: AI-powered survey SaaS for the Saudi market with bilingual Arabic/English support and RTL-first UX.
     - Multi-LLM orchestration (GPT, Gemini, Grok, Perplexity) with brand-safe response validation.
     - Integrated MyFatoorah subscription billing, tier-based access control, webhooks, and analytics.
     - Full-stack CRM with Socket.IO real-time workflows, SLA tracking, and audit logging.
     - React Native features for Thaddi (Arabic football prediction platform).
  2. Nasya IT (Frontend Developer - Solo Ownership, Remote — Feb 2025 - Jul 2025):
     - Solely owned the frontend for a multi-role healthcare SaaS (Super Admin, Doctor, Patient, Clinic) covering UI design, dev, and testing.
     - 3 role-based login flows, 10+ CRUD modules, patient records, and responsive medical charts.
  3. Techmatys (React Developer, Onsite — May 2024 - Dec 2024):
     - Built and customized Moodle-based LMS frontends for educational institutions.
     - Reusable React components, academic management modules, lazy loading, and code splitting.
  4. Scube.co (Frontend Developer, Remote — Jan 2022 - Feb 2024):
     - Built frontend for Breeze SaaS using Next.js (SSR/SSG) + TypeScript with Sanity.io, Contentful, and Strapi.
     - Optimized Core Web Vitals (LCP, CLS, FID, TTFB), achieving 50% faster page loads and 20% higher user engagement.
- Education:
  - MCA (Master of Computer Application) — GBPEC, Pauri Garhwal (2018 - 2020)
  - BCA (Bachelor of Computer Application) — BFIT, Dehradun (2015 - 2018)
- Website Templates & Digital Products:
  - Tanuj designs and sells production-ready commercial website templates on Gumroad (available at https://tanujbuilds.site/templates).
  - Featured templates include:
    1. Apex Luxury: Ultra-Luxury Real Estate & Architectural Web Template (React 18, TypeScript, Tailwind, Leaflet, shadcn/ui).
    2. Lumina Dental: Premium Healthcare & Dental Clinic Web Template (Next.js, Framer Motion, GSAP, TypeScript).
- Contact & Location:
  - Location: Pauri Garhwal, Uttarakhand, India
  - Email: tanujp09@gmail.com
  - Phone: +91 9557321978
  - Portfolio: https://tanujbuilds.site
  - GitHub: https://github.com/TanujPandey09
  - LinkedIn: https://linkedin.com/in/tanujdev

Keep your answers concise, accurate, and directly aligned with Tanuj's background. If asked about his work, highlight his ability to take full ownership from zero to production. If asked about buying templates or ready-made themes, point them to /templates.`;

const LOCAL_FALLBACK_INTENTS = [
  {
    keywords: ["skill", "stack", "tech", "language", "react", "next", "node", "ai", "llm"],
    response:
      "Tanuj's core production stack is TypeScript, React.js, Next.js, Node.js, Express, PostgreSQL/Prisma, MongoDB, Socket.IO, Tailwind CSS, and React Native — plus multi-LLM AI orchestration (OpenAI, Gemini, Claude, Perplexity) and RAG pipelines.",
  },
  {
    keywords: ["experience", "work", "history", "company", "career", "years", "resume", "cv"],
    response:
      "Tanuj has 4+ years of full-stack engineering experience: Full Stack Developer at Cxisuite (Sawt AI, real-time CRM, React Native), Frontend Lead at Nasya IT (multi-role healthcare SaaS), React Developer at Techmatys (Moodle LMS), and Frontend Developer at Scube.co (Breeze SaaS, 50% faster Core Web Vitals).",
  },
  {
    keywords: ["project", "built", "portfolio", "case study", "sawt", "breeze"],
    response:
      "Key shipped builds include Sawt AI (bilingual Arabic/English multi-LLM survey SaaS with MyFatoorah billing), a multi-role Healthcare SaaS platform, real-time Socket.IO CRM workflows, and Breeze SaaS. You can explore all full case studies at /projects.",
  },
  {
    keywords: ["template", "gumroad", "buy", "theme", "apex", "lumina"],
    response:
      "Tanuj builds commercial Next.js & React templates including Apex Luxury (Real Estate) and Lumina Dental (Healthcare), with 99+ Lighthouse performance and full commercial licenses. Browse them at /templates.",
  },
  {
    keywords: ["contact", "email", "hire", "touch", "phone", "whatsapp", "linkedin", "agency"],
    response:
      "You can reach Tanuj directly at tanujp09@gmail.com, WhatsApp +91 9557321978, or via the Contact section below. He is available for full-stack/AI engineering roles and agency builds through NovaStack Studio (/agency).",
  },
  {
    keywords: ["hi", "hello", "hey", "greetings"],
    response:
      "Hi! I'm Tanuj's portfolio assistant. Ask me about his tech stack, 4+ years of work experience, shipped SaaS & AI projects, commercial templates, or how to get in touch.",
  },
];

const resolveFallbackReply = async (message: string): Promise<string> => {
  const cleanMessage = message.trim().toLowerCase();

  try {
    const query = `*[_type == "chatbot"]{ userQuestions, intent, botResponse }`;
    const data = await useSanityClient().fetch(query);
    if (Array.isArray(data)) {
      const matched = data.find(
        (item: any) =>
          item.userQuestions?.some((q: string) => cleanMessage.includes(q.toLowerCase())) ||
          (item.intent && cleanMessage.includes(item.intent.toLowerCase()))
      );
      if (matched?.botResponse) return matched.botResponse;
    }
  } catch {}

  const localMatch = LOCAL_FALLBACK_INTENTS.find((entry) =>
    entry.keywords.some((kw) => cleanMessage.includes(kw))
  );
  if (localMatch) return localMatch.response;

  return "Tanuj Pandey is a Full-Stack & AI Engineer (4+ years experience) specializing in React, Next.js, Node.js, TypeScript, PostgreSQL, and multi-LLM AI systems. Ask about his skills, experience, projects (/projects), templates (/templates), or reach out at tanujp09@gmail.com.";
};

// POST request handles dynamic AI dialog completions
export const POST = async ({ request }: { request: Request }) => {
  try {
    const body = await request.json();
    const message = String(body?.message || "").trim();
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return new Response(JSON.stringify({ response: "Please enter a question about Tanuj's work, stack, or projects." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const reply = await resolveFallbackReply(message);
      return new Response(JSON.stringify({ response: reply, isFallback: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build strictly alternating Gemini contents from clean chat history
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
    for (const msg of history.slice(-8)) {
      const text = typeof msg?.content === "string" ? msg.content.trim() : "";
      if (!text || text.includes("having trouble processing")) continue;
      const role: "user" | "model" = msg.role === "user" ? "user" : "model";
      if (contents.length === 0 && role === "model") continue;
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += `\n${text}`;
      } else {
        contents.push({ role, parts: [{ text }] });
      }
    }

    if (contents.length > 0 && contents[contents.length - 1].role === "user") {
      contents[contents.length - 1].parts[0].text += `\n${message}`;
    } else {
      contents.push({ role: "user", parts: [{ text: message }] });
    }

    const defaultModels = ["gemini-3.8-flash", "gemini-3.0-flash", "gemini-2.5-flash"];
    let discovered: string[] = [];
    try {
      const listRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`
      );
      if (listRes.ok) {
        const listData = await listRes.json();
        const supported = (listData?.models || [])
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
        discovered = [...flashModels.reverse(), ...otherGemini.reverse()].slice(0, 6);
      }
    } catch {}

    const models = Array.from(new Set([...defaultModels, ...discovered]));
    let botReply = "";
    let lastError = "";

    for (const model of models) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        const text = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim()) {
          botReply = text.trim();
          break;
        }
      } else {
        lastError = `${model} (${response.status})`;
      }
    }

    if (botReply) {
      return new Response(JSON.stringify({ response: botReply, isFallback: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.warn("Chatbot Gemini fallback triggered:", lastError);
    const fallbackReply = await resolveFallbackReply(message);
    return new Response(JSON.stringify({ response: fallbackReply, isFallback: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Chatbot POST Error:", error);
    const fallbackReply = await resolveFallbackReply("help");
    return new Response(JSON.stringify({ response: fallbackReply, isFallback: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
