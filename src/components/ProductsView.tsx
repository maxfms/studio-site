/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { productsList } from '../data';
import { Product } from '../types';
import { Search, SlidersHorizontal, Check, ShoppingBag, Star, Eye } from 'lucide-react';
import { formatCurrency } from '../utils';
import ProductDetailView from './ProductDetailView';
import showroomImage from '../assets/images/maxfms_cleaners_showroom_1781875584826.jpg';

interface ProductsViewProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductsView({ onAddToCart }: ProductsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const catalogRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Eco-Friendly Essentials', 'Gentle Cleansing'];

  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedItemName(product.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2500);
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (selectedProduct) {
    return (
      <ProductDetailView 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart}
      />
    );
  }

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

      {/* Product Catalog Section */}
      <section ref={catalogRef} className="space-y-8 scroll-mt-24 pt-4 mb-24">
        
        {/* Catalog Header with Search & Filter Controls */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end border-b border-border-soft pb-6 gap-6">
          <div>
            <h2 className="font-rubik text-3xl font-bold text-zinc-800 tracking-tight">
              Our Products
            </h2>
            <p className="text-zinc-500 font-nunito text-base mt-2">
              Professional grade formulations, completely safe for home and office.
            </p>
          </div>

          {/* Filtering Widgets */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-zinc-100 border border-zinc-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all font-nunito"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Filter Selector */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-56 bg-zinc-100 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm appearance-none outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all font-nunito pr-10 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="skeuomorphic-card overflow-hidden group rounded-xl p-4 flex flex-col justify-between bg-white h-full relative cursor-pointer hover:shadow-md transition-all duration-300 border border-zinc-200/40"
              >
                {/* Image backdrop */}
                <div>
                  <div className="aspect-square bg-zinc-50 rounded-lg overflow-hidden p-6 relative flex items-center justify-center shadow-inner border border-zinc-100 mb-4">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="object-contain w-full h-full transform group-hover:scale-106 duration-500 select-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Tiny Featured Label */}
                    <div className="absolute top-2 left-2 bg-white/95 text-yellow-600 px-2 py-0.5 rounded text-[10px] font-bold shadow-xs flex items-center gap-0.5 border border-zinc-100">
                      <Star className="w-2.5 h-2.5 fill-yellow-500 stroke-yellow-500" />
                      <span>4.9 Rating</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-rubik text-lg font-bold text-zinc-800 leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-hanken font-bold text-sm text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    
                    <p className="font-nunito text-sm text-zinc-500 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-lg font-hanken font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-97"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-border-soft rounded-2xl max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-rubik text-xl font-bold text-zinc-700">No products found</h3>
            <p className="font-nunito text-zinc-400 mt-2">
              We couldn't find items matches your search/category filters. Try resetting the criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-6 text-sm font-semibold font-nunito text-primary hover:underline transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>
    </div>
  );
}
