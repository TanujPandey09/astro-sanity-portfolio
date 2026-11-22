import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export interface HeroProductItem {
  title: string;
  tag: string;
  url: string;
  displayUrl: string;
  imageUrl: string;
  isExternal: boolean;
}

interface Props {
  products: HeroProductItem[];
}

function HeroParallaxStack({ products }: { products: HeroProductItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle vertical parallax strictly capped at <= 24px total travel
  const backFrameY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const mainFrameY = useTransform(scrollYProgress, [0, 1], [6, -6]);
  const frontFrameY = useTransform(scrollYProgress, [0, 1], [12, -10]);

  const primary = products[0];
  const secondary = products[1];
  const tertiary = products[2];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Desktop: 3 Layered Browser Frames at Slight Depth Offsets (Real Sanity Screenshots Only) */}
      <div className="relative pt-4 pb-6 sm:pt-8 sm:pb-12">
        {/* Layer 1 (Back-Right Depth Frame — Product #2 e.g. Omnexia CRM) */}
        {secondary && (
          <motion.a
            href={secondary.url}
            target={secondary.isExternal ? "_blank" : undefined}
            rel={secondary.isExternal ? "noopener noreferrer" : undefined}
            initial={false}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReducedMotion ? undefined : { y: backFrameY }}
            className="hidden sm:block group absolute top-0 right-0 w-[68%] rounded-[16px] bg-white border border-[#E2E8F0] overflow-hidden transition-[box-shadow,border-color] duration-200 hover:border-[#2563EB] hover:shadow-[0_14px_34px_-12px_rgba(11,17,26,0.18)] z-10 hover:z-30"
          >
            <div className="h-8 px-3 bg-[#F5F7FA] border-b border-[#E2E8F0] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
              </div>
              <span className="text-[11px] font-mono text-[#4B5565] truncate">
                {secondary.displayUrl}
              </span>
              <span className="text-[11px] font-mono font-medium text-[#2563EB] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                {secondary.title} ↗
              </span>
            </div>
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F7FA]">
              <img
                src={secondary.imageUrl}
                alt={secondary.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top ns-shot-pan"
              />
            </div>
          </motion.a>
        )}

        {/* Layer 2 (Main Hero Browser Frame — Product #1 e.g. Sawt AI) */}
        <motion.a
          href={primary.url}
          target={primary.isExternal ? "_blank" : undefined}
          rel={primary.isExternal ? "noopener noreferrer" : undefined}
          initial={false}
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={prefersReducedMotion ? undefined : { y: mainFrameY }}
          className="group relative block sm:mt-16 sm:w-[84%] rounded-[16px] bg-white border border-[#E2E8F0] overflow-hidden shadow-[0_10px_28px_-16px_rgba(11,17,26,0.14)] transition-[box-shadow,border-color] duration-200 hover:border-[#2563EB] hover:shadow-[0_16px_36px_-12px_rgba(11,17,26,0.18)] z-20"
        >
          <div className="h-9 px-3.5 bg-[#F5F7FA] border-b border-[#E2E8F0] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
            </div>
            <span className="text-[11px] font-mono text-[#4B5565] truncate max-w-[200px]">
              {primary.displayUrl}
            </span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-mono font-medium text-[#2563EB] shrink-0">
              <span>View</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </span>
          </div>

          <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F7FA]">
            <img
              src={primary.imageUrl}
              alt={primary.title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top ns-shot-pan"
            />
          </div>

          <div className="px-4 py-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
              <span className="font-semibold text-sm text-[#0B111A] group-hover:text-[#2563EB] transition-colors truncate">
                {primary.title}
              </span>
            </div>
            <span className="text-xs font-mono text-[#4B5565] truncate">
              {primary.tag}
            </span>
          </div>
        </motion.a>

        {/* Layer 3 (Front Bottom-Right Browser Frame — Product #3 e.g. CxiSuite / Paperfloow) */}
        {tertiary && (
          <motion.a
            href={tertiary.url}
            target={tertiary.isExternal ? "_blank" : undefined}
            rel={tertiary.isExternal ? "noopener noreferrer" : undefined}
            initial={false}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReducedMotion ? undefined : { y: frontFrameY }}
            className="hidden sm:block group relative -mt-14 ml-auto w-[58%] rounded-[16px] bg-white border border-[#E2E8F0] overflow-hidden shadow-[0_14px_34px_-16px_rgba(11,17,26,0.18)] transition-[box-shadow,border-color] duration-200 hover:border-[#2563EB] hover:shadow-[0_16px_36px_-12px_rgba(11,17,26,0.2)] z-30"
          >
            <div className="h-7 px-3 bg-[#F5F7FA] border-b border-[#E2E8F0] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
              </div>
              <span className="text-[11px] font-mono text-[#4B5565] truncate">
                {tertiary.title}
              </span>
              <span className="text-[11px] font-mono text-[#2563EB] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </div>
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F7FA]">
              <img
                src={tertiary.imageUrl}
                alt={tertiary.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top ns-shot-pan"
              />
            </div>
          </motion.a>
        )}

        {/* Mobile Compact Grid for Products #2 & #3 */}
        {(secondary || tertiary) && (
          <div className="grid grid-cols-2 gap-3 mt-3 sm:hidden">
            {[secondary, tertiary].filter(Boolean).map((item) => (
              <a
                key={item!.title}
                href={item!.url}
                className="block rounded-[16px] bg-white border border-[#E2E8F0] overflow-hidden"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F7FA]">
                  <img
                    src={item!.imageUrl}
                    alt={item!.title}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="px-3 py-2 border-t border-[#E2E8F0]">
                  <span className="font-semibold text-xs text-[#0B111A] block truncate">
                    {item!.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroProductShowcase({ products }: Props) {
  if (!products || products.length === 0) return null;
  return <HeroParallaxStack products={products} />;
}
