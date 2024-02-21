export default {
    name: 'sideMenu',
    type: 'document',
    title: 'Side Menu',
    fields: [
      {
        title: 'AdminstrativeTitle',
        name: 'adminstrativetitle',
        type: 'string',
      },
  
      {
        title: 'Menu Name',
        name: 'menuName',
        type: 'string',
      },

      {
        title: 'Menu Color',
        name: 'menuColor',
        type: 'string',
      },

  
      {
        title:'Menu Link',
        name:"menuLink",
        type:'slug'
      },

      {
        title:"Logo",
        name:'logo',
        type:'image'

      }
    
  
  
  
      
    ],
  }
  