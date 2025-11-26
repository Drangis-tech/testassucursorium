import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import './ToastNotification.css';

export interface ToastNotificationProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const ToastNotification = ({ type, title, message, isVisible, onClose }: ToastNotificationProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!toastRef.current) return;

    if (isVisible) {
      // Show animation
      gsap.to(toastRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        force3D: true,
      });

      // Auto-dismiss after 5 seconds
      timeoutRef.current = window.setTimeout(() => {
        onClose();
      }, 5000);
    } else {
      // Hide animation
      gsap.to(toastRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        force3D: true,
      });
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, onClose]);

  // Initial state
  useEffect(() => {
    if (toastRef.current) {
      gsap.set(toastRef.current, {
        x: -100,
        opacity: 0,
        force3D: true,
      });
    }
  }, []);

  const isSuccess = type === 'success';
  const borderColor = isSuccess ? 'border-green-500/50' : 'border-red-500/50';
  const bgColor = isSuccess ? 'bg-green-500/10' : 'bg-red-500/10';
  const borderIconColor = isSuccess ? 'border-green-500/30' : 'border-red-500/30';
  const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';
  const titleColor = isSuccess ? 'text-green-500' : 'text-red-500';
  const ringColor = isSuccess ? 'focus:ring-green-500' : 'focus:ring-red-500';

  return (
    <div
      ref={toastRef}
      className={`toast-notification ${borderColor}`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${bgColor} border ${borderIconColor}`}>
        {isSuccess ? (
          <CheckCircle2 className={`h-6 w-6 ${iconColor}`} />
        ) : (
          <AlertCircle className={`h-6 w-6 ${iconColor}`} />
        )}
      </div>
      <div className="flex-1 pr-8">
        <h3 className={`text-base font-bold leading-none tracking-tight ${titleColor}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground pt-2 leading-relaxed">
          {message}
        </p>
      </div>
      <button 
        onClick={onClose} 
        className={`absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 ${ringColor} focus:ring-offset-2`}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
};

export default ToastNotification;




