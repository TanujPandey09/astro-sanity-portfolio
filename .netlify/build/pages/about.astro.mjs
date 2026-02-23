import { x as xs, I as Is, $ as $$Layout } from '../chunks/Layout_CzgLYJSg.mjs';
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, i as renderComponent, g as addAttribute, j as renderScript, h as createAstro } from '../chunks/astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import { $ as $$PortableText } from '../chunks/PortableText_DvC2d83P.mjs';
import { $ as $$SectionHeader } from '../chunks/SectionHeader_BpBcEBop.mjs';
import { $ as $$PremiumBackground } from '../chunks/PremiumBackground_BPCNfaDv.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$AboutLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AboutLayout;
  const { aboutData } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative min-h-screen selection:bg-[#599692]/30 overflow-hidden" data-astro-cid-ulloptvv> ${renderComponent($$result, "PremiumBackground", $$PremiumBackground, { "data-astro-cid-ulloptvv": true })} <main class="container mx-auto px-6 py-32 relative z-10" data-astro-cid-ulloptvv> <!-- Hero Section --> <section class="grid lg:grid-cols-12 gap-20 items-center mb-48" data-astro-cid-ulloptvv> <div class="lg:col-span-12 mb-12" data-aos="fade-down" data-astro-cid-ulloptvv> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "title": "Identity", "gradientText": "Synthesis", "subtitle": "Decoding the intersection of technical architecture and creative narrative.", "data-astro-cid-ulloptvv": true })} </div> <!-- Image Section --> <div class="lg:col-span-5 relative group" data-aos="fade-right" data-astro-cid-ulloptvv> <div class="absolute -inset-4 bg-gradient-to-tr from-[#599692] to-[#626c7d] rounded-[3rem] opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-1000" data-astro-cid-ulloptvv></div> <div class="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 p-2 bg-[#11172a]" data-astro-cid-ulloptvv> ${aboutData?.[0]?.heroImage?.asset?.url ? renderTemplate`<img${addAttribute(aboutData[0].heroImage.asset.url, "src")} alt="Tanuj Pandey" class="w-full h-full object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" data-astro-cid-ulloptvv>` : renderTemplate`<div class="w-full h-full bg-white/5 animate-pulse rounded-[2.5rem]" data-astro-cid-ulloptvv></div>`} </div> <!-- Abstract Element --> <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-[#599692]/10 rounded-full blur-[80px] -z-10 group-hover:bg-[#599692]/20 transition-all" data-astro-cid-ulloptvv></div> </div> <!-- Content --> <div class="lg:col-span-7 space-y-12" data-aos="fade-left" data-astro-cid-ulloptvv> <div class="prose-container relative" data-astro-cid-ulloptvv> <div class="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#599692] via-white/10 to-transparent opacity-20" data-astro-cid-ulloptvv></div> <div class="prose prose-xl prose-invert max-w-none" data-astro-cid-ulloptvv> <div class="text-white font-black uppercase tracking-tighter mb-8 leading-tight h2-style" data-astro-cid-ulloptvv>
"${aboutData?.[0]?.aboutName || "Architecting digital success through technical mastery."}"
</div> <div class="prose-content space-y-6" data-astro-cid-ulloptvv> ${renderComponent($$result, "PortableText", $$PortableText, { "value": aboutData?.[0]?.description, "data-astro-cid-ulloptvv": true })} </div> </div> </div> <div class="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12" data-astro-cid-ulloptvv> <div class="space-y-2" data-astro-cid-ulloptvv> <p class="text-[10px] font-black text-[#599692] uppercase tracking-[0.4em]" data-astro-cid-ulloptvv>Efficiency</p> <p class="text-2xl text-white font-black tabular-nums" data-astro-cid-ulloptvv>98.5%</p> </div> <div class="space-y-2" data-astro-cid-ulloptvv> <p class="text-[10px] font-black text-[#626c7d] uppercase tracking-[0.4em]" data-astro-cid-ulloptvv>Availability</p> <p class="text-2xl text-white font-black tabular-nums" data-astro-cid-ulloptvv>24/7</p> </div> <div class="space-y-2" data-astro-cid-ulloptvv> <p class="text-[10px] font-black text-[#626c7d] uppercase tracking-[0.4em]" data-astro-cid-ulloptvv>Latency</p> <p class="text-2xl text-white font-black tabular-nums" data-astro-cid-ulloptvv>&lt;2ms</p> </div> </div> </div> </section> <!-- Services Grid (Awwwards Style) --> <section class="py-32" data-astro-cid-ulloptvv> <div class="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden" data-astro-cid-ulloptvv> ${[
    { title: "Frontend Architecture", desc: "Crafting high-fidelity, high-performance interfaces with modern frameworks and robust state management." },
    { title: "Creative direction", desc: "Synthesizing visual aesthetics with functional requirements to create immersive digital experiences." },
    { title: "Technical Strategy", desc: "Architecting scalable digital ecosystems that align with business objectives and growth trajectory." }
  ].map((service, i) => renderTemplate`<div class="group p-16 bg-[#11172a] hover:bg-white/[0.02] transition-colors relative" data-astro-cid-ulloptvv> <div class="text-[10px] font-black text-[#599692] mb-8 opacity-40" data-astro-cid-ulloptvv>0${i + 1}</div> <h3 class="text-2xl font-black text-white uppercase tracking-tighter mb-6 group-hover:text-gradient transition-all" data-astro-cid-ulloptvv>${service.title}</h3> <p class="text-[#626c7d] italic leading-relaxed" data-astro-cid-ulloptvv>"${service.desc}"</p> <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#599692] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" data-astro-cid-ulloptvv></div> </div>`)} </div> </section> </main> </div>  ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/About/AboutLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/About/AboutLayout.astro", undefined);

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const query = xs`*[_type == "about"]{
        ...,
        heroImage{
      asset->{
        url
      }
      },
    }`;
  const aboutData = await Is().fetch(query);
  const skillquery = xs`*[_type == "skillsSection"] {
  ...,
  logoCase[]-> {
    Logo {
      ...,
      asset-> {
        ...,
        url,
      
      },
    
   
    }
  }
}`;
  const skillData = await Is().fetch(skillquery);
  return renderTemplate`${maybeRenderHead()}<div class=""> ${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AboutLayout", $$AboutLayout, { "aboutData": aboutData, "skillData": skillData })} ` })} </div>`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/pages/about.astro", undefined);

const $$file = "C:/Users/tanuj/astro-sanity-portfolio/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
