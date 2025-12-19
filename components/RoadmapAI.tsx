
import React, { useState } from 'react';
import { Sparkles, MapPin, Sprout, Loader2, Send } from 'lucide-react';
import { generateRoadmap } from '../services/gemini';

export const RoadmapAI: React.FC = () => {
  const [formData, setFormData] = useState({ region: '', crops: '', sa: 50, ea: 50, ha: 50, ta: 50, ia: 50 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await generateRoadmap({ thrustScores: { SA: formData.sa, EA: formData.ea, HA: formData.ha, TA: formData.ta, IA: formData.ia }, region: formData.region, crops: formData.crops });
      setRoadmap(res || "Failed to generate roadmap.");
    } catch (err) {
      console.error(err);
      setRoadmap("An error occurred during strategy generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-serif font-bold text-agro-900 mb-8 text-center">Strategic AI Roadmap</h2>
      <div className="grid lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-earth-100 shadow-sm space-y-6">
          <div className="flex gap-4">
            <input required placeholder="Region" className="flex-1 p-3 bg-earth-50 rounded-xl border border-earth-200" onChange={e => setFormData({...formData, region: e.target.value})} />
            <input required placeholder="Main Crops" className="flex-1 p-3 bg-earth-50 rounded-xl border border-earth-200" onChange={e => setFormData({...formData, crops: e.target.value})} />
          </div>
          {['sa', 'ea', 'ha', 'ta', 'ia'].map(t => (
            <div key={t}>
              <label className="text-xs font-bold uppercase text-earth-500 mb-1 block">Thrust: {t.toUpperCase()}</label>
              <input type="range" className="w-full accent-purple-600" onChange={e => setFormData({...formData, [t]: parseInt(e.target.value)})} />
            </div>
          ))}
          <button type="submit" disabled={isGenerating} className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700">
            {isGenerating ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} /> Generate Strategy</>}
          </button>
        </form>
        <div className="bg-white p-8 rounded-3xl border border-earth-100 shadow-sm min-h-[500px] overflow-y-auto font-sans leading-relaxed">
          {roadmap ? (
            <div className="whitespace-pre-wrap text-sm text-earth-700" dangerouslySetInnerHTML={{ __html: roadmap.replace(/\n/g, '<br/>') }} />
          ) : (
            <div className="h-full flex items-center justify-center text-earth-300 italic">Generate a roadmap to see AI insights.</div>
          )}
        </div>
      </div>
    </div>
  );
};
