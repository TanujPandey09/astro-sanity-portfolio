import { x as xs, I as Is, $ as $$Layout } from '../chunks/Layout_CzgLYJSg.mjs';
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, i as renderComponent, j as renderScript, h as createAstro } from '../chunks/astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import { $ as $$ProjectItem } from '../chunks/ProjectItem_C5Bd2zFt.mjs';
import { $ as $$SectionHeader } from '../chunks/SectionHeader_BpBcEBop.mjs';
import { $ as $$PremiumBackground } from '../chunks/PremiumBackground_BPCNfaDv.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ProjectLayouts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectLayouts;
  const { projectData } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative min-h-screen selection:bg-[#599692]/30 overflow-hidden"> ${renderComponent($$result, "PremiumBackground", $$PremiumBackground, {})} <main class="container mx-auto px-6 py-32 relative z-10"> <div class="max-w-7xl mx-auto"> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "title": "Archive", "gradientText": "Index", "subtitle": "A comprehensive log of technical explorations, architectural blueprints, and high-fidelity deployments." })} <div class="mt-32 space-y-0"> ${projectData?.map((project, index) => renderTemplate`${renderComponent($$result, "ProjectItem", $$ProjectItem, { "project": project, "index": index })}`)} </div> <!-- Advanced Stats (Awwwards Style) --> <div class="mt-48 grid grid-cols-2 lg:grid-cols-4 gap-8 py-20 border-t border-white/5"> ${[
    { label: "Total Artifacts", value: "48+" },
    { label: "Lines Composed", value: "2.5M" },
    { label: "Successful Nodes", value: "100%" },
    { label: "Uptime Rating", value: "99.9%" }
  ].map((stat) => renderTemplate`<div class="space-y-4"> <p class="text-[10px] font-black text-[#626c7d] uppercase tracking-[0.6em]">${stat.label}</p> <h4 class="text-4xl font-black text-white tracking-tighter tabular-nums">${stat.value}</h4> </div>`)} </div> </div> </main> </div> ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/ProjectsLayout/ProjectLayouts.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/ProjectsLayout/ProjectLayouts.astro", undefined);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const query = xs`*[_type == "projects"]{
        ...,
        BackgroundImage{
      asset->{
        url
      }
      },
    }`;
  const projectData = await Is().fetch(query);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProjectLayouts", $$ProjectLayouts, { "projectData": projectData })} ` })}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/pages/projects/index.astro", undefined);

const $$file = "C:/Users/tanuj/astro-sanity-portfolio/src/pages/projects/index.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
