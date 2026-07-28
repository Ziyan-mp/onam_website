import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Upload, 
  Palette, 
  User, 
  Key, 
  Save, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { cn } from '../utils/cn';

/**
 * Secretariat Admin Settings Component
 */
export const AdminSettings = ({ className }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState('/vite.svg');
  const [showKeySecret, setShowKeySecret] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      collegeName: 'DEPARTMENT OF EC',
      themePreset: 'kasavu-gold-emerald',
      razorpayKeyId: 'rzp_live_98420ONAM2026',
      razorpayKeySecret: 'w89420onamsecretkey2026',
      razorpayMode: 'LIVE',
      adminName: 'Secretariat Admin Officer',
      adminEmail: 'admin@college.edu.in',
      adminPassword: '',
    },
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      toast.success('College Logo updated!');
    }
  };

  const onSubmit = (data) => {
    setIsSaving(true);
    toast.loading('Saving Secretariat Portal Settings...', { id: 'settings-toast' });

    setTimeout(() => {
      setIsSaving(false);
      toast.success('All Settings & Razorpay API Keys Saved Successfully!', { id: 'settings-toast' });
    }, 1200);
  };

  return (
    <div className={cn('space-y-8 max-w-5xl mx-auto', className)}>
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-soft">
        <div>
          <span className="text-xs font-black uppercase text-[#D4A017] tracking-widest block font-heading">
            SECRETARIAT CONTROLLER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading mt-1">
            System Settings
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Manage college branding, theme palette, Razorpay API credentials, and admin profile.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-xs font-extrabold uppercase font-heading border border-[#0F5132]/20 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#D4A017]" /> 256-BIT ENCRYPTED
        </span>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. College Institution Branding & Logo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 font-heading">1. Institution Branding & Logo</h3>
              <p className="text-xs text-slate-500 font-sans">College name & official crest logo badge</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* College Name */}
            <Input
              label="College Institution Name *"
              placeholder="e.g. DEPARTMENT OF EC"
              leftIcon={Building2}
              error={errors.collegeName?.message}
              {...register('collegeName', { required: 'College Name is required' })}
            />

            {/* Logo Upload Box */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-xs font-bold text-[#0F5132] tracking-wide font-heading">
                College Crest Logo Badge
              </label>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 rounded-2xl bg-[#FFF9F0] border-2 border-dashed border-[#D4A017]/50">
                <div className="md:col-span-3 w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#D4A017]/40 bg-white p-2 flex items-center justify-center shadow-xs mx-auto md:mx-0">
                  <img src={logoPreview} alt="College Logo Preview" className="w-full h-full object-contain" />
                </div>

                <div className="md:col-span-9 space-y-2 text-center md:text-left">
                  <label className="cursor-pointer inline-block">
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F5132] text-white text-xs font-bold font-heading hover:bg-[#167448] transition-colors shadow-xs">
                      <Upload className="w-4 h-4" /> Upload New Logo
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Recommended dimensions: 200x200px PNG or SVG with transparent background.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Theme Customization */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="p-2.5 rounded-xl bg-[#D4A017]/15 text-[#0F5132]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 font-heading">2. Festival Theme Aesthetic</h3>
              <p className="text-xs text-slate-500 font-sans">Color tokens & Kasavu Gold preset configuration</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="p-4 rounded-2xl border-2 border-[#D4A017] bg-[#FFF9F0] flex items-start gap-3 cursor-pointer">
              <input type="radio" value="kasavu-gold-emerald" defaultChecked className="mt-1 text-[#0F5132]" {...register('themePreset')} />
              <div>
                <span className="text-xs font-bold text-slate-800 font-heading block">Kasavu Gold & Emerald</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Primary #0F5132 • Secondary #D4A017</span>
              </div>
            </label>

            <label className="p-4 rounded-2xl border border-amber-200 bg-white flex items-start gap-3 cursor-pointer hover:border-[#D4A017]">
              <input type="radio" value="royal-maroon-gold" className="mt-1 text-[#8B1E3F]" {...register('themePreset')} />
              <div>
                <span className="text-xs font-bold text-slate-800 font-heading block">Royal Maroon & Gold</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Primary #8B1E3F • Secondary #D4A017</span>
              </div>
            </label>

            <label className="p-4 rounded-2xl border border-amber-200 bg-white flex items-start gap-3 cursor-pointer hover:border-[#D4A017]">
              <input type="radio" value="midnight-luxury" className="mt-1 text-slate-900" {...register('themePreset')} />
              <div>
                <span className="text-xs font-bold text-slate-800 font-heading block">Midnight Velvet</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Primary #0F172A • Secondary #F59E0B</span>
              </div>
            </label>
          </div>
        </motion.div>

        {/* 3. Razorpay Payment Gateway Credentials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 font-heading">3. Razorpay API Gateway Credentials</h3>
                <p className="text-xs text-slate-500 font-sans">Payment API keys for ₹150 ticket checkout</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-xs font-black uppercase tracking-wider font-heading border border-[#0F5132]/20">
              RAZORPAY V1 API
            </span>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Razorpay Key ID */}
              <Input
                label="Razorpay Key ID *"
                placeholder="e.g. rzp_live_98420ONAM2026"
                leftIcon={Key}
                error={errors.razorpayKeyId?.message}
                {...register('razorpayKeyId', { required: 'Razorpay Key ID is required' })}
              />

              {/* Razorpay Key Secret */}
              <div className="relative">
                <Input
                  label="Razorpay Key Secret *"
                  placeholder="••••••••••••••••"
                  type={showKeySecret ? 'text' : 'password'}
                  leftIcon={Key}
                  error={errors.razorpayKeySecret?.message}
                  {...register('razorpayKeySecret', { required: 'Razorpay Key Secret is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowKeySecret(!showKeySecret)}
                  className="absolute right-3.5 top-[38px] text-slate-400 hover:text-[#0F5132] p-1"
                >
                  {showKeySecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Gateway Mode Selector */}
            <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 font-heading block">Gateway Mode</span>
                <span className="text-[11px] text-slate-500 font-sans">Switch between Live Merchant Production and Test Sandbox</span>
              </div>
              <select
                {...register('razorpayMode')}
                className="bg-white border border-amber-300 rounded-xl px-4 py-2 text-xs font-black text-[#0F5132] font-heading focus:outline-none"
              >
                <option value="LIVE">LIVE Production Mode</option>
                <option value="TEST">TEST Sandbox Mode</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* 4. Secretariat Admin Profile & Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 font-heading">4. Admin Profile & Credentials</h3>
              <p className="text-xs text-slate-500 font-sans">Account profile & password update</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Admin Officer Name *"
              placeholder="e.g. Secretariat Admin Officer"
              leftIcon={User}
              {...register('adminName', { required: 'Admin Name is required' })}
            />

            <Input
              label="Admin Email *"
              type="email"
              placeholder="admin@college.edu.in"
              leftIcon={Mail}
              {...register('adminEmail', { required: 'Admin Email is required' })}
            />

            <Input
              label="New Password (Optional)"
              type="password"
              placeholder="Leave blank to keep current"
              leftIcon={Lock}
              {...register('adminPassword')}
            />
          </div>
        </motion.div>

        {/* Large Save Settings CTA Button */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={Save}
            className="w-full py-4 text-base font-black tracking-wide shadow-md shadow-[#0F5132]/20 font-heading"
          >
            Save All Settings
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default AdminSettings;
