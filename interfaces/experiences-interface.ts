import { StaticImageData } from "next/image";

export interface IExperiencesInterface {
    id: number;
    logo: null | StaticImageData;
    societeName: string;
    type?:string | null | undefined;
    presence?: string;
    startDate: string;
    endDate: string;
    position: string;
    description: string;
    technologies: string[];
    location?: string;
    website?: string;
}