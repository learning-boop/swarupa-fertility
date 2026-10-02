import { useState } from 'react';
import { MessageCircle, Phone, Plus } from 'lucide-react';
import { site, waLink } from '../config/site';
import { faqs } from '../data/faqs';
import { SplitText } from './Shapes';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Frequently asked questions">
      <div className="wrap">
        <div className="relative grid gap-10 overflow-hidden rounded-[2.25rem] bg-navy-deep p-6 text-white sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:p-16">
          <svg aria-hidden="true" viewBox="0 0 600 600" className="absolute -left-40 -top-40 h-[640px] w-[640px] text-white/[0.04]">
            {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx="300" cy="300" r={90 + k * 50} fill="none" stroke="currentColor" strokeWidth="24" />)}
          </svg>
          <div className="relative">
            <span className="tag tag-dark reveal">Questions</span>
            <SplitText as="h2" text="Questions couples often ask" className="mt-5 text-[2.2rem] !text-white sm:text-[2.8rem]" />
            <p className="reveal mt-5 max-w-[42ch] text-white/75">Not finding your answer here? Call or message us and the clinic team will help.</p>
            <div className="reveal mt-8 grid gap-3 sm:max-w-sm">
              <a href={`tel:${site.phone.tel}`} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white/15">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-magenta"><Phone size={18} aria-hidden="true" /></span>
                <span><span className="block text-[0.82rem] text-white/70">Call the hospital</span><span className="block font-display text-[1.15rem]">{site.phone.display}</span></span>
              </a>
              <a href={waLink()} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white/15">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1F9E5A]"><MessageCircle size={18} aria-hidden="true" /></span>
                <span><span className="block text-[0.82rem] text-white/70">WhatsApp</span><span className="block font-display text-[1.15rem]">{site.mobile.display}</span></span>
              </a>
            </div>
          </div>

          <ul className="relative grid content-start gap-3">
            {faqs.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                // `reveal` stays on the <li> with a static className: useReveal adds `is-in` to it directly, and a
                // re-rendered className on the same element would wipe that class and hide the item again.
                <li key={q} className="reveal">
                  <div className={`rounded-2xl transition-colors ${isOpen ? 'acc-open bg-white text-navy' : 'bg-white/[0.06] ring-1 ring-white/10'}`}>
                    <h3 className="!font-sans">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${i}`}
                        className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[1.02rem] font-semibold ${isOpen ? 'text-navy' : 'text-white'}`}
                      >
                        {q}
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 bg-magenta text-white' : 'bg-white/10'}`}>
                          <Plus size={17} aria-hidden="true" />
                        </span>
                      </button>
                    </h3>
                    <div id={`faq-${i}`} className="acc-panel" role="region">
                      <div><p className="px-6 pb-6 text-body">{a}</p></div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
