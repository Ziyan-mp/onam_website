import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Reusable Accessible Button Component
 */
export const Button = React.forwardRef(({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ariaLabel,
  onClick,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold font-heading rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:ring-offset-2 focus:ring-offset-[#FFF9F0] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-[#0F5132] text-white hover:bg-[#0A3722] shadow-soft hover:shadow-soft-lg border border-[#0F5132]',
    secondary: 'bg-[#D4A017] text-[#0F5132] hover:bg-[#E5B83B] shadow-soft font-black border border-[#D4A017]',
    accent: 'bg-[#8B1E3F] text-white hover:bg-[#63122B] shadow-soft border border-[#8B1E3F]',
    outline: 'bg-transparent text-[#0F5132] border-2 border-[#0F5132] hover:bg-[#0F5132] hover:text-white',
    ghost: 'bg-transparent text-[#0F5132] hover:bg-[#0F5132]/10',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-soft',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-7 py-3.5 gap-2.5 min-h-[50px]',
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      onClick={onClick}
      whileHover={{ y: isDisabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: isDisabled || isLoading ? 1 : 0.97 }}
      className={cn(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
          <span>{children}</span>
          {RightIcon && <RightIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
