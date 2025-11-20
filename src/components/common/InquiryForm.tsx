import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FlowButton } from '@/components/ui/flow-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/useToast';
import { motion } from 'framer-motion';
import Botpoison from "@botpoison/browser";
import { useEffect, useRef } from 'react';

const formSchemaLt = z.object({
  name: z.string().min(2, 'Vardas ir pavardė būtini'),
  company: z.string().optional(),
  email: z.string().email('Neteisingas el. pašto adresas'),
  phone: z.string().min(6, 'Telefono numeris būtinas'),
  serviceType: z.string().min(1, 'Paslaugos tipas būtinas'),
  message: z.string().optional(),
});

const formSchemaPl = z.object({
  name: z.string().min(2, 'Imię i nazwisko są wymagane'),
  company: z.string().optional(),
  email: z.string().email('Nieprawidłowy adres e-mail'),
  phone: z.string().min(6, 'Numer telefonu jest wymagany'),
  serviceType: z.string().min(1, 'Typ usługi jest wymagany'),
  message: z.string().optional(),
});

const formSchemaRu = z.object({
  name: z.string().min(2, 'Имя и фамилия обязательны'),
  company: z.string().optional(),
  email: z.string().email('Неверный адрес электронной почты'),
  phone: z.string().min(6, 'Номер телефона обязателен'),
  serviceType: z.string().min(1, 'Тип услуги обязателен'),
  message: z.string().optional(),
});

const formSchemaEn = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Phone number is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchemaLt>;

const InquiryForm = () => {
  const { language, t } = useLanguage();
  const { showToast } = useToast();
  
  const getSchema = () => {
    if (language === 'pl') return formSchemaPl;
    if (language === 'ru') return formSchemaRu;
    if (language === 'en') return formSchemaEn;
    return formSchemaLt;
  };

  const schema = getSchema();
  const botpoison = useRef<any>(null);

  useEffect(() => {
    botpoison.current = new Botpoison({
      publicKey: "pk_52b09e70-e190-4719-97a8-5aaa5679d44e",
    });
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!botpoison.current) return;

    try {
      const { solution } = await botpoison.current.challenge();
      
      const payload = {
        ...data,
        _email: data.email, // Set the reply-to email address
        _botpoison: solution,
      };

      const response = await fetch('https://submit-form.com/kX5HhWm6l', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      reset();
      showToast({
        type: 'success',
        title: t('Užklausa gauta!', 'Inquiry Received!', 'Zapytanie otrzymane!', 'Запрос получен!'),
        message: t(
          'Ačiū, kad kreipėtės. Susisieksime su jumis artimiausiu metu.',
          'Thank you for reaching out. We will be in touch shortly.',
          'Dziękujemy za kontakt. Skontaktujemy się wkrótce.',
          'Спасибо за обращение. Мы свяжемся с вами в ближайшее время.'
        ),
      });
    } catch (error) {
      console.error('Form submission error:', error);
      showToast({
        type: 'error',
        title: t('Įvyko klaida', 'Something went wrong', 'Wystąpił błąd', 'Произошла ошибка'),
        message: t(
          'Nepavyko išsiųsti užklausos. Prašome bandyti dar kartą arba susisiekti telefonu.',
          'Failed to send inquiry. Please try again or contact us by phone.',
          'Nie udało się wysłać zapytania. Spróbuj ponownie lub skontaktuj się telefonicznie.',
          'Не удалось отправить запрос. Пожалуйста, попробуйте еще раз или свяжитесь по телефону.'
        ),
      });
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
            <Label htmlFor="name">{t('Vardas', 'Name', 'Imię i nazwisko', 'Имя и фамилия')} *</Label>
            <Input id="name" {...register('name')} className="mt-1.5" />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">
              {t('Įmonė', 'Company', 'Firma', 'Компания')} ({t('nebūtina', 'optional', 'opcjonalnie', 'необязательно')})
            </Label>
            <Input id="company" {...register('company')} className="mt-1.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">{t('El. paštas', 'Email', 'E-mail', 'Эл. почта')} *</Label>
            <Input id="email" type="email" {...register('email')} className="mt-1.5" />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">{t('Telefonas', 'Phone', 'Telefon', 'Телефон')} *</Label>
            <Input id="phone" type="tel" {...register('phone')} className="mt-1.5" />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="serviceType">{t('Dominanti paslauga', 'Service Type', 'Interesująca usługa', 'Интересующая услуга')} *</Label>
          <Input
            id="serviceType"
            {...register('serviceType')}
            className="mt-1.5"
            placeholder={t('Įveskite paslaugos tipą...', 'Enter service type...', 'Wpisz typ usługi...', 'Введите тип услуги...')}
          />
          {errors.serviceType && (
            <p className="text-sm text-destructive mt-1">{errors.serviceType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">
            {t('Žinutė', 'Message', 'Wiadomość', 'Сообщение')} ({t('nebūtina', 'optional', 'opcjonalnie', 'необязательно')})
          </Label>
          <Textarea
            id="message"
            {...register('message')}
            className="mt-1.5"
            rows={5}
            placeholder={t(
              'Aprašykite savo poreikius...',
              'Describe your needs...',
              'Opisz swoje potrzeby...',
              'Опишите свои потребности...'
            )}
          />
          {errors.message && (
            <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {t(
            'Pateikdami užklausą sutinkate su privatumo politika.',
            'By submitting this form, you agree to the privacy policy.',
            'Przesyłając ten formularz, zgadzasz się z polityką prywatności.',
            'Отправляя эту форму, вы соглашаетесь с политикой конфиденциальности.'
          )}
        </div>

        <div className="flex justify-center">
          <FlowButton
            type="submit"
            disabled={isSubmitting}
            className="px-12"
            text={isSubmitting
              ? t('Siunčiama...', 'Sending...', 'Wysyłanie...', 'Отправка...')
              : t('Pateikti užklausą', 'Submit Inquiry', 'Wyślij zapytanie', 'Отправить запрос')}
          />
        </div>
      </form>
    </motion.div>
  );
};

export default InquiryForm;

