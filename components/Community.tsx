import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { View, User } from '../types';
import { validateCommunityPost } from '../services/gemini';

import { CommunityHeader } from './community/CommunityHeader';
import { TabNavigation, Tab } from './community/TabNavigation';
import { FeedTab } from './community/FeedTab';
import { PostCard } from './community/PostCard';
import { WalletWidget } from './community/WalletWidget';
import { HistoryWidget } from './community/HistoryWidget';
import { RegisterGroup } from './community/RegisterGroup';
import { RegisterSociety } from './community/RegisterSociety';
import { GetESIN } from './community/GetESIN';
import { IdCard } from './community/IdCard';

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
  const [, setShowRedeemModal] = useState(false);
  const [, setShowHistoryModal] = useState(false);

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
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSharePost = async (post: any) => {
    const shareUrl = window.location.origin;
    const shareData = { title: `EnvirosAgro Post by ${post.author}`, text: `${post.author} shared: "${post.content}"`, url: shareUrl };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') console.error(err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} \n\nCheck it out at: ${shareData.url}`);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="bg-[#fffdfb] dark:bg-earth-950 min-h-screen font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 pt-4">
        <button onClick={() => onNavigate?.(View.HOME)} className="flex items-center gap-2 text-earth-400 hover:text-agro-700 font-bold text-[8px] uppercase tracking-[0.2em] transition-all group">
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <CommunityHeader />

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'FEED' && (
          <FeedTab
            postContent={postContent}
            setPostContent={setPostContent}
            isProcessing={isProcessing}
            postCategory={postCategory}
            setPostCategory={setPostCategory}
            handlePostSubmit={handlePostSubmit}
          >
            {posts.map(post => (
              <PostCard key={post.id} post={post} handleSharePost={handleSharePost} />
            ))}
            <div className="space-y-10 pt-10 border-t border-earth-100 dark:border-earth-800">
              <WalletWidget user={user} setShowRedeemModal={setShowRedeemModal} setShowHistoryModal={setShowHistoryModal} />
              <HistoryWidget transactions={transactions} />
            </div>
          </FeedTab>
        )}

        {activeTab === 'REGISTER_GROUP' && <RegisterGroup />}
        {activeTab === 'REGISTER_SOCIETY' && <RegisterSociety />}
        {activeTab === 'GET_ESIN' && (
          <GetESIN
            esinStep={esinStep}
            setEsinStep={setEsinStep}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'ID_CARD' && <IdCard user={user} />}
      </div>
    </div>
  );
};
