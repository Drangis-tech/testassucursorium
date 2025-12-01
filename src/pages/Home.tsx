import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, memo, useCallback, useEffect, lazy, Suspense, useRef } from 'react';
import { CheckCircle, CaretDown } from '@phosphor-icons/react';
import { FlowButton } from '@/components/ui/flow-button';
import { Card, CardContent } from '@/components/ui/card';
import InquiryForm from '@/components/common/InquiryForm';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Particles } from '@/components/ui/particles';
import { DotPattern } from '@/components/ui/dot-pattern';
import { BorderBeam } from '@/components/ui/border-beam';
import { LineShadowText } from '@/components/ui/line-shadow-text';
import { useLanguage } from '@/hooks/useLanguage';
import { stats } from '@/lib/stats';
import { faqItems } from '@/lib/faq';
import { services } from '@/lib/services';
import { borderServices } from '@/lib/borderServices';
import { Marquee } from '@/components/ui/marquee';
import aboutImage from '@/assets/about.webp';
import heroLogo from '@/assets/logo/customsconsulting.svg';
import { Link, useLocation } from 'react-router-dom';
import ClientMountWhenVisible from '@/components/common/ClientMountWhenVisible';
import DecorativeLines from '@/components/common/DecorativeLines';
import { SEO } from '@/components/common/SEO';
import { handleHashScroll } from '@/utils/scrollToSection';

// Lazy-load heavy WebGL background animations - only load when needed
const DarkVeil = lazy(() => import('@/components/common/DarkVeil'));

// Custom hook to detect large screens
const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1470);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isLargeScreen;
};

// Component wrapper for cards with permanent hover effect on large screens
const AnimatedCard = ({ 
  children, 
  index = 0, 
  delay = 0,
  className = ''
}: { 
  children: React.ReactNode; 
  index?: number; 
  delay?: number;
  className?: string;
}) => {
  const isLargeScreen = useIsLargeScreen();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [showHoverEffect, setShowHoverEffect] = useState(false);

  useEffect(() => {
    if (isLargeScreen && isInView) {
      // Calculate timing for hover effect to activate
      const timing = (delay + index * 0.1) * 1000;
      
      const timer = setTimeout(() => {
        setShowHoverEffect(true);
        // Keep the hover effect active permanently
      }, timing);

      return () => clearTimeout(timer);
    }
  }, [isLargeScreen, isInView, delay, index]);

  const motionProps = isLargeScreen
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { 
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { delay: delay + index * 0.1, duration: 0.6 }
      };

  return (
    <motion.div
      ref={ref}
      {...motionProps}
      className={`${className} ${isLargeScreen && showHoverEffect ? 'force-hover-active' : ''}`}
    >
      {children}
    </motion.div>
  );
};

const FAQCard = memo(({ item, index, language }: { item: any; index: number; language: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => {
      console.log(`FAQ ${index + 1} (${item.id}) clicked, current state: ${prev}, new state: ${!prev}`);
      return !prev;
    });
  }, [index, item.id]);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ isolation: 'isolate' }}>
        <Card className="relative h-full overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-sm hover:shadow-xl group backdrop-blur-sm">
          {/* Shine effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <BorderBeam
            size={150}
            duration={12}
            delay={index * 0.5}
            colorFrom="#F2CA50"
            colorTo="#F2CA50"
            borderWidth={2}
          />
          <CardContent className="p-0 relative" style={{ isolation: 'isolate' }}>
            <div className="w-full relative" style={{ zIndex: 2 }}>
              <button
                onClick={handleToggle}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
                className="w-full px-6 pt-6 pb-4 text-left hover:no-underline group/trigger flex items-center justify-between cursor-pointer relative"
                style={{ zIndex: 10, position: 'relative' }}
              >
                <div className="flex items-start gap-4 flex-1 pointer-events-none">
                  {/* Number styled like header menu - on the left */}
                  <span className="flex-shrink-0 text-[18px] font-normal text-[#F2CA50] tracking-normal select-none transition-opacity duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-baloo font-semibold text-white text-lg flex-1 leading-tight pr-8">
                    {item.question[language]}
                  </span>
                </div>
                <CaretDown 
                  className="h-4 w-4 shrink-0 transition-transform duration-200 pointer-events-none"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  weight="bold" 
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed">
                      <div className="pl-10 text-base">
                        {item.answer[language]}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
      </div>
    </div>
  );
});

