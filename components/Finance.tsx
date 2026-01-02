import React from 'react';
import { FinanceHeader } from './finance/FinanceHeader';
import { FinanceSidebar } from './finance/FinanceSidebar';
import { ProductGrid } from './finance/ProductGrid';
import { TransactionHistory } from './finance/TransactionHistory';

const Finance: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <FinanceHeader />
      <div className="flex">
        <FinanceSidebar />
        <main className="flex-1 p-8">
          <ProductGrid />
          <TransactionHistory />
        </main>
      </div>
    </div>
  );
};

export default Finance;