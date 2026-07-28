import { Order, Price } from "@/shared/types";

export const getOrderTotalPrice = (order: Order): Price[] => {
  const totalPriceByCurrency = new Map<string, Price>();
  const allPrices = order.products.flatMap((product) => product.price);

  allPrices.forEach((price) => {
    const accumulatedPrice = totalPriceByCurrency.get(price.symbol);

    totalPriceByCurrency.set(price.symbol, {
      symbol: price.symbol,
      isDefault: price.isDefault,
      value: (accumulatedPrice?.value ?? 0) + price.value,
    });
  });

  return [...totalPriceByCurrency.values()];
};
