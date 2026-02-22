import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditHeroForm } from "./EditHeroForm";
import { EditServicesForm } from "./EditServicesForm";
import { EditPortfolioForm } from "./EditPortfolioForm";
import { EditAboutForm } from "./EditAboutForm";
import { EditContactForm } from "./EditContactForm";
import { EditFooterForm } from "./EditFooterForm";
import type { SiteContentMap } from "@/lib/content-types";
import {
  DEFAULT_HERO,
  DEFAULT_SERVICES,
  DEFAULT_PORTFOLIO,
  DEFAULT_ABOUT,
  DEFAULT_CONTACT,
  DEFAULT_FOOTER,
} from "@/lib/content-types";

const VALID_SECTIONS = [
  "hero",
  "services",
  "portfolio",
  "about",
  "contact",
  "footer",
] as const;

type SectionKey = (typeof VALID_SECTIONS)[number];

function isSectionKey(s: string): s is SectionKey {
  return VALID_SECTIONS.includes(s as SectionKey);
}

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSectionKey(section)) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select("data")
    .eq("section", section)
    .single();

  const content = (data?.data ?? getDefault(section)) as SiteContentMap[SectionKey];

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-orange-500"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>
      {section === "hero" && <EditHeroForm initial={content as SiteContentMap["hero"]} />}
      {section === "services" && <EditServicesForm initial={content as SiteContentMap["services"]} />}
      {section === "portfolio" && <EditPortfolioForm initial={content as SiteContentMap["portfolio"]} />}
      {section === "about" && <EditAboutForm initial={content as SiteContentMap["about"]} />}
      {section === "contact" && <EditContactForm initial={content as SiteContentMap["contact"]} />}
      {section === "footer" && <EditFooterForm initial={content as SiteContentMap["footer"]} />}
    </div>
  );
}

function getDefault(section: SectionKey) {
  const map = {
    hero: DEFAULT_HERO,
    services: DEFAULT_SERVICES,
    portfolio: DEFAULT_PORTFOLIO,
    about: DEFAULT_ABOUT,
    contact: DEFAULT_CONTACT,
    footer: DEFAULT_FOOTER,
  };
  return map[section];
}
