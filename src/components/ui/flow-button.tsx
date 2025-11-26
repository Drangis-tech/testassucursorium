'use client';
import { CaretRight } from '@phosphor-icons/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '@/utils/scrollToSection';

interface FlowButtonProps {
  text?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'large';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function FlowButton({ 
  text, 
  children, 
  href, 
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  type = 'button',
  disabled = false
}: FlowButtonProps) {
  const location = useLocation();
  const content = children || text || "Modern Button";
  
  const sizeClasses = size === 'large'
    ? "px-16 py-5 text-lg md:text-xl rounded-[60px] hover:rounded-3xl [&_svg]:w-6 [&_svg]:h-6 md:[&_svg]:w-7 md:[&_svg]:h-7"
    : "px-8 py-3 text-sm rounded-[100px] hover:rounded-[12px]";
  
  const baseClasses = "group relative inline-flex items-center gap-1 overflow-hidden border-[1.5px] font-baloo font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white active:scale-[0.95]";
  
  const variantClasses = variant === 'outline'
    ? "border-zinc-700 bg-transparent text-gray-300 hover:bg-zinc-800"
    : "border-[#F2CA50]/40 bg-transparent text-white";
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed hover:border-[#F2CA50]/40 hover:rounded-[100px] active:scale-100" 
    : "";
  
  const circleColor = variant === 'outline' ? 'bg-zinc-800' : 'bg-gradient-to-br from-[#F2CA50] to-[#F2CA50]';

  // Determine if href is internal (starts with /) or external/hash link
  const isHashLink = href && (href.startsWith('#') || href.includes('#'));
  const isExternalLink = href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('tel:') || href.startsWith('mailto:'));
  // Treat internal path links (even with hashes) as internal for SPA navigation
  const isInternal = href && href.startsWith('/') && !isExternalLink;
  
  // Use Link for internal routes, 'a' for external, 'button' for no href
  let Component: any = 'button';
  let componentProps: any = {
    ...(onClick && { onClick }),
    ...(!href && { type }),
    ...(disabled && { disabled }),
    className: `${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`,
  };

  if (href) {
    if (isInternal) {
      Component = Link;
      componentProps = {
        ...componentProps,
        to: href,
        ...(isHashLink && {
          onClick: (e: React.MouseEvent) => {
            const [pathPart, hashPart] = href.split('#');
            // Check if we are on the same page (ignoring trailing slashes)
            const currentPath = location.pathname.endsWith('/') && location.pathname.length > 1 
              ? location.pathname.slice(0, -1) 
              : location.pathname;
            const targetPath = pathPart.endsWith('/') && pathPart.length > 1
              ? pathPart.slice(0, -1)
              : pathPart;
              
            const isSamePage = targetPath === currentPath;

            if (isSamePage) {
              e.preventDefault();
              if (hashPart) {
                // Update URL
                window.history.pushState({}, '', href);
                // Scroll to section with reduced offset
                scrollToSection(hashPart, 50);
              }
            }
            // If not same page, Link handles navigation
            if (onClick) onClick();
          }
        })
      };
    } else {
      Component = 'a';
      componentProps = {
        ...componentProps,
        href,
        ...(isHashLink && {
          onClick: (e: React.MouseEvent) => {
            // For pure hash links (href="#something") or external hash links
            if (href.startsWith('#')) {
              e.preventDefault();
              const hash = href.substring(1);
              if (hash) {
                window.history.pushState({}, '', href);
                scrollToSection(hash, 50);
              }
              if (onClick) onClick();
            }
            // For external links with hash, let browser handle it
          }
        })
      };
    }
  }

  const arrowSize = size === 'large' ? "w-5 h-5 md:w-6 md:h-6" : "w-4 h-4";
  
  return (
    <Component {...componentProps}>
      {/* Left arrow (arr-2) */}
      <CaretRight 
        className={`absolute ${arrowSize} left-[-25%] z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
        weight="bold"
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {content}
      </span>

      {/* Circle */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${circleColor} rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}></span>

      {/* Right arrow (arr-1) */}
      <CaretRight 
        className={`absolute ${arrowSize} right-4 z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
        weight="bold"
      />
    </Component>
  );
}

