import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { services } from '@/lib/services';
import { Card, CardContent } from '@/components/ui/card';
import { Particles } from '@/components/ui/particles';
import { DotPattern } from '@/components/ui/dot-pattern';
import { FlowButton } from '@/components/ui/flow-button';

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
              {t('Mūsų paslaugos', 'Our Services')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {t(
                'Profesionalūs muitinės įforminimo sprendimai visiems Jūsų poreikiams',
                'Professional customs clearance solutions for all your needs'
              )}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                {t('Neradote reikiamos paslaugos?', "Didn't Find What You Need?")}
              </h2>
              <p className="text-lg mb-8 text-gray-400">
                {t(
                  'Susisiekite su mumis ir aptarsime Jūsų individualius poreikius',
                  'Contact us and we will discuss your individual needs'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FlowButton
                  href={language === 'en' ? '/en#contact-form' : '/#contact-form'}
                  text={t('Pateikti užklausą', 'Submit Inquiry')}
                />
                <FlowButton
                  href="tel:+37012345678"
                  variant="outline"
                  text={t('Skambinti dabar', 'Call Now')}
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

