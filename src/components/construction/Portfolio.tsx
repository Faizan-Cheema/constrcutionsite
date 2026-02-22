"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioContent } from "@/lib/content-types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1 },
};


export function Portfolio({ content }: { content: PortfolioContent }) {
  return (
    <section id="portfolio" className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-[5%]">
        <motion.div
          className="mb-8 flex flex-col items-center sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 sm:mb-3 sm:h-12 sm:w-12">
            <ImageIcon size={22} strokeWidth={1.75} className="sm:w-6 sm:h-6" />
          </div>
          <h2 className="font-heading text-center text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-1.5 max-w-xl px-2 text-center text-sm text-gray-600 sm:mt-2 sm:text-base">
            {content.subheading}
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {content.items.map(({ src, alt, link }) => {
            const hasLink = Boolean(link && link.trim());
            const cardContent = (
              <div className="relative overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md sm:rounded-xl">
                  <div className="relative aspect-[4/3] w-full min-h-[140px] sm:min-h-[180px]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
                  <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-medium text-white opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:text-sm">
                    {alt}
                  </p>
                </div>
            );

            return (
              <motion.div
                key={src + alt}
                variants={item}
                transition={{ duration: 0.35 }}
                className="group"
              >
                {hasLink ? (
                  <Link
                    href={link!.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div className="block cursor-default">{cardContent}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
