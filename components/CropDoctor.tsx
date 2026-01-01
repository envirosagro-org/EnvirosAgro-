import React, { useState, useRef } from 'react';
import { 
  Camera, Upload, Loader2, ShieldCheck, Bug, 
  RefreshCcw, AlertCircle, Microscope, Brain, 
  Zap, ArrowRight, X, Image as ImageIcon,
  CheckCircle2, AlertTriangle, Info, Search,
  ArrowLeft
} from 'lucide-react';
import { analyzeCropHealth } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { View } from '../types';

interface CropDoctorProps {
    onNavigate?: (view: View) => void;
}

export const CropDoctor: React.FC<CropDoctorProps> = ({ onNavigate }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "Establishing Neural Handshake...",
    "Scanning Spectral Patterns...",
    "Isolating Biological Anomalies...",
    "Cross-referencing Global Database...",
    "Finalizing Strategic Diagnosis..."
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setDiagnosis(null);
        setAnalysisStep(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
        setAnalysisStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const result = await analyzeCropHealth(image, 'image/jpeg');
      clearInterval(stepInterval);
      setAnalysisStep(steps.length - 1);
      setTimeout(() => {
        setDiagnosis(result);
        setIsAnalyzing(false);
      }, 500);
    } catch (err) {
      console.error(err);
      clearInterval(stepInterval);
      setDiagnosis("Diagnostic downlink failed. Atmospheric interference or invalid API credentials.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 bg-white dark:bg-earth-950 transition-colors duration-500">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Home
        </button>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
            <div className="ea-label-meta mb-4">Precision Diagnostic Tool</div>
            <h2 className="text-5xl lg:text-7xl font-serif font-black text-earth-900 dark:text-white leading-none tracking-tighter">
                AI <span className="text-agro-600 italic">Crop</span> Doctor
            </h2>
            <p className="text-xl text-earth-500 dark:text-earth-400 mt-6 font-medium">
                Instant high-fidelity diagnostics for pests, diseases, and nutritional deficiencies using the EnvirosAgro neural engine.
            </p>
        </div>
        
        <div className="flex gap-4">
            <div className="bg-earth-50 dark:bg-earth-900 px-6 py-4 rounded-2xl border border-earth-100 dark:border-earth-800 flex items-center gap-4">
                <div className="w-10 h-10 bg-white dark:bg-earth-800 rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><Search size={20}/></div>
                <div>
                    <span className="text-[10px] font-black uppercase text-earth-400 block">Database Sync</span>
                    <span className="text-sm font-bold text-earth-900 dark:text-white">v9.4.0 Live</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Input Area */}
        <div className="lg:col-span-5 space-y-8">
          <div className={`aspect-square rounded-[3rem] border-4 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 bg-earth-50 dark:bg-earth-900/50 ${image ? 'border-agro-500 scale-[1.02] shadow-cinematic' : 'border-earth-200 dark:border-earth-800 hover:border-agro-400'}`}>
            <AnimatePresence mode="wait">
                {image ? (
                <motion.div 
                    key="image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                >
                    <img src={image} className="w-full h-full object-cover" alt="To diagnose" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    <button 
                        onClick={() => { setImage(null); setDiagnosis(null); }} 
                        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-2xl text-white transition-all border border-white/20 group"
                    >
                        <RefreshCcw size={24} className="group-hover:rotate-180 transition-transform duration-700" />
                    </button>
                    <div className="absolute bottom-8 left-8 text-white">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 block opacity-70">Capture Status</span>
                        <span className="text-lg font-bold flex items-center gap-2"><CheckCircle2 size={18} className="text-agro-400"/> Sample Prepared</span>
                    </div>
                </motion.div>
                ) : (
                <motion.div 
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-12"
                >
                    <div className="w-24 h-24 bg-white dark:bg-earth-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl text-earth-300">
                        <Camera size={48} />
                    </div>
                    <button 
                        onClick={() => fileInputRef.current?.click()} 
                        className="bg-earth-900 dark:bg-white text-white dark:text-earth-900 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                    >
                        Initialize Capture
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <p className="mt-6 text-[10px] font-black text-earth-400 uppercase tracking-[0.2em]">Ready for spectral analysis</p>
                </motion.div>
                )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={handleAnalyze} 
            disabled={!image || isAnalyzing} 
            className="w-full bg-agro-600 hover:bg-agro-500 text-white py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-agro-600/20 active:scale-[0.98] transition-all border border-white/10"
          >
            {isAnalyzing ? (
                <><Loader2 className="animate-spin" size={20} /> DOWNLINKING...</>
            ) : (
                <><Microscope size={22} /> START NEURAL DIAGNOSIS</>
            )}
          </button>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7 flex flex-col min-h-[500px]">
          <div className="bg-white dark:bg-earth-900 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm flex-1 flex flex-col overflow-hidden relative">
            
            {/* Header */}
            <div className="bg-earth-50 dark:bg-earth-800/50 p-8 border-b border-earth-100 dark:border-earth-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-earth-800 rounded-2xl flex items-center justify-center text-agro-600 shadow-sm"><Brain size={24}/></div>
                    <div>
                        <h4 className="text-sm font-black text-earth-900 dark:text-white uppercase tracking-widest">Diagnostic Output</h4>
                        <p className="text-[10px] text-earth-400 font-bold uppercase tracking-widest">EnvirosAgro-Core-v5.2</p>
                    </div>
                </div>
                {diagnosis && (
                    <span className="px-4 py-1.5 bg-agro-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-agro-600/20">Analysis Verified</span>
                )}
            </div>

            {/* Content */}
            <div className="p-10 flex-1 overflow-y-auto ea-scroll-area">
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center gap-10"
                  >
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-earth-100 border-t-agro-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-agro-500">
                            <Microscope size={24} />
                        </div>
                    </div>
                    <div className="text-center space-y-4">
                        <p className="text-xl font-serif font-black text-earth-900 dark:text-white tracking-tight italic animate-pulse">
                            {steps[analysisStep]}
                        </p>
                        <div className="flex gap-1 justify-center">
                            {[0,1,2,3,4].map(i => (
                                <div key={i} className={`w-12 h-1.5 rounded-full transition-all duration-500 ${i <= analysisStep ? 'bg-agro-500' : 'bg-earth-100 dark:bg-earth-800'}`}></div>
                            ))}
                        </div>
                    </div>
                  </motion.div>
                ) : diagnosis ? (
                  <motion.div 
                    key="diagnosis"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-earth dark:prose-invert max-w-none"
                  >
                    <div className="flex items-start gap-4 mb-10 p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-[2rem]">
                        <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
                        <div>
                           <h3 className="text-xl font-bold text-earth-900 dark:text-white m-0 mb-1 leading-none uppercase tracking-tight">Critical Findings Detected</h3>
                           <p className="text-xs text-earth-500 font-medium m-0">Biological anomaly detected in Sector Sample. Proceed with remediation logic.</p>
                        </div>
                    </div>
                    
                    <div className="text-earth-700 dark:text-earth-200 leading-relaxed text-lg font-medium whitespace-pre-wrap">
                        {diagnosis}
                    </div>

                    <div className="mt-12 pt-8 border-t border-earth-100 dark:border-earth-800 flex gap-4">
                        <button className="flex-1 bg-earth-900 dark:bg-white text-white dark:text-earth-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Save to Registry</button>
                        <button className="flex-1 bg-agro-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-agro-600/20">Get Treatment Path</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-6"
                  >
                    <div className="w-20 h-20 bg-earth-50 dark:bg-earth-800 rounded-[2rem] flex items-center justify-center text-earth-200">
                        <ImageIcon size={40} />
                    </div>
                    <div>
                        <p className="text-xl font-serif font-black text-earth-900 dark:text-white tracking-tight">Awaiting Neural Link</p>
                        <p className="text-sm text-earth-400 font-medium max-w-xs mt-2">Initialize capture and start diagnosis to receive biological intelligence telemetry.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="bg-earth-50 dark:bg-earth-800/30 p-6 flex items-center justify-center gap-4 border-t border-earth-100 dark:border-earth-800">
                <ShieldCheck size={18} className="text-agro-600" />
                <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Biological Integrity Handshake Protocol v2.1 Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
