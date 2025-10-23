export interface Stat {
  id: string;
  value: number;
  label: {
    lt: string;
    en: string;
  };
  prefix?: string;
  suffix?: string;
}

export const stats: Stat[] = [
  {
    id: 'declarations',
    value: 2847,
    label: {
      lt: 'Deklaracijų įforminta per metus',
      en: 'Declarations processed per year',
    },
  },
  {
    id: 'guarantees',
    value: 520000,
    prefix: '€',
    label: {
      lt: 'Bendra suteiktų garantijų suma per metus',
      en: 'Total guarantee amount per year',
    },
  },
  {
    id: 'experience',
    value: 15,
    suffix: '+',
    label: {
      lt: 'Metų patirtis',
      en: 'Years of experience',
    },
  },
];

