/**
 * Utility formatters for Onam Lucky Draw 2026 application
 */

/**
 * Format currency in Indian Rupees (INR)
 * @param {number} amount 
 * @returns {string} e.g. ₹50,00,000
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format ticket code to standard display style (e.g. ONAM-2026-8942)
 * @param {string|number} id 
 * @returns {string}
 */
export function formatTicketId(id) {
  if (!id) return 'ONAM-2026-0000';
  const strId = String(id).padStart(4, '0');
  return `ONAM-2026-${strId}`;
}

/**
 * Format readable date
 * @param {string|Date} date 
 * @returns {string} e.g. 28 Aug 2026, 05:00 PM
 */
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}

/**
 * Mask phone number for privacy
 * @param {string} phone 
 * @returns {string} e.g. +91 98****3210
 */
export function maskPhoneNumber(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) return phone;
  const last4 = cleaned.slice(-4);
  const prefix = cleaned.slice(0, cleaned.length - 8);
  return `${prefix ? '+' + prefix + ' ' : ''}*****${last4}`;
}
