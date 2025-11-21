import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { services } from '@/lib/services';
import { borderServices } from '@/lib/borderServices';
import { Card, CardContent } from '@/components/ui/card';
import { Particles } from '@/components/ui/particles';
import { DotPattern } from '@/components/ui/dot-pattern';
import { FlowButton } from '@/components/ui/flow-button';
import { LineShadowText } from '@/components/ui/line-shadow-text';

const Services = () => {
  const { language, t } = useLanguage();

  return (
    <div className="overflow-hidden">
      {/* Services Hero Section */}
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
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-white leading-tight mb-6">
              {t('Mūsų paslaugos', 'Our Services', 'Nasze usługi', 'Наши услуги')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {t(
                'Profesionalūs muitinės įforminimo sprendimai visiems Jūsų poreikiams',
                'Professional customs clearance solutions for all your needs',
                'Profesjonalne rozwiązania odprawy celnej dla wszystkich Twoich potrzeb',
                'Профессиональные решения по таможенному оформлению для всех ваших нужд'
              )}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Card
                    className="relative h-full overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer backdrop-blur-sm"
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
                </motion.div>
              );
            })}
          </div>

          {/* Border Services Section */}
          <div className="mb-24">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mb-16"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-baloo font-bold text-white leading-tight mb-2 bg-black relative z-10 inline-block text-center max-[1236px]:text-center min-[1236px]:flex min-[1236px]:items-center min-[1236px]:justify-center -mt-3">
                <span className="max-[1236px]:block min-[1236px]:inline">
                  {t('Paslaugos pasieniuose', 'Border Services', 'Usługi na granicy', 'Услуги на границе')}
                </span>
                <span className="max-[1236px]:hidden min-[1236px]:inline mx-2">–</span>
                <span className="max-[1236px]:block max-[1236px]:mt-2 min-[1236px]:inline-flex min-[1236px]:items-center">
                  <LineShadowText 
                    shadowColor="#F2CA50" 
                    as="span" 
                    className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-[110px] italic"
                  >
                    24/7
                  </LineShadowText>
                </span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {borderServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <Card
                      className="relative h-full overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer backdrop-blur-sm"
                    >
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardContent className="p-6 relative flex flex-col h-full">
                        {/* Icon */}
                        <div className="mb-4 flex justify-center">
                          <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {service.image ? (
                              <img src={service.image} alt={service.title[language]} className="h-14 w-14 object-contain" />
                            ) : Icon ? (
                              <Icon className="h-14 w-14" style={{ color: '#F1C94F' }} weight="regular" />
                            ) : null}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-baloo font-bold text-white mb-3 text-center">
                          {service.title[language]}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed text-center mt-auto">
                          {service.description[language]}
                        </p>

                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2CA50]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 hover:border-[#F2CA50]/50 transition-all duration-300 shadow-2xl backdrop-blur-sm p-8 md:p-12">
              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2CA50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-white mb-4">
                {t('Neradote reikiamos paslaugos?', "Didn't Find What You Need?", 'Nie znalazłeś potrzebnej usługi?', 'Не нашли нужную услугу?')}
              </h2>
              <p className="text-lg mb-8 text-gray-400">
                {t(
                  'Susisiekite su mumis ir aptarsime Jūsų individualius poreikius',
                  'Contact us and we will discuss your individual needs',
                  'Skontaktuj się z nami, a omówimy Twoje indywidualne potrzeby',
                  'Свяжитесь с нами, и мы обсудим ваши индивидуальные потребности'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FlowButton
                  href={language === 'lt' ? '/#contact-form' : `/${language}/#contact-form`}
                  text={t('Pateikti užklausą', 'Submit Inquiry', 'Wyślij zapytanie', 'Отправить запрос')}
                />
                <FlowButton
                  href="tel:+37012345678"
                  variant="outline"
                  text={t('Skambinti dabar', 'Call Now', 'Zadzwoń teraz', 'Позвонить сейчас')}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;

