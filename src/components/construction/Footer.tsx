"use client";

import Link from "next/link";
import { Copyright, Facebook, Youtube, Instagram } from "lucide-react";
import type { FooterContent } from "@/lib/content-types";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Facebook,
  YouTube: Youtube,
  TikTok: TikTokIcon,
  Instagram,
};

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-gray-200 bg-gray-800 py-6 text-gray-300 sm:py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-[5%]">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
          <div className="flex items-center gap-2 text-center text-sm sm:text-left">
            <Copyright size={16} className="shrink-0 text-gray-400" />
            <span>{content.copyright}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {content.socialLinks.map(({ platform, url }) => {
              const Icon = ICON_MAP[platform] ?? Facebook;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors hover:text-white active:bg-gray-700/50"
                  aria-label={platform}
                >
                  <Icon size={20} />
                </a>
              );
            })}
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
