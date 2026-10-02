# Swarupa Fertility & IVF Center — website

React 18 + Vite 6 + Tailwind CSS v4 + Lucide icons. Single-page site with hash routes for blog articles (`#/blog/<slug>`) and legal pages (`#/privacy`, `#/terms`).

## Run

```bash
npm install
npm run dev            # local development
npm run build          # production build → dist/  (deploy this to Vercel)
npm run build:preview  # one self-contained HTML file → dist-preview/index.html
```

**Vercel:** import the repo. Use framework preset "Vite", build command `npm run build`, output directory `dist`.

## Where to edit

| What | File |
|---|---|
| All hospital facts, contact details, hours, socials, form endpoint, testimonials | `src/config/site.js` |
| Treatments (cards + detail dialogs + form options) | `src/data/treatments.js` |
| Blog articles | `src/data/blog.js` |
| Pregnancy timeline (month-by-month text) | `src/data/pregnancy.js` |
| FAQs | `src/data/faqs.js` |
| Video section (YouTube id, MP4, optional silent background clip) | `video` in `src/config/site.js` |
| Pregnancy illustrations (built-in SVG, or plug in 9 licensed images via `pregnancyImages` in site.js) | `src/components/PregnancyFigure.jsx` |
| Colours, fonts, radii, shadows | `src/index.css` (`@theme`) |
| SEO meta tags + JSON-LD | `index.html` |
| Images | `src/assets/` |

## Before launch checklist

`showPlaceholders: true` in `site.js` makes every unverified spot show a dashed **"To confirm"** chip. Fill these in, then set it to `false`:

- [ ] Working hours → `site.hours`
- [ ] PIN code → `site.address.postalCode`
- [ ] Google Maps embed URL → `site.mapEmbedUrl` (Maps → Share → Embed a map → copy the `src`)
- [ ] Confirm WhatsApp number (currently the mobile 91216 08386)
- [ ] Email and social links (optional; hidden when empty)
- [ ] Doctor: years of experience, memberships, approved bio → `doctor`
- [ ] Genuine, consented patient stories → `testimonials` (delete the `sample: true` entries)
- [ ] Blog: dates and `reviewedBy` after the doctor reviews each article
- [ ] Treatment descriptions, FAQs and pregnancy timeline reviewed by the doctor
- [ ] Privacy policy and terms reviewed by the hospital's legal advisor
- [ ] Hospital video → `video.youtubeId` or `video.mp4` in `site.js`
- [ ] Why Choose photo → `whyImage` in `src/components/WhyChoose.jsx`
- [ ] Live domain → `site.url`, `index.html` canonical, `public/robots.txt`, `public/sitemap.xml`
- [ ] Form backend → `site.formEndpoint` (Formspree, Web3Forms, Google Apps Script or your own API; the request body is JSON). Until it is set, the form hands requests to WhatsApp.

## Images

`logo.webp`, `logo-white.webp`, `dr-chandana.webp` and `hero-family.webp` were cut from the 523×719 poster and upscaled, so they look soft. Replace them with full-resolution originals using the same file names: the vector or PNG logo, the doctor's original photo, and the licensed stock family photo. The hero frame crops to roughly 1.08:1, so keep the baby to the right of centre.

## Content rules followed

Only facts from the hospital's poster are presented as fact. There are no invented credentials, statistics, success rates or reviews, and no pregnancy outcomes are promised.
