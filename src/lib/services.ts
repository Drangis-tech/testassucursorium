import React from 'react';
import {
  FileText,
  Truck,
  Package,
  Scales,
  Tag,
  ClipboardText,
} from '@phosphor-icons/react';
import sandeliavimas from '@/assets/paslaugos/sandeliavimas.png';
import mechanizuotas from '@/assets/paslaugos/mechanizuotas.png';
import TIR from '@/assets/paslaugos/TIR.svg';

export interface Service {
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

export const services: Service[] = [
  {
    id: 'tir-ata-carnet',
    title: {
      lt: 'TIR / ATA CARNET pildymas',
      en: 'TIR / ATA CARNET Completion',
      pl: 'Wypełnianie TIR / ATA CARNET',
      ru: 'Заполнение TIR / ATA CARNET',
    },
    description: {
      lt: 'Profesionalus TIR ir ATA CARNET dokumentų pildymas tarptautiniam krovinių vežimui ir laikinai prekių įvežimui. Užtikriname tikslybą ir atitiktį tarptautiniams reikalavimams.',
      en: 'Professional TIR and ATA CARNET document completion for international cargo transport and temporary import of goods. We ensure accuracy and compliance with international requirements.',
      pl: 'Profesjonalne wypełnianie dokumentów TIR i ATA CARNET do międzynarodowego przewozu ładunków i czasowego wwozu towarów. Zapewniamy dokładność i zgodność z wymogami międzynarodowymi.',
      ru: 'Профессиональное заполнение документов TIR и ATA CARNET для международных грузоперевозок и временного ввоза товаров. Мы обеспечиваем точность и соответствие международным требованиям.',
    },
    image: TIR,
  },
  {
    id: 'cmr',
    title: {
      lt: 'CMR pildymas',
      en: 'CMR Completion',
      pl: 'Wypełnianie CMR',
      ru: 'Заполнение CMR',
    },
    description: {
      lt: 'CMR važtaraščių pildymas krovinių vežimui keliais. Padedame tinkamai įforminti visus reikalingus dokumentus.',
      en: 'CMR waybill completion for road cargo transport. We help properly complete all required documents.',
      pl: 'Wypełnianie listów przewozowych CMR dla transportu drogowego. Pomagamy prawidłowo sformułować wszystkie niezbędne dokumenty.',
      ru: 'Заполнение накладных CMR для автомобильных грузоперевозок. Мы помогаем правильно оформить все необходимые документы.',
    },
    icon: FileText,
  },
  {
    id: 'export',
    title: {
      lt: 'Eksportas',
      en: 'Export',
      pl: 'Eksport',
      ru: 'Экспорт',
    },
    description: {
      lt: 'Pilnas eksporto procedūrų valdymas – nuo deklaracijų pildymo iki krovinių išleidimo. Dirbame su visų rūšių prekėmis.',
      en: 'Complete export procedure management – from declaration completion to cargo release. We work with all types of goods.',
      pl: 'Pełna obsługa procedur eksportowych – od wypełniania deklaracji po zwolnienie ładunków. Pracujemy ze wszystkimi rodzajami towarów.',
      ru: 'Полное управление экспортными процедурами — от заполнения деклараций до выпуска грузов. Работаем со всеми видами товаров.',
    },
    icon: Truck,
  },
  {
    id: 'import',
    title: {
      lt: 'Importas',
      en: 'Import',
      pl: 'Import',
      ru: 'Импорт',
    },
    description: {
      lt: 'Importo muitinės procedūrų tvarkymas. Atstovaujame Jūsų interesams muitinėje, užtikriname sklandų krovinių įforminimą.',
      en: 'Import customs procedures handling. We represent your interests at customs and ensure smooth cargo processing.',
      pl: 'Obsługa celnych procedur importowych. Reprezentujemy Twoje interesy w urzędzie celnym, zapewniamy sprawną odprawę ładunków.',
      ru: 'Оформление импортных таможенных процедур. Представляем ваши интересы на таможне, обеспечиваем беспрепятственное оформление грузов.',
    },
    icon: Package,
  },
  {
    id: 'e-manifest',
    title: {
      lt: 'E-Manifestas',
      en: 'E-Manifest',
      pl: 'E-Manifest',
      ru: 'Э-Манифест',
    },
    description: {
      lt: 'Elektroninio manifesto pildymas ir pateikimas muitinės sistemoje. Spartus ir patikimas aptarnavimas.',
      en: 'Electronic manifest completion and submission to customs system. Fast and reliable service.',
      pl: 'Wypełnianie i przesyłanie elektronicznego manifestu w systemie celnym. Szybka i niezawodna obsługa.',
      ru: 'Заполнение и подача электронного манифеста в таможенную систему. Быстрое и надежное обслуживание.',
    },
    icon: ClipboardText,
  },
  {
    id: 'warehousing',
    title: {
      lt: 'Sandėliavimas',
      en: 'Warehousing',
      pl: 'Magazynowanie',
      ru: 'Складирование',
    },
    description: {
      lt: 'Saugus ir patikimas krovinių sandėliavimas. Modernios patalpos su visais reikalingais leidimais.',
      en: 'Safe and reliable cargo warehousing. Modern facilities with all necessary permits.',
      pl: 'Bezpieczne i niezawodne magazynowanie ładunków. Nowoczesne pomieszczenia ze wszystkimi niezbędnymi zezwoleniami.',
      ru: 'Безопасное и надежное хранение грузов. Современные помещения со всеми необходимыми разрешениями.',
    },
    image: sandeliavimas,
  },
  {
    id: 'parking',
    title: {
      lt: 'Transporto priemonių parkavimo aikštelė',
      en: 'Vehicle Parking Area',
      pl: 'Parking dla pojazdów',
      ru: 'Стоянка для транспортных средств',
    },
    description: {
      lt: 'Saugi ir prižiūrima transporto priemonių stovėjimo aikštelė. Patogu vairuotojams ir logistikos įmonėms.',
      en: 'Secure and supervised vehicle parking area. Convenient for drivers and logistics companies.',
      pl: 'Bezpieczny i nadzorowany parking dla pojazdów. Wygodny dla kierowców i firm logistycznych.',
      ru: 'Безопасная и охраняемая стоянка для транспортных средств. Удобно для водителей и логистических компаний.',
    },
    icon: Truck,
  },
  {
    id: 'loading-mechanized',
    title: {
      lt: 'Mechanizuotas iškrovimas–pakrovimas',
      en: 'Mechanized Loading–Unloading',
      pl: 'Zmechanizowany załadunek i rozładunek',
      ru: 'Механизированная погрузка-разгрузка',
    },
    description: {
      lt: 'Greitas ir saugus krovinių iškrovimas bei pakrovimas, naudojant modernią įrangą.',
      en: 'Fast and safe cargo loading and unloading using modern equipment.',
      pl: 'Szybki i bezpieczny załadunek i rozładunek towarów przy użyciu nowoczesnego sprzętu.',
      ru: 'Быстрая и безопасная погрузка и разгрузка грузов с использованием современного оборудования.',
    },
    image: mechanizuotas,
  },
  {
    id: 'loading-manual',
    title: {
      lt: 'Rankinis iškrovimas–pakrovimas',
      en: 'Manual Loading–Unloading',
      pl: 'Ręczny załadunek i rozładunek',
      ru: 'Ручная погрузка-разгрузка',
    },
    description: {
      lt: 'Rankinis krovinių tvarkymas, kai reikalinga speciali priežiūra ir atsargus elgesys su preke.',
      en: 'Manual cargo handling when special care and careful treatment of goods is required.',
      pl: 'Ręczna obsługa ładunków, gdy wymagana jest szczególna ostrożność i delikatne obchodzenie się z towarem.',
      ru: 'Ручная обработка грузов, когда требуется особый уход и осторожное обращение с товаром.',
    },
    icon: Package,
  },
  {
    id: 'sorting',
    title: {
      lt: 'Prekių rūšiavimas, ženklinimas',
      en: 'Goods Sorting & Labeling',
      pl: 'Sortowanie i etykietowanie towarów',
      ru: 'Сортировка и маркировка товаров',
    },
    description: {
      lt: 'Profesionalus prekių rūšiavimas pagal kategorijas ir tinkamas ženklinimas pagal reikalavimus.',
      en: 'Professional goods sorting by categories and proper labeling according to requirements.',
      pl: 'Profesjonalne sortowanie towarów według kategorii i odpowiednie etykietowanie zgodnie z wymogami.',
      ru: 'Профессиональная сортировка товаров по категориям и надлежащая маркировка в соответствии с требованиями.',
    },
    icon: Tag,
  },
  {
    id: 'weighing',
    title: {
      lt: 'Transporto priemonių svėrimas',
      en: 'Vehicle Weighing',
      pl: 'Ważenie pojazdów',
      ru: 'Взвешивание транспортных средств',
    },
    description: {
      lt: 'Tikslus transporto priemonių ir krovinių svėrimas sertifikuotomis svarstyklėmis.',
      en: 'Accurate vehicle and cargo weighing with certified scales.',
      pl: 'Dokładne ważenie pojazdów i ładunków na certyfikowanych wagach.',
      ru: 'Точное взвешивание транспортных средств и грузов на сертифицированных весах.',
    },
    icon: Scales,
  },
  {
    id: 'eori',
    title: {
      lt: 'EORI registravimas',
      en: 'EORI Registration',
      pl: 'Rejestracja EORI',
      ru: 'Регистрация EORI',
    },
    description: {
      lt: 'Pagalba registruojant EORI numerį, reikalingą prekybai su ES šalimis. Pildome paraiškas ir konsultuojame.',
      en: 'Assistance in registering an EORI number required for trade with EU countries. We complete applications and provide consultations.',
      pl: 'Pomoc w rejestracji numeru EORI, niezbędnego do handlu z krajami UE. Wypełniamy wnioski i udzielamy konsultacji.',
      ru: 'Помощь в регистрации номера EORI, необходимого для торговли со странами ЕС. Заполняем заявки и консультируем.',
    },
    icon: ClipboardText,
  },
  {
    id: 'evis-queue',
    title: {
      lt: 'Išankstinės eilės registravimas per EVIS',
      en: 'Advance Queue Registration via EVIS',
      pl: 'Rejestracja we wczesnej kolejce przez EVIS',
      ru: 'Предварительная регистрация очереди через EVIS',
    },
    description: {
      lt: 'Registracija išankstinėje eilėje per EVIS sistemą. Taupykite laiką ir venkite nereikalingo laukimo.',
      en: 'Advance queue registration via EVIS system. Save time and avoid unnecessary waiting.',
      pl: 'Rejestracja w kolejce priorytetowej przez system EVIS. Oszczędzaj czas i unikaj niepotrzebnego czekania.',
      ru: 'Регистрация в предварительной очереди через систему EVIS. Экономьте время и избегайте ненужного ожидания.',
    },
    icon: ClipboardText,
  },
];
