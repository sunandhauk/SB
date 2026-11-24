"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const easeCurve = [0.16, 1, 0.3, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.12,
      ease: easeCurve,
    },
  }),
};

export default function SelectedWork() {
  const row1Projects = [
    {
      num: "01",
      category: "PRODUCT DESIGN",
      title: "Rent Match",
      description: "Finding a place is only half the match.",
      image: "/images/project-rentmatch.webp",
      link: "https://nest-dosthu.netlify.app/",
    },
    {
      num: "02",
      category: "WORKPLACE TECHNOLOGY",
      title: "WorkLogix",
      description: "Assign work. Track progress. Stay in control.",
      image: "/images/project-worklogix.webp",
      link: "https://worklogix-codework.vercel.app/",
    },
    {
      num: "03",
      category: "BUSINESS SOFTWARE",
      title: "SM HR Nexus",
      description: "Strategic talent acquisition and corporate HR consulting.",
      image: "/images/project-smhrnexus.webp",
      link: "https://www.smhrnexus.com/",
    },
  ];

  const row2Projects = [
    {
      num: "04",
      category: "STONE ART",
      title: "Sri Shanmuga Stone Art",
      description: "Handcrafted temple sculptures, marble statues, and granite architecture.",
      image: "/images/project-stoneart.webp",
      link: "https://srishanmugastoneart.com/",
    },
    {
      num: "05",
      category: "EVENT PLANNING",
      title: "Eventique Planners",
      description: "Bespoke wedding curation, luxury celebrations, and decor design.",
      image: "/images/project-eventique.webp",
      link: "https://eventique-planners.vercel.app/",
    },
    {
      num: "06",
      category: "FITNESS & PERFORMANCE",
      title: "Iron Pulse Fitness",
      description: "High-performance strength training and interactive class booking.",
      image: "/images/project-ironpulse.webp",
      link: "https://ironpulsefittness.netlify.app/",
    },
  ];

  return (
    <section
      id="work"
      className="w-full bg-[#FAF5EF] text-[#181B46] py-16 md:py-24 px-6 md:px-12 lg:px-16 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ========================================================
            SECTION HEADER: 01 / PORTFOLIO & Selected work.
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easeCurve }}
          className="mb-8 md:mb-10"
        >
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-[#181B46]/70 uppercase mb-2">
            01 / PORTFOLIO
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-[68px] lg:text-[72px] font-manrope font-extrabold not-italic text-[#181B46] tracking-[-0.045em] leading-[1.02]">
            Selected work.
          </h2>
        </motion.div>

        {/* ========================================================
            ROW 1: PRIMARY 3 PROJECTS
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {row1Projects.map((project, idx) => (
            <motion.article
              key={project.title}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: easeCurve }}
              className="group flex flex-col"
            >
              <a
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : "_self"}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block focus:outline-none"
              >
                {/* Artwork Canvas with Glass Glare Sweep */}
                <div className="relative aspect-[311/198] w-full overflow-hidden bg-[#EAE3D9] mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-500 rounded-[2px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Subtle Light Glare Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                </div>

                {/* Eyebrow Label */}
                <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#181B46]/70 uppercase mb-1.5 transition-colors group-hover:text-[#B58D55]">
                  {project.num} / {project.category}
                </p>

                {/* Linked Project Title with Animated Arrow */}
                <h3 className="text-xl sm:text-[22px] font-bold text-[#181B46] font-manrope tracking-tight inline-flex items-center gap-1.5 transition-colors group-hover:text-[#181B46]/80">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#181B46] group-hover:text-[#B58D55]" />
                </h3>

                {/* Description Text */}
                <p className="text-sm text-[#181B46]/80 font-manrope leading-relaxed mt-1">
                  {project.description}
                </p>
              </a>
            </motion.article>
          ))}
        </div>

        {/* ========================================================
            THIN DIVIDER & MORE PROJECTS LABEL
           ======================================================== */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: easeCurve }}
          className="w-full h-px bg-[#181B46]/15 my-10 md:my-12"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-[#181B46]/70 uppercase mb-6"
        >
          04 — 06
        </motion.p>

        {/* ========================================================
            ROW 2: SECONDARY 3 PROJECTS
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {row2Projects.map((project, idx) => (
            <motion.article
              key={project.title}
              custom={idx + 3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: easeCurve }}
              className="group flex flex-col"
            >
              <a
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : "_self"}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block focus:outline-none"
              >
                {/* Artwork Canvas */}
                <div className="relative aspect-[311/198] w-full overflow-hidden bg-[#EAE3D9] mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-500 rounded-[2px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Subtle Light Glare Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                </div>

                {/* Eyebrow Label */}
                <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#181B46]/70 uppercase mb-1.5 transition-colors group-hover:text-[#B58D55]">
                  {project.num} / {project.category}
                </p>

                {/* Linked Project Title with Arrow */}
                <h3 className="text-xl sm:text-[22px] font-bold text-[#181B46] font-manrope tracking-tight inline-flex items-center gap-1.5 transition-colors group-hover:text-[#181B46]/80">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#181B46] group-hover:text-[#B58D55]" />
                </h3>

                {/* Description Text */}
                <p className="text-sm text-[#181B46]/80 font-manrope leading-relaxed mt-1">
                  {project.description}
                </p>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
