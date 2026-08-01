import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  User,
  Building2,
  Phone,
  Mail,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '../Button';
import { Input } from '../Input';
import { PaymentProcessing } from '../PaymentProcessing';
import { Ticket as TicketCard } from '../Ticket';
import { Modal } from '../Modal';
import { cn } from '../../utils/cn';

import {
  createOrder,
  verifyPayment,
} from '../../services/paymentService';

import { loadRazorpay } from '../../utils/loadRazorpay';

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
      phone: '',
      email: '',
      amount: 150,
    },
  });

  /**
   * Handle registration form submission
   */
  const onSubmit = async (data) => {
    try {
      // --------------------------------------------------
      // STEP 1: Load Razorpay Checkout
      // --------------------------------------------------

      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error('Failed to load Razorpay.');
        return;
      }

      // --------------------------------------------------
      // STEP 2: Create Razorpay Order on Backend
      // --------------------------------------------------

      const response = await createOrder(150);

      if (!response.success) {
        toast.error(
          response.message || 'Unable to create payment order.'
        );
        return;
      }

      const order = response.order;

      // --------------------------------------------------
      // STEP 3: Configure Razorpay Checkout
      // --------------------------------------------------

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,

        name: 'PONNONAM 2026',
        description: 'Lucky Draw Registration',

        order_id: order.id,

        prefill: {
          name: data.fullName,
          email: data.email,
          contact: data.phone,
        },

        theme: {
          color: '#0F5132',
        },

        // ------------------------------------------------
        // STEP 4: Razorpay Payment Success Handler
        // ------------------------------------------------

        handler: async function (paymentResponse) {
          try {
            console.log(
              'Razorpay payment response:',
              paymentResponse
            );

            // --------------------------------------------
            // STEP 5: Send Payment Details to Backend
            // --------------------------------------------

            const verificationPayload = {
              ...paymentResponse,

              name: data.fullName,
              email: data.email,
              phone: data.phone,
              department: data.department,
            };

            const verificationResult = await verifyPayment(
              verificationPayload
            );
            console.log(
              'Payment verification result:',
              verificationResult
            );

            // --------------------------------------------
            // STEP 6: Check Backend Verification Result
            // --------------------------------------------

            if (!verificationResult.success) {
              toast.error(
                verificationResult.message ||
                'Payment verification failed.'
              );
              return;
            }
            // Save the ticket returned by the backend
            setIssuedTicket(verificationResult.ticket);

            // ------------------------------------------------
            // IMPORTANT:
            //
            // DO NOT GENERATE A TICKET HERE.
            //
            // Ticket generation will be moved to the backend
            // in the next steps.
            // ------------------------------------------------

            toast.success(
              'Payment verified successfully.'
            );

            // Start payment processing UI
            setIsProcessingPayment(true);
          } catch (error) {
            console.error(
              'Payment verification failed:',
              error
            );

            toast.error(
              error.message ||
              'Payment verification failed. Please contact support.'
            );
          }
        },

        // ------------------------------------------------
        // Razorpay Payment Failure Handler
        // ------------------------------------------------

        modal: {
          ondismiss: function () {
            console.log(
              'Razorpay checkout was cancelled or closed.'
            );

            toast.error('Payment was cancelled.');
          },
        },
      };

      // --------------------------------------------------
      // STEP 7: Open Razorpay Checkout
      // --------------------------------------------------

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(
        'Payment could not be started:',
        error
      );

      toast.error(
        'Payment could not be started. Please try again.'
      );
    }
  };

  /**
   * Called when PaymentProcessing component finishes
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
      } else {
        toast.success('Payment verified successfully.');
      }
    }, 5000); // Matches your animation duration

    return () => clearTimeout(timer);
  }, [isProcessingPayment, issuedTicket, reset]);

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
        amount={150}
      />

      {/* ----------------------------------------------- */}
      {/* Ticket Success Confirmation Modal */}
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
              amount={150}
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
      {/* Registration Section */}
      {/* ----------------------------------------------- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D4A017] animate-spin" />

            <span>
              STAFF TICKET REGISTRATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading">
            Onam Lucky Draw Registration
          </h2>

          <p className="text-slate-600 text-sm font-sans">
            Fill in your staff details below to purchase
            your official ₹150 entry ticket for the
            Thiruvonam 2026 Bumper Draw.
          </p>
        </div>

        {/* --------------------------------------------- */}
        {/* Registration Form */}
        {/* --------------------------------------------- */}

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

          {/* ------------------------------------------- */}
          {/* Form */}
          {/* ------------------------------------------- */}

          <form
            onSubmit={handleSubmit(onSubmit)}
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

              {/* Phone */}

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

              {/* Email */}

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

            {/* Submit Button */}

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
      </div>
    </section>
  );
};

export default RegistrationForm;

