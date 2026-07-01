/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Sparkles, Star, MessageSquare, CheckCircle2, X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: 'residential' | 'commercial' | 'deep-clean';
  rating: number;
  quote: string;
  date: string;
  image: string;
  beforeAfterBrief: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Priya Sharma',
    role: 'Homeowner, Gurugram',
    category: 'residential',
    rating: 5,
    quote: 'MAXFMS transformed our busy family home. The team was exceptionally professional, and their advanced products left a fresh, non-toxic standard that lasted for days without any heavy chemical fumes.',
    date: 'June 12, 2026',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    beforeAfterBrief: 'Hardwood dust extraction and child-safe kitchen polishing.'
  },
  {
    id: 'test-2',
    name: 'Vikram Mehta',
    role: 'Facility Manager, TechSphere Bengaluru',
    category: 'commercial',
    rating: 5,
    quote: 'Maintaining an impeccable coordinate is key for our board meeting presentations and client visits. MAXFMS provides consistent, immaculate results after hours. Scalable and completely dependable.',
    date: 'May 28, 2026',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    beforeAfterBrief: 'Double-glazed panoramic glass clearing and open-plan workstation sanitizing.'
  },
  {
    id: 'test-3',
    name: 'Amit Patel',
    role: 'Penthouse Resident, Mumbai',
    category: 'deep-clean',
    rating: 5,
    quote: 'I booked their Deep Clean Service prior to hosting an anniversary dinner gala. Absolutely stellar attention to physical detail. Every window track, metallic trim, and gourmet cooker was spotless.',
    date: 'June 04, 2026',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    beforeAfterBrief: 'High-pressure marble tiling steam wash and detailed brass extraction hoods.'
  },
  {
    id: 'test-4',
    name: 'Anjali Desai',
    role: 'Cozy Loft Tenant, Pune',
    category: 'residential',
    rating: 5,
    quote: 'They restored the entire hardwood layout and window sets to what looks like initial brand-new construction! Highly responsive coordinators, fully punctual crew, and zero sticky residue.',
    date: 'April 15, 2026',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    beforeAfterBrief: 'Pre-tenancy detailed wall stain lifting and organic floor sealing.'
  },
  {
    id: 'test-5',
    name: 'Rajesh Iyer',
    role: 'Co-Working Space Operator, Delhi NCR',
    category: 'commercial',
    rating: 5,
    quote: 'Communal spaces get high-volume foot traffic daily. MAXFMS keeps our community hubs sanitary and clean. Members notice the spotless corners and natural lavender scent immediately.',
    date: 'June 10, 2026',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    beforeAfterBrief: 'Acoustic booths vacuuming, glass partitions polishing, and lounge restoration.'
  },
  {
    id: 'test-6',
    name: 'Kavita Reddy',
    role: 'Townhouse Owner, Hyderabad',
    category: 'deep-clean',
    rating: 5,
    quote: 'The deep sanitization of the tile and washroom tracks exceeded my expectations. Grout lines that I thought were permanently stained are now bright white. Stunning results!',
    date: 'May 14, 2026',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    beforeAfterBrief: 'Heavy mold-remediation bath track scrub and porcelain glass scale dissolving.'
  }
];

