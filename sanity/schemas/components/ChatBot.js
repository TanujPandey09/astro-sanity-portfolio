export default {
  name: 'chatbot',
  type: 'document',
  title: 'ChatBot',
  fields: [
    {
      title: 'Intent Name',
      name: 'intent',
      type: 'string',
      description: 'Like: pricing, services, skills, latestBlog, contact etc.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'User Questions',
      name: 'userQuestions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'All possible questions user might ask for this intent',
      validation: Rule => Rule.required(),
    },
     {
      name: 'suggestions', // NEW FIELD
      title: 'Suggested Follow-up Questions',
      type: 'array',
      of: [{ type: 'string' }]
    },
     {
      name: 'category', // NEW FIELD
      title: 'Category',
      type: 'string',
      options: {
        list: ['greeting', 'support', 'pricing', 'contact', 'general']
      }
    },
     {
      name: 'priority', // NEW FIELD
      title: 'Priority',
      type: 'number',
      validation: Rule => Rule.min(1).max(10)
    },
    {
      title: 'Bot Response',
      name: 'botResponse',
      type: 'text',
      description: 'Static response to send OR prefix for dynamic content (like blogs)',
    },
    {
      title: 'Linked Blog (Optional)',
      name: 'linkedBlog',
      type: 'reference',
      to: [{ type: 'blogs' }],
      description: 'Link a blog to fetch its data dynamically (optional)',
    },
    {
      title: 'Linked Project (Optional)',
      name: 'linkedProject',
      type: 'reference',
      to: [{ type: 'projects' }],
      description: 'Link a project to show info (optional)',
    },
  ],
}
