import React from 'react';
import { Target, Eye, Users, Lightbulb, Leaf, RefreshCw, ShieldCheck, Smile, Heart, Gavel, AlertTriangle, Zap, ArrowLeft } from 'lucide-react';
import { View } from '../../types';

interface AboutPageProps {
  onNavigate?: (view: View) => void;
}

const MissionVision = () => (
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

const Principles = () => {
    const principles = [
        { title: "Integration", icon: <Users size={24} />, desc: "Unifying diverse agricultural sectors." },
        { title: "Vision", icon: <Eye size={24} />, desc: "Forward-thinking strategies for the future." },
        { title: "Innovation", icon: <Lightbulb size={24} />, desc: "Embracing technology and creative solutions." },
        { title: "Sustainability", icon: <Leaf size={24} />, desc: "Ensuring long-term ecological balance." },
        { title: "Kaizen", icon: <RefreshCw size={24} />, desc: "Continuous improvement in all practices." }
      ];

    return (
        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-agro-900 mb-10 text-center">Principles of EnvirosAgro</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {principles.map((principle, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm hover:border-agro-300 hover:shadow-md transition-all text-center group">
                <div className="w-12 h-12 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-4 text-earth-600 group-hover:bg-agro-50 group-hover:text-agro-600 transition-colors">
                  {principle.icon}
                </div>
                <h4 className="font-bold text-lg text-earth-900 mb-2">{principle.title}</h4>
                <p className="text-sm text-earth-500">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
    );
};

const Values = () => {
    const values = [
        { title: "Ethical", icon: <ShieldCheck size={28} />, color: "text-amber-600" },
        { title: "Communal", icon: <Users size={28} />, color: "text-rose-600" },
        { title: "Optimistic", icon: <Smile size={28} />, color: "text-yellow-500" },
        { title: "Supportive", icon: <Heart size={28} />, color: "text-green-600" },
        { title: "Governed", icon: <Gavel size={28} />, color: "text-blue-600" }
      ];

    return (
        <div className="mb-20 bg-earth-50 rounded-3xl p-10 border border-earth-100">
          <h3 className="text-3xl font-serif font-bold text-agro-900 mb-10 text-center">Values of EnvirosAgro</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`mb-4 ${value.color}`}>{value.icon}</div>
                <h4 className="font-bold text-lg text-earth-900">{value.title}</h4>
              </div>
            ))}
          </div>
        </div>
    );
};

const FrameworkDistinctions = () => (
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

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-earth-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <button 
                onClick={() => onNavigate?.(View.HOME)}
                className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
            >
                <ArrowLeft size={16} /> Back to Home
            </button>
        </div>
        <div className="max-w-5xl mx-auto py-20 px-4">
            <h1 className="text-5xl font-serif font-bold text-center text-earth-900 dark:text-white mb-12">About EnvirosAgro</h1>
            <MissionVision />
            <Principles />
            <Values />
            <FrameworkDistinctions />
        </div>
    </div>
  );
};

export default AboutPage;