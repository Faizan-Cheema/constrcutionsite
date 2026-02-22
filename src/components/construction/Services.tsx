"use client";

import {
  Building2,
  Hammer,
  Zap,
  PaintBucket,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ServicesContent } from "@/lib/content-types";

const ICONS = [Building2, Hammer, Zap, PaintBucket] as const;

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

export function Services({ content }: { content: ServicesContent }) {
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
          {content.heading}
        </motion.h2>
        <motion.p
          className="mx-auto mb-8 max-w-xl text-center text-sm text-gray-600 sm:mb-12 sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {content.subheading}
        </motion.p>
        <motion.div
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {content.items.map(({ title, description }, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
