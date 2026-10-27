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

// POST request handles dynamic AI dialog completions
export const POST = async ({ request }: { request: Request }) => {
  try {
    const { message, history = [] } = await request.json();

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    // Fallback: local intent-matching using Sanity chatbot dataset
    if (!apiKey) {
      const query = `*[_type == "chatbot"]{
        userQuestions,
        intent,
        botResponse
      }`;
      const client = useSanityClient();
      const data = await client.fetch(query);
      
      const cleanMessage = message.trim().toLowerCase();
      
      // Find matching questions or keywords
      const matched = data.find((item: any) =>
        item.userQuestions?.some((q: string) => cleanMessage.includes(q.toLowerCase())) ||
        item.intent?.toLowerCase() === cleanMessage ||
        cleanMessage.includes(item.intent?.toLowerCase())
      );

      const reply = matched ? matched.botResponse : "I couldn't quite find that details in my registry. Could you please ask about Tanuj's skills, experience, or projects? 🛠️";
      
      return new Response(JSON.stringify({ response: reply, isFallback: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Call Gemini API using standard fetch
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am ready to assist as Tanuj's Portfolio Assistant." }]
      }
    ];

    // Map history to model role format
    history.forEach((msg: any) => {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      });
    });

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const resData = await response.json();
    const botReply = resData.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble analyzing this request. Could you rephrase your question?";

    return new Response(JSON.stringify({ response: botReply, isFallback: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Chatbot POST Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
