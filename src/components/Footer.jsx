import { Facebook, Instagram, Youtube, Phone, Smartphone, MapPin, Siren, MessageCircle } from 'lucide-react';
import { site, nav, taglines, waLink } from '../config/site';
import { treatments } from '../data/treatments';
import { Logo } from './Shapes';

export default function Footer() {
  const socials = [
    ['Facebook', site.social.facebook, Facebook],
    ['Instagram', site.social.instagram, Instagram],
    ['YouTube', site.social.youtube, Youtube],
  ].filter(([, url]) => url);

  return (
    <footer className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2.25rem] bg-navy-deep text-white/75">
        {/* swirl pattern, echoing the reference footer */}
        <svg aria-hidden="true" viewBox="0 0 800 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-white/[0.035]">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <path key={k} d={`M-50 ${320 - k * 40} C 150 ${180 - k * 40}, 300 ${420 - k * 40}, 500 ${240 - k * 40} S 800 ${120 - k * 30}, 900 ${200 - k * 30}`} fill="none" stroke="currentColor" strokeWidth="18" />
          ))}
        </svg>

        <div className="relative border-b border-white/10">
          <div className="wrap flex flex-col items-start justify-between gap-6 py-12 lg:flex-row lg:items-center">
            <p className="script text-[2.6rem] leading-none text-rose sm:text-[3.2rem]">{taglines.care}</p>
            <a href="#appointment" className="btn btn-primary shrink-0">Book an Appointment</a>
          </div>
        </div>

        <div className="wrap relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-[36ch]">
              A registered ART clinic offering IUI, IVF, ICSI and women&rsquo;s health care at {site.parentHospital}, Vijayawada.
            </p>
            <ul className="mt-6 flex gap-2.5">
              <li>
                <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-magenta">
                  <MessageCircle size={18} aria-hidden="true" />
                </a>
              </li>
              {socials.map(([label, url, Icon]) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-magenta">
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <p className="font-display text-[1.25rem] text-white">Quick links</p>
            <ul className="mt-5 grid gap-2.5">
              {nav.slice(1).map((n) => <li key={n.href}><a href={n.href} className="transition hover:text-rose">{n.label}</a></li>)}
            </ul>
          </nav>
          <div>
            <p className="font-display text-[1.25rem] text-white">Treatments</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {treatments.slice(0, 8).map((t) => <li key={t.id}><a href="#treatments" className="transition hover:text-rose">{t.name}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="font-display text-[1.25rem] text-white">Contact</p>
            <ul className="mt-5 grid gap-4">
              <li className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-rose" aria-hidden="true" /><span>{site.address.lines.join(', ')}</span></li>
              <li className="flex gap-3"><Phone size={18} className="mt-1 shrink-0 text-rose" aria-hidden="true" /><a href={`tel:${site.phone.tel}`} className="hover:text-rose">{site.phone.display}</a></li>
              <li className="flex gap-3"><Smartphone size={18} className="mt-1 shrink-0 text-rose" aria-hidden="true" /><a href={`tel:${site.mobile.tel}`} className="hover:text-rose">{site.mobile.display}</a></li>
              <li>
                <a href={`tel:${site.emergencyPhone.tel}`} className="inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2 text-[0.9rem] font-bold text-white">
                  <Siren size={16} aria-hidden="true" /> {site.emergency}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <div className="wrap flex flex-col gap-3 py-6 text-[0.88rem] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <p className="flex gap-6">
              <a href="#/privacy" className="hover:text-rose">Privacy Policy</a>
              <a href="#/terms" className="hover:text-rose">Terms and Conditions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
