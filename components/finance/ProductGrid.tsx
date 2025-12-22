import React from 'react';

interface ProductGridProps {
  financialProducts: any[];
  onProductClick: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ financialProducts, onProductClick }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {financialProducts.map((category) => (
        <div key={category.id} className={`p-6 rounded-2xl border ${category.border} ${category.bg}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white p-2 rounded-xl shadow-sm text-current">{category.icon}</div>
            <h3 className={`text-xl font-bold ${category.text}`}>{category.title}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {category.products.map((prod: any, idx: number) => (
              <div key={idx} onClick={onProductClick} className="bg-white/60 p-4 rounded-xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-black/5 hover:shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-earth-900">{prod.name}</h4>
                  <span className="text-xs font-bold bg-white px-2 py-1 rounded text-agro-700 shadow-sm">{prod.rate}</span>
                </div>
                <p className="text-sm text-earth-600">{prod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
