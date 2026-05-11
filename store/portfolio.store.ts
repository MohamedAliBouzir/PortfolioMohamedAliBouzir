"use client";

import { create } from "zustand";
import { countUpData } from "@/assets/data/professional-data";
import { experienceData } from "@/assets/data/experience-data";
import { servicesData } from "@/assets/data/services-data";
import {
  FrontEndTechnologiesData,
  BackEndTechnologiesData,
  MobileTechnologiesData,
  DataBaseData,
} from "@/assets/data/technologies-data";
import { projectsData } from "@/assets/data/projects-data";
import { pricingData } from "@/assets/data/pricing-data";
import type { ICountUpData } from "@/interfaces/coun-up-interface";
import type { IExperiencesInterface } from "@/interfaces/experiences-interface";
import type { IServicesInterface } from "@/interfaces/services-interface";
import type { ITechnologiesInterface } from "@/interfaces/technologies-interface";
import type { TPricingPlan } from "@/types/pricings-types";

interface TechnologyCategories {
  frontend: ITechnologiesInterface[];
  backend: ITechnologiesInterface[];
  mobile: ITechnologiesInterface[];
  database: ITechnologiesInterface[];
}

interface PortfolioState {
  stats: ICountUpData[];
  experiences: IExperiencesInterface[];
  services: IServicesInterface[];
  technologies: TechnologyCategories;
  projects: typeof projectsData;
  pricing: TPricingPlan[];
  activeProjectFilter: string;
  setActiveProjectFilter: (filter: string) => void;
}

export const usePortfolioStore = create<PortfolioState>(() => ({
  stats: countUpData,
  experiences: experienceData,
  services: servicesData,
  technologies: {
    frontend: FrontEndTechnologiesData,
    backend: BackEndTechnologiesData,
    mobile: MobileTechnologiesData,
    database: DataBaseData,
  },
  projects: projectsData,
  pricing: pricingData,
  activeProjectFilter: "all",
  setActiveProjectFilter: (filter) =>
    usePortfolioStore.setState({ activeProjectFilter: filter }),
}));
