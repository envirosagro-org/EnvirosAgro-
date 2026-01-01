import React from 'react';
import { View, Product } from '../types';
import { 
  ArrowLeft, ShoppingBag, Star, 
  CheckCircle2, Zap, ShieldCheck, 
  Globe, Package, Clock, Users,
  Share2, Heart, Award, ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { SafeImage } from './SafeImage';
import { motion } from 'framer-motion';

interface ProductDetailProps {
    onNavigate: (view: View) => void;
    product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onNavigate, product }) => {
  const { addToCart } = useCart();

  if (!product) {
      return (
          <div className="h-screen flex items-center justify-center">
              <button onClick={() => onNavigate(View.PRODUCTS)} className="flex items-center gap-2 text-agro-600 font-bold">
                  <ArrowLeft size={20} /> Back to Marketplace
              </button>
          </div>
      );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to deployment queue!`);
  };

  return (
    <div className="bg-white dark:bg-earth-950 min-h-screen pb-32 transition-colors duration-500">
      
      {/* 1. Technical Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mb-12">
        <div className="flex items-center justify-between">
            <button 
                onClick={() => onNavigate(View.PRODUCTS)}
                className="flex items-center gap-2 text-earth-400 hover:text-agro-600 transition-colors text-[10px] font-black uppercase tracking-widest group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Assets
            </button>
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-earth-300 uppercase tracking-widest">Inventory Status</span>
                <span className="px-3 py-1 bg-agro-50 dark:bg-agro-900/30 text-agro-600 dark:text-agro-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-agro-100 dark:border-agro-800">
                    High Availability
                </span>
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        
        {/* 2. Visual Terminal */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
           <div className="relative aspect-square rounded-[4rem] overflow-hidden border-8 border-earth-50 dark:border-earth-900 shadow-cinematic-2xl group">
                <SafeImage 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                           <Globe size={24} />
                        </div>
                        <div>
                           <span className="text-[9px] font-black text-white/60 uppercase tracking-widest block mb-1">Origin Node</span>
                           <span className="text-sm font-bold text-white uppercase tracking-tight">Global Cluster Alpha</span>
                        </div>
                    </div>
                    <button className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-rose-500 transition-all group">
                        <Heart size={20} className="group-active:scale-125 transition-transform" />
                    </button>
                </div>
           </div>

           <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Asset Type', val: product.type, icon: <Package size={16}/> },
                { label: 'System Compliance', val: 'Verified', icon: <ShieldCheck size={16}/> },
                { label: 'Data Registry', val: 'v4.2.2', icon: <Zap size={16}/> }
              ].map((s, i) => (
                <div key={i} className="bg-earth-50 dark:bg-earth-900/50 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800 text-center group hover:border-agro-500/30 transition-all">
                   <div className="text-earth-300 group-hover:text-agro-600 transition-colors mb-3 flex justify-center">{s.icon}</div>
                   <span className="text-[8px] font-black uppercase text-earth-400 block tracking-widest mb-1">{s.label}</span>
                   <span className="text-xs font-bold text-earth-900 dark:text-white uppercase">{s.val}</span>
                </div>
              ))}
           </div>
        </div>

        {/* 3. Strategic Intelligence */}
        <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-1000">
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/20">
                    {product.thrust} Thrust Asset
                 </span>
                 <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest bg-earth-50 dark:bg-earth-900 px-3 py-1 rounded-lg border border-earth-100 dark:border-earth-800">
                    Category: {product.category}
                 </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter mb-8">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-10 mb-10 pb-10 border-b border-earth-100 dark:border-earth-800">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2">Strategic Cost</span>
                    <span className="text-4xl font-black text-agro-600 dark:text-agro-400 leading-none">{product.price}</span>
                 </div>
                 <div className="w-px h-12 bg-earth-100 dark:bg-earth-800"></div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2">Trust Rating</span>
                    <div className="flex items-center gap-3">
                       <span className="text-2xl font-black text-earth-900 dark:text-white leading-none">{product.rating}</span>
                       <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <div className="bg-earth-50/50 dark:bg-earth-900/30 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Activity size={180} /></div>
                 <h3 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    <Zap size={16} className="text-agro-600" /> Executive Summary
                 </h3>
                 <p className="text-lg text-earth-600 dark:text-earth-400 font-medium leading-relaxed italic mb-8">
                    "{product.description}"
                 </p>
                 {product.impact && (
                    <div className="bg-agro-50 dark:bg-agro-900/40 p-6 rounded-2xl border border-agro-100 dark:border-agro-800">
                       <h4 className="text-[9px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-widest mb-2">Quantified Impact Index</h4>
                       <p className="text-sm font-bold text-earth-900 dark:text-agro-100 leading-relaxed">{product.impact}</p>
                    </div>
                 )}
              </div>

              <div>
                 <h3 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] mb-6 ml-4">Core Technical Features</h3>
                 <div className="grid sm:grid-cols-2 gap-4">
                    {product.features?.map((f, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white dark:bg-earth-900 p-5 rounded-2xl border border-earth-100 dark:border-earth-800 group hover:border-agro-500/30 transition-all">
                           <div className="w-10 h-10 bg-agro-50 dark:bg-agro-900/30 rounded-xl flex items-center justify-center text-agro-600 group-hover:scale-110 transition-transform"><CheckCircle2 size={20}/></div>
                           <span className="text-sm font-bold text-earth-700 dark:text-earth-300">{f}</span>
                        </div>
                    ))}
                 </div>
              </div>

              {product.type === 'DIGITAL' && (
                 <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Award size={180} /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-6">Learning Path Intelligence</h4>
                    <div className="grid grid-cols-2 gap-8 relative z-10">
                        <div>
                           <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest block mb-1">Lead Instructor</span>
                           <p className="text-lg font-bold">{product.instructor}</p>
                        </div>
                        <div>
                           <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest block mb-1">Transmission Time</span>
                           <p className="text-lg font-bold">{product.duration}</p>
                        </div>
                    </div>
                 </div>
              )}
           </div>

           <div className="flex gap-4 pt-10">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-agro-600 hover:bg-agro-500 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-agro-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 border border-white/10"
              >
                <ShoppingBag size={22} /> Deploy Asset to Node
              </button>
              <button className="p-6 bg-earth-50 dark:bg-earth-800 rounded-[2rem] border border-earth-100 dark:border-earth-700 text-earth-400 hover:text-blue-600 transition-all shadow-sm">
                 <Share2 size={24} />
              </button>
           </div>

           <div className="pt-12 flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-earth-400 opacity-60">
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> Truth Verified</span>
                <span className="flex items-center gap-2"><RefreshCw size={14} /> Real-time Stock</span>
                <span className="flex items-center gap-2"><Users size={14} /> 4.2k Users</span>
           </div>
        </div>
      </main>
    </div>
  );
};
