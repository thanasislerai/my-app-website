export enum localStorageKeys {
  IS_HOMEPAGE_START_BUTTON_CLICKED = "IS_HOMEPAGE_START_BUTTON_CLICKED",
}

export const setLocalStorageItem = (key: localStorageKeys, value: string) =>
  localStorage.setItem(key, value);

export const getLocalStorageItem = (key: localStorageKeys) =>
  localStorage.getItem(key);
