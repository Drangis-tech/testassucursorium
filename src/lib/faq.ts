export interface FAQItem {
  id: string;
  question: {
    lt: string;
    en: string;
    pl: string;
    ru: string;
  };
  answer: {
    lt: string;
    en: string;
    pl: string;
    ru: string;
  };
}

export const faqItems: FAQItem[] = [
  {
    id: 'what-is-customs-broker',
    question: {
      lt: 'Kas yra muitinės tarpininkas ir kodėl man jo reikia?',
      en: 'What is a customs broker and why do I need one?',
      pl: 'Kim jest agent celny i dlaczego jest mi potrzebny?',
      ru: 'Кто такой таможенный брокер и почему он мне нужен?',
    },
    answer: {
      lt: 'Muitinės tarpininkas – tai licencijuotas specialistas, atstovaujantis Jūsų interesams muitinėje. Mes užtikriname, kad visos muitinės procedūros būtų atliktos teisingai, greitai ir pagal įstatymus, taip išvengiant baudų ir krovinių vėlavimų.',
      en: 'A customs broker is a licensed specialist who represents your interests at customs. We ensure that all customs procedures are completed correctly, quickly, and in accordance with the law, helping you avoid fines and shipment delays.',
      pl: 'Agent celny to licencjonowany specjalista, który reprezentuje Twoje interesy w urzędzie celnym. Zapewniamy, że wszystkie procedury celne zostaną wykonane prawidłowo, szybko i zgodnie z przepisami, co pozwala uniknąć kar i opóźnień w dostawach.',
      ru: 'Таможенный брокер — это лицензированный специалист, представляющий ваши интересы на таможне. Мы обеспечиваем правильное, быстрое и законное оформление всех таможенных процедур, что помогает избежать штрафов и задержек грузов.',
    },
  },
  {
    id: 'how-long-clearance',
    question: {
      lt: 'Kam reikalingas muitines tarpininkas fiziniam asmeniui?',
      en: 'Why does a private individual need a customs broker?',
      pl: 'Po co osobie prywatnej potrzebny jest agent celny?',
      ru: 'Зачем частному лицу нужен таможенный брокер?',
    },
    answer: {
      lt: 'Jeigu asmuo užsisako ar atsiveža prekes iš užsienio (pvz., automobilį, motociklą, baldus, IT įrangą, brangesnius pirkinius ar krovinį iš trečiųjų šalių – JAV, Kinijos, Turkijos, Jungtinės Karalystės ir t. t.) muitinės tarpininkas pasirūpina visais muitinės formalumais ir padeda sklandžiai įforminti prekes tam, kad asmuo galėtų legaliai ir be kliūčių naudotis įsigytomis prekėmis.',
      en: 'If a person orders or brings goods from abroad (e.g., a car, motorcycle, furniture, IT equipment, more expensive purchases, or cargo from third countries such as the USA, China, Turkey, the United Kingdom, etc.), a customs broker handles all customs formalities and ensures a smooth clearance process. This allows the individual to legally and without obstacles use the purchased goods.',
      pl: 'Jeśli osoba zamawia lub przywozi towary z zagranicy (np. samochód, motocykl, meble, sprzęt IT, droższe zakupy lub ładunek z krajów trzecich – USA, Chin, Turcji, Wielkiej Brytanii itd.), agent celny zajmuje się wszystkimi formalnościami celnymi i pomaga sprawnie odprawić towary. Dzięki temu osoba może legalnie i bez przeszkód korzystać z zakupionych produktów.',
      ru: 'Если человек заказывает или привозит товары из-за границы (например, автомобиль, мотоцикл, мебель, IT-оборудование, более дорогие покупки или груз из третьих стран — США, Китая, Турции, Великобритании и т.д.), таможенный брокер берет на себя все таможенные формальности и помогает без препятствий оформить товары. Это позволяет человеку легально и без проблем пользоваться приобретёнными вещами.',
    },
  },
  {
    id: 'required-documents',
    question: {
      lt: 'Kokie dokumentai reikalingi krovinių įforminimui?',
      en: 'What documents are required for cargo customs clearance?',
      pl: 'Jakie dokumenty są potrzebne do odprawy ładunku?',
      ru: 'Какие документы необходимы для оформления грузов?',
    },
    answer: {
      lt: 'Pradžiai būtini dokumentai: sąskaita faktūra, pakavimo lapas, transporto dokumentai (CMR, TIR CARNET), kilmės sertifikatas (jei taikoma), bei kiti specifiniai dokumentai priklausomai nuo prekių rūšies (pvz., sertifikatai, leidimai).',
      en: 'The essential documents include: the invoice, packing list, transport documents (CMR, TIR Carnet), certificate of origin (if applicable), and other specific documents depending on the type of goods (e.g., certificates, permits).',
      pl: 'Podstawowe wymagane dokumenty to: faktura, lista pakunkowa, dokumenty transportowe (CMR, TIR CARNET), świadectwo pochodzenia (jeśli dotyczy) oraz inne specyficzne dokumenty w zależności od rodzaju towaru (np. certyfikaty, zezwolenia).',
      ru: 'Основные необходимые документы: счёт-фактура, упаковочный лист, транспортные документы (CMR, TIR CARNET), сертификат происхождения (если требуется), а также другие специальные документы в зависимости от вида товара (например, сертификаты, разрешения).',
    },
  },
  {
    id: 'costs',
    question: {
      lt: 'Kiek kainuoja jūsų paslaugos?',
      en: 'How much do your services cost?',
      pl: 'Ile kosztują Wasze usługi?',
      ru: 'Сколько стоят ваши услуги?',
    },
    answer: {
      lt: 'Kaina priklauso nuo paslaugos sudėtingumo, prekių vertės, procedūrų tipo ir užsakymu skaiciaus. Siūlome individualius įkainius kiekvienam klientui. Susisiekite su mumis dėl tikslios kainos pasiūlymo.',
      en: 'The price depends on the complexity of the service, the value of the goods, the type of procedures, and the number of orders. We offer individual pricing for each client. Contact us for an exact quote.',
      pl: 'Cena zależy od stopnia skomplikowania usługi, wartości towarów, rodzaju procedur oraz liczby zleceń. Oferujemy indywidualne wyceny dla każdego klienta. Skontaktuj się z nami, aby otrzymać dokładną ofertę cenową.',
      ru: 'Стоимость зависит от сложности услуги, стоимости товаров, типа процедур и количества заказов. Мы предлагаем индивидуальные расценки для каждого клиента. Свяжитесь с нами, чтобы получить точное ценовое предложение.',
    },
  },
  {
    id: 'work-hours',
    question: {
      lt: 'Kokiu laiku dirbate?',
      en: 'What are your working hours?',
      pl: 'W jakich godzinach pracujecie?',
      ru: 'В какое время вы работаете?',
    },
    answer: {
      lt: 'Vidinese muitinese dirbame darbo dienomis 8:00–17:00. Pasieniuose aptarnaujame 24/7',
      en: 'At inland customs offices, we work on business days from 8:00 to 17:00. At border checkpoints, we provide service 24/7.',
      pl: 'W urzędach celnych wewnętrznych pracujemy w dni robocze od 8:00 do 17:00. Na przejściach granicznych obsługujemy 24/7.',
      ru: 'Во внутренних таможнях мы работаем в рабочие дни с 8:00 до 17:00. На пограничных постах обслуживаем круглосуточно, 24/7.',
    },
  },
  {
    id: 'eori-registration',
    question: {
      lt: 'Ar galite padėti užsiregistruoti EORI numerį?',
      en: 'Can you help with registering an EORI number?',
      pl: 'Czy możecie pomóc w rejestracji numeru EORI?',
      ru: 'Можете ли вы помочь зарегистрировать номер EORI?',
    },
    answer: {
      lt: 'Taip, padedame užpildyti paraišką EORI numeriui gauti ir konsultuojame visais klausimais. EORI numeris būtinas norint verstis prekyba su trečiomis šalimis',
      en: 'Yes, we help fill out the application to obtain an EORI number and provide consultations on all related questions. The EORI number is required for conducting trade with third countries.',
      pl: 'Tak, pomagamy wypełnić wniosek o nadanie numeru EORI oraz udzielamy konsultacji we wszystkich kwestiach. Numer EORI jest niezbędny do prowadzenia handlu z krajami trzecimi.',
      ru: 'Да, мы помогаем заполнить заявку на получение номера EORI и консультируем по всем вопросам. Номер EORI необходим для ведения торговли с третьими странами.',
    },
  },
  {
    id: 'payment-terms',
    question: {
      lt: 'Kokios mokėjimo sąlygos?',
      en: 'What are your payment terms?',
      pl: 'Jakie są warunki płatności?',
      ru: 'Каковы ваши условия оплаты?',
    },
    answer: {
      lt: 'Naujiems klientams siūlome apmokėjimą po paslaugos suteikimo. Nuolatiniams partneriams taikome atidėto mokėjimo sąlygas pagal individualiai suderintą grafiką.',
      en: 'For new clients, we offer payment after the service is provided. For long-term partners, we apply deferred payment terms based on an individually agreed schedule.',
      pl: 'Nowym klientom oferujemy płatność po wykonaniu usługi. Stałym partnerom zapewniamy odroczone terminy płatności zgodnie z indywidualnie ustalonym harmonogramem.',
      ru: 'Для новых клиентов мы предлагаем оплату после предоставления услуги. Для постоянных партнёров действуют отсроченные условия оплаты по индивидуально согласованному графику.',
    },
  },
  {
    id: 'guarantee-amount',
    question: {
      lt: 'Ar teikiate garantijas muitinei?',
      en: 'Do you provide guarantees to customs?',
      pl: 'Czy udzielacie gwarancji dla urzędu celnego?',
      ru: 'Предоставляете ли вы гарантии для таможни?',
    },
    answer: {
      lt: 'Taip, suteikiame bendrąją garantiją, kuri leidžia T1 deklaracijas įforminti greitai ir be papildomo laukimo.',
      en: 'Yes, we provide a comprehensive guarantee that allows T1 declarations to be processed quickly and without additional waiting.',
      pl: 'Tak, udzielamy gwarancji generalnej, która umożliwia szybkie i bez dodatkowego oczekiwania sporządzanie deklaracji T1.',
      ru: 'Да, мы предоставляем общую гарантию, которая позволяет быстро оформлять декларации T1 без дополнительного ожидания.',
    },
  },
  {
    id: 'transit-procedures',
    question: {
      lt: 'Ar tvarkote tranzito procedūras?',
      en: 'Do you handle transit procedures?',
      pl: 'Czy zajmujecie się procedurami tranzytowymi?',
      ru: 'Вы оформляете транзитные процедуры?',
    },
    answer: {
      lt: 'Taip, tvarkome visus tranzito procedūrų tipus – T1, T2, T2L visose europos salyse.',
      en: 'Yes, we handle all types of transit procedures – T1, T2, T2L – in all European countries.',
      pl: 'Tak, obsługujemy wszystkie rodzaje procedur tranzytowych – T1, T2, T2L – we wszystkich krajach Europy.',
      ru: 'Да, мы оформляем все виды транзитных процедур — T1, T2, T2L — во всех европейских странах.',
    },
  },
  {
    id: 'consultation',
    question: {
      lt: 'Ar teikiate konsultacijas muitinės klausimais?',
      en: 'Do you provide customs consultations?',
      pl: 'Czy udzielacie konsultacji w sprawach celnych?',
      ru: 'Предоставляете ли вы консультации по таможенным вопросам?',
    },
    answer: {
      lt: 'Taip, konsultuojame visais muitinės procedūrų, dokumentų pildymo, tarifų ir mokesčių klausimais. Pirmoji konsultacija – nemokama.',
      en: 'Yes, we provide consultations on all customs procedures, document preparation, tariffs, and tax-related questions. The first consultation is free.',
      pl: 'Tak, konsultujemy we wszystkich kwestiach związanych z procedurami celnymi, wypełnianiem dokumentów, taryfami oraz podatkami. Pierwsza konsultacja jest bezpłatna.',
      ru: 'Да, мы консультируем по всем вопросам, связанным с таможенными процедурами, заполнением документов, тарифами и налогами. Первая консультация — бесплатная.',
    },
  },
  {
    id: 'special-goods',
    question: {
      lt: 'Ar dirbate su specialiomis prekėmis (pavojingos, greitas gendančios)?',
      en: 'Do you work with special goods (hazardous, perishable)?',
      pl: 'Czy pracujecie z towarami specjalnymi (niebezpiecznymi, szybko psującymi się)?',
      ru: 'Работаете ли вы со специальными товарами (опасными, скоропортящимися)?',
    },
    answer: {
      lt: 'Taip, turime patirties dirbant su specialių kategorijų prekėmis – pavojingomis, greitai gendančiomis, reikalaujančiomis specialių leidimų.',
      en: 'Yes, we have experience working with special categories of goods – hazardous, perishable, and those requiring special permits.',
      pl: 'Tak, mamy doświadczenie w pracy z towarami specjalnych kategorii – niebezpiecznymi, szybko psującymi się oraz wymagającymi specjalnych zezwoleń.',
      ru: 'Да, у нас есть опыт работы с товарами специальных категорий — опасными, скоропортящимися и требующими специальных разрешений.',
    },
  },
  {
    id: 'urgency',
    question: {
      lt: 'Ar galite įforminti krovinį skubos tvarka?',
      en: 'Can you process a shipment urgently?',
      pl: 'Czy możecie odprawić ładunek w trybie pilnym?',
      ru: 'Можете ли вы оформить груз в срочном порядке?',
    },
    answer: {
      lt: 'Nors tempas pas mus yra didelis, galime pasiulyti prioritetini - skubų aptarnavimą.',
      en: 'Although our pace is already fast, we can offer priority — urgent processing.',
      pl: 'Choć pracujemy w szybkim tempie, możemy zaoferować priorytetową — pilną obsługę.',
      ru: 'Хотя мы и так работаем быстро, мы можем предложить приоритетное — срочное обслуживание.',
    },
  },
];

