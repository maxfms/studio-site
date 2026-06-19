/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Booking, Inquiry, CartItem } from './types';

export const getStoredBookings = (): Booking[] => {
  try {
    const raw = localStorage.getItem('auraclean_bookings');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored bookings list', e);
  }
  return [
    {
      id: 'book-demo-1',
      serviceType: 'Residential Deep Cleaning',
      serviceCategory: 'residential',
      date: '2026-06-25',
      time: '10:00 AM',
      firstName: 'Jaya',
      lastName: 'Sharma',
      email: 'jaya@example.in',
      phone: '+91 98765 43210',
      frequency: 'once',
      specialRequirements: 'Eco-safe products and sanitization premium options.',
      totalEstimatedPrice: 5999,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }
  ];
};

export const saveStoredBookings = (bookings: Booking[]) => {
  localStorage.setItem('auraclean_bookings', JSON.stringify(bookings));
};

export const getStoredInquiries = (): Inquiry[] => {
  try {
    const raw = localStorage.getItem('auraclean_inquiries');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse inquiries list', e);
  }
  return [];
};

export const saveStoredInquiries = (inquiries: Inquiry[]) => {
  localStorage.setItem('auraclean_inquiries', JSON.stringify(inquiries));
};

export const getStoredCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem('auraclean_cart');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse shopping cart list', e);
  }
  return [];
};

export const saveStoredCart = (cart: CartItem[]) => {
  localStorage.setItem('auraclean_cart', JSON.stringify(cart));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};
