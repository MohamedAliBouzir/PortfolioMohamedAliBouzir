import { TPricingPlan } from "@/types/pricings-types";

export const pricingData:TPricingPlan[] = [{
    id: 0,
    type:"Daily-Based",
    price: 11,
    currency: "$",
    period: "Day",
    description: "This plan is perfect for short-term projects or tasks that require quick turnaround times. Ideal for fixing bugs, making minor updates, or handling small assignments.",
    features: [
        { name: "Web Development", available: true },
        { name: "Design", available: false },
        { name: "SEO & Branding", available: false },
    ],
    popular: false,
},
{
    id: 1,
    type:"Weekly-Based",
    price: 259,
    currency: "$",
    period: "Week",
    description: "This includes both development work and design tasks such as creating UI/UX, prototyping, and other visual elements.",
    features: [
        { name: "Web Development", available: true },
        { name: "Design", available: true },
        { name: "SEO & Branding", available: false },
    ],
    popular: true,
},
{
    id: 2,
    type:"Monthly-Based",
    price: 899,
    currency: "$",
    period: "Month",
    description: "This comprehensive plan covers all aspects of web development, design, SEO, and branding. Ideal for businesses looking for a complete online presence solution.",
    features: [
        { name: "Web Development", available: true },
        { name: "Design", available: true },
        { name: "SEO & Branding", available: true },
    ],
    popular: false,
}];