# AGENTS.md

Portfolio site for Tanuj Pandey. Two independent packages in one repo:

- **Root** = Astro 5 site (SSR, Netlify adapter, `output: 'server'`). This is where you work by default.
- **`sanity/`** = Sanity Studio v3 content editor with its **own** `node_modules` and `package-lock.json`. Run its commands from inside `sanity/`, not the root.

## Commands

Root (`package.json`):
- `npm run dev` — Astro dev server, http://localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the build

`npm run dev` is `astro dev`; there is no separate lint, format, typecheck, or test script. `npm run build` is the only verification step — run it after non-trivial edits. `@astrojs/check` is not installed, so `astro check` will not work.

Studio (`sanity/`): `npm run dev`, `npm run build`, `npm run deploy` (from within `sanity/`).

## Sanity data layer (easy to break)

- The integration registered in `astro.config.mjs` is `@sanity/astro`, **but every source file imports `useSanityClient` and `groq` from the legacy `astro-sanity` package**. Both are installed and they interoperate through `globalThis.sanityClient` (set by the `@sanity/astro` integration, read by `astro-sanity`'s `useSanityClient`). Do **not** "clean up" these imports or remove the `astro-sanity` dependency; it will break all data fetching.
- Project ID `fqd3bez7` / dataset `production` is hardcoded in **four** places. Update all of them together: `astro.config.mjs`, `src/lib/sanityClient.js`, `sanity/sanity.config.js`, `sanity/sanity.cli.js`.
- GROQ queries reference these schema type names (defined in `sanity/schemas`): `about`, `herobanner`, `projects`, `blogs`, `skillsSection`, `logoSection`, `chatbot`, `sideBar`, `sideMenu`. Renaming a schema requires updating queries in `src/pages/*` and `src/components/HomeLayout.astro` (and `src/pages/api/chatbot.ts`, `src/pages/sitemap.xml.ts`).
- `src/lib/sanityClient.js` exports a second, standalone client used only for the chatbot fallback; most pages use `useSanityClient()` instead.

## Environment variables

Server-only, read via `import.meta.env.X || process.env.X`:
- `GEMINI_API_KEY` — `/api/chatbot`. **Optional**: when unset, the endpoint falls back to Sanity `chatbot` intent matching.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL` — `/api/contact` (nodemailer). Missing SMTP creds make the contact form return 500.

Local values live in `.env` (gitignored); production values are set in the Netlify dashboard. Do not commit `.env`.

## Design system (do not drift)

`PRD.md` §2 is the authoritative visual contract: "Linear Indigo & Obsidian Monochrome". Rules that agents commonly violate:
- A single accent color `--accent-primary: #5E6AD2` (Linear indigo). No rainbow/blue-purple/cyan gradients, no neon, no colored shadows.
- Design tokens are CSS custom properties declared in `:root` inside `<style>` in `src/layouts/Layout.astro` (~line 260), then mapped to Tailwind utilities (`canvas`, `surface`, `border`, `text`, `accent`) in `tailwind.config.mjs`. Change tokens there, not ad-hoc hex values in components.
- `src/styles/main.css` is intentionally empty — global styles/tokens live in `Layout.astro`, not there.
- Fonts: `font-sans` = Plus Jakarta Sans, `font-grotesk` = Space Grotesk (display headings), `font-mono` = JetBrains Mono.

## Rendering & routing notes

- Pages are SSR (`output: 'server'`) and fetch from Sanity at request time. The only hydrated React islands are `AiChatbot` (`client:idle` in `HomeLayout.astro`) and the blogs list (`client:load` in `src/pages/blogs/index.astro`). Everything else is `.astro`.
- Dynamic routes: `src/pages/projects/[...slug].astro`, `src/pages/blogs/[...slug].astro`; `src/pages/sitemap.xml.ts` generates the sitemap.
- Site URL `https://tanujbuilds.site` is hardcoded in `astro.config.mjs`, `src/layouts/Layout.astro`, and `public/robots.txt`.
- Deploys to Netlify (adapter + `public/_redirects`). `@astrojs/vercel` is a leftover dependency and is not wired into the config.

## Conventions

- Sanity Studio code (in `sanity/`) follows Prettier: no semicolons, single quotes, printWidth 100 (see `sanity/package.json`). The Astro app does not have a formatter configured.
- `.agents/` and `.agent/` are gitignored skill directories; the available UI/design skills are worth consulting for visual work alongside `PRD.md`.
