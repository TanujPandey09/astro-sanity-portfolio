import { e as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, h as createAstro } from './astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$SectionHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionHeader;
  const { title, gradientText, subtitle, center = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`mb-24 ${center ? "text-center" : ""}`, "class")} data-aos="fade-up" data-astro-cid-wk2votdk> <div${addAttribute(`flex items-center gap-4 mb-6 ${center ? "justify-center" : ""}`, "class")} data-astro-cid-wk2votdk> <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#599692]" data-astro-cid-wk2votdk></div> <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#599692]" data-astro-cid-wk2votdk>${title}</span> <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#599692]" data-astro-cid-wk2votdk></div> </div> <h2 class="text-white uppercase tracking-tighter mb-8 leading-none" data-astro-cid-wk2votdk> ${title} <span class="text-gradient" data-astro-cid-wk2votdk>${gradientText}</span> </h2> ${subtitle && renderTemplate`<p class="max-w-2xl text-[#94a3b8] italic font-medium leading-relaxed subtitle-text" data-astro-cid-wk2votdk>
"${subtitle}"
</p>`} </div> `;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/SectionHeader.astro", undefined);

export { $$SectionHeader as $ };
