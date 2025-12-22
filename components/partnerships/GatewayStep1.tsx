import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GatewayStep1Props {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

export const GatewayStep1: React.FC<GatewayStep1Props> = ({ formData, setFormData, onNext }) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
      <div className="max-w-2xl">
        <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-4">01. Enquiries & Sourcing</h4>
        <p className="text-earth-500 dark:text-earth-400 font-medium">Identify your organizational capabilities and the nature of your integration request.</p>
      </div>

      <form className="grid md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Legal Organization Name</label>
          <input
            required
            className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white shadow-inner"
            placeholder="e.g. Global Tech Solutions"
            value={formData.orgName}
            onChange={e => setFormData({ ...formData, orgName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Sourcing Domain</label>
          <select
            className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white appearance-none"
            value={formData.offerType}
            onChange={e => setFormData({ ...formData, offerType: e.target.value })}
          >
            <option>Technology</option>
            <option>Financial Assets</option>
            <option>Agricultural Inputs</option>
            <option>Logistics & Distribution</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Integration Scope / Offer Details</label>
          <textarea
            required
            className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-[2rem] px-8 py-6 text-sm font-medium transition-all outline-none resize-none dark:text-white leading-relaxed h-40"
            placeholder="Describe how your offering enhances the EnvirosAgro Five Thrusts..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
        >
          Initiate Automated Verification <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};
