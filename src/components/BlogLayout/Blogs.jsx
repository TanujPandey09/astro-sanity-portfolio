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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-white/[0.08] font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981] animate-pulse" />
            <span className="text-[#F8FAFC] font-semibold">[ ENGINEERING JOURNAL // 05 ]</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{safeBlogs.length} Published Articles</span>
            <span className="text-white/20">•</span>
            <span className="text-[#10B981]">System Index Active</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h1 className="font-grotesk text-4xl sm:text-5xl md:text-6xl font-bold text-[#F4F2ED] tracking-[-0.03em] leading-[1.05] mb-5">
              Technical Articles &amp;{" "}
              <span className="text-gradient">Engineering Guides.</span>
            </h1>
            <p className="max-w-2xl text-[#9A9A9E] text-base md:text-lg leading-relaxed">
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
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.1] focus:border-accent-primary/60 focus:outline-none px-4 py-3 pl-10 text-sm text-text-primary placeholder:text-text-dim transition-colors"
              />
              <svg
                className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-6 border-b border-white/[0.08]">
          {categories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`relative px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-[0.06em] transition-colors ${
                  isActive
                    ? "text-[#0B0F17]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] bg-white/[0.04] border border-white/[0.08]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeBlogCategoryPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)] -z-10"
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
                  className="group relative rounded-[22px] p-1.5 bg-[#111726] border border-white/[0.10] hover:border-white/30 transition-colors duration-300 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  <a
                    href={`/blogs/${slug}`}
                    className="rounded-[16px] bg-[#111726] p-5 md:p-6 h-full flex flex-col justify-between border border-white/[0.05] relative overflow-hidden"
                  >
                    <div>
                      {/* Top Meta Header */}
                      <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[11px] text-[#94A3B8]">
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[#F8FAFC] font-semibold">
                          {categoryLabel}
                        </span>
                        <span>{dateLabel}</span>
                      </div>

                      {/* Cover Image Frame */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-[#0B0F17] border border-white/[0.08]">
                        <img
                          src={imgUrl}
                          alt={blog?.projectName || "Article cover"}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-grotesk text-xl md:text-2xl font-bold text-[#F4F2ED] group-hover:text-white transition-colors tracking-[-0.02em] leading-snug mb-3 line-clamp-2">
                        {blog?.projectName || "Untitled Engineering Article"}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-[#9A9A9E] leading-relaxed line-clamp-3 mb-5">
                        {excerpt}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.length > 0 ? (
                          tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-mono text-[#7D7D83] bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] font-mono text-[#7D7D83]">
                            5 Min Read
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#F8FAFC] group-hover:text-accent-primary transition-colors shrink-0">
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
          <div className="rounded-2xl border border-white/[0.08] bg-surface-card/70 p-12 text-center my-12">
            <p className="font-grotesk text-xl font-bold text-text-primary mb-2">
              No Matching Articles Found
            </p>
            <p className="text-sm text-text-muted mb-6">
              Try clearing your search query or switching back to All Articles.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-accent-primary text-white text-xs font-mono font-semibold tracking-wider hover:bg-accent-hover transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
