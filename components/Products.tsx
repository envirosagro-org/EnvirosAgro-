import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { 
  ShoppingBag, Star, Filter, Users, Leaf, ShieldPlus, 
  Cpu, Factory, Search, Tag, GraduationCap, PlayCircle,
  Clock, Award
} from 'lucide-react';
import { SafeImage } from './SafeImage';

const THRUST_FILTERS = [
  { id: 'ALL', title: 'All Assets', icon: null },
  { id: 'MC', title: 'Masterclasses', icon: <GraduationCap size={16} />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'SA', title: 'Social', icon: <Users size={16} />, color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { id: 'EA', title: 'Environmental', icon: <Leaf size={16} />, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'HA', title: 'Health', icon: <ShieldPlus size={16} />, color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'TA', title: 'Technical', icon: <Cpu size={16} />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'IA', title: 'Industrial', icon: <Factory size={16} />, color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

const PRODUCTS = [
  // Physical Products
  {
    id: 'p1',
    name: 'Heirloom Seed Starter Kit',
    description: 'A collection of indigenous, drought-resistant seeds verified by the SA Thrust for community resilience.',
    price: '$24.99',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592150621124-3c47ad43c316?w=400&auto=format&fit=crop&q=60',
    thrust: 'SA',
    category: 'Seeds',
    type: 'PHYSICAL'
  },
  {
    id: 'p2',
    name: 'Bio-Active Compost Tea',
    description: 'Rich microbial inoculant designed to restore soil health and boost the EA resilience coefficient.',
    price: '$35.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&auto=format&fit=crop&q=60',
    thrust: 'EA',
    category: 'Soil',
    type: 'PHYSICAL'
  },
  {
    id: 'p4',
    name: 'Solar-Powered IoT Soil Sensor',
    description: 'Precision TA hardware for real-time monitoring of moisture, NPK, and pH levels.',
    price: '$120.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&auto=format&fit=crop&q=60',
    thrust: 'TA',
    category: 'Tech',
    type: 'PHYSICAL'
  },
  // Masterclasses
  {
    id: 'mc1',
    name: 'SI-D Diagnostic Masterclass',
    description: 'Deep dive into diagnosing Social Influenza Disease in post-conflict clusters with Dr. Elena Rossi.',
    price: '$99.00',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60',
    thrust: 'MC',
    category: 'Learning',
    type: 'DIGITAL',
    duration: '12 Hours',
    instructor: 'Dr. Elena Rossi'
  },
  {
    id: 'mc2',
    name: 'Advanced m(t) Modeling',
    description: 'Learn the mathematical foundations of the Five Thrusts framework and resilience forecasting.',
    price: '$149.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&auto=format&fit=crop&q=60',
    thrust: 'MC',
    category: 'Learning',
    type: 'DIGITAL',
    duration: '20 Hours',
    instructor: 'Lead Advisor'
  },
  {
    id: 'mc3',
    name: 'Biomass Hashing Protocol',
    description: 'Technical session on minting carbon credits and biomass verification for EA ledgers.',
    price: '$199.00',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60',
    thrust: 'MC',
    category: 'Learning',
    type: 'DIGITAL',
    duration: '15 Hours',
    instructor: 'EA Node Team'
  }
];

export const Products: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesFilter = activeFilter === 'ALL' || product.thrust === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to inventory!`);
  };

  const getThrustBadge = (thrustId: string) => {
    const thrust = THRUST_FILTERS.find(t => t.id === thrustId);
    return thrust ? (
      <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wide border ${thrust.color}`}>
        {thrust.icon} {thrust.title}
      </span>
    ) : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-serif font-black text-earth-900 dark:text-white tracking-tight">Sustainable Marketplace</h2>
          <p className="text-earth-500 dark:text-earth-400 mt-2 font-medium">Strategic assets and knowledge tokens for regional development.</p>
        </div>
        <div className="relative w-full md:w-80 group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-500 transition-colors" size={20} />
           <input 
              type="text" 
              placeholder="Search assets & classes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-agro-500/5 transition-all dark:text-white shadow-sm"
           />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12 border-b border-earth-100 dark:border-earth-800 pb-6 overflow-x-auto no-scrollbar">
        {THRUST_FILTERS.map((filter) => (
           <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 shrink-0 ${
                activeFilter === filter.id
                ? 'bg-agro-600 border-agro-500 text-white shadow-xl translate-y-[-2px]'
                : 'bg-white dark:bg-earth-900 text-earth-400 border-transparent hover:border-earth-100 dark:hover:border-earth-800 hover:text-earth-900'
              }`}
           >
              {filter.icon && <span>{filter.icon}</span>}
              {filter.title}
           </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={`bg-white dark:bg-earth-900 rounded-[2.5rem] shadow-sm border ${product.type === 'DIGITAL' ? 'border-blue-100 dark:border-blue-900/30' : 'border-earth-100 dark:border-earth-800'} overflow-hidden group hover:shadow-cinematic transition-all duration-700 flex flex-col h-full relative`}>
              {product.type === 'DIGITAL' && (
                <div className="absolute top-4 right-4 z-10">
                   <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                      <PlayCircle size={20} />
                   </div>
                </div>
              )}
              
              <div className="h-64 overflow-hidden relative">
                <SafeImage 
                  src={product.image} 
                  alt={product.name} 
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                   {getThrustBadge(product.thrust)}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white group-hover:text-agro-600 transition-colors leading-tight mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-amber-500 text-[10px] font-black uppercase tracking-widest bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-800">
                          <Star size={12} fill="currentColor" /> {product.rating}
                        </span>
                        <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest flex items-center gap-1">
                          <Tag size={12} /> {product.category}
                        </span>
                    </div>
                  </div>
                </div>

                {product.type === 'DIGITAL' ? (
                  <div className="space-y-3 mb-8">
                     <div className="flex items-center gap-3 text-xs text-earth-500 font-medium">
                        <Clock size={14} className="text-blue-500" /> {product.duration} Session
                     </div>
                     <div className="flex items-center gap-3 text-xs text-earth-500 font-medium">
                        <Users size={14} className="text-blue-500" /> Instructor: {product.instructor}
                     </div>
                     <p className="text-earth-400 text-xs leading-relaxed italic mt-2 line-clamp-2">
                        "{product.description}"
                     </p>
                  </div>
                ) : (
                  <p className="text-earth-500 dark:text-earth-400 text-sm mb-10 line-clamp-3 font-medium leading-relaxed">
                      {product.description}
                  </p>
                )}

                <div className="mt-auto pt-6 border-t border-earth-50 dark:border-earth-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest mb-1">Strategic Cost</span>
                    <span className="text-2xl font-black text-agro-600 dark:text-agro-400">{product.price}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`flex items-center gap-3 font-black uppercase text-[10px] tracking-widest py-4 px-8 rounded-2xl shadow-xl transition-all active:scale-95 ${product.type === 'DIGITAL' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-earth-900 dark:bg-agro-600 hover:bg-agro-600 dark:hover:bg-agro-500 text-white'}`}
                  >
                    <ShoppingBag size={18} />
                    Deploy
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center animate-in fade-in">
             <div className="w-20 h-20 bg-earth-50 dark:bg-earth-900 rounded-full flex items-center justify-center mx-auto mb-6 text-earth-200">
                <Search size={40} />
             </div>
             <h3 className="text-2xl font-serif font-bold text-earth-900 mb-2">No Assets Found</h3>
             <p className="text-earth-400 font-medium">Refine your query or check another thrust track.</p>
          </div>
        )}
      </div>
    </div>
  );
};