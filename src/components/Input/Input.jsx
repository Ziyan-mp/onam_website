import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Form Input Component with label & validation error states
 */
export const Input = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-xs font-bold text-[#0F5132] tracking-wide font-heading">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {LeftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-slate-500">
              <LeftIcon className="w-4 h-4 text-[#0F5132]" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-white border border-amber-200/90 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 shadow-xs',
              'focus:outline-none focus:border-[#0F5132] focus:ring-2 focus:ring-[#0F5132]/20',
              LeftIcon && 'pl-10',
              RightIcon && 'pr-10',
              error && 'border-[#8B1E3F] focus:border-[#8B1E3F] focus:ring-[#8B1E3F]/20',
              className
            )}
            {...props}
          />
          {RightIcon && (
            <div className="absolute right-3.5 text-slate-500">
              <RightIcon className="w-4 h-4" />
            </div>
          )}
        </div>
        {error ? (
          <span className="text-xs text-[#8B1E3F] font-semibold">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
