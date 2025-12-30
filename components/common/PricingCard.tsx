import { IPricingCardProps } from "@/interfaces/pricing-card-interface";
import { Check } from "lucide-react";

const PricingCard: React.FC<IPricingCardProps> = ({ plan }) => {
  return (
    <div
      className={`relative h-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col ${
        plan.popular
          ? "border-accent bg-gradient-to-b from-accent/10 to-accent/5 shadow-lg"
          : "border-border hover:border-accent/50"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 right-4 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white shadow-lg">
          POPULAR
        </span>
      )}

      {/* Plan Type */}
      <div className="mb-4">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
          {plan.type}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl font-bold">
          {plan.currency}
          {plan.price}
        </span>
        <span className="text-sm sm:text-base text-muted-foreground">
          /{plan.period}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 flex-grow">
        {plan.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 text-sm ${
              feature.available
                ? "text-foreground"
                : "text-muted-foreground line-through"
            }`}
          >
            <Check
              size={18}
              className={`flex-shrink-0 ${
                feature.available
                  ? "text-accent stroke-[3]"
                  : "text-muted-foreground"
              }`}
            />
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>

      {/* Decorative elements */}
      {plan.popular && (
        <div className="absolute bottom-4 right-4 flex gap-1.5 opacity-40">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingCard;
