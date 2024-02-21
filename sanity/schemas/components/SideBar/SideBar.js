export default {
  name: 'sideBar',
  type: 'document',
  title: 'Side Bar',
  fields: [
    {
      title: 'AdminstrativeTitle',
      name: 'adminstrativetitle',
      type: 'string',
    },

    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'image',
    },

    {
        title: 'Side Menus',
        name: 'sideMenus',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{type:'sideMenu'}],
          },
        ],
      },
  ],
}
