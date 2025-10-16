export interface FAQItem {
  id: string;
  question: {
    lt: string;
    en: string;
  };
  answer: {
    lt: string;
    en: string;
  };
}

export const faqItems: FAQItem[] = [
  {
    id: 'what-is-customs-broker',
    question: {
      lt: 'Kas yra muitinės tarpininkas ir kodėl man jo reikia?',
      en: 'What is a customs broker and why do I need one?',
    },
    answer: {
      lt: 'Muitinės tarpininkas – tai licencijuotas specialistas, atstovaujantis Jūsų interesams muitinėje. Mes užtikriname, kad visos muitinės procedūros būtų atliktos teisingai, greitai ir pagal įstatymus, taip išvengiant baudų ir krovinių vėlavimų.',
      en: 'A customs broker is a licensed specialist who represents your interests at customs. We ensure all customs procedures are done correctly, quickly, and legally, avoiding fines and cargo delays.',
    },
  },
  {
    id: 'how-long-clearance',
    question: {
      lt: 'Kiek laiko užtrunka krovinių įforminimas?',
      en: 'How long does cargo clearance take?',
    },
    answer: {
      lt: 'Standartiniais atvejais krovinių įforminimas užtrunka 2–4 valandas nuo visų dokumentų gavimo. Sudėtingesniais atvejais (pvz., veterinarinė ar fitosanitarinė kontrolė) procesas gali užtrukti iki 1–2 dienų.',
      en: 'In standard cases, cargo clearance takes 2–4 hours from receipt of all documents. In more complex cases (e.g., veterinary or phytosanitary control), the process may take up to 1–2 days.',
    },
  },
  {
    id: 'required-documents',
    question: {
      lt: 'Kokie dokumentai reikalingi krovinių įforminimui?',
      en: 'What documents are required for cargo clearance?',
    },
    answer: {
      lt: 'Būtini dokumentai: sąskaita faktūra, pakavimo lapas, transporto dokumentai (CMR, TIR CARNET), kilmės sertifikatas (jei taikoma), bei kiti specifiniai dokumentai priklausomai nuo prekių rūšies (pvz., sertifikatai, leidimai).',
      en: 'Required documents: invoice, packing list, transport documents (CMR, TIR CARNET), certificate of origin (if applicable), and other specific documents depending on the type of goods (e.g., certificates, permits).',
    },
  },
  {
    id: 'costs',
    question: {
      lt: 'Kiek kainuoja jūsų paslaugos?',
      en: 'How much do your services cost?',
    },
    answer: {
      lt: 'Kaina priklauso nuo paslaugos sudėtingumo, prekių vertės ir procedūrų tipo. Siūlome individualius įkainius kiekvienam klientui. Susisiekite su mumis dėl tikslios kainos pasiūlymo.',
      en: 'The price depends on the complexity of the service, value of goods, and type of procedures. We offer individual pricing for each client. Contact us for an accurate quote.',
    },
  },
  {
    id: 'work-hours',
    question: {
      lt: 'Kokiu laiku dirbate?',
      en: 'What are your working hours?',
    },
    answer: {
      lt: 'Dirbame darbo dienomis 8:00–17:00. Skubiais atvejais galime aptarnauti ir po darbo valandų – susisiekite telefonu dėl individualios konsultacijos.',
      en: 'We work on weekdays from 8:00 AM to 5:00 PM. In urgent cases, we can provide service after hours – contact us by phone for individual consultation.',
    },
  },
  {
    id: 'eori-registration',
    question: {
      lt: 'Ar galite padėti užsiregistruoti EORI numerį?',
      en: 'Can you help register an EORI number?',
    },
    answer: {
      lt: 'Taip, padedame užpildyti paraišką EORI numeriui gauti ir konsultuojame visais klausimais. EORI numeris būtinas norint verstis prekyba su ES šalimis.',
      en: 'Yes, we help complete the application for obtaining an EORI number and provide consultations on all questions. An EORI number is required for trade with EU countries.',
    },
  },
  {
    id: 'payment-terms',
    question: {
      lt: 'Kokios mokėjimo sąlygos?',
      en: 'What are the payment terms?',
    },
    answer: {
      lt: 'Naujiems klientams siūlome apmokėjimą po paslaugos suteikimo. Nuolatiniams partneriams taikome atidėto mokėjimo sąlygas pagal individualiai suderintą grafiką.',
      en: 'For new clients, we offer payment after service provision. For regular partners, we apply deferred payment terms according to an individually agreed schedule.',
    },
  },
  {
    id: 'guarantee-amount',
    question: {
      lt: 'Ar teikiate garantijas muitinei?',
      en: 'Do you provide guarantees to customs?',
    },
    answer: {
      lt: 'Taip, turime bendrąją garantiją, kuri leidžia operatyviai tvarkyti muitinės procedūras be papildomų laukimo laikų. Bendros metų garantijų suma viršija 500 000 EUR.',
      en: 'Yes, we have a general guarantee that allows us to handle customs procedures promptly without additional waiting times. Total annual guarantee amount exceeds EUR 500,000.',
    },
  },
  {
    id: 'transit-procedures',
    question: {
      lt: 'Ar tvarkote tranzito procedūras?',
      en: 'Do you handle transit procedures?',
    },
    answer: {
      lt: 'Taip, tvarkome visus tranzito procedūrų tipus – T1, T2, NCTS. Padedame organizuoti krovinių judėjimą per Lietuvos ir ES teritoriją.',
      en: 'Yes, we handle all types of transit procedures – T1, T2, NCTS. We help organize cargo movement through Lithuania and EU territory.',
    },
  },
  {
    id: 'consultation',
    question: {
      lt: 'Ar teikiate konsultacijas muitinės klausimais?',
      en: 'Do you provide customs consultations?',
    },
    answer: {
      lt: 'Taip, konsultuojame visais muitinės procedūrų, dokumentų pildymo, tarifų ir mokesčių klausimais. Pirmoji konsultacija – nemokama.',
      en: 'Yes, we provide consultations on all customs procedures, document completion, tariffs, and taxes. First consultation is free.',
    },
  },
  {
    id: 'special-goods',
    question: {
      lt: 'Ar dirbate su specialiomis prekėmis (pavojingos, greitas gendančios)?',
      en: 'Do you work with special goods (dangerous, perishable)?',
    },
    answer: {
      lt: 'Taip, turime patirties dirbant su specialių kategorijų prekėmis – pavojingomis, greitai gendančiomis, reikalaujančiomis specialių leidimų. Žinome visus reikalavimus ir padedame tinkamai įforminti.',
      en: 'Yes, we have experience working with special category goods – dangerous, perishable, requiring special permits. We know all requirements and help complete them properly.',
    },
  },
  {
    id: 'urgency',
    question: {
      lt: 'Ar galite įforminti krovinį skubos tvarka?',
      en: 'Can you process cargo urgently?',
    },
    answer: {
      lt: 'Taip, siūlome skubų aptarnavimą. Esant visiem dokumentams, galime įforminti krovinį per 1–2 valandas. Skubios paslaugos kainuoja papildomai.',
      en: 'Yes, we offer urgent service. With all documents available, we can process cargo within 1–2 hours. Urgent services cost extra.',
    },
  },
];

