import { useSanityClient } from "astro-sanity";

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
