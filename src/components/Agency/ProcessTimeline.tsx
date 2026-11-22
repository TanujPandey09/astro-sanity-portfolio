import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

export interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  summary: string;
  description: string;
  deliverable: string;
}

interface Props {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 70%"],
  });

  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div ref={railRef} className="relative">
      {/* 1px Vertical Track Rail (--border) + Blue Scroll-Driven Fill (#2563EB) */}
      <div
        className="hidden sm:block absolute left-[19px] top-6 bottom-6 w-px bg-[#E2E8F0]"
        aria-hidden="true"
      >
        <motion.div
          initial={false}
          style={{
            scaleY: prefersReducedMotion ? 1 : smoothScaleY,
            transformOrigin: "top",
          }}
          className="w-full h-full bg-[#2563EB]"
        />
      </div>

      <ol className="space-y-6">
        {steps.map((item) => (
          <li key={item.step} className="relative sm:pl-16 ns-reveal">
            {/* Blue Numbered Timeline Marker (01–05) */}
            <div className="hidden sm:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-white border border-[#2563EB] text-[#2563EB] font-mono font-semibold text-xs items-center justify-center z-10">
              {item.step}
            </div>

            {/* Step Card */}
            <div className="ns-card p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="sm:hidden inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#EAF1FE] text-[#1D4ED8] font-mono text-xs font-semibold">
                    {item.step}
                  </span>
                  <span className="ns-mono-label text-[#2563EB] font-medium">
                    Step {item.step} · {item.phase}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F5F7FA] border border-[#E2E8F0] text-xs font-mono text-[#4B5565]">
                  Milestone Gate
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B111A] tracking-[-0.02em] mb-2">
                {item.title}
                <span className="font-normal text-[#4B5565]">
                  {" "}
                  — {item.summary}
                </span>
              </h3>

              <p className="text-base leading-[1.65] text-[#4B5565] mb-5">
                {item.description}
              </p>

              {/* Mono Deliverable Chip */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-2 rounded-[12px] bg-[#F5F7FA] border border-[#E2E8F0] text-[13px] font-mono">
                <span className="text-[#2563EB] font-semibold uppercase tracking-[0.06em]">
                  Deliverable:
                </span>
                <span className="text-[#0B111A] font-sans text-sm font-medium">
                  {item.deliverable}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
