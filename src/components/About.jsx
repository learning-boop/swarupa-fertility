import { ArrowUpRight, CircleCheck, HeartHandshake, Microscope, ShieldCheck, Stethoscope, Baby } from 'lucide-react';
import { site, taglines } from '../config/site';
import { SplitText } from './Shapes';
import family from '../assets/hero-family.webp';
import mother from '../assets/mother.webp';

const points = [
  'Consultations led by a gynaecologist, infertility specialist and laparoscopic surgeon',
  'Treatment planned around your own test results and history',
  'IUI, IVF, ICSI, TESA, freezing and keyhole surgery in one hospital',
];

const values = [
  { icon: Stethoscope, label: 'Expert care' },
  { icon: Microscope, label: 'Advanced technology' },
  { icon: ShieldCheck, label: 'Safe & ethical practices' },
  { icon: HeartHandshake, label: 'Compassionate support' },
  { icon: Baby, label: taglines.mission },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-mist py-24 lg:py-32">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* overlapping image collage with parallax, like the reference */}
        <div className="relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[560px]">
          <div className="img-reveal absolute left-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-3xl shadow-soft">
            <img src={family} alt="Parents holding their newborn" decoding="async" className="h-full w-full object-cover object-[60%_30%]" />
          </div>
          <div data-speed="0.08" className="absolute bottom-0 right-0 w-[52%]">
            <div className="img-reveal overflow-hidden rounded-3xl border-[6px] border-mist shadow-soft" style={{ transitionDelay: '.25s' }}>
              <img src={mother} alt="An expectant mother at sunrise" decoding="async" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div data-speed="-0.05" className="absolute bottom-8 left-[6%] max-w-[230px] rounded-2xl bg-white p-4 shadow-card">
            <p className="script text-[1.7rem] leading-none text-magenta">{taglines.hope}</p>
            <p className="mt-2 text-[0.85rem] text-body">{site.registration}</p>
          </div>
        </div>

        <div>
          <span className="tag reveal">Who we are</span>
          <SplitText text="Compassionate care for your parenthood journey" className="mt-5 text-[2.3rem] sm:text-[3rem]" />
          <p className="reveal lede mt-6">
            Swarupa Fertility &amp; IVF Center is a registered ART clinic on the fourth floor of {site.parentHospital} in{' '}
            {site.address.locality}, {site.address.city}. Couples come to us for everything from a first fertility check to
            IVF and ICSI, with diagnosis, treatment, laboratory work and surgery in one place.
          </p>
          <ul className="mt-7 grid gap-3">
            {points.map((p) => (
              <li key={p} className="reveal flex gap-3">
                <CircleCheck size={22} className="mt-0.5 shrink-0 text-magenta" aria-hidden="true" />
                <span className="text-navy">{p}</span>
              </li>
            ))}
          </ul>
          <p lang="te" className="reveal mt-7 font-telugu text-[1.25rem] text-plum">{taglines.telugu}</p>
          <a href="#doctor" className="reveal btn btn-navy btn-arrow mt-8">
            Meet our specialist <span className="badge"><ArrowUpRight size={18} aria-hidden="true" /></span>
          </a>
        </div>
      </div>

      {/* values strip from the poster */}
      <div className="wrap mt-20">
        <ul className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-navy/10 ring-1 ring-navy/10 sm:grid-cols-2 lg:grid-cols-5 sm:[&>li:last-child]:col-span-2 lg:[&>li:last-child]:col-span-1">
          {values.map(({ icon: Icon, label }) => (
            <li key={label} className="group flex items-center gap-3 bg-white px-5 py-5 transition-colors hover:bg-blush-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush text-magenta transition group-hover:bg-magenta group-hover:text-white">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="text-[0.95rem] font-semibold leading-tight text-navy">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
