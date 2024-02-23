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
      options:{
        source:'projectName'
      }
    },
    
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'array',
    description: "Add your content here. You can add text, images or videos.",
      of: [{type: 'block'}],
    },


    {
      title: 'Project Content',
      name: 'projectcontent',
      type: 'array',
    description: "Add your  here. You can add text, images or videos.",
      of: [{type: 'block'}],
    },

    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
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
      type: 'slug',
    },

    {
      name: 'demoLink',
      title: 'Demo Link',
      type: 'slug',
    },

    {
      name: 'linkTextColor',
      title: 'Link Text Color',
      type: 'string',
    },
  ],
}
