import React from 'react';
import {
  FileText,
  Truck,
  Package,
  Signature,
  Scales,
  Tag,
  ClipboardText,
} from '@phosphor-icons/react';
import sandeliavimas from '@/assets/paslaugos/sandeliavimas.png';
import mechanizuotas from '@/assets/paslaugos/mechanizuotas.png';

export interface Service {
  id: string;
  title: {
    lt: string;
    en: string;
  };
  description: {
    lt: string;
    en: string;
  };
  icon?: React.ComponentType<any>;
  image?: string;
}

export const services: Service[] = [
  {
    id: 'tir-carnet',
    title: {
      lt: 'TIR CARNET pildymas',
      en: 'TIR CARNET Completion',
    },
    description: {
      lt: 'Profesionalus TIR CARNET dokumentų pildymas tarptautiniam krovinių vežimui. Užtikriname tik kybą ir atitiktį tarptautiniams reikalavimams.',
      en: 'Professional TIR CARNET document completion for international cargo transport. We ensure accuracy and compliance with international requirements.',
    },
    icon: Signature,
  },
  {
    id: 'cmr',
    title: {
      lt: 'CMR pildymas',
      en: 'CMR Completion',
    },
    description: {
      lt: 'CMR važtaraščių pildymas krovinių vežimui keliais. Padedame tinkamai įforminti visus reikalingus dokumentus.',
      en: 'CMR waybill completion for road cargo transport. We help properly complete all required documents.',
    },
    icon: FileText,
  },
  {
    id: 'export',
    title: {
      lt: 'Eksportas',
      en: 'Export',
    },
    description: {
      lt: 'Pilnas eksporto procedūrų valdymas – nuo deklaracijų pildymo iki krovinių išleidimo. Dirbame su visų rūšių prekėmis.',
      en: 'Complete export procedure management – from declaration completion to cargo release. We work with all types of goods.',
    },
    icon: Truck,
  },
  {
    id: 'import',
    title: {
      lt: 'Importas',
      en: 'Import',
    },
    description: {
      lt: 'Importo muitinės procedūrų tvarkymas. Atstovaujame Jūsų interesams muitinėje, užtikriname sklandų krovinių įforminimą.',
      en: 'Import customs procedures handling. We represent your interests at customs and ensure smooth cargo processing.',
    },
    icon: Package,
  },
  {
    id: 'e-manifest',
    title: {
      lt: 'E-Manifestas',
      en: 'E-Manifest',
    },
    description: {
      lt: 'Elektroninio manifesto pildymas ir pateikimas muitinės sistemoje. Spartus ir patikimas aptarnavimas.',
      en: 'Electronic manifest completion and submission to customs system. Fast and reliable service.',
    },
    icon: ClipboardText,
  },
  {
    id: 'intermediary',
    title: {
      lt: 'Tarpininkavimas prekybiniuose sandoriuose',
      en: 'Trade Transaction Intermediary',
    },
    description: {
      lt: 'Profesionalus tarpininkavimas sudėtingose prekybos operacijose. Padedame tinkamai įforminti visus muitinės dokumentus.',
      en: 'Professional intermediary services in complex trade operations. We help properly complete all customs documents.',
    },
    icon: Signature,
  },
  {
    id: 'documents',
    title: {
      lt: 'Dokumentų sutvarkymas išsiuntimui',
      en: 'Document Preparation for Shipment',
    },
    description: {
      lt: 'Visų reikalingų dokumentų (pažymų, leidimų, sertifikatų) paruošimas ir sutvarkymas krovinių išsiuntimui.',
      en: 'Preparation and organization of all required documents (certificates, permits, etc.) for cargo shipment.',
    },
    icon: FileText,
  },
  {
    id: 'warehousing',
    title: {
      lt: 'Sandėliavimas',
      en: 'Warehousing',
    },
    description: {
      lt: 'Saugus ir patikimas krovinių sandėliavimas. Modernios patalpos su visais reikalingais leidimais.',
      en: 'Safe and reliable cargo warehousing. Modern facilities with all necessary permits.',
    },
    image: sandeliavimas,
  },
  {
    id: 'parking',
    title: {
      lt: 'Transporto priemonių parkavimo aikštelė',
      en: 'Vehicle Parking Area',
    },
    description: {
      lt: 'Saugi ir prižiūrima transporto priemonių stovėjimo aikštelė. Patogu vairuotojams ir logistikos įmonėms.',
      en: 'Secure and supervised vehicle parking area. Convenient for drivers and logistics companies.',
    },
    icon: Truck,
  },
  {
    id: 'loading-mechanized',
    title: {
      lt: 'Mechanizuotas iškrovimas–pakrovimas',
      en: 'Mechanized Loading–Unloading',
    },
    description: {
      lt: 'Greitas ir saugus krovinių iškrovimas bei pakrovimas, naudojant modernią įrangą.',
      en: 'Fast and safe cargo loading and unloading using modern equipment.',
    },
    image: mechanizuotas,
  },
  {
    id: 'loading-manual',
    title: {
      lt: 'Rankinis iškrovimas–pakrovimas',
      en: 'Manual Loading–Unloading',
    },
    description: {
      lt: 'Rankinis krovinių tvarkymas, kai reikalinga speciali priežiūra ir atsargus elgesys su preke.',
      en: 'Manual cargo handling when special care and careful treatment of goods is required.',
    },
    icon: Package,
  },
  {
    id: 'sorting',
    title: {
      lt: 'Prekių rūšiavimas, ženklinimas',
      en: 'Goods Sorting & Labeling',
    },
    description: {
      lt: 'Profesionalus prekių rūšiavimas pagal kategorijas ir tinkamas ženklinimas pagal reikalavimus.',
      en: 'Professional goods sorting by categories and proper labeling according to requirements.',
    },
    icon: Tag,
  },
  {
    id: 'weighing',
    title: {
      lt: 'Transporto priemonių svėrimas',
      en: 'Vehicle Weighing',
    },
    description: {
      lt: 'Tikslus transporto priemonių ir krovinių svėrimas sertifikuotomis svarstyklėmis.',
      en: 'Accurate vehicle and cargo weighing with certified scales.',
    },
    icon: Scales,
  },
  {
    id: 'eori',
    title: {
      lt: 'EORI registravimas',
      en: 'EORI Registration',
    },
    description: {
      lt: 'Pagalba registruojant EORI numerį, reikalingą prekybai su ES šalimis. Pildome paraiškas ir konsultuojame.',
      en: 'Assistance in registering an EORI number required for trade with EU countries. We complete applications and provide consultations.',
    },
    icon: ClipboardText,
  },
  {
    id: 'evis-queue',
    title: {
      lt: 'Išankstinės eilės registravimas per EVIS',
      en: 'Advance Queue Registration via EVIS',
    },
    description: {
      lt: 'Registracija išankstinėje eilėje per EVIS sistemą. Taupykite laiką ir venkite nereikalingo laukimo.',
      en: 'Advance queue registration via EVIS system. Save time and avoid unnecessary waiting.',
    },
    icon: ClipboardText,
  },
];

