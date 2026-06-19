/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Product } from '../types';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Star, 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Leaf, 
  Sparkles 
} from 'lucide-react';
import { formatCurrency } from '../utils';
import { motion } from 'motion/react';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailView({ product, onBack, onAddToCart }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2500);
  };

  // Generate specific rich details based on the product to add deep craftsmanship
  const getEcoSpecs = (prodId: string) => {
    switch (prodId) {
      case 'prod-1':
        return {
          scent: 'Citrus Zest & Wild Orange',
          ingredients: 'Purified Water, Decyl Glucoside (corn-derived surfactant), Orange Essential Oil, Sodium Carbonate.',
          instructions: 'Spray directly on tiles, wood, stones, or countertops. Wipe clean with a reusable microfiber cloth.'
        };
      case 'prod-2':
        return {
          scent: 'Sweet Aloe & Green Tea',
          ingredients: 'Water, Lauryl Glucoside, Organic Aloe Vera Extract, Citric Acid, Sea Salt, Green Tea scent.',
          instructions: 'Apply a small pump directly onto a damp sponge. Lather well, rinse dishes thoroughly with warm water.'
        };
      case 'prod-3':
        return {
          scent: 'Mint Infused Air',
          ingredients: 'Ethanol (derived from sugar cane), Coco-Glucoside, Peppermint Hydrosol, Citric Acid.',
          instructions: 'Mist fine spray onto glass, mirrors, or steel. Polish immediately using a tight weave micro-fiber towel.'
        };
      case 'prod-4':
        return {
          scent: 'Coordinated Botanical Set',
          ingredients: 'Assorted pure therapeutic grade essential oils, plant glycosides, and reusable amber glassware.',
          instructions: 'Your matching collection includes All-Purpose, Dish Soap, and Glass cleaner formulations.'
        };
      case 'prod-5':
        return {
          scent: 'Cool Eucalyptus & Pine Needles',
          ingredients: 'Distilled Water, Organic Eucalyptus Globulus leaf oil, Balsam Pine needle oil, Vegetable Solubilizer.',
          instructions: 'Spurt 2-3 sprays upward into the center of any room to completely neutralize odors. Avoid eyes.'
        };
      default:
        return {
          scent: 'Fresh Lavender & Bergamond',
          ingredients: 'Saponified Coconut Oil, Baking Soda, Essential Oil Formulations, Purified Distilled Water.',
          instructions: 'Gently mist or spray from a short distance and wipe using a soft clean sponge.'
        };
    }
  };

  const specs = getEcoSpecs(product.id);

  return (
    <div className="max-w-5xl mx-auto py-6 animate-fade-in px-4">
      
      {/* Toast Notification */}
      {isAdded && (
        <div className="fixed top-24 right-4 z-50 bg-primary-container text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up font-nunito text-sm font-semibold border border-white/20">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>Added {quantity} {product.name} to cart successfully!</span>
        </div>
      )}

      {/* Breadcrumb / Back button */}
      <button 
        onClick={onBack}
        className="group inline-flex items-center gap-2 font-hanken font-bold text-xs uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors mb-8 cursor-pointer outline-none"
      >
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Collection</span>
      </button>

      {/* Main product showcase columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Large Product Image Card */}
        <div className="md:col-span-5 w-full">
          <div className="skeuomorphic-card overflow-hidden p-6 bg-white rounded-2xl border border-zinc-200/50 shadow-sm">
            <div className="aspect-square bg-zinc-50/50 rounded-xl overflow-hidden p-8 flex items-center justify-center border border-zinc-100/80 relative">
              <motion.img 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                src={product.image} 
                alt={product.name} 
                className="object-contain w-full h-full max-h-[350px] select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-yellow-600 px-3 py-1 rounded-md text-xs font-bold shadow-xs flex items-center gap-1 border border-zinc-150">
                <Star className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />
                <span>4.9 / 5.0 Rating</span>
              </div>
            </div>
            
            {/* Value Indicators under the main photo card */}
            <div className="grid grid-cols-3 gap-3 mt-6 text-center">
              <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-100 flex flex-col items-center justify-center space-y-1">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="font-nunito text-[10px] font-bold uppercase tracking-wider text-zinc-500">100% Eco</span>
              </div>
              <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-100 flex flex-col items-center justify-center space-y-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-nunito text-[10px] font-bold uppercase tracking-wider text-zinc-500">Pet Safe</span>
              </div>
              <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-100 flex flex-col items-center justify-center space-y-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-nunito text-[10px] font-bold uppercase tracking-wider text-zinc-500">Non-Toxic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copywriting Specifications, Pricing, Interactions */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="bg-primary/15 text-primary px-3 py-1 rounded-full font-hanken font-bold text-[10px] uppercase tracking-wider inline-block">
              {product.category}
            </span>
            <h1 className="font-rubik text-3xl md:text-4xl font-bold text-zinc-800 tracking-tight leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 font-nunito text-sm text-zinc-500">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-current" />
                ))}
              </div>
              <span>(148 certified shopper reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 py-3 border-y border-zinc-150">
            <span className="font-hanken font-bold text-3xl text-primary">
              {formatCurrency(product.price)}
            </span>
            <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold uppercase tracking-wider font-nunito">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>In Stock & Ready to Ship</span>
            </div>
          </div>

          <p className="font-nunito text-base text-zinc-650 leading-relaxed whitespace-pre-line">
            {product.description} Our active botanic elements safely wash away grease and film, bringing an undeniable pristine freshness back into your daily spaces.
          </p>

          {/* Expanded Rich Specifications Panel */}
          <div className="bg-white rounded-xl border border-zinc-200/60 p-5 space-y-4">
            <h3 className="font-rubik font-bold text-zinc-800 text-sm tracking-wide uppercase border-b border-zinc-100 pb-2 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-600" />
              <span>Formulation Integrity</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-nunito text-sm text-zinc-650">
              <div className="space-y-1">
                <span className="font-bold text-zinc-500 text-xs uppercase tracking-wide block">Essential Scent Profile</span>
                <span>{specs.scent}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-zinc-500 text-xs uppercase tracking-wide block">Safe Usage Directions</span>
                <span>{specs.instructions}</span>
              </div>
              <div className="sm:col-span-2 space-y-1 mt-1 pt-3 border-t border-zinc-100">
                <span className="font-bold text-zinc-500 text-xs uppercase tracking-wide block">Selected Botanical Ingredients</span>
                <span className="italic leading-relaxed text-zinc-550 block">{specs.ingredients}</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector and Checkout Addition */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Quantity box */}
            <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-lg p-1 max-w-[150px] justify-between">
              <button 
                onClick={handleDecrement}
                className="w-9 h-9 flex items-center justify-center hover:bg-white rounded text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-hanken font-bold text-base text-zinc-800 px-3 min-w-[32px] text-center select-none">
                {quantity}
              </span>
              <button 
                onClick={handleIncrement}
                className="w-9 h-9 flex items-center justify-center hover:bg-white rounded text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-container text-white py-3.5 px-8 rounded-lg font-hanken font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span>Add Items to Basket - {formatCurrency(product.price * quantity)}</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 text-xs font-nunito text-zinc-450">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" /> Carbon-neutral local shipping
            </span>
            <span className="hidden sm:inline text-zinc-300">•</span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" /> 100% Satisfaction cash-back policy
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
