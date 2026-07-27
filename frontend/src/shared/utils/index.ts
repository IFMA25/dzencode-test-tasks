export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const formatDateLong = (date: Date, locale: string) => {
  const parts = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).formatToParts(date);

  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = (parts.find((part) => part.type === "month")?.value ?? "").replace(/\.$/, "");
  const year = parts.find((part) => part.type === "year")?.value ?? "";

  return `${day} ${capitalize(month)}, ${year}`;
};

export const formatDateShort = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")} / ${String(date.getMonth() + 1).padStart(2, "0")}`;

export const getCurrencySymbol = (symbol: string) => (symbol === "USD" ? "$" : symbol);
