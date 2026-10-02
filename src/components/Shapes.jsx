import markImg from '../assets/mark.webp';

/** Swarupa mark as SVG (used on dark backgrounds). */
export function Mark({ className = '', light = false }) {
  const blue = light ? '#FFFFFF' : '#155797';
  return (
    <svg viewBox="0 0 46 112" className={className} aria-hidden="true">
      <circle cx="18" cy="11" r="10" fill="#F0590B" />
      <path d="M5 26c-2 6 4 9 10 15 12 12 18 24 16 40-1 11-8 22-17 29 15-6 27-20 29-37 2-19-10-34-23-42-6-4-11-6-15-5z" fill="#F0590B" />
      <path d="M3 76c2-11 9-19 18-22-6 6-8 12-8 19 0 3 1 6 2 8-4-4-9-6-12-5z" fill={blue} />
      <circle cx="15" cy="90" r="9" fill={blue} />
    </svg>
  );
}

/** Logo lockup: poster mark + wordmark. Replace with the official vector logo when supplied. */
export function Logo({ dark = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {dark ? <Mark light className="h-11 w-auto" /> : <img src={markImg} alt="" className="h-11 w-auto" />}
      <span className="leading-none">
        <span className={`block font-display text-[1.55rem] tracking-[0.06em] ${dark ? 'text-white' : 'text-navy'}`}>SWARUPA</span>
        <span className={`mt-1 block text-[0.68rem] font-semibold tracking-[0.12em] ${dark ? 'text-rose' : 'text-saffron'}`}>FERTILITY &amp; IVF CENTRE</span>
      </span>
    </span>
  );
}

/**
 * Heading whose letters ink in one after another when it scrolls into view
 * (the reference template's signature text effect). Screen readers get the plain text.
 */
export function SplitText({ as: Tag = 'h2', text, className = '', step = 22 }) {
  const words = text.split(' ');
  let i = 0;
  return (
    <Tag className={`split ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {[...w].map((c) => {
            const d = i++ * step;
            return <span key={d} className="ch inline-block" style={{ transitionDelay: `${d}ms` }}>{c}</span>;
          })}
          {wi < words.length - 1 && <span className="ch inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

/** Soft pink/blue bokeh circles from the poster. */
export function Bokeh({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <span className="float absolute left-0 top-0 h-40 w-40 rounded-full bg-rose/40 blur-2xl" />
      <span className="float absolute left-32 top-20 h-28 w-28 rounded-full bg-sky blur-xl" style={{ animationDelay: '-2s' }} />
      <span className="float absolute left-10 top-40 h-16 w-16 rounded-full bg-magenta/15 blur-md" style={{ animationDelay: '-4s' }} />
    </div>
  );
}
