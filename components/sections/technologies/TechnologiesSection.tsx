import { Suspense, lazy } from "react";
import SectionWrapper from "@/components/common/SectionWrapper";
import SectionHeader from "@/components/common/SectionHeader";
import SectionSkeleton from "@/components/common/SectionSkeleton";

const TechnologiesGrid = lazy(() => import("./TechnologiesGrid"));

export default function TechnologiesSection() {
  return (
    <SectionWrapper id="technologies">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-1 absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-aurora-violet/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-12">
        <SectionHeader
          label="Tech Stack"
          title="Tools &"
          highlight="Technologies"
          description="The ecosystem I use daily to build fast, scalable, and maintainable products."
        />
        <Suspense fallback={<SectionSkeleton rows={4} />}>
          <TechnologiesGrid />
        </Suspense>
      </div>
    </SectionWrapper>
  );
}
