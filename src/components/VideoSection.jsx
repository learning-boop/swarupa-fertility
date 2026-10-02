import { useEffect, useRef, useState } from 'react';
import { Play, X, Clapperboard } from 'lucide-react';
import { site, video, taglines } from '../config/site';
import { SplitText } from './Shapes';
import Todo from './Todo';
import hospital from '../assets/hospital.webp';

function VideoDialog({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const hasVideo = video.youtubeId || video.mp4;
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(1100px,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-navy-night/85 backdrop:backdrop-blur-sm"
      aria-label={video.title}
    >
      <button onClick={onClose} className="absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full bg-white text-navy shadow-soft" aria-label="Close video">
        <X size={20} />
      </button>
      {/* only mounted while open, so closing stops playback */}
      {open && (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
          {video.youtubeId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : video.mp4 ? (
            <video className="h-full w-full" src={video.mp4} controls autoPlay playsInline />
          ) : (
            <div className="grid h-full place-items-center bg-navy-deep p-8 text-center text-white">
              <div>
                <Clapperboard size={44} className="mx-auto text-rose" aria-hidden="true" />
                <p className="mt-4 font-display text-[1.6rem]">The hospital video plays here</p>
                <p className="mx-auto mt-2 max-w-[44ch] text-white/75">
                  Add a YouTube link or an MP4 file in <code className="rounded bg-white/10 px-1.5">src/config/site.js</code> under <code className="rounded bg-white/10 px-1.5">video</code>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {!hasVideo && <span className="sr-only">No video added yet</span>}
    </dialog>
  );
}

export default function VideoSection() {
  const [open, setOpen] = useState(false);
  const hasVideo = video.youtubeId || video.mp4;
  if (!hasVideo && !site.showPlaceholders) return null;

  return (
    <section aria-label="Hospital video" className="py-16 lg:py-24">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-navy-night">
          {/* background: looping clip if provided, otherwise a photo with parallax */}
          <div className="absolute inset-0 -z-10">
            {video.backgroundMp4 ? (
              <video className="h-full w-full object-cover" src={video.backgroundMp4} autoPlay muted loop playsInline aria-hidden="true" />
            ) : (
              <div data-speed="0.12" className="absolute -inset-y-24 inset-x-0">
                <img src={hospital} alt="" className="h-full w-full object-cover" decoding="async" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-night/95 via-navy-night/70 to-navy-night/30" />
            <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-magenta/30 blur-3xl" />
          </div>

          <div className="grid min-h-[520px] items-center gap-12 px-6 py-16 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">
            <div className="text-white">
              <span className="tag tag-dark reveal">Watch</span>
              <SplitText text="See where your journey to parenthood begins" className="mt-5 max-w-[16ch] text-[2.3rem] !text-white sm:text-[3.2rem]" />
              <p className="reveal mt-5 max-w-[48ch] text-white/80">
                Meet the team, see the clinic, and hear how care works at Swarupa, from the first consultation onwards.
              </p>
              <p className="reveal script mt-6 text-[2rem] leading-none text-rose">{taglines.hope}</p>
              {!hasVideo && <Todo className="mt-6 !border-white/60 !bg-white/10 !text-white">hospital video (YouTube link or MP4)</Todo>}
            </div>

            <div className="flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative grid h-36 w-36 place-items-center rounded-full sm:h-44 sm:w-44"
                aria-label={`Play video: ${video.title}`}
              >
                {/* ripple rings */}
                <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border-2 border-white/40" />
                <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border-2 border-white/30" style={{ animationDelay: '1s' }} />
                <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border-2 border-white/20" style={{ animationDelay: '2s' }} />
                {/* rotating text ring */}
                <svg viewBox="0 0 200 200" className="spin absolute inset-0 h-full w-full text-white/85" aria-hidden="true">
                  <defs>
                    <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text fontSize="13" letterSpacing="5" fill="currentColor" fontFamily="Hanken Grotesk, sans-serif" fontWeight="600">
                    <textPath href="#ring">WATCH OUR STORY &#8226; SWARUPA FERTILITY &#8226; </textPath>
                  </text>
                </svg>
                <span className="relative grid h-20 w-20 place-items-center rounded-full bg-magenta text-white shadow-pink transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24">
                  <Play size={30} fill="currentColor" className="ml-1" aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>

          {video.duration && (
            <p className="absolute bottom-6 right-8 rounded-full bg-white/10 px-3 py-1 text-[0.85rem] text-white ring-1 ring-white/20">{video.duration}</p>
          )}
        </div>
      </div>
      <VideoDialog open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
