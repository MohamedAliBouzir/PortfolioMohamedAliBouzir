import { StaticImageData } from "next/image";

export type TProjects = {
  id: number;
  name: string;
  link: string | null;
  type: string[] | null;
  logo: StaticImageData | null;
  description: string;
  technologies: string[];
  restricted?: boolean;
};
