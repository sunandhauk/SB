"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  MessageSquare,
  Sparkles,
  RotateCcw,
  Clock,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function ProjectPlannerSection() {
  const [selectedService, setSelectedService] = useState("Website");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [idea, setIdea] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("SB-8429");
  const [contactError, setContactError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const openProjectBrief = () => {
    setFormOpen(true);
  };

  const closeProjectBrief = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    const handleServiceSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedService(customEvent.detail);
      }
    };
    const openForm = () => setFormOpen(true);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFormOpen(false);
      }
    };
    window.addEventListener("select-service", handleServiceSelect);
    window.addEventListener("open-project-form", openForm);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("select-service", handleServiceSelect);
      window.removeEventListener("open-project-form", openForm);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (formOpen || submitted) return;
    const autoOpenTimer = window.setTimeout(() => setFormOpen(true), 10_000);
    return () => window.clearTimeout(autoOpenTimer);
  }, [formOpen, submitted]);

  useEffect(() => {
    if (!formOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(
      () => document.querySelector<HTMLInputElement>(".project-form-modal #client-contact")?.focus(),
      240
    );
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [formOpen]);

  const services = [
    "Website",
    "Custom app",
    "AI automation",
    "AI assistant",
    "Other idea",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!contact.trim()) {
      setContactError(true);
      const input = formOpen
        ? document.querySelector<HTMLInputElement>(".project-form-modal #client-contact")
        : document.getElementById("inline-client-contact");
      if (input) input.focus();
      return;
    }

    setContactError(false);
    setIsSubmitting(true);

    const generatedTicket = `SB-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(generatedTicket);

    const isEmail = contact.includes("@");
    const phoneValue = !isEmail ? contact.trim() : "";
    const emailValue = isEmail ? contact.trim() : "";

    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: generatedTicket,
          name: name.trim() || "Valued Client",
          phone: phoneValue,
          email: emailValue,
          selectedService,
          idea:
            idea.trim() ||
            `Client requested a project discussion regarding ${selectedService}.`,
        }),
      });
    } catch (err) {
      console.error("Submission error:", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setContact("");
    setIdea("");
  };

  return (
    <section
      id="planner"
      className="w-full bg-[#181B46] text-[#FAF5EF] pt-16 sm:pt-20 md:pt-24 pb-0 px-4 sm:px-6 md:px-12 lg:px-16 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ========================================================
              LEFT COLUMN: EDITORIAL INTRO
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: easeCurve }}
                className="flex items-center gap-4 mb-6 sm:mb-8"
              >
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-[#E4CDA3] uppercase font-bold whitespace-nowrap">
                  04 / PROJECT BRIEF
                </span>
                <div className="h-px bg-[#B58D55] flex-1" />
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: easeCurve, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-[60px] font-bold text-white tracking-tight leading-[1.06] mb-6 sm:mb-8 font-manrope"
              >
                Start with
                <br />
                <span className="font-cormorant font-medium italic text-white inline-block">
                  a rough idea.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: easeCurve, delay: 0.2 }}
                className="text-base sm:text-lg text-[#FAF5EF]/85 font-normal leading-relaxed max-w-sm font-manrope mb-8"
              >
                A quick 30-second brief. Tell us what you want to build and how to reach you — we review and get back within 2 hours.
              </motion.p>

              {/* Guarantees */}
              <div className="space-y-3 pt-2 mb-8 text-xs font-mono text-[#FAF5EF]/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#B58D55]/20 flex items-center justify-center text-[#E4CDA3]">
                    <Clock className="w-3 h-3" />
                  </div>
                  <span>Response time: Under 2 business hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#B58D55]/20 flex items-center justify-center text-[#E4CDA3]">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <span>100% Confidential • Direct to studio team</span>
                </div>
              </div>
              <button
                type="button"
                onClick={openProjectBrief}
                className="inline-flex items-center gap-2 rounded-full bg-[#FAF5EF] px-5 py-3 text-sm font-bold text-[#181B46] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Start a 30-sec brief <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative mt-auto aspect-[385/220] w-[220px] sm:w-[280px] lg:w-full lg:max-w-[340px] select-none pointer-events-none">
              <Image
                src="/images/enquiry-paper-airplane-cutout.webp"
                alt=""
                fill
                unoptimized
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
                className="object-contain object-left-bottom mix-blend-lighten"
              />
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeCurve, delay: 0.12 }}
            className="lg:col-span-7 flex items-center"
          >
            <div className="w-full rounded-[10px] border border-[#E4CDA3]/60 bg-[#FAF5EF] p-5 text-[#181B46] shadow-[0_20px_60px_rgba(5,8,30,0.2)] sm:p-8 md:p-10">
              {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#181B46]/10 pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#B58D55] sm:text-[11px]">
                      STACKBROS / QUICK DESK
                    </span>
                    <h3 className="mt-0.5 font-manrope text-2xl font-bold tracking-tight text-[#181B46] sm:text-3xl">
                      Let&apos;s talk about your idea
                    </h3>
                  </div>
                  <span className="hidden shrink-0 rounded bg-[#181B46] px-2.5 py-1 text-xs font-bold text-[#FAF5EF] sm:inline-block">
                    <Zap className="mr-1 inline h-3 w-3 text-[#E4CDA3]" /> 30-SEC BRIEF
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#181B46]">
                    1. What do you need?
                  </label>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`rounded-[4px] border px-3.5 py-2 font-manrope text-xs font-semibold transition-all sm:text-[13px] ${
                          selectedService === service
                            ? "border-[#181B46] bg-[#181B46] text-[#FAF5EF] shadow-md"
                            : "border-[#181B46]/25 bg-white text-[#181B46] hover:border-[#181B46]"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="inline-client-name" className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#181B46]">
                      2. Your name
                    </label>
                    <input
                      id="inline-client-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-[4px] border border-[#181B46]/30 bg-white px-3.5 py-2.5 font-manrope text-sm text-[#181B46] transition-all placeholder:text-[#181B46]/35 focus:border-[#181B46] focus:outline-none focus:ring-1 focus:ring-[#181B46]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="inline-client-contact" className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#181B46]">
                      3. WhatsApp or Email <span className="font-bold text-red-500">*</span>
                    </label>
                    <input
                      id="inline-client-contact"
                      type="text"
                      value={contact}
                      onChange={(event) => {
                        setContact(event.target.value);
                        if (contactError) setContactError(false);
                      }}
                      placeholder="+91 98765 43210 or email"
                      aria-invalid={contactError}
                      className={`w-full rounded-[4px] border bg-white px-3.5 py-2.5 font-manrope text-sm text-[#181B46] transition-all placeholder:text-[#181B46]/35 focus:outline-none focus:ring-1 ${
                        contactError
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-[#181B46]/30 focus:border-[#181B46] focus:ring-[#181B46]"
                      }`}
                    />
                  </div>
                </div>
                {contactError && (
                  <p className="-mt-2 font-manrope text-xs font-medium text-red-600">
                    Please provide your WhatsApp number or email address so we can reply.
                  </p>
                )}

                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="inline-client-idea" className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#181B46]">
                      4. Quick details (Optional)
                    </label>
                    <span className="font-manrope text-[11px] text-[#181B46]/50">Optional</span>
                  </div>
                  <input
                    id="inline-client-idea"
                    type="text"
                    value={idea}
                    onChange={(event) => setIdea(event.target.value)}
                    placeholder="e.g. Need a modern website redesign with smooth animations"
                    className="w-full rounded-[4px] border border-[#181B46]/30 bg-white px-3.5 py-2.5 font-manrope text-sm text-[#181B46] transition-all placeholder:text-[#181B46]/35 focus:border-[#181B46] focus:outline-none focus:ring-1 focus:ring-[#181B46]"
                  />
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.015, y: isSubmitting ? 0 : -2 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#181B46] py-3.5 font-manrope text-sm font-bold text-[#FAF5EF] shadow-md transition-all hover:bg-[#252b66] hover:shadow-xl disabled:opacity-75 sm:py-4 sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending brief...
                      </span>
                    ) : (
                      <>
                        <span>Send project brief</span>
                        <ArrowUpRight className="h-4 w-4 text-[#E4CDA3]" />
                      </>
                    )}
                  </motion.button>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#181B46]/10 pt-3 font-mono text-[11px] text-[#181B46]/60">
                    <span>Direct delivery: stackbros.work@gmail.com</span>
                    <a
                      href="https://wa.me/919003248656?text=Hi%20StackBros%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-semibold underline underline-offset-2 transition-colors hover:text-[#181B46]"
                    >
                      <MessageSquare className="h-3 w-3 text-emerald-600" />
                      <span>Prefer WhatsApp? Chat now</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </form>
              ) : (
                <div className="py-2">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#181B46] px-3.5 py-1.5 font-mono text-xs font-bold text-[#FAF5EF] shadow-sm">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>BRIEF LOGGED - TICKET #{ticketNumber}</span>
                  </div>
                  <h3 className="mb-3 font-manrope text-3xl font-bold tracking-tight text-[#181B46] sm:text-4xl">
                    Thanks for reaching out{name ? `, ${name}` : ""}!
                  </h3>
                  <p className="mb-6 font-manrope text-base leading-relaxed text-[#181B46]/85 sm:text-lg">
                    We received your project brief about <strong>{selectedService}</strong>. Our team will reply within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-[4px] border border-[#181B46]/25 bg-white px-5 py-3.5 font-manrope text-sm font-semibold text-[#181B46] transition-colors hover:bg-[#181B46]/5"
                  >
                    <RotateCcw className="h-4 w-4" /> Send another message
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* ========================================================
              POPUP: SHORT PROJECT BRIEF FORM
             ======================================================== */}
          {typeof document !== "undefined" && createPortal(
            <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) closeProjectBrief();
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Let's talk about your idea"
                className="project-form-overlay"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: easeCurve }}
                  className="project-form-modal"
                >
                  <button
                    type="button"
                    onClick={closeProjectBrief}
                    aria-label="Close project brief form"
                    className="project-form-modal__close"
                  >
                    <X size={20} />
                  </button>
                  <div className="relative bg-[#FAF5EF] text-[#181B46] p-5 sm:p-8 md:p-10 rounded-[10px] shadow-2xl">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* ========================================================
                      SHORT & SIMPLE FORM
                     ======================================================== */
                  <motion.form
                    key="short-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 pb-3 pr-10 border-b border-[#181B46]/10">
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#B58D55] uppercase font-bold">
                          STACKBROS / QUICK DESK
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#181B46] tracking-tight font-manrope mt-0.5">
                          Let&apos;s talk about your idea
                        </h3>
                      </div>
                      <span className="text-xs font-mono bg-[#181B46] text-[#FAF5EF] px-2.5 py-1 rounded font-bold hidden sm:inline-block">
                        ⚡ 30-SEC BRIEF
                      </span>
                    </div>

                    {/* 1. Service Selection Pills */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#181B46] font-manrope uppercase tracking-wider">
                        1. What do you need?
                      </label>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {services.map((service) => {
                          const isSelected = selectedService === service;
                          return (
                            <motion.button
                              key={service}
                              type="button"
                              whileHover={{ scale: 1.03, y: -1 }}
                              whileTap={{ scale: 0.96 }}
                              transition={{ type: "spring", stiffness: 450, damping: 25 }}
                              onClick={() => setSelectedService(service)}
                              className={`px-3.5 py-2 rounded-[4px] text-xs sm:text-[13px] font-semibold transition-all cursor-pointer font-manrope ${
                                isSelected
                                  ? "bg-[#181B46] text-[#FAF5EF] shadow-md border border-[#181B46]"
                                  : "bg-white text-[#181B46] border border-[#181B46]/25 hover:border-[#181B46]"
                              }`}
                            >
                              {service}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Your Name & WhatsApp or Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {/* Name */}
                      <div className="space-y-1">
                        <label
                          htmlFor="client-name"
                          className="block text-xs font-semibold text-[#181B46] font-manrope uppercase tracking-wider"
                        >
                          2. Your name
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full border border-[#181B46]/30 rounded-[4px] px-3.5 py-2.5 text-sm text-[#181B46] bg-white focus:border-[#181B46] focus:ring-1 focus:ring-[#181B46] focus:outline-none transition-all font-manrope placeholder:text-[#181B46]/35"
                        />
                      </div>

                      {/* WhatsApp or Email */}
                      <div className="space-y-1">
                        <label
                          htmlFor="client-contact"
                          className="block text-xs font-semibold text-[#181B46] font-manrope uppercase tracking-wider flex items-center justify-between"
                        >
                          <span>
                            3. WhatsApp or Email <span className="text-red-500 font-bold">*</span>
                          </span>
                        </label>
                        <input
                          id="client-contact"
                          type="text"
                          value={contact}
                          onChange={(e) => {
                            setContact(e.target.value);
                            if (contactError) setContactError(false);
                          }}
                          placeholder="+91 98765 43210 or email"
                          className={`w-full border rounded-[4px] px-3.5 py-2.5 text-sm text-[#181B46] bg-white focus:ring-1 focus:outline-none transition-all font-manrope placeholder:text-[#181B46]/35 ${
                            contactError
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-[#181B46]/30 focus:border-[#181B46] focus:ring-[#181B46]"
                          }`}
                        />
                      </div>
                    </div>
                    {contactError && (
                      <p className="text-xs text-red-600 font-medium font-manrope -mt-2">
                        Please provide your WhatsApp number or email address so we can reply.
                      </p>
                    )}

                    {/* 3. Short Requirement / One-liner */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="client-idea"
                          className="block text-xs font-semibold text-[#181B46] font-manrope uppercase tracking-wider"
                        >
                          4. Quick details (Optional)
                        </label>
                        <span className="text-[11px] text-[#181B46]/50 font-manrope">Optional</span>
                      </div>
                      <input
                        id="client-idea"
                        type="text"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g. Need a modern website redesign with smooth animations"
                        className="w-full border border-[#181B46]/30 rounded-[4px] px-3.5 py-2.5 text-sm text-[#181B46] bg-white focus:border-[#181B46] focus:ring-1 focus:ring-[#181B46] focus:outline-none transition-all font-manrope placeholder:text-[#181B46]/35"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.015, y: isSubmitting ? 0 : -2 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-full py-3.5 sm:py-4 bg-[#181B46] text-[#FAF5EF] font-manrope font-bold text-sm sm:text-base rounded-[4px] hover:bg-[#252b66] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2 text-white">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>Sending brief...</span>
                          </span>
                        ) : (
                          <>
                            <span>Send project brief</span>
                            <ArrowUpRight className="w-4 h-4 text-[#E4CDA3]" />
                          </>
                        )}
                      </motion.button>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-[11px] font-mono text-[#181B46]/60 border-t border-[#181B46]/10 mt-3">
                        <span>Direct delivery: stackbros.work@gmail.com</span>
                        <a
                          href="https://wa.me/919003248656?text=Hi%20StackBros%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#181B46] font-semibold underline underline-offset-2 flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-600" />
                          <span>Prefer WhatsApp? Chat now ↗</span>
                        </a>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  /* ========================================================
                      POST-SUBMIT: DIGITAL GREETING CARD (ENGLISH)
                     ======================================================== */
                  <motion.div
                    key="greeting-card"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: easeCurve }}
                    className="py-2"
                  >
                    {/* Top Gold Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#181B46] text-[#FAF5EF] px-3.5 py-1.5 rounded-full text-xs font-mono font-bold mb-5 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>BRIEF LOGGED • TICKET #{ticketNumber}</span>
                    </div>

                    {/* Greeting Header */}
                    <h3 className="text-3xl sm:text-4xl font-bold font-manrope text-[#181B46] tracking-tight leading-tight mb-3">
                      Thanks for reaching out{name ? `, ${name}` : ""}!
                    </h3>

                    <p className="text-base sm:text-lg text-[#181B46]/85 font-manrope leading-relaxed mb-6">
                      We have received your project brief regarding{" "}
                      <strong className="text-[#181B46] font-bold">{selectedService}</strong>.
                      Our team is reviewing your requirements and will reply within <strong>2 business hours</strong>.
                    </p>

                    {/* Lifetime Relationship Note */}
                    <div className="bg-white border-2 border-[#B58D55]/30 rounded-lg p-5 mb-7 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B58D55]" />
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B58D55] uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#B58D55]" />
                        <span>A NOTE FROM STACKBROS</span>
                      </div>
                      <p className="text-sm sm:text-base font-manrope text-[#181B46] leading-relaxed italic">
                        &ldquo;Whether it’s launching this project today or any custom software, web design, or AI automations you ever need in the future — the StackBros team is always here for you. We’re just one message away.&rdquo;
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <a
                        href={`https://wa.me/919003248656?text=${encodeURIComponent(
                          `Hi StackBros Team, I just submitted a project brief regarding ${selectedService} (Ticket #${ticketNumber}). Looking forward to connecting!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-manrope font-bold text-sm rounded-[4px] transition-all shadow-md cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Open WhatsApp Chat with Team ↗</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-[#181B46]/5 text-[#181B46] font-manrope font-semibold text-sm rounded-[4px] border border-[#181B46]/25 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Send another message</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>,
            document.body
          )}
        </div>

      </div>
      <footer aria-label="StackBros" className="stackbros-footer relative -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-16 mt-0 overflow-hidden">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: easeCurve }}
        >
          <Image src="/images/stackbros-geometric-wordmark-outlined.png" alt="StackBros" width={2067} height={214} unoptimized className="stackbros-footer__wordmark" />
        </motion.div>
      </footer>
    </section>
  );
}
