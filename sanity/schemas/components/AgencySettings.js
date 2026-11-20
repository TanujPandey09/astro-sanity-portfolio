export default {
  name: 'agencySettings',
  type: 'document',
  title: 'NovaStack Agency',
  fields: [
    {
      title: 'Brand Name',
      name: 'brandName',
      type: 'string',
      initialValue: 'NovaStack',
    },
    {
      title: 'Tagline',
      name: 'tagline',
      type: 'string',
      initialValue: 'AI & Digital Studio',
    },
    {
      title: 'NovaStack Logo',
      name: 'logo',
      type: 'image',
      description: 'Upload the NovaStack logo (PNG, SVG, or WebP) displayed in the Agency navbar and footer.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'NovaStack Logo',
        },
      ],
    },
    {
      title: 'Full Wordmark Logo (Hide Duplicate Text)',
      name: 'logoFullWidth',
      type: 'boolean',
      description: 'Enable if your uploaded logo image already includes the "NovaStack" text.',
      initialValue: false,
    },
    {
      title: 'Hero Showcase Projects (Fanned Cards)',
      name: 'heroFanProjects',
      description:
        'Curate, add, and re-order the projects displayed in the fanned showcase arc on the Agency Hero. You can reference an existing Project or Template, or provide custom screenshots, links, and tags.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroFanCard',
          title: 'Hero Fan Card',
          fields: [
            {
              name: 'projectRef',
              title: 'Link to Existing Project or Template (Optional)',
              description: 'Select an existing Project/Template to pull its image, title, and URL automatically.',
              type: 'reference',
              to: [{type: 'projects'}, {type: 'templates'}],
            },
            {
              name: 'customTitle',
              title: 'Custom Title Override',
              type: 'string',
              description: 'e.g. Sawt AI. Leave empty to use the referenced project title.',
            },
            {
              name: 'customTag',
              title: 'Card Badge / Category Tag',
              type: 'string',
              description: 'e.g. AI Survey Platform, Support & CRM, Flagship Web, SaaS + AI',
            },
            {
              name: 'customUrl',
              title: 'Project URL (Live Demo or Case Study)',
              type: 'string',
              description: 'External link (e.g. https://sawtapp.com/) or local route (e.g. /projects/cxisuite).',
            },
            {
              name: 'customImage',
              title: 'Showcase Image / Screenshot',
              type: 'image',
              description: 'Custom screenshot or mockup image. If omitted, uses the BackgroundImage from the referenced project.',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'badgeTheme',
              title: 'Badge Color Theme',
              type: 'string',
              description: 'Pastel badge color style matching the Cobalt design palette.',
              options: {
                list: [
                  {title: 'Sage Green (#DCE8DF)', value: 'sage'},
                  {title: 'Cobalt Blue (#E3E6FF)', value: 'cobalt'},
                  {title: 'Ice Blue (#D8F1FF)', value: 'ice'},
                  {title: 'Butter Amber (#FFF4C2)', value: 'amber'},
                  {title: 'Warm Peach (#FFD6CF)', value: 'peach'},
                  {title: 'Lavender (#EFE8FF)', value: 'lavender'},
                ],
              },
              initialValue: 'cobalt',
            },
          ],
          preview: {
            select: {
              customTitle: 'customTitle',
              projTitle: 'projectRef.projectName',
              templateTitle: 'projectRef.templateName',
              tag: 'customTag',
              customMedia: 'customImage',
              projMedia: 'projectRef.BackgroundImage',
            },
            prepare({customTitle, projTitle, templateTitle, tag, customMedia, projMedia}) {
              const title = customTitle || projTitle || templateTitle || 'Untitled Showcase Card'
              return {
                title,
                subtitle: tag || 'Hero Fan Card',
                media: customMedia || projMedia,
              }
            },
          },
        },
      ],
    },
    {
      title: 'Featured Agency Case Studies (Optional Order)',
      name: 'featuredCaseStudies',
      description:
        'Pick and order exact Projects to highlight in the Agency Case Studies breakdown. Leave empty to automatically pull your latest Projects from Sanity.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'projects'}],
        },
      ],
    },
    {
      title: 'Agency Services & Custom Mockups',
      name: 'agencyServices',
      description:
        'Manage the services and upload custom mockup images/screenshots shown in the Agency Capabilities section. If no mockup image is uploaded for a built-in service key, the interactive coded UI mockup is shown automatically.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'agencyServiceItem',
          title: 'Agency Service',
          fields: [
            {
              name: 'serviceKey',
              title: 'Service Type / Built-in Mockup Key',
              type: 'string',
              description:
                'Choose a built-in key to inherit its icon & default interactive mockup, or select Custom for a brand-new service.',
              options: {
                list: [
                  {title: 'Web Design & Development (web-dev)', value: 'web-dev'},
                  {title: 'SaaS & Full-Stack Development (saas-dev)', value: 'saas-dev'},
                  {title: 'AI Integrations & Automation (ai-automation)', value: 'ai-automation'},
                  {title: 'Email Design Systems & HTML (html-email)', value: 'html-email'},
                  {title: 'Custom Service', value: 'custom'},
                ],
              },
              initialValue: 'web-dev',
            },
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Category / Subtitle',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Short Description (1–2 lines)',
              type: 'text',
              rows: 3,
            },
            {
              name: 'mockupImage',
              title: 'Custom Mockup Image / Screenshot (Optional)',
              description:
                'Upload a custom design mockup or real screenshot. Overrides the built-in coded preview when set.',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'mockupCaption',
              title: 'Mockup Header Label / URL (Optional)',
              type: 'string',
              description: 'Shown in the frame top bar (e.g. https://client-platform.dev or Figma Showcase).',
            },
            {
              name: 'mockupBadge',
              title: 'Mockup Tech / Status Badge (Optional)',
              type: 'string',
              description: 'Short pill shown in the frame header (e.g. Next.js 15, Multi-LLM, Litmus 100%).',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'category',
              media: 'mockupImage',
            },
          },
        },
      ],
    },
  ],
}

