import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

/**
 * Reusable Elegant Toast Notification Card Component
 */
export const Toast = ({
  type = 'info',
  title,
  message,
  visible = true,
  onDismiss,
  className,
}) => {
  const typeConfig = {
    success: {
      icon: CheckCircle2,
      bg: 'bg-white',
      border: 'border-2 border-[#0F5132]/40',
      iconBg: 'bg-[#0F5132]/10 text-[#0F5132]',
      titleColor: 'text-[#0F5132]',
      accentBar: 'bg-[#0F5132]',
      defaultTitle: 'Success!',
    },
    error: {
      icon: XCircle,
      bg: 'bg-white',
      border: 'border-2 border-red-500/40',
      iconBg: 'bg-red-500/10 text-red-600',
      titleColor: 'text-red-600',
      accentBar: 'bg-red-500',
      defaultTitle: 'Error Occurred',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-white',
      border: 'border-2 border-[#D4A017]',
      iconBg: 'bg-[#D4A017]/20 text-[#0F5132]',
      titleColor: 'text-[#0F5132]',
      accentBar: 'bg-[#D4A017]',
      defaultTitle: 'Warning',
    },
    info: {
      icon: Info,
      bg: 'bg-white',
      border: 'border-2 border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-600',
      titleColor: 'text-blue-700',
      accentBar: 'bg-blue-500',
      defaultTitle: 'Information',
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComp = config.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={cn(
            'max-w-md w-full rounded-2xl p-4 shadow-soft-lg flex items-start gap-3.5 relative overflow-hidden text-slate-800 font-sans pointer-events-auto select-none',
            config.bg,
            config.border,
            className
          )}
        >
          {/* Left Accent Bar */}
          <div className={cn('absolute top-0 bottom-0 left-0 w-1.5', config.accentBar)} />

          {/* Type Icon Badge */}
          <div className={cn('p-2 rounded-xl shrink-0 mt-0.5', config.iconBg)}>
            <IconComp className="w-5 h-5" />
          </div>

          {/* Toast Message Content */}
          <div className="flex-1 min-w-0 pr-4">
            <h4 className={cn('text-xs font-black uppercase tracking-wider font-heading', config.titleColor)}>
              {title || config.defaultTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium mt-0.5">
              {message}
            </p>
          </div>

          {/* Dismiss Close Button */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Reusable Helper Toast Functions Powered by React Hot Toast & Framer Motion
 */
export const notify = {
  success: (message, title = 'Success!') => {
    return toast.custom((t) => (
      <Toast
        type="success"
        title={title}
        message={message}
        visible={t.visible}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ));
  },
  error: (message, title = 'Error!') => {
    return toast.custom((t) => (
      <Toast
        type="error"
        title={title}
        message={message}
        visible={t.visible}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ));
  },
  warning: (message, title = 'Attention') => {
    return toast.custom((t) => (
      <Toast
        type="warning"
        title={title}
        message={message}
        visible={t.visible}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ));
  },
  info: (message, title = 'Notice') => {
    return toast.custom((t) => (
      <Toast
        type="info"
        title={title}
        message={message}
        visible={t.visible}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ));
  },
};

export default notify;
