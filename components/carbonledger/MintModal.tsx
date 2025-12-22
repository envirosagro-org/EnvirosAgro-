import React from 'react';
import { X, Zap, CheckCircle2, Database, Sparkles, ArrowUpRight } from 'lucide-react';
import { User, View } from '../../types';

interface MintModalProps {
  setShowMintModal: (show: boolean) => void;
  mintStatus: 'IDLE' | 'PROCESSING' | 'SUCCESS';
  setMintStatus: (status: 'IDLE' | 'PROCESSING' | 'SUCCESS') => void;
  mintAmount: string;
  setMintAmount: (amount: string) => void;
  selectedProjectId: number;
  setSelectedProjectId: (id: number) => void;
  projects: any[];
  steps: string[];
  processingStep: number;
  handleMint: () => void;
  MINT_RATE: number;
  user: User | null;
  onNavigate?: (view: View) => void;
}

export const MintModal: React.FC<MintModalProps> = ({
  setShowMintModal,
  mintStatus,
  setMintStatus,
  mintAmount,
  setMintAmount,
  selectedProjectId,
  setSelectedProjectId,
  projects,
  steps,
  processingStep,
  handleMint,
  MINT_RATE,
  user,
  onNavigate,
}) => {
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-earth-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
        <div className="bg-agro-900 p-8 text-white flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Zap size={100} /></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-serif font-bold">Asset Minting Console</h3>
            <p className="text-xs text-agro-300 font-bold uppercase tracking-widest mt-1">Biomass to Digital Capital Protocol</p>
          </div>
          <button
            onClick={() => { setShowMintModal(false); setMintStatus('IDLE'); }}
            className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-10">
          {mintStatus === 'IDLE' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest block px-1">Select Verified Source</label>
                <div className="grid gap-3">
                  {projects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selectedProjectId === p.id ? 'bg-agro-50 dark:bg-agro-950/30 border-agro-500 shadow-lg' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-800 opacity-60'}`}
                    >
                      <div>
                        <h4 className="font-bold text-sm text-earth-900 dark:text-white">{p.name}</h4>
                        <p className="text-[10px] text-earth-500 font-bold uppercase tracking-tighter">{p.type} • {p.availableTons} Tons Available</p>
                      </div>
                      {selectedProjectId === p.id && <CheckCircle2 size={18} className="text-agro-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Tons to Convert</label>
                  <span className="text-xs font-bold text-agro-600">Max: {selectedProject?.availableTons}</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    max={selectedProject?.availableTons}
                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 rounded-2xl p-6 text-3xl font-mono font-black text-center focus:outline-none focus:border-agro-500 transition-all dark:text-white"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-earth-300 font-bold">TONS</div>
                </div>
              </div>

              <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-2xl border border-earth-100 dark:border-earth-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-1">EAC Value to Mint</p>
                  <p className="text-3xl font-serif font-bold text-agro-700 dark:text-agro-400">
                    {(parseFloat(mintAmount || '0') * MINT_RATE).toFixed(0)} <span className="text-sm font-sans font-black text-earth-400">EAC</span>
                  </p>
                </div>
                <Sparkles size={32} className="text-amber-400 opacity-40" />
              </div>

              <button
                onClick={handleMint}
                disabled={!mintAmount || parseFloat(mintAmount) <= 0 || parseFloat(mintAmount) > (selectedProject?.availableTons || 0)}
                className="w-full bg-agro-600 hover:bg-agro-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-agro-600/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 text-sm tracking-widest uppercase"
              >
                INITIALIZE MINTING SEQUENCE
              </button>
            </div>
          )}

          {mintStatus === 'PROCESSING' && (
            <div className="py-12 flex flex-col items-center text-center space-y-10">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-agro-100 dark:border-earth-800 border-t-agro-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Database size={40} className="text-agro-600 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white">Minting in Progress</h4>
                <p className="text-earth-500 font-mono text-xs uppercase tracking-widest animate-pulse">
                  {steps[processingStep]}
                </p>
              </div>

              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-[10px] font-black text-earth-400 uppercase tracking-widest">
                  <span>Sequence Progress</span>
                  <span>{((processingStep + 1) / steps.length * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-earth-100 dark:bg-earth-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-agro-600 transition-all duration-700"
                    style={{ width: `${(processingStep + 1) / steps.length * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {mintStatus === 'SUCCESS' && (
            <div className="py-12 text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 shadow-inner">
                <CheckCircle2 size={56} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4 tracking-tight">Minting Successful</h3>
              <p className="text-earth-600 dark:text-earth-400 mb-10 max-w-xs mx-auto leading-relaxed">
                Verified biomass assets have been successfully converted and deployed to your ESIN wallet.
              </p>

              <div className="bg-agro-50 dark:bg-agro-900/30 p-8 rounded-[2.5rem] border border-agro-100 dark:border-agro-800 inline-block min-w-[280px] shadow-sm">
                <p className="text-[10px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-widest mb-2">New Portfolio Balance</p>
                <p className="text-5xl font-serif font-bold text-agro-900 dark:text-white">
                  {user?.eacBalance} <span className="text-xl font-sans font-black opacity-40">EAC</span>
                </p>
              </div>

              <div className="mt-12 flex gap-4">
                <button
                  onClick={() => setShowMintModal(false)}
                  className="flex-1 bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 text-earth-600 dark:text-earth-300 font-black py-4 rounded-2xl hover:bg-earth-50 transition-all text-xs uppercase tracking-widest"
                >
                  Close
                </button>
                <button
                  onClick={() => { setShowMintModal(false); onNavigate?.(View.FINANCE); }}
                  className="flex-1 bg-agro-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-agro-600/20 hover:bg-agro-700 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Go to Finance <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-earth-50 dark:bg-earth-800/30 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-blue-500" />
          <p className="text-[10px] text-earth-400 dark:text-earth-600 font-black uppercase tracking-[0.4em]">Audit Trail Logged to Network Node EA-SYNC-8</p>
        </div>
      </div>
    </div>
  );
};
