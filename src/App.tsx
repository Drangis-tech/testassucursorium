import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/hooks/useLanguage';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import FAQ from '@/pages/FAQ';
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
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <BrowserRouter>
          <LanguageProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/duk" element={<FAQ />} />
                  <Route path="/en" element={<Home />} />
                  <Route path="/en/services" element={<Services />} />
                  <Route path="/en/faq" element={<FAQ />} />
                </Routes>
              </main>
              <Footer />
              <Toaster position="top-right" richColors theme="dark" />
            </div>
          </LanguageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
