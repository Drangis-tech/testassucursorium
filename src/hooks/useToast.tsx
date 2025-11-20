import { createContext, useContext, useState, ReactNode } from 'react';

interface ToastData {
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface ToastContextType {
  showToast: (data: ToastData) => void;
  hideToast: () => void;
  toast: ToastData | null;
  isVisible: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (data: ToastData) => {
    setToast(data);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
    // Keep data for animation, clear after animation completes
    setTimeout(() => setToast(null), 500);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast, isVisible }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};


