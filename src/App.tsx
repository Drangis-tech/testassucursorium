import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { useState } from 'react';
import { LanguageProvider } from '@/hooks/useLanguage';
import Header from '@/components/common/Header';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import TelegramButton from '@/components/common/TelegramButton';
import ViberButton from '@/components/common/ViberButton';
import '@/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <BrowserRouter>
          <LanguageProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header onMenuToggle={setIsMenuOpen} />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/en" element={<Home />} />
                  <Route path="/en/services" element={<Services />} />
                </Routes>
              </main>
              <Toaster position="top-right" richColors theme="dark" />
              <ViberButton isMenuOpen={isMenuOpen} />
              <TelegramButton isMenuOpen={isMenuOpen} />
              <WhatsAppButton isMenuOpen={isMenuOpen} />
            </div>
          </LanguageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
