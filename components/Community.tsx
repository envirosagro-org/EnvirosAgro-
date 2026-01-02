
import React, { useState } from 'react';
import { User, View } from '../types';
import { CommunityHeader } from './community/CommunityHeader';
import { ForumHighlights } from './community/ForumHighlights';
import { FeaturedMembers } from './community/FeaturedMembers';
import { Cta } from './Cta';
import { NewsFeed } from './community/NewsFeed';
import { UpcomingEvents } from './community/UpcomingEvents';
import { MemberSpotlight } from './community/MemberSpotlight';
import { GetESIN } from './community/GetESIN';
import { IdCard } from './community/IdCard';
import { RegisterGroup } from './community/RegisterGroup';
import { CreatePost } from './community/CreatePost';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, ShieldCheck, 
  Search, Bell, Plus, Filter, TrendingUp,
  MapPin, Globe, Award, Zap
} from 'lucide-react';

interface CommunityProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onAwardEac?: (amount: number) => void;
}

export const Community: React.FC<CommunityProps> = ({ user, onNavigate }) => {
  const [esinStep, setEsinStep] = useState(1);
  const [activeTab, setActiveTab] = useState('feed');
  const [currentUser, setCurrentUser] = useState<User | null>(user);
  const [isRegisteringGroup, setIsRegisteringGroup] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleEsinGenerated = (esin: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, esin });
    }
  };

  const navItems = [
    { id: 'feed', label: 'News Feed', icon: <Globe size={18} /> },
    { id: 'forum', label: 'Discussion Forum', icon: <MessageSquare size={18} /> },
    { id: 'get-esin', label: 'ESIN Registry', icon: <ShieldCheck size={18} /> },
    { id: 'events', label: 'Ecosystem Events', icon: <TrendingUp size={18} /> },
  ];

  return (
    <div className="bg-white dark:bg-earth-950 min-h-screen">
      <CommunityHeader />
      
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="flex flex-col xl:flex-row gap-12">
          
          <aside className="xl:w-[380px] space-y-8">
            <div className="bg-earth-50 dark:bg-earth-900 rounded-[2.5rem] p-8 border border-earth-100 dark:border-earth-800 shadow-sm overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Users size={160} /></div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-400 mb-8">Personal Hub</h3>
               <IdCard user={currentUser} />
               <div className="mt-8 pt-8 border-t border-earth-100 dark:border-earth-800 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-earth-800 rounded-2xl shadow-inner">
                     <span className="text-[10px] font-black uppercase text-earth-400 block mb-1">EAC Rank</span>
                     <span className="text-xl font-black text-agro-600">#42</span>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-earth-800 rounded-2xl shadow-inner">
                     <span className="text-[10px] font-black uppercase text-earth-400 block mb-1">Impact pts</span>
                     <span className="text-xl font-black text-blue-600">1.2k</span>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-8 border border-earth-100 dark:border-earth-800 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-400 mb-8">Navigation</h3>
              <div className="space-y-3">
                {navItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full py-4 px-6 rounded-2xl text-left font-bold transition-all flex items-center gap-4 group ${activeTab === item.id ? 'bg-agro-600 text-white shadow-xl shadow-agro-600/20 translate-x-2' : 'text-earth-500 hover:bg-earth-50 dark:hover:bg-earth-800'}`}
                  >
                    <span className={`${activeTab === item.id ? 'text-white' : 'text-earth-300 group-hover:text-agro-500'} transition-colors`}>
                        {item.icon}
                    </span>
                    <span className="text-sm uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <FeaturedMembers />
          </aside>

          <main className="flex-1 space-y-12">
            
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div className="relative group w-full sm:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search posts, topics, members..." 
                        className="w-full bg-earth-50 dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-[2rem] pl-16 pr-6 py-5 text-base font-bold focus:outline-none focus:ring-8 focus:ring-agro-500/5 transition-all dark:text-white" 
                    />
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button 
                        onClick={() => setIsCreatingPost(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-earth-900 dark:bg-white text-white dark:text-earth-900 px-8 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                       <Plus size={18} /> Create Post
                    </button>
                    {currentUser?.role?.toLowerCase().includes('organization') && (
                      <button 
                          onClick={() => setIsRegisteringGroup(true)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-agro-500 dark:bg-agro-600 text-white px-8 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                         <Plus size={18} /> Register Group
                      </button>
                    )}
                    <button className="p-5 bg-earth-50 dark:bg-earth-900 rounded-[1.5rem] border border-earth-100 dark:border-earth-800 text-earth-400 hover:text-agro-600 transition-all relative">
                       <Bell size={22} />
                       <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-4 border-earth-50 dark:border-earth-900"></span>
                    </button>
                </div>
            </div>
            
            <AnimatePresence>
                {isCreatingPost && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                  >
                    <CreatePost 
                      user={currentUser!} 
                      onClose={() => setIsCreatingPost(false)} 
                      onPostCreated={() => { /* can add a refetch here */ }}
                    />
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
              {isRegisteringGroup && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                >
                  <RegisterGroup user={currentUser!} onGroupRegistered={() => setIsRegisteringGroup(false)} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="animate-in fade-in duration-700">
                {activeTab === 'feed' && (
                  <div className="space-y-12">
                    <NewsFeed />
                    <div className="grid lg:grid-cols-2 gap-8">
                       <UpcomingEvents />
                       <MemberSpotlight />
                    </div>
                  </div>
                )}

                {activeTab === 'forum' && (
                  <div className="space-y-12">
                    <div className="bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><MessageSquare size={200} /></div>
                        <div className="relative z-10">
                           <h2 className="text-3xl font-serif font-black mb-2">Ecosystem Dialogues</h2>
                           <p className="text-blue-100 font-medium">Join 2,400+ peers in technical and strategic agricultural discourse.</p>
                        </div>
                        <button className="relative z-10 bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-50 transition-all">Start New Topic</button>
                    </div>
                    <ForumHighlights />
                  </div>
                )}

                {activeTab === 'get-esin' && (
                  <GetESIN 
                    esinStep={esinStep} 
                    setEsinStep={setEsinStep} 
                    setActiveTab={setActiveTab} 
                    onEsinGenerated={handleEsinGenerated} 
                  />
                )}

                {activeTab === 'events' && (
                  <div className="space-y-12">
                     <UpcomingEvents />
                     <div className="bg-earth-900 p-12 rounded-[4rem] text-white text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575861501-7ce0e22432c9?w=1600')] bg-cover bg-center opacity-20"></div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                           <div className="ea-label-meta justify-center mb-6 text-agro-400">Annual Flagship Event</div>
                           <h2 className="text-5xl font-serif font-black mb-6">ScaleUp Summit 2024</h2>
                           <p className="text-lg text-earth-300 font-medium italic mb-10">
                              "Resilience at Scale: Bridging the Gap between Professional Knowledge and Industrial Output."
                           </p>
                           <button 
                             onClick={() => onNavigate(View.SCALEUP_SUMMIT)}
                             className="bg-agro-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-agro-600/40 hover:bg-agro-500 hover:scale-105 active:scale-95 transition-all"
                           >
                              Registration & Access Portal
                           </button>
                        </div>
                     </div>
                  </div>
                )}
            </div>
          </main>
        </div>
      </div>

      {!currentUser && (
        <Cta 
          title="Join the Global Network"
          subtitle="Secure your ESIN and unlock access to the full EnvirosAgro ecosystem and community intelligence."
          buttonText="Register Intelligence Node"
          onClick={() => onNavigate(View.SIGN_UP)}
        />
      )}
    </div>
  );
};
