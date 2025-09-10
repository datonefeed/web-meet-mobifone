import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { FeaturesSection } from "@/components/features-section";
import { PerformanceSection } from "@/components/performance-section";
import { PartnersSection } from "@/components/partners-section";
import { DashboardSection } from "@/components/dashboard-section";
import { PricingSection } from "@/components/pricing-section";
import { DeviceSection } from "@/components/device-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PerformanceSection />
      <PartnersSection />
      <DashboardSection />
      <PricingSection />
      <DeviceSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
