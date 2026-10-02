import { ArrowUpRight } from 'lucide-react';
import { SplitText } from './Shapes';

const steps = [
  ['Initial consultation', 'Meet the doctor and talk through your history and any previous reports.'],
  ['Fertility assessment', 'Scans, hormone tests and semen analysis for both partners.'],
  ['Personalised plan', 'A clear recommendation with the reasons, steps and costs.'],
  ['Treatment & monitoring', 'Each stage tracked closely and adjusted to your response.'],
  ['Follow-up & support', 'We stay with you after treatment, whatever the result.'],
];

/** Dark section with the reference template's pill columns, used here for the five-step journey. */
export default function Journey() {
  return (
    <section className="py-16 lg:py-24">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-navy-deep px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
          <span aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-magenta/25 blur-3xl" />
          <span aria-hidden="true" className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-ocean/40 blur-3xl" />
          <div className="relative grid items-end gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="tag tag-dark reveal">Your treatment journey</span>
              <SplitText text="Five stages, each explained before it begins" className="mt-5 text-[2.2rem] !text-white sm:text-[2.8rem]" />
              <p className="reveal mt-5 max-w-[46ch] text-white/80">
                Fertility treatment can feel like a maze. We map it out at the start, so you always know where you are and what
                comes next.
              </p>
              <a href="#appointment" className="reveal btn btn-light btn-arrow mt-8">
                Book a consultation <span className="badge"><ArrowUpRight size={18} aria-hidden="true" /></span>
              </a>
            </div>

            <ol className="inview grid grid-cols-5 items-start gap-2.5 sm:gap-4">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex flex-col items-center text-center" title={d}>
                  <div className="relative flex h-[300px] w-full max-w-[86px] items-end overflow-hidden rounded-full bg-white/10 sm:h-[340px]">
                    <div
                      className="pill-fill w-full rounded-full bg-gradient-to-t from-magenta to-rose"
                      style={{ height: `${44 + i * 14}%`, transitionDelay: `${i * 160}ms` }}
                    />
                    <span className="absolute inset-x-0 top-5 font-display text-[1.6rem] text-white/90">{i + 1}</span>
                  </div>
                  <p className="mt-4 text-[0.78rem] font-semibold leading-tight sm:text-[0.92rem]">{t}</p>
                  <p className="sr-only">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
