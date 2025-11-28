import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

export const SEO = ({ title, description, image, article }: SEOProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  const siteUrl = 'https://customsconsulting.eu';
  const defaultTitle = 'Customs Consulting - Muitinės Tarpininkas';
  const defaultDescription = 'UAB Customs Consulting - Patikimas muitinės tarpininkas. Profesionalios muitinės paslaugos Lietuvoje.';
  const defaultImage = `${siteUrl}/logo.svg`;

  const fullTitle = title ? `${title} | Customs Consulting` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const currentPath = location.pathname;

  // Helper to update or create meta tag
  const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Helper to update or create link tag
  const updateLink = (rel: string, href: string, hreflang?: string) => {
    let selector = `link[rel="${rel}"]`;
    if (hreflang) selector += `[hreflang="${hreflang}"]`;
    
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      if (hreflang) element.setAttribute('hreflang', hreflang);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  // Clean path for hreflangs
  const getCleanPath = (path: string) => {
    if (path === '/' || path === '/lt' || path === '/pl' || path === '/ru') return '/';
    const clean = path.replace(/^\/(lt|pl|ru)/, '');
    return clean || '/';
  };

  useEffect(() => {
    // Update Title
    document.title = fullTitle;
    
    // Update HTML Lang
    document.documentElement.lang = language;

    // Update Meta Tags
    updateMeta('description', metaDescription);
    
    // Open Graph
    updateMeta('og:url', `${siteUrl}${currentPath}`, 'property');
    updateMeta('og:type', article ? 'article' : 'website', 'property');
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', metaDescription, 'property');
    updateMeta('og:image', metaImage, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', metaDescription);
    updateMeta('twitter:image', metaImage);

    // Canonical
    updateLink('canonical', `${siteUrl}${currentPath === '/' ? '' : currentPath}`);

    // Hreflangs
    const cleanPath = getCleanPath(currentPath);
    const getUrlForLang = (lang: string) => {
      if (lang === 'en') return `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`;
      return `${siteUrl}/${lang}${cleanPath === '/' ? '' : cleanPath}`;
    };

    updateLink('alternate', getUrlForLang('lt'), 'lt');
    updateLink('alternate', getUrlForLang('en'), 'en');
    updateLink('alternate', getUrlForLang('pl'), 'pl');
    updateLink('alternate', getUrlForLang('ru'), 'ru');
    updateLink('alternate', getUrlForLang('en'), 'x-default');

  }, [fullTitle, metaDescription, metaImage, currentPath, language, article, siteUrl]);

  return null;
};
