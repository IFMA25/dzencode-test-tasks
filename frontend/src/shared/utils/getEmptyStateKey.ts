export const getEmptyStateKey = (hasError: boolean, hasSearch: boolean) => {
  if (hasError) return "error";
  if (hasSearch) return "notFound";

  return "empty";
};
