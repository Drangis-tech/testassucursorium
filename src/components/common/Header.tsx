import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import logo from '@/assets/logo.png';
import StaggeredMenu, { type StaggeredMenuItem } from './StaggeredMenu';

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
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
      label: t('Apie mus', 'About Us'),
      ariaLabel: t('Sužinoti apie mus', 'Learn about us'),
      link: (basePath || '') + '/#about',
    },
    {
      label: t('Paslaugos', 'Services'),
      ariaLabel: t('Peržiūrėti paslaugas', 'View our services'),
      link: basePath + '/services',
    },
    {
      label: t('DUK', 'FAQ'),
      ariaLabel: t('Dažniausiai užduodami klausimai', 'Frequently asked questions'),
      link: (basePath || '') + '/#faq',
    },
    {
      label: t('Kontaktai', 'Contacts'),
      ariaLabel: t('Susisiekite su mumis', 'Contact us'),
      link: (basePath || '') + '/#contact-form',
    },
  ];

  const switchLanguage = (targetLang: string) => {
    const currentPath = location.pathname;
    // Remove any existing language prefix
    const pathWithoutLang = currentPath.replace(/^\/(en|ru|pl)/, '');
    
    if (targetLang === 'lt') {
      window.location.href = pathWithoutLang || '/';
    } else {
      window.location.href = `/${targetLang}${pathWithoutLang}`;
    }
  };

  const socialItems = [
    {
      label: 'LT',
      link: '#lang-lt',
    },
    {
      label: 'EN',
      link: '#lang-en',
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
      />
    </div>
  );
};

export default Header;

