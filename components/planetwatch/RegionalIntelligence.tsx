import React from 'react';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export const RegionalIntelligence: React.FC = () => {
  const regions = [
    { name: 'East Africa Cluster', score: 82, status: 'Stable', color: 'text-green-500' },
    { name: 'Southeast Asia Nodes', score: 64, status: 'At Risk', color: 'text-amber-500' },
    { name: 'Amazon Basin Sector', score: 45, status: 'Critical', color: 'text-red-500' },
    { name: 'European Plains', score: 88, status: 'Optimal', color: 'text-green-600' },
  ];

  return (
    <div className="bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[3rem] p-10 shadow-sm mb-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-2xl text-agro-600">
          <Shield size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Regional Intelligence Index</h3>
          <p className="text-earth-500 dark:text-earth-400 text-sm">Aggregated health scores based on multi-thrust telemetry.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {regions.map((region, i) => (
          <div key={i} className="p-6 rounded-[2rem] border border-earth-50 dark:border-earth-800/50 hover:border-agro-500/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-earth-400">{region.name}</span>
              {region.score > 80 ? <CheckCircle size={16} className="text-green-500" /> : <AlertTriangle size={16} className={region.color} />}
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-black text-earth-900 dark:text-white leading-none">{region.score}</span>
              <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest mb-1">Index val</span>
            </div>
            <div className="w-full h-1.5 bg-earth-100 dark:bg-earth-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${region.score > 70 ? 'bg-green-500' : region.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${region.score}%` }}
              ></div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className={`text-[9px] font-black uppercase tracking-widest ${region.color}`}>{region.status}</span>
              <button className="text-[9px] font-bold text-earth-400 hover:text-agro-600 uppercase tracking-widest transition-colors">Details →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
