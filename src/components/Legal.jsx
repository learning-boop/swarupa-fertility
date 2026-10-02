import { ArrowLeft } from 'lucide-react';
import { site } from '../config/site';
import Todo from './Todo';

// Starter text only. Have the hospital's legal advisor review before launch.
const pages = {
  privacy: {
    title: 'Privacy policy',
    body: [
      ['p', `This policy explains how ${site.name} ("we") handles information you share through this website.`],
      ['h', 'What we collect'],
      ['p', 'When you request an appointment we collect your name, phone number, optional email address, preferred date, treatment of interest and any message you choose to include.'],
      ['h', 'How we use it'],
      ['p', 'We use these details only to contact you about your appointment and enquiry. We do not sell your information or use it for unrelated marketing.'],
      ['h', 'Medical information'],
      ['p', 'Please do not send detailed medical records through the website form. Bring them to your consultation, where they are handled under the hospital\u2019s medical confidentiality procedures.'],
      ['h', 'Your choices'],
      ['p', `To ask us to correct or delete your enquiry details, call ${site.phone.display}.`],
    ],
  },
  terms: {
    title: 'Terms and conditions',
    body: [
      ['p', `This website gives general information about ${site.name} and its services.`],
      ['h', 'Not medical advice'],
      ['p', 'Content on this website is for general education and is not a substitute for a consultation. Treatment suitability and outcomes vary between individuals and are discussed during your visit.'],
      ['h', 'Appointments'],
      ['p', 'Submitting the appointment form is a request. Your appointment is confirmed only when the clinic contacts you.'],
      ['h', 'Content'],
      ['p', 'Text, images and the Swarupa name and logo on this website belong to the hospital and may not be reused without permission.'],
    ],
  },
};

export default function Legal({ page }) {
  const p = pages[page];
  return (
    <main id="main" className="bg-white">
      <div className="mx-auto max-w-[680px] px-5 pb-16 pt-36 sm:px-8">
        <a href="#top" className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-magenta">
          <ArrowLeft size={17} aria-hidden="true" /> Back to home
        </a>
        <h1 className="mt-6 text-[2.6rem]">{p.title}</h1>
        <Todo className="mt-4">legal review of this draft</Todo>
        {p.body.map(([t, x], i) =>
          t === 'h' ? <h2 key={i} className="mb-2 mt-9 text-[1.5rem]">{x}</h2> : <p key={i} className="mt-3 leading-[1.8]">{x}</p>
        )}
      </div>
    </main>
  );
}
