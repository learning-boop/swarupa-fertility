import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone, Smartphone } from 'lucide-react';
import { site, waLink } from '../config/site';
import Todo from './Todo';
import { SplitText } from './Shapes';
import hospital from '../assets/hospital.webp';

function Row({ icon: Icon, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blush text-magenta">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div>
        <p className="font-semibold text-navy">{title}</p>
        <div className="mt-0.5 text-[0.98rem]">{children}</div>
      </div>
    </li>
  );
}

export default function Contact() {
  const a = site.address;
  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <span className="tag reveal">Contact</span>
          <SplitText text="Visit or call us" className="mt-5 text-[2.3rem] sm:text-[3rem]" />
          <p className="reveal lede mt-5">{site.name}, inside {site.parentHospital}.</p>
          <ul className="reveal mt-10 grid gap-7">
            <Row icon={MapPin} title="Address">
              <address className="not-italic">
                {a.lines.map((l) => <span key={l} className="block">{l}</span>)}
                <span className="block">{a.region}{a.postalCode ? ` ${a.postalCode}` : ''}</span>
              </address>
              {!a.postalCode && <Todo className="mt-2">PIN code</Todo>}
            </Row>
            <Row icon={Phone} title="Hospital">
              <a href={`tel:${site.phone.tel}`} className="hover:text-magenta">{site.phone.display}</a>
            </Row>
            <Row icon={Smartphone} title="Mobile">
              <a href={`tel:${site.mobile.tel}`} className="block hover:text-magenta">{site.mobile.display}</a>
              {site.altMobile && <a href={`tel:${site.altMobile.tel}`} className="block hover:text-magenta">{site.altMobile.display}</a>}
              {site.altMobile && <Todo className="mt-2">which mobile numbers are current</Todo>}
            </Row>
            {site.email && (
              <Row icon={Mail} title="Email">
                <a href={`mailto:${site.email}`} className="hover:text-magenta">{site.email}</a>
              </Row>
            )}
            <Row icon={Clock} title="Working hours">
              {site.hours.length ? (
                site.hours.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>)
              ) : (
                <Todo>confirmed hospital timings</Todo>
              )}
            </Row>
          </ul>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <a href={waLink()} target="_blank" rel="noopener" className="btn bg-[#1F9E5A] text-white hover:bg-[#178049]">
              <MessageCircle size={19} aria-hidden="true" /> WhatsApp us
            </a>
            <a href="#appointment" className="btn btn-ghost">Send an appointment enquiry</a>
          </div>
        </div>

        <div className="reveal relative min-h-[480px] overflow-hidden rounded-[2rem] bg-navy-deep">
          {site.mapEmbedUrl ? (
            <iframe
              title={`Map showing ${site.name}`}
              src={site.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center p-10 text-center">
              <img src={hospital} alt="Sri Swarupa Super Speciality Hospital building" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-night/90 via-navy-night/40 to-transparent" />
              <span className="relative mt-auto grid h-16 w-16 place-items-center rounded-full bg-magenta text-white shadow-pink">
                <MapPin size={34} aria-hidden="true" />
              </span>
              <p className="relative mt-5 font-display text-[1.5rem] text-white">Kaleswara Rao Road, Suryaraopet</p>
              <p className="relative mt-1 text-[0.95rem] text-white/80">Near Pushpa Hotel bus stop, Vijayawada</p>
              <a href={site.mapLink} target="_blank" rel="noopener" className="btn btn-light relative mt-6">
                <Navigation size={17} aria-hidden="true" /> Get directions
              </a>
              <Todo className="relative mt-4 !border-white/60 !bg-white/10 !text-white">map embed URL, and that this photo is the real building</Todo>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
