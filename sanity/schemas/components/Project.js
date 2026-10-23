export default {
  name: 'projects',
  type: 'document',
  title: 'Projects',
  fields: [
    {
      title: 'AdminstrativeTitle',
      name: 'adminstrativetitle',
      type: 'string',
    },

    {
      title: 'Project Name',
      name: 'projectName',
      type: 'string',
    },

    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'projectName'
      }
    },

    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'array',
      description: "Add your content here. You can add text, images or videos.",
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },


    {
      title: 'Project Content',
      name: 'projectcontent',
      type: 'array',
      description: "Add your content here. You can add text, images or videos.",
      of: [{ type: 'block' }, { type: 'image' }],
    },

    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    },

    {
      name: 'BackgroundImage',
      title: 'Background Image',
      type: 'image',
    },

    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
    },

    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
    },

    {
      name: 'gitHubLink',
      title: 'Git Hub Link',
      type: 'url',
    },

    {
      name: 'demoLink',
      title: 'Demo Link',
      type: 'url',
    },
    {
      name: 'gumroadLink',
      title: 'Gumroad Product Link',
      description: 'URL of the published Gumroad product page.',
      type: 'url',
    },
    {
      name: 'linkTextColor',
      title: 'Link Text Color',
      type: 'string',
    },
  ],
}
