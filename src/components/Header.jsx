import { useEffect, useState } from 'react';
import { Menu, X, Phone, Siren } from 'lucide-react';
import { site, nav } from '../config/site';
import { Logo } from './Shapes';

/** Transparent over the hero, turning into a solid white bar on scroll (as in the reference). */
export default function Header({ overlay = true }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  const clear = overlay && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 z-40 transition-all duration-500 ${clear ? 'bg-transparent' : 'bg-white/95 shadow-[0_10px_30px_-20px_rgba(7,55,101,.45)] backdrop-blur'}`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className={`wrap flex items-center justify-between gap-6 transition-all duration-500 ${clear ? 'h-24' : 'h-20'}`}>
          <a href="#top" className="shrink-0" aria-label={`${site.name}, home`}>
            <Logo dark={clear} />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul
              className={`flex items-center gap-1 whitespace-nowrap rounded-full p-1.5 text-[0.86rem] font-semibold tracking-wide transition-colors duration-500 ${
                clear ? 'bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md' : 'text-navy'
              }`}
            >
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={`block rounded-full px-3.5 py-2 transition-colors ${clear ? 'hover:bg-white/15' : 'hover:bg-blush hover:text-magenta'}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href={`tel:${site.phone.tel}`} className="hidden items-center gap-3 2xl:flex">
              <span className={`grid h-11 w-11 place-items-center rounded-full ${clear ? 'bg-white text-magenta' : 'bg-magenta text-white'}`}>
                <Phone size={18} aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className={`block text-[0.8rem] font-semibold ${clear ? 'text-white' : 'text-navy'}`}>Call anytime</span>
                <span className={`block text-[0.9rem] ${clear ? 'text-white/80' : 'text-body'}`}>{site.phone.display}</span>
              </span>
            </a>
            <a
              href={`tel:${site.emergencyPhone.tel}`}
              className="hidden items-center gap-1.5 rounded-full bg-emergency px-3.5 py-2 text-[0.8rem] font-bold text-white sm:inline-flex lg:hidden"
              aria-label={`${site.emergency}: call ${site.emergencyPhone.display}`}
            >
              <Siren size={15} aria-hidden="true" /> 24/7
            </a>
            <a href="#appointment" className="btn btn-primary hidden whitespace-nowrap !px-5 !py-3 lg:inline-flex">Book Appointment</a>
            <button
              type="button"
              className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${clear ? 'bg-white/15 text-white ring-1 ring-white/30' : 'border border-navy/15 text-navy'}`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-blur would make it the containing block for this fixed panel. */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 z-[35] overflow-y-auto bg-white transition-[opacity,visibility] duration-300 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
        style={{ top: 'calc(5rem + env(safe-area-inset-top, 0px))' }}
      >
        <nav aria-label="Mobile" className="wrap flex h-full flex-col pb-8 pt-4">
          <ul className="divide-y divide-navy/10">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl text-navy">{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3">
            <a href="#appointment" onClick={() => setOpen(false)} className="btn btn-primary">Book Appointment</a>
            <a href={`tel:${site.phone.tel}`} className="btn btn-ghost"><Phone size={18} aria-hidden="true" /> {site.phone.display}</a>
          </div>
        </nav>
      </div>
    </>
  );
}
