import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Accessible Accordion FAQ Item Component
 */
const FAQItem = ({ question, answer, isOpen, onToggle, id }) => {
  const contentId = `faq-content-${id}`;
  const headerId = `faq-header-${id}`;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-200/90 shadow-soft overflow-hidden transition-all duration-300">
      <button
        id={headerId}
        type="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-black text-slate-800 hover:text-[#0F5132] focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:ring-offset-2 focus:ring-offset-[#FFF9F0] rounded-3xl cursor-pointer"
      >
        <span className="text-base sm:text-lg flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-[#D4A017] shrink-0" aria-hidden="true" />
          <span>{question}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-2 rounded-2xl bg-[#FFF9F0] text-[#0F5132] border border-amber-200/80 shrink-0"
        >
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 text-sm text-slate-600 font-sans leading-relaxed border-t border-amber-100/60 mt-1">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * FAQ Accordion Section Component
 */
export const FAQ = ({ className }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Who can participate in the Onam Lucky Draw 2026?',
      answer:
        'Participation is strictly reserved for official Teachers, Professors, Administrative Staff, and Non-Teaching Employees of the College. Students and external public members are not eligible for ticket booking.',
    },
    {
      question: 'Is the ₹150 ticket payment refundable?',
      answer:
        'All ticket purchases made via Razorpay are final and non-refundable. The ₹150 entry fee goes directly into funding the staff bumper prize pool and festival event activities.',
    },
    {
      question: 'How is the winner selected for the grand bumper draw?',
      answer:
        'Winners are chosen through a 100% transparent, certified Random Number Generator (RNG) live draw algorithm. The live draw process takes place during the college Thiruvonam celebration in the presence of staff representatives.',
    },
    {
      question: 'How do I receive my digital ticket and payment receipt?',
      answer:
        'Upon successful Razorpay payment, your unique digital boarding pass ticket with QR code and Barcode is generated instantly. You can download the PDF ticket, view it on your screen, or print it out at any time.',
    },
    {
      question: 'Can I participate multiple times by purchasing more than 1 ticket?',
      answer:
        'Yes! Staff members can purchase multiple ₹150 tickets to increase their chances of winning. Each ticket carries a unique ticket number registered under your Employee ID.',
    },
  ];

  return (
    <div className={cn('space-y-4 max-w-3xl mx-auto', className)} role="region" aria-label="Frequently Asked Questions">
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.question}
          id={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
};

export default FAQ;
