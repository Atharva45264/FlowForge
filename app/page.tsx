import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { Stats } from "@/components/landing/stats";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0B1020] text-white">
      <LandingNavbar />
      <Hero />
      <FeatureGrid />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}