# UAB "Customs Consulting" - Muitinės Tarpininko Svetainė

Moderni, React-based svetainė muitinės tarpininkavimo įmonei, sukurta naudojant Framer eksporto referensinį dizainą.

## 🚀 Technologijų Stekas

### Build & Framework
- **Vite** + **React 18.3+** (SWC)
- **TypeScript 5.8+** (strict mode)
- **React Router DOM v6** (route-based i18n)

### Styling & UI
- **Tailwind CSS 3.4** (dark mode first)
- **shadcn/ui** (Radix UI primitives)
- **tailwindcss-animate**
- **next-themes** (dark mode management)
- **Baloo 2** (custom Google Font)

### Animation
- **Framer Motion** (micro-interactions)
- **GSAP** + **ScrollTrigger** (parallax footer)

### Forms & Data
- **React Hook Form** + **Zod** (validation)
- **TanStack React Query v5**
- **Sonner** (toast notifications)

### Icons & Utils
- **Lucide React**
- **clsx**, **tailwind-merge**, **class-variance-authority**
- **date-fns**

## 📁 Projekto Struktūra

```
src/
├── assets/              # Images, fonts
├── components/
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── accordion.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   └── common/          # Custom components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── ServiceCard.tsx
│       ├── StatsCounter.tsx
│       ├── FlipLink.tsx
│       └── InquiryForm.tsx
├── hooks/
│   ├── useLanguage.tsx
│   └── useParallaxFooter.ts
├── lib/
│   ├── utils.ts
│   ├── services.ts      # Paslaugų duomenys
│   ├── faq.ts          # DUK duomenys
│   └── stats.ts        # Statistikos duomenys
├── pages/
│   ├── Home.tsx        # Pagrindinis puslapis
│   ├── Services.tsx    # Paslaugos
│   └── FAQ.tsx         # DUK
├── styles/
│   └── globals.css     # Global CSS + Tailwind
├── App.tsx
└── main.tsx
```

## 🌍 Daugiakalbystė (i18n)

Svetainė palaiko dvi kalbas su route-based keitikliu:

- **Lietuvių (default)**: `/`, `/services`, `/duk`
- **Anglų**: `/en`, `/en/services`, `/en/faq`

**Naudojimas:**
```tsx
import { useLanguage } from '@/hooks/useLanguage';

const Component = () => {
  const { language, t } = useLanguage();
  
  return <h1>{t('Lietuviškas tekstas', 'English text')}</h1>;
};
```

## 🎨 Dizaino Ypatybės

### Spalvos & Temos
- **Dark mode first** (tamsus režimas pagal nutylėjimą)
- Prieinamos kontrastas (WCAG AA)
- Dinaminis `next-themes` support

### Tipografija
- **Baloo 2**: Pagrindinė (antraštės, mygtukai)
- **System sans-serif**: Papildoma (turinys)

### Animacijos
- **Framer Motion**: Hover states, scroll-triggered fade/slide
- **GSAP ScrollTrigger**: Parallax footer background
- **FlipLink**: Character-by-character animation ant hover

### Komponentai
- **ServiceCard**: Dialog trigger with service details
- **StatsCounter**: Animated number counters
- **InquiryForm**: Validuojama forma su Zod
- **Accordion**: DUK Q&A

## 🚀 Paleidimas

### Development
```bash
npm run dev
```
Atidaro: http://localhost:8080

### Production Build
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## 📋 Funkcionalumas

### Puslapiai
1. **Pagrindinis (/)**: Hero, Value Props, Services Preview, Stats, CTA, FAQ Preview, Contact Form
2. **Paslaugos (/services)**: Visų paslaugų sąrašas su Dialog
3. **DUK (/duk)**: Accordion su DUK + Contact Form

### Formos Laukai
- Vardas/Pavardė *
- Įmonė (optional)
- El. paštas *
- Telefonas *
- Paslaugos tipas * (Select)
- Žinutė *
- Failo įkėlimas (optional)

**Validacija**: Zod schema  
**Toast**: Success/Error notifications via Sonner

### Statistika (Editable)
Redaguojami duomenys `src/lib/stats.ts`:
- Deklaracijų skaičius per metus: **2,847**
- Garantijų suma: **€520,000**
- Aktyvių klientų: **47+**
- Metų patirtis: **12+**

## 🎯 Įgyvendinti Reikalavimai

✅ Vite + React + TypeScript (strict)  
✅ Tailwind CSS 3.4 + shadcn/ui  
✅ Dark mode (next-themes)  
✅ Baloo 2 font  
✅ Framer Motion (micro-interactions)  
✅ GSAP Parallax Footer  
✅ React Hook Form + Zod  
✅ Route-based i18n (LT/EN)  
✅ Animated Stats Counters  
✅ Accessible (ARIA, keyboard nav)  
✅ Responsive design  
✅ Toast notifications (Sonner)  
✅ FlipLink text animation  
✅ Service cards with Dialog  
✅ FAQ Accordion  

## 📝 Turinio Redagavimas

### Paslaugos
Redaguoti: `src/lib/services.ts`

### DUK
Redaguoti: `src/lib/faq.ts`

### Statistika
Redaguoti: `src/lib/stats.ts`

### Kontaktai
Redaguoti: `src/components/common/Footer.tsx`

## 🔧 Pagrindiniai Komponentai

### FlipLink
Tekstas su character-by-character animation:
```tsx
<FlipLink href="/services">
  Visos paslaugos
</FlipLink>
```

### StatsCounter
Animuoti skaičiai:
```tsx
<StatsCounter 
  value={2847} 
  prefix="€" 
  suffix="+" 
/>
```

### ServiceCard
Paslaugos kortelė su Dialog:
```tsx
<ServiceCard service={service} index={0} />
```

## 🌐 Deployment

Projektas paruoštas deployment į:
- **Vercel** / **Netlify**: `npm run build`
- **Static hosting**: Upload `dist/` folder

## 📞 Support

Klausimai ar problemos? Kreipkitės:
- Email: info@customsconsulting.eu
- Tel: +370 1 234 5678

---

**Built with ❤️ by BRANDFORGE**
