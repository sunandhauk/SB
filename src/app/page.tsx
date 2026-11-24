"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import StudioSection from "@/components/StudioSection";
import AboutStudio from "@/components/AboutStudio";
import ProjectPlannerSection from "@/components/ProjectPlannerSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#FAF5EF] text-[#181B46] font-manrope">
      {/* 01. Navbar — Warm Cream background with dark navy button as in reference */}
      <Navbar />

      {/* 02. Landing hero and product showcase */}
      <Hero />

      {/* 03. Selected Work — #FAF5EF with 01 / PORTFOLIO and Selected work. */}
      <SelectedWork />

      {/* 04. Studio Section — #FAF5EF What we build. */}
      <StudioSection />

      {/* 05. About Studio — #FAF5EF We start with the way you work. */}
      <AboutStudio />

      {/* 06. Project Planner & Footer — #181B46 What are you building? */}
      <ProjectPlannerSection />
    </main>
  );
}
