"use client";

import { TProjects } from "@/types/projects-types";
import Image from "next/image";
import HoverScale from "../motions/HoverScale";
export const CarouselItem = ({ data }: { data: TProjects }) => {
  return (
    <HoverScale >
    <div
    
      className="relative group  shadow-lg overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 flex items-center justify-center text-center text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 px-2 cursor-default">
        {data.name}
      </div>
      <div className="relative w-full h-45">
        <Image
          src={data.logo}
          priority
          quality={100}
          fill
          alt={data.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain filter"
        />
      </div>
    </div>
    </HoverScale>
  );
};
