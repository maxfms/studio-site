/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Product } from '../types';
import { Check, Eye, DownloadCloud, FileText } from 'lucide-react';
import showroomImage from '../assets/images/maxfms_cleaners_showroom_1781875584826.jpg';

interface ProductsViewProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductsView({ onAddToCart }: ProductsViewProps) {
  const [addedItemName, setAddedItemName] = useState<string | null>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const catalogPdfs = [
    {
      id: 'all-categories',
      title: 'All Categories Catalogue',
      description: 'A complete catalogue covering every product category in one brochure.',
      fileUrl: new URL('../assets/maxfms catalogue/catalogue (all categories).pdf', import.meta.url).href,
    },
    {
      id: 'floor-care',
      title: 'Floor Care',
      description: 'Complete flooring and surface maintenance guide for professionals.',
      fileUrl: new URL('../assets/maxfms catalogue/floor care.pdf', import.meta.url).href,
    },
    {
      id: 'hand-personal-care',
      title: 'Hand & Personal Care',
      description: 'Safe, gentle personal care formulas for every environment.',
      fileUrl: new URL('../assets/maxfms catalogue/hand and personal care.pdf', import.meta.url).href,
    },
    {
      id: 'kitchen-cleaning-degreasing',
      title: 'Kitchen Cleaning & Degreasing',
      description: 'High-performance kitchen cleaning and degreasing solutions.',
      fileUrl: new URL('../assets/maxfms catalogue/kitchen cleaning and degreasing.pdf', import.meta.url).href,
    },
    {
      id: 'laundry-fabric-carpet-care',
      title: 'Laundry, Fabric & Carpet Care',
      description: 'Specialized laundry, fabric and carpet care products for deep-cleaning.',
      fileUrl: new URL('../assets/maxfms catalogue/laundry fabric and carpet care.pdf', import.meta.url).href,
    },
    {
      id: 'surface-glass-air-care',
      title: 'Surface, Glass & Air Care',
      description: 'Premium care products for glass, air quality, and high-touch surfaces.',
      fileUrl: new URL('../assets/maxfms catalogue/surface glass and air care.pdf', import.meta.url).href,
    },
    {
      id: 'tools-equipment-accessories',
      title: 'Tools, Equipment & Accessories',
      description: 'Accessories and tools engineered for professional cleaning workflows.',
      fileUrl: new URL('../assets/maxfms catalogue/tools equipment and accessories.pdf', import.meta.url).href,
    },
    {
      id: 'warewash-dishwash',
      title: 'Warewash & Dishwash',
      description: 'Specialized warewashing solutions for kitchens and hospitality.',
      fileUrl: new URL('../assets/maxfms catalogue/warewash and dishwash.pdf', import.meta.url).href,
    },
    {
      id: 'washroom-toilet-care',
      title: 'Washroom & Toilet Care',
      description: 'Hygienic washroom care systems for spotless commercial spaces.',
      fileUrl: new URL('../assets/maxfms catalogue/washroom and toilet care.pdf', import.meta.url).href,
    },
  ];


  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in">
      {/* Toast Notification */}
      {addedItemName && (
        <div className="fixed top-24 right-4 z-50 bg-primary-container text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up font-nunito text-sm font-semibold border border-white/20">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>Added {addedItemName} to cart successfully!</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 mb-16 md:mb-24 pt-4 md:pt-10">
        <div className="flex-1 space-y-6">
          <span className="bg-primary-fixed-dim/30 text-primary px-3.5 py-1.5 rounded-full font-hanken font-bold text-xs uppercase tracking-wider mb-2 inline-block">
            Eco-Friendly Essentials
          </span>
          <h1 className="font-rubik text-4xl md:text-5xl font-bold text-zinc-800 leading-tight tracking-tight">
            Crystal Clear Results,<br />Naturally Formulated.
          </h1>
          <p className="font-nunito text-lg text-zinc-500 max-w-xl leading-relaxed">
            Experience the aura of clean with our premium, plant-based cleaning solutions. Designed for uncompromising efficacy without harsh chemicals, perfect for maintaining a pristine environment.
          </p>
          <div className="pt-4">
            <button 
              onClick={scrollToCatalog}
              className="btn-cta px-8 py-3.5 rounded-lg font-hanken font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full relative">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/50 bg-white transition-all hover:scale-[1.01] hover:shadow-primary/5 duration-500 relative">
            <img
              alt="MAXFMS Showroom and Product Collection"
              className="object-cover w-full h-full select-none"
              src={showroomImage}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* PDF Catalogue Section */}
      <section ref={catalogRef} className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-lg mb-16">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-primary font-hanken font-bold uppercase tracking-[0.35em] text-xs mb-3">
              Download Catalogues
            </p>
            <h2 className="font-rubik text-3xl md:text-4xl font-bold text-zinc-850 tracking-tight mb-3">
              Explore our category catalogues in PDF.
            </h2>
            <p className="text-zinc-500 font-nunito text-base leading-relaxed">
              View and download professionally designed catalogue brochures for every product category, available instantly in high-resolution PDF format.
            </p>
          </div>
          <button
            onClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-container active:scale-[0.98]"
          >
            Browse Catalogues
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {catalogPdfs.map((catalog) => (
            <article key={catalog.id} className="group rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="font-hanken text-[10px] uppercase tracking-[0.35em] text-primary mb-1">
                    Category Catalogue
                  </p>
                  <h3 className="font-rubik text-xl font-bold text-zinc-850">
                    {catalog.title}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <p className="font-nunito text-sm text-zinc-500 leading-relaxed mb-6">
                {catalog.description}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={catalog.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-4 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
                >
                  <Eye className="w-4 h-4" />
                  <span>View PDF</span>
                </a>
                <a
                  href={catalog.fileUrl}
                  download={`${catalog.title}.pdf`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-container"
                >
                  <DownloadCloud className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
