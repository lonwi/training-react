import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface CacheEntry<T> {
  data: T;
  createdAt: number;
}

// Globalny cache żyjący w pamięci modułu (closure)
const fetchCache: Record<string, CacheEntry<any>> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minut

export const useFetch = <T>(url: string): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: fetchCache[url]?.data || null,
    isLoading: !fetchCache[url],
    error: null,
  });

  useEffect(() => {
    const entry = fetchCache[url];

    // Jeśli dane są w cache i są świeże, pomijamy strzał do sieci
    if (entry && Date.now() - entry.createdAt < CACHE_DURATION) {
      setState({ data: entry.data, isLoading: false, error: null });
      return;
    }

    setState({ data: null, isLoading: true, error: null });
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const json = (await response.json()) as T;

        fetchCache[url] = { data: json, createdAt: Date.now() };
        setState({ data: json, isLoading: false, error: null });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({ data: null, isLoading: false, error: err as Error });
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return state;
};
