import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff, ShieldCheck, Sparkles, LogIn, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { cn } from '../utils/cn';
import { adminLogin } from '../services/adminApi';
import { AuthContext } from '../context/AuthContext';

/**
 * Elegant Centered Admin Login Page Component
 */
export const AdminLogin = ({ className }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Authenticating Secretariat Admin credentials...');

    try {
      const response = await adminLogin({
        username: data.username,
        password: data.password
      });

      if (response.success) {
        toast.success('Admin Authentication Successful! Welcome to Dashboard.', { id: toastId });
        login(response.user, response.token);
        navigate('/admin');
      } else {
        toast.error(response.message || 'Authentication failed', { id: toastId });
      }
    } catch (error) {
      toast.error(error.message || 'Invalid admin credentials', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('min-h-screen bg-[#FFF9F0] flex flex-col justify-between py-12 px-4 sm:px-6 relative overflow-hidden select-none', className)}>
      {/* Background Decorative Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#0F5132]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#D4A017]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Back Navigation Link */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0F5132] hover:text-amber-600 transition-colors font-heading"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Public Portal
        </a>
      </div>

      {/* Main Centered Modern Card */}
      <div className="max-w-md w-full mx-auto relative z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-[2.5rem] p-8 sm:p-10 border-2 border-[#D4A017]/40 shadow-soft-lg space-y-7 relative overflow-hidden"
        >
          {/* Top Kasavu Ribbon Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F5132] via-[#D4A017] to-[#8B1E3F]" />

          {/* Header & Emblem */}
          <div className="text-center space-y-3 pt-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#0F5132] text-[#D4A017] border-2 border-[#D4A017] shadow-md mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-black uppercase text-[#D4A017] tracking-widest block font-heading">
                SECRETARIAT PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] tracking-tight font-heading mt-1">
                Admin Portal Login
              </h1>
              <p className="text-xs text-slate-500 font-sans mt-1">
                Enter your Secretariat credentials to access the Onam Lucky Draw controller dashboard.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username Input */}
            <Input
              label="Username / Admin ID *"
              placeholder="e.g. admin"
              leftIcon={User}
              error={errors.username?.message}
              {...register('username', {
                required: 'Username is required',
              })}
            />

            {/* Password Input with Show/Hide Toggle */}
            <div className="relative">
              <Input
                label="Password *"
                placeholder="••••••••••••"
                type={showPassword ? 'text' : 'password'}
                leftIcon={Lock}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 4, message: 'Password must be at least 4 characters' },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[38px] text-slate-400 hover:text-[#0F5132] transition-colors p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs font-sans pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                <input
                  type="checkbox"
                  className="rounded border-amber-300 text-[#0F5132] focus:ring-[#0F5132] w-4 h-4 cursor-pointer"
                  {...register('rememberMe')}
                />
                <span className="font-medium">Remember Me</span>
              </label>

              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  toast.error('Contact Secretariat IT Desk (8157956164) to reset password.');
                }}
                className="font-bold text-[#0F5132] hover:text-amber-600 transition-colors font-heading"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                leftIcon={LogIn}
                className="w-full py-3.5 text-sm font-black tracking-wide shadow-md shadow-[#0F5132]/20"
              >
                Sign In to Dashboard
              </Button>
            </div>
          </form>

          {/* Footer Security Note */}
          <div className="pt-4 border-t border-amber-100 text-center text-[11px] text-slate-500 font-sans">
            <span className="flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" /> 256-Bit Encrypted Admin Session
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Copyright Footer */}
      <div className="text-center text-xs text-slate-500 font-sans relative z-10">
        <p>© 2026 Onam Lucky Draw Secretariat. Official Admin System.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
