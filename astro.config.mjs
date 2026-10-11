import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro'
import react from '@astrojs/react'
import icon from "astro-icon";
import netlify from '@astrojs/netlify';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://tanujdev.netlify.app',
  output: 'server',
  devToolbar: {
    enabled: false
  },
  adapter: netlify({
    edgeMiddleware: true
  }),
  integrations: [sanity({
    projectId: 'fqd3bez7',
    dataset: "production",
    useCdn: true // Defaults to `false`. If true, uses Sanity's CDN for image
  }), tailwind(),react(),icon()],
  vite: {
    ssr: {
      noExternal: ['@astrojs/*']
    }
  },
  build: {
    inlineStylesheets: 'auto'
  }

});