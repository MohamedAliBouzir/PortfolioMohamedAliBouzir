import { StaticImageData } from "next/image";

export interface IExperiencesInterface {
    id: number;
    logo: null | StaticImageData;
    societeName: string;
    type?:string | null | undefined;
    presence?: string;
    startDate:string | Date;
    endDate: string | Date;
    position:string;
    description:string;
    technologies: string | string[]
    location?: string;
    website?: string;
}