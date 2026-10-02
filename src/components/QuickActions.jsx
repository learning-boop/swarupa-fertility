import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { site, waLink } from '../config/site';

/** WhatsApp + call buttons, and a back-to-top button with a scroll-progress ring (as in the reference). */
export default function QuickActions() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? window.scrollY / max : 0);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const C = 2 * Math.PI * 22;

  return (
    <div className="fixed right-4 z-30 flex flex-col items-center gap-3 sm:right-6" style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}>
      <a href={`tel:${site.mobile.tel}`} aria-label={`Call ${site.mobile.display}`} className="grid h-13 w-13 place-items-center rounded-full bg-navy text-white shadow-soft md:hidden" style={{ height: 52, width: 52 }}>
        <Phone size={21} aria-hidden="true" />
      </a>
      <a href={waLink()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="grid place-items-center rounded-full bg-[#1F9E5A] text-white shadow-soft transition hover:scale-105" style={{ height: 52, width: 52 }}>
        <MessageCircle size={23} aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`relative grid place-items-center rounded-full bg-white text-magenta shadow-soft transition-all duration-500 ${p > 0.06 ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
        style={{ height: 52, width: 52 }}
      >
        <svg viewBox="0 0 52 52" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="26" cy="26" r="22" fill="none" stroke="#FCE9F3" strokeWidth="3" />
          <circle cx="26" cy="26" r="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
        </svg>
        <ArrowUp size={19} aria-hidden="true" />
      </button>
    </div>
  );
}
