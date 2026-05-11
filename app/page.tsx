import HeroSection from "@/components/sections/hero/HeroSection";
import AboutSection from "@/components/sections/about/AboutSection";
import ServicesSection from "@/components/sections/services/ServicesSection";
import TechnologiesSection from "@/components/sections/technologies/TechnologiesSection";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import ExperienceSection from "@/components/sections/experience/ExperienceSection";
import PricingSection from "@/components/sections/pricing/PricingSection";
import ContactSection from "@/components/sections/contact/ContactSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechnologiesSection />
      <ProjectsSection />
      <ExperienceSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}
