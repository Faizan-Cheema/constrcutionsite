"use client";

import {
  Building2,
  Hammer,
  Zap,
  PaintBucket,
} from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: Building2,
    title: "New Builds & Extensions",
    description:
      "From foundations to roofing, we construct brand‑new homes and design thoughtful extensions to expand your living space.",
  },
  {
    icon: Hammer,
    title: "Renovations & Conversions",
    description:
      "Transform existing properties with loft conversions, ground works and comprehensive renovations tailored to your needs.",
  },
  {
    icon: Zap,
    title: "Plumbing & Electrics",
    description:
      "Complete internal installations including plumbing, underfloor heating and electrical wiring for safe and efficient homes.",
  },
  {
    icon: PaintBucket,
    title: "Finishing Trades",
    description:
      "High‑quality brickwork, plastering, roofing and decorative finishes to bring your project to life with precision.",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section id="services" className="bg-gray-50/80 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-[5%]">
        <motion.h2
          className="font-heading mb-2 text-center text-2xl font-bold text-gray-800 sm:mb-3 sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="mx-auto mb-8 max-w-xl text-center text-sm text-gray-600 sm:mb-12 sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          From new builds to finishing touches — we deliver quality at every stage.
        </motion.p>
        <motion.div
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              variants={item}
              transition={{ duration: 0.35 }}
              className="group rounded-xl bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md sm:p-6"
            >
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white sm:mb-4 sm:h-12 sm:w-12">
                <Icon size={22} strokeWidth={1.75} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-heading mb-1.5 text-lg font-semibold text-gray-800 sm:mb-2 sm:text-xl">
                {title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
