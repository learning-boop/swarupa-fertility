import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { taglines } from '../config/site';
import { SplitText } from './Shapes';
import family from '../assets/why-family.webp';

const reasons = [
  ['Expert care', 'Consultations with a consultant gynaecologist, infertility specialist and laparoscopic surgeon who explains each finding in plain language.'],
  ['Advanced technology', 'IVF, ICSI, TESA, embryo and sperm freezing, laparoscopy and hysteroscopy, all within the hospital.'],
  ['Safe & ethical practices', 'A registered Level II ART clinic, working within India\u2019s ART regulations for consent, donors and storage.'],
  ['Compassionate support', 'Fertility treatment is emotional. Time for your questions is part of every visit.'],
  ['Clear communication', 'You will know what each step involves, what it costs and why it is recommended, before it begins.'],
];

const includes = ['IVF & ICSI', 'IUI', 'Fertility evaluation', 'Embryo & sperm freezing', 'TESA', 'Laparoscopy & hysteroscopy'];

export default function WhyChoose() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <span className="tag reveal">Why choose us</span>
          <SplitText text="Why couples choose Swarupa Fertility Center" className="mt-5 text-[2.3rem] sm:text-[3rem]" />
          <p className="reveal lede mt-5">Choosing where to begin fertility treatment is a big decision. These are the things we hold ourselves to.</p>

          <ul className="reveal mt-9 divide-y divide-navy/10 border-y border-navy/10">
            {reasons.map(([t, d], i) => {
              const isOpen = open === i;
              return (
                <li key={t} className={isOpen ? 'acc-open' : ''}>
                  <h3 className="!font-sans">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`why-${i}`}
                      className={`flex w-full items-center justify-between gap-4 py-5 text-left text-[1.15rem] transition-colors ${isOpen ? 'text-magenta' : 'text-navy hover:text-magenta'}`}
                    >
                      <span><span className="font-display">{String(i + 1).padStart(2, '0')}.</span> {t}</span>
                      <ArrowRight size={20} aria-hidden="true" className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                  </h3>
                  <div id={`why-${i}`} className="acc-panel" role="region">
                    <div><p className="pb-5 pl-9 pr-8">{d}</p></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative">
          <div className="img-reveal relative overflow-hidden rounded-[2rem] shadow-soft">
            <img src={family} alt="Smiling parents holding their baby outdoors" decoding="async" className="aspect-[4/5] w-full object-cover object-[50%_30%] sm:aspect-[5/5] lg:aspect-[4/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-night/60 via-navy-night/5 to-transparent" />
          </div>
          {/* light tint + minimal blur so the baby behind the card stays visible; text-shadow keeps the copy legible */}
          <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-navy-night/40 p-6 text-white ring-1 ring-white/20 backdrop-blur-[2px] [text-shadow:0_1px_3px_rgb(5_42_78/0.8)] sm:inset-x-6 sm:bottom-6 sm:p-8">
            <p className="font-display text-[1.45rem] leading-snug">{taglines.care}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.93rem]">
              {includes.map((x) => (
                <li key={x} className="flex items-center gap-2"><Check size={17} className="shrink-0 text-rose" aria-hidden="true" /> {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
