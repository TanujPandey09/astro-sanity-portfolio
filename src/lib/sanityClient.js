import { createClient } from "@sanity/client";
import { chatbotQuery } from "./queries";

// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: "fqd3bez7",
  dataset: "production",
  useCdn: true, // Defaults to `false`. If true, uses Sanity's CDN for image
});


export const getChatbotData = async () => {
  const query = `*[_type == "chatbot"]{
    userQuestions,
    intentName,
    intent,
    botResponse,
    linkedBlog->{slug}
  }`;
  return await client.fetch(query);
};