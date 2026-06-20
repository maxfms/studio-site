/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowRight, Smartphone, Sparkles, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';
import { motion } from 'motion/react';
import heroLemon from '../assets/images/crew_floor_cleaner_lemon_zest_1781794850260.jpg';
import heroFloral from '../assets/images/crew_floor_cleaner_floral_1781794865806.jpg';
import heroCrew7 from '../assets/images/crew_7_restroom_cleaner_1781794881618.jpg';
import heroScrubber from '../assets/images/office_scrubber_service_1781794896690.jpg';
import heroMopVac from '../assets/images/office_mop_vacuum_service_1781794910108.jpg';
import heroGlass from '../assets/images/office_glass_squeegee_service_1781794924859.jpg';
import appPortalPreview from '../assets/images/app_portal_preview_1781793618602.jpg';

interface HomeViewProps {
  onBookNow: () => void;
  setCurrentPage: (page: PageId) => void;
}

const heroCards = [
  {
    image: heroLemon,
    alt: 'Crew Disinfectant Floor Cleaner - Lemon Zest'
  },
  {
    image: heroFloral,
    alt: 'Crew Disinfectant Floor Cleaner - Floral'
  },
  {
    image: heroCrew7,
    alt: 'Diversey Crew 7 Restroom Disinfectant Cleaner - 1L'
  },
  {
    image: heroScrubber,
    alt: 'Professional Office Floor Scrubber Machine Service'
  },
  {
    image: heroMopVac,
    alt: 'Professional Office Mop and Floor Deep Cleaning'
  },
  {
    image: heroGlass,
    alt: 'Professional Glass Partition and Window Squeegee Cleaning Service'
  }
];

