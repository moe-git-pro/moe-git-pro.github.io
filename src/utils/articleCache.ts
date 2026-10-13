interface CachedData {
  data: unknown;
  timestamp: number;
}

const CACHE_KEY = 'medium_articles_cache';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const articleCache = {
  set: (data: unknown) => {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  },

  get: (): unknown | null => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  },

  clear: () => {
    localStorage.removeItem(CACHE_KEY);
  },
};
