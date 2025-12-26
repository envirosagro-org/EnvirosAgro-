import React, { useState } from 'react';
import { Database as DbIcon, Search, Download, Globe, Terminal } from 'lucide-react';
import { DATASETS } from './data';

export const DataRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDatasets = DATASETS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 relative animate-in fade-in duration-700">
      <div className="ea-header-block p-4 md:p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="ea-label mb-1">
              <DbIcon size={12} /> Global Intelligence Node
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-900 dark:text-white leading-tight">
              EnvirosAgro <span className="text-blue-600 italic">Data Registry</span>
            </h2>
          </div>
          <div className="relative w-full md:w-auto group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-lg w-full md:w-64 text-[11px] font-medium"
            />
          </div>
        </div>
      </div>

      <div className="ea-card overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[400px]">
        <div className="overflow-x-auto ea-scroll-area flex-1">
          <table className="w-full text-left">
            <thead className="bg-earth-50 dark:bg-earth-950 text-[7px] font-black text-earth-400 uppercase tracking-[0.3em] border-b border-earth-50 dark:border-earth-800 sticky top-0 z-20">
              <tr>
                <th className="px-6 py-3">Dossier / Asset Name</th>
                <th className="px-6 py-3">Node Origin</th>
                <th className="px-6 py-3">Metric Type</th>
                <th className="px-6 py-3 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-50 dark:divide-earth-800">
              {filteredDatasets.map((data) => (
                <tr key={data.id} className="hover:bg-earth-50/50 dark:hover:bg-earth-800/30 transition-all group">
                  <td className="px-6 py-3">
                    <div className="font-bold text-earth-900 dark:text-white text-xs mb-0.5">{data.name}</div>
                    <div className="flex items-center gap-2 text-[8px] font-bold text-earth-400 uppercase tracking-widest">
                      <Terminal size={8} className="text-blue-500" /> {data.id}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-[9px] font-bold text-earth-600 dark:text-earth-400">
                    <Globe size={12} className="inline mr-1 text-blue-500" /> {data.region}
                  </td>
                  <td className="px-6 py-3 text-[9px] font-bold text-earth-600 dark:text-earth-400">
                    {data.type}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="p-2 bg-earth-50 dark:bg-earth-800 text-earth-400 hover:text-agro-600 rounded-lg">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};