import { $ as $$Layout } from '../chunks/Layout_JzhK-4jy.mjs';
import { e as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import { $ as $$PremiumBackground } from '../chunks/PremiumBackground_U7nFS1h6.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404: Page Not Found | Tanuj Pandey", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" data-astro-cid-zetdm5md> ${renderComponent($$result2, "PremiumBackground", $$PremiumBackground, { "data-astro-cid-zetdm5md": true })} <div class="relative z-10 text-center max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-astro-cid-zetdm5md> <!-- Decorative Icon --> <div class="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-[#599692] text-[#599692] mb-8 animate-spin-slow" data-astro-cid-zetdm5md> <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-zetdm5md> <circle cx="12" cy="12" r="10" data-astro-cid-zetdm5md></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" data-astro-cid-zetdm5md></line> </svg> </div> <p class="text-[10px] font-black text-[#599692] uppercase tracking-[0.6em] mb-4" data-astro-cid-zetdm5md>Error Code 404</p> <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase" data-astro-cid-zetdm5md>
Endpoint <span class="text-gradient" data-astro-cid-zetdm5md>Unreachable</span> </h1> <p class="text-[#626c7d] italic text-base md:text-lg mb-12 leading-relaxed" data-astro-cid-zetdm5md>
"The route you are attempting to access does not exist in the current system index."
</p> <a href="/" class="group relative inline-flex px-10 py-5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white overflow-hidden transition-all duration-500 hover:border-[#599692]" data-astro-cid-zetdm5md> <span class="relative z-10" data-astro-cid-zetdm5md>Return to Safety</span> <div class="absolute inset-0 bg-[#599692] translate-y-full group-hover:translate-y-0 transition-transform duration-500" data-astro-cid-zetdm5md></div> </a> </div> </div> ` })} `;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/pages/404.astro", undefined);

const $$file = "C:/Users/tanuj/astro-sanity-portfolio/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
