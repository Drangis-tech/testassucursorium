'use client';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface FlowButtonProps {
  text?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline';
  className?: string;
}

export function FlowButton({ 
  text, 
  children, 
  href, 
  onClick,
  variant = 'default',
  className = ''
}: FlowButtonProps) {
  const content = children || text || "Modern Button";
  
  const baseClasses = "group relative inline-flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-8 py-3 text-sm font-baloo font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95]";
  
  const variantClasses = variant === 'outline'
    ? "border-zinc-700 bg-transparent text-gray-300 hover:bg-zinc-800"
    : "border-[#9d7c3d]/40 bg-transparent text-white";
  
  const circleColor = variant === 'outline' ? 'bg-zinc-800' : 'bg-gradient-to-br from-[#9d7c3d] to-[#c4a55e]';

  const Component = href ? 'a' : 'button';

  return (
    <Component 
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className="absolute w-4 h-4 left-[-25%] stroke-current fill-none z-[9] group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {content}
      </span>

      {/* Circle */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${circleColor} rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className="absolute w-4 h-4 right-4 stroke-current fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />
    </Component>
  );
}
