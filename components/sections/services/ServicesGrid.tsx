"use client";

import { usePortfolioStore } from "@/store/portfolio.store";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid() {
  const services = usePortfolioStore((s) => s.services);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {services.map((service, i) => (
        <ServiceCard key={service.index} service={service} index={i} />
      ))}
    </div>
  );
}
