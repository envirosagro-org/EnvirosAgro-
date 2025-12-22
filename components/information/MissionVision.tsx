import React from 'react';
import { Target, Eye } from 'lucide-react';

export const MissionVision: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-20">
      <div className="bg-agro-900 text-white p-10 rounded-3xl flex flex-col justify-center text-center shadow-lg">
        <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-agro-300">
          <Target size={32} />
        </div>
        <h3 className="text-3xl font-serif font-bold mb-4">Our Mission</h3>
        <p className="text-xl text-agro-100 leading-relaxed italic">
          "To ensure agriculture and its environ is smooth, reliable and safe."
        </p>
      </div>

      <div className="bg-white border border-earth-100 p-10 rounded-3xl flex flex-col justify-center text-center shadow-sm">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
          <Eye size={32} />
        </div>
        <h3 className="text-3xl font-serif font-bold text-earth-900 mb-4">Our Vision</h3>
        <p className="text-xl text-earth-600 leading-relaxed italic">
          "To have socioeconomic and healthy future for agricultural community."
        </p>
      </div>
    </div>
  );
};
