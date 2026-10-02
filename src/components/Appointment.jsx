import { useState } from 'react';
import { CalendarHeart, CheckCircle2, Loader2, MessageCircle, Phone } from 'lucide-react';
import { site, waLink } from '../config/site';
import { SplitText } from './Shapes';
import { treatmentOptions } from '../data/treatments';

const empty = { name: '', phone: '', email: '', date: '', treatment: '', message: '' };
const today = () => new Date().toISOString().slice(0, 10);

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  const digits = v.phone.replace(/\D/g, '').replace(/^(91|0)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a 10-digit mobile number, for example 91216 08386.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Check the email address, or leave it blank.';
  if (!v.date) e.date = 'Choose a preferred date.';
  else if (v.date < today()) e.date = 'Choose today or a later date.';
  if (!v.treatment) e.treatment = 'Choose a treatment, or "Not sure yet".';
  return e;
}

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9rem] font-semibold text-navy">
        {label} {optional && <span className="font-normal text-body/60">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-[0.85rem] text-magenta">{error}</p>}
    </div>
  );
}

export default function Appointment() {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [via, setVia] = useState('form');

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };
  const a11y = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });

  const summary = () =>
    `Appointment request – ${site.shortName}\nName: ${v.name}\nPhone: ${v.phone}${v.email ? `\nEmail: ${v.email}` : ''}\nPreferred date: ${v.date}\nTreatment: ${v.treatment}${v.message ? `\nMessage: ${v.message}` : ''}`;

  async function submit(e) {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus('sending');
    if (!site.formEndpoint) {
      // No backend configured yet: hand the request to WhatsApp.
      window.open(waLink(summary()), '_blank', 'noopener');
      setVia('whatsapp');
      setStatus('sent');
      return;
    }
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...v, source: 'website', submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(res.statusText);
      setVia('form');
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <section id="appointment" className="relative overflow-hidden bg-blush py-24 lg:py-32">
      <svg aria-hidden="true" viewBox="0 0 800 800" className="absolute -left-48 -top-40 h-[640px] w-[640px] text-white/60">
        <path d="M400 40c200 0 360 160 360 360S600 760 400 760 40 600 40 400" fill="none" stroke="currentColor" strokeWidth="60" strokeLinecap="round" />
      </svg>

      <div className="wrap relative grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32">
          <span className="tag reveal">Appointment</span>
          <SplitText text="Take the first step towards parenthood" className="mt-5 text-[2.4rem] sm:text-[3.1rem]" />
          <p className="reveal lede mt-6">
            Tell us a little about yourself and choose a day that suits you. The clinic team will call you to confirm the
            appointment time.
          </p>
          <div className="reveal mt-9 grid gap-3 sm:max-w-sm">
            <a href={waLink()} target="_blank" rel="noopener" className="btn bg-[#1F9E5A] text-white hover:bg-[#178049]">
              <MessageCircle size={19} aria-hidden="true" /> Chat on WhatsApp
            </a>
            <a href={`tel:${site.phone.tel}`} className="btn btn-light">
              <Phone size={18} aria-hidden="true" /> Call {site.phone.display}
            </a>
          </div>
        </div>

        <div className="reveal rounded-[2rem] bg-white p-7 shadow-soft sm:p-10">
          {status === 'sent' ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2 size={56} className="mx-auto text-magenta" aria-hidden="true" />
              <h3 className="mt-5 text-[1.9rem]">
                {via === 'whatsapp' ? 'Your request is ready in WhatsApp' : 'Appointment request received'}
              </h3>
              <p className="mx-auto mt-3 max-w-[40ch]">
                {via === 'whatsapp'
                  ? 'Press send in WhatsApp to share your details with the clinic. We will call you to confirm a time.'
                  : `Thank you, ${v.name.split(' ')[0]}. The clinic will call you on ${v.phone} to confirm your appointment.`}
              </p>
              <button type="button" onClick={() => { setV(empty); setStatus('idle'); }} className="btn btn-ghost mt-8">
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id="name" label="Full name" error={errors.name}>
                  <input id="name" className={`field ${errors.name ? 'field-error' : ''}`} autoComplete="name" value={v.name} onChange={set('name')} {...a11y('name')} />
                </Field>
              </div>
              <Field id="phone" label="Phone number" error={errors.phone}>
                <input id="phone" type="tel" inputMode="tel" className={`field ${errors.phone ? 'field-error' : ''}`} autoComplete="tel" placeholder="10-digit mobile" value={v.phone} onChange={set('phone')} {...a11y('phone')} />
              </Field>
              <Field id="email" label="Email address" optional error={errors.email}>
                <input id="email" type="email" className={`field ${errors.email ? 'field-error' : ''}`} autoComplete="email" value={v.email} onChange={set('email')} {...a11y('email')} />
              </Field>
              <Field id="date" label="Preferred appointment date" error={errors.date}>
                <input id="date" type="date" min={today()} className={`field ${errors.date ? 'field-error' : ''}`} value={v.date} onChange={set('date')} {...a11y('date')} />
              </Field>
              <Field id="treatment" label="Treatment of interest" error={errors.treatment}>
                <select id="treatment" className={`field ${errors.treatment ? 'field-error' : ''}`} value={v.treatment} onChange={set('treatment')} {...a11y('treatment')}>
                  <option value="">Choose one</option>
                  {treatmentOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field id="message" label="Message" optional>
                  <textarea id="message" rows={4} className="field resize-y" placeholder="Anything you would like the doctor to know before your visit" value={v.message} onChange={set('message')} />
                </Field>
              </div>
              {status === 'failed' && (
                <p className="rounded-xl bg-magenta/10 p-4 text-[0.92rem] text-magenta sm:col-span-2" role="alert">
                  The request could not be sent. Check your connection and try again, or call {site.phone.display}.
                </p>
              )}
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:opacity-70">
                  {status === 'sending' ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <CalendarHeart size={18} aria-hidden="true" />}
                  {status === 'sending' ? 'Sending request' : 'Book an Appointment'}
                </button>
                <p className="mt-3 text-center text-[0.82rem] text-body/70">
                  Your details are used only to arrange your appointment.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
