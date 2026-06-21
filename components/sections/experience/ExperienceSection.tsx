import { Suspense, lazy } from "react";
import SectionWrapper from "@/components/common/SectionWrapper";
import SectionHeader from "@/components/common/SectionHeader";
import SectionSkeleton from "@/components/common/SectionSkeleton";
import ContributionCalendar from "./ContributionCalendar";

const ExperienceTimeline = lazy(() => import("./ExperienceTimeline"));

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-3 absolute top-[20%] left-[5%] w-[380px] h-[380px] rounded-full bg-aurora-violet/10 blur-[120px]" />
        <div className="aurora-orb-1 absolute bottom-[20%] right-[5%] w-[320px] h-[320px] rounded-full bg-aurora-teal/8 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-16">
        <SectionHeader
          label="Career"
          title="Work"
          highlight="Experience"
          description="3+ years across startups, agencies, and enterprise clients — building things that matter."
        />
        <Suspense fallback={<SectionSkeleton rows={4} />}>
          <ExperienceTimeline />
        </Suspense>
        <ContributionCalendar />
      </div>
    </SectionWrapper>
  );
}
