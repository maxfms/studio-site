/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Booking } from '../types';
import { X, ArrowRight, ArrowLeft, Calendar, User, ClipboardList, CheckCircle2, DollarSign, Clock, Sparkles, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../utils';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onBookingSuccess: (booking: Booking) => void;
}

export default function BookingWizard({
  isOpen,
  onClose,
  preselectedService = '',
  onBookingSuccess
}: BookingWizardProps) {
  const [step, setStep] = useState(1);
  
  // State variables for form
  const [serviceType, setServiceType] = useState('Residential Cleaning');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'biweekly' | 'monthly'>('once');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  
  // Loading & completed states
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Set pre-selected service when opened
  useEffect(() => {
    if (isOpen) {
      if (preselectedService) {
        setServiceType(preselectedService);
      }
      setStep(1);
      setIsDone(false);
    }
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  // Pricing constants
  const getBasePrice = () => {
    if (serviceType.includes('Commercial')) return 9999;
    if (serviceType.includes('Deep')) return 6999;
    return 4999; // Residential base
  };

  const getDiscount = () => {
    if (frequency === 'weekly') return 0.15; // 15% discount
    if (frequency === 'biweekly') return 0.10; // 10% discount
    if (frequency === 'monthly') return 0.05; // 5% discount
    return 0;
  };

  const calculateTotal = () => {
    const base = getBasePrice();
    const discountAmount = base * getDiscount();
    return base - discountAmount;
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    
    // Simulate payment / network creation
    setTimeout(() => {
      const finalBooking: Booking = {
        id: 'book-' + Math.floor(Math.random() * 900000 + 100000),
        serviceType,
        serviceCategory: serviceType.includes('Commercial') ? 'commercial' : 'residential',
        date,
        time,
        firstName,
        lastName,
        email,
        phone,
        frequency,
        specialRequirements,
        totalEstimatedPrice: calculateTotal(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      onBookingSuccess(finalBooking);
      setIsConfirming(false);
      setIsDone(true);
    }, 1800);
  };

  const timeOptions = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-border-soft animate-slide-up relative flex flex-col max-h-[90vh]">
        
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-bg border-b border-border-soft shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <div className="font-rubik font-bold text-zinc-800 text-base">
              {isDone ? 'Booking Completed!' : `New Booking Appointment - Step ${step} of 4`}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 p-1.5 hover:bg-zinc-200/55 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker bar */}
        {!isDone && (
          <div className="w-full bg-zinc-100 h-1.5 shrink-0 flex">
            <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(step / 4) * 105}%` }}></div>
          </div>
        )}

        {/* Dynamic content scroll wrapper */}
        <div className="p-6 md:p-8 flex-grow overflow-y-auto font-nunito">
          {isDone ? (
            <div className="text-center py-8 animate-fade-in space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 border border-green-200 shadow-xs flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-rubik text-2xl font-bold text-zinc-805">
                  Your Room Sanctuary is Scheduled!
                </h3>
                <p className="text-zinc-500 max-w-md mx-auto text-sm leading-relaxed">
                  Congratulations, your MAXFMS booking was confirmed successfully! We've pinned the details below. Our premium expert team will bring advanced kits to your doorstep.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-bg border border-border-soft rounded-xl p-6 text-left max-w-md mx-auto space-y-3 shadow-xs font-nunito text-sm">
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-450 font-semibold">Service:</span>
                  <span className="text-zinc-800 font-bold">{serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-450 font-semibold">Schedule:</span>
                  <span className="text-zinc-800 font-bold">{date} at {time}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-450 font-semibold">Frequency:</span>
                  <span className="text-zinc-800 font-bold capitalize">{frequency}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-450 font-semibold">Client:</span>
                  <span className="text-zinc-800 font-bold">{firstName} {lastName}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-450 font-bold">Paid Total:</span>
                  <span className="text-primary font-bold text-lg">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="bg-primary text-white font-hanken font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* STEP 1: Select Service details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-bold text-base mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Select Service Plan</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setServiceType('Residential Cleaning')}
                      className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all outline-none ${
                        serviceType === 'Residential Cleaning'
                          ? 'border-primary ring-1 ring-primary bg-primary/5'
                          : 'border-border-soft bg-zinc-50 hover:bg-zinc-100'
                      }`}
                    >
                      <h4 className="font-rubik text-lg font-bold text-zinc-800">Residential cleaning</h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Comprehensive care for flats, villas, kitchens, and restrooms. Standard non-toxic ingredients.
                      </p>
                      <span className="font-nunito font-bold text-zinc-700 text-sm mt-4 block">
                        Base: {formatCurrency(4999)} / clean
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceType('Commercial Cleaning')}
                      className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all outline-none ${
                        serviceType === 'Commercial Cleaning'
                          ? 'border-primary ring-1 ring-primary bg-primary/5'
                          : 'border-border-soft bg-zinc-50 hover:bg-zinc-100'
                      }`}
                    >
                      <h4 className="font-rubik text-lg font-bold text-zinc-800">Commercial office</h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Discreet heavy duties for workstations, conference coordinates, and waiting rooms.
                      </p>
                      <span className="font-nunito font-bold text-zinc-700 text-sm mt-4 block">
                        Base: {formatCurrency(9999)} / clean
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceType('Deep Clean Service')}
                      className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all outline-none ${
                        serviceType === 'Deep Clean Service'
                          ? 'border-primary ring-1 ring-primary bg-primary/5'
                          : 'border-border-soft bg-zinc-50 hover:bg-zinc-100'
                      }`}
                    >
                      <h4 className="font-rubik text-lg font-bold text-zinc-800">Deep Clean Service</h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Steam wash coordinates, gutter sanitations and intensive stain extraction options.
                      </p>
                      <span className="font-nunito font-bold text-zinc-700 text-sm mt-4 block">
                        Base: {formatCurrency(6999)} / clean
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceType('Move-In / Move-Out')}
                      className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all outline-none ${
                        serviceType === 'Move-In / Move-Out'
                          ? 'border-primary ring-1 ring-primary bg-primary/5'
                          : 'border-border-soft bg-zinc-50 hover:bg-zinc-100'
                      }`}
                    >
                      <h4 className="font-rubik text-lg font-bold text-zinc-800">Move-In / Move-Out</h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Entire wall-to-floor restoration cleaning, helping you handover completely pristine rooms.
                      </p>
                      <span className="font-nunito font-bold text-zinc-700 text-sm mt-4 block">
                        Base: {formatCurrency(6999)} / clean
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Pick Schedule Calendar constraints */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-bold text-base mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Select Date &amp; Frequency</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold font-hanken text-zinc-600 block mb-2 uppercase tracking-wide">
                        Choose Schedule Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]} // restrict past dates
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-350 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary font-nunito text-zinc-700 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold font-hanken text-zinc-600 block mb-2 uppercase tracking-wide">
                        Appointment Slot
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary font-nunito text-zinc-700 cursor-pointer"
                      >
                        {timeOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-hanken text-zinc-600 block mb-3 uppercase tracking-wide">
                      Frequency (More visits saves budget!)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 rounded-xl p-2 border border-zinc-100">
                      {[
                        { id: 'once', label: 'Once', discount: 'Flat rate' },
                        { id: 'weekly', label: 'Weekly', discount: '15% Off' },
                        { id: 'biweekly', label: 'Bi-Weekly', discount: '10% Off' },
                        { id: 'monthly', label: 'Monthly', discount: '5% Off' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFrequency(item.id as any)}
                          className={`p-3 rounded-lg flex flex-col items-center justify-center font-nunito transition-all outline-none cursor-pointer ${
                            frequency === item.id
                              ? 'bg-primary text-white shadow-xs'
                              : 'text-zinc-650 hover:bg-zinc-100'
                          }`}
                        >
                          <span className="text-sm font-semibold">{item.label}</span>
                          <span className={`text-[10px] mt-0.5 ${frequency === item.id ? 'text-zinc-100 font-medium' : 'text-zinc-400 font-medium'}`}>
                            {item.discount}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Client contact details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-bold text-base mb-2">
                    <User className="w-5 h-5 text-primary" />
                    <span>Your Coordinates</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold font-hanken text-zinc-650 block mb-2 uppercase tracking-wide">
                        First Name Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm font-nunito"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold font-hanken text-zinc-650 block mb-2 uppercase tracking-wide">
                        Last Name Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm font-nunito"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold font-hanken text-zinc-650 block mb-2 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm font-nunito"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold font-hanken text-zinc-650 block mb-2 uppercase tracking-wide">
                        Phone line
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (800) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm font-nunito"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-hanken text-zinc-650 block mb-2 uppercase tracking-wide">
                      Special requirements / Instructions
                    </label>
                    <textarea
                      placeholder="Access codes, pets info, deep-cleaning key spots..."
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm font-nunito h-20 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Review Summary, Price computations and Pay */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-bold text-base mb-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <span>Summary Assessment</span>
                  </div>

                  <div className="bg-slate-bg border border-border-soft rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-zinc-200 pb-3">
                      <span className="text-zinc-500 font-semibold">Service Type:</span>
                      <span className="text-zinc-850 font-bold">{serviceType}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm border-b border-zinc-200 pb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4.5 h-4.5 text-zinc-400" />
                        <span className="text-zinc-500 font-semibold">Schedule Date:</span>
                      </div>
                      <span className="text-zinc-850 font-bold">{date || 'Not Selected!'}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm border-b border-zinc-200 pb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4.5 h-4.5 text-zinc-400" />
                        <span className="text-zinc-500 font-semibold">Scheduled Slot:</span>
                      </div>
                      <span className="text-zinc-850 font-bold">{time}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm border-b border-zinc-200 pb-3">
                      <span className="text-zinc-500 font-semibold">Frequency Cycle:</span>
                      <span className="text-zinc-850 font-bold capitalize">{frequency}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm pb-1">
                      <span className="text-zinc-500 font-semibold">Client Coordinator:</span>
                      <span className="text-zinc-850 font-bold">{firstName} {lastName} ({phone})</span>
                    </div>
                  </div>

                  {/* Calculations Details */}
                  <div className="flex flex-col gap-2 p-5 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Base Service Package</span>
                      <span>{formatCurrency(getBasePrice())}</span>
                    </div>
                    {getDiscount() > 0 && (
                      <div className="flex justify-between text-xs text-green-600 font-semibold">
                        <span>Frequency discount ({(getDiscount() * 100)}% discount)</span>
                        <span>-{formatCurrency(getBasePrice() * getDiscount())}</span>
                      </div>
                    )}
                    <div className="h-px bg-zinc-200 my-1"></div>
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-zinc-700">Calculated Estimate</span>
                      </div>
                      <span className="text-2xl font-bold font-rubik text-primary">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer controls layout */}
        {!isDone && (
          <div className="px-6 py-4 bg-slate-bg border-t border-border-soft flex justify-between shrink-0">
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className="px-5 py-2.5 font-nunito font-bold text-sm text-zinc-550 border border-zinc-200 rounded-lg hover:bg-zinc-100 disabled:opacity-30 cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={step === 2 && !date} // block next if date is not selected
                className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-nunito font-bold text-sm rounded-lg active:scale-97 transition-all flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isConfirming || !firstName || !email || !phone}
                className="px-8 py-2.5 bg-secondary-container hover:bg-opacity-95 text-white font-nunito font-bold text-sm rounded-lg active:scale-97 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-40"
              >
                {isConfirming ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Scheduling sanctuary...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
