import React, { useState } from 'react';
import { Briefcase, DollarSign, Zap } from 'lucide-react';
import { User } from '../types';

const FINANCIAL_PRODUCTS = [
  {
    id: 'CG',
    title: 'Community Grants',
    rate: 'Grant (No Repayment)',
    description: 'Micro-grants for starting local farming co-ops and for agricultural training workshops.'
  },
  {
    id: 'GF',
    title: 'Green Financing',
    rate: '2.5% - 3.0% APR',
    description: 'Upfront capital against future carbon sequestration and long-term financing for soil health improvements.'
  },
  {
    id: 'HR',
    title: 'Health & Risk Mitigation',
    rate: 'Premium based',
    description: 'Coverage against pests and disease outbreaks, and low-interest loans for PPE and safety equipment.'
  },
  {
    id: 'TL',
    title: 'Tech Leasing',
    rate: 'Flexible Terms',
    description: 'Pay-per-use financing for drones, sensors and farm management software integration.'
  },
  {
    id: 'IC',
    title: 'Industrial Capital',
    rate: 'Market Rate',
    description: 'Immediate cash flow for invoiced goods and large-scale loans for processing facilities.'
  }
];

interface PortfolioProps {
  user: User | null;
}

export const Portfolio: React.FC<PortfolioProps> = ({ user }) => {
  const [portfolioValue] = useState(12345.67);

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 relative animate-in fade-in duration-700">
      <div className="ea-header-block p-4 md:p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="ea-label mb-1">
              <Briefcase size={12} /> Financial Overview
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-900 dark:text-white leading-tight">
              Your <span className="text-agro-600 italic">Portfolio</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-400 uppercase tracking-widest">Total Value</p>
              <p className="text-2xl font-mono font-black text-agro-600">${portfolioValue.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-earth-400 uppercase tracking-widest">EAC Balance</p>
              <p className="text-2xl font-mono font-black text-blue-600 flex items-center gap-2">
                <Zap size={16} /> {user?.eacTotal || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="ea-card overflow-hidden flex flex-col">
        <div className="p-4 border-b border-earth-50 dark:border-earth-800">
          <h3 className="font-bold text-earth-900 dark:text-white text-xs">Available Financial Products</h3>
        </div>
        <div className="overflow-x-auto ea-scroll-area">
          <table className="w-full text-left">
            <thead className="bg-earth-50 dark:bg-earth-950 text-[7px] font-black text-earth-400 uppercase tracking-[0.3em] border-b border-earth-50 dark:border-earth-800">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Interest Rate</th>
                <th className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
              {FINANCIAL_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-earth-50/50 dark:hover:bg-earth-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-earth-900 dark:text-white text-xs">{product.title}</td>
                  <td className="px-6 py-4 text-[9px] font-bold text-earth-600 dark:text-earth-400">{product.rate}</td>
                  <td className="px-6 py-4 text-xs text-earth-500 dark:text-earth-400">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};