import { createClient } from '@sanity/client';
/* empty css                         */
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, j as renderScript, i as renderComponent, k as renderSlot, n as renderHead, h as createAstro } from './astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import 'clsx';
import { x as xs, I as Is } from './index-d34160a3_F_PySAei.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"fqd3bez7","dataset":"production","useCdn":true}
          );

globalThis.sanityClient = sanityClient;

const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  const query = xs`*[_type == "sideBar"]{
  ...,
  sideMenus[]->
}`;
  const [sideBar] = await Is().fetch(query);
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 transition-all duration-700 pointer-events-none" id="main-header" data-astro-cid-ssfzsv2f> <!-- Subtle Header Background Blur --> <div class="absolute inset-0 header-bg transition-all duration-700" data-astro-cid-ssfzsv2f></div> <nav class="max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-between transition-all duration-700 relative z-10 pointer-events-auto" id="nav-container" data-astro-cid-ssfzsv2f> <!-- LEFT: Branded Identity --> <div class="flex-1 flex items-center gap-4" data-astro-cid-ssfzsv2f> <a href="/" class="flex items-center gap-3 group" data-astro-cid-ssfzsv2f> <div class="relative w-10 h-10 md:w-11 md:h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-[#599692]/50 transition-all duration-300 overflow-hidden shadow-lg shadow-black/20" data-astro-cid-ssfzsv2f> <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#599692]/20 to-transparent" data-astro-cid-ssfzsv2f></div> <span class="text-white font-black text-lg md:text-xl tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-300" data-astro-cid-ssfzsv2f>TP</span> </div> <div class="flex flex-col" data-astro-cid-ssfzsv2f> <span class="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover:text-[#599692] transition-colors" data-astro-cid-ssfzsv2f>Tanuj Pandey</span> <span class="text-[7px] md:text-[8px] font-medium text-[#626c7d] uppercase tracking-[0.1em] md:tracking-[0.2em]" data-astro-cid-ssfzsv2f>Full Stack Engineer</span> </div> </a> </div> <!-- CENTER: Floating Pill Navigation (Desktop Only) --> <div class="hidden md:flex flex-none justify-center z-50" data-astro-cid-ssfzsv2f> <div class="flex items-center gap-2 p-1 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full px-5 py-2 shadow-2xl shadow-black/80 ring-1 ring-white/5" data-astro-cid-ssfzsv2f> <div class="flex items-center gap-1" data-astro-cid-ssfzsv2f> ${sideBar?.sideMenus?.map((menuItem) => renderTemplate`<a${addAttribute(menuItem.menuLink.current, "href")} class="nav-link px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#626c7d] hover:text-white transition-all rounded-full relative group" data-astro-cid-ssfzsv2f> <span class="relative z-10" data-astro-cid-ssfzsv2f>${menuItem.menuName}</span> <div class="active-pill absolute inset-0 bg-white/10 rounded-full scale-0 transition-all duration-500 group-hover:scale-100" data-astro-cid-ssfzsv2f></div> <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#599692] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" data-astro-cid-ssfzsv2f></div> </a>`)} </div> </div> </div> <!-- RIGHT: CTA (Desktop) / Mobile Toggle --> <div class="flex-1 flex justify-end items-center gap-4" data-astro-cid-ssfzsv2f> <!-- Desktop CTA --> <a href="#contact" class="hidden md:flex items-center gap-3 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group" data-astro-cid-ssfzsv2f> <span class="text-[10px] font-black text-white uppercase tracking-[0.2em]" data-astro-cid-ssfzsv2f>Let's Talk</span> <div class="w-2 h-2 rounded-full bg-[#599692] group-hover:animate-ping" data-astro-cid-ssfzsv2f></div> </a> <!-- Mobile Trigger --> <button id="mobile-trigger" class="md:hidden w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-1.5 group transition-all hover:border-[#599692]/50 active:scale-90" aria-label="Toggle Menu" data-astro-cid-ssfzsv2f> <div class="w-5 h-[2px] bg-[#599692] transition-all duration-300 origin-center" id="bar-1" data-astro-cid-ssfzsv2f></div> <div class="w-5 h-[2px] bg-white transition-all duration-300" id="bar-2" data-astro-cid-ssfzsv2f></div> <div class="w-5 h-[2px] bg-[#599692] transition-all duration-300 origin-center" id="bar-3" data-astro-cid-ssfzsv2f></div> </button> </div> </nav> <!-- Mobile Overlay --> <div id="mobile-overlay" class="fixed inset-0 bg-[#000105]/95 backdrop-blur-3xl z-[100] hidden flex-col items-center justify-between pointer-events-auto opacity-0 transition-all duration-500 py-20" data-astro-cid-ssfzsv2f> <!-- Background Glow --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#599692]/10 rounded-full blur-[120px] pointer-events-none" data-astro-cid-ssfzsv2f></div> <div class="flex flex-col items-center space-y-6 text-center w-full px-6 relative z-10" data-astro-cid-ssfzsv2f> <p class="text-[10px] font-black text-[#599692] uppercase tracking-[0.5em] mb-4" data-astro-cid-ssfzsv2f>Navigation Menu</p> ${sideBar?.sideMenus?.map((menuItem, index) => renderTemplate`<a${addAttribute(menuItem.menuLink.current, "href")} class="mobile-nav-link block text-4xl font-black text-white uppercase tracking-tighter hover:text-[#599692] transition-all relative group py-2"${addAttribute(`animation-delay: ${index * 0.1}s`, "style")} data-astro-cid-ssfzsv2f> <span class="relative z-10" data-astro-cid-ssfzsv2f>${menuItem.menuName}</span> <div class="absolute inset-x-[-20px] bottom-2 h-4 bg-[#599692]/5 -z-0 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" data-astro-cid-ssfzsv2f></div> </a>`)} </div> <div class="flex flex-col items-center gap-8 relative z-10" data-astro-cid-ssfzsv2f> <div class="flex flex-col items-center gap-4" data-astro-cid-ssfzsv2f> <a href="#contact" class="px-10 py-4 bg-[#599692] text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-transform" data-astro-cid-ssfzsv2f>
Start Project
</a> <button id="close-overlay" class="text-[10px] font-black uppercase tracking-[0.2em] text-[#626c7d] hover:text-white transition-colors" data-astro-cid-ssfzsv2f>
[ Click to Close ]
</button> </div> <div class="flex flex-col items-center gap-3" data-astro-cid-ssfzsv2f> <div class="flex gap-6 items-center" data-astro-cid-ssfzsv2f> <div class="w-12 h-[1px] bg-white/10" data-astro-cid-ssfzsv2f></div> <p class="text-[8px] font-black uppercase tracking-[0.4em] text-white/40" data-astro-cid-ssfzsv2f>v4.0.2 System</p> <div class="w-12 h-[1px] bg-white/10" data-astro-cid-ssfzsv2f></div> </div> </div> </div> </div> </header>  ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Sidebar.astro", undefined);

function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "relative py-16 md:py-32 border-t border-white/5 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-12 md:gap-16 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 justify-center lg:justify-start", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-[#599692]" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-[#599692]", children: "Engineering" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none", children: [
            "Building the Future ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "One Bit at a Time." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#626c7d] text-base md:text-lg max-w-md italic mx-auto lg:mx-0", children: '"Building robust web applications and reliable software systems backed by modern, production-ready engineering practices."' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white uppercase tracking-[0.4em]", children: "Navigation" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3 md:space-y-4", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/projects", className: "text-sm text-[#626c7d] hover:text-[#599692] transition-colors", children: "Portfolio" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/blogs", className: "text-sm text-[#626c7d] hover:text-[#599692] transition-colors", children: "Blog" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about", className: "text-sm text-[#626c7d] hover:text-[#599692] transition-colors", children: "About" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white uppercase tracking-[0.4em]", children: "Connect" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:gap-4", children: [
              /* @__PURE__ */ jsxs("a", { href: "https://github.com/TanujPandey09", target: "_blank", className: "text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaGithub, { size: 18 }),
                " GitHub"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "https://linkedin.com/in/tanujp09", target: "_blank", className: "text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaLinkedin, { size: 18 }),
                " LinkedIn"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "#", className: "text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaInstagram, { size: 18 }),
                " Instagram"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1 space-y-4 md:space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white uppercase tracking-[0.4em]", children: "Location" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[#626c7d]", children: "tanujp09@gmail.com" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[#626c7d]", children: "Delhi, India" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 md:mt-32 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-[9px] md:text-[10px] font-black text-[#626c7d] uppercase tracking-widest text-center md:text-left", children: [
          "© ",
          currentYear,
          " Tanuj Pandey . All Rights Reserved"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 md:gap-8", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-white/20 uppercase tracking-[0.3em]", children: "Experience: 4+ YOE" }),
          /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-[#599692] uppercase tracking-[0.3em]", children: "Open to Work" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -left-24 w-96 h-96 bg-[#599692]/5 rounded-full blur-[120px] pointer-events-none" })
  ] });
}

const $$Loader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="preloader" class="fixed inset-0 z-[1000] bg-[#000105] flex items-center justify-center overflow-hidden" data-astro-cid-4qws3apc> <div class="relative w-full max-w-md px-12 text-center" data-astro-cid-4qws3apc> <!-- Progress Tracking UI --> <div class="mb-8 flex justify-between items-end" data-astro-cid-4qws3apc> <div class="space-y-2 text-left" data-astro-cid-4qws3apc> <p class="text-[10px] font-black text-[#599692] uppercase tracking-[0.5em]" data-astro-cid-4qws3apc>Initializing</p> <p id="loader-percent" class="text-4xl font-black text-white tracking-tighter tabular-nums" data-astro-cid-4qws3apc>00%</p> </div> <div class="text-right" data-astro-cid-4qws3apc> <p class="text-[10px] font-black text-white/20 uppercase tracking-widest" data-astro-cid-4qws3apc>Portfolio</p> <div id="loader-status" class="text-[10px] font-black text-[#626c7d] uppercase tracking-widest" data-astro-cid-4qws3apc>Fetching Data...</div> </div> </div> <!-- Progress Bar --> <div class="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full" data-astro-cid-4qws3apc> <div id="progress-line" class="absolute top-0 left-0 h-full w-0 bg-[#599692] shadow-[0_0_15px_#599692]" data-astro-cid-4qws3apc></div> </div> <!-- Background Decoration --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full -z-10 animate-pulse" data-astro-cid-4qws3apc></div> </div> </div>  ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Loader.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Loader.astro", undefined);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _b;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_b || (_b = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Tanuj Pandey is a professional Full Stack Engineer with 4+ years of experience building secure, performant web products, interactive user interfaces, and scalable backend systems."><meta name="keywords" content="Tanuj Pandey, Full Stack Engineer, Portfolio, Software Engineer, React, Node.js, Astro, Web Developer, Next.js"><meta name="author" content="Tanuj Pandey"><!-- Open Graph / Social Previews --><meta property="og:type" content="website"><meta property="og:url" content="https://tanujdev.netlify.app/"><meta property="og:title"', '><meta property="og:description" content="Full Stack Engineer specialized in React, Node.js, and modern scalable API solutions. View my 6+ completed builds and professional experience."><meta property="og:image" content="https://tanujdev.netlify.app/favicon.svg"><!-- Twitter Card Previews --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://tanujdev.netlify.app/"><meta property="twitter:title"', '><meta property="twitter:description" content="Full Stack Engineer specialized in React, Node.js, and modern scalable API solutions. View my 6+ completed builds and professional experience."><meta property="twitter:image" content="https://tanujdev.netlify.app/favicon.svg"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/favicon.svg"><link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css"><meta name="generator"', "><title>", "</title><!-- Dynamic Web Analytics -->", "", "</head> <body> ", " ", " ", " ", ' <div class="cursor"></div> <div class="cursor2"></div> <script src="https://unpkg.com/aos@next/dist/aos.js"></script> <script>\n      AOS.init();\n    </script> </body> </html>  ', ""])), addAttribute(title, "content"), addAttribute(title, "content"), addAttribute(Astro2.generator, "content"), title, undefined, renderHead(), renderComponent($$result, "Loader", $$Loader, {}), renderComponent($$result, "Sidebar", $$Sidebar, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/tanuj/astro-sanity-portfolio/src/components/Footer", "client:component-export": "default" }), renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/tanuj/astro-sanity-portfolio/src/layouts/Layout.astro", undefined);

export { $$Layout as $ };
