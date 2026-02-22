"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="relative font-semibold text-gray-700 transition-colors hover:text-orange-500 after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-200 hover:after:w-full"
      >
        {label}
      </Link>
    </li>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-[5%]">
        <Link
          href="#home"
          className="shrink-0 transition-opacity hover:opacity-90 min-w-0"
          aria-label="Neza Construction – Home"
        >
          <div className="relative h-16 w-48 sm:h-20 sm:w-56 md:h-24 md:w-64">
            <Image
              src="/images/logo.png"
              alt="Neza Construction Logo"
              fill
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        <ul className="hidden list-none gap-6 md:flex md:gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-orange-500 active:bg-gray-200 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden max-h-[calc(100vh-theme(spacing.14))] overflow-y-auto"
          >
            <ul className="flex flex-col px-4 py-4 sm:px-[5%]">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[44px] items-center py-3 font-semibold text-gray-700 transition-colors hover:text-orange-500 active:bg-gray-50 rounded-lg px-1 -mx-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
