export default {
  name: 'skillsSection',
  type: 'document',
  title: 'Skills Section',
  fields: [
    {
      title: 'AdminstrativeTitle',
      name: 'adminstrativetitle',
      type: 'string',
    },

    {
      title: 'heading',
      name: 'Heading',
      type: 'string',
    },

    {
      title: 'TextColor',
      name: 'TextColor',
      type: 'string',
    },

    {
      title: 'Logo Case',
      name: 'logoCase',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'logoSection'}],
        },
      ],
    },
  ],
}
