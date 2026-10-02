// Treatments as listed on the hospital's poster. Descriptions are general
// patient education — have the doctor review before launch.
export const treatments = [
  {
    id: 'evaluation',
    name: 'Fertility Evaluation',
    full: 'Assessment & counselling',
    icon: 'ClipboardList',
    short: 'Tests for both partners and an unhurried conversation about what they show.',
    body: [
      'Most fertility care begins with understanding the cause. Evaluation usually includes a review of your history, an ultrasound scan, hormone and ovarian reserve tests, a check of the fallopian tubes where needed, and a semen analysis for the male partner.',
      'Counselling runs alongside the tests, so you know what each result means and what the reasonable next steps are before any treatment is chosen.',
    ],
  },
  {
    id: 'iui',
    name: 'IUI',
    full: 'Intrauterine Insemination',
    icon: 'Droplets',
    short: 'Washed, concentrated sperm placed directly in the uterus around ovulation.',
    body: [
      'IUI places a prepared sample of sperm directly into the uterus close to the time of ovulation, shortening the distance sperm need to travel.',
      'It is often considered for mild male-factor concerns, cervical factors, unexplained infertility or when donor sperm is used. It may be done in a natural cycle or with medicines that support ovulation.',
      'The procedure itself takes a few minutes in the clinic and does not need anaesthesia.',
    ],
  },
  {
    id: 'ivf',
    name: 'IVF',
    full: 'In Vitro Fertilization',
    icon: 'FlaskConical',
    short: 'Eggs and sperm are brought together in the laboratory and an embryo is transferred.',
    body: [
      'In IVF, medicines stimulate the ovaries to produce several eggs. These are collected in a short procedure, fertilised with sperm in the embryology laboratory, and the developing embryo is transferred to the uterus.',
      'IVF may be advised for blocked or damaged fallopian tubes, endometriosis, reduced ovarian reserve, male-factor infertility or when earlier treatments have not worked.',
      'Each step is monitored with scans and blood tests, and the plan is adjusted to how the body responds.',
    ],
  },
  {
    id: 'icsi',
    name: 'ICSI',
    full: 'Intracytoplasmic Sperm Injection',
    icon: 'Microscope',
    short: 'A single sperm is injected into each mature egg as part of IVF.',
    body: [
      'ICSI is a laboratory technique used within an IVF cycle. An embryologist selects a single sperm and injects it directly into a mature egg to help fertilisation.',
      'It is commonly used when sperm count or movement is low, when sperm has been retrieved surgically, or when fertilisation was poor in an earlier IVF cycle.',
    ],
  },
  {
    id: 'tesa',
    name: 'TESA',
    full: 'Testicular Sperm Aspiration',
    icon: 'Syringe',
    short: 'Sperm retrieved directly from the testis when none is present in the semen.',
    body: [
      'TESA collects sperm from the testis using a fine needle, usually under local anaesthesia. The retrieved sperm is then used for ICSI.',
      'It may be an option for men with azoospermia (no sperm in the ejaculate), depending on the cause found during evaluation.',
    ],
  },
  {
    id: 'donor',
    name: 'Donor Program',
    full: 'Donor egg and sperm treatment',
    icon: 'HeartHandshake',
    short: 'Treatment using donor eggs or sperm, within ART regulations.',
    body: [
      'For some couples, using donor eggs or donor sperm offers a path to parenthood. Donor treatment in India is regulated under the Assisted Reproductive Technology (Regulation) Act, 2021.',
      'The team explains the eligibility criteria, screening, legal consent and counselling involved before any decision is made.',
    ],
  },
  {
    id: 'bank',
    name: 'Sperm & Embryo Bank',
    full: 'Freezing and storage',
    icon: 'Snowflake',
    short: 'Freezing and safe storage of sperm and embryos for future use.',
    body: [
      'Cryopreservation lets sperm and embryos be frozen and stored for later treatment cycles.',
      'Embryo freezing can allow surplus good-quality embryos from one IVF cycle to be used later. Sperm freezing can help before medical treatments that may affect fertility, or when a partner cannot be present on the day of treatment.',
    ],
  },
  {
    id: 'laparoscopy',
    name: 'Laparoscopy',
    full: 'Keyhole surgery',
    icon: 'ScanSearch',
    short: 'Keyhole surgery to diagnose and treat problems affecting fertility.',
    body: [
      'Laparoscopy uses a thin camera passed through a small cut near the navel to look at the uterus, tubes and ovaries.',
      'It can diagnose and treat conditions such as endometriosis, ovarian cysts, fibroids, adhesions and tubal problems, usually with a shorter recovery than open surgery.',
    ],
  },
  {
    id: 'hysteroscopy',
    name: 'Hysteroscopy',
    full: 'Examining the uterine cavity',
    icon: 'Eye',
    short: 'A camera examines the inside of the uterus and treats polyps, septum or adhesions.',
    body: [
      'Hysteroscopy passes a slim telescope through the cervix to view the inside of the uterus, with no external cuts.',
      'It helps find and correct problems such as polyps, fibroids inside the cavity, a uterine septum or adhesions that can affect implantation.',
    ],
  },
  {
    id: 'high-risk',
    name: 'High-Risk Pregnancy',
    full: 'Specialist pregnancy care',
    icon: 'HeartPulse',
    short: 'Closer monitoring for pregnancies that need extra attention.',
    body: [
      'Some pregnancies need more frequent review, for example after fertility treatment, with twins, or with conditions such as high blood pressure, diabetes or thyroid disease.',
      'Care is planned with regular scans and check-ups, with the hospital\u2019s 24-hour emergency and critical care services close at hand.',
    ],
  },
  {
    id: 'womens-health',
    name: 'Women\u2019s Health',
    full: 'Gynaecology & comprehensive care',
    icon: 'Flower2',
    short: 'Gynaecology care across life stages, from periods to menopause.',
    body: [
      'Beyond fertility, the gynaecology service sees women for menstrual problems, PCOS, fibroids, ovarian cysts, infections, pre-pregnancy check-ups and menopause care.',
      'Where surgery is needed, many procedures can be done by laparoscopy or hysteroscopy for a quicker recovery.',
    ],
  },
];

export const treatmentOptions = [
  ...treatments.map((t) => `${t.name}${t.full && t.name.length < 6 ? ` (${t.full})` : ''}`),
  'Not sure yet',
];
