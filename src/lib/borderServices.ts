import React from 'react';
import {
  FileText,
  Truck,
  Package,
  Signature,
} from '@phosphor-icons/react';

export interface BorderService {
  id: string;
  title: {
    lt: string;
    en: string;
    pl: string;
    ru: string;
  };
  description: {
    lt: string;
    en: string;
    pl: string;
    ru: string;
  };
  icon?: React.ComponentType<any>;
  image?: string;
}

export const borderServices: BorderService[] = [
  {
    id: 'tir-carnet-border',
    title: {
      lt: 'Muitinės garantija, EPI, PI, ETD, TIR-EPD',
      en: 'Customs Guarantee, EPI, PI, ETD, TIR-EPD',
      pl: 'Gwarancja celna, EPI, PI, ETD, TIR-EPD',
      ru: 'Таможенная гарантия, EPI, PI, ETD, TIR-EPD',
    },
    description: {
      lt: 'Profesionalus TIR CARNET dokumentų pildymas tarptautiniam krovinių vežimui pasienyje. Greitas ir tikslus aptarnavimas 24/7.',
      en: 'Professional TIR CARNET document completion for international cargo transport at the border. Fast and accurate service 24/7.',
      pl: 'Profesjonalne wypełnianie dokumentów TIR CARNET dla międzynarodowego transportu towarów na granicy. Szybka i dokładna obsługa 24/7.',
      ru: 'Профессиональное заполнение документов TIR CARNET для международных грузоперевозок на границе. Быстрое и точное обслуживание 24/7.',
    },
    icon: Signature,
  },
  {
    id: 'cmr-border',
    title: {
      lt: 'T1, T2, CHED A/D/P/PP visuose Europos pasieniuose',
      en: 'T1, T2, CHED A/D/P/PP at all European borders',
      pl: 'T1, T2, CHED A/D/P/PP na wszystkich granicach europejskich',
      ru: 'T1, T2, CHED A/D/P/PP на всех европейских границах',
    },
    description: {
      lt: 'CMR važtaraščių pildymas pasienyje. Spartus dokumentų įforminimas, kad nekeltumėte nereikalingai laiko.',
      en: 'CMR waybill completion at the border. Fast document processing to avoid unnecessary delays.',
      pl: 'Wypełnianie listów przewozowych CMR na granicy. Szybka odprawa dokumentów, aby uniknąć niepotrzebnych opóźnień.',
      ru: 'Заполнение накладных CMR на границе. Быстрое оформление документов, чтобы избежать ненужных задержек.',
    },
    icon: FileText,
  },
  {
    id: 'export-border',
    title: {
      lt: 'RMPD, laikinas įvežimas, E-Manifestas, EVIS',
      en: 'RMPD, Temporary Admission, E-Manifest, EVIS',
      pl: 'RMPD, odprawa czasowa, E-Manifest, EVIS',
      ru: 'RMPD, временный ввоз, Э-Манифест, EVIS',
    },
    description: {
      lt: 'Greitų eksporto procedūrų tvarkymąs pasienyje. Atstovavimas muitinėje ir visų formalumų atlikimas vietoje.',
      en: 'Fast export procedures at the border. Customs representation and on-site formality completion.',
      pl: 'Szybkie procedury eksportowe na granicy. Reprezentacja celna i dopełnienie wszelkich formalności na miejscu.',
      ru: 'Быстрые экспортные процедуры на границе. Таможенное представительство и выполнение всех формальностей на месте.',
    },
    icon: Truck,
  },
  {
    id: 'import-border',
    title: {
      lt: 'GVMS, ENS, PBN, EXS (Didžioji Britanija)',
      en: 'GVMS, ENS, PBN, EXS (UK)',
      pl: 'GVMS, ENS, PBN, EXS (Wielka Brytania)',
      ru: 'GVMS, ENS, PBN, EXS (Великобритания)',
    },
    description: {
      lt: 'Importo krovinių įforminimas pasienyje 24/7. Operatyvus problemų sprendimas ir greitas krovinių paleidimas.',
      en: 'Import cargo clearance at the border 24/7. Prompt problem resolution and fast cargo release.',
      pl: 'Odprawa importowa ładunków na granicy 24/7. Natychmiastowe rozwiązywanie problemów i szybkie zwalnianie ładunków.',
      ru: 'Оформление импортных грузов на границе 24/7. Оперативное решение проблем и быстрый выпуск грузов.',
    },
    icon: Package,
  },
];
