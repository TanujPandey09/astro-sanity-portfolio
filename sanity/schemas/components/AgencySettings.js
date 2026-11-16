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
  ],
}

