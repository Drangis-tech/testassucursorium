import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/hooks/useLanguage';
import { ToastProvider, useToast } from '@/hooks/useToast';
import Header from '@/components/common/Header';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import TelegramButton from '@/components/common/TelegramButton';
import ViberButton from '@/components/common/ViberButton';
import ToastNotification from '@/components/common/ToastNotification';
import '@/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast, isVisible, hideToast } = useToast();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground m-0 p-0">
      <Header onMenuToggle={setIsMenuOpen} />
      <main className="m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/lt" element={<Home />} />
          <Route path="/lt/services" element={<Services />} />
          <Route path="/pl" element={<Home />} />
          <Route path="/pl/services" element={<Services />} />
          <Route path="/ru" element={<Home />} />
          <Route path="/ru/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/lt/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/pl/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/ru/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <ViberButton isMenuOpen={isMenuOpen} />
      <TelegramButton isMenuOpen={isMenuOpen} />
      <WhatsAppButton isMenuOpen={isMenuOpen} />
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          isVisible={isVisible}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <BrowserRouter>
          <LanguageProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </LanguageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
