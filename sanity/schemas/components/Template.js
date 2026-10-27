export default {
  name: 'templates',
  type: 'document',
  title: 'Templates',
  fields: [
    {
      title: 'Administrative Title',
      name: 'adminstrativetitle',
      type: 'string',
    },
    {
      title: 'Template Name',
      name: 'templateName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'templateName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tagline / Short Pitch',
      name: 'tagline',
      type: 'string',
      description: 'A 1-line catchy hook for the template card and hero.',
    },
    {
      title: 'Price (USD)',
      name: 'price',
      type: 'string',
      description: 'Display price (e.g., "$49" or "49").',
    },
    {
      title: 'Original / Struck-Through Price (USD)',
      name: 'originalPrice',
      type: 'string',
      description: 'Optional original price to show discount (e.g., "$89").',
    },
    {
      name: 'gumroadLink',
      title: 'Gumroad Product Link',
      description: 'URL of the published Gumroad product page for instant checkout.',
      type: 'url',
    },
    {
      name: 'demoLink',
      title: 'Live Demo Link',
      description: 'URL to the live interactive preview website.',
      type: 'url',
    },
    {
      name: 'gitHubLink',
      title: 'GitHub Preview Link',
      description: 'Optional public repo link for preview code or documentation.',
      type: 'url',
    },
    {
      title: 'Status Badge',
      name: 'badge',
      type: 'string',
      description: 'Badge shown on the card (e.g., "Featured", "Best Seller", "New", "Staff Pick").',
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Real Estate & Architecture', value: 'real-estate' },
          { title: 'Healthcare & Medical', value: 'healthcare' },
          { title: 'SaaS & Tech', value: 'saas' },
          { title: 'Agency & Portfolio', value: 'portfolio' },
          { title: 'E-Commerce', value: 'ecommerce' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      title: 'Tech Stack / Tags',
      name: 'tags',
      type: 'array',
      description: 'Key technologies used (e.g., Next.js 14, TypeScript, Tailwind CSS, Framer Motion).',
      of: [{ type: 'string' }],
    },
    {
      name: 'thumbnailImage',
      title: 'Thumbnail / Cover Image',
      description: 'Primary high-res cover screenshot for cards and hero.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'BackgroundImage',
      title: 'Background / Hero Image',
      description: 'Alternative hero preview image.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Screenshot Gallery',
      description: 'Additional screenshots showing inner pages, mobile view, or dashboards.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      title: 'Key Highlights',
      name: 'highlights',
      type: 'array',
      description: 'Bullet points highlighting core features (e.g., 99+ PageSpeed, Fully Responsive, Clean Modular Architecture).',
      of: [{ type: 'string' }],
    },
    {
      title: "What's Included",
      name: 'included',
      type: 'array',
      description: 'What the buyer receives upon purchase (e.g., Full Source Code, Figma file, Setup Docs, Lifetime Updates).',
      of: [{ type: 'string' }],
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'array',
      description: 'Summary for SEO description and card previews.',
      of: [{ type: 'block' }],
    },
    {
      title: 'Detailed Template Content',
      name: 'templateContent',
      type: 'array',
      description: 'Full rich text description, feature breakdown, setup instructions, and screenshots.',
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
  ],
}
