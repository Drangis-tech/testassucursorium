import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/useLanguage';
import type { Service } from '@/lib/services';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { language } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 h-full group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-baloo">
                    {service.title[language]}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="font-baloo text-2xl">
              {service.title[language]}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            {service.description[language]}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button asChild className="w-full font-baloo">
            <a href={`#contact-form`}>
              {language === 'lt' ? 'Užklausti' : 'Inquire'}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCard;

