import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional class names with Tailwind CSS class merge optimization.
 * @param  {...any} inputs - Class names, objects, or arrays
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
