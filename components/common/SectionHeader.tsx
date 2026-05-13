import { cn } from "@/lib/utils";
import ShineText from "@/components/common/ShineText";

interface SectionHeaderProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  highlight,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {label && (
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
        {title}{" "}
        {highlight && (
          <ShineText>{highlight}</ShineText>
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
