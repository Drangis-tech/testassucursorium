import { motion } from 'framer-motion';
import ServiceCard from '@/components/common/ServiceCard';
import { useLanguage } from '@/hooks/useLanguage';
import { services } from '@/lib/services';
import { Badge } from '@/components/ui/badge';

const Services = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge variant="secondary" className="mb-6 font-baloo">
          {t('Mūsų paslaugos', 'Our Services')}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-6">
          {t('Pilnas muitinės paslaugų spektras', 'Complete Customs Services')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t(
            'Teikiame profesionalias muitinės tarpininkavimo paslaugas verslui. Nuo standartinių deklaracijų iki sudėtingų procedūrų.',
            'We provide professional customs brokerage services for businesses. From standard declarations to complex procedures.'
          )}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center bg-card rounded-2xl p-8 md:p-12 border border-border"
      >
        <h2 className="text-2xl md:text-3xl font-baloo font-bold mb-4">
          {t('Neradote reikiamos paslaugos?', "Didn't Find What You Need?")}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t(
            'Susisiekite su mumis ir aptarsime Jūsų individualius poreikius',
            'Contact us and we will discuss your individual needs'
          )}
        </p>
        <a
          href="tel:+37012345678"
          className="text-primary font-semibold hover:underline"
        >
          +370 1 234 5678
        </a>
      </motion.div>
    </div>
  );
};

export default Services;

