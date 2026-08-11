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
import { getSettings, updateSettings } from '../services/adminApi';
import { useSettings } from '../context/SettingsContext';

/**
 * Secretariat Admin Settings Component
 */
export const AdminSettings = ({ className }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState('/vite.svg');
  const { refreshSettings } = useSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      collegeName: 'PONNONAM Mega Staff Lucky Draw',
      adminName: 'Secretariat Admin Officer',
      adminEmail: 'admin@college.edu.in',
      adminPassword: '',
    },
  });

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        if (response.success && response.settings) {
          reset({
            collegeName: response.settings.eventName || '',
            adminName: 'Secretariat Admin Officer',
            adminEmail: 'admin@college.edu.in',
            adminPassword: '',
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, [reset]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      toast.success('College Logo updated!');
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    toast.loading('Saving Secretariat Portal Settings...', { id: 'settings-toast' });

    try {
      const response = await updateSettings({
        eventName: data.collegeName
      });
      if (response.success) {
        toast.success('All Settings Saved Successfully!', { id: 'settings-toast' });
        refreshSettings();
      }
    } catch (error) {
      toast.error('Failed to save settings', { id: 'settings-toast' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={cn('space-y-8 max-w-5xl mx-auto', className)}>
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading mt-1">
            System Settings
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Manage college branding, theme palette, and admin profile.
          </p>
        </div>


      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">


        {/* 1. Secretariat Admin Profile & Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 font-heading">1. Admin Profile & Credentials</h3>
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

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-2">
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
