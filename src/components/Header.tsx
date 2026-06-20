/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, ShoppingCart, User, Check, History, LogOut } from 'lucide-react';
import logoImage from '../assets/images/mms_logo_1781794241857.jpg';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onBookNow: () => void;
  cartCount: number;
  onOpenCart: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  onBookNow,
  cartCount,
  onOpenCart,
  isLoggedIn,
  setIsLoggedIn,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const executeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'portal', label: 'App Portal' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-white border-b border-zinc-200 shadow-xs transition-all duration-200 h-20">
        <div className="grid grid-cols-3 items-center px-gutter max-w-container-max mx-auto h-full">
          {/* Left: Logo */}
          <div className="flex items-center gap-2.5 col-start-1">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 active:scale-95 transition-transform cursor-pointer animate-fade-in"
            >
              <img
                src={logoImage}
                alt="MMS - MAX Management Solutions Logo"
                referrerPolicy="no-referrer"
                className="h-16 w-16 object-contain rounded-lg"
              />
            </button>
          </div>

          {/* Center: Navigation (centered so both sides have equal spacing) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 justify-center col-start-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                    className={`px-4 py-2 rounded-lg font-nunito text-base transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? 'text-primary font-bold border-b-2 border-primary rounded-none px-4 py-2.5'
                      : 'text-zinc-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions + Mobile Menu Button */}
          <div className="flex items-center justify-end col-start-3 gap-4">
            {/* Desktop actions placeholder (kept for future action icons) */}
            <div className="hidden md:flex items-center gap-4">
              {/* place for cart, user, etc. if needed */}
            </div>

            {/* Mobile Actions Overlay */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-650 p-2 rounded-md hover:bg-zinc-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-border-soft shadow-lg animate-fade-in z-30">
            <div className="p-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-nunito text-base transition-colors whitespace-nowrap ${
                    currentPage === link.id
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNow();
                }}
                className="w-full text-center bg-primary text-white py-3 rounded-full font-hanken font-bold mt-2 hover:bg-primary-container active:scale-99 transition-transform"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-border-soft animate-slide-up relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1.5 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent font-rubik">
                  MAXFMS
                </span>
                <p className="text-zinc-500 font-nunito text-sm mt-1.5">
                  Sign in to manage your facilities and view active quotes.
                </p>
              </div>

              <form onSubmit={executeLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-hanken font-bold hover:bg-primary-container transition-all shadow-sm active:scale-98"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-zinc-100 text-center text-xs text-zinc-400">
                Demo Accounts enabled. Simply enter any credential to continue.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
