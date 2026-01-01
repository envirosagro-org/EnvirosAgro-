import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Trash2, Plus, Minus, ArrowRight, 
  ShoppingBag, ArrowLeft, ShieldCheck, 
  Zap, CreditCard, Globe, Info, CheckCircle2,
  Lock, Loader2, Database
} from 'lucide-react';
import { SafeImage } from './SafeImage';
import { View } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface CartProps {
  onNavigate: (view: View) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('EAC');

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate high-fidelity checkout sync
    setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
        toast.success("Strategic deployment initiated.");
    }, 3000);
  };

  if (isSuccess) {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 animate-in zoom-in-95">
            <div className="bg-white dark:bg-earth-900 rounded-[4rem] p-16 border border-earth-100 dark:border-earth-800 shadow-cinematic text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><CheckCircle2 size={300} /></div>
                <div className="w-24 h-24 bg-agro-50 dark:bg-agro-900/30 text-agro-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
                    <CheckCircle2 size={48} />
                </div>
                <h2 className="text-5xl font-serif font-black text-earth-900 dark:text-white mb-6 leading-tight tracking-tighter">Transmission Successful</h2>
                <p className="text-xl text-earth-500 dark:text-earth-400 mb-12 max-w-lg mx-auto font-medium">
                    Your strategic assets have been authorized for deployment. Tracking IDs and licenses have been pushed to your Node Registry.
                </p>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                    <div className="bg-earth-50 dark:bg-earth-800 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700">
                        <span className="text-[10px] font-black uppercase text-earth-400 tracking-widest block mb-1">Registry Hash</span>
                        <span className="text-xs font-mono font-bold text-agro-600">0xEA-SYNC-7F92-A4D0</span>
                    </div>
                    <div className="bg-earth-50 dark:bg-earth-800 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700">
                        <span className="text-[10px] font-black uppercase text-earth-400 tracking-widest block mb-1">Deployment Priority</span>
                        <span className="text-xs font-bold text-blue-600 uppercase">Immediate / Critical</span>
                    </div>
                </div>
                <button 
                    onClick={() => onNavigate(View.HOME)}
                    className="bg-earth-900 dark:bg-white text-white dark:text-earth-900 px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
                >
                    Back to Command Hub
                </button>
            </div>
        </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-in fade-in">
        <div className="bg-white dark:bg-earth-900 rounded-[4rem] p-20 border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><ShoppingBag size={250} /></div>
          <div className="w-24 h-24 bg-earth-50 dark:bg-earth-800 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
            <ShoppingBag size={48} className="text-earth-300" />
          </div>
          <h2 className="text-4xl font-serif font-black text-earth-900 dark:text-white mb-4 tracking-tight">Node Inventory Empty</h2>
          <p className="text-lg text-earth-500 dark:text-earth-400 mb-12 max-w-md mx-auto">Authorized assets have not been selected for deployment yet. Please browse the Marketplace.</p>
          <button 
            onClick={() => onNavigate(View.PRODUCTS)}
            className="inline-flex items-center gap-4 bg-agro-600 hover:bg-agro-500 text-white font-black uppercase text-xs tracking-[0.3em] py-5 px-12 rounded-2xl shadow-2xl shadow-agro-600/20 transition-all active:scale-95"
          >
            Access Marketplace <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 transition-colors duration-500 min-h-screen">
      
      {/* Strategic Header */}
      <header className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-12">
        <div className="max-w-2xl">
            <div className="ea-label-meta mb-4 text-agro-600">Secure Asset Deployment</div>
            <h1 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter">
                Inventory <span className="text-agro-600 italic">Checkout</span>
            </h1>
            <p className="text-xl text-earth-500 dark:text-earth-400 mt-6 font-medium leading-relaxed">
                Review and authorize the deployment of strategic agricultural resources and knowledge tokens into your node.
            </p>
        </div>
        <div className="flex gap-4">
            <div className="bg-earth-50 dark:bg-earth-900 px-8 py-5 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 flex items-center gap-6 shadow-sm">
                <div className="p-3 bg-white dark:bg-earth-800 rounded-2xl text-blue-600 shadow-inner"><Database size={24}/></div>
                <div>
                    <span className="text-[10px] font-black uppercase text-earth-400 block tracking-widest mb-1">Queue Status</span>
                    <span className="text-2xl font-black text-earth-900 dark:text-white leading-none">{totalItems} Assets</span>
                </div>
            </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Left: Inventory List */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
                <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="bg-white dark:bg-earth-900 rounded-[3rem] p-6 md:p-8 border border-earth-100 dark:border-earth-800 shadow-sm flex flex-col md:flex-row items-center gap-8 relative group hover:shadow-cinematic transition-all duration-700"
                >
                    <div className="w-32 h-32 rounded-[2rem] overflow-hidden shrink-0 border border-earth-100 dark:border-earth-800 shadow-inner group-hover:scale-105 transition-transform duration-700">
                        <SafeImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 w-full text-center md:text-left">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-[9px] font-black uppercase text-agro-600 tracking-[0.2em] mb-1 block">ASSET-NODE-{item.id.toUpperCase()}</span>
                                <h3 className="text-2xl font-serif font-black text-earth-900 dark:text-white group-hover:text-agro-600 transition-colors leading-tight">{item.name}</h3>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="p-3 text-earth-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-6">
                            <div className="flex items-center gap-4 bg-earth-50 dark:bg-earth-800 p-1.5 rounded-2xl border border-earth-100 dark:border-earth-700 shadow-inner">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2.5 hover:bg-white dark:hover:bg-earth-700 rounded-xl transition-all text-earth-600 dark:text-earth-300 active:scale-90"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-lg font-black w-8 text-center text-earth-900 dark:text-white">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2.5 hover:bg-white dark:hover:bg-earth-700 rounded-xl transition-all text-earth-600 dark:text-earth-300 active:scale-90"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest block mb-1">Subtotal</span>
                                <span className="text-2xl font-black text-agro-600 dark:text-agro-400">${(parseFloat(item.price.replace('$', '').replace(',', '')) * item.quantity).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
          </AnimatePresence>
          
          <button 
            onClick={() => onNavigate(View.PRODUCTS)}
            className="flex items-center gap-3 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-[0.4em] transition-all group pt-8 ml-4"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Asset Acquisition
          </button>
        </div>

        {/* Right: Authorisation Panel */}
        <div className="lg:col-span-5">
          <div className="bg-earth-900 dark:bg-black rounded-[4rem] p-10 md:p-12 text-white shadow-2xl sticky top-32 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12"><ShieldCheck size={250} /></div>
            
            <h3 className="text-2xl font-serif font-black mb-10 flex items-center gap-4 relative z-10">
              <ShoppingBag size={28} className="text-agro-500" /> Deployment Authorization
            </h3>
            
            <div className="space-y-6 mb-12 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => setPaymentMethod('EAC')}
                        className={`p-6 rounded-[2rem] border-2 transition-all text-left ${paymentMethod === 'EAC' ? 'bg-agro-600/20 border-agro-600' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                        <Zap size={20} className="text-agro-500 mb-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Node Credits</span>
                        <span className="text-sm font-bold">EAC Tokens</span>
                    </button>
                    <button 
                        onClick={() => setPaymentMethod('CARD')}
                        className={`p-6 rounded-[2rem] border-2 transition-all text-left ${paymentMethod === 'CARD' ? 'bg-blue-600/20 border-blue-600' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                        <CreditCard size={20} className="text-blue-500 mb-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Standard Transmission</span>
                        <span className="text-sm font-bold">Fiat / FX</span>
                    </button>
                </div>

               <div className="pt-8 space-y-4 border-t border-white/10">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-earth-400">
                     <span>Deployment Count</span>
                     <span className="text-white">{totalItems} Assets</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-earth-400">
                     <span>CO2 Neutral Logistics</span>
                     <span className="text-agro-500">AUTHORIZED</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-earth-400">
                     <span>Registry Fee</span>
                     <span className="text-white">$0.00</span>
                  </div>
                  <div className="h-px bg-white/10 my-6"></div>
                  <div className="flex justify-between items-end">
                     <div>
                        <span className="text-agro-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">Total In(val) Investment</span>
                        <span className="text-5xl font-black tracking-tighter">${totalPrice.toLocaleString()}</span>
                     </div>
                  </div>
               </div>
            </div>

            <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-agro-600 hover:bg-agro-500 text-white font-black uppercase text-xs tracking-[0.3em] py-6 rounded-[2rem] shadow-2xl shadow-agro-600/20 transition-all active:scale-[0.98] mb-8 relative z-10 flex items-center justify-center gap-4 border border-white/10 disabled:opacity-50"
            >
               {isProcessing ? <><Loader2 className="animate-spin" /> SYNCING WITH REGISTRY...</> : <><Lock size={20} /> Authorize Transmission</>}
            </button>
            
            <div className="flex items-center justify-center gap-4 text-[9px] font-black text-earth-500 uppercase tracking-[0.5em] relative z-10">
               <ShieldCheck size={16} className="text-agro-600" /> End-to-End Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
