import { Skeleton } from "@/components/ui/skeleton";

interface SectionSkeletonProps {
  rows?: number;
  className?: string;
}

export default function SectionSkeleton({ rows = 3, className }: SectionSkeletonProps) {
  return (
    <div className={`w-full py-20 sm:py-28 space-y-6 container mx-auto px-4 ${className ?? ""}`}>
      <div className="flex flex-col items-center gap-3 mb-10">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-10 w-64 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
