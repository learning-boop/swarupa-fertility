import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { site, testimonials } from '../config/site';
import { SplitText } from './Shapes';
import family from '../assets/stories-family.webp';

export default function Testimonials() {
  const items = testimonials.filter((t) => site.showPlaceholders || !t.sample);
  const [i, setI] = useState(0);
  if (!items.length) return null;
  const t = items[i];
  const go = (d) => setI((x) => (x + d + items.length) % items.length);

  return (
    <section id="stories" className="grid-bg relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span className="tag reveal">Patient stories</span>
          <SplitText text="Real experiences shared with consent" className="mt-5 text-[2.3rem] sm:text-[3rem]" />

          <figure className="reveal relative mt-10 rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-navy/5 sm:p-10" aria-live="polite">
            {t.sample && (
              <span className="absolute right-6 top-6 rounded-md border border-dashed border-magenta/60 px-2 py-0.5 text-[0.75rem] font-medium text-magenta">Sample</span>
            )}
            <Quote size={44} className="text-rose" fill="currentColor" aria-hidden="true" />
            {t.rating && (
              <p className="mt-3 flex gap-0.5 text-saffron" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={16} fill="currentColor" aria-hidden="true" />)}
              </p>
            )}
            <blockquote key={i} className="rise mt-5 font-display text-[1.35rem] leading-relaxed text-navy">{t.quote}</blockquote>
            <figcaption className="mt-8 flex items-center justify-between gap-4">
              <span>
                <span className="block font-semibold text-navy">{t.name}</span>
                <span className="block text-[0.9rem]">{t.detail}</span>
              </span>
              <span className="flex gap-2">
                <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-magenta hover:bg-magenta hover:text-white" aria-label="Previous story"><ArrowLeft size={18} /></button>
                <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-magenta hover:bg-magenta hover:text-white" aria-label="Next story"><ArrowRight size={18} /></button>
              </span>
            </figcaption>
          </figure>
          <p className="mt-4 text-[0.88rem] text-body/80">Every journey is different. No story is a promise of a particular outcome.</p>
        </div>

        <div className="relative hidden lg:block">
          <div className="img-reveal overflow-hidden rounded-[2rem] shadow-soft">
            <img src={family} alt="" decoding="async" className="aspect-[4/5] w-full object-cover object-[50%_30%]" />
          </div>
          <p aria-hidden="true" className="absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-display text-[1rem] tracking-[0.2em] text-navy/50">
            {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}
