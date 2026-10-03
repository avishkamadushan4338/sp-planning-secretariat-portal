export function getSafeLocalStorage(key, fallback = null) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return fallback;
  }
  try {
    const val = (typeof window !== "undefined" ? localStorage.getItem(key) : null);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
}

export function setSafeLocalStorage(key, value) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function getSafeLang(defaultLang = 'en') {
  return getSafeLocalStorage('lang', defaultLang);
}
