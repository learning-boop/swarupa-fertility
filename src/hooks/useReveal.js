import { useEffect } from 'react';

const SEL = '.reveal:not(.is-in), .img-reveal:not(.is-in), .split:not(.is-in), .inview:not(.is-in)';

/** Adds .is-in to animated elements as they enter the viewport. */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(SEL);
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    // A fully clipped element never reports as intersecting, so image wipes
    // are observed through their parent instead.
    const map = new Map();
    els.forEach((el) => {
      const target = el.classList.contains('img-reveal') ? el.parentElement : el;
      map.set(target, [...(map.get(target) || []), el]);
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (map.get(e.target) || []).forEach((el) => el.classList.add('is-in'));
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    map.forEach((_, target) => io.observe(target));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Gentle parallax for elements with data-speed (e.g. 0.08). Disabled for reduced motion. */
export function useParallax(deps = []) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...document.querySelectorAll('[data-speed]')];
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-mid * parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`;
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
