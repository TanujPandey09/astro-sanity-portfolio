

export const chatbotQuery = `
  *[_type == "chatbot"]{
    intentName,
    userQuestions,
    intent,
    botResponse,
    linkedBlog->{
      title,
      slug
    }
  }
`;
