import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(price);
}
export function getPriceChange(currentPrice, prevPrice) {
  const priceChange = currentPrice - prevPrice;
  const percentage = ((priceChange / prevPrice) * 100).toFixed(2);
  const sign = priceChange >= 0 ? "+" : "-";

  return {
    value: Math.abs(priceChange).toFixed(2), // Absolute value for clean output
    sign,
    percentage: Math.abs(percentage), // Avoid negative % since sign is handled separately
  };
}
