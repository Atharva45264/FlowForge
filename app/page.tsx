import { LandingNavbar } from "@/components/landing/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/features/feature-grid";
import { CTA } from "@/components/landing/cta/cta";
import { Footer } from "@/components/landing/footer";
import { WhyFlowForge } from "@/components/landing/why/why-flowforge";
import { Pricing } from "@/components/landing/pricing/pricing";
import { FAQ } from "@/components/landing/faq/faq";

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
