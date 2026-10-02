import { useEffect, useState } from 'react';

/** Tiny hash router: '#/blog/slug', '#/privacy', '#/terms'; anything else is the home page. */
export function useHashRoute() {
  const read = () => {
    const h = window.location.hash;
    const m = h.match(/^#\/blog\/([\w-]+)/);
    if (m) return { page: 'post', slug: m[1] };
    if (h === '#/privacy') return { page: 'privacy' };
    if (h === '#/terms') return { page: 'terms' };
    return { page: 'home', anchor: h };
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
