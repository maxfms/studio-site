/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { servicesList } from '../data';
import { ServiceOffer } from '../types';
import { CheckCircle2, Calculator, Info, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesViewProps {
  onRequestQuote: (serviceName: string) => void;
}

export default function ServicesView({ onRequestQuote }: ServicesViewProps) {
  // Calculator state
  const [calcService, setCalcService] = useState<'residential' | 'commercial'>('residential');
  const [calcSqFt, setCalcSqFt] = useState<number>(1000);

  const handleServiceChange = (service: 'residential' | 'commercial') => {
    setCalcService(service);
    if (service === 'residential') {
      setCalcSqFt(1000);
    } else {
      setCalcSqFt(2500);
    }
  };

  // Price estimations: 1 square foot cost is ₹15 flat
  const calculateEstimate = () => {
    return calcSqFt * 15;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="pt-6 md:pt-12"
    >
      {/* Header Section */}
      <motion.div variants={fadeInUp} className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="font-rubik text-4xl md:text-5xl font-bold text-primary mb-4">Our Services</h1>
        <p className="font-nunito text-lg md:text-xl text-zinc-500">
          Discover the MAXFMS Standard. We provide premium residential, corporate, and facility-wide solutions tailored to your exacting standards.
        </p>
      </motion.div>

      {/* Services List Grid */}
      <div className="space-y-24 mb-24">
        {servicesList.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section key={service.id} className="relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                
                {/* Content Side (Alternates on desktop, loaded with momentum slide) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`order-2 ${isEven ? 'md:order-1' : 'md:order-2'} relative z-10`}
                >
                  <div className={`glass-panel p-8 md:p-12 rounded-xl shadow-lg ${isEven ? 'md:-mr-16' : 'md:-ml-16'}`}>
                    <div className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-3.5 py-1.5 rounded-full font-hanken font-bold text-xs uppercase tracking-wider mb-6">
                      {service.badge}
                    </div>
                    
                    <h2 className="font-rubik text-2xl md:text-3xl font-bold text-zinc-800 mb-6">
                      {service.title}
                    </h2>
                    
                    <p className="font-nunito text-base text-zinc-500 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="w-5.5 h-5.5 text-primary mr-3 mt-0.5 shrink-0" />
                          <span className="font-nunito text-base text-zinc-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onRequestQuote(service.title)}
                      className="btn-cta px-8 py-3.5 rounded-full font-hanken font-bold text-xs uppercase tracking-wider w-full md:w-auto hover:scale-103 cursor-pointer inline-block text-center"
                    >
                      Request Quote
                    </motion.button>
                  </div>
                </motion.div>

                {/* Image Side (Opposite slide trigger) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`order-1 ${isEven ? 'md:order-2' : 'md:order-1'} h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-xl relative`}
                >
                  <img
                    alt={service.title}
                    className="w-full h-full object-cover select-none"
                    src={service.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Interactive Estimator Tool (Value Add) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="bg-white border border-border-soft rounded-2xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto mb-16 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <Calculator className="w-6 h-6 text-primary" />
          <h3 className="font-rubik text-xl md:text-2xl font-bold text-zinc-800">
            Instant Quote Estimator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold font-hanken text-zinc-600 uppercase tracking-widest mb-2">
                Service Type
              </label>
              <div className="grid grid-cols-2 gap-3 bg-zinc-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => handleServiceChange('residential')}
                  className={`py-2 rounded-md font-nunito text-sm font-semibold transition-all cursor-pointer ${
                    calcService === 'residential'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  Residential
                </button>
                <button
                  type="button"
                  onClick={() => handleServiceChange('commercial')}
                  className={`py-2 rounded-md font-nunito text-sm font-semibold transition-all cursor-pointer ${
                    calcService === 'commercial'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            {calcService === 'residential' ? (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold font-hanken text-zinc-600 uppercase tracking-widest">
                    Residential Area Size
                  </label>
                  <span className="text-sm font-bold text-primary font-nunito">{calcSqFt.toLocaleString()} sq. ft.</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={calcSqFt}
                  onChange={(e) => setCalcSqFt(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-100 accent-primary"
                />
                <span className="text-[11px] text-zinc-400 mt-1 block">Specify your home's total area. Rate: ₹15 per sq. ft.</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold font-hanken text-zinc-600 uppercase tracking-widest">
                    Commercial Area Size
                  </label>
                  <span className="text-sm font-bold text-primary font-nunito">{calcSqFt.toLocaleString()} sq. ft.</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="250"
                  value={calcSqFt}
                  onChange={(e) => setCalcSqFt(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-100 accent-primary"
                />
                <span className="text-[11px] text-zinc-400 mt-1 block">Specify professional office, retail, or lobby area. Rate: ₹15 per sq. ft.</span>
              </div>
            )}
          </div>

          {/* Results Badge */}
          <div className="bg-slate-bg border border-border-soft rounded-xl p-8 text-center flex flex-col justify-center h-full relative overflow-hidden">
            <span className="text-zinc-500 font-nunito text-sm font-medium">Estimated Base Budget</span>
            
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={calculateEstimate()}
                  initial={{ scale: 0.85, opacity: 0.5, y: -4 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0.5, y: 4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="inline-block text-4xl md:text-5xl font-bold font-rubik text-primary"
                >
                  {formatCurrency(calculateEstimate())}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 mt-3 mb-6">
              <Info className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Quotes may vary subject to deep sanitation layers.</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onRequestQuote(calcService === 'residential' ? 'Residential Cleaning' : 'Commercial Cleaning')}
              className="w-full bg-primary text-white py-3.5 rounded-lg font-hanken font-bold text-xs uppercase tracking-wide hover:bg-primary-container shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book Clean with this Quote</span>
            </motion.button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
