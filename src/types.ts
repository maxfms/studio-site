/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'about' | 'products' | 'services' | 'contact' | 'dashboard' | 'testimonials' | 'portal';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  dataAlt?: string;
  isFeatured?: boolean;
}

export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial';
  badge: string;
  features: string[];
  image: string;
  estimatedPrice: number;
}

export interface Booking {
  id: string;
  serviceType: string;
  serviceCategory: 'residential' | 'commercial';
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  specialRequirements: string;
  totalEstimatedPrice: number;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  serviceInterest: string;
  message: string;
  status: 'received' | 'replied';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
