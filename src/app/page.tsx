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

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      <ScrollProgress />
      <Header />
      <main className="relative">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
