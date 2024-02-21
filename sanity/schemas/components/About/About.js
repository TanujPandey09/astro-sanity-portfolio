export default {
    name: 'about',
    type: 'document',
    title: 'About',
    fields: [
      {
        title: 'AdminstrativeTitle',
        name: 'adminstrativetitle',
        type: 'string',
      },
  
      {
        title: 'aboutName',
        name: 'aboutName',
        type: 'string',
      },

      {
        title: 'Description ',
        name: 'description',
        type: 'array',
        of: [{type: 'block'}],
      },
  
      {
        title: 'Tags',
        name: 'tags',
        type: 'array',
        of: [{type: 'string'}],
      },
  
      {
        name: 'heroImage',
        title: 'Hero Image',
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
        name: 'Link',
        title: 'link',
        type: 'url',
      },
  
      {
        name: 'linkTextColor',
        title: 'Link Text Color',
        type: 'string',
      },
    ],
  }
  