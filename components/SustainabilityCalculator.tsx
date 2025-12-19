
import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

export const SustainabilityCalculator: React.FC = () => {
  const [params, setParams] = useState({ dn: 8, f: 0.5, x: 2.5, r: 1.1, s: 12 });

  const results = useMemo(() => {
    const in_val = params.f * params.dn;
    const ca = (params.x * (Math.pow(params.r, in_val) - 1)) / (params.r - 1) + 1;
    const m = Math.sqrt((in_val * params.dn * ca) / params.s);
    return { ca: ca.toFixed(2), m: m.toFixed(2) };
  }, [params]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-serif font-bold text-agro-900 mb-8 text-center">Sustainability Coefficient Calculator</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-earth-100 shadow-sm space-y-6">
          {Object.entries({ dn: 'Rainfall (mo)', f: 'Soil Retention', x: 'Ag Maturity', r: 'Growth Rate' }).map(([key, label]) => (
            <div key={key}>
              <label className="text-sm font-bold text-earth-700 block mb-2">{label}</label>
              <input type="range" min="0" max="12" step="0.1" value={params[key as keyof typeof params]} onChange={(e) => setParams({ ...params, [key]: parseFloat(e.target.value) })} className="w-full accent-agro-600" />
            </div>
          ))}
        </div>
        <div className="bg-agro-900 text-white p-8 rounded-3xl flex flex-col justify-center text-center">
          <div className="text-6xl font-serif font-bold mb-4">{results.m}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-agro-300">Resilience Metric m(t)</div>
          <div className="mt-8 text-3xl font-serif font-bold">{results.ca}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-agro-300">Sustainability C(a)</div>
        </div>
      </div>
    </div>
  );
};
