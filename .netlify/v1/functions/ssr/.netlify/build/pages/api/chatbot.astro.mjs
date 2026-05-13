import { I as Is } from '../../chunks/index-d34160a3_F_PySAei.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const query = `*[_type == "chatbot"]{
      userQuestions,
      intentName,
      intent,
      botResponse,
      linkedBlog->{slug}
    }`;
    const client = Is();
    const data = await client.fetch(query);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
