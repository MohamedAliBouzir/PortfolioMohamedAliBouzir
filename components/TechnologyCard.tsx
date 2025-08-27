"use client";
import { TTechnologyCardProps } from "@/types/technology-card-types";
import Image from "next/image";

const TechnologyCard = ({ props }: { props: TTechnologyCardProps }) => {
  return (
    <div
      key={props.index}
      className="relative group w-22 h-32 bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-2 cursor-default">
        {props.Title}
      </div>
      <div className="relative w-16 h-16">
        <Image
          src={props.Icon}
          priority
          quality={100}
          fill
          alt={props.Title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default TechnologyCard;
