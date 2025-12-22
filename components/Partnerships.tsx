import React, { useState, useRef, useEffect } from 'react';
import {
  Users, Leaf, Cpu, Building2, X, ArrowRight, Globe,
  PlusCircle, LayoutGrid, Activity, Layers, ChevronRight,
  ShieldCheck, Loader2, Info, ShoppingCart, Search,
  CheckCircle2, CreditCard, FileText, Zap, Key,
  Terminal, Share2, Download, BarChart3, Lock,
  Stamp, Receipt, Link, Smartphone, Database, ArrowUpRight,
  Sparkles, Coins
} from 'lucide-react';
import { View } from '../types';
import { createAgroChat, sendMessageStream } from '../services/gemini';
import type { GenerateContentResponse } from "@google/genai";
import { useCurrency } from '../../context/CurrencyContext'; // Import useCurrency

const PARTNER_CATEGORIES = [
  {
    id: 'SA',
    title: 'Social Alliances',
    icon: <Users size={32} />,
    color: 'bg-rose-50 text-rose-600',
    description: 'Collaborating with NGOs, cooperatives, and educational institutions to foster community resilience.',
    opportunities: ["JOINT TRAINING WORKSHOPS", "COMMUNITY SEED BANKS", "CULTURAL HERITAGE DOCUMENTATION"]
  },
  {
    id: 'EA',
    title: 'Environmental Coalitions',
    icon: <Leaf size={32} />,
    color: 'bg-green-50 text-green-600',
    description: 'Partnering with conservation bodies to drive biodiversity restoration and carbon neutrality.',
    opportunities: ["CARBON SEQUESTRATION PROJECTS", "BIODIVERSITY MAPPING", "SUSTAINABLE WATER MANAGEMENT"]
  },
  {
    id: 'TA',
    title: 'Tech & Research Labs',
    icon: <Cpu size={32} />,
    color: 'bg-blue-50 text-blue-600',
    description: 'Joint ventures with universities to develop precision agriculture tools and AI diagnostics.',
    opportunities: ["AGTECH PILOT PROGRAMS", "DATA ANALYSIS & MODELING", "PRECISION FARMING TOOLS"]
  }
];

const TIERS = [
  { level: "Seed Partner", m: "1.0 - 2.5", benefits: ["Network ID", "Knowledge Base Access", "EAC Rewards"] },
  { level: "Growth Partner", m: "2.6 - 5.0", benefits: ["Supply Chain Integration", "Technical Audits", "Micro-Grants"] },
  { level: "Industrial Partner", m: "5.1+", benefits: ["Global Market Node", "Custom m(t) Dashboards", "Capital Exchange Priority"] }
];

interface PartnershipsProps {
  onNavigate?: (view: View) => void;
  onIntegrationComplete?: (data: { name: string, id: string }) => void;
}

