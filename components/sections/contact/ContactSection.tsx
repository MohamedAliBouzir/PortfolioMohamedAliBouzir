import { Suspense, lazy } from "react";
import SectionWrapper from "@/components/common/SectionWrapper";
import SectionSkeleton from "@/components/common/SectionSkeleton";

const ContactForm = lazy(() => import("./ContactForm"));

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-2 absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-aurora-violet/15 blur-[150px]" />
        <div className="aurora-orb-3 absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-aurora-teal/10 blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Suspense fallback={<SectionSkeleton rows={2} />}>
          <ContactForm />
        </Suspense>
      </div>
    </SectionWrapper>
  );
}
