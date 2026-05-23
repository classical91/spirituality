import { useCallback, useEffect, useState } from 'react';

// Lightweight history-API router. Real URLs, no extra dependencies.
// Vite dev server and `serve -s` both fall back to index.html for unknown paths.
export function useRoute() {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (to === window.location.pathname) return;
    if (replace) window.history.replaceState({}, '', to);
    else window.history.pushState({}, '', to);
    setPath(to);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  return [path, navigate];
}
