import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useParallaxFooter } from '@/hooks/useParallaxFooter';

const Footer = () => {
  const { language, t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  
  useParallaxFooter(footerRef);

  const basePath = language === 'en' ? '/en' : '';

  return (
    <footer
      ref={footerRef}
      className="relative bg-card border-t border-border overflow-hidden mt-24"
    >
      {/* Parallax Background */}
      <div
        data-parallax-bg
        className="absolute inset-0 bg-gradient-to-b from-background to-card opacity-50 pointer-events-none"
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-baloo font-bold">
                CC
              </div>
              <div className="font-baloo font-bold text-lg">
                Customs Consulting
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(
                'UAB „Customs Consulting" – patikimas muitinės tarpininkas',
                'UAB "Customs Consulting" – reliable customs broker'
              )}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-baloo font-semibold mb-4">
              {t('Navigacija', 'Navigation')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={basePath + '/'}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('Pagrindinis', 'Home')}
                </Link>
              </li>
              <li>
                <Link
                  to={basePath + '/services'}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('Paslaugos', 'Services')}
                </Link>
              </li>
              <li>
                <Link
                  to={basePath + (language === 'en' ? '/faq' : '/duk')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('DUK', 'FAQ')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-baloo font-semibold mb-4">
              {t('Kontaktai', 'Contact')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <a
                  href="tel:+37012345678"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  +370 1 234 5678
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <a
                  href="mailto:info@customsconsulting.lt"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@customsconsulting.lt
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">
                  {t('Vilnius, Lietuva', 'Vilnius, Lithuania')}
                </span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-baloo font-semibold mb-4">
              {t('Darbo laikas', 'Working Hours')}
            </h3>
            <div className="flex items-start gap-2 text-sm">
              <Clock className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="text-muted-foreground">
                <div>{t('I–V: 8:00–17:00', 'Mon–Fri: 8:00–17:00')}</div>
                <div className="mt-1 text-xs">
                  {t('Skubūs atvejai – 24/7', 'Urgent cases – 24/7')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} UAB "Customs Consulting".{' '}
            {t('Visos teisės saugomos.', 'All rights reserved.')}
          </div>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-foreground transition-colors">
              {t('Privatumo politika', 'Privacy Policy')}
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              {t('Sąlygos', 'Terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

