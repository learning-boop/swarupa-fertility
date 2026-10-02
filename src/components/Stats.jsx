import { useEffect, useRef, useState } from 'react';
import { stats } from '../config/site';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function Stats() {
  return (
    <section aria-label="At a glance" className="bg-white pb-8">
      <div className="wrap">
        <ul className={`grid divide-y divide-navy/10 rounded-[2rem] bg-blush-soft sm:divide-x sm:divide-y-0 ${stats.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
          {stats.map((s) => (
            <li key={s.label} className="reveal px-6 py-9 text-center">
              <p className="font-display text-[3.2rem] leading-none text-navy"><Counter value={s.value} suffix={s.suffix} /></p>
              <p className="mx-auto mt-3 max-w-[22ch] text-[0.95rem]">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
