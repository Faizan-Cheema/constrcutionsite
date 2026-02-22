export type HeroContent = {
  title: string;
  titleLine2: string;
  subtitle: string;
  ctaText: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type ServicesContent = {
  heading: string;
  subheading: string;
  items: ServiceItem[];
};

export type PortfolioItem = {
  src: string;
  alt: string;
  link?: string;
};

export type PortfolioContent = {
  heading: string;
  subheading: string;
  items: PortfolioItem[];
};

export type AboutContent = {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  badge1: string;
  badge2: string;
};

export type ContactContent = {
  heading: string;
  introText: string;
  email: string;
  phone: string;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type FooterContent = {
  copyright: string;
  socialLinks: SocialLink[];
};

export type SiteContentMap = {
  hero: HeroContent;
  services: ServicesContent;
  portfolio: PortfolioContent;
  about: AboutContent;
  contact: ContactContent;
  footer: FooterContent;
};

export const DEFAULT_HERO: HeroContent = {
  title: "Building Your Vision",
  titleLine2: "From the Ground Up",
  subtitle: "Expert construction & renovation services in Colchester and beyond.",
  ctaText: "Request a Quote",
};

export const DEFAULT_SERVICES: ServicesContent = {
  heading: "Our Services",
  subheading: "From new builds to finishing touches — we deliver quality at every stage.",
  items: [
    { title: "New Builds & Extensions", description: "From foundations to roofing, we construct brand‑new homes and design thoughtful extensions to expand your living space." },
    { title: "Renovations & Conversions", description: "Transform existing properties with loft conversions, ground works and comprehensive renovations tailored to your needs." },
    { title: "Plumbing & Electrics", description: "Complete internal installations including plumbing, underfloor heating and electrical wiring for safe and efficient homes." },
    { title: "Finishing Trades", description: "High‑quality brickwork, plastering, roofing and decorative finishes to bring your project to life with precision." },
  ],
};

export const DEFAULT_PORTFOLIO: PortfolioContent = {
  heading: "Project Portfolio",
  subheading: "A selection of our recent work across residential and commercial projects.",
  items: [
    { src: "/images/bathroom.jpg", alt: "Modern bathroom renovation", link: "" },
    { src: "/images/kitchen.jpg", alt: "Stylish kitchen installation", link: "" },
    { src: "/images/livingroom.jpg", alt: "Open‑plan living area", link: "" },
    { src: "/images/stairs.jpg", alt: "Contemporary staircase", link: "" },
    { src: "/images/groundwork.jpg", alt: "Landscaped patio and groundwork", link: "" },
    { src: "/images/underfloor.jpg", alt: "Underfloor heating installation", link: "" },
    { src: "/images/roof.jpg", alt: "Roofing and tiling work", link: "" },
    { src: "/images/newbuild.jpg", alt: "New build under construction", link: "" },
  ],
};

export const DEFAULT_ABOUT: AboutContent = {
  heading: "About Us",
  paragraph1: "Neza Construction Ltd is a small, family‑run company based in South London, specialising in residential and light commercial building projects.",
  paragraph2: "Our mission is to deliver craftsmanship of the highest standard while maintaining transparent communication and respect for your home.",
  badge1: "Quality craftsmanship",
  badge2: "Client-focused",
};

export const DEFAULT_CONTACT: ContactContent = {
  heading: "Get in Touch",
  introText: "Ready to start your project? We'd love to hear from you.",
  email: "Admin@NezaConstruction.Ltd",
  phone: "07584045630",
};

export const DEFAULT_FOOTER: FooterContent = {
  copyright: "2026 Neza Construction Ltd. All rights reserved.",
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "YouTube", url: "https://youtube.com" },
    { platform: "TikTok", url: "https://tiktok.com" },
    { platform: "Instagram", url: "https://instagram.com" },
  ],
};
