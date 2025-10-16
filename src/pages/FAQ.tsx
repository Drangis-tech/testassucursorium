import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import InquiryForm from '@/components/common/InquiryForm';
import { useLanguage } from '@/hooks/useLanguage';
import { faqItems } from '@/lib/faq';

const FAQ = () => {
  const { language, t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge variant="secondary" className="mb-6 font-baloo">
          {t('DUK', 'FAQ')}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-6">
          {t('Dažniausiai užduodami klausimai', 'Frequently Asked Questions')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t(
            'Atsakymai į dažniausius klausimus apie muitinės procedūras ir mūsų paslaugas',
            'Answers to common questions about customs procedures and our services'
          )}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={item.id}>
                  <AccordionTrigger className="text-left font-baloo font-semibold">
                    {item.question[language]}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer[language]}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card rounded-2xl p-8 md:p-12 border border-border"
        >
          <h2 className="text-2xl md:text-3xl font-baloo font-bold mb-4 text-center">
            {t('Neradote atsakymo?', "Didn't Find an Answer?")}
          </h2>
          <p className="text-muted-foreground mb-8 text-center">
            {t(
              'Klauskite tiesiogiai – mūsų specialistai atsakys į visus Jūsų klausimus',
              'Ask directly – our specialists will answer all your questions'
            )}
          </p>
          <InquiryForm />
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

