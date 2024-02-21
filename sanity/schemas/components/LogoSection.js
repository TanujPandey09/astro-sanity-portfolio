export default {
  name: 'logoSection',
  type: 'document',
  title: 'Logo Section',
  fields: [
    {
      title: 'AdminstrativeTitle',
      name: 'adminstrativetitle',
      type: 'string',
    },

    {
      title: 'Logo',
      name: 'Logo',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
}
