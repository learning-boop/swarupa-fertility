import { useEffect, useState } from 'react';
import { ArrowUpRight, Phone, ShieldCheck, Siren } from 'lucide-react';
import { site, doctor, taglines } from '../config/site';
import family from '../assets/hero-family.webp';
import drPhoto from '../assets/dr-chandana.webp';

// Drop a short, silent clip at src/assets/video/hero.mp4 (or .webm) and it plays over the photo once it can.
const heroVideo = Object.values(import.meta.glob('../assets/video/hero.{mp4,webm}', { eager: true, import: 'default' }))[0];

/** Skip the video for visitors who asked for less motion or less data; they keep the photo. */
function useVideoAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    setAllowed(Boolean(heroVideo) && !reduced && !saveData);
  }, []);
  return allowed;
}

export default function Hero() {
  const videoAllowed = useVideoAllowed();
  const [playing, setPlaying] = useState(false);
  return (
    <section id="top" className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-navy-night pt-32 sm:min-h-[760px] lg:min-h-[100svh]">
      {/* full-bleed photo with slow zoom; the video fades in over it once it is actually playing */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
          <img
            src={family}
            alt="A smiling couple cradling their newborn baby"
            fetchpriority="high"
            className={`kenburns h-full w-full object-cover object-[62%_30%] transition-opacity duration-[1500ms] ${playing ? 'opacity-0' : 'opacity-100'}`}
          />
          {videoAllowed && (
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              // iOS only autoplays when muted is set on the element itself, which React's `muted` prop doesn't guarantee.
              ref={(v) => { if (v) { v.muted = true; v.defaultMuted = true; } }}
              onPlaying={() => setPlaying(true)}
              className={`absolute inset-0 h-full w-full object-cover object-[70%_50%] transition-opacity duration-[1500ms] ${playing ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-night via-navy-night/80 to-navy-night/10 lg:via-[45%] lg:via-navy-night/90 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-night/90 via-transparent to-navy-night/50" />
        <div className="absolute -bottom-40 right-[-10%] h-[420px] w-[620px] rounded-full bg-magenta/30 blur-3xl" />
        <div className="absolute -left-40 top-20 h-[380px] w-[380px] rounded-full bg-ocean/30 blur-3xl" />
      </div>

      <div className="wrap relative pb-14 lg:pb-20">
        <div className="max-w-[720px]">
          <p className="rise inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.9rem] text-white ring-1 ring-white/20 backdrop-blur" style={{ animationDelay: '.2s' }}>
            <ShieldCheck size={17} className="text-rose" aria-hidden="true" />
            {site.registration}
            {site.nabhAccredited && <span className="text-white/70">&nbsp;|&nbsp;NABH accredited</span>}
          </p>
          <p className="rise script mt-6 text-[2.4rem] leading-none text-rose sm:text-[3rem]" style={{ animationDelay: '.35s' }}>
            {taglines.hero}
          </p>
          <h1 className="rise mt-3 text-[2.9rem] !text-white sm:text-[4rem] lg:text-[5rem]" style={{ animationDelay: '.5s' }}>
            Your dream of parenthood begins here
          </h1>
          <p className="rise mt-6 max-w-[54ch] text-[1.1rem] leading-relaxed text-white/85" style={{ animationDelay: '.7s' }}>
            Advanced fertility treatments, compassionate care and personalised guidance at every step of your journey.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '.85s' }}>
            <a href="#appointment" className="btn btn-primary btn-arrow">
              Book an Appointment <span className="badge"><ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
            <a href="#treatments" className="btn border border-white/40 text-white hover:bg-white hover:text-navy">Explore Treatments</a>
          </div>
        </div>

        {/* info strip */}
        <div className="rise mt-14 grid gap-3 sm:grid-cols-2 lg:max-w-[900px] lg:grid-cols-3" style={{ animationDelay: '1.05s' }}>
          <a href="#doctor" className="group flex items-center gap-4 rounded-2xl bg-white/10 p-3 pr-5 text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15">
            <img src={drPhoto} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <span className="leading-snug">
              <span className="block font-display text-[1.05rem]">{doctor.name}</span>
              <span className="block text-[0.82rem] text-white/75">{doctor.qualifications}, infertility specialist</span>
            </span>
          </a>
          <a href={`tel:${site.phone.tel}`} className="flex items-center gap-4 rounded-2xl bg-white/10 p-3 pr-5 text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-white text-navy"><Phone size={22} aria-hidden="true" /></span>
            <span className="leading-snug">
              <span className="block text-[0.82rem] text-white/75">Appointments</span>
              <span className="block font-display text-[1.15rem]">{site.phone.display}</span>
            </span>
          </a>
          <a href={`tel:${site.emergencyPhone.tel}`} className="flex items-center gap-4 rounded-2xl bg-emergency/90 p-3 pr-5 text-white transition hover:bg-emergency sm:col-span-2 lg:col-span-1">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-white text-emergency"><Siren size={22} aria-hidden="true" /></span>
            <span className="leading-snug">
              <span className="block text-[0.82rem] text-white/85">{site.emergency}</span>
              <span className="block font-display text-[1.15rem]">{site.emergencyPhone.display}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
