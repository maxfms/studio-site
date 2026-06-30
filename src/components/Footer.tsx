/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { Globe, AtSign, ShieldAlert, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-150/70 border-t border-border-soft w-full py-16 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-gutter max-w-container-max mx-auto mb-12">
        {/* Brand Column */}
        <div className="space-y-4 col-span-1 md:col-span-1">
          <button
            onClick={() => handleNav('home')}
            className="font-rubik text-2xl font-bold bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent flex items-center gap-1 cursor-pointer outline-none active:scale-95 transition-transform"
          >
            MAXFMS
          </button>
          <p className="font-nunito text-sm text-zinc-500 leading-relaxed max-w-xs">
            Passion of Cleaning.
          </p>
          <p className="font-nunito text-sm text-zinc-500 leading-relaxed max-w-xs">
            Bringing the MAXFMS standard of absolute facility care and integrated solutions to your residential and commercial spaces.
          </p>
        </div>

        {/* Company Column */}
        <div className="space-y-4">
          <h4 className="font-hanken font-bold text-xs text-zinc-750 uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-2.5 font-nunito text-sm">
            <li>
              <button
                onClick={() => handleNav('about')}
                className="text-zinc-500 hover:text-primary transition-colors cursor-pointer outline-none"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('testimonials')}
                className="text-zinc-500 hover:text-primary transition-colors cursor-pointer outline-none"
              >
                Testimonials
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('portal')}
                className="text-zinc-500 hover:text-primary transition-colors cursor-pointer outline-none"
              >
                App Portal
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('services')}
                className="text-zinc-500 hover:text-primary transition-colors cursor-pointer outline-none"
              >
                Service Areas
              </button>
            </li>
            <li>
              <a
                href="#terms"
                className="text-zinc-500 hover:text-primary transition-colors"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="space-y-4">
          <h4 className="font-hanken font-bold text-xs text-zinc-750 uppercase tracking-widest">
            Support
          </h4>
          <ul className="space-y-2.5 font-nunito text-sm">
            <li>
              <button
                onClick={() => handleNav('contact')}
                className="text-zinc-500 hover:text-primary transition-colors cursor-pointer outline-none"
              >
                FAQ &amp; Support Ticket
              </button>
            </li>
            <li>
              <a
                href="#terms"
                className="text-zinc-500 hover:text-primary transition-colors"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Trust & Social Media Column */}
        <div className="space-y-4">
          <h4 className="font-hanken font-bold text-xs text-zinc-750 uppercase tracking-widest">
            Our Ecosystem
          </h4>
          <p className="font-nunito text-xs text-zinc-450 leading-relaxed">
            Fully certified by international sanitary councils and carbon offset credits groups.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-200 text-center font-nunito text-xs text-zinc-450 max-w-container-max mx-auto px-gutter space-y-3">
        <span>© 2026 MAXFMS Facility Management Services. All rights reserved.</span>
        <div className="flex justify-center gap-4">
          <a href="#terms" className="text-zinc-500 hover:text-primary transition-colors">
            Terms and Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
