import React, { useState } from 'react';
import { 
  User, Mail, Building2, Globe, ShieldCheck, 
  ArrowRight, Loader2, CheckCircle2, Ticket
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    esin: '',
    type: 'INDUSTRIAL'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setStep(2);
        toast.success("Summit registration successful!");
    }, 2000);
  };

  if (step === 2) {
    return (
        <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-12 border border-earth-100 dark:border-earth-800 shadow-cinematic text-center animate-in zoom-in-95">
            <div className="w-24 h-24 bg-green-50 dark:bg-agro-900/30 text-agro-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-serif font-black text-earth-900 dark:text-white mb-4">You're Registered!</h2>
            <p className="text-earth-500 dark:text-earth-400 mb-10 max-w-md mx-auto">
                Your delegate credentials have been issued. A confirmation link and IA digital terminal key has been sent to your registered email.
            </p>
            <div className="bg-earth-50 dark:bg-earth-800 p-8 rounded-2xl border border-earth-100 dark:border-earth-700 mb-10 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase text-earth-400">Order Ref</span>
                    <span className="text-xs font-mono font-bold text-earth-900 dark:text-white">#SUMMIT-2024-X492</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-earth-400">Asset Cost</span>
                    <span className="text-sm font-black text-agro-600">500 EAC</span>
                </div>
            </div>
            <button className="bg-earth-900 dark:bg-white text-white dark:text-earth-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                Access IA Terminal
            </button>
        </div>
    );
  }

  return (
    <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-12 border border-earth-100 dark:border-earth-800 shadow-cinematic">
      <div className="mb-12">
        <h3 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-2">Delegate Registration</h3>
        <p className="text-earth-500 dark:text-earth-400 font-medium">Secure your node presence at the ScaleUp Summit 2024.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all dark:text-white" 
                />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                    required
                    type="email" 
                    placeholder="john@organization.org"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all dark:text-white" 
                />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 ml-1">Organization</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                    required
                    type="text" 
                    placeholder="Ecosystem Node"
                    value={formData.organization}
                    onChange={e => setFormData({...formData, organization: e.target.value})}
                    className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all dark:text-white" 
                />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 ml-1">ESIN (Optional)</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="EA-XXXX-XXXX"
                    value={formData.esin}
                    onChange={e => setFormData({...formData, esin: e.target.value})}
                    className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all dark:text-white" 
                />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'INDUSTRIAL'})}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.type === 'INDUSTRIAL' ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-700 hover:border-earth-200'}`}
            >
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 mb-1 block">INDUSTRIAL</span>
                <span className="text-sm font-bold text-earth-900 dark:text-white">Full Access</span>
            </button>
            <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'RESEARCH'})}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.type === 'RESEARCH' ? 'bg-agro-50 border-agro-500 dark:bg-agro-900/30' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-700 hover:border-earth-200'}`}
            >
                <span className="text-[9px] font-black uppercase tracking-widest text-agro-600 mb-1 block">RESEARCH</span>
                <span className="text-sm font-bold text-earth-900 dark:text-white">Labs Only</span>
            </button>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> VERIFYING NODE...</> : <><Ticket size={20} /> Deploy Delegate Registration</>}
        </button>
      </form>

      <div className="mt-12 flex items-center justify-center gap-4 text-earth-400">
         <Globe size={18} />
         <p className="text-[9px] font-black uppercase tracking-[0.4em]">Integrated with Global Node Network</p>
      </div>
    </div>
  );
};
