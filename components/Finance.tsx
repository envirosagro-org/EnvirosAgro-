import React, { useState } from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory } from 'lucide-react';
import { View, User } from '../types';

import { FinanceHeader } from './finance/FinanceHeader';
import { ProductGrid } from './finance/ProductGrid';
import { FinanceSidebar } from './finance/FinanceSidebar';
import { DepositModal } from './finance/DepositModal';

const FINANCIAL_PRODUCTS = [
  {
    id: 'SA',
    title: 'Community Grants (SA)',
    icon: <Users size={28} />,
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-900',
    products: [
      { name: 'Cooperative Seed Fund', desc: 'Micro-grants for starting local farming co-ops.', rate: 'Grant (No Repayment)' },
      { name: 'Education Stipends', desc: 'Funding for agricultural training workshops.', rate: 'Grant' }
    ]
  },
  {
    id: 'EA',
    title: 'Green Financing (EA)',
    icon: <Leaf size={28} />,
    bg: 'bg-green-50',
    border: 'border-green-100',
    text: 'text-green-900',
    products: [
      { name: 'Carbon Credit Advance', desc: 'Upfront capital against future carbon sequestration.', rate: '2.5% APR' },
      { name: 'Regenerative Transition Loan', desc: 'Long-term financing for soil health improvements.', rate: '3.0% APR' }
    ]
  },
  {
    id: 'HA',
    title: 'Health & Risk (HA)',
    icon: <ShieldPlus size={28} />,
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-900',
    products: [
      { name: 'Crop Resilience Insurance', desc: 'Coverage against pests and disease outbreaks.', rate: 'Premium based' },
      { name: 'Worker Safety Fund', desc: 'Low-interest loans for PPE and safety equipment.', rate: '1.5% APR' }
    ]
  },
  {
    id: 'TA',
    title: 'Tech Leasing (TA)',
    icon: <Cpu size={28} />,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-900',
    products: [
      { name: 'Smart Equipment Lease', desc: 'Pay-per-use financing for drones and sensors.', rate: 'Flexible Terms' },
      { name: 'Digital Adoption Loan', desc: 'Capital for farm management software integration.', rate: '4.0% APR' }
    ]
  },
  {
    id: 'IA',
    title: 'Industrial Capital (IA)',
    icon: <Factory size={28} />,
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    text: 'text-slate-900',
    products: [
      { name: 'Supply Chain Factoring', desc: 'Immediate cash flow for invoiced goods.', rate: 'Market Rate' },
      { name: 'Infrastructure CAPEX', desc: 'Large-scale loans for processing facilities.', rate: 'Prime + 1%' }
    ]
  }
];

interface FinanceProps {
  user: User | null;
  onNavigate?: (view: View) => void;
}

export const Finance: React.FC<FinanceProps> = ({ user, onNavigate }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [, setTransactions] = useState<any[]>([]);
  const [amount, setAmount] = useState('');
  const [depositStatus, setDepositStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  const handleDeposit = () => {
    const val = parseFloat(amount);
    if (!amount || isNaN(val) || val <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setDepositStatus('PROCESSING');
    setTimeout(() => {
      setPortfolioValue(prev => prev + val);
      const newTransaction = {
        id: Date.now(),
        type: 'Deposit',
        amount: val,
        date: new Date().toLocaleTimeString(),
        currency: 'USD'
      };
      setTransactions(prev => [newTransaction, ...prev]);
      setDepositStatus('SUCCESS');
      setTimeout(() => {
        setShowDepositModal(false);
        setDepositStatus('IDLE');
        setAmount('');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <FinanceHeader user={user} portfolioValue={portfolioValue} />

      <div className="grid lg:grid-cols-3 gap-8">
        <ProductGrid
          financialProducts={FINANCIAL_PRODUCTS}
          onProductClick={() => setShowDepositModal(true)}
        />

        <FinanceSidebar
          onShowDeposit={() => setShowDepositModal(true)}
          onNavigate={(view) => onNavigate?.(view)}
        />
      </div>

      {showDepositModal && (
        <DepositModal
          setShowDepositModal={setShowDepositModal}
          depositStatus={depositStatus}
          amount={amount}
          setAmount={setAmount}
          handleDeposit={handleDeposit}
        />
      )}
    </div>
  );
};