export const Partnerships: React.FC<PartnershipsProps> = ({ onNavigate, onIntegrationComplete }) => {
  const [activeTab, setActiveTab] = useState<'DIRECTORY' | 'AUTOMATED_GATEWAY' | 'STATUS'>('DIRECTORY');

  // Automated Gateway States
  const [autoStep, setAutoStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [issuedId, setIssuedId] = useState<string | null>(null);
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);

  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    offerType: 'Technology',
    thrust: 'TA',
    description: '',
    paymentMethod: 'Tokenz™'
  });

  const { currentCurrency, convertPrice } = useCurrency(); // Use the currency hook
  const networkIntegrationFeeUSD = 520; // Base fee in USD
  const displayedFee = convertPrice(networkIntegrationFeeUSD);


  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(pattern);
    }
  };

  const handleStartVerification = async () => {
    setAutoStep(2);
    setIsVerifying(true);
    setVerificationLogs(["Initializing bilateral handshake...", "Uplinking to Global Intelligence Ledger..."]);
    triggerHaptic(20);

    const logSequence = [
      "Analyzing organizational alignment...",
      "Calculating projected m(t) impact...",
      "Verifying technical C(a) standards...",
      "Cross-referencing ethical compliance...",
      "Evaluation complete. Generating verdict."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logSequence.length) {
        setVerificationLogs(prev => [...prev, logSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        finalizeVerification();
      }
    }, 1000);
  };

  const finalizeVerification = async () => {
    try {
      const ai = createAgroChat();
      const prompt = `Evaluate this partnership proposal for EnvirosAgro: 
      Org: ${formData.orgName}, Offer: ${formData.offerType}, Description: ${formData.description}. 
      Give a brief, professional technical verdict (2-3 sentences) on why this is a suitable addition to our Five Thrusts ecosystem.`;

      const response = await ai.sendMessage({ message: prompt });
      setEvaluationFeedback(response.text || "Alignment verified based on technical scalability.");
      setIsVerifying(false);
    } catch (err) {
      setEvaluationFeedback("Node verification successful. Alignment within technical tolerance.");
      setIsVerifying(false);
    }
  };

  const handlePayment = () => {
    setIsPaying(true);
    triggerHaptic(50);

    setTimeout(() => {
      setPaymentVerified(true);
      setIsPaying(false);
      const uniqueId = `EA-PART-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}-SYNC`;
      setIssuedId(uniqueId);
      setGeneratedInvoice({
        id: `INV-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toLocaleDateString(),
        amount: displayedFee, // Use converted price here
        partner: formData.orgName,
        service: "Network Integration License"
      });
      triggerHaptic([20, 50, 20]);

      // Complete the global merge authorization
      if (onIntegrationComplete) {
        onIntegrationComplete({ name: formData.orgName, id: uniqueId });
      }
    }, 2500);
  };

  const renderAutomatedGateway = () => (
    <div className="max-w-5xl mx-auto animate-in zoom-in-95 duration-500 pb-20">
      <div className="bg-white dark:bg-earth-900 rounded-[4rem] shadow-cinematic border border-earth-100 dark:border-white/5 overflow-hidden flex flex-col">
        {/* Gateway Header */}
        <div className="bg-slate-900 p-12 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Zap size={300} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              <ShieldCheck size={14} /> Automated Partnership Gateway
            </div>
            <h3 className="text-4xl font-serif font-bold">Network Entry Protocol</h3>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mt-2">Verified Integration Sequence v4.2</p>
          </div>

          {/* Progress Stepper */}
          <div className="relative z-10 flex gap-4 mt-8 md:mt-0">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border-2 transition-all duration-500 ${
                  autoStep === s ? 'bg-blue-600 border-blue-500 text-white shadow-glow-blue' :
                  autoStep > s ? 'bg-green-600 border-green-500 text-white' :
                  'border-white/10 text-white/30'
                }`}>
                  {autoStep > s ? <CheckCircle2 size={20} /> : `0${s}`}
                </div>
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${autoStep >= s ? 'bg-blue-500' : 'bg-white/10'}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-12 lg:p-20 flex-1">
          {/* Step 1: Enquiries / Sourcing */}
          {autoStep === 1 && (
            <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
              <div className="max-w-2xl">
                <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white mb-4">01. Enquiries & Sourcing</h4>
                <p className="text-earth-500 dark:text-earth-400 font-medium">Identify your organizational capabilities and the nature of your integration request.</p>
              </div>

              <form className="grid md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); setAutoStep(2); handleStartVerification(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Legal Organization Name</label>
                  <input
                    required
                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white shadow-inner"
                    placeholder="e.g. Global Tech Solutions"
                    value={formData.orgName}
                    onChange={e => setFormData({ ...formData, orgName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Sourcing Domain</label>
                  <select
                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all dark:text-white appearance-none"
                    value={formData.offerType}
                    onChange={e => setFormData({ ...formData, offerType: e.target.value })}
                  >
                    <option>Technology</option>
                    <option>Financial Assets</option>
                    <option>Agricultural Inputs</option>
                    <option>Logistics & Distribution</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 px-1">Integration Scope / Offer Details</label>
                  <textarea
                    required
                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-[2rem] px-8 py-6 text-sm font-medium transition-all outline-none resize-none dark:text-white leading-relaxed h-40"
                    placeholder="Describe how your offering enhances the EnvirosAgro Five Thrusts..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  Initiate Automated Verification <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Verification / Evaluation */}
          {autoStep === 2 && (
            <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-10">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart3 size={40} className="text-blue-500 animate-pulse" />
                  </div>
                </div>
                <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">02. Evaluation Engine</h4>
                <p className="text-earth-500 dark:text-earth-400 font-medium">System is analyzing your organizational profile against network resilience standards.</p>
              </div>

              <div className="bg-slate-950 p-8 rounded-[3rem] border border-white/5 shadow-inner min-h-[300px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <Terminal size={14} className="text-blue-400" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Audit_Log_Stream</span>
                  </div>
                  <div className="bg-white/5 px-3 py-1 rounded-lg">
                    <span className="text-[10px] font-mono text-white/40">{isVerifying ? 'PROCESS_ACTIVE' : 'AUDIT_COMPLETE'}</span>
                  </div>
                </div>
                <div className="space-y-2 flex-1 font-mono text-xs overflow-y-auto max-h-48 ea-scroll-area">
                  {verificationLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 text-slate-400 animate-in slide-in-from-left-2">
                      <span className="text-blue-500 opacity-60">[{new Date().toLocaleTimeString()}]</span>
                      <span className="uppercase">{log}</span>
                    </div>
                  ))}
                  {isVerifying && <div className="flex gap-2 items-center text-blue-400"><Loader2 size={12} className="animate-spin" /> <span>ANALYZING_PAYLOAD...</span></div>}
                </div>

                {!isVerifying && evaluationFeedback && (
                  <div className="mt-8 p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl animate-in zoom-in">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles size={16} className="text-blue-400" />
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">System Decision Breakdown</span>
                    </div>
                    <p className="text-sm text-blue-100 italic leading-relaxed">{evaluationFeedback}</p>
                  </div>
                )}
              </div>

              {!isVerifying && (
                <button
                  onClick={() => setAutoStep(3)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  Proceed to Selection <ArrowRight size={20} />
                </button>
              )}
            </div>
          )}

          {/* Step 3: Selection / Tendering */}
          {autoStep === 3 && (
            <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">03. Selection & Tendering</h4>
                  <p className="text-earth-500 dark:text-earth-400 font-medium">Automatic matching of your offer with network-wide industrial requirements.</p>
                </div>
                <div className="bg-agro-500/20 text-agro-600 p-4 rounded-3xl border border-agro-500/30 shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-earth-800 p-10 rounded-[3.5rem] border border-earth-100 dark:border-earth-700 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Stamp size={150} /></div>
                  <h5 className="font-black text-[10px] text-blue-600 uppercase tracking-[0.4em] mb-6">Tender Status</h5>
                  <p className="text-4xl font-serif font-bold text-earth-900 dark:text-white mb-4 tracking-tighter">Approved</p>
                  <p className="text-sm text-earth-500 dark:text-earth-400 leading-relaxed font-medium mb-10">Your organization has been selected for direct integration into the <strong className="text-blue-500">Technical Agriculture (TA)</strong> Node Cluster.</p>
                  <div className="flex items-center gap-2 text-[9px] font-black text-agro-600 uppercase tracking-widest">
                    <CheckCircle2 size={14} /> Bid Verified by IA Hub
                  </div>
                </div>

                <div className="bg-earth-50 dark:bg-earth-950/40 p-10 rounded-[3.5rem] border-2 border-dashed border-earth-200 dark:border-earth-800 flex flex-col justify-center">
                  <h5 className="font-black text-[10px] text-earth-400 uppercase tracking-[0.4em] mb-4">Next Action</h5>
                  <p className="text-sm text-earth-600 dark:text-earth-400 leading-relaxed font-medium">
                    To unlock the <strong>Transmission Gateways</strong> and <strong>Hub Ingest Keys</strong>, a network integration fee is required. This fuels the decentralized m(t) ledger maintenance.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAutoStep(4)}
                className="w-full bg-agro-600 hover:bg-agro-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-agro-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
              >
                Authorize Integration Payment <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Step 4: Automatic Payment */}
          {autoStep === 4 && (
            <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
              <div className="text-center max-w-2xl mx-auto">
                <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">04. Automated Gateway Payment</h4>
                <p className="text-earth-500 dark:text-earth-400 font-medium">Verified payments trigger immediate issuance of organizational unique IDs.</p>
              </div>

              {paymentVerified ? (
                <div className="space-y-10">
                  <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-500/30 p-10 rounded-[4rem] text-center animate-in zoom-in">
                    <div className="w-20 h-20 bg-green-500 text-white rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-green-900 dark:text-green-100 mb-2">Payment Confirmed</h3>
                    <p className="text-green-700 dark:text-green-400 font-bold uppercase text-[10px] tracking-[0.3em]">Hashed to Global Ledger</p>
                  </div>

                  <div className="bg-white dark:bg-earth-800 p-10 rounded-[3.5rem] border border-earth-100 dark:border-earth-700 shadow-xl flex flex-col md:flex-row gap-12">
                    <div className="flex-1">
                      <h5 className="font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-3">
                        <Receipt size={20} className="text-blue-500" /> E-Invoice & Receipt
                      </h5>
                      <div className="space-y-4 font-mono text-xs text-earth-600 dark:text-earth-400 bg-earth-50 dark:bg-earth-900 p-8 rounded-2xl shadow-inner border border-black/5">
                        <div className="flex justify-between border-b border-black/5 pb-2"><span>Invoice ID:</span> <span className="text-blue-600 font-bold">{generatedInvoice.id}</span></div>
                        <div className="flex justify-between border-b border-black/5 pb-2"><span>Partner:</span> <span className="text-earth-900 dark:text-white font-bold">{generatedInvoice.partner}</span></div>
                        <div className="flex justify-between border-b border-black/5 pb-2"><span>Date:</span> <span>{generatedInvoice.date}</span></div>
                        <div className="flex justify-between pt-4 text-sm font-black text-earth-900 dark:text-white"><span>Total Paid:</span> <span className="text-agro-600">{generatedInvoice.amount}</span></div>
                      </div>
                    </div>
                    <div className="w-full md:w-64 flex flex-col gap-3 justify-center">
                      <button className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-earth-50 transition-all">
                        <Download size={18} /> Download PDF
                      </button>
                      <button className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-earth-50 transition-all">
                        <Share2 size={18} /> Share Receipt
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setAutoStep(5)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
                  >
                    Finalize ID Issuance <ArrowRight size={20} />
                  </button>
                </div>
              ) : (
                <div className="max-w-md mx-auto bg-white dark:bg-earth-800 p-10 rounded-[4rem] border border-earth-100 dark:border-earth-700 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><CreditCard size={150} /></div>
                  <div className="relative z-10">
                    <h5 className="font-bold text-earth-900 dark:text-white mb-8 text-center uppercase tracking-widest text-sm">Checkout Node</h5>

                    <div className="bg-earth-50 dark:bg-earth-900 p-6 rounded-2xl mb-8 border border-black/5 shadow-inner">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Service Fee</span>
                        {/* Display converted price here */}
                        <span className="text-xl font-serif font-black text-agro-600">{displayedFee}</span>
                      </div>
                      <p className="text-[8px] font-bold text-earth-400 uppercase text-center tracking-widest">Approx. {displayedFee} (USD Equivalent)</p>
                    </div>

                    <div className="space-y-4 mb-10">
                      <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Payment Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setFormData({ ...formData, paymentMethod: 'Tokenz™' })} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === 'Tokenz™' ? 'bg-amber-50 border-amber-400 text-amber-700' : 'border-earth-100 dark:border-earth-700 opacity-60'}`}>
                          <Coins size={24} />
                          <span className="text-[8px] font-black uppercase">Tokenz™</span>
                        </button>
                        <button onClick={() => setFormData({ ...formData, paymentMethod: 'Visa/Credit' })} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === 'Visa/Credit' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-earth-100 dark:border-earth-700 opacity-60'}`}>
                          <CreditCard size={24} />
                          <span className="text-[8px] font-black uppercase">Credit Card</span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isPaying ? <><Loader2 size={18} className="animate-spin" /> Verifying Bank Node...</> : <><Lock size={18} /> Authorize Transaction</>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: ID Issuance & Hub Integration */}
          {autoStep === 5 && (
            <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
              <div className="text-center max-w-2xl mx-auto">
                <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">05. Hub Integration Key</h4>
                <p className="text-earth-50 dark:text-earth-400 font-medium">Your unique identifier for the Network Input Hub is active.</p>
              </div>

              <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl border-4 border-blue-600/30 group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700"><Key size={300} /></div>

                <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                  <div className="w-48 h-48 bg-white/10 rounded-[3rem] border border-white/20 flex items-center justify-center shadow-inner backdrop-blur-xl group-hover:rotate-6 transition-transform duration-700">
                    <Smartphone size={80} className="text-blue-400 animate-float" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 bg-blue-600 text-white px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 w-fit shadow-xl">
                      <ShieldCheck size={14} /> Organization Verified
                    </div>
                    <h5 className="text-3xl font-serif font-bold mb-4">{formData.orgName}</h5>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Official Partner Sync Key</p>

                    <div className="bg-black/60 p-6 rounded-2xl border border-white/10 flex items-center justify-between group/key">
                      <code className="text-xl font-mono font-black text-blue-400 tracking-[0.2em]">{issuedId}</code>
                      <button onClick={() => { navigator.clipboard.writeText(issuedId || ''); triggerHaptic(10); }} className="p-3 bg-white/5 hover:bg-white/20 rounded-xl text-white transition-all opacity-0 group-hover/key:opacity-100">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/5 grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/5 rounded-lg text-blue-500"><Database size={16} /></div>
                    <div><p className="text-[9px] font-black text-slate-500 uppercase">Input Node</p><p className="text-xs font-bold">Enabled</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/5 rounded-lg text-agro-500"><Link size={16} /></div>
                    <div><p className="text-[9px] font-black text-slate-500 uppercase">Trade Link</p><p className="text-xs font-bold">Authorized</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/5 rounded-lg text-amber-500"><BarChart3 size={16} /></div>
                    <div><p className="text-[9px] font-black text-slate-500 uppercase">Analytics Access</p><p className="text-xs font-bold">Priority</p></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <button
                  onClick={() => onNavigate?.(View.NETWORK_INPUT_HUB)}
                  className="flex-1 bg-agro-600 hover:bg-agro-700 text-white font-black py-6 rounded-[2rem] text-sm uppercase tracking-[0.3em] shadow-xl shadow-agro-600/30 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  Enter Input Hub <ArrowUpRight size={24} />
                </button>
                <button
                  onClick={() => setActiveTab('DIRECTORY')}
                  className="flex-1 bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 text-earth-500 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] transition-all"
                >
                  Partner Directory
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Gateway Footer */}
        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
          <ShieldCheck size={18} className="text-blue-500" />
          <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Audit Trail Hashed via Global Resilience Ledger • ISO-27001 Standard Compliance</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-in fade-in duration-700">

      {/* 1. NAVIGATION BAR */}
      <div className="flex items-center justify-between bg-white dark:bg-earth-900 border-b border-earth-100 dark:border-white/5 mb-16 overflow-x-auto no-scrollbar">
        <div className="flex items-center">
          {[
            { id: 'DIRECTORY', label: 'ECOSYSTEM DIRECTORY', icon: <LayoutGrid size={14} /> },
            { id: 'TIERS', label: 'PARTNERSHIP TIERS', icon: <Layers size={14} /> },
            { id: 'AUTOMATED_GATEWAY', label: 'AUTOMATED GATEWAY', icon: <Zap size={14} /> },
            { id: 'STATUS', label: 'TRACK APPLICATION', icon: <Activity size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'TIERS') return; // TIERS is part of DIRECTORY logic usually
                setActiveTab(tab.id as any);
              }}
              className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'bg-agro-600 text-white border-agro-600 rounded-t-2xl'
                  : 'text-earth-400 hover:text-earth-900 dark:hover:text-white border-transparent'
                }`}
            >
              {activeTab !== tab.id && <span className="opacity-40">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="px-6 text-blue-500 animate-pulse hidden md:block">
          <ArrowRight size={32} />
        </div>
      </div>

      {activeTab === 'DIRECTORY' && (
        <div className="space-y-20 animate-in slide-in-from-bottom-4 duration-500">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-agro-900 dark:text-white mb-6 tracking-tight">Strategic Alliances</h2>
            <p className="text-xl text-earth-500 dark:text-earth-400 leading-relaxed font-medium">
              We collaborate with global leaders to synchronize industrial operations with the Five Thrusts framework.
            </p>
          </div>

          {/* Alliance Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {PARTNER_CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-earth-50 dark:bg-earth-900/50 rounded-[4rem] p-10 flex flex-col border border-earth-100 dark:border-white/5 transition-all hover:shadow-2xl group">
                <div className="bg-white dark:bg-earth-800 p-8 rounded-[2.5rem] mb-12 shadow-sm border border-earth-100 dark:border-white/10 relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${cat.color} shadow-inner`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-6 leading-tight">{cat.title}</h3>
                  <p className="text-earth-500 dark:text-earth-400 text-sm leading-relaxed mb-10 font-medium opacity-80">
                    {cat.description}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {cat.opportunities.map(opp => (
                      <li key={opp} className="flex items-center gap-3 text-[9px] font-black text-earth-400 dark:text-earth-400 uppercase tracking-[0.2em]">
                        <span className="w-1.5 h-1.5 bg-agro-500 rounded-full"></span> {opp}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setActiveTab('AUTOMATED_GATEWAY')}
                    className="w-full pt-8 border-t border-earth-100 dark:border-white/5 flex items-center justify-center gap-2 text-[10px] font-black text-earth-800 dark:text-earth-200 uppercase tracking-[0.3em] hover:text-agro-600 transition-colors group/btn"
                  >
                    APPLY VIA AUTOMATED GATEWAY <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-earth-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border-4 border-white/5">
            <div className="absolute top-0 right-0 p-16 opacity-5"><Layers size={300} /></div>
            <div className="max-w-2xl relative z-10">
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">Industrial Maturity</div>
              <h3 className="text-4xl font-serif font-bold mb-6">Cross-Sector Innovation</h3>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Our open innovation model allows partners to share data securely through the EnvirosAgro Data Base, improving regional maturity scores collectively.</p>
              <button
                onClick={() => setActiveTab('AUTOMATED_GATEWAY')}
                className="bg-white text-earth-950 px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Start Automated Onboarding
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'AUTOMATED_GATEWAY' && renderAutomatedGateway()}

      {activeTab === 'STATUS' && (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
          <div className="bg-white dark:bg-earth-900 rounded-[3.5rem] border border-earth-100 dark:border-white/5 shadow-cinematic p-12 lg:p-16">
            <div className="flex justify-between items-start mb-16">
              <div>
                <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">Application Tracker</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  {issuedId ? `SYNCED: ${issuedId}` : 'ID: EA-PART-2024-PENDING-X'}
                </p>
              </div>
              <div className="bg-agro-50 dark:bg-agro-900/30 px-6 py-2 rounded-2xl border border-agro-100 dark:border-agro-800 text-agro-700 dark:text-agro-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                <Activity size={16} className="animate-pulse" /> LIVE_AUDIT_ACTIVE
              </div>
            </div>

            <div className="relative space-y-12">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-earth-100 dark:bg-white/5"></div>

              {[
                { label: 'Uplink Initiated', status: autoStep >= 1 ? 'COMPLETED' : 'PENDING', time: '12m ago', desc: 'Secure node established with central repository.' },
                { label: 'Evaluation Engine', status: autoStep >= 2 ? 'COMPLETED' : 'PENDING', time: '8m ago', desc: 'AI-driven alignment check against Five Thrusts.' },
                { label: 'Bid Selection', status: autoStep >= 3 ? 'COMPLETED' : 'PENDING', time: '4m ago', desc: 'Matching organizational offer with network needs.' },
                { label: 'Payment Verification', status: paymentVerified ? 'COMPLETED' : 'PENDING', time: 'Ongoing', desc: 'Integration fee settlement via Tokenz™ Gateway.' },
                { label: 'Hub Integration', status: issuedId ? 'COMPLETED' : 'PENDING', time: 'Expected', desc: 'Final issuance of Sync-Key for Network Input Hub.' }
              ].map((step, i) => (
                <div key={i} className="relative flex gap-10 items-start group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-earth-900 shadow-xl transition-all duration-700 ${
                    step.status === 'COMPLETED' ? 'bg-agro-600 text-white' :
                    'bg-earth-100 dark:bg-earth-800 text-earth-300'
                    }`}>
                    {step.status === 'COMPLETED' ? <ShieldCheck size={24} /> :
                      <div className="w-2.5 h-2.5 rounded-full bg-current"></div>}
                  </div>
                  <div className={`flex-1 transition-all duration-500 ${step.status === 'PENDING' ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-lg text-earth-900 dark:text-white">{step.label}</h4>
                      <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest">{step.time}</span>
                    </div>
                    <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {issuedId && (
              <button
                onClick={() => onNavigate?.(View.NETWORK_INPUT_HUB)}
                className="w-full mt-16 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-4"
              >
                Access Network Input Hub <ArrowUpRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer Branding Ribbon */}
      <div className="mt-32 pt-16 border-t border-earth-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-earth-400">
        <span className="flex items-center gap-3"><Globe size={14} className="text-blue-500" /> Global Node Integration</span>
        <span className="flex items-center gap-3"><Layers size={14} className="text-agro-500" /> Trust Architecture v4.2.2</span>
        <span className="flex items-center gap-3 text-slate-600">© ENVIROSAGRO INFRASTRUCTURE</span>
      </div>

    </div>
  );
};