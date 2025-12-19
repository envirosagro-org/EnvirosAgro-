import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, Fingerprint, CreditCard, CheckCircle2, ArrowLeft, 
  Sprout, ThumbsUp, Coins, Send, Share2, Zap, Bell, MessageSquare, 
  LayoutGrid, ChevronRight, Tag, Info, ShieldCheck, MapPin, Search, 
  X, Loader2, Sparkles, UserCheck, Smartphone, QrCode, Download,
  ShoppingCart, Package, ArrowRight, Wallet, ArrowUpRight, ArrowDownRight, Clock,
  History
} from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { View, User } from '../types';
import { validateCommunityPost } from '../services/gemini';

type Tab = 'REGISTER_GROUP' | 'REGISTER_SOCIETY' | 'GET_ESIN' | 'ID_CARD' | 'FEED' | 'NOTIFICATIONS';

const REWARDS_HISTORY = [
  { day: 'Mon', amount: 15 },
  { day: 'Tue', amount: 12 },
  { day: 'Wed', amount: 18 },
  { day: 'Thu', amount: 14 },
  { day: 'Fri', amount: 11 },
  { day: 'Sat', amount: 22 },
  { day: 'Sun', amount: 19 },
];

const REDEEMABLE_TOOLS = [
  { id: 't1', name: 'Heirloom Seeds Pack', cost: 25, icon: <Sprout className="text-green-500" />, desc: 'Indigenous drought-resistant varieties.' },
  { id: 't2', name: 'IoT Soil Sensor', cost: 120, icon: <Zap className="text-blue-500" />, desc: 'Digital moisture & pH monitoring.' },
  { id: 't3', name: 'Bio-Fertilizer (5L)', cost: 40, icon: <DropletIcon />, desc: 'Microbial-rich organic soil food.' },
  { id: 't4', name: 'AgroPPE Kit', cost: 65, icon: <ShieldCheck className="text-red-500" />, desc: 'Breathable safety gear for field work.' },
];

function DropletIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>;
}

interface CommunityProps {
  user: User | null;
  onNavigate?: (view: View) => void;
  onAwardEac?: (amount: number) => void;
}

