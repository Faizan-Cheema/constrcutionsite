import {
  Header,
  Hero,
  Services,
  Portfolio,
  About,
  Contact,
  Footer,
  ScrollProgress,
} from "@/components/construction";
import { getAllSiteContent } from "@/lib/content";
import {
  DEFAULT_HERO,
  DEFAULT_SERVICES,
  DEFAULT_PORTFOLIO,
  DEFAULT_ABOUT,
  DEFAULT_CONTACT,
  DEFAULT_FOOTER,
} from "@/lib/content-types";

export default async function HomePage() {
  const content = await getAllSiteContent();

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <ScrollProgress />
      <Header />
      <main className="relative">
        <Hero content={content.hero ?? DEFAULT_HERO} />
        <Services content={content.services ?? DEFAULT_SERVICES} />
        <Portfolio content={content.portfolio ?? DEFAULT_PORTFOLIO} />
        <About content={content.about ?? DEFAULT_ABOUT} />
        <Contact content={content.contact ?? DEFAULT_CONTACT} />
      </main>
      <Footer content={content.footer ?? DEFAULT_FOOTER} />
    </div>
  );
}
