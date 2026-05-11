import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-20 sm:py-28 overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}
