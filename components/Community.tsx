import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, Fingerprint, CreditCard, CheckCircle2, ArrowLeft, 
  Sprout, ThumbsUp, Coins, Send, Share2, Zap, Bell, MessageSquare, 
  LayoutGrid, ChevronRight, Tag, Info, ShieldCheck, MapPin, Search, 
  X, Loader2, Sparkles, UserCheck, Smartphone, QrCode, Download,
  ShoppingCart, Package, ArrowRight, Wallet, ArrowUpRight, ArrowDownLeft, Clock,
  History
} from 'lucide-react';
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
  
  const [transactions, setTransactions] = useState<any[]>([
    { id: 101, type: 'EARN', amount: 10, source: 'Vertical Mulching Tip', date: '2h ago' },
    { id: 102, type: 'EARN', amount: 25, source: 'Society Onboarding', date: '5h ago' },
    { id: 103, type: 'EARN', amount: 15, source: 'Daily Login Reward', date: 'Yesterday' },
    { id: 104, type: 'EARN', amount: 12, source: 'Research Survey', date: '2 days ago' },
    { id: 105, type: 'SPEND', amount: 25, source: 'Seeds Pack', date: '3 days ago' },
  ]);

  const [posts, setPosts] = useState([
    { id: 1, author: "Sarah Jenkins", role: "Farmer", time: "2h ago", content: "Successfully implemented vertical mulching in our banana plantation. Soil moisture retention has improved significantly! 🍌💧 #SoilHealth", thrust: "EA THRUST", likes: 15, reward: 10, aiAnalysis: "Verified: Strong alignment with Environmental Agriculture (EA). Impact score 9/10." },
    { id: 2, author: "Kiriaini Youth Group", role: "Society", time: "5h ago", content: "Hosted a training session on Digital ID registration today. 50 new members onboarded to EnvirosAgro! 🚀 #CommunityGrowth", thrust: "SA THRUST", likes: 32, reward: 25, aiAnalysis: "Verified: Critical Social Agriculture (SA) milestone. Community resilience factor high." },
    { id: 3, author: "Eng. Mark", role: "Researcher", time: "1d ago", content: "Latest TA Thrust updates: New drone path algorithms reducing battery drain by 18%. Deployment starting next week. 🛸", thrust: "TA THRUST", likes: 54, reward: 20, aiAnalysis: "Verified: Technical Agriculture (TA) optimization confirmed." }
  ]);

  const handlePostSubmit = async () => {
    if (!postContent.trim()) return;
    setIsProcessing(true);
    try {
        const analysis = await validateCommunityPost(postContent);
        const newPost = { id: Date.now(), author: user?.name || "Anonymous", role: user?.role || "Member", time: "Just now", content: postContent, thrust: postCategory.toUpperCase() + (postCategory === 'General' ? '' : ' THRUST'), likes: 0, reward: 10, aiAnalysis: analysis };
        setPosts([newPost, ...posts]);
        setTransactions([{ id: Date.now(), type: 'EARN', amount: 10, source: 'Practice Log', date: 'Just now' }, ...transactions]);
        setPostContent('');
        if (onAwardEac) onAwardEac(10);
    } catch (err) { console.error(err); } finally { setIsProcessing(false); }
  };

  const handleSharePost = async (post: typeof posts[0]) => {
    const shareUrl = window.location.origin;
    const shareData = { title: `EnvirosAgro Post by ${post.author}`, text: `${post.author} shared: "${post.content}"`, url: shareUrl };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { if (err instanceof Error && err.name !== 'AbortError') console.error(err); }
    } else {
        navigator.clipboard.writeText(`${shareData.text} \n\nCheck it out at: ${shareData.url}`);
        alert("Copied to clipboard!");
    }
  };

  const renderRegisterGroup = () => (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-xl text-rose-600">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Register Group</h3>
            <p className="text-xs text-earth-500 dark:text-earth-400">Formalize your production node.</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Registry request transmitted."); }}>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Group Legal Name</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="e.g. Kiriaini Smallholders" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Coordinator ESIN</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="EA-FAR-2024-XXXX" />
          </div>
          <button type="submit" className="w-full bg-agro-600 hover:bg-agro-700 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest shadow-lg transition-all">Submit Registry Application</button>
        </form>
      </div>
    </div>
  );

  const renderRegisterSociety = () => (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600">
            <Building2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Register Society</h3>
            <p className="text-xs text-earth-500 dark:text-earth-400">Scale collective impact.</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Society onboarding initiated."); }}>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Society Name</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="e.g. Mt. Kenya Organic Society" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-earth-400 uppercase tracking-widest px-1">Certificate ID</label>
            <input required className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 dark:text-white" placeholder="REG-XX-XXXX" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest shadow-lg transition-all">Onboard Society</button>
        </form>
      </div>
    </div>
  );

  const renderGetESIN = () => (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800 overflow-hidden">
        <div className="bg-agro-900 p-6 text-white text-center">
          <h3 className="text-xl font-serif font-bold flex items-center justify-center gap-3">
            <Fingerprint size={20} /> Issuance Terminal
          </h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex justify-between relative mb-8 px-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-earth-100 dark:bg-earth-800 -z-10 -translate-y-1/2"></div>
            {[1, 2, 3].map(step => (
              <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] border-2 z-10 transition-all ${esinStep >= step ? 'bg-agro-600 border-agro-600 text-white' : 'bg-white dark:bg-earth-800 border-earth-100 dark:border-earth-800 text-earth-300'}`}>
                {step}
              </div>
            ))}
          </div>

          {esinStep === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-2 text-center">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Identity Verification</h4>
              <p className="text-xs text-earth-500 dark:text-earth-400">Linking sustainability efforts across Five Thrusts.</p>
              <button onClick={() => setEsinStep(2)} className="w-full bg-agro-600 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">Start Verification</button>
            </div>
          )}
          {esinStep === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-2 text-center">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Geolocation Sync</h4>
              <p className="text-xs text-earth-500 dark:text-earth-400">Connect to regional network node.</p>
              <button onClick={() => setEsinStep(3)} className="w-full bg-agro-600 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">Sync Coordinates</button>
            </div>
          )}
          {esinStep === 3 && (
            <div className="text-center py-4 animate-in zoom-in">
              <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">ESIN Issued</h4>
              <p className="font-mono text-base text-agro-600 font-bold mb-6">EA-FAR-2024-8842</p>
              <button onClick={() => { setEsinStep(1); setActiveTab('ID_CARD'); }} className="w-full bg-agro-900 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">View Digital ID</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderIdCard = () => (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 p-6 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800">
        <h3 className="font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
          <CreditCard size={18} className="text-agro-600" /> Digital ID
        </h3>
        {user ? (
          <div className="w-full bg-gradient-to-br from-agro-800 to-agro-950 rounded-2xl overflow-hidden shadow-xl relative text-white aspect-[1.58/1] p-5">
            <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400" className="w-full h-full object-cover" alt="ID" />
            </div>
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="flex items-center gap-1.5">
                <Sprout size={20} className="text-agro-400" />
                <span className="font-serif font-bold tracking-tight text-base">EnvirosAgro</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                <QrCode size={18} />
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl p-1 overflow-hidden shadow-lg">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover rounded-lg" /> : <div className="w-full h-full bg-agro-100 flex items-center justify-center rounded-lg text-agro-600 font-bold">{user.name.charAt(0)}</div>}
              </div>
              <div>
                <h4 className="text-lg font-bold truncate max-w-[180px]">{user.name}</h4>
                <p className="text-[9px] text-agro-300 font-black uppercase tracking-widest">{user.role}</p>
                <p className="font-mono text-[10px] text-agro-100 tracking-widest mt-1">{user.esin || 'EA-PENDING-2024'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center bg-earth-50 dark:bg-earth-800/30 rounded-2xl border-2 border-dashed border-earth-200 dark:border-earth-700">
            <Info size={32} className="mx-auto text-earth-300 mb-2 opacity-50" />
            <p className="text-earth-400 font-bold uppercase tracking-widest text-[8px]">Sign In to view ID</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#fffdfb] dark:bg-earth-950 min-h-screen font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 pt-4">
        <button onClick={() => onNavigate?.(View.HOME)} className="flex items-center gap-2 text-earth-400 hover:text-agro-700 font-bold text-[8px] uppercase tracking-[0.2em] transition-all group">
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-agro-900 dark:text-white mb-2">Community Network</h2>
          <p className="text-sm text-earth-500 dark:text-earth-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Formalize participation, obtain identity, and earn rewards.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'FEED', label: 'Feed', icon: <MessageSquare size={14} /> },
            { id: 'GET_ESIN', label: 'ESIN', icon: <Fingerprint size={14} /> },
            { id: 'REGISTER_GROUP', label: 'Group', icon: <Users size={14} /> },
            { id: 'REGISTER_SOCIETY', label: 'Society', icon: <Building2 size={14} /> },
            { id: 'ID_CARD', label: 'Digital ID', icon: <CreditCard size={14} /> }
          ].map(btn => (
            <button key={btn.id} onClick={() => setActiveTab(btn.id as any)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm transition-all ${activeTab === btn.id ? 'bg-agro-600 text-white border-agro-600' : 'bg-white dark:bg-earth-900 border-earth-100 dark:border-earth-800 text-earth-700 dark:text-earth-300'}`}>
              {btn.icon} <span className="text-[10px] font-black uppercase tracking-widest">{btn.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'FEED' && (
            <div className="flex flex-col gap-10">
                <div className="space-y-6">
                    {/* Share Practice Widget */}
                    <div className="bg-white dark:bg-earth-900 rounded-[2rem] p-8 shadow-sm border border-earth-100 dark:border-earth-800">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-agro-900 dark:text-white flex items-center gap-2">
                                <Sprout size={20} className="text-agro-600" /> Share Practice
                            </h3>
                            <div className="text-[#e67e22] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                <Coins size={14} /> +10 EAC
                            </div>
                        </div>

                        <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} disabled={isProcessing} className="w-full bg-[#f8f9fa] dark:bg-earth-800 border border-[#f1f1f1] dark:border-earth-700 rounded-2xl p-6 text-sm focus:outline-none transition-all min-h-[120px] resize-none mb-6 dark:text-white" placeholder="Sustainable method applied today?" />

                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                {['SA', 'EA', 'HA', 'TA'].map(t => (
                                    <button key={t} onClick={() => setPostCategory(t)} className={`px-4 py-1.5 rounded-lg text-[9px] font-black border uppercase transition-all ${postCategory === t ? 'bg-agro-600 text-white border-agro-600' : 'bg-white dark:bg-earth-800 text-earth-400 border-earth-100 dark:border-earth-800 hover:bg-earth-50'}`}>{t}</button>
                                ))}
                            </div>
                            <button onClick={handlePostSubmit} disabled={!postContent.trim() || isProcessing} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 disabled:opacity-50">
                                {isProcessing ? 'Syncing...' : 'Log Activity'}
                            </button>
                        </div>
                    </div>

                    {/* Post Feed */}
                    <div className="space-y-8">
                        {posts.map(post => (
                            <div key={post.id} className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-8 border border-earth-100 dark:border-earth-800 shadow-sm group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-earth-50 dark:bg-earth-800 rounded-full flex items-center justify-center font-bold text-earth-400 text-base shadow-inner">{post.author.charAt(0)}</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-base leading-none mb-1.5">{post.author}</h4>
                                            <p className="text-[10px] text-earth-400 font-bold uppercase tracking-widest">{post.role} • {post.time}</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black uppercase text-agro-600 bg-agro-50 dark:bg-agro-900/40 px-3 py-1 rounded-lg border border-agro-100 dark:border-agro-800">{post.thrust}</span>
                                </div>
                                <p className="text-earth-700 dark:text-earth-200 text-sm leading-relaxed mb-6 font-medium">{post.content}</p>
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/30 rounded-2xl p-5 mb-6 flex gap-3 items-start">
                                    <Sparkles size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-800 dark:text-blue-300 italic font-medium leading-relaxed">{post.aiAnalysis}</p>
                                </div>
                                <div className="flex items-center justify-between pt-5 border-t border-earth-50 dark:border-earth-800">
                                    <button className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"><ThumbsUp size={16} /> {post.likes} Appreciation</button>
                                    <button onClick={() => handleSharePost(post)} className="flex items-center gap-2 text-earth-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest"><Share2 size={16} /> Propagate</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM WIDGETS */}
                <div className="space-y-10 pt-10 border-t border-earth-100 dark:border-earth-800">
                    {/* Wallet Widget */}
                    <div className="bg-[#d35400] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 opacity-10 transform group-hover:scale-110 transition-transform duration-1000">
                            <Coins size={160} />
                        </div>
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-6 block">My EAC Balance</span>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                                    <Coins size={36} className="text-white" />
                                </div>
                                <div className="text-6xl font-serif font-bold tracking-tight">{user?.eacBalance || 0} <span className="text-2xl font-sans font-black opacity-60">EAC</span></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setShowRedeemModal(true)} className="bg-white text-[#d35400] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-orange-50 transition-all shadow-lg active:scale-95">Redeem Tools</button>
                                <button onClick={() => setShowHistoryModal(true)} className="bg-black/20 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-black/30 border border-white/20 transition-all active:scale-95">Ledger</button>
                            </div>
                        </div>
                    </div>

                    {/* History Widget */}
                    <div className="space-y-6">
                        <h3 className="font-black text-earth-900 dark:text-white flex items-center gap-3 text-sm uppercase tracking-[0.4em] px-2">
                            <History size={18} className="text-earth-400" /> Recent History
                        </h3>
                        <div className="space-y-3">
                            {transactions.map(tx => (
                                <div key={tx.id} className="p-5 bg-white dark:bg-earth-900 rounded-[1.5rem] flex items-center justify-between border border-earth-100 dark:border-earth-800 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl ${tx.type === 'EARN' ? 'text-green-600 bg-green-50/50 dark:bg-green-900/20' : 'text-red-600 bg-red-50/50 dark:bg-red-900/20'}`}>
                                            {tx.type === 'EARN' ? <ArrowUpRight size={18}/> : <ArrowDownLeft size={18}/>}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{tx.source}</h4>
                                            <p className="text-[9px] text-earth-400 uppercase font-black tracking-widest">{tx.date}</p>
                                        </div>
                                    </div>
                                    <span className={`text-base font-serif font-bold ${tx.type === 'EARN' ? 'text-green-600' : 'text-red-600'}`}>{tx.type === 'EARN' ? '+' : '-'}{tx.amount}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-[10px] font-black text-earth-400 hover:text-agro-600 transition-colors uppercase tracking-[0.4em] text-center border-t border-earth-100 dark:border-earth-800 mt-4">
                            View Entire Transmission History
                        </button>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'REGISTER_GROUP' && renderRegisterGroup()}
        {activeTab === 'REGISTER_SOCIETY' && renderRegisterSociety()}
        {activeTab === 'GET_ESIN' && renderGetESIN()}
        {activeTab === 'ID_CARD' && renderIdCard()}
      </div>
    </div>
  );
};