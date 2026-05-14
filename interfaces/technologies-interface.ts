import { StaticImageData } from "next/image";

export interface ITechnologiesInterface {
  index: number;
  Icon: StaticImageData;
  Title: string;
  years?: number;
  projects?: string[];
  experiences?: string[];
  facts?: string[];
}