export const Community: React.FC<CommunityProps> = ({ user, onNavigate, onAwardEac }) => {
  const [activeTab, setActiveTab] = useState<Tab>('FEED');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('General');
  const [isProcessing, setIsProcessing] = useState(false);
  const [esinStep, setEsinStep] = useState(1);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  
  // Internal transaction tracking
  const [transactions, setTransactions] = useState<any[]>([
    { id: 101, type: 'EARN', amount: 10, source: 'Vertical Mulching Tip', date: '2h ago' },
    { id: 102, type: 'EARN', amount: 25, source: 'Society Onboarding', date: '5h ago' },
    { id: 103, type: 'EARN', amount: 15, source: 'Daily Login Reward', date: 'Yesterday' },
  ]);

  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: "Sarah Jenkins", 
      role: "Farmer", 
      time: "2h ago", 
      content: "Successfully implemented vertical mulching in our banana plantation. Soil moisture retention has improved significantly! 🍌💧 #SoilHealth", 
      thrust: "EA THRUST", 
      likes: 15, 
      reward: 10,
      aiAnalysis: "Verified: Strong alignment with Environmental Agriculture (EA). Impact score 9/10."
    },
    { 
      id: 2, 
      author: "Kiriaini Youth Group", 
      role: "Society", 
      time: "5h ago", 
      content: "Hosted a training session on Digital ID registration today. 50 new members onboarded to EnvirosAgro! 🚀 #CommunityGrowth", 
      thrust: "SA THRUST", 
      likes: 32, 
      reward: 25,
      aiAnalysis: "Verified: Critical Social Agriculture (SA) milestone. Community resilience factor high."
    }
  ]);

  const handlePostSubmit = async () => {
    if (!postContent.trim()) return;
    setIsProcessing(true);

    try {
        const analysis = await validateCommunityPost(postContent);
        
        const newPost = {
            id: Date.now(),
            author: user?.name || "Anonymous",
            role: user?.role || "Member",
            time: "Just now",
            content: postContent,
            thrust: postCategory.toUpperCase() + (postCategory === 'General' ? '' : ' THRUST'),
            likes: 0,
            reward: 10,
            aiAnalysis: analysis
        };

        setPosts([newPost, ...posts]);
        
        // Log transaction
        const newTx = {
            id: Date.now(),
            type: 'EARN',
            amount: 10,
            source: 'Sustainable Practice Log',
            date: 'Just now'
        };
        setTransactions([newTx, ...transactions]);

        setPostContent('');
        
        if (onAwardEac) onAwardEac(10);
    } catch (err) {
        console.error(err);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleSharePost = async (post: typeof posts[0]) => {
    // Ensure we share a valid absolute URL. If current origin is not http, use project home.
    const shareUrl = window.location.origin.startsWith('http') 
      ? window.location.href 
      : 'https://envirosagro.org';

    const shareData = {
      title: `EnvirosAgro Post by ${post.author}`,
      text: `${post.author} shared a sustainable agricultural practice on EnvirosAgro: "${post.content}"`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error("Error sharing:", err);
          // Fallback if share fails due to environment issues
          copyToClipboard(shareData);
        }
      }
    } else {
      copyToClipboard(shareData);
    }
  };

  const copyToClipboard = (data: { text: string, url: string }) => {
    navigator.clipboard.writeText(`${data.text} \n\nCheck it out at: ${data.url}`);
    alert("Post details copied to clipboard!");
  };

  const handleRedeem = (tool: typeof REDEEMABLE_TOOLS[0]) => {
    if (!user || (user.eacBalance || 0) < tool.cost) {
      alert("Insufficient EAC balance for this tool.");
      return;
    }
    
    setIsRedeeming(tool.id);
    // Simulate transaction
    setTimeout(() => {
      if (onAwardEac) onAwardEac(-tool.cost);
      
      // Log transaction
      const newTx = {
          id: Date.now(),
          type: 'SPEND',
          amount: tool.cost,
          source: `Redeemed: ${tool.name}`,
          date: 'Just now'
      };
      setTransactions([newTx, ...transactions]);

      setIsRedeeming(null);
      setRedeemSuccess(true);
      setTimeout(() => setRedeemSuccess(false), 3000);
    }, 1500);
  };

  const renderRegisterGroup = () => (
    <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-10 border border-earth-100 dark:border-earth-800 shadow-sm animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-rose-50 dark:bg-rose-950/30 text-rose-600 rounded-2xl">
                <Users size={32} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Register Farming Group</h3>
                <p className="text-earth-500 text-sm">Formalize your local collective for network benefits.</p>
            </div>
        </div>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Registration submitted for review."); setActiveTab('FEED'); }}>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-earth-400 tracking-widest px-1">Group Name</label>
                    <input required className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl px-5 py-4 transition-all" placeholder="e.g. Green Valley Collective" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-earth-400 tracking-widest px-1">Group Size</label>
                    <select className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl px-5 py-4 transition-all appearance-none">
                        <option>2-5 members</option>
                        <option>6-20 members</option>
                        <option>21-50 members</option>
                        <option>50+ members</option>
                    </select>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-black uppercase text-earth-400 tracking-widest px-1">Primary Thrust Focus</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['SA', 'EA', 'HA', 'TA', 'IA'].map(t => (
                        <button key={t} type="button" className="py-3 bg-earth-50 dark:bg-earth-800 rounded-xl font-bold text-earth-600 hover:bg-rose-500 hover:text-white transition-all">{t}</button>
                    ))}
                </div>
            </div>
            <button className="w-full bg-agro-900 text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all text-xs uppercase tracking-[0.2em]">
                SUBMIT GROUP REGISTRATION
            </button>
        </form>
    </div>
  );

  const renderRegisterSociety = () => (
    <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-10 border border-earth-100 dark:border-earth-800 shadow-sm animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-2xl">
                <Building2 size={32} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Society/Cooperative Onboarding</h3>
                <p className="text-earth-500 text-sm">Industrial level integration for large organizations.</p>
            </div>
        </div>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Onboarding request sent to strategic council."); setActiveTab('FEED'); }}>
            <div className="space-y-2">
                <label className="text-xs font-black uppercase text-earth-400 tracking-widest px-1">Legal Entity Name</label>
                <input required className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-4 transition-all" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-black uppercase text-earth-400 tracking-widest px-1">Registration Region</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" size={18} />
                    <input required className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-blue-500 rounded-2xl pl-12 pr-5 py-4 transition-all" placeholder="e.g. Nyeri County, Kenya" />
                </div>
            </div>
            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2"><ShieldCheck size={18} /> Compliance Prerequisite</h4>
                <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed">Society onboarding requires an initial EA Thrust audit within 30 days of registration to verify m(t) baseline potential.</p>
            </div>
            <button className="w-full nature-gradient text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all text-xs uppercase tracking-[0.2em]">
                START ONBOARDING PROCESS
            </button>
        </form>
    </div>
  );

  const renderGetESIN = () => (
    <div className="max-w-2xl mx-auto py-10">
        {esinStep === 1 && (
            <div className="bg-white dark:bg-earth-900 rounded-[3rem] p-12 border border-earth-100 dark:border-earth-800 text-center shadow-sm animate-in zoom-in-95">
                <div className="w-24 h-24 bg-earth-50 dark:bg-earth-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-earth-100 dark:ring-earth-950">
                    <Fingerprint size={48} className="text-agro-600" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4">Initialize Digital ID</h3>
                <p className="text-earth-600 dark:text-earth-400 mb-10 leading-relaxed">The EnvirosAgro Social Identification Number (ESIN) is your global sustainability passport. It verifies your m(t) score and handles financial grants.</p>
                <button 
                    onClick={() => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setEsinStep(2); }, 3000); }}
                    className="nature-gradient text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl flex items-center justify-center gap-3 mx-auto disabled:opacity-50"
                    disabled={isProcessing}
                >
                    {isProcessing ? <><Loader2 size={18} className="animate-spin" /> RUNNING VERIFICATION...</> : <><Sparkles size={18} /> GENERATE MY ESIN</>}
                </button>
            </div>
        )}
        {esinStep === 2 && (
            <div className="bg-agro-950 rounded-[3rem] p-12 text-white text-center shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-10">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Fingerprint size={200} /></div>
                <CheckCircle2 size={64} className="text-agro-400 mx-auto mb-6" />
                <h3 className="text-3xl font-serif font-bold mb-2">ESIN Verified</h3>
                <p className="text-agro-300 font-black uppercase tracking-widest text-xs mb-10">Your unique network identifier is live</p>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 text-4xl font-mono tracking-[0.3em] font-black">
                    EA-FAR-2024-8842
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setActiveTab('ID_CARD')} className="bg-agro-500 hover:bg-agro-400 text-white font-black py-4 rounded-2xl transition-all shadow-lg text-[10px] uppercase tracking-widest">View Digital Card</button>
                    <button onClick={() => setEsinStep(1)} className="bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-2xl transition-all border border-white/10 text-[10px] uppercase tracking-widest">Back</button>
                </div>
            </div>
        )}
    </div>
  );

  const renderIdCard = () => (
    <div className="max-w-2xl mx-auto py-10 flex flex-col items-center">
        <div className="w-full bg-gradient-to-br from-agro-900 via-agro-800 to-agro-950 rounded-[2.5rem] overflow-hidden shadow-2xl relative text-white aspect-[1.58/1] animate-in zoom-in-95 group hover:scale-[1.02] transition-all cursor-default">
            {/* Holographic effect mockup */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 group-hover:translate-x-full transition-transform duration-[2s]"></div>
            
            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                            <Sprout size={28} className="text-agro-400" />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-2xl tracking-tight">EnvirosAgro</h3>
                            <p className="text-[9px] font-black uppercase tracking-widest text-agro-400">Global Network Member</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-white/10 p-2 rounded-2xl border border-white/10 mb-2">
                            <QrCode size={40} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Scan to Verify</span>
                    </div>
                </div>

                <div className="flex gap-8 items-end">
                    <div className="w-24 h-24 bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 p-1.5 shrink-0">
                        {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover rounded-[1.6rem]" /> : <div className="w-full h-full flex items-center justify-center bg-agro-500/20 text-agro-400"><Users size={32}/></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-agro-500 uppercase tracking-[0.3em] mb-1">MEMBER IDENTITY</p>
                        <h4 className="text-2xl font-bold truncate mb-2">{user?.name || 'Authorized Member'}</h4>
                        <div className="flex gap-10">
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">ESIN NUMBER</p>
                                <p className="font-mono text-sm tracking-widest text-agro-200">EA-FAR-24-8842</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">THRUST LVL</p>
                                <p className="font-bold text-sm text-agro-200">Tier 3 (Gold)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p className="mt-8 text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] animate-pulse">Touch to see reverse</p>
        <button className="mt-10 flex items-center gap-2 text-agro-700 font-bold text-sm hover:underline"><Download size={18} /> Export for Apple/Google Wallet</button>
    </div>
  );

  return (
    <div className="bg-[#fffdfb] dark:bg-earth-950 min-h-screen font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-agro-700 font-bold text-[10px] uppercase tracking-[0.2em] transition-all group"
        >
          <div className="w-6 h-6 rounded-full border border-earth-200 dark:border-earth-800 flex items-center justify-center group-hover:border-agro-500 transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Home
        </button>
      </div>

      {/* Redeem Tools Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-earth-100 dark:border-earth-800 animate-in zoom-in-95 duration-300">
                <div className="bg-agro-900 p-8 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-2xl text-agro-400">
                           <ShoppingCart size={28} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Redeem for Tools</h3>
                          <p className="text-xs text-agro-300 font-bold uppercase tracking-widest">Utilize your earned EAC rewards</p>
                        </div>
                    </div>
                    <button onClick={() => setShowRedeemModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-8">
                  <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-3xl mb-8 flex items-center justify-between border border-earth-100 dark:border-earth-800">
                      <div className="flex items-center gap-3">
                          <Coins className="text-amber-500" size={24} />
                          <span className="font-bold text-earth-600 dark:text-earth-400">Available Balance:</span>
                      </div>
                      <span className="text-3xl font-serif font-bold text-agro-900 dark:text-white">{user?.eacBalance || 0} EAC</span>
                  </div>

                  {redeemSuccess && (
                      <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/30 border-2 border-green-500/50 rounded-2xl flex items-center gap-3 text-green-700 dark:text-green-400 animate-in zoom-in-95">
                          <CheckCircle2 size={24} />
                          <p className="font-bold text-sm">Tool redeemed successfully! Check your inventory or digital vault.</p>
                      </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                      {REDEEMABLE_TOOLS.map((tool) => {
                          const canAfford = (user?.eacBalance || 0) >= tool.cost;
                          return (
                              <div key={tool.id} className={`p-5 rounded-3xl border-2 transition-all flex flex-col h-full ${canAfford ? 'border-earth-100 dark:border-earth-800 bg-white dark:bg-earth-900 hover:shadow-xl hover:border-agro-100' : 'border-earth-50 dark:border-earth-900 bg-earth-50/50 dark:bg-earth-950/20 opacity-60'}`}>
                                  <div className="flex justify-between items-start mb-4">
                                      <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-2xl shadow-inner">
                                          {tool.icon}
                                      </div>
                                      <span className="text-xs font-black text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-800">
                                          {tool.cost} EAC
                                      </span>
                                  </div>
                                  <h4 className="font-bold text-earth-900 dark:text-white mb-1">{tool.name}</h4>
                                  <p className="text-xs text-earth-500 dark:text-earth-400 mb-6 flex-1">{tool.desc}</p>
                                  
                                  <button 
                                      onClick={() => handleRedeem(tool)}
                                      disabled={!canAfford || !!isRedeeming}
                                      className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${canAfford ? 'bg-agro-600 text-white hover:bg-agro-700 shadow-lg' : 'bg-earth-200 dark:bg-earth-800 text-earth-400 cursor-not-allowed'}`}
                                  >
                                      {isRedeeming === tool.id ? <Loader2 size={14} className="animate-spin" /> : <><Package size={14} /> REDEEM NOW</>}
                                  </button>
                              </div>
                          );
                      })}
                  </div>
                </div>

                <div className="p-6 bg-earth-50 dark:bg-earth-900/30 text-center border-t border-earth-100 dark:border-earth-800">
                    <p className="text-[10px] text-earth-400 dark:text-earth-600 font-black uppercase tracking-[0.4em]">Tools provided via EnvirosAgro Logistics Hub</p>
                </div>
            </div>
        </div>
      )}

      {/* Transaction History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-earth-100 dark:border-earth-800 animate-in zoom-in-95 duration-300">
                <div className="bg-[#e67e22] p-8 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-2xl text-orange-200">
                           <History size={28} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Transaction History</h3>
                          <p className="text-xs text-orange-100 font-bold uppercase tracking-widest">EAC Rewards Ledger</p>
                        </div>
                    </div>
                    <button onClick={() => setShowHistoryModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 bg-earth-50 dark:bg-earth-800/50 rounded-2xl border border-earth-100 dark:border-earth-700 transition-all hover:border-orange-200">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${tx.type === 'EARN' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                                        {tx.type === 'EARN' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-earth-900 dark:text-white text-sm">{tx.source}</h4>
                                        <div className="flex items-center gap-2 text-[10px] text-earth-50 dark:text-earth-400 font-bold uppercase mt-0.5">
                                            <Clock size={10} /> {tx.date}
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-lg font-serif font-bold ${tx.type === 'EARN' ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.type === 'EARN' ? '+' : '-'}{tx.amount} <span className="text-[10px] font-sans text-earth-400">EAC</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-earth-50 dark:bg-earth-900/30 text-center border-t border-earth-100 dark:border-earth-800 flex justify-between items-center">
                    <div className="text-left">
                        <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest">Total Earnings</p>
                        <p className="text-xl font-bold text-agro-600">+{transactions.filter(t => t.type === 'EARN').reduce((acc, t) => acc + t.amount, 0)} EAC</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest">Available Balance</p>
                        <p className="text-xl font-bold text-agro-900 dark:text-white">{user?.eacBalance || 0} EAC</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-bold text-agro-900 dark:text-white mb-4 tracking-tight">Community Network</h2>
          <p className="text-lg text-earth-500 dark:text-earth-400 font-medium leading-relaxed max-w-3xl mx-auto">
            Formalize your participation in the EnvirosAgro ecosystem. Register your collective, obtain your unique identity, and earn rewards for sustainable actions.
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 max-w-6xl mx-auto">
          <button onClick={() => setActiveTab('REGISTER_GROUP')} className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-full border shadow-sm transition-all group ${activeTab === 'REGISTER_GROUP' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-700 dark:text-earth-300'}`}>
            <Users size={20} />
            <span className="text-sm font-bold">Register Group</span>
          </button>
          <button onClick={() => setActiveTab('REGISTER_SOCIETY')} className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-full border shadow-sm transition-all group ${activeTab === 'REGISTER_SOCIETY' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-700 dark:text-earth-300'}`}>
            <Building2 size={20} />
            <span className="text-sm font-bold">Society Onboarding</span>
          </button>
          <button onClick={() => setActiveTab('GET_ESIN')} className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-full border shadow-sm transition-all group ${activeTab === 'GET_ESIN' ? 'bg-agro-600 text-white border-agro-600' : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-700 dark:text-earth-300'}`}>
            <Fingerprint size={20} />
            <span className="text-sm font-bold">Get ESIN</span>
          </button>
          <button onClick={() => setActiveTab('ID_CARD')} className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-full border shadow-sm transition-all group ${activeTab === 'ID_CARD' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-700 dark:text-earth-300'}`}>
            <CreditCard size={20} />
            <span className="text-sm font-bold">Digital ID</span>
          </button>
          <button onClick={() => setActiveTab('FEED')} className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-full border shadow-sm transition-all group ${activeTab === 'FEED' ? 'bg-[#f39c12] text-white border-[#f39c12]' : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-700 dark:text-earth-300'}`}>
            <MessageSquare size={20} />
            <span className="text-sm font-bold">Feed</span>
          </button>
        </div>

        {activeTab === 'REGISTER_GROUP' && renderRegisterGroup()}
        {activeTab === 'REGISTER_SOCIETY' && renderRegisterSociety()}
        {activeTab === 'GET_ESIN' && renderGetESIN()}
        {activeTab === 'ID_CARD' && renderIdCard()}

        {activeTab === 'FEED' && (
            <div className="grid lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-2">
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white dark:bg-earth-900 rounded-[2rem] shadow-xl border border-earth-100 dark:border-earth-800 overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-agro-50 dark:bg-agro-950/30 rounded-xl flex items-center justify-center text-agro-600">
                                    <Sprout size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-agro-900 dark:text-white">Share a Sustainable Practice</h3>
                            </div>
                            <div className="bg-[#fdf2e9] dark:bg-orange-950/20 text-[#e67e22] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#f5cba7] dark:border-orange-900/50 flex items-center gap-2">
                                <Coins size={12} /> Earn 10 EAC
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar">
                            <span className="text-xs font-bold text-earth-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                                <Tag size={12} /> Category:
                            </span>
                            {['General', 'SA Thrust', 'EA Thrust', 'HA Thrust', 'TA Thrust'].map(cat => (
                                <button key={cat} onClick={() => setPostCategory(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all shrink-0 ${postCategory === cat ? 'bg-agro-600 text-white border-agro-600' : 'bg-white dark:bg-earth-800 text-earth-400 border-earth-100 dark:border-earth-800'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <textarea 
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            disabled={isProcessing}
                            className="w-full bg-[#f8f9fa] dark:bg-earth-800 border border-[#f1f1f1] dark:border-earth-700 rounded-2xl p-6 text-sm focus:outline-none transition-all min-h-[120px] resize-none mb-4 dark:text-white"
                            placeholder="What sustainable method did you apply today?"
                        />

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button className="text-[10px] font-bold text-earth-400 hover:text-agro-600 flex items-center gap-1 uppercase tracking-widest transition-colors">
                                <Info size={14} /> Review Community Guidelines
                            </button>
                            <button 
                                onClick={handlePostSubmit}
                                disabled={!postContent.trim() || isProcessing}
                                className="bg-[#82ccdd] hover:bg-[#60a3bc] text-white px-10 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
                            >
                                {isProcessing ? <><Loader2 size={16} className="animate-spin" /> ANALYZING...</> : <><Send size={16} className="rotate-[-20deg]" /> LOG ACTIVITY</>}
                            </button>
                        </div>
                    </div>

                    {posts.map(post => (
                        <div key={post.id} className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-8 border border-earth-100 dark:border-earth-800 shadow-sm transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#f2e8e5] dark:bg-earth-800 rounded-full flex items-center justify-center font-bold text-[#c07e61] shadow-inner text-lg">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-earth-900 dark:text-white text-sm leading-tight">{post.author}</h4>
                                        <p className="text-[10px] text-earth-400 font-bold uppercase tracking-wider mt-0.5">{post.role} • {post.time}</p>
                                    </div>
                                </div>
                                <div className="bg-[#fff9f4] dark:bg-orange-950/20 text-[#f39c12] px-3 py-1.5 rounded-xl border border-[#fdebd0] dark:border-orange-900/30 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                    <Zap size={12} className="fill-[#f39c12]" /> +{post.reward} EAC
                                </div>
                            </div>
                            <p className="text-earth-700 dark:text-earth-200 text-sm leading-relaxed mb-6 font-medium">
                                {post.content}
                            </p>
                            
                            {post.aiAnalysis && (
                                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5 mb-6 flex gap-3 items-start animate-in fade-in duration-700">
                                    <Sparkles size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-800 dark:text-blue-300 italic font-medium leading-relaxed">{post.aiAnalysis}</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-earth-50 dark:border-earth-800">
                                <div className="flex items-center gap-6">
                                    <button className="flex items-center gap-2 text-[#e74c3c] text-[10px] font-black uppercase tracking-widest group">
                                        <ThumbsUp size={16} fill={post.likes > 0 ? "#e74c3c" : "none"} className="group-hover:scale-110 transition-transform" /> {post.likes} Likes
                                    </button>
                                    <span className="bg-earth-50 dark:bg-earth-800 text-earth-500 dark:text-earth-400 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border border-earth-100 dark:border-earth-800">
                                        {post.thrust}
                                    </span>
                                </div>
                                <button 
                                  onClick={() => handleSharePost(post)}
                                  className="flex items-center gap-2 text-earth-400 hover:text-agro-600 transition-colors text-[10px] font-black uppercase tracking-widest"
                                >
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-gradient-to-br from-[#d35400] to-[#e67e22] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-4 -right-10 opacity-20 transform scale-150 rotate-12">
                            <Coins size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-white/20 p-2 rounded-2xl">
                                    <Coins size={28} />
                                </div>
                                <h3 className="font-bold text-xl tracking-tight">Your Rewards</h3>
                            </div>
                            <p className="text-white/70 text-sm font-medium mb-10">Earned from community contributions</p>
                            
                            <div className="text-6xl font-serif font-bold mb-2 flex items-baseline gap-3">
                                {user?.eacBalance || 0} <span className="text-2xl font-sans font-black opacity-80">EAC</span>
                            </div>
                            <p className="text-sm text-white/80 font-bold mb-10">≈ ${( (user?.eacBalance || 0) * 0.1 ).toFixed(2)} USD value</p>

                            <div className="h-24 w-full mb-10 bg-black/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
                                <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] mb-2 text-center">7-DAY EARNINGS TREND</p>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={REWARDS_HISTORY}>
                                        <Line type="monotone" dataKey="amount" stroke="#fff" strokeWidth={3} dot={{fill: '#fff', r: 3}} isAnimationActive={false} />
                                        <XAxis dataKey="day" hide />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-3">
                                <button 
                                    onClick={() => setShowRedeemModal(true)}
                                    className="w-full bg-white text-[#d35400] font-black py-4 rounded-2xl hover:bg-white/90 transition-all shadow-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={18} /> Redeem for Tools
                                </button>
                                <button 
                                    onClick={() => setShowHistoryModal(true)}
                                    className="w-full bg-[#ba4a00]/40 text-white font-black py-4 rounded-2xl hover:bg-[#ba4a00]/60 transition-all text-xs uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2"
                                >
                                    <Wallet size={18} /> View History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Floating Network Explorer */}
      <button 
        onClick={() => setActiveTab('FEED')}
        className="fixed bottom-10 right-10 w-20 h-20 bg-[#053a2a] text-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group border-4 border-white"
      >
          <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          <div className="relative">
            <LayoutGrid size={32} />
          </div>
          <span className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-earth-100">
            Refresh Feed
          </span>
      </button>
    </div>
  );
};