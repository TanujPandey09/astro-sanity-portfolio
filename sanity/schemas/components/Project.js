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
      title: 'Role',
      name: 'role',
      type: 'string',
      description: 'Your engineering role (e.g. Lead Full-Stack & AI Systems Architect).',
    },

    {
      title: 'Category',
      name: 'category',
      type: 'string',
      description: 'Domain tags shown above the case study title (e.g. B2B SaaS · Autonomous AI Agents).',
    },

    {
      title: 'Headline Metrics',
      name: 'headlineMetrics',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key quantitative outcomes displayed as Bento highlight cards above the breakdown.',
    },

    {
      name: 'BackgroundImage',
      title: 'Background Image / Video Poster',
      type: 'image',
    },

    {
      name: 'demoVideo',
      title: 'Demo Walkthrough Video (MP4 / WebM)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a product demo recording (MP4/WebM). Replaces static screenshots inside the interactive MacBook showcase.',
    },

    {
      name: 'demoVideoUrl',
      title: 'Demo Video URL (Loom / YouTube / Vimeo / MP4)',
      type: 'url',
      description: 'Optional hosted video link if you prefer Loom, YouTube, Vimeo, or external MP4.',
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
    {
      name: 'showInAgencyHero',
      title: 'Feature in Agency Hero Fanned Showcase',
      description: 'Check this to show this project in the Agency hero showcase cards when not using a custom list in Agency Settings.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'agencyHeroTag',
      title: 'Agency Hero Badge Tag',
      description: 'Short 2-3 word badge label (e.g. AI Survey Platform, SaaS + AI).',
      type: 'string',
    },
    {
      name: 'agencyHeroBadgeTheme',
      title: 'Agency Hero Badge Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Sage Green (AI & Survey)', value: 'sage'},
          {title: 'Cobalt Blue (SaaS & Core)', value: 'cobalt'},
          {title: 'Ice Blue (Design & Flagship)', value: 'ice'},
          {title: 'Butter Amber (CRM & Tools)', value: 'amber'},
          {title: 'Warm Peach (Healthcare & Consumer)', value: 'peach'},
          {title: 'Lavender (Automation)', value: 'lavender'},
        ],
      },
    },
  ],
}
