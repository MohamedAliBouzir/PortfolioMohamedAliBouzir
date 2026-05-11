import { Suspense, lazy } from "react";
import SectionWrapper from "@/components/common/SectionWrapper";
import SectionHeader from "@/components/common/SectionHeader";
import SectionSkeleton from "@/components/common/SectionSkeleton";

const ProjectsGrid = lazy(() => import("./ProjectsGrid"));

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-2 absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-aurora-teal/10 blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-12">
        <SectionHeader
          label="Work"
          title="Selected"
          highlight="Projects"
          description="A curated selection of products I've built — from enterprise ERPs to public-facing web apps."
        />
        <Suspense fallback={<SectionSkeleton rows={9} />}>
          <ProjectsGrid />
        </Suspense>
      </div>
    </SectionWrapper>
  );
}
