"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-center justify-center bg-cover bg-center bg-no-repeat text-center text-white sm:min-h-[90vh]"
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden />
      <div className="relative z-10 flex max-w-[800px] flex-col items-center px-4 py-12 sm:px-6 md:py-16">
        <motion.h1
          className="font-heading mb-3 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Building Your Vision
          <br />
          From the Ground Up
        </motion.h1>
        <motion.p
          className="mb-8 text-base text-white/95 sm:mb-10 sm:text-lg md:mb-10 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          Expert construction & renovation services in Colchester and beyond.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Link
            href="#contact"
            className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3.5"
          >
            Request a Quote
            <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
      <motion.a
        href="#services"
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/80 transition-colors hover:text-white active:text-white sm:bottom-8"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
        <ChevronDown size={24} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
