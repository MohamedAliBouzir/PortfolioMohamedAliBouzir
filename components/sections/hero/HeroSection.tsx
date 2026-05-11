import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeroCanvas = lazy(() => import("./HeroCanvas"));
const HeroContent = lazy(() => import("./HeroContent"));

function HeroCanvasFallback() {
  return <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-background via-background to-accent/5" />;
}

function HeroContentFallback() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-6 px-4">
      <Skeleton className="h-6 w-44 rounded-full" />
      <Skeleton className="h-20 w-80 rounded-xl" />
      <Skeleton className="h-16 w-64 rounded-xl" />
      <Skeleton className="h-5 w-96 rounded" />
      <div className="flex gap-4">
        <Skeleton className="h-12 w-32 rounded-full" />
        <Skeleton className="h-12 w-32 rounded-full" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Aurora background orbs — dark mode: vibrant, light mode: soft pastels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-1 absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full dark:bg-aurora-violet/20 bg-aurora-violet/10 blur-[140px]" />
        <div className="aurora-orb-2 absolute top-[35%] right-[5%] w-[500px] h-[500px] rounded-full dark:bg-aurora-pink/15 bg-aurora-pink/8 blur-[120px]" />
        <div className="aurora-orb-3 absolute bottom-[10%] left-[25%] w-[450px] h-[450px] rounded-full dark:bg-aurora-teal/12 bg-aurora-teal/7 blur-[110px]" />
        {/* Light mode: subtle grain texture feel */}
        <div className="absolute inset-0 dark:opacity-0 opacity-[0.025] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Three.js canvas — centered + very slightly faded */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.92]">
        <Suspense fallback={<HeroCanvasFallback />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Animated text content */}
      <Suspense fallback={<HeroContentFallback />}>
        <HeroContent />
      </Suspense>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  );
}
