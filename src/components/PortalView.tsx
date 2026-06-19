/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, Sparkles, ShoppingBag, Calendar, ArrowRight, ShieldCheck, CheckCircle2, Star, Clock, Gift, Bell, Play } from 'lucide-react';

interface PortalViewProps {
  onBookNow?: () => void;
  onGoToProducts?: () => void;
}

export default function PortalView({ onBookNow, onGoToProducts }: PortalViewProps) {
  const [betaEmail, setBetaEmail] = useState('');
  const [betaPlatform, setBetaPlatform] = useState<'ios' | 'android'>('ios');
  const [submitted, setSubmitted] = useState(false);
  
  // Interactive Phone Simulator State
  const [simActiveTab, setSimActiveTab] = useState<'book' | 'shop' | 'home'>('home');
  const [simBookedService, setSimBookedService] = useState('');
  const [simBasketCount, setSimBasketCount] = useState(0);
  const [simFeedback, setSimFeedback] = useState('');

  const handleRegisterBeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!betaEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setBetaEmail('');
    }, 4000);
  };

  const triggerSimAction = (actionMessage: string) => {
    setSimFeedback(actionMessage);
    setTimeout(() => {
      setSimFeedback('');
    }, 3000);
  };

  return (
    <div className="animate-fade-in pt-6 md:pt-12 font-nunito">
      
      {/* Banner / Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 max-w-6xl mx-auto">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-hanken uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upcoming Launch • Q3 2026</span>
          </div>
          
          <h1 className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-none">
            MAXFMS Mobile <br />
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              At Your Fingertips
            </span>
          </h1>
          
          <p className="text-zinc-550 text-sm md:text-base leading-relaxed max-w-xl">
            We are supercharging the sanctuary experience. With our upcoming MAXFMS companion app, you can easily schedule professional cleaning crew members, manage recurring premium visits, and restock non-toxic plant-based essentials in real-time.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg bg-zinc-50">
              <Smartphone className="w-5 h-5 text-zinc-450" />
              <div className="text-left">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-wider">Available soon on</span>
                <span className="text-xs font-bold text-zinc-800">Apple App Store</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg bg-zinc-50">
              <Play className="w-5 h-5 text-zinc-450 fill-current" />
              <div className="text-left">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-wider">Available soon on</span>
                <span className="text-xs font-bold text-zinc-800">Google Play Store</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <span className="font-rubik text-2xl md:text-3xl font-bold text-primary">01-Tap</span>
              <span className="text-[11px] font-bold text-zinc-400 block uppercase mt-0.5">Quick Booking</span>
            </div>
            <div>
              <span className="font-rubik text-2xl md:text-3xl font-bold text-primary">100%</span>
              <span className="text-[11px] font-bold text-zinc-400 block uppercase mt-0.5">Eco-Friendly</span>
            </div>
            <div>
              <span className="font-rubik text-2xl md:text-3xl font-bold text-primary">4.9★</span>
              <span className="text-[11px] font-bold text-zinc-400 block uppercase mt-0.5">Beta Rated</span>
            </div>
          </div>
        </div>

        {/* Feature Interactive Smartphone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-80 h-[580px] bg-zinc-950 rounded-[40px] shadow-2xl p-3 border-4 border-zinc-800 flex flex-col justify-between overflow-hidden select-none ring-12 ring-zinc-900/5 hover:scale-103 transition-transform duration-300">
            {/* Top speaker & camera bezel */}
            <div className="absolute top-0 inset-x-0 h-6 bg-zinc-950 flex justify-center items-center z-20">
              <div className="w-24 h-4 bg-black rounded-b-xl flex justify-center items-center">
                <div className="w-8 h-1 bg-zinc-700 rounded-full mb-1"></div>
              </div>
            </div>

            {/* Simulated App Frame content */}
            <div className="w-full h-full bg-slate-bg rounded-[32px] pt-6 pb-2 px-3 flex flex-col justify-between overflow-hidden relative">
              
              {/* App Internal Header */}
              <div className="flex justify-between items-center py-2 border-b border-zinc-200/50">
                <span className="font-rubik text-xs font-black tracking-tight text-primary">MAXFMS Go</span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span>v1.0 BETA</span>
                </div>
              </div>

              {/* Dynamic Internal Pages depending on simulator state */}
              <div className="flex-grow py-3 overflow-y-auto space-y-3 font-nunito text-xs">
                
                {simFeedback && (
                  <div className="p-2 bg-primary text-white text-[11px] font-bold rounded-lg text-center shadow-sm animate-fade-in flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{simFeedback}</span>
                  </div>
                )}

                {simActiveTab === 'home' && (
                  <div className="space-y-3 animate-fade-in text-left">
                    <div className="bg-gradient-to-r from-primary to-primary-container text-white p-3 rounded-lg space-y-1 shadow-xs">
                      <h4 className="font-bold text-[13px]">Pristine Living Awaits</h4>
                      <p className="text-[10px] text-white/90">Book premium non-toxic cleaning sessions or shop botanicals instantly.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pb-2">
                      <button 
                        onClick={() => setSimActiveTab('book')}
                        className="bg-white p-2 rounded-lg border border-zinc-200/65 flex flex-col items-center text-center gap-1 font-bold text-zinc-700 hover:border-primary active:scale-95 transition-all outline-none"
                      >
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>Book Visit</span>
                      </button>
                      <button 
                        onClick={() => setSimActiveTab('shop')}
                        className="bg-white p-2 rounded-lg border border-zinc-200/65 flex flex-col items-center text-center gap-1 font-bold text-zinc-700 hover:border-primary active:scale-95 transition-all outline-none"
                      >
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <span>Buy Products</span>
                      </button>
                    </div>

                    <div className="bg-white rounded-lg p-2.5 border border-zinc-200/65 space-y-2">
                      <span className="font-bold text-[11px] text-zinc-405 block uppercase tracking-wide">Featured Clean Formula</span>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center font-bold text-primary font-mono text-[10px]">SOAP</div>
                        <div className="flex-1">
                          <span className="font-bold text-[11px] text-zinc-800">All-Purpose Lavender Extract</span>
                          <span className="text-[10px] text-primary font-semibold block">₹599</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setSimBasketCount(prev => prev + 1);
                          triggerSimAction('Added Lavender Spray to Basket!');
                        }}
                        className="w-full bg-zinc-905 hover:bg-black text-white py-1 rounded-md text-[10px] font-bold text-center"
                      >
                        Buy Formula
                      </button>
                    </div>
                  </div>
                )}

                {simActiveTab === 'book' && (
                  <div className="space-y-3 animate-fade-in text-left">
                    <span className="font-bold text-[13px] text-zinc-800 tracking-tight block">Custom Scheduling Form</span>
                    <div className="space-y-2">
                      {[
                        { id: 'res', label: 'Residential Classic (₹4,999)' },
                        { id: 'deep', label: 'Intensive Deep Steam (₹6,999)' },
                        { id: 'com', label: 'Commercial Office (₹9,999)' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSimBookedService(s.label)}
                          className={`w-full p-2.5 rounded-lg border text-left transition-all ${
                            simBookedService === s.label
                              ? 'border-primary bg-primary/5 font-extrabold text-primary'
                              : 'border-zinc-200 bg-white'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={!simBookedService}
                      onClick={() => {
                        triggerSimAction(`Booked: ${simBookedService}!`);
                        setSimBookedService('');
                        setSimActiveTab('home');
                      }}
                      className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider text-center disabled:opacity-40"
                    >
                      Process 1-Click Booking
                    </button>
                  </div>
                )}

                {simActiveTab === 'shop' && (
                  <div className="space-y-3 animate-fade-in text-left">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[13px] text-zinc-800">Essential Botanicals</span>
                      <span className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded text-[10px]">
                        {simBasketCount} in Basket
                      </span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: 'p1', name: 'Premium Multi-Surface', price: '₹549' },
                        { id: 'p2', name: 'Zesty Citrus Polish', price: '₹449' },
                        { id: 'p3', name: 'Heavy Duty Tub Degreaser', price: '₹649' }
                      ].map(p => (
                        <div key={p.id} className="bg-white p-2 rounded-lg border border-zinc-150 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-zinc-850 block">{p.name}</span>
                            <span className="text-primary font-bold">{p.price}</span>
                          </div>
                          <button
                            onClick={() => {
                              setSimBasketCount(prev => prev + 1);
                              triggerSimAction(`Added ${p.name}!`);
                            }}
                            className="bg-primary hover:bg-primary-container text-white py-1 px-2.5 rounded font-bold text-[10px]"
                          >
                            + Buy
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex gap-1.5">
                      <button
                        onClick={() => {
                          setSimBasketCount(0);
                          triggerSimAction('Checked out simulated basket!');
                          setSimActiveTab('home');
                        }}
                        disabled={simBasketCount === 0}
                        className="flex-1 bg-zinc-905 hover:bg-black text-white text-[10px] font-bold py-2 rounded-md text-center disabled:opacity-40"
                      >
                        Checkout Basket
                      </button>
                      <button
                        onClick={() => {
                          setSimBasketCount(0);
                        }}
                        className="px-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-650 text-[10px] font-bold py-2 rounded-md text-center"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Smartphone Navigation Bar */}
              <div className="border-t border-zinc-200 pt-1.5 flex justify-around items-center shrink-0">
                <button 
                  onClick={() => setSimActiveTab('home')}
                  className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${simActiveTab === 'home' ? 'text-primary' : 'text-zinc-400'}`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Main</span>
                </button>
                <button 
                  onClick={() => setSimActiveTab('book')}
                  className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${simActiveTab === 'book' ? 'text-primary' : 'text-zinc-400'}`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedules</span>
                </button>
                <button 
                  onClick={() => setSimActiveTab('shop')}
                  className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${simActiveTab === 'shop' ? 'text-primary' : 'text-zinc-400'}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Botanicals</span>
                </button>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="flex justify-center pt-2">
                <div className="w-24 h-1 bg-zinc-300 rounded-full"></div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* App Key Highlights section */}
      <section className="mb-24 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-rubik text-3xl font-bold tracking-tight text-zinc-900">
            Why Download MAXFMS Go?
          </h2>
          <p className="text-zinc-500 text-sm">
            Designed to bring simplicity, cleanliness, and ecological responsibility right into your hands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 md:p-8 space-y-4 shadow-xs text-left">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/10">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-rubik text-lg font-bold text-zinc-900">Seamless Instant Booking</h3>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
              No long back-and-forth phone negotiations. Select your preferred date, configure room layouts/instructions, and secure flat-rate instant bookings in under 60 seconds.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 md:p-8 space-y-4 shadow-xs text-left">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/10">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-rubik text-lg font-bold text-zinc-900">Eco-Botanicals Shop</h3>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
              Running low on your favorite zero-waste, lavender multi-surface cleansers? Replenish supplies with one tap, or toggle on automatic eco-subscriptions for steady sanitizing.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 md:p-8 space-y-4 shadow-xs text-left">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-rubik text-lg font-bold text-zinc-900">Clean Technician Tracking</h3>
            <p className="text-zinc-550 text-xs md:text-sm leading-relaxed">
              Keep oversight over real-time schedules. Receive push reminders as your eco-specialists head out, view coordinates, and check exact completion reports with digital receipt cards.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
}
