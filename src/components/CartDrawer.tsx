/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  };

  const calculatedTax = () => calculateSubtotal() * 0.08; // 8% state sales tax
  
  const calculateTotal = () => {
    const sub = calculateSubtotal();
    return sub > 0 ? sub + calculatedTax() + 150 : 0; // ₹150 shipping and handling
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-900/60 backdrop-blur-xs animate-fade-in">
      {/* Tap outside backdrop */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Cart Container Drawer */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-zinc-150 animate-slide-up">
        
        {/* Top Header info */}
        <div className="flex justify-between items-center p-6 bg-slate-bg border-b border-border-soft">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5.5 h-5.5 text-primary" />
            <h2 className="font-rubik text-xl font-bold text-zinc-800">Your Basket</h2>
            {cartItems.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 p-1.5 hover:bg-zinc-200/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list content */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6 font-nunito">
          {checkoutComplete ? (
            <div className="text-center py-12 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 border border-green-200 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-rubik text-2xl font-bold text-zinc-800">Order Dispatched!</h3>
                <p className="text-zinc-400 text-sm max-w-xs mx-auto leading-relaxed">
                  Excellent choice. We've compiled your eco-friendly formulas and scheduled immediate cargo courier handoff! Track updates via email.
                </p>
              </div>
              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  onClose();
                }}
                className="bg-primary text-white font-hanken font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg hover:bg-primary-container shadow-xs cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 border border-border-soft rounded-xl p-4 bg-zinc-50/20 shadow-xs relative"
                >
                  {/* Photo container */}
                  <div className="w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-2 border border-zinc-200">
                    <img
                      alt={item.product.name}
                      src={item.product.image}
                      className="object-contain w-full h-full select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Descriptions layout */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-zinc-800 text-sm leading-tight uppercase tracking-wide">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-zinc-350 hover:text-red-500 p-1 rounded-md transition-colors cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-zinc-400 text-xs mt-0.5 block">{item.product.category}</span>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Price per item */}
                      <span className="font-bold text-primary text-sm">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-zinc-200 bg-white rounded-md p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-100 rounded-md text-zinc-500 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-zinc-800 min-w-[1.2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-100 rounded-md text-zinc-500 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="w-14 h-14 text-zinc-200 mx-auto mb-4" />
              <h3 className="font-rubik text-lg font-bold text-zinc-700">Empty Basket</h3>
              <p className="text-zinc-450 leading-relaxed text-sm max-w-xs mx-auto mt-2">
                There are no plant-based sanitizers in your cart yet. Check out our high-efficiency products collection!
              </p>
            </div>
          )}
        </div>

        {/* Bottom Checkout details panel */}
        {!checkoutComplete && cartItems.length > 0 && (
          <div className="p-6 bg-slate-bg border-t border-border-soft space-y-4 shrink-0 font-nunito text-sm">
            <div className="space-y-2 border-b border-zinc-200 pb-3">
              <div className="flex justify-between text-zinc-500">
                <span>Basket Subtotal:</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Estimated Sales Tax (8%):</span>
                <span>{formatCurrency(calculatedTax())}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Ground Cargo shipping:</span>
                <span>{formatCurrency(150)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-zinc-850 font-bold mb-4">
              <span className="text-base uppercase tracking-wider">Estimated Total</span>
              <span className="text-2xl font-rubik text-primary">{formatCurrency(calculateTotal())}</span>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              <span className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
                Purchase secured. Non-toxic guarantee holds for all packaged sanitizers.
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-secondary-container hover:bg-opacity-95 text-white py-4 rounded-lg font-hanken font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-all outline-none"
            >
              {isCheckingOut ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Authorizing Secure Gateway...</span>
                </>
              ) : (
                <>
                  <span>Checkout Now</span>
                  <ArrowRight className="w-4.5 h-4.5 text-white" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
