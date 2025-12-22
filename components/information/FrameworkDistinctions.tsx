import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

export const FrameworkDistinctions: React.FC = () => {
  return (
    <div className="mb-20">
      <div className="bg-white border-2 border-agro-100 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <AlertTriangle size={200} />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-serif font-bold text-agro-900 mb-8 flex items-center gap-3">
            <Zap className="text-agro-600" /> Key Framework Distinctions
          </h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-agro-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                Strategic Framework
              </div>
              <h4 className="text-xl font-bold text-earth-900">Sustainable Integrated Development</h4>
              <p className="text-sm text-earth-600 leading-relaxed">
                This is our <strong>overarching organizational model</strong>. It focuses on the horizontal integration of technology, society, and nature to build long-term stability. Measured by the Sustainable Time Constant m(t).
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                Diagnostic Framework
              </div>
              <h4 className="text-xl font-bold text-earth-900">Social Influenza Disease (SI-D)</h4>
              <p className="text-sm text-earth-600 leading-relaxed">
                A specific <strong>socio-psychological framework</strong> within the Social Agriculture thrust. It treats societal fractures as "infections"—diagnosing how harmful narratives and stressors prevent integrated growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
