import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo, useCallback, useEffect, lazy, Suspense } from 'react';
import { CheckCircle, CaretDown } from '@phosphor-icons/react';
import { FlowButton } from '@/components/ui/flow-button';
import { Card, CardContent } from '@/components/ui/card';
import InquiryForm from '@/components/common/InquiryForm';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Particles } from '@/components/ui/particles';
import { DotPattern } from '@/components/ui/dot-pattern';
import { BorderBeam } from '@/components/ui/border-beam';
import { useLanguage } from '@/hooks/useLanguage';
import { stats } from '@/lib/stats';
import { faqItems } from '@/lib/faq';
import { services } from '@/lib/services';
import { Marquee } from '@/components/ui/marquee';
import aboutImage from '@/assets/about.webp';
import { Link } from 'react-router-dom';

// Lazy-load heavy WebGL background animations
const DarkVeil = lazy(() => import('@/components/common/DarkVeil'));
const Plasma = lazy(() => import('@/components/common/Plasma'));

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        style={{ isolation: 'isolate' }}
      >
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
      </motion.div>
    </div>
  );
});

FAQCard.displayName = 'FAQCard';

const Home = () => {
  const { language, t } = useLanguage();

  // Handle scroll to hash section on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black" />}>
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
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-12 text-left"
            >
              <p className="text-[21px] sm:text-2xl md:text-[30px] lg:text-4xl xl:text-[45px] text-muted-foreground">
                Customs Consulting
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[42px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-baloo font-bold leading-tight text-left mb-8 md:mb-12 lg:mb-16"
            >
              Mes užtikriname sklandų, tikslų ir teisės aktus atitinkantį krovinių įforminimą bei atstovavimą muitinėje.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <FlowButton
                href="#contact-form"
                text="Susisiekite"
                size="large"
              />
            </motion.div>
          </div>
        </div>
      </section>



      {/* Statistics */}
      <section className="relative w-full bg-black py-24 overflow-hidden" style={{ contentVisibility: 'auto' }}>
        {/* Background particles effect */}
        <div className="absolute inset-0">
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color="#F2CA50"
            refresh={false}
          />
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                {/* Card with gradient border effect */}
                <div className="relative h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 backdrop-blur-sm">
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative text-center">
                    {/* Animated number */}
                    <div className="font-baloo font-bold mb-3">
                      <div className="text-4xl md:text-5xl bg-gradient-to-br from-[#F2CA50] via-[#F2CA50] to-[#F2CA50] bg-clip-text text-transparent flex items-center justify-center gap-1">
                        {stat.prefix && <span className="text-3xl md:text-4xl">{stat.prefix}</span>}
                        <NumberTicker
                          value={stat.value}
                          className="inline-block tabular-nums"
                        />
                        {stat.suffix && <span className="text-3xl md:text-4xl">{stat.suffix}</span>}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative w-full min-h-screen bg-black overflow-hidden py-12 lg:py-24 lg:flex lg:items-center" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-white leading-tight mb-6"
              >
                {t('Apie mus', 'About Us')}
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
                  'Profesionalūs muitinės įforminimo sprendimai su aiškiu procesu ir garantuotais rezultatais.',
                  'Professional customs clearance solutions with a clear process and guaranteed results.'
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="order-3 lg:order-2 mt-6 lg:mt-auto lg:col-start-2"
            >
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
                        {t('Patikimas rezultatas', 'Reliable Results')}
                      </h3>
                      
                      {/* Main Stat */}
                      <div className="flex flex-wrap items-baseline gap-2 mb-6">
                        <span className="text-3xl md:text-4xl font-baloo font-bold bg-gradient-to-br from-[#F2CA50] to-[#F2CA50] bg-clip-text text-transparent">
                          2,847
                        </span>
                        <span className="text-sm md:text-base text-gray-400">
                          {t('deklaracijos per metus', 'declarations per year')}
                        </span>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-zinc-800/50 mb-6"></div>
                      
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        {t(
                          'Užtikriname greitą ir profesionalų krovinių muitinės įforminimą su 12+ metų patirtimi tarptautinės prekybos srityje.',
                          'We ensure fast and professional cargo customs clearance with 12+ years of experience in international trade.'
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="relative w-full bg-black py-24 overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
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
            className="text-center mb-16"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-white leading-tight mb-6">
              {t('Mūsų paslaugos', 'Our Services')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {t(
                'Profesionalūs muitinės įforminimo sprendimai visiems Jūsų poreikiams',
                'Professional customs clearance solutions for all your needs'
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
                    to={language === 'en' ? '/en/services' : '/services'}
                    className="block"
                  >
                    <Card
                      className="relative w-[280px] sm:w-[320px] md:w-[380px] h-[280px] overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer backdrop-blur-sm"
                    >
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardContent className="p-6 relative">
                        {/* Icon */}
                        <div className="mb-4">
                          <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    to={language === 'en' ? '/en/services' : '/services'}
                    className="block"
                  >
                    <Card
                      className="relative w-[280px] sm:w-[320px] md:w-[380px] h-[280px] overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer backdrop-blur-sm"
                    >
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardContent className="p-6 relative">
                        {/* Icon */}
                        <div className="mb-4">
                          <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              href={language === 'en' ? '/en/services' : '/services'}
              text={t('Visos paslaugos', 'All Services')}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="relative w-full bg-black py-16 overflow-hidden" style={{ contentVisibility: 'auto' }}>
        {/* Background particles effect */}
        <div className="absolute inset-0">
          <Particles
            className="absolute inset-0"
            quantity={60}
            ease={80}
            color="#F2CA50"
            refresh={false}
          />
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ willChange: 'opacity, transform' }}
            className="relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 rounded-2xl p-8 md:p-12 text-center shadow-2xl"
          >
            <BorderBeam
              size={250}
              duration={15}
              delay={0.6}
              colorFrom="#F2CA50"
              colorTo="#F2CA50"
              borderWidth={2}
            />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-white mb-4">
                {t('Reikia pagalbos su muitine?', 'Need Help with Customs?')}
              </h2>
              <p className="text-lg mb-8 text-gray-400">
                {t(
                  'Susisiekite su mumis ir gaukite profesionalią konsultaciją',
                  'Contact us and get professional consultation'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FlowButton
                  href="#contact-form"
                  text={t('Pateikti užklausą', 'Submit Inquiry')}
                />
                <FlowButton
                  href="tel:+37012345678"
                  variant="outline"
                  text={t('Skambinti dabar', 'Call Now')}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative w-full bg-black py-24 overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-white leading-tight mb-6">
              {t('DUK', 'FAQ')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {t(
                'Dažniausiai užduodami klausimai apie mūsų paslaugas',
                'Frequently asked questions about our services'
              )}
            </p>
          </motion.div>

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
      <section id="contact-form" className="relative w-full bg-black py-24 overflow-hidden min-h-screen" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 900px' }}>
        {/* Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1510] to-black" />}>
            <Plasma 
              color="#F2CA50"
              speed={0.8}
              direction="forward"
              scale={1.0}
              opacity={0.7}
              mouseInteractive={true}
              targetFPS={24}
              resolutionScale={0.6}
            />
          </Suspense>
        </div>
        
        {/* Dark overlay to tone down the effect */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        
        {/* Top fade overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-black to-transparent z-[2] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-white leading-tight mb-6"
            >
              {t('Susisiekite', 'Contact Us')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
            >
              {t(
                'Užpildykite formą ir susisieksime su jumis artimiausiu metu',
                'Fill out the form and we will contact you soon'
              )}
            </motion.p>
          </motion.div>

          {/* Two Column Layout: Form + Footer Info */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-2xl group backdrop-blur-sm h-full">
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
            </motion.div>

            {/* Right Column - Footer/Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col justify-between"
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-2xl group backdrop-blur-sm h-full">
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
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-sm text-gray-400 mb-2">{t('Telefonas', 'Phone')}</p>
                      <a 
                        href="tel:+37012345678" 
                        className="text-3xl md:text-4xl font-baloo font-bold text-white hover:text-[#F2CA50] transition-colors duration-300 inline-block"
                      >
                        +370 123 45678
                      </a>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-sm text-gray-400 mb-2">{t('El. paštas', 'Email')}</p>
                      <a 
                        href="mailto:info@customsconsulting.lt" 
                        className="text-3xl md:text-4xl font-baloo font-bold text-white hover:text-[#F2CA50] transition-colors duration-300 break-all inline-block"
                      >
                        info@customsconsulting.lt
                      </a>
                    </motion.div>

                    {/* Divider */}
                    <div className="border-t border-zinc-800/50 pt-44 mt-8">


                      {/* Working Hours */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50"
                      >
                        <h4 className="text-sm font-semibold text-white mb-2">
                          {t('Darbo laikas', 'Working Hours')}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {t('I–V: 8:00–17:00', 'Mon–Fri: 8:00–17:00')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('Skubūs atvejai – 24/7', 'Urgent cases – 24/7')}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Footer Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="border-t border-zinc-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400"
          >
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} UAB "Customs Consulting".{' '}
              {t('Visos teisės saugomos.', 'All rights reserved.')}
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#F2CA50] transition-colors duration-300">
                {t('Privatumo politika', 'Privacy Policy')}
              </a>
              <a href="#" className="hover:text-[#F2CA50] transition-colors duration-300">
                {t('Sąlygos', 'Terms')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;