export default function HomeView({ onBookNow, setCurrentPage }: HomeViewProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveCardIndex(null);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 110, damping: 14 }
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
            staggerChildren: 0.12,
            delayChildren: 0.08
          }
        }
      }}
      className="space-y-16"
    >
      {/* Light Mode Showcase Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-20 px-gutter max-w-7xl mx-auto overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-white">
        <div className="relative">
          {/* Headline */}
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <h1 className="font-rubik text-4xl sm:text-6xl lg:text-7xl leading-[1.2] sm:leading-[1.12] lg:leading-[1.1] tracking-tighter font-bold text-zinc-950">
              Showcase a pristine space with <span className="inline-block px-5 py-2 mx-1 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-white shadow-lg shadow-primary/25 transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 border border-blue-400/30">MAXFMS</span>
              <span className="block mt-3 text-zinc-950 font-bold">
                to the world.
              </span>
            </h1>
          </motion.div>

          {/* Card rail container */}
          <motion.div 
            variants={scaleIn} 
            className="mt-12 md:mt-16 max-w-4xl mx-auto relative select-none"
          >
            {/* Tag Left (Products) */}
            <motion.div 
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="absolute -top-6 left-[8%] sm:left-[16%] z-20"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage('products');
                }}
                className="relative group inline-flex items-center gap-1.5 text-xs font-bold font-hanken text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full px-4 py-2 shadow-md cursor-pointer tracking-wider uppercase"
              >
                <span>Products</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="absolute -bottom-1 left-6 h-2 w-2 rotate-45 bg-blue-600"></span>
              </button>
            </motion.div>

            {/* Tag Right (Services) */}
            <motion.div 
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="absolute -top-5 right-[6%] sm:right-[14%] z-20"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage('services');
                }}
                className="relative group inline-flex items-center gap-1.5 text-xs font-bold font-hanken text-white bg-orange-500 hover:bg-orange-600 transition-colors rounded-full px-4 py-2 shadow-md cursor-pointer tracking-wider uppercase"
              >
                <span>Services</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="absolute -bottom-1 left-6 h-2 w-2 rotate-45 bg-orange-500"></span>
              </button>
            </motion.div>

            {/* Cards Grid */}
            <div className="flex justify-center">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 max-w-4xl w-full">
                {heroCards.map((card, idx) => {
                  const isActive = activeCardIndex === idx;
                  const isAnyActive = activeCardIndex !== null;
                  
                  // Layout transformations matching original design
                  let transformClass = "";
                  if (idx === 0) transformClass = "transform -rotate-8 translate-y-3 sm:translate-y-5";
                  else if (idx === 1) transformClass = "transform -rotate-2 translate-y-5 sm:translate-y-7";
                  else if (idx === 2) transformClass = "transform rotate-3 translate-y-2";
                  else if (idx === 3) transformClass = "transform rotate-0 -translate-y-1";
                  else if (idx === 4) transformClass = "transform -rotate-2 translate-y-3";
                  else if (idx === 5) transformClass = "transform rotate-6 translate-y-6";

                  return (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCardIndex(isActive ? null : idx);
                      }}
                      style={{
                        filter: isAnyActive && !isActive ? 'blur(4px)' : 'none',
                        opacity: isAnyActive && !isActive ? 0.35 : 1,
                        transform: isActive ? 'scale(1.15) rotate(0deg) translateY(0px)' : undefined,
                        zIndex: isActive ? 40 : 10,
                      }}
                      className={`col-span-2 sm:col-span-1 self-end transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${isActive ? "" : transformClass}`}
                    >
                      <div className="aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md hover:shadow-xl transition-shadow bg-zinc-100">
                        <img
                          src={card.image}
                          alt={card.alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Subcopy / Guarantee Clean Grid */}
          <motion.div 
            variants={fadeInUp} 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 md:mt-16 max-w-5xl mx-auto pt-8 border-t border-zinc-150/60"
          >
            {/* Left Column: CTA & Mission */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
              <p className="text-sm md:text-base text-zinc-500 font-nunito leading-relaxed">
                Experience the MAXFMS gold standard in facility management. Connect with professional eco-specialists, buy premium botanical formulations, and optimize your environment today.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onBookNow}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-hanken font-bold text-sm bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-widest cursor-pointer"
                >
                  <span>Get started today</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCurrentPage('portal')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-zinc-100 hover:bg-zinc-200 px-6 py-4 text-sm font-bold font-hanken text-zinc-800 ring-1 ring-zinc-200/80 transition-all duration-200 shadow-xs uppercase tracking-widest cursor-pointer"
                >
                  <span>View App Portal</span>
                </motion.button>
              </div>
            </div>

            {/* Right Column: Mini Compact Trust & Guarantee Callout */}
            <div className="lg:col-span-5 bg-zinc-50/50 rounded-2xl p-5 border border-zinc-200/40 space-y-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold font-hanken text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-0.5 rounded-full">
                  Our Promise
                </span>
                <span className="text-[9px] font-bold font-hanken text-zinc-500 uppercase tracking-wider">
                  24-Hour Guarantee
                </span>
              </div>
              <h3 className="font-rubik text-sm font-bold text-zinc-800">
                100% Satisfaction Checked
              </h3>
              <p className="font-nunito text-xs text-zinc-500 leading-relaxed">
                If you're not satisfied, notify us within 24 hours. We'll return and re-clean at no additional cost.
              </p>
              
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-150/60 text-center">
                <div>
                  <span className="block font-rubik text-base font-bold text-primary">4.9★</span>
                  <span className="block font-nunito text-[9px] text-zinc-450 font-semibold uppercase tracking-wider">Rating</span>
                </div>
                <div className="border-l border-zinc-150/60">
                  <span className="block font-rubik text-base font-bold text-primary">5k+</span>
                  <span className="block font-nunito text-[9px] text-zinc-450 font-semibold uppercase tracking-wider">Managed</span>
                </div>
                <div className="border-l border-zinc-150/60">
                  <span className="block font-rubik text-base font-bold text-primary">100%</span>
                  <span className="block font-nunito text-[9px] text-zinc-450 font-semibold uppercase tracking-wider">Eco</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAXFMS App Companion Promo Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUp}
        id="app-promo-section" 
        className="bg-slate-bg border border-border-soft py-16 px-gutter max-w-container-max mx-auto mb-16 rounded-xl flex flex-col lg:flex-row items-center gap-12 shadow-xs text-left"
      >
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-hanken uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing MAXFMS Mobile</span>
          </div>
          <h2 className="font-rubik text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
            Manage your assets, track schedules &amp; view stats on-the-go
          </h2>
          <p className="font-nunito text-zinc-650 text-sm md:text-base leading-relaxed max-w-xl">
            Our private pilot companion app makes booking professional eco-specialists, buying premium non-toxic cleaning supplies, and tracking facility checklists completely seamless. Experience live dashboard simulation right in your browser.
          </p>
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              id="btn-explore-app-portal"
              onClick={() => setCurrentPage('portal')}
              className="inline-flex items-center gap-2 font-hanken font-bold text-sm bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl shadow-md duration-200 cursor-pointer uppercase tracking-wider"
            >
              <span>Explore Mobile App Portal</span>
            </motion.button>
          </div>
        </div>

        {/* Visual App Snapshot representation */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
          <motion.div 
            whileHover={{ y: -5, rotate: 1, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)" }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            onClick={() => setCurrentPage('portal')}
            className="cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-xs max-w-[340px] w-full"
          >
            <img 
              src={appPortalPreview} 
              alt="MAXFMS Go App Portal Companion App Preview" 
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover block"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Service Categories */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="px-gutter max-w-container-max mx-auto pb-24 text-center"
      >
        <h2 className="font-rubik text-3xl font-bold text-zinc-800 mb-4">
          Integrated Solutions for Modern Spaces
        </h2>
        <p className="font-nunito text-zinc-500 max-w-2xl mx-auto mb-12">
          Discover our eco-friendly botanical formulation products and premium residential/commercial facility operation services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Products */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            onClick={() => setCurrentPage('products')}
            className="group relative rounded-xl overflow-hidden h-[300px] shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
          >
            <img 
              src={heroLemon} 
              alt="Premium Eco-Friendly Cleaning Products and Botanical Formulas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-left">
              <span className="font-hanken text-xs font-bold text-primary bg-primary-fixed px-2.5 py-1 rounded-full uppercase tracking-wider">
                Eco-Friendly Products
              </span>
              <h3 className="font-rubik text-xl font-bold text-white mt-2">Botanical & Non-Toxic Supplies</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage('products');
                }}
                className="font-nunito text-sm text-neutral-300 hover:text-white flex items-center gap-1 mt-2 transition-colors cursor-pointer"
              >
                Shop Products <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Side: Services */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            onClick={() => setCurrentPage('services')}
            className="group relative rounded-xl overflow-hidden h-[300px] shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
          >
            <img 
              src={heroScrubber} 
              alt="Professional Residential and Commercial Cleaning Services"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-left">
              <span className="font-hanken text-xs font-bold text-tertiary bg-tertiary-fixed px-2.5 py-1 rounded-full uppercase tracking-wider">
                Professional Services
              </span>
              <h3 className="font-rubik text-xl font-bold text-white mt-2">Residential & Commercial Cleaning</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage('services');
                }}
                className="font-nunito text-sm text-neutral-300 hover:text-white flex items-center gap-1 mt-2 transition-colors cursor-pointer"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
