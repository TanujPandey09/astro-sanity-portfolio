import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function extractExcerpt(blog) {
  const fromExcerpt = blog?.excerpt
    ?.map((block) => block?.children?.map((c) => c?.text).join(""))
    .filter(Boolean)
    .join(" ");
  if (fromExcerpt && fromExcerpt.trim().length > 0) {
    return fromExcerpt.trim();
  }
  const fromContent = blog?.blogcontent
    ?.map((block) => block?.children?.map((c) => c?.text).join(""))
    .filter(Boolean)
    .join(" ");
  if (fromContent && fromContent.trim().length > 0) {
    return fromContent.trim();
  }
  return "An architectural deep dive into modern web engineering, scalable frontend systems, and production best practices.";
}

function formatDate(dateString) {
  if (!dateString) return "Recent Article";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recent Article";
  }
}

export default function Blogs({ blogData = [] }) {
  const safeBlogs = Array.isArray(blogData) ? blogData : [];
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Derive categories dynamically from Sanity blog data
  const categories = useMemo(() => {
    const unique = new Set(
      safeBlogs
        .map((blog) => blog?.Category?.trim())
        .filter(Boolean)
    );
    return ["All", ...Array.from(unique)];
  }, [safeBlogs]);

  const filteredBlogs = useMemo(() => {
    return safeBlogs.filter((blog) => {
      const matchesCategory =
        activeFilter === "All" ||
        blog?.Category?.toLowerCase() === activeFilter.toLowerCase();
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;
      const titleMatch = blog?.projectName?.toLowerCase().includes(query);
      const categoryMatch = blog?.Category?.toLowerCase().includes(query);
      const tagMatch = blog?.tags?.some((t) => t?.toLowerCase().includes(query));
      const excerptMatch = extractExcerpt(blog).toLowerCase().includes(query);
      return matchesCategory && (titleMatch || categoryMatch || tagMatch || excerptMatch);
    });
  }, [safeBlogs, activeFilter, searchQuery]);

  return (
    <section className="relative min-h-screen pt-28 pb-24 md:pt-36 md:pb-32 selection:bg-accent-primary/30">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10 relative z-10">
        {/* Top Studio HUD Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-black/[0.08] font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981] animate-pulse" />
            <span className="text-[#0F172A] font-semibold">[ ENGINEERING JOURNAL // 05 ]</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{safeBlogs.length} Published Articles</span>
            <span className="text-black/20">•</span>
            <span className="text-emerald-700">System Index Active</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h1 className="font-grotesk text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.05] mb-5">
              Technical Articles &amp;{" "}
              <span className="text-gradient">Engineering Guides.</span>
            </h1>
            <p className="max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed">
              Deep dives into full-stack architecture, headless CMS workflows, React &amp; Astro performance, and production AI systems.
            </p>
          </div>

          {/* Search Input */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="relative w-full lg:max-w-xs">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, tags..."
                aria-label="Search blog articles"
                className="w-full rounded-xl bg-slate-50 border border-black/10 focus:bg-white focus:border-accent-primary/60 focus:outline-none px-4 py-3 pl-10 text-sm text-[#0F172A] placeholder:text-slate-400 transition-colors shadow-2xs"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-6 border-b border-black/[0.08]">
          {categories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`relative px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-[0.06em] transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-700 hover:text-black bg-slate-100 border border-black/[0.08]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeBlogCategoryPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#0F172A] shadow-xs -z-10"
                  />
                )}
                {category === "All" ? "All Articles" : category}
              </button>
            );
          })}
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog, index) => {
              const slug = String(blog?.slug?.current || "").replace(/^\/+|\/+$/g, "");
              const rawImg =
                blog?.FeatureImage?.asset?.url ||
                blog?.BackgroundImage?.asset?.url ||
                blog?.image?.asset?.url ||
                "/img/custom-project.webp";
              const imgUrl = rawImg.includes("cdn.sanity.io")
                ? `${rawImg}${rawImg.includes("?") ? "&" : "?"}auto=format&fit=max&w=900&q=80`
                : rawImg;
              const excerpt = extractExcerpt(blog);
              const dateLabel = formatDate(blog?._createdAt);
              const categoryLabel = blog?.Category || "Engineering";
              const tags = Array.isArray(blog?.tags) ? blog.tags.slice(0, 3) : [];

              return (
                <motion.article
                  key={blog?._id || slug || index}
                  layout
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.05, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-[22px] p-1.5 bg-white border border-black/[0.08] hover:border-accent-primary/40 transition-colors duration-300 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                >
                  <a
                    href={`/blogs/${slug}`}
                    data-cursor-text="READ ARTICLE ↗"
                    className="rounded-[16px] bg-white p-5 md:p-6 h-full flex flex-col justify-between border border-black/[0.05] relative overflow-hidden"
                  >
                    <div>
                      {/* Top Meta Header */}
                      <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[11px] text-slate-500">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-black/10 text-slate-800 font-semibold">
                          {categoryLabel}
                        </span>
                        <span>{dateLabel}</span>
                      </div>

                      {/* Cover Image Frame */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-[#F1F5F9] border border-black/[0.08]">
                        <img
                          src={imgUrl}
                          alt={blog?.projectName || "Article cover"}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
                        />
                        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-black/10 font-mono text-[10px] text-[#0F172A] shadow-2xs font-semibold">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-grotesk text-xl md:text-2xl font-bold text-[#0F172A] group-hover:text-accent-primary transition-colors tracking-[-0.02em] leading-snug mb-3 line-clamp-2">
                        {blog?.projectName || "Untitled Engineering Article"}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
                        {excerpt}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.length > 0 ? (
                          tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-mono text-slate-600 bg-slate-100 border border-black/[0.06] px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] font-mono text-slate-500">
                            5 Min Read
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#0F172A] group-hover:text-accent-primary transition-colors shrink-0">
                        Read Article
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H8M17 7V16"
                          />
                        </svg>
                      </span>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="rounded-2xl border border-black/[0.08] bg-white p-12 text-center my-12 shadow-sm">
            <p className="font-grotesk text-xl font-bold text-[#0F172A] mb-2">
              No Matching Articles Found
            </p>
            <p className="text-sm text-slate-600 mb-6">
              Try clearing your search query or switching back to All Articles.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-mono font-semibold tracking-wider hover:bg-black transition-colors shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
