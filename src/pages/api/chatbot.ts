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

const systemPrompt = `You are Tanuj's Portfolio AI Assistant, representing Tanuj Pandey, a professional Full Stack Engineer with 4+ years of experience.
Your tone should be helpful, professional, and technical yet conversational.
Here are the key details about Tanuj:
- Core stack: React, Next.js, Node.js, Express, TypeScript, Tailwind CSS, PostgreSQL, MongoDB, Socket.IO.
- Experience: 4+ years building production-grade SaaS platforms, real-time messaging, HIPAA-compliant healthcare systems, and performant web products.
- Academic background: MCA (Master of Computer Application) from GBPEC Pauri Garhwal (2018-2020), BCA from BFIT Dehradun (2015-2018).
- Notable projects:
  1. Sawt AI: Conversational survey platform, bilingual RTL-LTR support, Socket.IO real-time streams, OpenAI/Anthropic/Grok failover, 340% completion rate surge.
  2. CareAI CRM: Patient communication automation, Twilio routing, drag-and-drop clinic scheduler, HIPAA-compliant databases.
  3. Nasya Medical Portal: Solo frontend architect, clinic/doctor/patient/admin roles, custom medical charts.
  4. Breeze E-Commerce: Next.js migration, SSG/SSR, GraphQL CMS.
- Key contacts: Email is tanujp09@gmail.com, located in Delhi, India. GitHub: github.com/TanujPandey09, LinkedIn: linkedin.com/in/tanujdev.

Keep your answers concise, engaging, and directly related to Tanuj's background. If a user asks something unrelated to Tanuj's profile, politely guide them back to Tanuj's skills, experience, or projects.`;

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