export default function TestimonialsView() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'deep-clean'>('all');
  const [activeLightbox, setActiveLightbox] = useState<Testimonial | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const filteredTestimonials = filter === 'all'
    ? INITIAL_TESTIMONIALS
    : INITIAL_TESTIMONIALS.filter((t) => t.category === filter);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return;
    const cardWidth = galleryRef.current.firstElementChild?.clientWidth ?? 0;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    galleryRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const updateActiveIndex = () => {
    if (!galleryRef.current) return;
    const scrollLeft = galleryRef.current.scrollLeft;
    const width = galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
    const progress = width ? scrollLeft / width : 0;
    setActiveIndex(Math.round(progress * (filteredTestimonials.length - 1)));
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
      className="pt-6 md:pt-12 font-nunito"
    >
      
      {/* Page Title Header banner */}
      <motion.div variants={fadeInUp} className="text-center mb-16 max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-hanken uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Clean Chronicles</span>
        </div>
        <h1 className="font-rubik text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
          Client Testimonials &amp; Gallery
        </h1>
        <p className="text-base md:text-lg text-zinc-500 leading-relaxed">
          See the breathtaking real transformation stories from our verified customers who made the premium choice with MAXFMS.
        </p>
      </motion.div>

      {/* Dynamic Tabs Filters bar */}
      <motion.div variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-2 mb-12">
        {(['all', 'residential', 'commercial', 'deep-clean'] as const).map((tab) => {
          const isActive = filter === tab;
          const labels = {
            all: 'View All stories',
            residential: 'Residential Spaces',
            commercial: 'Corporate Offices',
            'deep-clean': 'Deep Clean Highlights'
          };
          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer outline-none ${
                isActive
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50/50'
              }`}
            >
              {labels[tab]}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Grid of testimonials */}
      <motion.div 
        layout
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredTestimonials.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}
              className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-zinc-600">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>{item.category.replace('-', ' ')}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${index < item.rating ? 'fill-current' : 'text-zinc-200'}`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-zinc-600 italic text-sm leading-relaxed relative">
                      "{item.quote}"
                    </blockquote>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-400">
                  <div>
                    <h4 className="font-bold text-zinc-800 text-sm">{item.name}</h4>
                    <span className="text-[11px] block text-zinc-400 mt-0.5">{item.role}</span>
                  </div>
                  <span className="shrink-0">{item.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Gallery Section */}
      <motion.section variants={fadeInUp} className="max-w-container-max mx-auto pb-20">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Gallery</span>
          </div>
          <h2 className="font-rubik text-3xl md:text-4xl font-bold text-zinc-900 mt-4">See Our Transformations</h2>
          <p className="text-base text-zinc-500 max-w-2xl mx-auto mt-3">
            Browse the real spaces behind the stories and discover the details that make each cleanup stand out.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-950/5 p-4">
          <div className="relative">
          <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 shadow-sm backdrop-blur transition-opacity hover:opacity-100 opacity-90">
            <button
              type="button"
              onClick={() => scrollGallery('left')}
              className="p-3 text-zinc-700 hover:text-primary focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 shadow-sm backdrop-blur transition-opacity hover:opacity-100 opacity-90">
            <button
              type="button"
              onClick={() => scrollGallery('right')}
              className="p-3 text-zinc-700 hover:text-primary focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ touchAction: 'pan-x' }}
            onScroll={updateActiveIndex}
          >
            {filteredTestimonials.map((item) => (
              <div
                key={`gallery-${item.id}`}
                role="button"
                tabIndex={0}
                onClick={() => setActiveLightbox(item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveLightbox(item);
                  }
                }}
                className="snap-start min-w-[80vw] sm:min-w-[45vw] lg:min-w-[33vw] xl:min-w-[28vw] rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-xs transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-72 bg-zinc-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 h-2 rounded-full bg-zinc-200/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${Math.round((activeIndex / Math.max(filteredTestimonials.length - 1, 1)) * 100)}%` }}
            />
          </div>
        </div>
        </div>
      </motion.section>

      {/* Testimonials Lightbox details modal overlay */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs"
          >
            {/* Close trigger clicking background backdrop */}
            <div className="absolute inset-0 z-0" onClick={() => setActiveLightbox(null)} />

            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-zinc-100 max-h-[90vh] flex flex-col"
            >
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="bg-white/90 backdrop-blur-xs text-zinc-500 hover:text-zinc-800 p-2 rounded-full border border-zinc-200 transition-all cursor-pointer hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body split in vertical scrolls */}
              <div className="overflow-y-auto w-full flex flex-col">
                <div className="h-72 bg-zinc-100 w-full relative shrink-0">
                  <img
                    src={activeLightbox.image}
                    alt={activeLightbox.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-primary/95 backdrop-blur-xs text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                    Verified Transformation Archive
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div className="space-y-1 text-left">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">{activeLightbox.category.replace('-', ' ')} Service</span>
                      <h3 className="font-rubik text-2xl font-bold text-zinc-900">{activeLightbox.name}</h3>
                      <p className="text-zinc-500 text-sm">{activeLightbox.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span className="text-zinc-400 text-xs mt-0.5">Visits on {activeLightbox.date}</span>
                    </div>
                  </div>

                  {/* Review quotes */}
                  <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5 relative">
                    <MessageSquare className="w-10 h-10 text-primary/10 absolute top-4 right-4" />
                    <p className="text-zinc-600 italic text-sm md:text-base leading-relaxed relative z-10">
                      "{activeLightbox.quote}"
                    </p>
                  </div>

                  {/* Transformation highlight briefs */}
                  <div className="space-y-3">
                    <h4 className="font-rubik text-sm font-bold text-zinc-800 uppercase tracking-wider">Specific Cleaning Highlights</h4>
                    <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-800 font-bold text-sm block">Task Accomplishments</span>
                        <p className="text-zinc-600 text-xs mt-0.5 leading-relaxed">
                          {activeLightbox.beforeAfterBrief}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-bg border-t border-zinc-200 px-8 py-4 flex justify-end">
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="bg-primary text-white font-hanken font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-primary-container transition-all cursor-pointer text-center"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
