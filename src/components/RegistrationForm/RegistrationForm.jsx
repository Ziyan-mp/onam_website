import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Building2, IdCard, Phone, Mail, CreditCard, ShieldCheck, Ticket, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../Button';
import { Input } from '../Input';
import { PaymentProcessing } from '../PaymentProcessing';
import { Ticket as TicketCard } from '../Ticket';
import { Modal } from '../Modal';
import { formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Professional Registration & Checkout Form Component
 */
export const RegistrationForm = ({ className }) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [issuedTicket, setIssuedTicket] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      department: '',
      employeeId: '',
      phone: '',
      email: '',
      amount: 150,
    },
  });

  const onSubmit = (data) => {
    // Show non-interactive Payment Processing modal overlay
    setIssuedTicket({
      ticketNumber: Math.floor(1000 + Math.random() * 9000).toString(),
      participantName: data.fullName,
      purchaseDate: new Date().toISOString(),
      price: 150,
      status: 'VALID',
    });
    setIsProcessingPayment(true);
  };

  const handlePaymentComplete = () => {
    setIsProcessingPayment(false);
    setShowSuccessModal(true);
    toast.success('Payment Received! Your digital ticket has been issued.');
    reset();
  };

  return (
    <section id="register" className={cn('py-16 md:py-24 relative bg-[#FFF9F0] overflow-hidden', className)}>
      {/* Full-Screen Non-Interactive Payment Processing Modal */}
      <PaymentProcessing
        isOpen={isProcessingPayment}
        amount={150}
        onComplete={handlePaymentComplete}
      />

      {/* Ticket Success Confirmation Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Ticket Registration Successful!"
        subtitle="Save or screenshot your digital ticket QR code below."
      >
        {issuedTicket && (
          <div className="space-y-6 pt-2">
            <TicketCard
              ticketNumber={issuedTicket.ticketNumber}
              participantName={issuedTicket.participantName}
              purchaseDate={issuedTicket.purchaseDate}
              price={issuedTicket.price}
              status={issuedTicket.status}
            />
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center font-heading"
              onClick={() => setShowSuccessModal(false)}
            >
              Done & Return to Event
            </Button>
          </div>
        )}
      </Modal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D4A017] animate-spin" />
            <span>STAFF TICKET REGISTRATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading">
            Onam Lucky Draw Registration
          </h2>

          <p className="text-slate-600 text-sm font-sans">
            Fill in your staff details below to purchase your official ₹150 entry ticket for the Thiruvonam 2026 Bumper Draw.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: React Hook Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/90 shadow-soft space-y-6"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-800 font-heading">Participant Details</h3>
                <p className="text-xs text-slate-500 font-sans">Teachers & Non-Teaching Staff Only</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-xs font-black uppercase tracking-wider font-heading border border-[#0F5132]/20">
                OFFICIAL ENTRY
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <Input
                label="Full Name *"
                placeholder="e.g. Prof. Ananthakrishnan Nair"
                leftIcon={User}
                error={errors.fullName?.message}
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                })}
              />

              {/* Grid 2-cols: Department & Employee ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Department */}
                <Input
                  label="Department *"
                  placeholder="e.g. Computer Science / Admin"
                  leftIcon={Building2}
                  error={errors.department?.message}
                  {...register('department', {
                    required: 'Department is required',
                  })}
                />

                {/* Employee ID */}
                <Input
                  label="Employee ID *"
                  placeholder="e.g. EMP-9842"
                  leftIcon={IdCard}
                  error={errors.employeeId?.message}
                  {...register('employeeId', {
                    required: 'Employee ID is required',
                    pattern: {
                      value: /^[a-zA-Z0-9\s-]+$/,
                      message: 'Enter valid Employee ID',
                    },
                  })}
                />
              </div>

              {/* Grid 2-cols: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <Input
                  label="Phone Number *"
                  placeholder="e.g. 9876543210"
                  type="tel"
                  leftIcon={Phone}
                  helperText="SMS ticket code will be sent to this number"
                  error={errors.phone?.message}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Enter valid 10-digit Indian phone number',
                    },
                  })}
                />

                {/* Email */}
                <Input
                  label="Email Address *"
                  placeholder="e.g. staff@college.edu.in"
                  type="email"
                  leftIcon={Mail}
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter valid email address',
                    },
                  })}
                />
              </div>

              {/* Amount (Readonly) */}
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0F5132] tracking-wide font-heading">
                  Ticket Registration Amount (Fixed)
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-[#0F5132] font-black font-heading text-sm">₹</div>
                  <input
                    type="text"
                    value="150"
                    readOnly
                    className="w-full bg-[#FFF9F0] border border-[#D4A017]/50 rounded-2xl px-4 py-3 pl-8 text-sm font-black text-[#0F5132] font-heading cursor-not-allowed shadow-xs focus:outline-none"
                  />
                  <span className="absolute right-3.5 px-2.5 py-1 rounded-lg bg-[#0F5132] text-white text-[10px] font-bold uppercase tracking-wider font-heading">
                    READONLY
                  </span>
                </div>
              </div>

              {/* Large Submit CTA Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  leftIcon={CreditCard}
                  className="w-full py-4 text-base font-black tracking-wide shadow-md shadow-[#0F5132]/20"
                >
                  Proceed to Razorpay (Pay ₹150)
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Payment Summary & Security Guarantee Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Payment Summary Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4A017]/40 shadow-soft-lg space-y-6">
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#D4A017]/15 text-[#0F5132]">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 font-heading">Order Summary</h4>
                </div>
                <span className="text-xs font-bold text-[#0F5132] bg-[#0F5132]/10 px-3 py-1 rounded-full border border-[#0F5132]/20 font-heading">
                  1 TICKET
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between text-slate-600">
                  <span>Lucky Draw Entry Ticket</span>
                  <span className="font-semibold text-slate-800">₹150.00</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Gateway Processing Fee</span>
                  <span className="font-bold text-[#0F5132]">FREE (₹0.00)</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>GST & Tax</span>
                  <span className="font-bold text-[#0F5132]">INCLUDED</span>
                </div>

                <div className="pt-3 border-t border-amber-200/80 flex justify-between items-baseline">
                  <span className="text-base font-black text-slate-800 font-heading">Total Amount Payable</span>
                  <span className="text-3xl font-black text-[#0F5132] font-heading">{formatCurrency(150)}</span>
                </div>
              </div>

              {/* Security Shield Badges */}
              <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-200/80 space-y-3 text-xs text-slate-600 font-sans">
                <div className="flex items-center gap-2 text-[#0F5132] font-bold font-heading">
                  <Lock className="w-4 h-4 text-[#D4A017]" />
                  <span>Razorpay 256-Bit SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-[#0F5132] font-bold font-heading">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  <span>Verified Staff Eligibility Check</span>
                </div>
                <div className="flex items-center gap-2 text-[#0F5132] font-bold font-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A017]" />
                  <span>Instant SMS & Email Ticket Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
