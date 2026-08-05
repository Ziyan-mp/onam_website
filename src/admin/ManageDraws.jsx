import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Calendar,
  Coins,
  Target,
  Trophy,
  Upload,
  Save,
  Sparkles,
  Clock,
  Users,
  Play,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ProgressBar } from '../components/ProgressBar';
import { WinnerDrawModal } from './WinnerDrawModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import { cn } from '../utils/cn';
import { getDrawStatus, updateSettings } from '../services/adminApi';
import { useSettings } from '../context/SettingsContext';
import { useDraw } from '../hooks/useDraw';

/**
 * Lucky Draw Controller & Event Management Page Component
 */
export const ManageDraws = ({ className }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [adminTestingOverride, setAdminTestingOverride] = useState(false);

  const [status, setStatus] = useState({
    targetAmount: 150000,
    targetDate: new Date('2026-08-28T17:00:00+05:30').toISOString(),
    collectedAmount: 0,
    participantCount: 0
  });



  const { settings, refreshSettings } = useSettings();
  const { lastDrawTime } = useDraw();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventName: '',
      targetAmount: 150000,
      entryFee: 150,
    },
  });

  React.useEffect(() => {
    if (settings) {
      reset({
        eventName: settings.eventName,
        targetAmount: settings.targetAmount,
        entryFee: settings.entryFee,
      });
    }
  }, [settings, reset]);

  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusRes = await getDrawStatus();
        if (statusRes.success) {
          setStatus(statusRes.status);
        }
      } catch (error) {
        console.error("Failed to fetch status", error);
      }
    };
    fetchStatus();
  }, [lastDrawTime]);

  const targetAmount = status.targetAmount;
  const collectedAmount = status.collectedAmount;
  const participantCount = status.participantCount;
  const targetDateStr = status.targetDate;

  // Conditional Logic Checks
  const isTargetAchieved = collectedAmount >= targetAmount;
  const isTargetDateReached = new Date() >= new Date(targetDateStr);

  // Button disabled condition: Disabled UNTIL Target Achieved OR Target Date Reached
  const canStartDraw = isTargetAchieved || isTargetDateReached || adminTestingOverride;

  const progressPercentage = targetAmount > 0 ? Math.min(100, (collectedAmount / targetAmount) * 100) : 0;

  const onSubmit = async (data) => {
    setIsSaving(true);
    toast.loading('Saving Event Configuration...', { id: 'save-event' });

    try {
      const response = await updateSettings({
        eventName: data.eventName,
        targetAmount: status.targetAmount,
        entryFee: Number(data.entryFee)
      });
      if (response.success) {
        toast.success(`Event configuration saved!`, { id: 'save-event' });
        // Update local status with new target amount
        setStatus(prev => ({ ...prev, targetAmount: response.settings.targetAmount }));
        refreshSettings();
      }
    } catch (error) {
      toast.error('Failed to save settings', { id: 'save-event' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={cn('space-y-8 max-w-7xl mx-auto', className)}>
      {/* Winner Selection Draw Modal */}
      <WinnerDrawModal
        isOpen={isWinnerModalOpen}
        onClose={() => setIsWinnerModalOpen(false)}
      />

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading mt-1">
            Lucky Draw Controller
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Monitor target progress, target dates, and execute the live automated lucky draw.
          </p>
        </div>

      </div>

      {/* Section 2: Event Configuration Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6"
      >
        <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
          <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 font-heading">Event Parameter Configuration</h3>
            <p className="text-xs text-slate-500 font-sans">Update title, entry fee, and registration dates</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Event Name *"
            placeholder="e.g. PONNONAM Mega Staff Lucky Draw 2026"
            leftIcon={FileText}
            error={errors.eventName?.message}
            {...register('eventName', { required: 'Event Name is required' })}
          />

          <Input
            label="Entry Fee *"
            type="number"
            leftIcon={Coins}
            error={errors.entryFee?.message}
            {...register('entryFee', { required: 'Entry Fee is required' })}
          />

          <div className="pt-2">
            <Button type="submit" variant="outline" size="md" isLoading={isSaving} leftIcon={Save}>
              Save Configurations
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ManageDraws;
