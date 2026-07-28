export const getStorageItem = (key: string): string | null => localStorage.getItem(key);

export const setStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
