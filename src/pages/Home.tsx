import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServiceCard from '@/components/common/ServiceCard';
import StatsCounter from '@/components/common/StatsCounter';
import InquiryForm from '@/components/common/InquiryForm';
import FlipLink from '@/components/common/FlipLink';
import { useLanguage } from '@/hooks/useLanguage';
import { services } from '@/lib/services';
import { stats } from '@/lib/stats';
import { faqItems } from '@/lib/faq';

const Home = () => {
  const { language, t } = useLanguage();

  const valueProps = [
    {
      title: t('Greitas aptarnavimas', 'Fast Service'),
      description: t(
        'Krovinių įforminimas per 2–4 valandas',
        'Cargo clearance within 2–4 hours'
      ),
    },
    {
      title: t('Patirtis', 'Experience'),
      description: t('12+ metų patirtis muitinės srityje', '12+ years of customs experience'),
    },
    {
      title: t('Garantijos', 'Guarantees'),
      description: t('Bendra garantija 500k+ EUR', 'General guarantee 500k+ EUR'),
    },
    {
      title: t('24/7 pagalba', '24/7 Support'),
      description: t('Skubūs atvejai sprendžiami visą parą', 'Urgent cases handled 24/7'),
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 font-baloo">
              {t('Licencijuotas muitinės tarpininkas', 'Licensed Customs Broker')}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-baloo font-bold mb-6 leading-tight"
          >
            {t(
              'Patikimas muitinės tarpininkas Jūsų kroviniams',
              'Reliable Customs Broker for Your Cargo'
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t(
              'Kvalifikuotos muitinės tarpininkavimo paslaugos – nuo deklaracijų pildymo iki atstovavimo muitinėje. Dirbame greitai, tiksliai ir pagal ES reikalavimus.',
              'Qualified customs brokerage services – from declaration completion to customs representation. We work fast, accurately, and according to EU requirements.'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="font-baloo text-base">
              <a href="#contact-form">
                {t('Pateikti užklausą', 'Submit Inquiry')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-baloo text-base"
            >
              <a href="tel:+37012345678">
                <Phone className="mr-2 h-5 w-5" />
                {t('Skambinti', 'Call Us')}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-baloo font-semibold text-xl mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{prop.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-2xl my-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-baloo font-bold mb-4"
          >
            {t('Mūsų paslaugos', 'Our Services')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            {t(
              'Pilnas muitinės paslaugų spektras Jūsų verslui',
              'Complete range of customs services for your business'
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="font-baloo">
            <FlipLink href={language === 'en' ? '/en/services' : '/services'}>
              {t('Visos paslaugos', 'All Services')}
            </FlipLink>
          </Button>
        </div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-baloo font-bold text-primary mb-2">
                <StatsCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label[language]}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-baloo font-bold mb-4">
            {t('Reikia pagalbos su muitine?', 'Need Help with Customs?')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t(
              'Susisiekite su mumis ir gaukite profesionalią konsultaciją',
              'Contact us and get professional consultation'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-baloo text-base"
            >
              <a href="#contact-form">{t('Pateikti užklausą', 'Submit Inquiry')}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-baloo text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href="tel:+37012345678">
                <Phone className="mr-2 h-5 w-5" />
                {t('Skambinti dabar', 'Call Now')}
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FAQ Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-baloo font-bold mb-4"
          >
            {t('Dažniausiai užduodami klausimai', 'Frequently Asked Questions')}
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-baloo font-semibold mb-2">
                    {item.question[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.answer[language].substring(0, 150)}...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="font-baloo">
            <FlipLink href={language === 'en' ? '/en/faq' : '/duk'}>
              {t('Visi klausimai', 'All Questions')}
            </FlipLink>
          </Button>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-2xl my-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-baloo font-bold mb-4"
          >
            {t('Susisiekite su mumis', 'Contact Us')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            {t(
              'Užpildykite formą ir susisieksime su jumis artimiausiu metu',
              'Fill out the form and we will contact you soon'
            )}
          </motion.p>
        </div>

        <InquiryForm />
      </section>
    </div>
  );
};

export default Home;

