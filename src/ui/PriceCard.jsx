import { getPriceChange, formatPrice } from "../lib/utils";

export default function PriceCard({ currentPrice, prevPrice }) {
  const priceChange = getPriceChange(currentPrice, prevPrice);
  return (
    <div className="space-y-2.5">
      <div className="h-[89px]">
        <h1 className="text-[70px] leading-none text-foreground">
          {formatPrice(currentPrice)}
          <span className="text-2xl leading-[2] ml-2 align-top text-[#BDBEBF]">
            USD
          </span>
        </h1>
      </div>

      <h5
        className={`text-lg ${
          priceChange.sign === "+" ? "text-[#67BF6B]" : "text-red-500"
        }`}
      >{`${priceChange.sign} ${formatPrice(priceChange.value)} (${
        priceChange.percentage
      }%)`}</h5>
    </div>
  );
}
