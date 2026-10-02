import pm1 from '../assets/pregnancy/month-1.webp';
import pm2 from '../assets/pregnancy/month-2.webp';
import pm3 from '../assets/pregnancy/month-3.webp';
import pm4 from '../assets/pregnancy/month-4.webp';
import pm5 from '../assets/pregnancy/month-5.webp';
import pm6 from '../assets/pregnancy/month-6.webp';
import pm7 from '../assets/pregnancy/month-7.webp';
import pm8 from '../assets/pregnancy/month-8.webp';
import pm9 from '../assets/pregnancy/month-9.webp';

/**
 * ─────────────────────────────────────────────────────────────
 *  SWARUPA FERTILITY & IVF CENTER — SITE CONFIGURATION
 *  Every fact shown on the website lives in this one file.
 *
 *  Sourced from the hospital's two posters:
 *    name, logo, doctor photo and title, treatments and care areas,
 *    phone numbers, address, ART Clinic Level II, 24/7 emergency,
 *    parent hospital, its departments and its taglines.
 *
 *  Anything set to null / [] is NOT yet verified. While
 *  `showPlaceholders` is true, those spots render a dashed
 *  "To confirm" chip so the client can review what is missing.
 *  Set it to false before launch.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  showPlaceholders: true,

  name: 'Swarupa Fertility & IVF Center',
  shortName: 'Swarupa Fertility',
  nameTelugu: 'స్వరూప ఫర్టిలిటి & IVF సెంటర్',
  tagline: 'Your journey towards parenthood.',
  parentHospital: 'Sri Swarupa Super Speciality Hospital',
  registration: 'Registered ART Clinic, Level II',
  url: 'https://www.swarupafertility.com', // TODO: replace with the live domain

  phone: { display: '0866 243 3979', tel: '+918662433979' },
  // The new poster lists 888 646 1236; the earlier poster listed 91216 08386.
  mobile: { display: '888 646 1236', tel: '+918886461236' },
  altMobile: { display: '91216 08386', tel: '+919121608386' }, // set to null if no longer in use
  whatsapp: '918886461236', // TODO: confirm which mobile number is on WhatsApp
  emergency: '24/7 Emergency',
  // Which number answers emergencies? Currently the mobile. TODO: confirm.
  emergencyPhone: { display: '888 646 1236', tel: '+918886461236' },
  // Shown as a badge only once confirmed (the NABH logo appears on the new poster)
  nabhAccredited: null, // true | false
  email: null, // e.g. 'care@swarupafertility.com'

  address: {
    lines: [
      '4th Floor, Sri Swarupa Super Speciality Hospital',
      'Kaleswara Rao Road, near Pushpa Hotel Bus Stop',
      'Suryaraopet, Vijayawada',
    ],
    locality: 'Suryaraopet',
    city: 'Vijayawada',
    region: 'Andhra Pradesh',
    postalCode: null, // TODO: add PIN code
    country: 'IN',
  },

  // e.g. [{ days: 'Monday to Saturday', time: '9:00 am – 7:00 pm' }, { days: 'Sunday', time: 'Closed' }]
  hours: [],

  // Google Maps → Share → Embed a map → copy the src="" URL
  mapEmbedUrl: null,
  mapLink:
    'https://www.google.com/maps/search/?api=1&query=Swarupa+Fertility+and+IVF+Centre+Kaleswara+Rao+Road+Suryaraopet+Vijayawada',

  social: {
    facebook: null,
    instagram: null,
    youtube: null,
  },

  // Appointment form: POST JSON to any endpoint (Formspree, Web3Forms,
  // Google Apps Script, your own API). If null, the form validates and
  // then hands the request over to WhatsApp so no enquiry is lost.
  formEndpoint: null,
};

export const doctor = {
  name: 'Dr. Chandana Veeramachaneni',
  nameTelugu: 'డా॥ చందన వీరమాచనేని',
  qualifications: 'MS (OBG)',
  specialisation: 'Consultant Gynaecologist, Infertility Specialist & Laparoscopic Surgeon',
  // Verified-only summary. Extend once the doctor approves a full bio.
  bio: 'Dr. Chandana Veeramachaneni (MS, OBG) is a consultant gynaecologist, infertility specialist and laparoscopic surgeon. She consults at Swarupa Fertility & IVF Center, part of Sri Swarupa Super Speciality Hospital in Suryaraopet, Vijayawada.',
  experience: null, // e.g. '15+ years'
  memberships: [], // e.g. ['FOGSI', 'ISAR']
};

// Brand lines from the posters
export const taglines = {
  hero: 'A new beginning, a brighter tomorrow',
  hope: 'Hope begins here',
  care: 'We care for every dream. We deliver every hope.',
  mission: 'Your parenthood, our mission',
  telugu: 'సంతాన సాఫల్యతా సేవలు మీకు అందుబాటులో',
};

// Counters. Only verifiable figures. Add e.g. { value: 15, suffix: '+', label: 'Years of experience' } once confirmed.
export const stats = [
  { value: 8, suffix: '', label: 'Fertility treatments under one roof' },
  { value: 24, suffix: '/7', label: 'Emergency care at the hospital' },
  { value: 6, suffix: '', label: 'Specialities beyond fertility' },
];

export const otherDepartments = [
  '24-hour dialysis',
  'Kidney stone & kidney disease care',
  'Trauma & joint replacement',
  'Critical care',
  'Laparoscopic surgery',
  'General medicine',
];

/**
 * Patient stories — ONLY add genuine, consented stories supplied by
 * the hospital. Leave `rating` out unless it is a verified review.
 * Example entries are flagged `sample: true` and are hidden when
 * showPlaceholders is false.
 */
export const testimonials = [
  {
    sample: true,
    quote:
      'Sample story. Replace with a genuine patient experience supplied by the hospital, shared with written consent.',
    name: 'Patient name or initials',
    detail: 'Treatment, city',
  },
  {
    sample: true,
    quote:
      'Sample story. Keep stories about the care and support received; avoid promising outcomes to other couples.',
    name: 'Patient name or initials',
    detail: 'Treatment, city',
  },
  {
    sample: true,
    quote:
      'Sample story. Verified Google reviews can also be quoted here with the reviewer\u2019s permission.',
    name: 'Patient name or initials',
    detail: 'Treatment, city',
  },
];

/**
 * Optional: licensed pregnancy illustrations (9 images, month 1 → 9).
 * Example:
 *   import m1 from '../assets/pregnancy/month-1.png'; ...
 *   export const pregnancyImages = [m1, m2, m3, m4, m5, m6, m7, m8, m9];
 * Leave as null to use the built-in SVG illustrations.
 */
export const pregnancyImages = [pm1, pm2, pm3, pm4, pm5, pm6, pm7, pm8, pm9];

/**
 * Video section. Use ONE of:
 *   youtubeId: the id from a YouTube link (youtube.com/watch?v=THIS_PART)
 *   mp4:       a self-hosted file, e.g. import tour from '../assets/video/tour.mp4'
 * backgroundMp4 (optional): a short, silent, looping clip shown behind the section.
 */
export const video = {
  youtubeId: null,
  mp4: null,
  backgroundMp4: null,
  title: 'A look inside Swarupa Fertility & IVF Center',
  duration: null, // e.g. '2:30'
};

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Our Doctors', href: '#doctor' },
  { label: 'Patient Stories', href: '#stories' },
  { label: 'Contact', href: '#contact' },
];

export const waLink = (text = 'Hello Swarupa Fertility, I would like to book an appointment.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
