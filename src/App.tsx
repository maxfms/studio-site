/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId, Product, Booking, Inquiry, CartItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import ProductsView from './components/ProductsView';
import ContactView from './components/ContactView';
import TestimonialsView from './components/TestimonialsView';
import PortalView from './components/PortalView';
import UserDashboard from './components/UserDashboard';
import BookingWizard from './components/BookingWizard';
import CartDrawer from './components/CartDrawer';
import { motion, AnimatePresence } from 'motion/react';
import { getPageSeo, buildFaqSchema, buildServiceSchema } from './seoUtils';
import { buildLocalBusinessSchema } from './seoData';

import {
  getStoredBookings,
  saveStoredBookings,
  getStoredInquiries,
  saveStoredInquiries,
  getStoredCart,
  saveStoredCart
} from './utils';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for robust out-of-the-box demo

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const currentSeo = getPageSeo(currentPage);
  const currentPath = currentPage === 'home' ? '/' : `/${currentPage}`;
  const faqSchema = buildFaqSchema([
    {
      question: 'Do you provide AC, floor and deep cleaning in Hyderabad and nearby cities?',
      answer: 'Yes. MAXFMS offers AC cleaning, floor cleaning, deep cleaning, sofa and carpet cleaning, kitchen and bathroom cleaning, tank cleaning and office housekeeping across Andhra Pradesh and Telangana.'
    },
    {
      question: 'Are your cleaning products safe for homes and offices?',
      answer: 'We focus on safe, practical cleaning solutions and use methods suited to the surface, space and cleaning goal.'
    },
    {
      question: 'Can I book a one-time cleaning service or a regular plan?',
      answer: 'Yes. You can book a one-time visit or arrange regular service for homes, offices and commercial properties.'
    }
  ]);
  const serviceSchema = buildServiceSchema('Residential and Commercial Cleaning Services', currentPath);
  const localBusinessSchema = buildLocalBusinessSchema(currentPath);

  useEffect(() => {
    document.title = currentSeo.title;

    const descriptionTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (descriptionTag) {
      descriptionTag.setAttribute('content', currentSeo.description);
    } else {
      const newTag = document.createElement('meta');
      newTag.setAttribute('name', 'description');
      newTag.setAttribute('content', currentSeo.description);
      document.head.appendChild(newTag);
    }

    const robotsTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (robotsTag) {
      robotsTag.setAttribute('content', 'index,follow');
    } else {
      const newTag = document.createElement('meta');
      newTag.setAttribute('name', 'robots');
      newTag.setAttribute('content', 'index,follow');
      document.head.appendChild(newTag);
    }

    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', `${window.location.origin}${currentSeo.canonicalPath}`);

    const schemaIds = ['maxfms-local-business-schema', 'maxfms-faq-schema', 'maxfms-service-schema'];
    schemaIds.forEach((id) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
    });

    const addSchema = (id: string, data: unknown) => {
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addSchema('maxfms-local-business-schema', localBusinessSchema);
    addSchema('maxfms-faq-schema', faqSchema);
    addSchema('maxfms-service-schema', serviceSchema);
  }, [currentSeo.title, currentSeo.description, currentSeo.canonicalPath, faqSchema, localBusinessSchema, serviceSchema]);

  // Initialize data on mount
  useEffect(() => {
    setBookings(getStoredBookings());
    setInquiries(getStoredInquiries());
    setCartItems(getStoredCart());
  }, []);

  // Clear preselectedService when leaving contact page
  useEffect(() => {
    if (currentPage !== 'contact') {
      setPreselectedService('');
    }
  }, [currentPage]);

  // Scroll to the top of the browser window on page shift
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Sync state to localStorage
  const handleAddToCart = (product: Product) => {
    const updated = [...cartItems];
    const existing = updated.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      updated.push({ product, quantity: 1 });
    }
    setCartItems(updated);
    saveStoredCart(updated);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updated = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updated);
    saveStoredCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.product.id !== productId);
    setCartItems(updated);
    saveStoredCart(updated);
  };

  const handleClearCart = () => {
    setCartItems([]);
    saveStoredCart([]);
  };

  const handleAddInquiry = (newInq: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const fullInq: Inquiry = {
      ...newInq,
      id: 'inq-' + Math.floor(Math.random() * 900000 + 100000),
      createdAt: new Date().toISOString()
    };
    const updated = [fullInq, ...inquiries];
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveStoredBookings(updated);
    
    // Automatically switch tabs to dashboard so they can immediately see their scheduled visited slots!
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 500);
  };

  const handleCancelBooking = (bookingId: string) => {
    const isConfirmed = window.confirm("Are you sure you would like to cancel this cleaning appointment?");
    if (!isConfirmed) return;

    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    saveStoredBookings(updated);
  };

  const handleRequestQuoteFromServices = (serviceName: string) => {
    // Map any custom service name to match ContactView dropdown options exactly
    let matchedService = '';
    const nameLower = serviceName.toLowerCase();
    if (nameLower.includes('residential')) {
      matchedService = 'Residential Cleaning';
    } else if (nameLower.includes('commercial') || nameLower.includes('office')) {
      matchedService = 'Commercial Office';
    } else if (nameLower.includes('deep')) {
      matchedService = 'Deep Clean Service';
    } else if (nameLower.includes('move')) {
      matchedService = 'Move-In / Move-Out';
    } else {
      matchedService = serviceName;
    }
    setPreselectedService(matchedService);
    setCurrentPage('contact');
  };

  const handleGlobalBookNow = () => {
    setPreselectedService('');
    setIsBookingOpen(true);
  };

  // Compute overall cart items counter
  const totalCartItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="bg-slate-bg text-zinc-800 font-nunito antialiased min-h-screen flex flex-col justify-between selection:bg-primary-fixed selection:text-on-primary-fixed-variant">
      
      {/* Top sticky blurred navigation bar */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onBookNow={handleGlobalBookNow}
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main coordinates content panel with gorgeous hardware-accelerated animations */}
      <main className="flex-grow pt-[100px] pb-20 w-full px-4 md:px-8 max-w-container-max mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {currentPage === 'home' && (
              <HomeView
                onBookNow={handleGlobalBookNow}
                setCurrentPage={setCurrentPage}
              />
            )}
            {currentPage === 'about' && <AboutView />}
            {currentPage === 'products' && (
              <ProductsView onAddToCart={handleAddToCart} />
            )}
            {currentPage === 'services' && (
              <ServicesView onRequestQuote={handleRequestQuoteFromServices} />
            )}
            {currentPage === 'contact' && (
              <ContactView 
                onAddInquiry={handleAddInquiry} 
                preselectedService={preselectedService}
              />
            )}
            {currentPage === 'testimonials' && (
              <TestimonialsView />
            )}
            {currentPage === 'portal' && (
              <PortalView
                onBookNow={handleGlobalBookNow}
                onGoToProducts={() => setCurrentPage('products')}
              />
            )}
            {currentPage === 'dashboard' && (
              <UserDashboard
                bookings={bookings}
                inquiries={inquiries}
                onCancelBooking={handleCancelBooking}
                onBookSession={handleGlobalBookNow}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Social and resources footer coordinates */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Multi-step appointment Booking Wizard Overlay modal */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedService}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Right sliding Shopping Basket Drawer panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
