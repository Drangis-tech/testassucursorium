import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle } from '@phosphor-icons/react';
import { FlowButton } from '@/components/ui/flow-button';
import { Card, CardContent } from '@/components/ui/card';
import InquiryForm from '@/components/common/InquiryForm';
import DarkVeil from '@/components/common/DarkVeil';
import Plasma from '@/components/common/Plasma';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Home = () => {
  const { language, t } = useLanguage();
  const aboutImageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: aboutImageRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
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
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-left"
            >
              <p className="text-2xl md:text-[35px] text-muted-foreground">
                Customs Consulting
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-[90px] font-baloo font-bold leading-tight text-left mb-16"
            >
              Mes užtikriname sklandų, tikslų ir teisės aktus atitinkantį krovinių įforminimą bei atstovavimą muitinėje.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
      <section className="relative w-full bg-black py-24 overflow-hidden">
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
      <section id="about" className="relative w-full h-screen min-h-screen bg-black overflow-hidden flex items-center">
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

        <div className="container mx-auto px-4 relative z-10 py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center h-full">
            {/* Left Column - Image */}
            <motion.div
              ref={aboutImageRef}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full flex items-center"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl w-full h-[70vh] max-h-[700px] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[5px] group/image">
                <BorderBeam
                  size={250}
                  duration={12}
                  delay={0}
                  colorFrom="#F2CA50"
                  colorTo="#F2CA50"
                />
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                  {/* Placeholder for main image with parallax */}
                  <motion.img
                    src={aboutImage}
                    alt="Customs Consulting Process"
                    className="absolute top-0 left-0 w-full h-[120%] object-cover grayscale opacity-80 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/image:grayscale-0 group-hover/image:opacity-100"
                    style={{ y: imageY }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 transition-opacity duration-[600ms] group-hover/image:opacity-50" />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-full flex flex-col py-4"
            >
              {/* Top Section - Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-white leading-tight mb-6"
              >
                {t('Apie mus', 'About Us')}
              </motion.h2>

              {/* Middle Section - Subheading (centered) */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-[30px] text-gray-400 leading-relaxed max-w-xl mb-auto"
              >
                {t(
                  'Profesionalūs muitinės įforminimo sprendimai su aiškiu procesu ir garantuotais rezultatais.',
                  'Professional customs clearance solutions with a clear process and guaranteed results.'
                )}
              </motion.p>

              {/* Bottom Section - Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="relative w-full bg-black py-24 overflow-hidden">
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
                  <Card
                    key={service.id}
                    className="relative w-[380px] overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer backdrop-blur-sm"
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
                );
              })}
            </Marquee>

            {/* Second Row - Reverse direction */}
            <Marquee pauseOnHover reverse className="[--duration:60s]">
              {services.slice(8).map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    className="relative w-[380px] overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer backdrop-blur-sm"
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
      <section className="relative w-full bg-black py-16 overflow-hidden">
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
            className="relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 rounded-2xl p-8 md:p-12 text-center shadow-2xl"
          >
            <BorderBeam
              size={250}
              duration={15}
              delay={0}
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
      <section className="relative w-full bg-black py-24 overflow-hidden">
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
          <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Card className="relative h-full overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-sm hover:shadow-xl group backdrop-blur-sm">
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <BorderBeam
                    size={150}
                    duration={12}
                    delay={index * 0.5}
                    colorFrom="#F2CA50"
                    colorTo="#F2CA50"
                    borderWidth={2}
                  />
                  <CardContent className="p-0 relative">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={item.id} className="border-none">
                        <AccordionTrigger className="px-6 pt-6 pb-4 text-left hover:no-underline group/trigger">
                          <div className="flex items-start gap-4 w-full">
                            {/* Number styled like header menu - on the left */}
                            <span className="flex-shrink-0 text-[18px] font-normal text-[#F2CA50] tracking-normal pointer-events-none select-none transition-opacity duration-300">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="font-baloo font-semibold text-white text-lg flex-1 leading-tight pr-8">
                              {item.question[language]}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed">
                          <div className="pl-10 text-base">
                            {item.answer[language]}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All FAQ Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <FlowButton
              href={language === 'en' ? '/en/faq' : '/duk'}
              text={t('Visi klausimai', 'All Questions')}
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Footer Section */}
      <section id="contact-form" className="relative w-full bg-black py-24 overflow-hidden min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full z-0">
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
                    <div className="border-t border-zinc-800/50 pt-8 mt-8">
                      {/* Quick Links */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg font-baloo font-semibold text-white mb-4">
                          {t('Greitos nuorodos', 'Quick Links')}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <a 
                            href={language === 'en' ? '/en' : '/'} 
                            className="text-gray-400 hover:text-[#F2CA50] transition-colors duration-300 text-sm"
                          >
                            {t('Pagrindinis', 'Home')}
                          </a>
                          <a 
                            href={language === 'en' ? '/en/services' : '/services'} 
                            className="text-gray-400 hover:text-[#F2CA50] transition-colors duration-300 text-sm"
                          >
                            {t('Paslaugos', 'Services')}
                          </a>
                          <a 
                            href={language === 'en' ? '/en/faq' : '/duk'} 
                            className="text-gray-400 hover:text-[#F2CA50] transition-colors duration-300 text-sm"
                          >
                            {t('DUK', 'FAQ')}
                          </a>
                          <a 
                            href="#contact-form" 
                            className="text-gray-400 hover:text-[#F2CA50] transition-colors duration-300 text-sm"
                          >
                            {t('Kontaktai', 'Contact')}
                          </a>
                        </div>
                      </motion.div>

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

