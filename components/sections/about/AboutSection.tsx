import { Suspense, lazy } from "react";
import SectionWrapper from "@/components/common/SectionWrapper";
import SectionSkeleton from "@/components/common/SectionSkeleton";

const AboutContent = lazy(() => import("./AboutContent"));
const AboutStats = lazy(() => import("./AboutStats"));

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      {/* Aurora orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-2 absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-aurora-teal/10 blur-[120px]" />
        <div className="aurora-orb-1 absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-aurora-violet/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-16">
        <Suspense fallback={<SectionSkeleton rows={2} />}>
          <AboutContent />
        </Suspense>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 rounded-2xl glass animate-pulse" />
              ))}
            </div>
          }
        >
          <AboutStats />
        </Suspense>
      </div>
    </SectionWrapper>
  );
}
