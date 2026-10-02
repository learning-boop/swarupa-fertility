import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Baby, HeartPulse } from 'lucide-react';
import { months } from '../data/pregnancy';
import { SplitText } from './Shapes';
import PregnancyFigure from './PregnancyFigure';

/**
 * Pregnancy timeline: an auto-sliding, looping row of month illustrations
 * (one step at a time, as in the reference), with month pills below.
 * Choosing a month opens what happens that month and stops autoplay.
 */
export default function PregnancyTimeline() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(0); // position in the doubled track
  const [anim, setAnim] = useState(true);
  const [perView, setPerView] = useState(7);
  const userChose = useRef(false);
  const hover = useRef(false);
  const items = [...months, ...months];
  const n = months.length;

  useEffect(() => {
    const fit = () => setPerView(window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 5 : 7);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const posRef = useRef(0);
  const move = (p, animate = true) => { posRef.current = p; setAnim(animate); setPos(p); };

  const step = useCallback((d) => {
    const p = posRef.current;
    if (d < 0 && p === 0) {
      // jump to the matching slide in the second copy, then animate back one
      move(n, false);
      requestAnimationFrame(() => requestAnimationFrame(() => move(n - 1)));
      return;
    }
    move(p + d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  // loop seamlessly: once the first copy has scrolled past, snap back without animation
  const onEnd = () => {
    if (posRef.current >= n) move(posRef.current - n, false);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (!userChose.current && !hover.current) step(1); }, 2600);
    return () => clearInterval(id);
  }, [step]);

  const choose = (i) => {
    userChose.current = true;
    setActive(i);
    // bring the chosen month into view
    move(Math.max(0, Math.min(i - Math.floor(perView / 2), n - perView)));
  };

  const cur = months[active];

  return (
    <section id="pregnancy" className="relative overflow-hidden bg-gradient-to-b from-white via-blush-soft to-white py-24 lg:py-32">
      <span aria-hidden="true" className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-rose/25 blur-3xl" />
      <div className="wrap relative">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="tag reveal">Pregnancy care</span>
          <SplitText text="Taking care of you and your baby, month by month" className="mt-5 text-[2.3rem] sm:text-[3rem]" />
          <p className="reveal lede mx-auto mt-5">
            From a positive test to the day you meet your baby, here is what happens each month and the care that comes with it.
          </p>
        </div>

        <div
          className="reveal relative mt-14"
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => (hover.current = false)}
        >
          <div className="overflow-hidden">
            <ul
              className="flex"
              style={{
                transform: `translateX(-${(pos * 100) / perView}%)`,
                transition: anim ? 'transform .8s cubic-bezier(.65,0,.35,1)' : 'none',
              }}
              onTransitionEnd={onEnd}
            >
              {items.map((mo, k) => {
                const i = k % n;
                const on = i === active;
                return (
                  <li key={k} className="shrink-0 px-1.5 sm:px-2" style={{ width: `${100 / perView}%` }} aria-hidden={k >= n ? 'true' : undefined}>
                    <button
                      type="button"
                      tabIndex={k >= n ? -1 : 0}
                      onClick={() => choose(i)}
                      aria-pressed={on}
                      aria-label={`Month ${mo.m}: ${mo.title}`}
                      className="group flex w-full flex-col items-center"
                    >
                      <span className={`relative block w-full rounded-[1.5rem] pb-2 pt-5 transition-colors duration-500 ${on ? 'bg-white shadow-card' : 'group-hover:bg-white/70'}`}>
                        <PregnancyFigure month={mo.m} className="mx-auto h-[250px] w-auto transition-transform duration-500 group-hover:-translate-y-1.5 sm:h-[320px]" />
                      </span>
                      <span
                        className={`mt-4 rounded-full px-4 py-2 text-[0.85rem] font-semibold transition-colors ${
                          on ? 'bg-magenta text-white shadow-pink' : 'bg-white text-navy ring-1 ring-navy/10 group-hover:text-magenta'
                        }`}
                      >
                        {mo.m} Month
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button type="button" onClick={() => { userChose.current = true; step(-1); }} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy transition hover:border-magenta hover:bg-magenta hover:text-white" aria-label="Previous months">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => { userChose.current = true; step(1); }} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy transition hover:border-magenta hover:bg-magenta hover:text-white" aria-label="Next months">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* details for the chosen month */}
        <div key={active} className="rise mx-auto mt-12 grid max-w-[980px] overflow-hidden rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 md:grid-cols-[0.8fr_1.2fr]" aria-live="polite">
          <div className="relative bg-navy-deep p-8 text-white">
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-magenta/30 blur-2xl" />
            <p className="relative font-display text-[4rem] leading-none">{String(cur.m).padStart(2, '0')}</p>
            <p className="relative mt-2 text-[0.95rem] text-white/75">{cur.weeks}, {cur.tri.toLowerCase()}</p>
            <p className="relative mt-5 font-display text-[1.6rem] leading-snug">{cur.title}</p>
          </div>
          <div className="grid gap-6 p-8">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush text-magenta"><Baby size={20} aria-hidden="true" /></span>
              <div>
                <h3 className="!font-sans text-[1rem] font-semibold text-navy">Your baby</h3>
                <p className="mt-1">{cur.baby}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky text-ocean"><HeartPulse size={20} aria-hidden="true" /></span>
              <div>
                <h3 className="!font-sans text-[1rem] font-semibold text-navy">Your care</h3>
                <p className="mt-1">{cur.care}</p>
              </div>
            </div>
            <a href="#appointment" className="justify-self-start text-[0.95rem] font-semibold text-magenta hover:underline">Book a pregnancy check-up</a>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-[70ch] text-center text-[0.85rem] text-body/75">
          General information only. Every pregnancy is different, so your doctor will advise on the tests and visits right for you.
        </p>
      </div>
    </section>
  );
}
