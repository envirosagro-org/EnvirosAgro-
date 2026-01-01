import React, { useState, useMemo } from 'react';
import { ClipboardCheck, ArrowRight, ShieldCheck, AlertCircle, TrendingUp, DollarSign, Package, Users, Clock, Zap, Target, HelpCircle, Loader2, FileText, ArrowLeft } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { View } from '../types';

const STANDARDS = [
  { id: 'cost', label: 'Cost Control', icon: <DollarSign size={18} />, desc: 'Negotiation with suppliers and minimization of waste.' },
  { id: 'quality', label: 'Quality Satisfaction', icon: <ShieldCheck size={18} />, desc: 'Inspection processes and supplier management systems.' },
  { id: 'resources', label: 'Resource Allocation', icon: <Package size={18} />, desc: 'Adequate land and input management for expansion.' },
  { id: 'relations', label: 'Strategic Relationships', icon: <Users size={18} />, desc: 'Partnerships and open innovation between producers and suppliers.' },
  { id: 'market', label: 'Time to Market', icon: <Clock size={18} />, desc: 'Liaison between suppliers and engineers for product development.' },
];

interface SupplyChainAuditProps {
    onNavigate?: (view: View) => void;
}

export const SupplyChainAudit: React.FC<SupplyChainAuditProps> = ({ onNavigate }) => {
  const [scores, setScores] = useState<Record<string, number>>({
    cost: 50,
    quality: 50,
    resources: 50,
    relations: 50,
    market: 50
  });
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const radarData = useMemo(() => {
    return STANDARDS.map(s => ({
      subject: s.label,
      score: scores[s.id],
      fullMark: 100
    }));
  }, [scores]);

  const runAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
        const values = Object.values(scores) as number[];
        const total = values.reduce((acc: number, curr: number) => acc + curr, 0);
        const avg = total / values.length;
        let verdict = "MODERATE EFFICIENCY";
        let recommendation = "Your performance aligns with current regional 'Know-How' benchmarks. Focus on digitizing resource allocation to reduce haphazard distribution.";
        
        if (avg < 40) {
            verdict = "HIGH FRAGMENTATION";
            recommendation = "Severe disconnect between professionalism and output. Immediate implementation of the Technical Agriculture (TA) thrust is required to organize the chain.";
        } else if (avg > 80) {
            verdict = "OPTIMAL INTEGRATION";
            recommendation = "You have achieved steady-state resilience in manageable variables. Shift focus to fundamental independent constraints (Climate/Population).";
        }

        setAuditResult({ avg, verdict, recommendation });
        setIsAuditing(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-amber-100 dark:border-amber-800">
           <ClipboardCheck size={14} /> Diagnostic Tool
        </div>
        <h2 className="text-4xl font-serif font-bold text-earth-900 dark:text-white mb-2">Supply Chain Gap Auditor</h2>
        <p className="text-xl text-earth-600 dark:text-earth-400 max-w-3xl">
          Identify the disconnect between professional knowledge and actual agricultural output using our standardized performance framework.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Input Scales */}
        <div className="space-y-8 bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
           <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-2">
               <Target className="text-agro-600" /> Performance Inputs
           </h3>
           
           <div className="space-y-8">
               {STANDARDS.map((std) => (
                   <div key={std.id} className="space-y-2">
                       <div className="flex justify-between items-end">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-earth-50 dark:bg-earth-800 rounded-lg text-earth-400">{std.icon}</div>
                               <div>
                                   <h4 className="text-sm font-bold text-earth-900 dark:text-white leading-none">{std.label}</h4>
                                   <p className="text-[10px] text-earth-400 mt-1 uppercase tracking-tight">{std.desc}</p>
                               </div>
                           </div>
                           <span className="text-agro-600 dark:text-agro-400 font-mono font-bold text-lg">{scores[std.id]}%</span>
                       </div>
                       <input 
                           type="range" min="0" max="100" step="1"
                           value={scores[std.id]}
                           onChange={(e) => setScores({...scores, [std.id]: parseInt(e.target.value)})}
                           className="w-full accent-agro-600 h-2 bg-earth-100 dark:bg-earth-800 rounded-full appearance-none cursor-pointer"
                       />
                   </div>
               ))}
           </div>

           <button 
             onClick={runAudit}
             disabled={isAuditing}
             className="w-full bg-agro-900 dark:bg-agro-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-agro-800 dark:hover:bg-agro-500 transition-all shadow-xl shadow-agro-900/20 flex items-center justify-center gap-3"
           >
              {isAuditing ? <><Loader2 className="animate-spin" /> Verifying Gap Metrics...</> : <><Zap size={18} /> Analyze Performance Gap</>}
           </button>
        </div>

        {/* Right: Visualization & Results */}
        <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><ClipboardCheck size={200} /></div>
                <h3 className="text-xs font-black text-earth-400 uppercase tracking-[0.3em] mb-8 relative z-10">Standardization Radar</h3>
                <div className="h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e5e7eb" className="dark:opacity-10" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Current State"
                                dataKey="score"
                                stroke="#16a34a"
                                strokeWidth={3}
                                fill="#16a34a"
                                fillOpacity={0.2}
                            />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {auditResult ? (
                <div className="bg-blue-600 text-white p-8 rounded-[3rem] shadow-xl animate-in slide-in-from-right-10 duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><TrendingUp size={100} /></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Audit Verdict</span>
                            <div className="flex items-center gap-1 text-[10px] font-black bg-white/20 px-2 py-1 rounded">
                                SCORE: {auditResult.avg.toFixed(1)}%
                            </div>
                        </div>
                        <h4 className="text-3xl font-serif font-bold mb-4 tracking-tight">{auditResult.verdict}</h4>
                        <p className="text-blue-50 text-sm leading-relaxed mb-6">
                            {auditResult.recommendation}
                        </p>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                            <AlertCircle size={20} className="text-amber-300 shrink-0 mt-0.5" />
                            <p className="text-[10px] font-bold text-blue-100 uppercase leading-relaxed tracking-wider">
                                CAUTION: High performance in these variables does not mitigate 'Fundamental Constraints' like Climate and Population. Consult the Impact Dashboard for natural resilience scoring.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-earth-50 dark:bg-earth-800/50 p-12 rounded-[3rem] border border-dashed border-earth-200 dark:border-earth-800 flex flex-col items-center justify-center text-center">
                    <HelpCircle size={48} className="text-earth-200 dark:text-earth-700 mb-4" />
                    <p className="text-earth-500 dark:text-earth-400 font-bold uppercase text-xs tracking-widest">Awaiting Simulation Input</p>
                </div>
            )}
        </div>
      </div>
      
      {/* Research Citations Footer */}
      <div className="mt-12 pt-8 border-t border-earth-100 dark:border-earth-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-earth-900 rounded-xl flex items-center justify-center text-agro-600 border border-earth-100 dark:border-earth-800 shadow-sm">
                  <FileText size={24} />
              </div>
              <div>
                  <p className="text-xs font-black uppercase tracking-widest text-earth-900 dark:text-white">Empirical Evidence Source</p>
                  <p className="text-[10px] text-earth-400 font-medium italic">Internal Network Performance Audit Studies (2024)</p>
              </div>
          </div>
          <button className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
              Search Full Library in Database <ArrowRight size={14} />
          </button>
      </div>
    </div>
  );
};
