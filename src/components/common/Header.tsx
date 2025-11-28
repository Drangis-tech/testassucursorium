import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import logo from '@/assets/logo.svg';
import StaggeredMenu, { type StaggeredMenuItem } from './StaggeredMenu';

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = language === 'en' ? '' : '/' + language;

  const menuItems: StaggeredMenuItem[] = [
    {
      label: t('Pagrindinis', 'Home', 'Strona główna', 'Главная'),
      ariaLabel: t('Eiti į pagrindinį puslapį', 'Go to home page', 'Przejdź do strony głównej', 'Перейти на главную страницу'),
      link: basePath + '/',
    },
    {
      label: t('Apie mus', 'About Us', 'O nas', 'О нас'),
      ariaLabel: t('Sužinoti apie mus', 'Learn about us', 'Dowiedz się o nas', 'Узнать о нас'),
      link: basePath + '/#' + t('apie-mus', 'about-us', 'o-nas', 'o-nas'),
    },
    {
      label: t('Paslaugos', 'Services', 'Usługi', 'Услуги'),
      ariaLabel: t('Peržiūrėti paslaugas', 'View our services', 'Zobacz nasze usługi', 'Посмотреть наши услуги'),
      link: basePath + '/services',
      children: [
        {
          label: t('Vidinėse muitinėse', 'Internal Customs', 'Wewnętrzne urzędy celne', 'Во внутренних таможнях'),
          link: basePath + '/#' + t('paslaugos-vidinese-muitinese', 'internal-customs-services', 'wewnetrzne-uslugi-celne', 'vnutrennie-tamozhennye-uslugi')
        },
        {
          label: t('Pasieniuose', 'At Borders', 'Na granicach', 'На границах'),
          link: basePath + '/#' + t('paslaugos-pasieniuose', 'border-services', 'uslugi-na-granicy', 'uslugi-na-granice')
        },
        {
          label: t('Visos', 'All', 'Wszystkie', 'Все'),
          link: basePath + '/services'
        }
      ]
    },
    {
      label: t('DUK', 'FAQ', 'FAQ', 'FAQ'),
      ariaLabel: t('Dažniausiai užduodami klausimai', 'Frequently asked questions', 'Często zadawane pytania', 'Часто задаваемые вопросы'),
      link: basePath + '/#' + t('DUK', 'faq', 'faq', 'faq'),
    },
    {
      label: t('Kontaktai', 'Contacts', 'Kontakt', 'Контакты'),
      ariaLabel: t('Susisiekite su mumis', 'Contact us', 'Skontaktuj się z nami', 'Свяжитесь с нами'),
      link: basePath + '/#' + t('kontaktai', 'contacts', 'kontakt', 'kontakty'),
    },
  ];

  const switchLanguage = (targetLang: string) => {
    const currentPath = location.pathname;
    // Remove any existing language prefix
    const pathWithoutLang = currentPath.replace(/^\/(lt|ru|pl)/, '');
    
    if (targetLang === 'en') {
      navigate(pathWithoutLang || '/');
    } else {
      navigate(`/${targetLang}${pathWithoutLang}`);
    }
  };

  const socialItems = [
    {
      label: 'EN',
      link: '#lang-en',
    },
    {
      label: 'LT',
      link: '#lang-lt',
    },
    {
      label: 'RU',
      link: '#lang-ru',
    },
    {
      label: 'PL',
      link: '#lang-pl',
    },
  ];

  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    const href = link?.getAttribute('href');
    
    if (href?.startsWith('#lang-')) {
      e.preventDefault();
      const targetLang = href.replace('#lang-', '');
      switchLanguage(targetLang);
    }
  };

  const shouldShowLogo = location.pathname.includes('services') || location.pathname.includes('privacy-policy');

  return (
    <div 
      className="fixed top-0 left-0 w-full z-50"
      onClick={handleLinkClick}
    >
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={['#F2CA50', '#F2CA50']}
        logoUrl={logo}
        accentColor="#F2CA50"
        isFixed={false}
        currentLanguage={language}
        onMenuOpen={() => onMenuToggle?.(true)}
        onMenuClose={() => onMenuToggle?.(false)}
        alwaysShowLogo={shouldShowLogo}
        socialTitle={t('Kalbos', 'Languages', 'Języki', 'Языки')}
      />
    </div>
  );
};

export default Header;

