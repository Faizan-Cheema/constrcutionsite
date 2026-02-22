"use client";

import Image from "next/image";
import { Users, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { AboutContent } from "@/lib/content-types";

export function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="bg-gray-50/80 py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 sm:px-[5%] lg:flex-row lg:flex-wrap lg:items-center lg:gap-16">
        <motion.div
          className="min-w-0 flex-1 basis-full lg:basis-[350px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 sm:mb-4 sm:h-12 sm:w-12">
            <Users size={22} strokeWidth={1.75} className="sm:w-6 sm:h-6" />
          </div>
          <h2 className="font-heading mb-3 text-2xl font-bold text-gray-800 sm:mb-4 sm:text-3xl md:text-4xl">
            {content.heading}
          </h2>
          <p className="mb-3 leading-relaxed text-gray-600 sm:mb-4 text-sm sm:text-base">
            {content.paragraph1}
          </p>
          <p className="mb-5 leading-relaxed text-gray-600 sm:mb-6 text-sm sm:text-base">
            {content.paragraph2}
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <span className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-gray-700">
              <Award size={18} className="shrink-0 text-orange-500" />
              {content.badge1}
            </span>
            <span className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-gray-700">
              <Heart size={18} className="shrink-0 text-orange-500" />
              {content.badge2}
            </span>
          </div>
        </motion.div>
        <motion.div
          className="min-w-0 flex-1 basis-full lg:basis-[300px] lg:max-w-[500px]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="overflow-hidden rounded-xl shadow-md w-full">
            <Image
              src="/images/livingroom.jpg"
              alt="Our work – finished living space"
              width={500}
              height={333}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
