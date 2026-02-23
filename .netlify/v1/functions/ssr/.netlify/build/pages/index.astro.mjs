import { x as xs, I as Is, $ as $$Layout } from '../chunks/Layout_CzgLYJSg.mjs';
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, h as createAstro, j as renderScript, i as renderComponent } from '../chunks/astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import { $ as $$ProjectItem } from '../chunks/ProjectItem_C5Bd2zFt.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$PremiumBackground } from '../chunks/PremiumBackground_BPCNfaDv.mjs';
import { $ as $$SectionHeader } from '../chunks/SectionHeader_BpBcEBop.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$BlogItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BlogItem;
  const { blog, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="blog-item group relative py-16 border-b border-white/5 last:border-0" data-aos="fade-up"${addAttribute(index * 50, "data-aos-delay")} data-astro-cid-2il7dcjc> <a${addAttribute(`/blogs/${blog.slug.current}`, "href")} class="flex items-center justify-between gap-8" data-astro-cid-2il7dcjc> <div class="flex-1" data-astro-cid-2il7dcjc> <div class="flex items-center gap-6 mb-4" data-astro-cid-2il7dcjc> <span class="text-[10px] font-black text-[#599692]" data-astro-cid-2il7dcjc>JOURNAL ${index + 1}</span> <span class="text-[10px] font-black text-[#626c7d] italic" data-astro-cid-2il7dcjc>${new Date(blog._createdAt).toLocaleDateString()}</span> </div> <h3 class="text-white group-hover:text-[#599692] transition-colors uppercase tracking-tight leading-none" data-astro-cid-2il7dcjc> ${blog.projectName} </h3> </div> <div class="hidden md:block w-32 h-32 rounded-full overflow-hidden scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-2 border-[#599692]" data-astro-cid-2il7dcjc> ${blog.FeatureImage?.asset?.url && renderTemplate`<img${addAttribute(blog.FeatureImage.asset.url, "src")}${addAttribute(blog.title, "alt")} class="w-full h-full object-cover" data-astro-cid-2il7dcjc>`} </div> <div class="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500" data-astro-cid-2il7dcjc> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-2il7dcjc> <path d="M5 12h14m-7-7 7 7-7 7" data-astro-cid-2il7dcjc></path> </svg> </div> </a> </div> `;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/BlogItem.astro", undefined);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20" data-astro-cid-bbe6dxrz> <!-- Subtle Background Grid Overlay --> <div class="absolute inset-0 bg-[url('/grid-subtle.svg')] opacity-[0.03] pointer-events-none" data-astro-cid-bbe6dxrz></div> <div class="container mx-auto px-6 relative z-20" data-astro-cid-bbe6dxrz> <div class="max-w-7xl mx-auto" data-astro-cid-bbe6dxrz> <div class="grid lg:grid-cols-12 gap-20 items-center" data-astro-cid-bbe6dxrz> <!-- Text Content --> <div class="lg:col-span-8 order-2 lg:order-1" data-astro-cid-bbe6dxrz> <div class="mb-8 flex items-center gap-4" data-aos="fade-right" data-astro-cid-bbe6dxrz> <div class="w-12 h-[1px] bg-[#599692]" data-astro-cid-bbe6dxrz></div> <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#599692]" data-astro-cid-bbe6dxrz>Deployment phase 02 / 2026</span> </div> <div class="relative mb-12" data-aos="fade-up" data-aos-delay="200" data-astro-cid-bbe6dxrz> <h1 class="hero-title font-black text-white leading-none tracking-tighter uppercase relative z-10 m-0" data-astro-cid-bbe6dxrz>
Architecting <br data-astro-cid-bbe6dxrz> <span class="text-gradient" data-astro-cid-bbe6dxrz>Resilient</span> Ecosystems.
</h1> <!-- Abstract Architectural Line --> <div class="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#599692] via-white/5 to-transparent hidden lg:block" data-astro-cid-bbe6dxrz></div> </div> <div class="max-w-2xl mb-16" data-aos="fade-up" data-aos-delay="400" data-astro-cid-bbe6dxrz> <p class="text-lg md:text-xl text-[#626c7d] leading-relaxed italic font-medium" data-astro-cid-bbe6dxrz>
"Synthesizing high-fidelity frontend architecture with robust engineering protocol. I build digital infrastructures that scale with the future."
</p> </div> <div class="flex flex-wrap gap-12 items-center" data-aos="fade-up" data-aos-delay="600" data-astro-cid-bbe6dxrz> <button id="resume-btn" class="group relative px-16 py-8 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] overflow-hidden rounded-full transition-all duration-700 hover:scale-105" data-astro-cid-bbe6dxrz> <span class="relative z-10" data-astro-cid-bbe6dxrz>Access Intel [Resume]</span> <div class="absolute inset-0 bg-[#599692] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0" data-astro-cid-bbe6dxrz></div> </button> <a href="#contact" class="group flex items-center gap-6 text-white font-black uppercase text-[10px] tracking-[0.4em] transition-all" data-astro-cid-bbe6dxrz>
Initiate Project
<div class="h-[1px] w-12 bg-white/20 group-hover:w-24 group-hover:bg-[#599692] transition-all duration-700" data-astro-cid-bbe6dxrz></div> </a> </div> </div> <!-- Professional Technical Visual (Replacing Character Image) --> <div class="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end" data-aos="zoom-out" data-aos-duration="1500" data-astro-cid-bbe6dxrz> <div class="relative w-full max-w-[400px] aspect-square" data-astro-cid-bbe6dxrz> <!-- Geometric HUD Design --> <div class="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" data-astro-cid-bbe6dxrz></div> <div class="absolute inset-10 border border-[#599692]/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" data-astro-cid-bbe6dxrz></div> <div class="absolute inset-20 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" data-astro-cid-bbe6dxrz></div> <!-- Core Focal Point --> <div class="absolute inset-[30%] bg-gradient-to-tr from-[#11172a] to-[#000105] border border-white/10 rounded-2xl backdrop-blur-3xl flex items-center justify-center group" data-astro-cid-bbe6dxrz> <div class="w-16 h-16 border border-[#599692]/20 rounded-full flex items-center justify-center animate-pulse" data-astro-cid-bbe6dxrz> <div class="w-8 h-8 bg-[#599692] rounded-full blur-xl opacity-40" data-astro-cid-bbe6dxrz></div> <div class="w-2 h-2 bg-[#599692] rounded-full relative z-10 shadow-[0_0_15px_#599692]" data-astro-cid-bbe6dxrz></div> </div> <!-- Dynamic Data Nodes --> <div class="absolute top-8 left-8 w-2 h-2 bg-white/20 rounded-full" data-astro-cid-bbe6dxrz></div> <div class="absolute bottom-8 right-8 w-2 h-2 bg-[#599692]/40 rounded-full" data-astro-cid-bbe6dxrz></div> </div> <!-- Floating Status Tags --> <div class="absolute top-0 right-0 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full" data-astro-cid-bbe6dxrz> <span class="text-[8px] font-black text-[#599692] uppercase tracking-widest" data-astro-cid-bbe6dxrz>Latency: 2ms</span> </div> <div class="absolute bottom-10 left-0 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full" data-astro-cid-bbe6dxrz> <span class="text-[8px] font-black text-white/40 uppercase tracking-widest" data-astro-cid-bbe6dxrz>Status: Encrypted</span> </div> </div> </div> </div> </div> </div> <!-- Section Divider --> <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000105] to-transparent z-30" data-astro-cid-bbe6dxrz></div> </section>  ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Hero.astro", undefined);

const $$Astro$1 = createAstro();
const $$Skills = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Skills;
  const skillsData = [
    { name: "React.js", level: 95, color: "#61DAFB" },
    { name: "Next.js", level: 90, color: "#FFFFFF" },
    { name: "TypeScript", level: 85, color: "#3178C6" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "Tailwind CSS", level: 90, color: "#38B2AC" },
    { name: "Node.js", level: 80, color: "#68A063" },
    { name: "MongoDB", level: 75, color: "#47A248" },
    { name: "Replit", level: 75, color: "#F26207" },
    { name: "Git", level: 90, color: "#F05032" }
  ];
  const segments = [1, 2, 3, 4, 5];
  return renderTemplate`${maybeRenderHead()}<section id="skills" class="py-32 relative z-10 bg-[#11172a] overflow-hidden" data-astro-cid-ab4ihpzs> <div class="container mx-auto px-6" data-astro-cid-ab4ihpzs> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "title": "Engineering", "gradientText": "Arsenal", "subtitle": "A precision-engineered stack for building resilient, high-fidelity digital infrastructure.", "data-astro-cid-ab4ihpzs": true })} <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-ab4ihpzs> ${skillsData.map((skill, index) => {
    const activeSegmentsCount = Math.floor(skill.level / 20);
    return renderTemplate`<div class="group p-8 glass-card border-white/5 hover:border-[#599692]/30 transition-all duration-500 overflow-hidden relative" data-aos="fade-up"${addAttribute(index * 50, "data-aos-delay")} data-astro-cid-ab4ihpzs> <div class="absolute -top-12 -right-12 w-24 h-24 bg-[#599692]/5 blur-[40px] rounded-full group-hover:bg-[#599692]/10 transition-all duration-700" data-astro-cid-ab4ihpzs></div> <div class="flex items-center justify-between mb-8" data-astro-cid-ab4ihpzs> <h3 class="skill-name font-bold text-[#dfe5ec] uppercase tracking-wider group-hover:text-white transition-colors" data-astro-cid-ab4ihpzs> ${skill.name} </h3> <span class="text-[10px] font-black text-[#599692] uppercase tracking-[0.2em]" data-astro-cid-ab4ihpzs>${skill.level}% Proficiency</span> </div> <div class="space-y-4" data-astro-cid-ab4ihpzs> <div class="h-[1px] w-full bg-white/5 relative overflow-hidden" data-astro-cid-ab4ihpzs> <div class="skill-bar absolute left-0 top-0 bottom-0 transition-all duration-1000 ease-out"${addAttribute(`width: ${skill.level}%; background-color: ${skill.color}; box-shadow: 0 0 10px ${skill.color}80`, "style")} data-astro-cid-ab4ihpzs></div> </div> <div class="flex gap-2" data-astro-cid-ab4ihpzs> ${segments.map((s) => renderTemplate`<div${addAttribute([
      "h-1 flex-1 rounded-full transition-all duration-500",
      s <= activeSegmentsCount ? "isActive" : "bg-white/5"
    ], "class:list")}${addAttribute(s <= activeSegmentsCount ? `background-color: ${skill.color}CC` : "", "style")} data-astro-cid-ab4ihpzs></div>`)} </div> </div> </div>`;
  })} </div> </div> </section> `;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Skills.astro", undefined);

const $$Experience = createComponent(($$result, $$props, $$slots) => {
  const experienceData = [
    {
      role: "FullStack Developer",
      company: "CxiSuite",
      duration: "Sep 2025 - Present",
      type: "Remote",
      companyUrl: "https://cxisuite.com/",
      description: "Architecting the next generation of enterprise AI interfaces. Leading the development of high-performance web applications and scalable system architectures.",
      technologies: [
        { name: "React.js", color: "#61DAFB" },
        { name: "Material UI", color: "#0081CB" },
        { name: "React Native", color: "#61DAFB" },
        { name: "Axios", color: "#5A29E4" },
        { name: "REST API", color: "#00F0FF" },
        { name: "Replit AI", color: "#F26207" },
        { name: "GoDaddy", color: "#1BDBDB" }
      ],
      logo: "https://cxisuite.com/assets/logo1_1757929917544-2LY1vMCS.png"
    },
    {
      role: "Frontend Developer",
      company: "Nasyat IT",
      duration: "Feb 2025 - July 2025",
      type: "Remote",
      companyUrl: "https://www.nasyait.com/",
      description: "Developed a complete Hospital Management System using React.js, Material UI, and React Native. Built appointment booking, case sheet, and reports modules. Integrated REST APIs with Axios, improving performance by 20%.",
      technologies: [
        { name: "React.js", color: "#61DAFB" },
        { name: "Material UI", color: "#0081CB" },
        { name: "React Native", color: "#61DAFB" },
        { name: "Axios", color: "#5A29E4" },
        { name: "REST API", color: "#00F0FF" }
      ],
      logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHRS2pkyIQ-RQ/company-logo_200_200/company-logo_200_200/0/1630577732820/nasyait_logo?e=1763596800&v=beta&t=CGXPjRheeE9w7-_LqT0R1QXLenCDi8JQWjVejhUlBRg"
    },
    {
      role: "React Developer",
      company: "Techmatys",
      duration: "May 2024 - Dec 2024",
      type: "Onsite",
      companyUrl: "https://www.scube.co/",
      description: "Developed a modern LMS Dashboard using React.js, Ant Design, and React Router. Improved UI/UX accessibility, collaborated with cross-functional teams, and optimized reusable UI components for scalability.",
      technologies: [
        { name: "React.js", color: "#61DAFB" },
        { name: "Ant Design", color: "#0170FE" },
        { name: "React Router", color: "#CA4245" },
        { name: "JavaScript", color: "#F7DF1E" }
      ],
      logo: "/img/techmatys.jfif"
    },
    {
      role: "Frontend Developer",
      company: "Scube.co",
      duration: "Dec 2021 - Feb 2024",
      type: "Remote",
      companyUrl: "https://www.scube.co/",
      description: "Led frontend development for a suite of CRUD web apps and CMS-integrated websites. Built scalable UI with Next.js and React.js, integrated Sanity & Contentful headless CMS, and implemented dynamic layouts with multilingual support.",
      technologies: [
        { name: "React.js", color: "#61DAFB" },
        { name: "Next.js", color: "#FFFFFF" },
        { name: "Tailwind CSS", color: "#38B2AC" },
        { name: "Sanity", color: "#F03E2F" },
        { name: "Contentful", color: "#2478CC" },
        { name: "MUI", color: "#0081CB" }
      ],
      logo: "/img/SCUBE.webp"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="experience" class="relative z-10 bg-[#11172a]" data-astro-cid-xpq65ryk> <div class="experience-pin-wrapper py-32" data-astro-cid-xpq65ryk> <div class="container mx-auto px-6" data-astro-cid-xpq65ryk> <div class="grid lg:grid-cols-12 gap-16 items-start" data-astro-cid-xpq65ryk>  <div class="lg:col-span-5 lg:sticky lg:top-32 h-fit" data-aos="fade-right" data-astro-cid-xpq65ryk> <div class="space-y-8" data-astro-cid-xpq65ryk> <div class="flex items-center gap-3" data-astro-cid-xpq65ryk> <div class="h-[1px] w-12 bg-[#599692]" data-astro-cid-xpq65ryk></div> <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#599692]" data-astro-cid-xpq65ryk>Curriculum Vitae</span> </div> <h2 class="text-white font-black leading-none uppercase tracking-tighter exp-title" data-astro-cid-xpq65ryk>
Evolution of <br data-astro-cid-xpq65ryk> <span class="text-gradient" data-astro-cid-xpq65ryk>Impact</span> </h2> <p class="text-gray-400 italic max-w-md exp-subtitle" data-astro-cid-xpq65ryk>
"Architecting digital success through a progressive journey of technical mastery and innovative problem-solving."
</p> <div class="hidden lg:block pt-12 space-y-6" data-astro-cid-xpq65ryk> ${experienceData.map((exp, i) => renderTemplate`<div class="flex items-center gap-4 group cursor-pointer progress-step"${addAttribute(i, "data-index")} data-astro-cid-xpq65ryk> <span class="text-[10px] font-black text-white/20 group-hover:text-white transition-colors" data-astro-cid-xpq65ryk>0${i + 1}</span> <div class="flex-1 h-[1px] bg-white/5 relative overflow-hidden" data-astro-cid-xpq65ryk> <div class="progress-bar absolute left-0 top-0 bottom-0 bg-[#599692] w-0 transition-all duration-300" data-astro-cid-xpq65ryk></div> </div> <span class="text-[10px] font-black text-white/20 group-hover:text-[#599692] transition-colors" data-astro-cid-xpq65ryk>${exp.company}</span> </div>`)} </div> </div> </div>  <div class="lg:col-span-7 space-y-24 md:space-y-32" data-astro-cid-xpq65ryk> ${experienceData.map((exp, index) => renderTemplate`<div class="experience-card group relative"${addAttribute(index, "data-index")} data-astro-cid-xpq65ryk> <div class="relative z-10 space-y-8" data-astro-cid-xpq65ryk> <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8" data-astro-cid-xpq65ryk> <div class="flex items-center gap-6" data-astro-cid-xpq65ryk> <div class="w-16 h-16 rounded-2xl bg-white/5 p-3 border border-white/10 group-hover:border-[#599692] transition-all duration-500 overflow-hidden" data-astro-cid-xpq65ryk> <img${addAttribute(exp.logo, "src")}${addAttribute(exp.company, "alt")} class="w-full h-full object-contain" data-astro-cid-xpq65ryk> </div> <div data-astro-cid-xpq65ryk> <span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#599692] block mb-1" data-astro-cid-xpq65ryk>${exp.duration}</span> <h3 class="text-white uppercase tracking-tighter leading-none group-hover:text-gradient transition-all role-title" data-astro-cid-xpq65ryk>${exp.role}</h3> </div> </div> <div class="text-right flex items-center md:flex-col gap-4 md:gap-1" data-astro-cid-xpq65ryk> <a${addAttribute(exp.companyUrl, "href")} target="_blank" class="text-white font-black uppercase tracking-[0.2em] text-xs hover:text-[#599692] transition-colors" data-astro-cid-xpq65ryk>${exp.company}</a> <span class="px-3 py-1 rounded-full bg-[#626c7d]/10 text-[#626c7d] text-[8px] font-black uppercase tracking-widest" data-astro-cid-xpq65ryk>${exp.type}</span> </div> </div> <div class="glass-card p-10 relative overflow-hidden group/desc" data-astro-cid-xpq65ryk> <div class="absolute -top-12 -right-12 w-24 h-24 bg-[#599692]/5 blur-[60px] -z-10 group-hover/desc:bg-[#599692]/10 transition-all" data-astro-cid-xpq65ryk></div> <p class="text-gray-400 leading-relaxed italic exp-desc" data-astro-cid-xpq65ryk>
"${exp.description}"
</p> </div> <div class="flex flex-wrap gap-3" data-astro-cid-xpq65ryk> ${exp.technologies.map((tech) => renderTemplate`<div class="relative group/tech" data-astro-cid-xpq65ryk> <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-white/50 hover:text-white transition-all block"${addAttribute(`border-left: 2px solid ${tech.color}`, "style")} data-astro-cid-xpq65ryk> ${tech.name} </span> </div>`)} </div> </div> <div class="absolute -inset-8 bg-gradient-to-br from-[#599692]/2 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 -z-0 rounded-[3rem]" data-astro-cid-xpq65ryk></div> </div>`)} </div> </div> </div> </div> </section>  ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Experience.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Experience.astro", undefined);

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="py-32 relative z-10 bg-[#11172a]" data-astro-cid-xmivup5a> <div class="container mx-auto px-6" data-astro-cid-xmivup5a> <div class="max-w-4xl mx-auto mb-20 text-center" data-aos="fade-up" data-astro-cid-xmivup5a> <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#599692] block mb-6" data-astro-cid-xmivup5a>Transmission Center</span> <h2 class="text-white mb-6 contact-title" data-astro-cid-xmivup5a>Initiate <span class="text-gradient" data-astro-cid-xmivup5a>Contact</span></h2> <p class="text-gray-400 italic contact-subtitle" data-astro-cid-xmivup5a>
"Have a project in mind? Let's discuss how we can bring your ideas to life."
</p> </div> <div class="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto" data-astro-cid-xmivup5a> <!-- Info Hub --> <div class="lg:col-span-5 space-y-8" data-aos="fade-right" data-astro-cid-xmivup5a> <div class="p-10 rounded-[3rem] glass-card space-y-12 relative overflow-hidden group" data-astro-cid-xmivup5a> <div class="absolute top-0 right-0 w-32 h-32 bg-[#599692]/5 rounded-full blur-3xl -z-10" data-astro-cid-xmivup5a></div> <a href="mailto:tanujp09@gmail.com" class="flex items-center gap-6 group/link" data-astro-cid-xmivup5a> <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover/link:bg-[#599692] group-hover/link:text-white transition-all duration-500" data-astro-cid-xmivup5a> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-xmivup5a><rect width="20" height="16" x="2" y="4" rx="2" data-astro-cid-xmivup5a></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-astro-cid-xmivup5a></path></svg> </div> <div data-astro-cid-xmivup5a> <p class="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1" data-astro-cid-xmivup5a>Secure Channel</p> <p class="text-white font-bold group-hover/link:text-[#599692] transition-colors" data-astro-cid-xmivup5a>tanujp09@gmail.com</p> </div> </a> <div class="flex items-center gap-6 group/link" data-astro-cid-xmivup5a> <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40" data-astro-cid-xmivup5a> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-xmivup5a><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" data-astro-cid-xmivup5a></path><circle cx="12" cy="10" r="3" data-astro-cid-xmivup5a></circle></svg> </div> <div data-astro-cid-xmivup5a> <p class="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1" data-astro-cid-xmivup5a>Geographic Node</p> <p class="text-white font-bold" data-astro-cid-xmivup5a>Delhi, India</p> </div> </div> <div class="pt-8 border-t border-white/5 flex gap-4" data-astro-cid-xmivup5a> <a href="https://github.com/TanujPandey09" target="_blank" class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all" data-astro-cid-xmivup5a> <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-xmivup5a><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.509 11.509 0 0 0-3.007-.403c-1.02.005-2.047.138-3.006.404-2.291-1.552-3.297-1.23-3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" data-astro-cid-xmivup5a></path></svg> </a> <a href="https://linkedin.com/in/tanujdev" target="_blank" class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all" data-astro-cid-xmivup5a> <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-xmivup5a><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" data-astro-cid-xmivup5a></path></svg> </a> </div> </div> </div> <!-- Form Center --> <div class="lg:col-span-7" data-aos="fade-left" data-astro-cid-xmivup5a> <form id="contactForm" class="grid grid-cols-1 md:grid-cols-2 gap-8" data-astro-cid-xmivup5a> <div class="space-y-4" data-astro-cid-xmivup5a> <label class="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4" data-astro-cid-xmivup5a>Full Identity</label> <input type="text" name="from_name" required placeholder="User-01" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#599692] transition-all" data-astro-cid-xmivup5a> </div> <div class="space-y-4" data-astro-cid-xmivup5a> <label class="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4" data-astro-cid-xmivup5a>Neural Path (Email)</label> <input type="email" name="from_email" required placeholder="access@network.com" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#599692] transition-all" data-astro-cid-xmivup5a> </div> <div class="md:col-span-2 space-y-4" data-astro-cid-xmivup5a> <label class="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4" data-astro-cid-xmivup5a>Frequency (Subject)</label> <input type="text" name="subject" required placeholder="Project Architecture" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#599692] transition-all" data-astro-cid-xmivup5a> </div> <div class="md:col-span-2 space-y-4" data-astro-cid-xmivup5a> <label class="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4" data-astro-cid-xmivup5a>Transmission (Message)</label> <textarea name="message" required rows="5" placeholder="System briefing..." class="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 text-white focus:outline-none focus:border-[#599692] transition-all resize-none" data-astro-cid-xmivup5a></textarea> </div> <div class="md:col-span-2" data-astro-cid-xmivup5a> <button type="submit" class="group relative px-12 py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] overflow-hidden rounded-full transition-all duration-500 hover:scale-[1.02] w-full" data-astro-cid-xmivup5a> <span class="relative z-10 flex items-center justify-center gap-4" data-astro-cid-xmivup5a>
Send Transmission
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" data-astro-cid-xmivup5a><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" data-astro-cid-xmivup5a></path></svg> </span> <div class="absolute inset-0 bg-[#599692] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 -z-0" data-astro-cid-xmivup5a></div> </button> </div> </form> <div id="form-status" class="mt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] hidden" data-astro-cid-xmivup5a></div> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Contact.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Contact.astro", undefined);

const $$Astro = createAstro();
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { project, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="group relative bg-[#11172a] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#599692]/30 transition-all duration-700" data-aos="fade-up"${addAttribute(index * 50, "data-aos-delay")} data-astro-cid-mspuyifq> <a${addAttribute(`/projects/${project.slug.current}`, "href")} class="block aspect-[4/3] relative overflow-hidden" data-astro-cid-mspuyifq> ${project.BackgroundImage?.asset?.url && renderTemplate`<img${addAttribute(project.BackgroundImage.asset.url, "src")}${addAttribute(project.projectName, "alt")} class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" data-astro-cid-mspuyifq>`} <div class="absolute inset-0 bg-gradient-to-t from-[#000105] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" data-astro-cid-mspuyifq></div> <div class="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" data-astro-cid-mspuyifq> <div class="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity" data-astro-cid-mspuyifq> ${project.techStack?.slice(0, 2).map((tech) => renderTemplate`<span class="text-[7px] font-black uppercase tracking-widest px-2 py-1 bg-white/10 rounded-full text-white/60" data-astro-cid-mspuyifq>${tech}</span>`)} </div> <h4 class="text-white uppercase tracking-tighter project-card-title" data-astro-cid-mspuyifq>${project.projectName}</h4> </div> </a> </div> `;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/ProjectCard.astro", undefined);

const $$Ticker = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="py-12 bg-white/[0.02] border-y border-white/5 overflow-hidden whitespace-nowrap group select-none relative z-10" data-astro-cid-kofmyqso> <div class="ticker-content inline-block animate-ticker" data-astro-cid-kofmyqso> <div class="inline-flex items-center gap-12 px-6" data-astro-cid-kofmyqso> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>UI Architecture</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <!-- <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700">System Design</span> --> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>Protocols</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>Full-Stack Intel</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>Deployment</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> </div> <!-- Duplicated for seamless loop --> <div class="inline-flex items-center gap-12 px-6" data-astro-cid-kofmyqso> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>UI Architecture</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <!-- <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700">System Design</span> --> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>Protocols</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>Full-Stack Intel</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> <span class="text-[clamp(1.5rem,4vw,3rem)] font-black text-white/10 uppercase tracking-tighter group-hover:text-[#599692] transition-colors duration-700" data-astro-cid-kofmyqso>Deployment</span> <div class="w-3 h-3 rounded-full bg-[#599692]/20 group-hover:bg-[#599692] transition-all" data-astro-cid-kofmyqso></div> </div> </div> </div> `;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Ticker.astro", undefined);

const $$HomeLayout = createComponent(async ($$result, $$props, $$slots) => {
  const query = xs`*[_type == "projects"]{...,BackgroundImage{asset->{url}}}`;
  const blogquery = xs`*[_type == "blogs"] | order(_createdAt desc) {...,FeatureImage{asset->{url}}}`;
  const projectData = await Is().fetch(query);
  const blogData = await Is().fetch(blogquery);
  const achievements = [
    { number: "15+", label: "Solutions Built", color: "#599692" },
    { number: "4+", label: "Years Impact", color: "#626c7d" },
    { number: "25%", label: "UX Performance", color: "#599692" },
    { number: "100%", label: "Satisfaction", color: "#FFFFFF" }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="relative min-h-screen selection:bg-[#599692]/30"> ${renderComponent($$result, "PremiumBackground", $$PremiumBackground, {})} <div class="container mx-auto px-4 md:px-8 lg:px-12 relative z-10"> <!-- Hero Experience --> ${renderComponent($$result, "Hero", $$Hero, {})} ${renderComponent($$result, "Ticker", $$Ticker, {})} <!-- Achievement Grid --> <div class="py-24" data-aos="fade-up"> <div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden"> ${achievements.map((achievement, index) => renderTemplate`<div class="p-12 bg-[#11172a] text-center group hover:bg-white/[0.02] transition-colors"> <div class="text-5xl md:text-6xl font-black mb-4 tracking-tighter transition-transform duration-700 group-hover:scale-110"${addAttribute(`color: ${achievement.color}`, "style")}> ${achievement.number} </div> <div class="text-[10px] text-[#626c7d] font-black uppercase tracking-[0.4em]">${achievement.label}</div> </div>`)} </div> </div> <!-- Modular Sections --> ${renderComponent($$result, "Skills", $$Skills, {})} ${renderComponent($$result, "Experience", $$Experience, {})} <!-- Projects Section --> <section id="projects" class="py-32 relative z-10"> <div class="max-w-7xl mx-auto"> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "title": "Portfolio", "gradientText": "Archive", "subtitle": "A selection of high-fidelity platforms and architectural explorations." })} <!-- Featured Deliveries (Immersive List) --> <div class="mt-24 space-y-0"> ${projectData?.slice(0, 4).map((project, index) => renderTemplate`${renderComponent($$result, "ProjectItem", $$ProjectItem, { "project": project, "index": index })}`)} </div> ${projectData?.length > 4 && renderTemplate`<div class="mt-48"> <div class="flex items-center justify-between mb-16 px-4"> <div class="space-y-2"> <p class="text-[10px] font-black text-[#599692] uppercase tracking-[0.5em]">Repository Index</p> <h3 class="text-3xl font-black text-white uppercase tracking-tighter">Extended Artifacts</h3> </div> <button id="expand-repo" class="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#626c7d] hover:text-[#599692] transition-colors">
Explore Entire Intel
<div class="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#599692] transition-all"> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" id="repo-icon" class="transition-transform duration-500"><path d="m6 9 6 6 6-6"></path></svg> </div> </button> </div> <div id="repo-grid" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${projectData?.slice(4).map((project, index) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "project": project, "index": index })}`)} </div> <div class="mt-32 flex justify-center"> <a href="/projects" class="group relative px-12 py-6 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-white overflow-hidden transition-all duration-500 hover:border-[#599692]"> <span class="relative z-10">Access Full Registry Archive</span> <div class="absolute inset-0 bg-[#599692] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div> </a> </div> </div>`} </div> </section> <!-- Blogs Section --> <section id="blogs" class="py-32 relative z-10"> <div class="max-w-7xl mx-auto"> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "title": "Journal", "gradientText": "Insights", "subtitle": "Decoding complexity through technical narrative and architectural analysis." })} <div class="mt-24"> ${blogData?.slice(0, 4).map((blog, index) => renderTemplate`${renderComponent($$result, "BlogItem", $$BlogItem, { "blog": blog, "index": index })}`)} </div> <div class="mt-20 flex justify-end"> <a href="/blogs" class="group flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-[#626c7d] hover:text-[#599692] transition-colors">
Explore All Articles
<div class="w-12 h-[1px] bg-[#626c7d] group-hover:bg-[#599692] group-hover:w-24 transition-all duration-700"></div> </a> </div> </div> </section> <!-- Contact Experience --> ${renderComponent($$result, "Contact", $$Contact, {})} </div> </div> ${renderComponent($$result, "AiChatbot", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/tanuj/astro-sanity-portfolio/src/components/AiChatbot", "client:component-export": "default" })} ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/HomeLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/HomeLayout.astro", undefined);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  xs`*[_type == "about"]{
        ...,
        heroImage{
      asset->{
        url
      }
      },
    }`;
  xs`*[_type == "skillsSection"] {
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomeLayout", $$HomeLayout, {})} ` })}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/pages/index.astro", undefined);

const $$file = "C:/Users/tanuj/astro-sanity-portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
