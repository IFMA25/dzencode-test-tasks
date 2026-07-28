export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const getCurrencySymbol = (symbol: string) => (symbol === "USD" ? "$" : symbol);

export const formatCurrencyValue = (value: number): string => {
  const fixed = value.toFixed(2);

  return fixed.endsWith(".00") ? fixed.slice(0, -3) : fixed;
};
