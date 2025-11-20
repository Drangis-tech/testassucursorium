export interface Stat {
  id: string;
  value: number;
  label: {
    lt: string;
    en: string;
    pl: string;
    ru: string;
  };
  prefix?: string;
  suffix?: string;
}

export const stats: Stat[] = [
  {
    id: 'declarations',
    value: 15000,
    suffix: '+',
    label: {
      lt: 'Per metus įformintų deklaracijų skaičius',
      en: 'Number of declarations filed per year',
      pl: 'Liczba złożonych deklaracji w ciągu roku',
      ru: 'Количество оформленных деклараций в течение года',
    },
  },
  {
    id: 'guarantees',
    value: 160000000,
    suffix: '+',
    prefix: '€',
    label: {
      lt: 'Per metus suteiktų garantijų vertė eurais',
      en: 'Value of guarantees provided per year in euros',
      pl: 'Wartość udzielonych gwarancji w ciągu roku w euro',
      ru: 'Стоимость предоставленных гарантий за год в евро',
    },
  },
  {
    id: 'experience',
    value: 15,
    suffix: '+',
    label: {
      lt: 'Metų patirties',
      en: 'Years of experience',
      pl: 'Lata doświadczenia',
      ru: 'Годы опыта',
    },
  },
];

