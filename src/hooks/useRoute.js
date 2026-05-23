import { useCallback, useEffect, useState } from 'react';

// Lightweight history-API router. Real URLs, no extra dependencies.
// Vite dev server and `serve -s` both fall back to index.html for unknown paths.
// `pathname` is everything before "?"; `search` is the query string ("?section=heart").
function readLocation() {
  if (typeof window === 'undefined') return { pathname: '/', search: '' };
  return { pathname: window.location.pathname, search: window.location.search };
}

export function useRoute() {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const onPop = () => setLocation(readLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = new URL(to, window.location.origin);
    const target = url.pathname + url.search;
    const current = window.location.pathname + window.location.search;
    if (target === current) return;
    if (replace) window.history.replaceState({}, '', target);
    else window.history.pushState({}, '', target);
    setLocation({ pathname: url.pathname, search: url.search });
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  // Compatibility: callers used to destructure as `[path, navigate]`.
  // Keep that ergonomics by attaching pathname/search to the array.
  const result = [location.pathname, navigate];
  result.pathname = location.pathname;
  result.search = location.search;
  return result;
}
