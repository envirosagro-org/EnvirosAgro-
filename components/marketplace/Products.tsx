import React, { useState } from 'react';
import { View, Product } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, X, Check } from 'lucide-react';
import { THRUST_FILTERS, PRODUCTS } from './data'; // Changed import
import { SafeImage } from '../SafeImage';

interface ProductsProps {
    onNavigate: (view: View, params?: any) => void;
}

export const Products: React.FC<ProductsProps> = ({ onNavigate }) => {
    const [activeThrust, setActiveThrust] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = PRODUCTS.filter(p => {
        const thrustMatch = activeThrust === 'ALL' || p.thrust === activeThrust;
        const searchMatch = searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return thrustMatch && searchMatch;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <header className="relative z-10 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-24 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Marketplace</h1>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {PRODUCTS.length} Total Assets
                            </span>
                        </div>
                        <div className="w-full max-w-md ml-8">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input 
                                    type="text"
                                    placeholder="Search assets (e.g., 'drone', 'seed', 'masterclass')"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thrusts</h2>
                            <div className="space-y-2">
                                {THRUST_FILTERS.map(filter => (
                                    <button 
                                        key={filter.id}
                                        onClick={() => setActiveThrust(filter.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left 
                                            ${activeThrust === filter.id 
                                                ? `text-white ${filter.color || 'bg-green-600'}`
                                                : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                        {filter.icon}
                                        <span className="flex-grow">{filter.title}</span>
                                        {activeThrust === filter.id && <Check size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <AnimatePresence>
                            <motion.div 
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <motion.div 
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => onNavigate(View.PRODUCT_DETAIL, product)}
                                        className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-green-500 group"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <SafeImage src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-2">
                                                <p className={`text-xs font-bold uppercase tracking-wider ${THRUST_FILTERS.find(f=>f.id===product.thrust)?.color?.replace('bg-', 'text-').replace('-100', '-600')}`}>{THRUST_FILTERS.find(f=>f.id===product.thrust)?.title}</p>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{product.rating}</span>
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 h-14 truncate-2-lines">{product.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 h-10 truncate-2-lines">{product.description}</p>
                                            <div className="mt-4 flex items-center justify-between">
                                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{product.price}</p>
                                                <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">Details</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                        {filteredProducts.length === 0 && (
                             <div className="text-center py-24 col-span-full">
                                <p className="text-gray-500">No assets found. Try a different search or filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
