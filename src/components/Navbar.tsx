"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinkStyle = "text-[#181B46]/90 hover:text-[#B58D55]";
  const navUnderlineStyle = "bg-[#C49A5C]";
  const actionStyle = "bg-[#102C4D] text-white hover:bg-[#1B3C60]";
  const navItems = [
    { label: "Services", target: "reference-services", dropdown: true },
    { label: "Solutions", target: "studio", dropdown: true },
    { label: "About", target: "about", dropdown: false },
    { label: "Portfolio", target: "work", dropdown: false },
    { label: "Contact", target: "planner", dropdown: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartProject = () => {
    window.dispatchEvent(new Event("open-project-form"));
    setTimeout(() => {
      document.getElementById("client-contact")?.focus();
    }, 450);
  };

  return (
    <header
      className={`sticky top-0 w-full py-3.5 px-6 md:px-12 lg:px-16 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "text-[#181B46] bg-[#FAF5EF]/95 backdrop-blur-md shadow-sm border-[#181B46]/10 py-3"
          : "text-[#181B46] bg-transparent border-[#181B46]/5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* StackBros geometric wordmark */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center group focus:outline-none cursor-pointer text-left"
          aria-label="StackBros Home"
        >
          <Image
            src="/images/stackbros-geometric-wordmark.png"
            alt="StackBros"
            width={2067}
            height={214}
            priority
            unoptimized
            className="h-auto w-[150px] sm:w-[180px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollTo(item.target)}
              className={`group relative inline-flex items-center gap-1 text-sm font-semibold ${navLinkStyle} transition-colors font-manrope cursor-pointer py-1`}
            >
              <span>{item.label}</span>
              {item.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] ${navUnderlineStyle} transition-all duration-300 group-hover:w-full`} />
            </button>
          ))}

          {/* Magnetic Spring CTA Button */}
          <motion.button
            type="button"
            onClick={handleStartProject}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full ${actionStyle} text-sm font-semibold transition-all font-manrope shadow-sm hover:shadow-md cursor-pointer`}
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <motion.button
            type="button"
            onClick={handleStartProject}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full ${actionStyle} text-xs font-semibold transition-all font-manrope cursor-pointer`}
          >
            <span>Brief</span>
            <ArrowUpRight className="w-3 h-3" />
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#181B46] hover:bg-[#181B46]/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 border-t border-[#181B46]/10 mt-3 space-y-3 bg-[#FAF5EF]">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollTo(item.target)}
              className="block w-full text-left py-2 text-base font-semibold text-[#181B46] hover:text-[#B58D55] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleStartProject}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#181B46] text-sm font-semibold text-white active:scale-95 transition-all cursor-pointer"
          >
            <span>Get Started ↗</span>
          </button>
        </div>
      )}
    </header>
  );
}
