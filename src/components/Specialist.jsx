import { ArrowUpRight, GraduationCap, Stethoscope, Phone } from 'lucide-react';
import { doctor, site } from '../config/site';
import { SplitText } from './Shapes';
import Todo from './Todo';
import drPhoto from '../assets/dr-chandana.webp';

export default function Specialist() {
  return (
    <section id="doctor" className="relative overflow-hidden bg-sky py-24 lg:py-32">
      <span aria-hidden="true" className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-rose/30 blur-3xl" />
      <div className="wrap relative">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="tag reveal">Our specialist</span>
          <SplitText text="The doctor guiding your parenthood journey" className="mt-5 text-[2.3rem] sm:text-[3rem]" />
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* team-card style: photo with a frosted name plate */}
          <article className="group relative mx-auto w-full max-w-[420px]">
            <div className="img-reveal overflow-hidden rounded-[2rem] shadow-soft">
              <img src={drPhoto} alt={`${doctor.name}, ${doctor.qualifications}`} decoding="async" className="aspect-[4/4.6] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/80 px-5 py-4 text-center shadow-card ring-1 ring-white backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-2">
              <p className="font-display text-[1.3rem] text-navy">{doctor.name}</p>
              <p className="text-[0.85rem] text-body">{doctor.qualifications}</p>
              <a href={`tel:${site.phone.tel}`} className="mx-auto mt-0 grid h-0 w-9 place-items-center overflow-hidden rounded-full bg-magenta text-white opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:h-9 group-hover:opacity-100 focus:mt-3 focus:h-9 focus:opacity-100" aria-label="Call to book with the doctor">
                <Phone size={16} aria-hidden="true" />
              </a>
            </div>
          </article>

          <div>
            <p lang="te" className="reveal font-telugu text-[1.2rem] text-plum">{doctor.nameTelugu}</p>
            <h3 className="reveal mt-2 text-[2.2rem] leading-tight sm:text-[2.7rem]">{doctor.name}</h3>
            <dl className="reveal mt-6 grid gap-3">
              <div className="flex items-start gap-3">
                <GraduationCap size={21} className="mt-0.5 shrink-0 text-magenta" aria-hidden="true" />
                <dt className="sr-only">Qualifications</dt>
                <dd className="font-semibold text-navy">{doctor.qualifications}</dd>
              </div>
              <div className="flex items-start gap-3">
                <Stethoscope size={21} className="mt-0.5 shrink-0 text-magenta" aria-hidden="true" />
                <dt className="sr-only">Specialisation</dt>
                <dd className="text-navy">{doctor.specialisation}</dd>
              </div>
            </dl>
            <p className="reveal mt-6 max-w-[60ch]">{doctor.bio}</p>
            {(!doctor.experience || !doctor.memberships.length) && (
              <p className="mt-4 flex flex-wrap gap-2">
                {!doctor.experience && <Todo>years of experience</Todo>}
                {!doctor.memberships.length && <Todo>memberships &amp; fuller bio</Todo>}
              </p>
            )}
            {doctor.experience && <p className="mt-3 font-semibold text-navy">{doctor.experience} of experience</p>}
            <a href="#appointment" className="reveal btn btn-primary btn-arrow mt-8">
              Book a Consultation <span className="badge"><ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
