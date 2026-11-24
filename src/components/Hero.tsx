"use client";

import { ArrowRight, Check, Code2, Cloud, Cpu, Megaphone, ShoppingCart, Smartphone, Settings, Paintbrush, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import heroDeviceImage from "../image.png";

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive & scalable websites for your business growth.",
    icon: Code2,
    features: ["Business Websites", "E-commerce Sites", "Portfolio & Landing Pages"],
  },
  {
    title: "Mobile App Development",
    description: "Powerful and intuitive mobile applications.",
    icon: Smartphone,
    features: ["Android & iOS Apps", "Cross-Platform Apps", "App Maintenance"],
  },
  {
    title: "Custom Software Development",
    description: "Tailored software solutions for your unique needs.",
    icon: Settings,
    features: ["Enterprise Software", "SaaS Applications", "Business Solutions"],
  },
  {
    title: "UI/UX Design",
    description: "Beautiful and user-friendly designs that engage.",
    icon: Paintbrush,
    features: ["UI/UX Design", "Website Redesign", "Prototyping"],
  },
  {
    title: "AI & Automation",
    description: "Intelligent solutions to work smarter.",
    icon: Cpu,
    features: ["AI Integration", "Chatbots & Automation", "Custom AI Solutions"],
  },
  {
    title: "Digital Marketing",
    description: "Grow your brand with data-driven marketing.",
    icon: TrendingUp,
    features: ["SEO", "Social Media Marketing", "Content Marketing"],
  },
  {
    title: "E-commerce Solutions",
    description: "Build and scale your online store.",
    icon: ShoppingCart,
    features: ["Online Store Development", "Payment Integration", "Inventory Management"],
  },
  {
    title: "Cloud & API Solutions",
    description: "Scalable cloud solutions for a smarter business.",
    icon: Cloud,
    features: ["API Development", "Cloud Integration", "AWS Deployment"],
  },
];

export default function Hero() {
  const openProjectForm = () => window.dispatchEvent(new Event("open-project-form"));
  const prefersReducedMotion = useReducedMotion();
  const headlineLineOne = "We Don't Just Build Technology.";
  const headlineLineTwo = "We Build What's Next.";
  const typingCycleDuration = 5.9;
  const lastTypingCharacter = headlineLineOne.length + headlineLineTwo.length;
  const typeLine = (line: string, startAt: number) => {
    let characterOffset = startAt;
    return line.split(" ").map((word, wordIndex) => {
      const wordStart = characterOffset;
      characterOffset += Array.from(word).length + 1;
      return (
        <span key={`${word}-${wordIndex}`} aria-hidden="true" className="inline-block" style={{ marginRight: "0.22em" }}>
          {Array.from(word).map((character, characterIndex) => {
            const position = wordStart + characterIndex;
            const startTyping = 0.5 + position * 0.035;
            const revealAt = startTyping + 0.03;
            const eraseAt = 3.15 + (lastTypingCharacter - position) * 0.025;
            const hideAt = eraseAt + 0.03;
            const timeline = [0, startTyping, revealAt, eraseAt, hideAt, typingCycleDuration]
              .map((time) => time / typingCycleDuration);
            return (
              <motion.span
                key={`${wordIndex}-${characterIndex}`}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: prefersReducedMotion ? 1 : [0, 0, 1, 1, 0, 0] }}
                transition={prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: typingCycleDuration, times: timeline, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                {character}
              </motion.span>
            );
          })}
        </span>
      );
    });
  };
  const renderServiceCard = (service: (typeof services)[number], index: number, duplicate = false) => {
    const ServiceIcon = service.icon;
    return (
      <motion.article
        key={`${service.title}-${duplicate ? "loop" : "main"}`}
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.62, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
        className="reference-service-card"
        role="listitem"
      >
        <div className="reference-service-card__art" aria-hidden="true">
          <span className="reference-service-card__number">0{index + 1}</span>
          <span className="reference-service-card__art-orbit" />
          <span className="reference-service-card__art-shape" />
          <ServiceIcon className="reference-service-card__art-icon" size={54} strokeWidth={1.45} />
          <span className="reference-service-card__art-caption">STACKBROS / DIGITAL STUDIO</span>
        </div>
        <div className="reference-service-card__body">
          <div className="reference-service-card__heading">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          <ul>
            {service.features.map((feature) => (
              <li key={feature}><Check size={13} strokeWidth={3} />{feature}</li>
            ))}
          </ul>
          <button
            type="button"
            aria-label={`Discuss ${service.title}`}
            onClick={openProjectForm}
            tabIndex={duplicate ? -1 : undefined}
            className="reference-service-card__arrow"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.article>
    );
  };

  return (
    <section className="reference-hero">
      <div className="reference-hero__top max-w-[1440px] mx-auto px-6 md:px-12 xl:px-16">
        <div className="reference-hero__copy">
          <motion.h1
            aria-label="We Don’t Just Build Technology. We Build What’s Next."
          >
            <span className="font-cormorant font-semibold italic text-[#181b46]">
              {typeLine(headlineLineOne, 0)}
            </span>
            <br />
            <span className="reference-hero__headline-accent text-[#c49a5c]">
              {typeLine(headlineLineTwo, headlineLineOne.length + 1)}
              <span className={`reference-hero__typing-caret${prefersReducedMotion ? " is-hidden" : ""}`} aria-hidden="true" />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            From cutting-edge web &amp; mobile solutions to AI-powered automation, STACKBROS delivers end-to-end IT services to help your business grow.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="reference-hero__visual"
        >
          <Image
            src={heroDeviceImage}
            alt="StackBros website shown on a laptop and mobile phone"
            priority
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 52vw, 58vw"
            className="reference-hero__device-image"
          />
        </motion.div>
      </div>

      <section id="reference-services" className="reference-services" aria-labelledby="services-gallery-title">
        <div className="reference-services__inner">
          <header className="reference-services__header">
            <span>01 / OUR SERVICES</span>
            <h2 id="services-gallery-title">A closer look at what we do.</h2>
            <p>Ideas, designed and built to move your business forward.</p>
          </header>
          <div className="reference-services__grid" role="region" aria-label="StackBros services gallery">
            <div className="reference-services__track">
              <div className="reference-services__group" role="list">
                {services.map((service, index) => renderServiceCard(service, index))}
              </div>
              <div className="reference-services__group" role="list" aria-hidden="true">
                {services.map((service, index) => renderServiceCard(service, index, true))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
