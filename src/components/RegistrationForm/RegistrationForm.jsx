import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  User,
  Building2,
  Phone,
  Mail,
  CreditCard,
  Sparkles,
  Hash,
  ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '../Button';
import { Input } from '../Input';
import { PaymentProcessing } from '../PaymentProcessing';
import { Ticket as TicketCard } from '../Ticket';
import { Modal } from '../Modal';
import { cn } from '../../utils/cn';
import { useSettings } from '../../context/SettingsContext';
import { submitRegistration } from '../../services/registrationService';

export const RegistrationForm = ({ className }) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [issuedTicket, setIssuedTicket] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentQR, setShowPaymentQR] = useState(false);

  const { settings } = useSettings();

  const entryFee = settings?.entryFee || 150;

  /*
   * UPI URI encoded inside the QR code.
   *
   * When scanned, Google Pay / another UPI app
   * will open with the receiver and amount.
   */
  const upiUrl =
    `upi://pay?pa=aswandharj@okaxis&pn=ASWANDHA%20R.%20J&am=${entryFee}&cu=INR`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      department: '',
      phone: '',
      email: '',
      transactionId: '',
      amount: entryFee,
    },
  });

  /**
   * Submit registration AFTER payment.
   */
  const onSubmit = async (data) => {
    if (!data.transactionId || data.transactionId.trim() === '') {
      toast.error('Please enter the Transaction ID from Google Pay.');
      return;
    }

    try {
      setIsProcessingPayment(true);

      const payload = {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        department: data.department,
        transactionId: data.transactionId.trim(),
        amount: entryFee,
      };

      const result = await submitRegistration(payload);

      if (result.success) {
        setIssuedTicket(result.ticket);
        toast.success('Payment verified successfully.');
      } else {
        toast.error(
          result.message || 'Payment verification failed.'
        );

        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error('Registration failed:', error);

      toast.error(
        error?.message ||
        'Registration failed. Please contact support.'
      );

      setIsProcessingPayment(false);
    }
  };

  /**
   * Payment processing animation
   */
  useEffect(() => {
    if (!isProcessingPayment) return;

    const timer = setTimeout(() => {
      setIsProcessingPayment(false);

      if (issuedTicket) {
        setShowSuccessModal(true);

        toast.success(
          'Payment received! Your digital ticket has been issued.'
        );

        reset();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isProcessingPayment, issuedTicket, reset]);

  /**
   * Show QR payment screen
   */
  const handleProceedToPay = () => {
    setShowPaymentQR(true);
  };

  /**
   * Return from QR/payment screen
   */
  const handleBackToForm = () => {
    setShowPaymentQR(false);
  };

  return (
    <section
      id="register"
      className={cn(
        'py-16 md:py-24 relative bg-[#FFF9F0] overflow-hidden',
        className
      )}
    >
      {/* ----------------------------------------------- */}
      {/* Payment Processing */}
      {/* ----------------------------------------------- */}

      <PaymentProcessing
        isOpen={isProcessingPayment}
        amount={entryFee}
      />

      {/* ----------------------------------------------- */}
      {/* Success Modal */}
      {/* ----------------------------------------------- */}

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Ticket Registration Successful!"
        subtitle="Save or screenshot your digital ticket QR code below."
      >
        {issuedTicket && (
          <div className="space-y-6 pt-2">

            <TicketCard
              ticketNumber={issuedTicket.ticketCode}
              participantName={issuedTicket.purchaserName}
              department={issuedTicket.department}
              phoneNumber={issuedTicket.phone}
              paymentId={issuedTicket.id}
              amount={entryFee}
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

      {/* ----------------------------------------------- */}
      {/* Main Content */}
      {/* ----------------------------------------------- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Header */}

        <div className="text-center space-y-3 max-w-2xl mx-auto">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading shadow-xs">

            <Sparkles className="w-4 h-4 text-[#D4A017] animate-spin" />

            <span>
              STAFF TICKET REGISTRATION
            </span>

          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading">
            {settings?.eventName || 'Onam Lucky Draw'} Registration
          </h2>

          <p className="text-slate-600 text-sm font-sans">
            Fill in your staff details below to purchase your
            official ₹{entryFee} entry ticket for the draw.
          </p>

        </div>

        {/* ----------------------------------------------- */}
        {/* FORM / PAYMENT CARD */}
        {/* ----------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/90 shadow-soft space-y-6"
        >

          {/* ------------------------------------------- */}
          {/* QR PAYMENT SCREEN */}
          {/* ------------------------------------------- */}

          {showPaymentQR ? (

            <div className="space-y-6">

              {/* Back button */}

              <button
                type="button"
                onClick={handleBackToForm}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F5132] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to registration
              </button>

              {/* Payment heading */}

              <div className="text-center space-y-2">

                <h3 className="text-2xl font-black text-[#0F5132] font-heading">
                  Complete Your Payment
                </h3>

                <p className="text-sm text-slate-600">
                  Scan the QR code below using Google Pay
                  or another UPI app.
                </p>

              </div>

              {/* Amount */}

              <div className="text-center">

                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                  Amount to Pay
                </p>

                <p className="text-4xl font-black text-[#0F5132] mt-1">
                  ₹{entryFee}
                </p>

              </div>

              {/* QR CODE */}

              <div className="flex justify-center">

                <div className="bg-white p-5 rounded-2xl border-2 border-[#0F5132]/20 shadow-lg">

                  <QRCodeSVG
                    value={upiUrl}
                    size={260}
                    level="H"
                    includeMargin={true}
                  />

                </div>

              </div>

              {/* Instructions */}

              <div className="rounded-2xl bg-[#FFF9F0] border border-amber-200 p-5 space-y-3">

                <h4 className="font-black text-slate-800 text-center">
                  How to Pay
                </h4>

                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">

                  <li>
                    Take a screenshot of this QR code.
                  </li>

                  <li>
                    Open Google Pay on your phone.
                  </li>

                  <li>
                    Choose the option to scan a QR code.
                  </li>

                  <li>
                    Select the screenshot from your gallery
                    if Google Pay provides that option.
                  </li>

                  <li>
                    Confirm the receiver and pay ₹{entryFee}.
                  </li>

                  <li>
                    After successful payment, return to this
                    website.
                  </li>

                </ol>

              </div>

              {/* Transaction ID */}

              <div className="space-y-4">

                <Input
                  label="Google Pay Transaction ID *"
                  placeholder="Enter UTR / Transaction Ref No."
                  leftIcon={Hash}
                  error={errors.transactionId?.message}
                  {...register('transactionId', {
                    required:
                      'Transaction ID is required',
                  })}
                />

                <p className="text-xs text-slate-500">
                  Enter the transaction ID shown in your
                  Google Pay payment receipt.
                </p>

              </div>

              {/* Submit */}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                leftIcon={CreditCard}
                className="w-full py-4 text-base font-black tracking-wide shadow-md shadow-[#0F5132]/20"
                onClick={handleSubmit(onSubmit)}
              >
                Submit Registration
              </Button>

            </div>

          ) : (

            /* ------------------------------------------- */
            /* REGISTRATION FORM */
            /* ------------------------------------------- */

            <>

              {/* Form Header */}

              <div className="flex items-center justify-between border-b border-amber-100 pb-4">

                <div>

                  <h3 className="text-xl font-extrabold text-slate-800 font-heading">
                    Participant Details
                  </h3>

                  <p className="text-xs text-slate-500 font-sans">
                    Teachers &amp; Non-Teaching Staff Only
                  </p>

                </div>

                <span className="px-3 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-xs font-black uppercase tracking-wider font-heading border border-[#0F5132]/20">
                  OFFICIAL ENTRY
                </span>

              </div>

              {/* Form */}

              <form
                onSubmit={handleSubmit(handleProceedToPay)}
                className="space-y-5"
              >

                {/* Full Name */}

                <Input
                  label="Full Name *"
                  placeholder="e.g. Prof. Ananthakrishnan Nair"
                  leftIcon={User}
                  error={errors.fullName?.message}
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 3,
                      message:
                        'Name must be at least 3 characters',
                    },
                  })}
                />

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

                {/* Phone + Email */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <Input
                    label="Phone Number *"
                    placeholder="e.g. 9876543210"
                    type="tel"
                    leftIcon={Phone}
                    error={errors.phone?.message}
                    {...register('phone', {
                      required:
                        'Phone number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message:
                          'Enter valid 10-digit Indian phone number',
                      },
                    })}
                  />

                  <Input
                    label="Email Address *"
                    placeholder="e.g. staff@college.edu.in"
                    type="email"
                    leftIcon={Mail}
                    error={errors.email?.message}
                    {...register('email', {
                      required:
                        'Email address is required',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:
                          'Enter valid email address',
                      },
                    })}
                  />

                </div>

                {/* Proceed */}

                <div className="pt-3">

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    leftIcon={CreditCard}
                    className="w-full py-4 text-base font-black tracking-wide shadow-md shadow-[#0F5132]/20"
                  >
                    Proceed to Pay ₹{entryFee}
                  </Button>

                </div>

              </form>

            </>
          )}

        </motion.div>

      </div>
    </section>
  );
};

export default RegistrationForm;