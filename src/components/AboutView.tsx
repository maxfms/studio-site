/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pt-6 md:pt-12"
    >
      {/* Hero Section */}
      <section className="mb-16 md:mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-rubik text-4xl md:text-5xl font-bold mb-6 text-primary tracking-tight">
            Discover the MAXFMS Standard
          </h1>
          <p className="font-nunito text-lg md:text-xl text-zinc-500 leading-relaxed">
            We bring precision, transparency, and an unparalleled standard of care to every space we touch. Learn about the team dedicated to your environment's vitality.
          </p>
        </div>
        
        {/* Beautiful team image overlay */}
        <div className="relative w-full h-[320px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/50 group bg-zinc-50">
          <img
            alt="MAXFMS Professional Dedicated Cleaning Team"
            className="w-full h-full object-cover select-none transition-all duration-700 ease-out group-hover:scale-[1.025]"
            src="/src/assets/images/maxfms_cleaning_team_1781878604617.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 glass-panel p-6 rounded-lg border border-white/20">
            <p className="font-rubik text-lg md:text-2xl font-bold text-zinc-800 mb-1.5 md:mb-2">
              Our Dedicated Professionals
            </p>
            <p className="font-nunito text-sm md:text-base text-zinc-600">
              Trained to exacting standards, our team is the heart of the MAXFMS experience.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid: Mission & Story */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24 items-stretch">
        
        {/* Mission Card: span 5 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="md:col-span-5 bg-white rounded-xl border border-border-soft shadow-sm p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-rubik text-2xl md:text-3xl font-bold mb-4 text-primary tracking-tight">
              Our Mission
            </h2>
            <p className="font-nunito text-base text-zinc-500 leading-relaxed mb-8">
              To elevate the standard of living and working environments through meticulous, transparent, and reliable facility management and cleaning services. We don't just maintain tables; we ensure operational vitality, promoting well-being and productivity.
            </p>
          </div>
          
          <ul className="space-y-4 pt-4 border-t border-zinc-100 font-medium">
            <li className="flex items-start">
              <CheckCircle2 className="w-5.5 h-5.5 text-primary shrink-0 mr-3 mt-0.5" />
              <span className="font-nunito text-base text-zinc-700">
                Uncompromising Quality Standards
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5.5 h-5.5 text-primary shrink-0 mr-3 mt-0.5" />
              <span className="font-nunito text-base text-zinc-700">
                Eco-Conscious Practices
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5.5 h-5.5 text-primary shrink-0 mr-3 mt-0.5" />
              <span className="font-nunito text-base text-zinc-700">
                Complete Transparency
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Story Card: span 7 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="md:col-span-7 bg-white rounded-xl border border-border-soft shadow-sm p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-soft">
            <h2 className="font-rubik text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Our Story
            </h2>
            <span className="font-hanken font-bold text-xs bg-tertiary-fixed text-on-tertiary-fixed-variant px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Established 2025
            </span>
          </div>
          
          <div className="font-nunito text-base text-zinc-500 space-y-6 leading-relaxed">
            <p>
              MAXFMS began with a simple observation: most facility and cleaning services left spaces looking superficially tidy, but lacking that true, fresh standard of a meticulously cared-for environment. Our founders, coming from backgrounds in hospitality and facility management, realized that true comfort is felt as much as it is seen.
            </p>
            <p>
              We started small, serving discerning residential and corporate clients who demanded a higher level of detail. Word quickly spread about our 'soft-touch' approach—where aggressive, damaging substances were replaced with premium precise techniques, and where communication was as clear as the glass we polished.
            </p>
            
            <div className="bg-slate-bg p-6 rounded-lg border border-border-soft border-l-4 border-l-secondary my-8 shadow-xs">
              <p className="font-rubik text-xl md:text-2xl italic text-zinc-700 leading-normal">
                "We don't just sell cleaning. We sell the peace of mind that comes when you walk into a pristine room."
              </p>
            </div>
            
            <p>
              Today, MAXFMS serves hundreds of homes and corporate offices, maintaining the exact same exacting standards we started with. Our team has grown, but our core philosophy remains unchanged: every space deserves to shine.
            </p>
          </div>
        </motion.div>

      </section>
    </motion.div>
  );
}
