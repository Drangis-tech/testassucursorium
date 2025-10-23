import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import logo from '@/assets/logo.png';
import StaggeredMenu, { StaggeredMenuItem } from './StaggeredMenu';

const Header = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  const basePath = language === 'en' ? '/en' : '';

  const menuItems: StaggeredMenuItem[] = [
    {
      label: t('Pagrindinis', 'Home'),
      ariaLabel: t('Eiti į pagrindinį puslapį', 'Go to home page'),
      link: basePath + '/',
    },
    {
      label: t('Paslaugos', 'Services'),
      ariaLabel: t('Peržiūrėti paslaugas', 'View our services'),
      link: basePath + (language === 'en' ? '/services' : '/services'),
    },
    {
      label: t('DUK', 'FAQ'),
      ariaLabel: t('Dažniausiai užduodami klausimai', 'Frequently asked questions'),
      link: basePath + (language === 'en' ? '/faq' : '/duk'),
    },
    {
      label: t('Kontaktai', 'Contacts'),
      ariaLabel: t('Susisiekite su mumis', 'Contact us'),
      link: basePath + (language === 'en' ? '/contacts' : '/kontaktai'),
    },
  ];

  const toggleLanguage = () => {
    const currentPath = location.pathname;
    if (language === 'lt') {
      window.location.href = '/en' + currentPath;
    } else {
      window.location.href = currentPath.replace('/en', '') || '/';
    }
  };

  const socialItems = [
    {
      label: t('Kalba: LT', 'Language: EN'),
      link: '#language',
    },
  ];

  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link?.getAttribute('href') === '#language') {
      e.preventDefault();
      toggleLanguage();
    }
  };

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
      />
    </div>
  );
};

export default Header;

