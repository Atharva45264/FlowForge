import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { WhyFlowForge } from "@/components/landing/why-flowforge";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0B1020] text-white">
      <LandingNavbar />

      <Hero />

      <WhyFlowForge />

      <FeatureGrid />

      <Pricing />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}
