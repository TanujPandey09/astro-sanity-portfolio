import { defineConfig } from 'astro/config';
import sanity from 'astro-sanity';
import react from '@astrojs/react'
import icon from "astro-icon";
import netlify from '@astrojs/netlify';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  }),
  integrations: [sanity({
    projectId: 'fqd3bez7',
    dataset: "production",
    useCdn: true // Defaults to `false`. If true, uses Sanity's CDN for image
  }), tailwind(),react(),icon()],
  vite: {
    define: {
      'import.meta.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY)
    }
  }

});