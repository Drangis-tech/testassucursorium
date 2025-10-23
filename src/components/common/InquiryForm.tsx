import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { FlowButton } from '@/components/ui/flow-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

const formSchemaLt = z.object({
  name: z.string().min(2, 'Vardas ir pavardė būtini'),
  company: z.string().optional(),
  email: z.string().email('Neteisingas el. pašto adresas'),
  phone: z.string().min(6, 'Telefono numeris būtinas'),
  serviceType: z.string().min(1, 'Pasirinkite paslaugos tipą'),
  message: z.string().min(10, 'Žinutė per trumpa (min. 10 simbolių)'),
  file: z.any().optional(),
});

const formSchemaEn = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Phone number is required'),
  serviceType: z.string().min(1, 'Select service type'),
  message: z.string().min(10, 'Message too short (min. 10 characters)'),
  file: z.any().optional(),
});

type FormData = z.infer<typeof formSchemaLt>;

const InquiryForm = () => {
  const { language, t } = useLanguage();
  const schema = language === 'lt' ? formSchemaLt : formSchemaEn;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      
      toast.success(
        t(
          'Ačiū! Jūsų užklausa gauta. Susisieksime artimiausiu metu.',
          'Thank you! Your inquiry has been received. We will contact you soon.'
        )
      );
      reset();
    } catch (error) {
      toast.error(
        t('Klaida siunčiant užklausą. Bandykite dar kartą.', 'Error sending inquiry. Please try again.')
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
      id="contact-form"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">{t('Vardas/Pavardė', 'Name')} *</Label>
            <Input id="name" {...register('name')} className="mt-1.5" />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">
              {t('Įmonė', 'Company')} ({t('nebūtina', 'optional')})
            </Label>
            <Input id="company" {...register('company')} className="mt-1.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">{t('El. paštas', 'Email')} *</Label>
            <Input id="email" type="email" {...register('email')} className="mt-1.5" />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">{t('Telefonas', 'Phone')} *</Label>
            <Input id="phone" type="tel" {...register('phone')} className="mt-1.5" />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="serviceType">{t('Paslaugos tipas', 'Service Type')} *</Label>
          <select
            id="serviceType"
            {...register('serviceType')}
            className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">{t('Pasirinkite...', 'Select...')}</option>
            <option value="export">{t('Eksportas', 'Export')}</option>
            <option value="import">{t('Importas', 'Import')}</option>
            <option value="tir">{t('TIR CARNET', 'TIR CARNET')}</option>
            <option value="cmr">{t('CMR', 'CMR')}</option>
            <option value="other">{t('Kita', 'Other')}</option>
          </select>
          {errors.serviceType && (
            <p className="text-sm text-destructive mt-1">{errors.serviceType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">{t('Žinutė', 'Message')} *</Label>
          <Textarea
            id="message"
            {...register('message')}
            className="mt-1.5"
            rows={5}
            placeholder={t(
              'Aprašykite savo poreikius...',
              'Describe your needs...'
            )}
          />
          {errors.message && (
            <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="file">
            {t('Failo įkėlimas', 'File Upload')} ({t('nebūtinas', 'optional')})
          </Label>
          <Input
            id="file"
            type="file"
            {...register('file')}
            className="mt-1.5"
          />
        </div>

        <div className="text-xs text-muted-foreground">
          {t(
            'Pateikdami užklausą sutinkate su privatumo politika.',
            'By submitting this form, you agree to the privacy policy.'
          )}
        </div>

        <div className="flex justify-center">
          <FlowButton
            type="submit"
            disabled={isSubmitting}
            className="px-12"
            text={isSubmitting
              ? t('Siunčiama...', 'Sending...')
              : t('Pateikti užklausą', 'Submit Inquiry')}
          />
        </div>
      </form>
    </motion.div>
  );
};

export default InquiryForm;

