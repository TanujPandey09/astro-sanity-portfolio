export default {
    name: 'blogs',
    type: 'document',
    title: 'Blogs',
    fields: [
      {
        title: 'AdminstrativeTitle',
        name: 'adminstrativetitle',
        type: 'string',
      },
  
      {
        title: 'Blog Name',
        name: 'projectName',
        type: 'string',
      },
  
      {
        name: 'slug',
        title: 'Slug',
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
        title: 'Blog Content',
        name: 'blogcontent',
        type: 'array',
      description: "Add your content here. You can add text, images or videos.",
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
        description:'Upload Background Image',
        type: 'image',
      },

      {
        name: 'FeatureImage',
        title: 'Feature Image',
        description:'Upload Feature Image',
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
        name: 'linkTextColor',
        title: 'Link Text Color',
        type: 'string',
      },
    ],
  }
  