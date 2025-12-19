import React, { useState, useEffect } from 'react';
import { Users, Building2, Fingerprint, CreditCard, CheckCircle2, QrCode, ArrowRight, ShieldCheck, Sprout, MessageSquarePlus, ThumbsUp, Coins, Send, Share2, Award, Zap, Tag, Info, Bell, Mail, Edit2, X } from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { View } from '../types';

type Tab = 'REGISTER_GROUP' | 'REGISTER_SOCIETY' | 'GET_ESIN' | 'ID_CARD' | 'FEED' | 'NOTIFICATIONS';

const REWARDS_HISTORY = [
  { day: 'Mon', amount: 15 },
  { day: 'Tue', amount: 30 },
  { day: 'Wed', amount: 10 },
  { day: 'Thu', amount: 45 },
  { day: 'Fri', amount: 20 },
  { day: 'Sat', amount: 60 },
  { day: 'Sun', amount: 50 },
];

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'system';
  actor: string;
  avatar?: string;
  content: string;
  time: string;
  isRead: boolean;
}

interface CommunityProps {
    onNavigate?: (view: View) => void;
}

export const Community: React.FC<CommunityProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('REGISTER_GROUP');
  const [esin, setEsin] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    type: 'Group',
    members: ''
  });

  // Feed & Rewards State
  const [walletBalance, setWalletBalance] = useState(50); // Initial welcome bonus
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('General');
  const [showReward, setShowReward] = useState(false);
  const [posts, setPosts] = useState([
      { id: 1, author: "Sarah Jenkins", role: "Farmer", time: "2h ago", content: "Successfully implemented vertical mulching in our banana plantation. Soil moisture retention has improved significantly! 🍌💧 #SoilHealth", thrust: "EA", likes: 14, liked: false, reward: 10 },
      { id: 2, author: "Kiriaini Youth Group", role: "Society", time: "5h ago", content: "Hosted a training session on Digital ID registration today. 50 new members onboarded to EnvirosAgro! 🚀 #CommunityGrowth", thrust: "SA", likes: 32, liked: false, reward: 25 }
  ]);

  // Edit Post State
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');

  // Notification State
  const [notifications, setNotifications] = useState<Notification[]>([
      { id: 101, type: 'like', actor: 'John Doe', content: 'liked your post about "Vertical Mulching"', time: '10m ago', isRead: false },
      { id: 102, type: 'comment', actor: 'AgriCorp', content: 'commented: "Great initiative! Keep it up."', time: '1h ago', isRead: true },
      { id: 103, type: 'system', actor: 'System', content: 'You earned 50 EAC for completing your profile.', time: '2h ago', isRead: true }
  ]);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const generateESIN = () => {
    // Mock logic to generate a Social ID
    const year = new Date().getFullYear();
    const typeCode = activeTab === 'REGISTER_SOCIETY' ? 'SOC' : 'GRP';
    const random = Math.floor(100000 + Math.random() * 900000);
    const newEsin = `EA-${typeCode}-${year}-${random}`;
    setEsin(newEsin);
    setActiveTab('ID_CARD');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        generateESIN();
    }, 1000);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!postContent.trim()) return;

      const newPost = {
          id: Date.now(),
          author: "You",
          role: "Member",
          time: "Just now",
          content: postContent,
          thrust: postCategory,
          likes: 0,
          liked: false,
          reward: 10
      };

      setPosts([newPost, ...posts]);
      setWalletBalance(prev => prev + 10);
      setPostContent('');
      setPostCategory('General');
      
      // Trigger reward notification
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);

      // Simulate incoming notification after a delay (Interactive Demo)
      setTimeout(() => {
          const newNotif: Notification = {
              id: Date.now() + 1,
              type: 'like',
              actor: 'Community Bot',
              content: 'liked your new activity log.',
              time: 'Just now',
              isRead: false
          };
          setNotifications(prev => [newNotif, ...prev]);
      }, 5000);
  };

  const startEditing = (post: any) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
    setEditCategory(post.thrust);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditContent('');
    setEditCategory('');
  };

  const saveEdit = (postId: number) => {
    setPosts(posts.map(p => {
        if (p.id === postId) {
            return { ...p, content: editContent, thrust: editCategory };
        }
        return p;
    }));
    setEditingPostId(null);
    setEditContent('');
    setEditCategory('');
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiking = !post.liked;
        
        // Show "Notification Sent" toast when liking
        if (isLiking) {
            setNotificationToast(`Notification sent to ${post.author}`);
            setTimeout(() => setNotificationToast(null), 3000);
        }

        return {
          ...post,
          liked: isLiking,
          likes: isLiking ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
        const url = window.location.href.startsWith('http') ? window.location.href : 'https://envirosagro.com';
        navigator.share({
            title: 'EnvirosAgro Community Post',
            text: text,
            url: url
        }).catch((err: any) => {
            // Silently ignore AbortError from user cancellation
            if (err.name !== 'AbortError') {
                console.error('Share failed:', err);
                alert('Copied to clipboard!');
            }
        });
    } else {
        alert('Copied to clipboard!');
    }
  };

  const markAllRead = () => {
      setNotifications(notifications.map(n => ({...n, isRead: true})));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Toast Notifications */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-2 pointer-events-none">
          {showReward && (
            <div className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 border-2 border-white/20 pointer-events-auto">
                <div className="bg-white/20 p-1.5 rounded-full">
                    <Coins size={20} className="animate-bounce" />
                </div>
                <div>
                    <p className="font-bold text-sm">+10 EAC Earned!</p>
                    <p className="text-[10px] text-amber-100 font-medium">Sustainable Practice Shared</p>
                </div>
            </div>
          )}
          
          {notificationToast && (
            <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 border border-slate-700 pointer-events-auto">
                <div className="bg-green-50 p-1 rounded-full">
                    <CheckCircle2 size={16} className="text-white" />
                </div>
                <p className="font-bold text-sm">{notificationToast}</p>
            </div>
          )}
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Community Network</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          Formalize your participation in the EnvirosAgro ecosystem. Register your collective, obtain your unique identity, and earn rewards for sustainable actions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab('REGISTER_GROUP')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === 'REGISTER_GROUP' 
              ? 'bg-agro-600 text-white shadow-lg scale-105' 
              : 'bg-white text-earth-600 border border-earth-200 hover:bg-earth-50'
          }`}
        >
          <Users size={18} /> Group Registration
        </button>
        <button
          onClick={() => setActiveTab('REGISTER_SOCIETY')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === 'REGISTER_SOCIETY' 
              ? 'bg-agro-600 text-white shadow-lg scale-105' 
              : 'bg-white text-earth-600 border border-earth-200 hover:bg-earth-50'
          }`}
        >
          <Building2 size={18} /> Society Registration
        </button>
        <button
          onClick={() => setActiveTab('GET_ESIN')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === 'GET_ESIN' 
              ? 'bg-agro-600 text-white shadow-lg scale-105' 
              : 'bg-white text-earth-600 border border-earth-200 hover:bg-earth-50'
          }`}
        >
          <Fingerprint size={18} /> Get ESIN
        </button>
        <button
          onClick={() => setActiveTab('ID_CARD')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === 'ID_CARD' 
              ? 'bg-agro-600 text-white shadow-lg scale-105' 
              : 'bg-white text-earth-600 border border-earth-200 hover:bg-earth-50'
          }`}
        >
          <CreditCard size={18} /> Digital ID
        </button>
        <button
          onClick={() => setActiveTab('FEED')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === 'FEED' 
              ? 'bg-amber-500 text-white shadow-lg scale-105' 
              : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <MessageSquarePlus size={18} /> Community Feed
        </button>
        <button
          onClick={() => setActiveTab('NOTIFICATIONS')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all relative ${
            activeTab === 'NOTIFICATIONS' 
              ? 'bg-blue-600 text-white shadow-lg scale-105' 
              : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
          }`}
        >
          <Bell size={18} /> Notifications
          {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full shadow-sm">
                  {unreadCount}
              </span>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Dynamic Content */}
        {activeTab === 'FEED' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                {/* Share Practice Box */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-earth-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-agro-900 flex items-center gap-2">
                            <Sprout className="text-agro-600" /> Share a Sustainable Practice
                        </h3>
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <Coins size={12} /> Earn 10 EAC
                        </span>
                    </div>
                    <form onSubmit={handlePostSubmit}>
                        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                           <span className="text-xs font-bold text-earth-400 flex items-center gap-1 shrink-0"><Tag size={12}/> Category:</span>
                           {['General', 'SA', 'EA', 'HA', 'TA', 'IA'].map((tag) => (
                               <button
                                   key={tag}
                                   type="button"
                                   onClick={() => setPostCategory(tag)}
                                   className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all shrink-0 ${
                                       postCategory === tag 
                                       ? 'bg-agro-600 text-white border-agro-600 shadow-sm' 
                                       : 'bg-white text-earth-500 border-earth-200 hover:border-agro-300'
                                   }`}
                               >
                                   {tag === 'General' ? 'General' : `${tag} Thrust`}
                               </button>
                           ))}
                        </div>
                        <textarea 
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="What sustainable method did you apply today? Use #hashtags to categorize."
                            className="w-full bg-earth-50 border border-earth-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 mb-4 resize-none h-24"
                        />
                        <div className="flex justify-between items-center">
                            {onNavigate ? (
                                <button 
                                    type="button"
                                    onClick={() => onNavigate(View.COMMUNITY_GUIDELINES)}
                                    className="text-[10px] text-earth-400 font-medium hover:text-agro-600 flex items-center gap-1 transition-colors"
                                >
                                    <Info size={12} /> Review Community Guidelines
                                </button>
                            ) : (
                                <div className="text-xs text-earth-400 font-medium">
                                    Share to inspire others!
                                </div>
                            )}
                            <button 
                                type="submit" 
                                disabled={!postContent.trim()}
                                className="bg-agro-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-agro-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send size={16} /> Log Activity
                            </button>
                        </div>
                    </form>
                </div>

                {/* Feed List */}
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-3xl border border-earth-100 shadow-sm hover:shadow-md transition-shadow">
                            {editingPostId === post.id ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar mb-2">
                                        <span className="text-xs font-bold text-earth-400 shrink-0">Category:</span>
                                        {['General', 'SA', 'EA', 'HA', 'TA', 'IA'].map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => setEditCategory(tag)}
                                                className={`text-[10px] font-bold px-2 py-1 rounded-full border transition-all shrink-0 ${
                                                    editCategory === tag 
                                                    ? 'bg-agro-600 text-white border-agro-600' 
                                                    : 'bg-white text-earth-500 border-earth-200'
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="w-full bg-earth-50 border border-earth-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-500 resize-none h-24"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={cancelEditing}
                                            className="text-xs font-bold text-earth-500 px-3 py-1.5 rounded-lg hover:bg-earth-50 border border-transparent"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={() => saveEdit(post.id)}
                                            className="text-xs font-bold text-white bg-agro-600 px-3 py-1.5 rounded-lg hover:bg-agro-700 shadow-sm"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center font-bold text-earth-500">
                                                {post.author.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-earth-900 text-sm">{post.author}</h4>
                                                <p className="text-xs text-earth-500">{post.role} • {post.time}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {post.author === 'You' && (
                                                <button
                                                    onClick={() => startEditing(post)}
                                                    className="text-earth-400 hover:text-agro-600 p-1 rounded-full hover:bg-earth-50 transition-colors"
                                                    title="Edit Post"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                            )}
                                            <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 flex items-center gap-1">
                                                <Zap size={10} /> +{post.reward} EAC
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-earth-700 text-sm mb-4 leading-relaxed">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center justify-between text-earth-400 pt-2 border-t border-earth-50">
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={() => toggleLike(post.id)}
                                                className={`flex items-center gap-1 transition-all text-xs font-bold ${post.liked ? 'text-rose-600 scale-105' : 'hover:text-agro-600'}`}
                                            >
                                                <ThumbsUp size={16} fill={post.liked ? "currentColor" : "none"} /> {post.likes} Likes
                                            </button>
                                            <span className="bg-earth-100 text-earth-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                                                {post.thrust} Thrust
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleShare(post.content)}
                                            className="flex items-center gap-1 hover:text-blue-600 transition-colors text-xs font-bold"
                                        >
                                            <Share2 size={16} /> Share
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ) : activeTab === 'NOTIFICATIONS' ? (
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-earth-100 min-h-[500px] flex flex-col animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-earth-900 flex items-center gap-2">
                        <Bell size={24} className="text-blue-600" /> Notification Center
                    </h3>
                    {unreadCount > 0 && (
                        <button 
                            onClick={markAllRead}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div 
                                key={notif.id} 
                                className={`p-4 rounded-xl flex gap-3 transition-colors border ${
                                    notif.isRead 
                                    ? 'bg-white border-transparent hover:bg-earth-50' 
                                    : 'bg-blue-50 border-blue-100 shadow-sm'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                    notif.type === 'like' ? 'bg-rose-100 text-rose-600' : 
                                    notif.type === 'comment' ? 'bg-blue-100 text-blue-600' : 
                                    'bg-amber-100 text-amber-600'
                                }`}>
                                    {notif.type === 'like' && <ThumbsUp size={16} />}
                                    {notif.type === 'comment' && <MessageSquarePlus size={16} />}
                                    {notif.type === 'system' && <Zap size={16} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-bold text-earth-900">{notif.actor}</span>
                                        <span className="text-[10px] text-earth-400 font-medium">{notif.time}</span>
                                    </div>
                                    <p className={`text-xs ${notif.isRead ? 'text-earth-500' : 'text-earth-700 font-medium'}`}>
                                        {notif.content}
                                    </p>
                                </div>
                                {!notif.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-earth-400">
                            <Mail size={48} className="mb-4 opacity-50" />
                            <p>No notifications yet.</p>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-earth-100 min-h-[500px] flex flex-col justify-center animate-in fade-in slide-in-from-left-4 duration-500">
                {/* EXISTING REGISTRATION CONTENT (GROUP/SOCIETY/ESIN/ID) */}
                
                {/* GROUP / SOCIETY REGISTRATION FORM */}
                {(activeTab === 'REGISTER_GROUP' || activeTab === 'REGISTER_SOCIETY') && (
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-agro-100 p-3 rounded-xl text-agro-700">
                                {activeTab === 'REGISTER_GROUP' ? <Users size={32} /> : <Building2 size={32} />}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-earth-900">
                                    {activeTab === 'REGISTER_GROUP' ? 'Register a New Group' : 'Register a Society'}
                                </h3>
                                <p className="text-earth-500 text-sm">Official enrollment into the EnvirosAgro database.</p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleRegister} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-earth-700">Official Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50" 
                                    placeholder={activeTab === 'REGISTER_GROUP' ? "e.g. Green Valley Farmers Group" : "e.g. National Organic Cooperative Society"}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-earth-700">Region / Location</label>
                                <input 
                                    required 
                                    type="text" 
                                    value={formData.region}
                                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                                    className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50" 
                                    placeholder="City, State, Country"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-earth-700">
                                        {activeTab === 'REGISTER_GROUP' ? 'Member Count' : 'Board Members'}
                                    </label>
                                    <input 
                                        type="number" 
                                        className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50" 
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-earth-700">Primary Thrust</label>
                                    <select className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50">
                                        <option>Social Agriculture</option>
                                        <option>Environmental Ag.</option>
                                        <option>Health Agriculture</option>
                                        <option>Technical Ag.</option>
                                        <option>Industrial Ag.</option>
                                    </select>
                                </div>
                            </div>
                            
                            {activeTab === 'REGISTER_SOCIETY' && (
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-earth-700">Registration / License No.</label>
                                    <input type="text" className="w-full border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50" placeholder="Govt. Issued Reg No." />
                                </div>
                            )}

                            <button type="submit" className="w-full bg-agro-600 text-white font-bold py-4 rounded-xl hover:bg-agro-700 transition-colors shadow-md mt-4 flex items-center justify-center gap-2">
                                Proceed to ID Generation <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                )}

                {/* ESIN GENERATION INFO */}
                {activeTab === 'GET_ESIN' && (
                    <div className="text-center">
                        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <Fingerprint size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-earth-900 mb-4">EnvirosAgro Social ID Number (ESIN)</h3>
                        <p className="text-earth-600 mb-8 leading-relaxed">
                            The ESIN is a unique alphanumeric identifier assigned to every registered entity within our framework. It tracks your sustainability contributions (C(a) score), enables access to financial grants, and validates your products in the marketplace.
                        </p>
                        <div className="bg-earth-50 p-6 rounded-xl border border-earth-200 text-left space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-green-600 shrink-0" />
                                <span className="text-earth-700 font-medium">Track Sustainability Credits</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-green-600 shrink-0" />
                                <span className="text-earth-700 font-medium">Access Supply Chain Logistics</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-green-600 shrink-0" />
                                <span className="text-earth-700 font-medium">Verify Product Authenticity</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setActiveTab('REGISTER_GROUP')} 
                            className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            Register to Get ESIN
                        </button>
                    </div>
                )}

                {/* DIGITAL ID CARD */}
                {activeTab === 'ID_CARD' && (
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold text-earth-900 mb-8">Your Digital Identity</h3>
                        
                        {/* ID Card Visual */}
                        <div className="w-full max-w-sm bg-gradient-to-br from-agro-800 to-agro-900 rounded-2xl overflow-hidden shadow-2xl relative text-white aspect-[1.58/1]">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <img src="https://picsum.photos/600/400?grayscale" className="w-full h-full object-cover" />
                            </div>
                            
                            {/* Header */}
                            <div className="relative z-10 p-5 flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <Sprout size={24} className="text-agro-400" />
                                    <span className="font-serif font-bold tracking-tight">EnvirosAgro</span>
                                </div>
                                <div className="bg-white/20 p-1.5 rounded-lg">
                                    <QrCode size={24} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 px-6 mt-2 flex gap-4">
                                <div className="w-20 h-20 bg-white rounded-lg p-1">
                                    <img src="https://picsum.photos/100/100?random=50" className="w-full h-full object-cover rounded" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-agro-300 uppercase tracking-wider font-bold">Registered Entity</p>
                                    <h4 className="font-bold text-lg leading-tight mb-1">{formData.name || 'Green Earth Co-op'}</h4>
                                    <p className="text-xs text-agro-200">{formData.region || 'Nairobi, Kenya'}</p>
                                    
                                    <div className="mt-3">
                                        <p className="text-[10px] text-agro-300 uppercase tracking-wider font-bold">ESIN Number</p>
                                        <p className="font-mono text-agro-100 tracking-wider">{esin || 'EA-GRP-2024-839210'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="relative z-10 p-4 mt-auto border-t border-white/10 flex justify-between items-end absolute bottom-0 w-full">
                                <div>
                                    <p className="text-[8px] text-agro-400">Sustainability Framework Member</p>
                                </div>
                                <ShieldCheck size={20} className="text-agro-400" />
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button className="text-agro-600 font-bold hover:underline">Download PDF</button>
                            <button className="text-agro-600 font-bold hover:underline">Add to Wallet</button>
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* Right Side: Informational Content / Wallet */}
        <div className="space-y-8">
            {(activeTab === 'FEED' || activeTab === 'NOTIFICATIONS') ? (
                <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Coins size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Coins size={24} />
                            </div>
                            <h3 className="font-bold text-lg">Your Rewards</h3>
                        </div>
                        <p className="text-amber-100 text-sm mb-6">Earned from community contributions</p>
                        
                        <div className="text-5xl font-serif font-bold mb-2 flex items-baseline gap-2">
                            {walletBalance} <span className="text-lg font-sans font-normal opacity-80">EAC</span>
                        </div>
                        <p className="text-xs text-amber-200 mb-6">≈ ${(walletBalance * 0.10).toFixed(2)} USD value</p>

                        {/* Chart Section */}
                        <div className="h-32 w-full mb-6 bg-black/10 rounded-xl p-2 border border-white/10 flex flex-col">
                             <p className="text-[10px] font-bold text-amber-100 uppercase tracking-wider mb-2 text-center shrink-0">7-Day Earnings Trend</p>
                             <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={REWARDS_HISTORY}>
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.6)', fontSize: 10}} />
                                        <Tooltip 
                                            cursor={{stroke: 'rgba(255,255,255,0.2)'}}
                                            contentStyle={{background: 'rgba(255,255,255,0.95)', borderRadius: '8px', border: 'none', color: '#b45309', fontSize: '12px', fontWeight: 'bold'}}
                                            itemStyle={{color: '#b45309'}}
                                        />
                                        <Line type="monotone" dataKey="amount" stroke="#fff" strokeWidth={2} dot={{fill: '#f59e0b', strokeWidth: 0, r: 2}} activeDot={{r: 4, stroke: '#fff', strokeWidth: 2}} />
                                    </LineChart>
                                </ResponsiveContainer>
                             </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-white text-amber-800 font-bold py-3 rounded-xl hover:bg-amber-50 transition-colors shadow-sm text-sm">
                                Redeem for Tools
                            </button>
                            <button className="w-full border border-white/30 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
                                View Transaction History
                            </button>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-white/20">
                            <p className="text-xs font-bold text-amber-100 uppercase tracking-wider mb-2">Ways to Mine EAC:</p>
                            <ul className="text-xs text-white space-y-1">
                                <li>• Media Engagement</li>
                                <li>• Sustainability Practices</li>
                                <li>• Investing in Youth Ag-Ed</li>
                                <li>• Building Resilience</li>
                                <li>• Transactions & Data Injection</li>
                                <li>• Planting Trees & Seeds</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
                        <h3 className="font-bold text-xl text-rose-900 mb-4 flex items-center gap-2">
                            <Users className="text-rose-600" /> Why Register a Group?
                        </h3>
                        <p className="text-rose-800 leading-relaxed text-sm">
                            Smallholder farmers achieve economies of scale by registering as a group. Benefits include bulk input purchasing, shared machinery (Technical Ag), and collective bargaining power in the marketplace.
                        </p>
                    </div>

                    <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                        <h3 className="font-bold text-xl text-blue-900 mb-4 flex items-center gap-2">
                            <Building2 className="text-blue-600" /> Society Benefits
                        </h3>
                        <p className="text-blue-800 leading-relaxed text-sm">
                            Societies act as formal legal entities capable of receiving large-scale government grants and international funding. Registration provides the legal structure necessary for industrial-scale processing and value addition.
                        </p>
                    </div>

                    <div className="bg-agro-50 p-8 rounded-3xl border border-agro-100">
                        <h3 className="font-bold text-xl text-agro-900 mb-4 flex items-center gap-2">
                            <Fingerprint className="text-agro-600" /> The Power of ESIN
                        </h3>
                        <p className="text-agro-800 leading-relaxed text-sm">
                            Your <strong>EnvirosAgro Social Identification Number</strong> is your digital passport to the sustainable economy. It links your on-farm practices to the global supply chain, verifying your environmental impact (m-score) to buyers and investors instantly.
                        </p>
                    </div>
                </>
            )}
        </div>

      </div>
    </div>
  );
};