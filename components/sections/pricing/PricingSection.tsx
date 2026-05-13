import { Suspense, lazy } from "react";
import SectionWrapper from "@/components/common/SectionWrapper";
import SectionHeader from "@/components/common/SectionHeader";
import SectionSkeleton from "@/components/common/SectionSkeleton";

const PricingGrid = lazy(() => import("./PricingGrid"));

export default function PricingSection() {
  return (
    <SectionWrapper id="pricing">
      {/* Background orbs — z-0 so cards always sit above */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-1 absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-aurora-violet/12 blur-[140px]" />
        <div className="aurora-orb-2 absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-aurora-teal/10 blur-[110px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-14">
        <SectionHeader
          label="Freelance"
          title="Simple,"
          highlight="Transparent Pricing"
          description="No surprises. Pick the plan that matches your project scope."
        />
        <Suspense fallback={<SectionSkeleton rows={3} />}>
          <PricingGrid />
        </Suspense>
      </div>
    </SectionWrapper>
  );
}
