import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ClipboardList, Droplets, FlaskConical, Microscope, Syringe, HeartHandshake, Snowflake, ScanSearch, Eye, HeartPulse, Flower2,
  X, ArrowRight, ArrowLeft, ArrowUpRight,
} from 'lucide-react';
import { treatments } from '../data/treatments';
import { otherDepartments, site } from '../config/site';
import { SplitText } from './Shapes';

const Icons = { ClipboardList, Droplets, FlaskConical, Microscope, Syringe, HeartHandshake, Snowflake, ScanSearch, Eye, HeartPulse, Flower2 };
// Drop a photo at src/assets/treatments/<treatment id>.webp (e.g. ivf.webp) and its card uses it;
// treatments without a photo keep the gradient art.
const photos = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/treatments/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, ''), url]),
);
const arts = [
  'from-navy to-ocean',
  'from-magenta to-plum',
  'from-ocean to-navy-deep',
  'from-plum to-navy',
];

function TreatmentDialog({ item, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);
  const Icon = item ? Icons[item.icon] : null;
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(640px,92vw)] rounded-3xl p-0 text-body shadow-2xl backdrop:bg-navy-night/50 backdrop:backdrop-blur-sm"
      aria-labelledby="tx-title"
    >
      {item && (
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep px-8 pb-8 pt-9 text-white">
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-magenta/30 blur-2xl" />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white text-magenta"><Icon size={26} aria-hidden="true" /></span>
            <h3 id="tx-title" className="relative mt-5 text-[2rem] !text-white">{item.name}</h3>
            <p className="relative text-white/75">{item.full}</p>
            <button onClick={onClose} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25" aria-label="Close">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4 px-8 py-7">
            {item.body.map((p, i) => <p key={i}>{p}</p>)}
            <p className="rounded-xl bg-blush-soft p-4 text-[0.92rem]">
              Whether this treatment suits you depends on your evaluation. Your doctor will explain the options, likely number of
              visits and costs at your consultation.
            </p>
            <a href="#appointment" onClick={onClose} className="btn btn-primary btn-arrow mt-2">
              Book a consultation <span className="badge"><ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}

/** Auto-playing card slider that advances one card at a time, with dash pagination, arrows and swipe (scroll-snap).
 *  Cards only partly in view fade back. Pauses on hover and focus. */
export default function Treatments() {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState(0);
  const [stops, setStops] = useState(1);
  const [inView, setInView] = useState(() => new Set());
  const track = useRef(null);
  const paused = useRef(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el || !el.children.length) return;
    const step = el.children[0].offsetWidth;
    const perView = Math.max(1, Math.round(el.clientWidth / step));
    setStops(Math.max(1, el.children.length - perView + 1));
    setPos(Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    const el = track.current;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    const io = new IntersectionObserver((entries) => {
      setInView((prev) => {
        const next = new Set(prev);
        entries.forEach((e) => (e.intersectionRatio > 0.9 ? next.add(e.target.dataset.id) : next.delete(e.target.dataset.id)));
        return next;
      });
    }, { root: el, threshold: [0, 0.9, 1] });
    [...el.children].forEach((c) => io.observe(c));
    return () => { el.removeEventListener('scroll', measure); window.removeEventListener('resize', measure); io.disconnect(); };
  }, [measure]);

  const goTo = (p) => {
    const el = track.current;
    const target = ((p % stops) + stops) % stops;
    el.scrollTo({ left: el.children[target].offsetLeft - el.children[0].offsetLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (!paused.current && !active) goTo(pos + 1); }, 3800);
    return () => clearInterval(id);
  }, [pos, stops, active]);

  return (
    <section id="treatments" className="relative bg-white py-24 lg:py-32">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="tag reveal">Our treatments</span>
          <SplitText text="Fertility and women's health care we offer" className="mt-5 text-[2.3rem] sm:text-[3rem]" />
          <p className="reveal lede mx-auto mt-5">Every treatment starts with understanding what is happening for both partners.</p>
        </div>

        <div
          className="relative mt-14"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onFocus={() => (paused.current = true)}
          onBlur={() => (paused.current = false)}
        >
          <ul ref={track} className="no-scrollbar -mx-3 flex snap-x snap-mandatory overflow-x-auto py-2" aria-label="Treatments">
            {treatments.map((t, i) => {
              const Icon = Icons[t.icon];
              const photo = photos[t.id];
              const shown = inView.has(t.id);
              return (
                <li key={t.id} data-id={t.id} className="w-full shrink-0 snap-start px-3 sm:w-1/2 lg:w-1/3">
                  <article
                    className={`group flex h-full flex-col rounded-[1.75rem] bg-[var(--notch-bg)] p-3 transition-[opacity,scale,background-color] duration-700 ease-out [--notch-bg:var(--color-mist)] hover:[--notch-bg:var(--color-blush-soft)] ${shown ? 'opacity-100' : 'scale-[0.96] opacity-40'}`}
                  >
                    <div className="flex flex-1 flex-col items-center px-4 pb-6 pt-8 text-center">
                      <Icon size={48} strokeWidth={1.2} className="text-ocean transition-all duration-500 group-hover:-translate-y-1.5 group-hover:text-magenta" aria-hidden="true" />
                      <h3 className="mt-5 text-[1.45rem] leading-tight transition-colors duration-300 group-hover:!text-magenta">{t.name}</h3>
                      <p className="mt-1 text-[0.82rem] font-semibold text-ocean">{t.full}</p>
                      <p className="mt-3 text-[0.94rem]">{t.short}</p>
                    </div>
                    <div className={`relative h-52 overflow-hidden rounded-[1.4rem] ${photo ? '' : `bg-gradient-to-br ${arts[i % arts.length]}`}`}>
                      {photo ? (
                        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                      ) : (
                        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110">
                          <Icon size={190} strokeWidth={0.6} className="absolute -bottom-8 -right-6 text-white/15 transition-transform duration-700 group-hover:rotate-6" aria-hidden="true" />
                          <span aria-hidden="true" className="absolute -left-6 top-14 h-24 w-24 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-150" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setActive(t)}
                        className="notch absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-2xl bg-[var(--notch-bg)] px-6 pb-3 pt-2 text-[0.92rem] font-semibold text-navy transition-colors duration-700 hover:text-magenta"
                        aria-label={`Read more about ${t.name}`}
                      >
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">Read More <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></span>
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button type="button" onClick={() => goTo(pos - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-magenta hover:bg-magenta hover:text-white" aria-label="Previous treatment">
              <ArrowLeft size={18} />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Treatment slides">
              {Array.from({ length: stops }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === pos}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${i === pos ? 'w-10 bg-magenta' : 'w-6 bg-navy/15 hover:bg-navy/30'}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => goTo(pos + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-magenta hover:bg-magenta hover:text-white" aria-label="Next treatment">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="reveal mt-16 flex flex-col gap-4 rounded-[1.75rem] bg-navy-deep p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:gap-10">
          <p className="shrink-0 font-display text-[1.35rem] leading-snug lg:max-w-[16ch]">Also at {site.parentHospital}</p>
          <ul className="flex flex-wrap gap-2.5">
            {otherDepartments.map((d) => (
              <li key={d} className="rounded-full bg-white/10 px-4 py-2 text-[0.92rem] ring-1 ring-white/20">{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <TreatmentDialog item={active} onClose={() => setActive(null)} />
    </section>
  );
}
