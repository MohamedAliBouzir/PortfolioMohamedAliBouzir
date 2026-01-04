import { IPricingCardProps } from "@/interfaces/pricing-card-interface";
import { Check } from "lucide-react";

const PricingCard: React.FC<IPricingCardProps> = ({ plan }) => {
  return (
    <div className="relative w-full max-w-sm rounded-2xl border dark:border-gray-200 p-6 shadow-md transition-transform hover:scale-105">
      {plan.popular && (
        <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow">
          POPULAR
        </span>
      )}
      <p className="text-sm font-semibold uppercase white:text-gray-500">
        {plan.type}
      </p>
      <div className="mt-2 flex items-end gap-1">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-lg font-semibold text-accent">
          {plan.currency}
        </span>
        <span className="text-sm font-medium text-gray-500 mb-1">
          {plan.period}
        </span>
      </div>
      <p className="mt-4 text-sm white:text-gray-600">{plan.description}</p>
      <ul className="mt-6 space-y-3 text-sm">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 ${feature.available ? "" : "text-gray-400 line-through"
              }`}
          >
            <Check
              size={16}
              className={feature.available ? "text-accent" : ""}
            />{" "}
            {feature.name}
          </li>
        ))}
        {/* <li className="flex items-center gap-2">
          <Check size={16} className="text-accent" /> Web Development
        </li>
        <li className="flex items-center gap-2">
          <Check size={16} className="text-accent" /> Design
        </li>
        <li className="flex items-center gap-2 text-gray-400 line-through">
          <Check size={16} /> SEO & Branding
        </li> */}
      </ul>
      <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full border border-gray-300"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
