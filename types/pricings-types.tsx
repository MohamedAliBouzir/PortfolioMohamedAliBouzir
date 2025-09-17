export type TFeature = {
  name: string;
  available: boolean;
};

export type TPricingPlan = {
  id: number;
  type: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: TFeature[];
  popular: boolean;
};