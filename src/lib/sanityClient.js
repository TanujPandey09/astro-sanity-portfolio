import { createClient } from "@sanity/client";
import { chatbotQuery } from "./queries";

export const client = createClient({
  projectId: "fqd3bez7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export const fallbackSanityClient = client;

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