FAQCard.displayName = 'FAQCard';

const Home = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  const seoTitle = t(
    'Muitinės tarpininkas',
    'Customs Broker',
    'Agencja Celna',
    'Таможенный брокер'
  );
  const seoDescription = t(
    'Patikimas muitinės tarpininkas Lietuvoje. Deklaravimas, atstovavimas muitinėje, konsultacijos.',
    'Reliable customs broker in Lithuania. Declaration, customs representation, consulting.',
    'Niezawodna agencja celna na Litwie. Deklaracje, reprezentacja celna, doradztwo.',
    'Надежный таможенный брокер в Литве. Декларирование, представительство в таможне, консультации.'
  );

  // Handle scroll to hash section on page load and when hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Use the utility function with proper offset and retry logic
      handleHashScroll(hash, 200);
    }
  }, [location.hash]); // Re-run when hash changes

  return (
    <div className="relative overflow-hidden m-0 p-0">
      <SEO 
        title={seoTitle}
        description={seoDescription}
      />
      {/* Decorative Lines - Desktop Only */}
      <DecorativeLines />

      {/* Hero Section */}
      <section className="relative w-full min-h-[70dvh] md:min-h-screen flex items-center justify-center py-20 sm:py-24 md:py-0">
        {/* Background - Delayed load to not block first paint */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <ClientMountWhenVisible rootMargin="0px">
            <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
              <DarkVeil 
                speed={1.5}
                hueShift={202}
                noiseIntensity={0.03}
                scanlineIntensity={0.08}
                scanlineFrequency={0.8}
                warpAmount={0.25}
                resolutionScale={0.8}
                targetFPS={24}
              />
            </Suspense>
          </ClientMountWhenVisible>
        </div>

        {/* Content */}
        <div className="w-full relative z-10 flex justify-center items-center">
          <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[85%] 2xl:max-w-[80%] px-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-auto flex justify-center">
            <h1 className="sr-only">
              {t(
                'Customs Consulting - Muitinės Tarpininkas',
                'Customs Consulting - Customs Broker',
                'Customs Consulting - Agencja Celna',
                'Customs Consulting - Таможенный брокер'
              )}
            </h1>
            {/* Hero Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center w-full"
            >
              <img 
                src={heroLogo} 
                alt="Customs Consulting" 
                className="w-full max-w-[1800px] h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>



      {/* Statistics */}
      <section id="statistics" className="relative w-full py-12 md:py-24 overflow-hidden" style={{ zIndex: 10 }}>
        {/* Cards container - positioned above the lines */}
        <div className="relative" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container mx-auto px-4 relative">
            {/* Stats grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
            {stats.map((stat, index) => (
              <AnimatedCard
                key={stat.id}
                index={index}
                delay={0}
                className="relative"
              >
                <div className="relative group">
                  {/* Card with gradient border effect */}
                  <div className="relative h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300">
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative text-center">
                      {/* Animated number */}
                      <div className="font-baloo font-bold mb-3">
                        <div className="text-4xl md:text-5xl flex items-center justify-center gap-1">
                          {stat.prefix && (
                            <span className="text-3xl md:text-4xl text-[#F2CA50]">
                              {stat.prefix}
                            </span>
                          )}
                          <div className="bg-gradient-to-br from-[#F2CA50] via-[#F2CA50] to-[#F2CA50] bg-clip-text text-transparent">
                            <NumberTicker
                              value={stat.value}
                              className="inline-block tabular-nums"
                            />
                          </div>
                          {stat.suffix && (
                            <span className="text-3xl md:text-4xl text-[#F2CA50]">
                              {stat.suffix}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Label */}
                      <div className="text-xs md:text-sm text-gray-400 leading-relaxed mt-2">
                        {stat.label[language]}
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </AnimatedCard>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative w-full min-h-screen bg-black overflow-hidden py-12 lg:py-24 lg:flex lg:items-center">
        {/* Background particles effect */}
        <div className="absolute inset-0">
          <Particles
            className="absolute inset-0"
            quantity={80}
            ease={80}
            color="#F2CA50"
            refresh={false}
          />
        </div>

        {/* Dot Pattern Background */}
        <DotPattern
          className="opacity-10"
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 lg:items-center">
            {/* Heading - Order 1 on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 lg:col-start-2"
            >
              <motion.h2
                id="about-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-[#F2CA50] leading-tight mb-6"
              >
                {t('Apie mus', 'About Us', 'O nas', 'О нас')}
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-[30px] text-gray-400 leading-relaxed max-w-xl lg:mb-auto"
              >
                {t(
                  'Profesionalūs ir patikimi muitinės tarpininkai Europoje ir Azijoje. Teikiame kvalifikuotas krovinių deklaravimo ir muitinės procedūrų paslaugas, užtikrindami greitą ir tikslų aptarnavimą.',
                  'Professional customs clearance solutions with a clear process and guaranteed results.',
                  'Profesjonalni i niezawodni agenci celni w Europie i Azji. Świadczymy wykwalifikowane usługi w zakresie deklarowania ładunków i procedur celnych, zapewniając szybką i dokładną obsługę.',
                  'Профессиональные и надежные таможенные брокеры в Европе и Азии. Мы предоставляем квалифицированные услуги по декларированию грузов и таможенным процедурам, обеспечивая быстрое и точное обслуживание.'
                )}
              </motion.p>
            </motion.div>

            {/* Image - Order 2 on mobile, Order 1 on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center order-2 lg:order-1 lg:row-span-2"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] max-h-[700px]">
                <BorderBeam
                  size={250}
                  duration={12}
                  delay={0}
                  colorFrom="#F2CA50"
                  colorTo="#F2CA50"
                />
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                  {/* Placeholder for main image */}
                  <img
                    src={aboutImage}
                    alt="Customs Consulting Process"
                    className="absolute top-0 left-0 w-full h-full object-cover grayscale opacity-80"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
                </div>
              </div>
            </motion.div>

            {/* Card - Order 3 on mobile, with spacing above it */}
            <AnimatedCard
              delay={0.4}
              className="order-3 lg:order-2 mt-6 lg:mt-auto lg:col-start-2"
            >
              <div id="about-card" className="relative group">
                <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <BorderBeam
                  size={200}
                  duration={15}
                  delay={1}
                  colorFrom="#F2CA50"
                  colorTo="#F2CA50"
                  borderWidth={2}
                />
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                        <CheckCircle className="h-14 w-14 md:h-16 md:w-16" style={{ color: '#F1C94F' }} weight="regular" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-baloo font-bold text-white mb-3">
                        {t('Patikimas rezultatas', 'Reliable Results', 'Niezawodny wynik', 'Надежный результат')}
                      </h3>
                      
                      {/* Main Stat */}
                      <div className="flex flex-wrap items-baseline gap-2 mb-6">
                        <span className="text-3xl md:text-4xl font-baloo font-bold bg-gradient-to-br from-[#F2CA50] to-[#F2CA50] bg-clip-text text-transparent">
                          15+ 
                        </span>
                        <span className="text-sm md:text-base text-gray-400">
                          {t('metų patirties', 'years of experience', 'lat doświadczenia', 'лет опыта')}
                        </span>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-zinc-800/50 mb-6"></div>
                      
                      <p
                        className="text-sm md:text-base text-gray-400 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'Lanksčiai prisitaikome prie skirtingų klientų poreikių ir užtikriname sprendimus, atitinkančius visus teisės aktų reikalavimus.<br /><br />Galime pasiūlyti profesionalius ir patogius sprendimus kiekvienai situacijai, o mūsų tikslas – užtikrinti sklandų ir teisės aktus atitinkantį krovinių įforminimą bei patikimą atstovavimą muitinėje.<br /><br />',
                            'We flexibly adapt to different client needs and ensure solutions that meet all legal requirements.<br /><br />We can offer professional and convenient solutions for every situation, and our goal is to ensure smooth, legally compliant cargo documentation and reliable representation at customs.<br /><br />',
                            'Elastycznie dostosowujemy się do różnych potrzeb klientów i zapewniamy rozwiązania zgodne ze wszystkimi wymogami prawnymi.<br /><br />Możemy zaoferować profesjonalne i wygodne rozwiązania w każdej sytuacji, a naszym celem jest zapewnienie sprawnej i zgodnej z prawem odprawy ładunków oraz rzetelna reprezentacja w urzędzie celnym.<br /><br />',
                            'Мы гибко адаптируемся к различным потребностям клиентов и предоставляем решения, соответствующие всем законодательным требованиям.<br /><br />Мы можем предложить профессиональные и удобные решения для любой ситуации, а наша цель — обеспечить бесперебойное и законное оформление грузов и надежное представительство на таможне.<br /><br />'
                          )
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section id="services" className="relative w-full bg-black py-24 overflow-hidden">
        {/* Background particles effect */}
        <div className="absolute inset-0">
          <Particles
            className="absolute inset-0"
            quantity={80}
            ease={80}
            color="#F2CA50"
            refresh={false}
          />
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-16"
          >
            <h2 id="services-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-[#F2CA50] leading-tight mb-6 bg-black relative z-10 inline-block text-center max-[1236px]:text-center whitespace-pre-line">
              {t('Paslaugos vidinėse muitinėse', 'Our Services', 'Usługi w wewnętrznych\nurzędach celnych', 'Услуги во внутренних\nтаможнях')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto text-center">
              {t(
                'Profesionalūs muitinės įforminimo sprendimai visiems Jūsų poreikiams',
                'Professional customs clearance solutions for all your needs',
                'Profesjonalne rozwiązania odprawy celnej dla wszystkich Twoich potrzeb',
                'Профессиональные решения по таможенному оформлению для всех ваших нужд'
              )}
            </p>
          </motion.div>

          {/* Marquee Carousel */}
          <div className="relative">
            {/* Fade overlays on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            {/* First Row - Normal direction */}
            <Marquee pauseOnHover className="[--duration:60s] mb-8">
              {services.slice(0, 8).map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.id}
                    to={language === 'en' ? '/services' : `/${language}/services`}
                    className="block service-card-link"
                  >
                    <Card
                      className="relative w-[280px] sm:w-[320px] md:w-[380px] h-[280px] overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer backdrop-blur-sm"
                    >
                      {/* Shine effect on hover */}
                      <div className="service-card-shine absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 transition-opacity duration-300" />
                      
                      <CardContent className="p-6 relative">
                        {/* Icon */}
                        <div className="mb-4">
                          <div className="service-card-icon w-14 h-14 flex items-center justify-center transition-transform duration-300">
                            {service.image ? (
                              <img src={service.image} alt={service.title[language]} className="h-14 w-14 object-contain" />
                            ) : Icon ? (
                              <Icon className="h-14 w-14" style={{ color: '#F1C94F' }} weight="regular" />
                            ) : null}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-baloo font-bold text-white mb-3 min-h-[56px]">
                          {service.title[language]}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">
                          {service.description[language]}
                        </p>

                        {/* Decorative corner accent */}
                        <div className="service-card-corner absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 transition-opacity duration-300" />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </Marquee>

            {/* Second Row - Reverse direction */}
            <Marquee pauseOnHover reverse className="[--duration:60s]">
              {services.slice(8).map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.id}
                    to={language === 'en' ? '/services' : `/${language}/services`}
                    className="block service-card-link"
                  >
                    <Card
                      className="relative w-[280px] sm:w-[320px] md:w-[380px] h-[280px] overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer backdrop-blur-sm"
                    >
                      {/* Shine effect on hover */}
                      <div className="service-card-shine absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 transition-opacity duration-300" />
                      
                      <CardContent className="p-6 relative">
                        {/* Icon */}
                        <div className="mb-4">
                          <div className="service-card-icon w-14 h-14 flex items-center justify-center transition-transform duration-300">
                            {service.image ? (
                              <img src={service.image} alt={service.title[language]} className="h-14 w-14 object-contain" />
                            ) : Icon ? (
                              <Icon className="h-14 w-14" style={{ color: '#F1C94F' }} weight="regular" />
                            ) : null}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-baloo font-bold text-white mb-3 min-h-[56px]">
                          {service.title[language]}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">
                          {service.description[language]}
                        </p>

                        {/* Decorative corner accent */}
                        <div className="service-card-corner absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 transition-opacity duration-300" />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </Marquee>
          </div>

          {/* View All Services Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <FlowButton
              href={language === 'en' ? '/services' : `/${language}/services`}
              text={t('Visos paslaugos', 'All Services', 'Wszystkie usługi', 'Все услуги')}
            />
          </motion.div>
        </div>
      </section>
      {/* Border Services Section */}
      <section id="border-services" className="relative w-full py-24 overflow-hidden" style={{ zIndex: 10 }}>
        {/* Cards container - positioned above the lines */}
        <div className="relative" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container mx-auto px-4 relative">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mb-16"
            >
            <div className="flex flex-col items-center">
              <h2 id="border-services-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-[#F2CA50] leading-tight mb-2 bg-black relative z-10 inline-block text-center max-[1236px]:text-center min-[1236px]:flex min-[1236px]:items-center min-[1236px]:justify-center -mt-3">
                <span className="max-[1236px]:block min-[1236px]:inline">
                  {t('Paslaugos pasieniuose', 'Border Services', 'Usługi na granicy', 'Услуги на границе')}
                </span>
                <span className="max-[1236px]:hidden min-[1236px]:inline mx-2">–</span>
                <span className="max-[1236px]:block max-[1236px]:mt-2 min-[1236px]:inline-flex min-[1236px]:items-center">
                  <LineShadowText 
                    shadowColor="#F2CA50" 
                    as="span" 
                    className="text-[#F2CA50] text-6xl sm:text-7xl md:text-8xl lg:text-[110px] italic"
                  >
                    24/7
                  </LineShadowText>
                </span>
              </h2>
            </div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto text-center bg-black relative z-10 inline-block mt-4">
                {t(
                  'Profesionalūs muitinės įforminimo sprendimai visiems Jūsų poreikiams',
                  'Professional customs clearance solutions for all your needs',
                  'Profesjonalne rozwiązania odprawy celnej dla wszystkich Twoich potrzeb',
                  'Профессиональные решения по таможенному оформлению для всех ваших нужд'
                )}
              </p>
            </motion.div>

            {/* Cards Grid - 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {borderServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedCard
                  key={service.id}
                  index={index}
                  delay={0}
                  className="relative h-full"
                >
                  <div className="relative group h-full">
                    {/* Card with gradient border effect */}
                    <div className="relative h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 flex flex-col">
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative text-center flex flex-col h-full justify-center">
                        {/* Icon */}
                        <div className="mb-4 flex justify-center flex-shrink-0">
                          <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {service.image ? (
                              <img src={service.image} alt={service.title[language]} className="h-14 w-14 object-contain" />
                            ) : Icon ? (
                              <Icon className="h-14 w-14" style={{ color: '#F1C94F' }} weight="regular" />
                            ) : null}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-baloo font-bold text-white flex-shrink-0">
                          {service.title[language]}
                        </h3>
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="faq" className="relative w-full bg-black py-24 overflow-hidden">
        {/* Background particles effect */}
        <div className="absolute inset-0">
          <Particles
            className="absolute inset-0"
            quantity={80}
            ease={80}
            color="#F2CA50"
            refresh={false}
          />
        </div>

        {/* Subtle Dot Pattern Background */}
        <DotPattern
          className="opacity-10"
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Heading */}
          <div className="flex flex-col items-center mb-16">
            <h2 id="faq-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-[#F2CA50] leading-tight mb-6 bg-black relative z-10 inline-block flex items-center justify-center">
              {t('DUK', 'FAQ', 'FAQ', 'FAQ')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto text-center bg-black relative z-10 inline-block">
              {t(
                'Dažniausiai užduodami klausimai apie mūsų paslaugas',
                'Frequently asked questions about our services',
                'Często zadawane pytania dotyczące naszych usług',
                'Часто задаваемые вопросы о наших услугах'
              )}
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto" style={{ isolation: 'isolate' }}>
            {faqItems.map((item, index) => (
              <div key={`faq-wrapper-${item.id}`} style={{ containIntrinsicSize: 'auto', contain: 'layout style' }}>
                <FAQCard 
                  item={item} 
                  index={index} 
                  language={language} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Footer Section */}
      <section id="contact-form" className="relative w-full pt-24 pb-0 mb-0 overflow-hidden" style={{ zIndex: 10 }}>
        {/* Cards container - positioned above the lines */}
        <div className="relative mb-0 pb-0" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container mx-auto px-4 pb-0 mb-0 relative z-10">
          {/* Section Heading */}
          <div className="flex flex-col items-center mb-16">
            <h2 id="contact-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-[#F2CA50] leading-tight mb-6 bg-black relative z-10 inline-block">
              {t('Susisiekite', 'Contact Us', 'Skontaktuj się z nami', 'Свяжитесь с нами')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto text-center bg-black relative z-10 inline-block">
              {t(
                'Užpildykite formą ir susisieksime su jumis artimiausiu metu',
                'Fill out the form and we will contact you soon',
                'Wypełnij formularz, a my skontaktujemy się z Tobą wkrótce',
                'Заполните форму, и мы свяжемся с вами в ближайшее время'
              )}
            </p>
          </div>

          {/* Two Column Layout: Form + Footer Info */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="force-hover-active">
            <div className="relative group">
              <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-zinc-800/50 group-hover:border-[#F2CA50]/50 transition-all duration-300 h-full">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <BorderBeam
                  size={200}
                  duration={15}
                  delay={1}
                  colorFrom="#F2CA50"
                  colorTo="#F2CA50"
                  borderWidth={2}
                />
                
                <CardContent className="p-8 relative">
                  {/* Form */}
                  <div className="[&_input]:bg-zinc-800/50 [&_input]:border-zinc-800/50 [&_input]:text-white [&_input]:placeholder-gray-500 [&_textarea]:bg-zinc-800/50 [&_textarea]:border-zinc-800/50 [&_textarea]:text-white [&_textarea]:placeholder-gray-500 [&_select]:bg-zinc-800/50 [&_select]:border-zinc-800/50 [&_select]:text-white [&_label]:text-gray-300 [&_button]:bg-gradient-to-br [&_button]:from-[#F2CA50] [&_button]:to-[#F2CA50] [&_button]:hover:opacity-90 [&_button]:transition-opacity">
                    <InquiryForm />
                  </div>
                </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Footer/Contact Info */}
            <AnimatedCard index={1} delay={0} className="flex flex-col justify-between">
              <div className="relative group h-full">
                <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-zinc-800/50 group-hover:border-[#F2CA50]/50 transition-all duration-300 h-full">
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <BorderBeam
                  size={200}
                  duration={15}
                  delay={2}
                  colorFrom="#F2CA50"
                  colorTo="#F2CA50"
                  borderWidth={2}
                />
                
                <CardContent className="p-8 relative flex flex-col justify-between h-full">
                  {/* Top Section - Contact Details */}
                  <div className="space-y-8">
                    {/* Phone */}
                    <div>
                      <p className="text-sm text-gray-400 mb-2">{t('Telefonas', 'Phone', 'Telefon', 'Телефон')}</p>
                      <a 
                        href="tel:+37065088892" 
                        className="text-3xl md:text-4xl font-baloo font-bold text-white hover:text-[#F2CA50] transition-colors duration-300 inline-block"
                      >
                        +370 650 88892
                      </a>
                    </div>

                    {/* Email */}
                    <div>
                      <p className="text-sm text-gray-400 mb-2">{t('El. paštas', 'Email', 'E-mail', 'Эл. почта')}</p>
                      <a 
                        href="mailto:info@customsconsulting.eu" 
                        className="text-3xl md:text-4xl font-baloo font-bold text-white hover:text-[#F2CA50] transition-colors duration-300 break-all inline-block"
                      >
                        info@customsconsulting.eu
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-zinc-800/50 pt-44 mt-8">


                      {/* Working Hours */}
                      <div className="mt-6 p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                        <h4 className="text-sm font-semibold text-white mb-2">
                          {t('Darbo laikas', 'Working Hours', 'Godziny pracy', 'Рабочее время')}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {t('24/7', '24/7', '24/7', '24/7')}
                        </p>

                      </div>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </div>
            </AnimatedCard>
          </div>

          {/* Bottom Footer Bar */}
          <div className="border-t border-zinc-800/50 mt-16 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            {/* Left: Made by */}
            <div className="flex items-center gap-2">
              <span>Made by:</span>
              <a 
                href="https://www.brandforge.lt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src="/brandforge.png" 
                  alt="BrandForge" 
                  className="h-6 w-auto"
                />
              </a>
            </div>

            {/* Middle: Copyright */}
            <div className="text-center">
              © {new Date().getFullYear()} UAB "Customs Consulting".{' '}
              {t('Visos teisės saugomos.', 'All rights reserved.', 'Wszelkie prawa zastrzeżone.', 'Все права защищены.')}
            </div>

            {/* Right: Privacy Policy */}
            <div className="flex gap-6">
              <Link to={language === 'en' ? '/privacy-policy' : `/${language}/privacy-policy`} className="hover:text-[#F2CA50] transition-colors duration-300">
                {t('Privatumo politika', 'Privacy Policy', 'Polityka prywatności', 'Политика конфиденциальности')}
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

