"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Palette,
  Zap,
  Rocket,
  Inbox,
  Bot,
  Bell,
  Layers,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const easeCurve = [0.16, 1, 0.3, 1] as const;

type ServiceKey = "websites" | "ai" | "tools";

interface ServiceConfig {
  num: string;
  label: string;
  sub: string;
  angle: number;
  headline: string;
  summary: string;
  ctaText: string;
  formTarget: string;
  steps: {
    id: number;
    title: string;
    detail: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const servicesData: Record<ServiceKey, ServiceConfig> = {
  websites: {
    num: "01",
    label: "Websites & Apps",
    sub: "Modern sites, portals & MVPs",
    angle: -36,
    headline: "Build a high-impact website.",
    summary: "Custom websites designed to turn visitors into paying clients.",
    ctaText: "Build your website ↗",
    formTarget: "Website",
    steps: [
      {
        id: 1,
        title: "Design",
        detail: "Clean, luxury UI tailored to your brand",
        icon: Palette,
      },
      {
        id: 2,
        title: "Develop",
        detail: "60fps fast, mobile-friendly & secure",
        icon: Zap,
      },
      {
        id: 3,
        title: "Launch",
        detail: "Deployed live online, ready for clients",
        icon: Rocket,
      },
    ],
  },
  ai: {
    num: "02",
    label: "AI & Automations",
    sub: "WhatsApp bots & auto workflows",
    angle: 0,
    headline: "Automate your daily enquiries.",
    summary: "Never miss a client. Let AI handle intake 24/7 while you focus on business.",
    ctaText: "Automate your workflow ↗",
    formTarget: "AI automation",
    steps: [
      {
        id: 1,
        title: "Capture",
        detail: "Leads arrive from WhatsApp, Form or Email",
        icon: Inbox,
      },
      {
        id: 2,
        title: "AI Process",
        detail: "Auto-categorized & instant response drafted",
        icon: Bot,
      },
      {
        id: 3,
        title: "Notify",
        detail: "Ready lead sent straight to your phone",
        icon: Bell,
      },
    ],
  },
  tools: {
    num: "03",
    label: "Custom Software",
    sub: "Dashboards, portals & team tools",
    angle: 36,
    headline: "Run your business with custom tools.",
    summary: "Replace messy spreadsheets with a fast, private software built for your team.",
    ctaText: "Build custom software ↗",
    formTarget: "Custom app",
    steps: [
      {
        id: 1,
        title: "Centralize",
        detail: "Bring team data, attendance & orders together",
        icon: Layers,
      },
      {
        id: 2,
        title: "Manage",
        detail: "Clean dashboard with role access & live stats",
        icon: LayoutDashboard,
      },
      {
        id: 3,
        title: "Scale",
        detail: "1-click reports, payroll & zero spreadsheets",
        icon: TrendingUp,
      },
    ],
  },
};

export default function StudioSection() {
  const [activeTab, setActiveTab] = useState<ServiceKey>("ai");

  const cycleTab = () => {
    if (activeTab === "websites") setActiveTab("ai");
    else if (activeTab === "ai") setActiveTab("tools");
    else setActiveTab("websites");
  };

  const handleCtaClick = (targetService: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-service", { detail: targetService })
      );
    }
    const plannerEl = document.getElementById("planner");
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const contactInput = document.getElementById("client-contact");
        if (contactInput) {
          contactInput.focus();
        }
      }, 550);
    }
  };

  const currentService = servicesData[activeTab];

  return (
    <section
      id="studio"
      className="w-full bg-[#181B46] text-[#FAF5EF] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-16 scroll-mt-20 overflow-hidden"
    >
      {/* Anchor for #services navigation */}
      <div id="services" className="scroll-mt-24" />

      <div className="max-w-7xl mx-auto w-full">
        {/* ========================================================
            TOP BAR: 02 / SERVICES
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="flex items-center mb-6 sm:mb-8 md:mb-10"
        >
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-[#FAF5EF]/70 uppercase font-semibold">
            02 / SERVICES
          </p>
        </motion.div>

        {/* ========================================================
            MAIN HEADING: See what clicks.
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easeCurve, delay: 0.1 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-5xl sm:text-6xl md:text-[68px] lg:text-[76px] font-bold text-white tracking-tight leading-[1.04] mb-3 font-manrope">
            See what{" "}
            <span className="font-cormorant font-medium italic text-white inline-block">
              clicks.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#FAF5EF]/85 font-normal leading-relaxed font-manrope">
            Pick a service. Try a real-world example.
          </p>
        </motion.div>

        {/* ========================================================
            DESKTOP / TABLET CONSOLE CHASSIS (>= 768px)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: easeCurve }}
          className="hidden md:block relative w-full max-w-[1040px] mx-auto select-none"
        >
          {/* Continuous Master Artwork Asset with Clean Socket */}
          <div className="relative aspect-[967/380] w-full overflow-hidden shadow-2xl rounded-[8px]">
            <Image
              src="/images/service-console-clean.webp"
              alt="StackBros Interactive Service Console"
              fill
              priority
              quality={95}
              sizes="(max-width: 1040px) 100vw, 1040px"
              className="object-cover object-center pointer-events-none"
            />

            {/* ====================================================
                ROTATING BRASS KNOB DIAL
                Exact pixel center: 16.60%, 55.58%
                Exact pixel diameter: 18.20%
               ==================================================== */}
            <div
              className="absolute pointer-events-none z-10"
              style={{
                left: "16.60%",
                top: "55.58%",
                width: "18.20%",
                aspectRatio: "1/1",
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.button
                type="button"
                onClick={cycleTab}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full h-full rounded-full cursor-pointer pointer-events-auto relative focus:outline-none drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)]"
                title="Click dial to rotate & switch service"
                aria-label="Rotate Service Dial Knob"
              >
                <motion.div
                  animate={{ rotate: currentService.angle }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="w-full h-full rounded-full relative"
                >
                  <Image
                    src="/images/console-knob-dial.png"
                    alt="Rotary Knob Dial"
                    fill
                    priority
                    sizes="200px"
                    className="object-contain pointer-events-none"
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Rotary Position Indicator LEDs */}
            <div
              onClick={() => setActiveTab("websites")}
              className="absolute left-[8.2%] top-[39.5%] w-[3.5%] h-[5.5%] cursor-pointer pointer-events-auto flex items-center justify-center"
              title="Select 01 Websites & Apps"
            >
              {activeTab === "websites" && (
                <motion.span
                  layoutId="dialLed"
                  className="w-2.5 h-2.5 rounded-full bg-[#E4CDA3] shadow-[0_0_10px_#E4CDA3]"
                />
              )}
            </div>
            <div
              onClick={() => setActiveTab("ai")}
              className="absolute left-[8.2%] top-[51.0%] w-[3.5%] h-[5.5%] cursor-pointer pointer-events-auto flex items-center justify-center"
              title="Select 02 AI & Automations"
            >
              {activeTab === "ai" && (
                <motion.span
                  layoutId="dialLed"
                  className="w-2.5 h-2.5 rounded-full bg-[#E4CDA3] shadow-[0_0_10px_#E4CDA3]"
                />
              )}
            </div>
            <div
              onClick={() => setActiveTab("tools")}
              className="absolute left-[8.2%] top-[62.5%] w-[3.5%] h-[5.5%] cursor-pointer pointer-events-auto flex items-center justify-center"
              title="Select 03 Custom Software"
            >
              {activeTab === "tools" && (
                <motion.span
                  layoutId="dialLed"
                  className="w-2.5 h-2.5 rounded-full bg-[#E4CDA3] shadow-[0_0_10px_#E4CDA3]"
                />
              )}
            </div>

            {/* ====================================================
                INTERACTIVE SERVICES LIST (Middle Section)
               ==================================================== */}
            {/* Service 01: Websites & Apps */}
            <button
              type="button"
              onClick={() => setActiveTab("websites")}
              className="absolute top-[30.5%] left-[26.5%] w-[23.5%] h-[16.5%] cursor-pointer pointer-events-auto group focus:outline-none text-left"
              title="Select Websites & Apps"
              aria-label="Websites & Apps"
            >
              {activeTab === "websites" && (
                <motion.div
                  layoutId="activeServiceHighlight"
                  className="absolute inset-0 bg-[#E4CDA3]/12 border border-[#E4CDA3]/45 rounded-[6px] shadow-[0_0_16px_rgba(228,205,163,0.18)] pointer-events-none"
                />
              )}
            </button>

            {/* Service 02: AI & Automations */}
            <button
              type="button"
              onClick={() => setActiveTab("ai")}
              className="absolute top-[48.0%] left-[26.5%] w-[23.5%] h-[16.5%] cursor-pointer pointer-events-auto group focus:outline-none text-left"
              title="Select AI & Automations"
              aria-label="AI & Automations"
            >
              {activeTab === "ai" && (
                <motion.div
                  layoutId="activeServiceHighlight"
                  className="absolute inset-0 bg-[#E4CDA3]/12 border border-[#E4CDA3]/45 rounded-[6px] shadow-[0_0_16px_rgba(228,205,163,0.18)] pointer-events-none"
                />
              )}
            </button>

            {/* Service 03: Custom Software */}
            <button
              type="button"
              onClick={() => setActiveTab("tools")}
              className="absolute top-[65.5%] left-[26.5%] w-[23.5%] h-[16.5%] cursor-pointer pointer-events-auto group focus:outline-none text-left"
              title="Select Custom Software"
              aria-label="Custom Software"
            >
              {activeTab === "tools" && (
                <motion.div
                  layoutId="activeServiceHighlight"
                  className="absolute inset-0 bg-[#E4CDA3]/12 border border-[#E4CDA3]/45 rounded-[6px] shadow-[0_0_16px_rgba(228,205,163,0.18)] pointer-events-none"
                />
              )}
            </button>

            {/* ====================================================
                FLUSH-FIT DYNAMIC WORKFLOW SCREEN
               ==================================================== */}
            <div
              className="absolute pointer-events-auto overflow-hidden rounded-[16px] bg-[#FAF5EF] text-[#181B46] p-5 sm:p-6 lg:p-7 flex flex-col justify-between shadow-inner z-10"
              style={{
                left: "52.5%",
                top: "23.16%",
                width: "43.44%",
                height: "60.95%",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: easeCurve }}
                  className="flex flex-col justify-between h-full"
                >
                  {/* Screen Header */}
                  <div>
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#181B46]/15">
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] font-semibold text-[#181B46]/75 uppercase">
                        WORKFLOW PREVIEW · {currentService.num}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        ACTIVE CHANNEL
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-2xl lg:text-[27px] font-bold text-[#181B46] font-manrope tracking-tight leading-tight mb-1">
                      {currentService.headline}
                    </h3>
                  </div>

                  {/* 3 Simple Steps */}
                  <div className="my-auto py-1 sm:py-2">
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                      {currentService.steps.map((step, idx) => {
                        const Icon = step.icon;

                        return (
                          <div key={step.id} className="flex-1 flex items-center">
                            <div className="flex-1 flex flex-col items-center justify-center py-2.5 px-1.5 rounded-[6px] border border-[#181B46]/20 bg-white/85 text-[#181B46] text-center shadow-xs transition-all hover:border-[#181B46] hover:shadow-sm">
                              <div className="w-7 h-7 rounded-full bg-[#181B46]/8 flex items-center justify-center mb-1 text-[#181B46]">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[11px] sm:text-xs font-bold font-manrope tracking-tight leading-tight block">
                                {step.title}
                              </span>
                              <span className="text-[9.5px] sm:text-[10px] text-[#181B46]/70 font-manrope leading-tight line-clamp-1 mt-0.5 hidden lg:block">
                                {step.detail}
                              </span>
                            </div>

                            {/* Connecting Line between steps */}
                            {idx < currentService.steps.length - 1 && (
                              <div className="w-3 sm:w-4 h-0.5 bg-[#181B46]/25 mx-1" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer & Direct Action CTA Button */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] sm:text-xs text-[#181B46]/80 font-manrope leading-snug line-clamp-1">
                      {currentService.summary}
                    </p>

                    <div className="flex items-center justify-between pt-0.5">
                      {/* Dynamic Direct Form CTA Button */}
                      <motion.button
                        type="button"
                        onClick={() => handleCtaClick(currentService.formTarget)}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2.5 bg-[#181B46] text-[#FAF5EF] text-xs font-bold font-manrope rounded-[4px] inline-flex items-center gap-2 shadow-sm hover:bg-[#181B46]/90 transition-all cursor-pointer group"
                        title="Click to start this project"
                      >
                        <span>{currentService.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E4CDA3]" />
                      </motion.button>

                      {/* Small Subtitle Shortcut */}
                      <button
                        type="button"
                        onClick={() => handleCtaClick(currentService.formTarget)}
                        className="text-[11px] font-mono font-semibold text-[#181B46]/70 hover:text-[#181B46] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>⚡ 30-sec brief</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            MOBILE TAILORED CONSOLE VIEW (< 768px)
           ======================================================== */}
        <div className="md:hidden space-y-5">
          {/* Mobile Rotary Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {(["websites", "ai", "tools"] as const).map((tab) => {
              const item = servicesData[tab];
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`p-3 rounded-[6px] border text-left transition-all ${
                    isSelected
                      ? "bg-[#E4CDA3]/15 border-[#E4CDA3] text-white shadow-sm"
                      : "bg-white/5 border-white/10 text-white/70"
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#E4CDA3] block font-semibold mb-0.5">
                    {item.num}
                  </span>
                  <span className="text-xs font-bold font-manrope block leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workflow Preview Screen Card */}
          <div className="bg-[#FAF5EF] text-[#181B46] p-5 rounded-[6px] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#181B46]/10">
              <span className="text-[10px] font-mono tracking-[0.2em] font-semibold text-[#181B46] uppercase">
                WORKFLOW PREVIEW · {currentService.num}
              </span>
              <span className="text-[10px] font-mono font-semibold text-emerald-700">ACTIVE</span>
            </div>

            <h4 className="text-xl font-bold font-manrope text-[#181B46]">
              {currentService.headline}
            </h4>

            {/* 3 Step Pipeline */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#181B46]/10 text-center">
              {currentService.steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="p-2.5 rounded-[4px] border border-[#181B46]/15 bg-white/75 text-[#181B46] flex flex-col items-center justify-center gap-1"
                  >
                    <Icon className="w-4 h-4 text-[#181B46]" />
                    <span className="text-[11px] font-bold font-manrope">{step.title}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#181B46]/80 font-manrope leading-relaxed">
              {currentService.summary}
            </p>

            <motion.button
              type="button"
              onClick={() => handleCtaClick(currentService.formTarget)}
              whileTap={{ scale: 0.96 }}
              className="w-full py-3 bg-[#181B46] text-[#FAF5EF] font-semibold text-xs rounded-[4px] flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
            >
              <span>{currentService.ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E4CDA3]" />
            </motion.button>
          </div>
        </div>

        {/* ========================================================
            BOTTOM RIGHT ACTION LINK: Plan a project ↗
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="flex justify-end mt-6 sm:mt-8"
        >
          <button
            type="button"
            onClick={() => handleCtaClick(currentService.formTarget)}
            className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#FAF5EF] hover:text-[#E4CDA3] transition-colors underline underline-offset-4 font-manrope cursor-pointer"
          >
            <span>Have a project in mind? Let&apos;s build it</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
