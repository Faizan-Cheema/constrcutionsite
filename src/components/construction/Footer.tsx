"use client";

import Link from "next/link";
import { Copyright, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-800 py-6 text-gray-300 sm:py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-[5%]">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
          <div className="flex items-center gap-2 text-center text-sm sm:text-left">
            <Copyright size={16} className="shrink-0 text-gray-400" />
            <span>2026 Neza Construction Ltd. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="mailto:Admin@NezaConstruction.Ltd"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg transition-colors hover:text-white active:bg-gray-700/50"
            >
              <Mail size={16} />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a
              href="tel:07584045630"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg transition-colors hover:text-white active:bg-gray-700/50"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">Call</span>
            </a>
            <Link
              href="#home"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-2 transition-colors hover:text-white active:bg-gray-700/50"
            >
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
