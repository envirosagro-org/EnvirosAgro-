import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { View } from '../types';

interface CartProps {
  onNavigate: (view: View) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-12 border border-earth-100 dark:border-earth-800 shadow-sm">
          <div className="w-20 h-20 bg-earth-50 dark:bg-earth-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-earth-300" />
          </div>
          <h2 className="text-2xl font-bold text-earth-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-earth-600 dark:text-earth-400 mb-8">Looks like you haven't added any strategic assets to your cart yet.</p>
          <button 
            onClick={() => onNavigate(View.PRODUCTS)}
            className="inline-flex items-center gap-2 bg-agro-600 hover:bg-agro-500 text-white font-black uppercase text-[10px] tracking-[0.3em] py-4 px-8 rounded-2xl shadow-lg transition-all"
          >
            Go to Marketplace <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-agro-900 dark:text-white">Strategic Inventory</h2>
          <p className="text-earth-600 dark:text-earth-400 mt-2">Review your selected tools and resources before deployment.</p>
        </div>
        <div className="bg-agro-50 dark:bg-agro-900/20 px-6 py-3 rounded-2xl border border-agro-100 dark:border-agro-800">
           <span className="text-[10px] font-black uppercase tracking-widest text-agro-600 dark:text-agro-400 block mb-1">Total Items</span>
           <span className="text-xl font-bold text-agro-900 dark:text-agro-100">{totalItems} Assets</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white dark:bg-earth-900 rounded-[2rem] p-4 border border-earth-100 dark:border-earth-800 shadow-sm flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-earth-50 dark:border-earth-800">
                <SafeImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-earth-900 dark:text-white">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-earth-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                   <div className="flex items-center gap-3 bg-earth-50 dark:bg-earth-800 p-1 rounded-xl border border-earth-100 dark:border-earth-700">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-white dark:hover:bg-earth-700 rounded-lg transition-colors text-earth-600 dark:text-earth-300"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-6 text-center text-earth-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-white dark:hover:bg-earth-700 rounded-lg transition-colors text-earth-600 dark:text-earth-300"
                      >
                        <Plus size={14} />
                      </button>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-0.5">Subtotal</p>
                      <p className="text-lg font-bold text-agro-600">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                   </div>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => onNavigate(View.PRODUCTS)}
            className="flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[9px] uppercase tracking-[0.3em] transition-all group pt-4"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Continue Browsing Hub
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-earth-900 dark:bg-black rounded-[2.5rem] p-8 text-white shadow-xl sticky top-32">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <ShoppingBag size={24} className="text-agro-500" /> Deployment Summary
            </h3>
            
            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-sm">
                  <span className="text-earth-400">Total Assets</span>
                  <span className="font-bold">{totalItems}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-earth-400">Shipping (CO2 Offset)</span>
                  <span className="text-agro-500 font-bold">FREE</span>
               </div>
               <div className="h-px bg-white/10 my-4"></div>
               <div className="flex justify-between items-end">
                  <span className="text-earth-400 text-[10px] font-black uppercase tracking-widest">Total Investment</span>
                  <span className="text-3xl font-bold text-agro-400">${totalPrice.toFixed(2)}</span>
               </div>
            </div>

            <button className="w-full bg-agro-600 hover:bg-agro-500 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl shadow-xl transition-all active:scale-95 mb-4">
               Initialize Checkout
            </button>
            
            <div className="flex items-center justify-center gap-2 text-[9px] font-black text-earth-500 uppercase tracking-widest">
               <ArrowRight size={12} /> Secure Sync Protocol Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
