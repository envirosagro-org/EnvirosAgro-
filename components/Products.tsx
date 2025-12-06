import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Users, Leaf, ShieldPlus, Cpu, Factory, Search, Tag } from 'lucide-react';

// Thrust Definitions for Filtering
const THRUST_FILTERS = [
  { id: 'ALL', title: 'All Products', icon: null },
  { id: 'SA', title: 'Social', icon: <Users size={16} />, color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { id: 'EA', title: 'Environmental', icon: <Leaf size={16} />, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'HA', title: 'Health', icon: <ShieldPlus size={16} />, color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'TA', title: 'Technical', icon: <Cpu size={16} />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'IA', title: 'Industrial', icon: <Factory size={16} />, color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

const PRODUCTS: any[] = [];

export const Products: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesFilter = activeFilter === 'ALL' || product.thrust === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getThrustBadge = (thrustId: string) => {
    const thrust = THRUST_FILTERS.find(t => t.id === thrustId);
    return thrust ? (
      <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide border ${thrust.color}`}>
        {thrust.icon} {thrust.title}
      </span>
    ) : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-agro-900">Sustainable Marketplace</h2>
          <p className="text-earth-600 mt-2">Curated tools and inputs aligned with the Five Thrusts framework.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
           <Search className="absolute left-3 top-3 text-earth-400" size={18} />
           <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-earth-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all"
           />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-earth-200 pb-4">
        {THRUST_FILTERS.map((filter) => (
           <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeFilter === filter.id
                ? 'bg-agro-600 text-white shadow-md'
                : 'bg-white text-earth-600 border border-earth-200 hover:bg-earth-50 hover:border-agro-300'
              }`}
           >
              {filter.icon && <span>{filter.icon}</span>}
              {filter.title}
           </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-earth-100 overflow-hidden group hover:shadow-xl transition-all flex flex-col h-full">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                   {getThrustBadge(product.thrust)}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-earth-600 shadow-sm flex items-center gap-1">
                  <Tag size={12} /> {product.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-earth-900 group-hover:text-agro-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <span className="flex items-center gap-1 text-amber-500 text-sm font-bold bg-amber-50 px-1.5 py-0.5 rounded ml-2">
                    <Star size={12} fill="currentColor" /> {product.rating}
                  </span>
                </div>
                
                <p className="text-earth-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-earth-50 flex items-center justify-between">
                  <span className="text-xl font-bold text-agro-900">{product.price}</span>
                  <button className="bg-earth-900 hover:bg-agro-600 text-white p-2.5 rounded-xl transition-colors shadow-sm">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-earth-400">
             <Filter size={48} className="mx-auto mb-4 opacity-20" />
             <p className="text-lg">No products currently available.</p>
             <p className="text-sm text-earth-500 mt-2">Please check back later as we update our marketplace.</p>
          </div>
        )}
      </div>
    </div>
  );
};