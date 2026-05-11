import { Suspense, lazy } from "react";
import SectionWrapper from "@/components/common/SectionWrapper";
import SectionHeader from "@/components/common/SectionHeader";
import SectionSkeleton from "@/components/common/SectionSkeleton";

const ServicesGrid = lazy(() => import("./ServicesGrid"));

export default function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-3 absolute top-[30%] left-[5%] w-[350px] h-[350px] rounded-full bg-aurora-emerald/10 blur-[110px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-12">
        <SectionHeader
          label="What I offer"
          title="Services &"
          highlight="Expertise"
          description="End-to-end development from concept to deployment — building things that scale and feel great."
        />
        <Suspense fallback={<SectionSkeleton rows={6} />}>
          <ServicesGrid />
        </Suspense>
      </div>
    </SectionWrapper>
  );
}
