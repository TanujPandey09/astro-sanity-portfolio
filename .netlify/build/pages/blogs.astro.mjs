import { x as xs, I as Is, $ as $$Layout } from '../chunks/Layout_CzgLYJSg.mjs';
import { e as createComponent, r as renderTemplate, i as renderComponent } from '../chunks/astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export { renderers } from '../renderers.mjs';

const categories = ["All", "integrations", "technology", "frameworks"];
function Blogs({ blogData }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterWork, setFilterWork] = useState(blogData);
  const handleFilter = (item2) => {
    setActiveFilter(item2);
  };
  useEffect(() => {
    if (activeFilter === "All") {
      setFilterWork(blogData);
    } else {
      setFilterWork(blogData.filter((blog) => blog.Category?.toLowerCase() === item.toLowerCase()));
      setFilterWork(blogData.filter(
        (blog) => blog.Category ? blog.Category.toLowerCase() === activeFilter.toLowerCase() : false
      ));
    }
  }, [activeFilter, blogData]);
  return /* @__PURE__ */ jsx("div", { className: "relative min-h-screen py-32 selection:bg-[#599692]/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-12 bg-gradient-to-r from-transparent to-[#599692]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-[#599692]", children: "Journal" }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-12 bg-gradient-to-l from-transparent to-[#599692]" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-white text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter mb-8 leading-none", children: [
        "Research ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "& Intel" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-[#626c7d] text-lg md:text-xl italic font-medium leading-relaxed", children: '"Decoding complexity through technical narrative and architectural analysis."' })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-8 mb-24 border-b border-white/5 pb-8", "data-aos": "fade-up", children: categories.map((item2, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleFilter(item2),
        className: `text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeFilter === item2 ? "text-[#599692]" : "text-[#626c7d] hover:text-white"}`,
        children: [
          item2,
          activeFilter === item2 && /* @__PURE__ */ jsx(
            motion.div,
            {
              layoutId: "activeFilter",
              className: "absolute -bottom-8 left-0 right-0 h-[2px] bg-[#599692]"
            }
          )
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-0", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filterWork.map((blog, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
        className: "group relative py-12 border-b border-white/5 last:border-0",
        children: /* @__PURE__ */ jsxs("a", { href: `/blogs/${blog.slug?.current}`, className: "flex flex-col md:flex-row items-center justify-between gap-8 group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-4", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-[#599692] opacity-40", children: [
                "0",
                index + 1
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-[#626c7d] uppercase tracking-widest", children: blog.Category || "Technology" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-5xl font-black text-white group-hover:text-[#599692] transition-colors uppercase tracking-tight leading-none mb-6", children: blog.projectName })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block w-48 h-48 rounded-[2rem] overflow-hidden scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-[#599692]/30 bg-[#11172a]", children: blog.FeatureImage?.asset?.url && /* @__PURE__ */ jsx(
            "img",
            {
              src: blog.FeatureImage.asset.url,
              alt: blog.title,
              className: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-14 h-14 rounded-full border border-white/10 group-hover:bg-[#599692] group-hover:border-[#599692] group-hover:text-white transition-all duration-500", children: /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14m-7-7 7 7-7 7" }) }) })
        ] })
      },
      blog._id || index
    )) }) }),
    filterWork.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-48", "data-aos": "fade-up", children: /* @__PURE__ */ jsx("p", { className: "text-[#626c7d] text-[10px] font-black uppercase tracking-[0.5em]", children: "No synchronization found for this frequency." }) })
  ] }) });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const query = xs`*[_type == "blogs"]{
        ...,
        BackgroundImage{
      asset->{
        url
      }
      },
    }`;
  const blogData = await Is().fetch(query);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blogs" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Blogs", Blogs, { "blogData": blogData, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/tanuj/astro-sanity-portfolio/src/components/BlogLayout/Blogs", "client:component-export": "default" })} ` })}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/pages/blogs/index.astro", undefined);

const $$file = "C:/Users/tanuj/astro-sanity-portfolio/src/pages/blogs/index.astro";
const $$url = "/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
