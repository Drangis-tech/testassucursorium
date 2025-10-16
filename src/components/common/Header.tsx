import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const basePath = language === 'en' ? '/en' : '';

  const navItems = [
    {
      to: basePath + '/',
      label: t('Pagrindinis', 'Home'),
    },
    {
      to: basePath + (language === 'en' ? '/services' : '/services'),
      label: t('Paslaugos', 'Services'),
    },
    {
      to: basePath + (language === 'en' ? '/faq' : '/duk'),
      label: t('DUK', 'FAQ'),
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={basePath + '/'} className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-baloo font-bold text-lg">
              CC
            </div>
            <div className="hidden sm:block">
              <div className="font-baloo font-bold text-lg leading-none">
                Customs Consulting
              </div>
              <div className="text-xs text-muted-foreground">
                {t('Muitinės tarpininkas', 'Customs Broker')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.to
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="ml-4"
            >
              <Globe className="h-5 w-5" />
              <Badge variant="secondary" className="ml-1 text-[10px]">
                {language.toUpperCase()}
              </Badge>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/40 py-4"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                      location.pathname === item.to
                        ? 'bg-secondary text-primary'
                        : 'text-muted-foreground hover:bg-secondary/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

