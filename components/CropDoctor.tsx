
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, ShieldCheck, Bug, RefreshCcw, AlertCircle } from 'lucide-react';
import { analyzeCropHealth } from '../services/gemini';

export const CropDoctor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setDiagnosis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeCropHealth(image, 'image/jpeg');
      setDiagnosis(result);
    } catch (err) {
      console.error(err);
      setDiagnosis("Analysis failed. Please ensure the image is clear and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">AI Crop Doctor</h2>
        <p className="text-xl text-earth-600 max-w-2xl mx-auto">
          Instant diagnostics for pests, diseases, and soil health issues.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className={`aspect-square rounded-3xl border-4 border-dashed flex flex-col items-center justify-center relative overflow-hidden bg-white ${image ? 'border-agro-500' : 'border-earth-200'}`}>
            {image ? (
              <>
                <img src={image} className="w-full h-full object-cover" alt="To diagnose" />
                <button onClick={() => setImage(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white"><RefreshCcw size={20} /></button>
              </>
            ) : (
              <div className="text-center p-8">
                <Camera size={48} className="mx-auto mb-4 text-earth-300" />
                <button onClick={() => fileInputRef.current?.click()} className="bg-agro-600 text-white px-6 py-2 rounded-full font-bold">Select Image</button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
            )}
          </div>
          <button onClick={handleAnalyze} disabled={!image || isAnalyzing} className="w-full bg-agro-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50">
            {isAnalyzing ? <><Loader2 className="animate-spin" /> Analyzing...</> : <><ShieldCheck size={24} /> Get AI Diagnosis</>}
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-earth-100 shadow-sm p-8 h-[500px] overflow-y-auto">
          {diagnosis ? (
            <div className="prose prose-earth max-w-none">
              <h3 className="text-xl font-bold text-agro-900 mb-4 flex items-center gap-2"><AlertCircle className="text-red-500" /> Results</h3>
              <div dangerouslySetInnerHTML={{ __html: diagnosis.replace(/\n/g, '<br/>') }} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-earth-400">
              <Bug size={64} className="mb-4 opacity-20" />
              <p>Awaiting plant data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
