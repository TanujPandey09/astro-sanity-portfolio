import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// React Bits Inspired Interactive "Squares" Grid Canvas
// Strictly calibrated to Obsidian (#0A0B0E) & Linear Indigo (#5E6AD2 / #828FFF)
function SquaresBackdropCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const squareSize = 48;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let hoveredCell = null;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const startCol = 0;
      const endCol = Math.ceil(width / squareSize);
      const startRow = 0;
      const endRow = Math.ceil(height / squareSize);

      ctx.lineWidth = 1;
      for (let col = startCol; col <= endCol; col++) {
        for (let row = startRow; row <= endRow; row++) {
          const sx = col * squareSize;
          const sy = row * squareSize;

          const seed = Math.abs(Math.sin(col * 12.9898 + row * 78.233) * 43758.5453) % 1;
          if (seed > 0.93) {
            ctx.fillStyle = "rgba(94, 106, 210, 0.05)";
            ctx.fillRect(sx + 1, sy + 1, squareSize - 2, squareSize - 2);
          }

          let nearFactor = 0;
          if (hoveredCell) {
            const cx = sx + squareSize * 0.5;
            const cy = sy + squareSize * 0.5;
            const dist = Math.hypot(cx - hoveredCell.px, cy - hoveredCell.py);
            if (dist < 145) {
              nearFactor = 1 - dist / 145;
            }
          }

          if (nearFactor > 0.04) {
            ctx.fillStyle = `rgba(94, 106, 210, ${(nearFactor * 0.18).toFixed(3)})`;
            ctx.fillRect(sx + 1, sy + 1, squareSize - 2, squareSize - 2);
            ctx.strokeStyle = `rgba(130, 143, 255, ${(0.07 + nearFactor * 0.22).toFixed(3)})`;
          } else {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
          }

          ctx.strokeRect(sx + 0.5, sy + 0.5, squareSize, squareSize);
        }
      }
    };

    const scheduleDraw = () => {
      if (rafId || reduceMotion) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        draw();
      });
    };

    const section = canvas.closest("section");
    const onPointerMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hoveredCell = {
        col: Math.floor(x / squareSize),
        row: Math.floor(y / squareSize),
        px: x,
        py: y,
      };
      scheduleDraw();
    };
    const onPointerLeave = () => {
      hoveredCell = null;
      scheduleDraw();
    };

    const onResize = () => {
      resize();
      draw();
    };

    section?.addEventListener("pointermove", onPointerMove, { passive: true });
    section?.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    resize();
    draw();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      section?.removeEventListener("pointermove", onPointerMove);
      section?.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_15%,rgba(94,106,210,0.16)_0%,transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0B0E] to-transparent" />
    </div>
  );
}

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
    <div className="relative min-h-screen selection:bg-accent-primary/30">
      {/* ACT 1: OBSIDIAN DARK HERO + INTERACTIVE SQUARES GRID */}
      <section className="relative w-full overflow-hidden bg-[#0A0B0E] text-white pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 border-b border-white/[0.08]">
        <SquaresBackdropCanvas />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#828FFF]">
                  ENGINEERING JOURNAL // 01 — {String(safeBlogs.length).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {safeBlogs.length} Published
                </span>
              </div>
              <h1 className="font-grotesk font-extrabold text-[3rem] sm:text-[5rem] md:text-[6.25rem] lg:text-[7rem] text-white tracking-[-0.055em] leading-[0.88] select-none">
                Technical<br />Articles
              </h1>
            </div>

            <div className="max-w-md w-full space-y-5">
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Architecture deep dives, headless CMS workflows, React &amp; Astro optimization patterns, and production AI systems written from real client builds.
              </p>

              {/* Dark Search Bar */}
              <div className="relative w-full">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, tags..."
                  aria-label="Search blog articles"
                  className="w-full rounded-full bg-white/[0.06] border border-white/15 focus:bg-white/[0.1] focus:border-[#828FFF] focus:outline-none px-5 py-3 pl-11 text-sm text-white placeholder:text-slate-400 transition-colors font-sans"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
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

          {/* Interactive Category Filter Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    className={`relative isolate px-4 py-1.5 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#0A0B0E] font-bold"
                        : "text-slate-300 hover:text-white bg-white/[0.06] border border-white/10 hover:bg-white/15"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeBlogCategoryPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-white shadow-xs z-0"
                      />
                    )}
                    <span className="relative z-10">
                      {category === "All" ? `All Articles (${safeBlogs.length})` : category}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono text-slate-400">
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
            </span>
          </div>
        </div>
      </section>

      {/* ACT 2: GALLERY WHITE EDITORIAL READING GRID */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">
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
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
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
              className="px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-mono font-semibold tracking-wider hover:bg-black transition-colors shadow-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
