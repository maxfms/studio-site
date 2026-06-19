/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactViewProps {
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void;
  preselectedService?: string;
}

export default function ContactView({ onAddInquiry, preselectedService = '' }: ContactViewProps) {
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preselectedService || '');
  const [message, setMessage] = useState('');
  
  // Submit animation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onAddInquiry({
        firstName,
        lastName,
        email,
        serviceInterest: service || 'General Information',
        message,
        status: 'received',
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Clean inputs
      setFirstName('');
      setLastName('');
      setEmail('');
      setService('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="animate-fade-in relative">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 inset-0 h-[600px] z-0 overflow-hidden rounded-xl bg-slate-bg/30 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[70%] rounded-full bg-primary/10 blur-[100px] opacity-60"></div>
        <div className="absolute top-[20%] -left-[10%] w-[35%] h-[50%] rounded-full bg-tertiary-fixed/30 blur-[80px] opacity-50"></div>
      </div>

      <div className="relative z-10 pt-6 md:pt-12">
        {/* Page Header */}
        <div className="text-center md:text-left mb-16 max-w-2xl">
          <h1 className="font-rubik text-4xl md:text-5xl font-bold text-zinc-850 mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="font-nunito text-lg md:text-xl text-zinc-500">
            Experience the aura of clean. Whether you have a question about our services or need a custom quote, our team is ready to assist you.
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Contact Details Column (span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:mt-8">
            
            {/* Info Card: Location */}
            <div className="bg-white border border-border-soft rounded-xl p-6 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <MapPin className="w-5.5 h-5.5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-rubik text-lg font-bold text-zinc-800">Our Office</h3>
                <p className="font-nunito text-base text-zinc-500 leading-relaxed">
                  100 Crystal Clear Blvd<br />
                  Suite 400<br />
                  Metropolis, NY 10001
                </p>
              </div>
            </div>

            {/* Info Card: Contact Details */}
            <div className="bg-white border border-border-soft rounded-xl p-6 shadow-sm flex flex-col gap-6 transition-all hover:shadow-md relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 opacity-40 blur-2xl rounded-full"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Phone className="w-5.5 h-5.5 text-primary" />
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">Phone</h4>
                  <a className="font-nunito text-lg text-primary hover:text-primary-container font-bold tracking-tight transition-colors cursor-pointer" href="tel:+18005550199">
                    +1 (800) 555-0199
                  </a>
                </div>
              </div>
              
              <div className="h-px w-full bg-zinc-100"></div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Mail className="w-5.5 h-5.5 text-primary" />
                </div>
                <div>
                  <h4 className="font-hanken font-bold text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">Email</h4>
                  <a className="font-nunito text-lg text-primary hover:text-primary-container font-bold tracking-tight transition-colors cursor-pointer" href="mailto:hello@auraclean.com">
                    hello@auraclean.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Inquiry Form Column (span 7, Glassmorphism) */}
          <div className="lg:col-span-7">
            <div className="bg-white/75 backdrop-blur-md border border-border-soft rounded-xl p-8 lg:p-10 shadow-lg relative min-h-[480px]">
              
              {submitSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center border-2 border-green-200 mb-6 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-rubik text-2xl font-bold text-zinc-800">
                    Inquiry Received!
                  </h3>
                  <p className="font-nunito text-zinc-500 mt-3 max-w-md">
                    Thank you. Your message has been routed to our operations coordinators. We'll consult our calendar and reply within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-8 text-sm font-semibold font-nunito text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Send another inquiry</span>
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-rubik text-2xl font-bold text-zinc-800 mb-8">
                    Send an Inquiry
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="font-hanken font-bold text-xs text-zinc-600 block mb-2 uppercase tracking-wide" htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-nunito text-sm text-zinc-800"
                          id="firstName"
                          placeholder="Jane"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      
                      {/* Last Name */}
                      <div>
                        <label className="font-hanken font-bold text-xs text-zinc-600 block mb-2 uppercase tracking-wide" htmlFor="lastName">
                          Last Name
                        </label>
                        <input
                          className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-nunito text-sm text-zinc-800"
                          id="lastName"
                          placeholder="Doe"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-hanken font-bold text-xs text-zinc-600 block mb-2 uppercase tracking-wide" htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-nunito text-sm text-zinc-800"
                        id="email"
                        placeholder="jane@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="font-hanken font-bold text-xs text-zinc-600 block mb-2 uppercase tracking-wide" htmlFor="service">
                        Service of Interest
                      </label>
                      <select
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-nunito text-sm text-zinc-800 cursor-pointer"
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        <option value="">Select a service</option>
                        <option value="Residential Cleaning">Residential Cleaning</option>
                        <option value="Commercial Office">Commercial cleaning</option>
                        <option value="Deep Clean Service">Deep Clean Service</option>
                        <option value="Move-In / Move-Out">Move-In / Move-Out</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-hanken font-bold text-xs text-zinc-600 block mb-2 uppercase tracking-wide" htmlFor="message">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        className="w-full bg-zinc-50 border border-border-soft rounded-lg px-4 py-3 placeholder:text-zinc-300 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-nunito text-sm text-zinc-800 h-28 resize-none"
                        id="message"
                        placeholder="How can we help you achieve the aura of clean?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-lg font-hanken font-bold text-xs uppercase tracking-widest hover:shadow transition-all disabled:opacity-50 active:scale-98 flex justify-center items-center gap-2 cursor-pointer outline-none"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>Routing inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <Send className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                      <p className="font-nunito text-zinc-400 text-center mt-4 text-xs">
                        By submitting, you agree to our <a className="text-primary hover:underline font-semibold" href="#privacy">Privacy Policy</a>.
                      </p>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
