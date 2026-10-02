import { ArrowLeft, ArrowUpRight, CalendarHeart } from 'lucide-react';
import { posts } from '../data/blog';
import Todo from './Todo';
import { SplitText } from './Shapes';
import mother from '../assets/mother.webp';
import family from '../assets/hero-family.webp';
import drPhoto from '../assets/dr-chandana.webp';

const covers = [mother, family, drPhoto];

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

function Meta({ post }) {
  return (
    <span className="text-[0.85rem] text-body/75">
      {post.date ? <time dateTime={post.date}>{fmt(post.date)}</time> : <Todo>date & medical review</Todo>}
    </span>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="bg-mist py-24 lg:py-32">
      <div className="wrap">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="tag reveal">Fertility awareness</span>
          <SplitText text="Guides to help you understand your options" className="mt-5 text-[2.3rem] sm:text-[3rem]" />
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <a href={`#/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-soft">
                <div className="relative h-56 overflow-hidden rounded-[1.4rem]">
                  <img src={covers[i % covers.length]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-night/40 to-transparent" />
                  <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-xl bg-navy font-display text-[1.2rem] text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <Meta post={p} />
                  <h3 className="mt-3 text-[1.4rem] leading-snug transition-colors group-hover:text-magenta">{p.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem]">{p.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-navy">
                    Read More
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-blush text-magenta transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={16} aria-hidden="true" /></span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BlogPost({ slug }) {
  const post = posts.find((p) => p.slug === slug);
  if (!post)
    return (
      <main className="wrap pb-32 pt-44 text-center">
        <h1 className="text-4xl">Article not found</h1>
        <a href="#blog" className="btn btn-primary mt-8">Back to all articles</a>
      </main>
    );
  return (
    <main id="main" className="bg-white">
      <div className="bg-blush-soft">
        <div className="mx-auto max-w-[760px] px-5 pb-14 pt-36 sm:px-8">
          <a href="#blog" className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-magenta hover:text-navy-deep">
            <ArrowLeft size={17} aria-hidden="true" /> All articles
          </a>
          <h1 className="mt-6 text-[2.4rem] sm:text-[3.2rem]">{post.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-3">
            <Meta post={post} />
            {post.reviewedBy && <span className="text-[0.85rem]">Medically reviewed by {post.reviewedBy}</span>}
          </p>
        </div>
      </div>
      <article className="mx-auto max-w-[680px] px-5 py-14 text-[1.08rem] leading-[1.8] sm:px-8">
        {post.body.map(([type, text], i) =>
          type === 'h' ? (
            <h2 key={i} className="mb-3 mt-10 text-[1.6rem]">{text}</h2>
          ) : (
            <p key={i} className="mt-4">{text}</p>
          )
        )}
        <p className="mt-10 rounded-xl bg-mist p-5 text-[0.95rem]">
          This article is general information and not a substitute for medical advice. Please consult a doctor about your
          own situation.
        </p>
        <a href="#appointment" className="btn btn-primary mt-8">
          <CalendarHeart size={18} aria-hidden="true" /> Book a consultation
        </a>
      </article>
    </main>
  );
}
