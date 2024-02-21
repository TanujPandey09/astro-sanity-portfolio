export default {
    name: 'herobanner',
    type: 'document',
    title: 'Hero Banner',
    fields: [
      {
        title: 'AdminstrativeTitle',
        name: 'adminstrativetitle',
        type: 'string',
      },
      {
        title: 'Preheading',
        name: 'preHeading',
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
        title: 'Content',
        name: 'content',
        type: 'array',
        icon: 'CheckmarkIcon',
        of: [{type: 'block'}],
      },
  
      {
        name: 'BackgroundImage',
        title: 'Background Image',
        type: 'image',
      },
  
     // {
      //   name:'Button',
      //   title:'Button',
      //   type:"button"
      // }
    ],
  }
  