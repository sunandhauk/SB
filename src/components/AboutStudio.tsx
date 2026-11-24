"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function AboutStudio() {
  return (
    <section
      id="about"
      className="w-full bg-[#FAF5EF] text-[#181B46] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================
              LEFT COLUMN (7 cols): EDITORIAL STORY
             ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="max-w-xl w-full">
              {/* Eyebrow Label with Connected Thin Horizontal Rule */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: easeCurve }}
                className="flex items-center gap-4 mb-6 sm:mb-8"
              >
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-[#181B46] font-semibold uppercase whitespace-nowrap">
                  03 / ABOUT STACKBROS
                </span>
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: easeCurve, delay: 0.2 }}
                  className="h-px bg-[#181B46]/30 flex-1"
                />
              </motion.div>

              {/* Main Section Heading: Good software starts with listening. */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: easeCurve, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] font-bold text-[#181B46] tracking-tight leading-[1.08] mb-5 sm:mb-6 font-manrope"
              >
                Good software
                <br />
                <span className="font-cormorant font-medium italic text-[#181B46] inline-block">
                  starts with listening.
                </span>
              </motion.h2>

              {/* Studio Introduction Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: easeCurve, delay: 0.2 }}
                className="text-base sm:text-lg md:text-[17px] text-[#181B46]/85 font-normal leading-relaxed font-manrope mb-8 sm:mb-10 max-w-lg"
              >
                We’re StackBros, an independent software and AI automation studio.
                We build websites, apps and tools around the people who use them.
              </motion.p>

              {/* Warm Gold Accent Divider Bar (Self-drawing line) */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeCurve, delay: 0.25 }}
                className="w-24 h-[3px] bg-[#B58D55] mb-5 sm:mb-6"
              />

              {/* Standout Conversation Eyebrow */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#181B46] font-bold uppercase mb-2.5 sm:mb-3"
              >
                THE FIRST CONVERSATION
              </motion.p>

              {/* Primary Quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeCurve, delay: 0.35 }}
                className="font-cormorant text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#181B46] leading-snug tracking-tight mb-4 sm:mb-5"
              >
                “Walk us through the part of
                <br className="hidden sm:inline" /> your day you wish ran better.”
              </motion.blockquote>

              {/* Quote Follow-up Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeCurve, delay: 0.4 }}
                className="text-sm sm:text-base text-[#181B46]/80 font-normal leading-relaxed font-manrope max-w-lg"
              >
                We turn that conversation into a brief you can review and a working
                version you can try.
              </motion.p>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN (5 cols): 3-STEP PROCESS ARTWORK
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: easeCurve, delay: 0.2 }}
            className="lg:col-span-5 relative w-full aspect-[447/576] max-w-md mx-auto lg:max-w-none shadow-2xl overflow-hidden rounded-[2px]"
          >
            {/* Subtle Ambient Breathing Float */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/about-process-rope-2x.webp"
                alt="StackBros 3-Step Process: 01 Listen, 02 Make, 03 Refine"
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
