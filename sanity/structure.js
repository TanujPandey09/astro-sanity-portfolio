export const deskStructure = (S) =>
  S.list()
    .title('Content Studio')
    .items([
      S.listItem()
        .title('NovaStack Agency')
        .child(S.documentTypeList('agencySettings').title('NovaStack Agency Settings')),

      S.divider(),

      S.listItem()
        .title('Projects & Case Studies')
        .child(S.documentTypeList('projects').title('Projects & Case Studies')),
      S.listItem()
        .title('Commercial Templates')
        .child(S.documentTypeList('templates').title('Commercial Templates')),
      S.listItem()
        .title('Engineering Blog')
        .child(S.documentTypeList('blogs').title('Engineering Blog')),

      S.divider(),

      S.listItem()
        .title('Portfolio Sections')
        .child(
          S.list()
            .title('Portfolio Sections')
            .items([
              S.documentTypeListItem('herobanner').title('Hero Banner'),
              S.documentTypeListItem('about').title('About Page'),
              S.documentTypeListItem('skillsSection').title('Skills Section'),
              S.documentTypeListItem('logoSection').title('Logo Section'),
            ])
        ),

      S.listItem()
        .title('Assistant & Navigation')
        .child(
          S.list()
            .title('Assistant & Navigation')
            .items([
              S.documentTypeListItem('chatbot').title('Chatbot Intents'),
              S.documentTypeListItem('sideBar').title('Sidebar'),
              S.documentTypeListItem('sideMenu').title('Side Menu'),
            ])
        ),
    ])
