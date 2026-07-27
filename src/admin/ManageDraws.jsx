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

/**
 * Lucky Draw Controller & Event Management Page Component
 */
export const ManageDraws = ({ className }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [adminTestingOverride, setAdminTestingOverride] = useState(false);

  // Event Config Values
  const targetAmount = 150000;
  const [collectedAmount, setCollectedAmount] = useState(102600);
  const participantCount = 684;
  const targetDateStr = '2026-08-28T17:00:00+05:30';

  // Conditional Logic Checks
  const isTargetAchieved = collectedAmount >= targetAmount;
  const isTargetDateReached = new Date() >= new Date(targetDateStr);

  // Button disabled condition: Disabled UNTIL Target Achieved OR Target Date Reached
  const canStartDraw = isTargetAchieved || isTargetDateReached || adminTestingOverride;

  const progressPercentage = Math.min(100, (collectedAmount / targetAmount) * 100);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventName: 'Thiruvonam Mega Staff Lucky Draw 2026',
      entryFee: 150,
      targetAmount: targetAmount,
      targetDate: '2026-08-28T17:00',
      regStart: '2026-08-01T09:00',
      regEnd: '2026-08-28T12:00',
      prizeName: '1st Bumper: 1 Sovereign Gold Coin (8g) + ₹50,000 Cash Reward',
    },
  });

  const onSubmit = (data) => {
    setIsSaving(true);
    toast.loading('Saving Event Configuration...', { id: 'save-event' });

    setTimeout(() => {
      setIsSaving(false);
      toast.success(`Event configuration saved!`, { id: 'save-event' });
    }, 1000);
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
          <span className="text-xs font-black uppercase text-[#D4A017] tracking-widest block font-heading">
            SECRETARIAT CONTROLLER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading mt-1">
            Lucky Draw Controller
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Monitor target progress, target dates, and execute the live automated lucky draw.
          </p>
        </div>

        {/* Admin Testing Override Switch */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF9F0] border border-amber-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-700 font-heading">Testing Override</span>
          <button
            type="button"
            onClick={() => {
              setAdminTestingOverride(!adminTestingOverride);
              toast.success(
                !adminTestingOverride
                  ? 'Admin Override Enabled! Start Lucky Draw button unlocked for testing.'
                  : 'Admin Override Disabled. Normal target lock restored.'
              );
            }}
            className={cn(
              'w-12 h-6 rounded-full transition-colors p-1 flex items-center',
              adminTestingOverride ? 'bg-[#0F5132] justify-end' : 'bg-slate-300 justify-start'
            )}
          >
            <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>
      </div>

      {/* Lucky Draw Controller & 5 Required Display Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4A017]/40 shadow-soft-lg space-y-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#0F5132]/10 text-[#0F5132]">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-[#D4A017] tracking-widest block font-heading">
                AUTOMATED RNG CONTROLLER
              </span>
              <h2 className="text-2xl font-black text-slate-800 font-heading">
                Thiruvonam 2026 Bumper Draw
              </h2>
            </div>
          </div>

          {/* Conditional Lock Status Pill */}
          <div className="flex items-center gap-2">
            {canStartDraw ? (
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-black uppercase tracking-wider font-heading border border-emerald-500/30 flex items-center gap-1.5">
                <Unlock className="w-4 h-4 text-[#0F5132]" /> UNLOCKED & READY
              </span>
            ) : (
              <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-800 text-xs font-black uppercase tracking-wider font-heading border border-amber-500/30 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#D4A017]" /> LOCKED UNTIL TARGET REACHED
              </span>
            )}
          </div>
        </div>

        {/* Grid of Required Display Metrics (Target Amount, Collected, Participants, Target Date) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Target Amount */}
          <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-amber-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-heading">
                TARGET AMOUNT
              </span>
              <Target className="w-4 h-4 text-[#8B1E3F]" />
            </div>
            <p className="text-2xl font-black text-slate-800 font-heading">{formatCurrency(targetAmount)}</p>
            <span className="text-[11px] text-slate-500 font-sans block">Required Collection Goal</span>
          </div>

          {/* 2. Collected */}
          <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-amber-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-heading">
                COLLECTED
              </span>
              <Coins className="w-4 h-4 text-[#0F5132]" />
            </div>
            <p className="text-2xl font-black text-[#0F5132] font-heading">{formatCurrency(collectedAmount)}</p>
            <span className="text-[11px] text-slate-500 font-sans block">From 684 Paid Tickets</span>
          </div>

          {/* 3. Participants */}
          <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-amber-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-heading">
                PARTICIPANTS
              </span>
              <Users className="w-4 h-4 text-[#D4A017]" />
            </div>
            <p className="text-2xl font-black text-slate-800 font-heading">{participantCount} Staff</p>
            <span className="text-[11px] text-slate-500 font-sans block">Verified Teachers & Staff</span>
          </div>

          {/* 4. Target Date */}
          <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-amber-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-heading">
                TARGET DATE
              </span>
              <Calendar className="w-4 h-4 text-[#0F5132]" />
            </div>
            <p className="text-base font-black text-slate-800 font-heading mt-1">{formatDate(targetDateStr)}</p>
            <span className="text-[11px] text-slate-500 font-sans block">Scheduled Thiruvonam Draw</span>
          </div>
        </div>

        {/* 5. Progress Bar Component */}
        <div className="space-y-3 p-6 rounded-2xl bg-[#FFF9F0] border border-amber-200/80">
          <ProgressBar
            progress={progressPercentage}
            label="Collection Target Goal Progress"
            valueText={`${formatCurrency(collectedAmount)} / ${formatCurrency(targetAmount)} (${progressPercentage.toFixed(1)}%)`}
          />
        </div>

        {/* Start Lucky Draw Button & Conditional Lock Explanation */}
        <div className="space-y-4 pt-2">
          {/* Main Action Button */}
          <Button
            variant="primary"
            size="lg"
            isDisabled={!canStartDraw}
            leftIcon={Play}
            onClick={() => setIsWinnerModalOpen(true)}
            className="w-full py-5 text-lg font-black tracking-wide shadow-lg shadow-[#0F5132]/25 font-heading"
          >
            Start Lucky Draw
          </Button>

          {/* Disabled Condition Explanation Note */}
          {!canStartDraw && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 font-sans flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
              <div>
                <strong className="font-heading font-bold block">Start Lucky Draw Button Locked:</strong>
                <span>
                  The draw button remains disabled until <strong>Target Amount ({formatCurrency(targetAmount)})</strong> is collected
                  OR <strong>Target Date ({formatDate(targetDateStr)})</strong> is reached. Use the "Testing Override" switch at the top right to test the spin wheel.
                </span>
              </div>
            </div>
          )}

          {canStartDraw && adminTestingOverride && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-900 font-sans flex items-start gap-3">
              <Unlock className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
              <div>
                <strong className="font-heading font-bold block">Admin Override Active:</strong>
                <span>Button is temporarily unlocked for admin testing mode. Click to test the spin wheel.</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

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
            placeholder="e.g. Thiruvonam Mega Staff Lucky Draw 2026"
            leftIcon={FileText}
            error={errors.eventName?.message}
            {...register('eventName', { required: 'Event Name is required' })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#0F5132] tracking-wide font-heading">
                Entry Fee (Fixed)
              </label>
              <input
                type="text"
                value="150"
                readOnly
                className="w-full bg-[#FFF9F0] border border-[#D4A017]/50 rounded-2xl px-4 py-3 text-sm font-black text-[#0F5132] font-heading cursor-not-allowed"
              />
            </div>

            <Input
              label="Target Amount (Goal) *"
              type="number"
              leftIcon={Target}
              error={errors.targetAmount?.message}
              {...register('targetAmount', { required: 'Target Amount is required' })}
            />
          </div>

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
