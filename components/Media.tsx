
import React from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, PlayCircle, Newspaper, Radio, Cast, Megaphone, Share2, Link2, Globe, CheckCircle2, MessageCircle, Video, Glasses, Monitor, Film, Bell, Heart, BarChart2, Calendar } from 'lucide-react';
import { View } from '../types';

const MEDIA_CHANNELS = [
  {
    id: 'SA',
    thrust: 'Social Agriculture',
    title: 'Community Voices & Heritage',
    icon: <Users size={24} />,
    color: 'bg-rose-50 border-rose-100 text-rose-800',
    description: 'Forums for storytelling, cultural preservation, and community dialogue.',
    channels: [
      { name: 'AgroCulture Podcast', type: 'Audio', desc: 'Stories from indigenous farmers.', isPodcast: true },
      { name: 'Heritage Forums', type: 'Community', desc: 'Peer-to-peer knowledge exchange.', isForum: true }
    ]
  },
  {
    id: 'EA',
    thrust: 'Environmental Agriculture',
    title: 'Eco-Reporting & Impact',
    icon: <Leaf size={24} />,
    color: 'bg-green-50 border-green-100 text-green-800',
    description: 'Documentaries and real-time reporting on climate and conservation.',
    channels: [
      { name: 'Planet Watch News', type: 'Video', desc: 'Daily climate impact updates.', isNews: true },
      { name: 'Green Lens Docs', type: 'Documentary', desc: 'Films on biodiversity restoration.', isDoc: true }
    ]
  },
  {
    id: 'HA',
    thrust: 'Health Agriculture',
    title: 'Wellness & Safety Alerts',
    icon: <ShieldPlus size={24} />,
    color: 'bg-red-50 border-red-100 text-red-800',
    description: 'Health advisories, nutritional education, and safety broadcasts.',
    channels: [
      { name: 'SafeHarvest Alerts', type: 'Mobile Push', desc: 'Real-time pathogen warnings.', isAlert: true },
      { name: 'NutriLife Blog', type: 'Article', desc: 'Connecting soil health to human health.', isBlog: true }
    ]
  },
  {
    id: 'TA',
    thrust: 'Technical Agriculture',
    title: 'Digital Tech & Tutorials',
    icon: <Cpu size={24} />,
    color: 'bg-blue-50 border-blue-100 text-blue-800',
    description: 'Webinars, software demos, and technical training modules.',
    channels: [
      { name: 'TechAg Webinars', type: 'Live Stream', desc: 'Deep dives into precision farming tools.', isWebinar: true },
      { name: 'SmartFarm VR', type: 'Interactive', desc: 'Virtual reality machinery training.', isVR: true }
    ]
  },
  {
    id: 'IA',
    thrust: 'Industrial Agriculture',
    title: 'Industry Insights',
    icon: <Factory size={24} />,
    color: 'bg-slate-50 border-slate-100 text-slate-800',
    description: 'Market analysis, supply chain news, and large-scale operational reports.',
    channels: [
      { name: 'AgBiz Weekly', type: 'Newsletter', desc: 'Global market trends and analysis.', isNewsletter: true },
      { name: 'ScaleUp Summit', type: 'Event', desc: 'Coverage of industrial ag conferences.', isEvent: true }
    ]
  }
];

interface MediaProps {
  onNavigate?: (view: View) => void;
}

export const Media: React.FC<MediaProps> = ({ onNavigate }) => {
  const handleShare = (title: string, text: string) => {
    if (navigator.share) {
      // Ensure the URL is valid HTTP/HTTPS to prevent "Invalid URL" errors in previews
      const url = window.location.href.startsWith('http') ? window.location.href : 'https://envirosagro.com';
      
      navigator.share({
        title: title,
        text: text,
        url: url,
      }).catch((err) => {
          // Gracefully ignore abort errors (when user cancels share dialog)
          if (err.name !== 'AbortError') {
             console.error('Share failed:', err);
             alert(`Copied to clipboard: ${title} - ${text}`);
          }
      });
    } else {
      alert(`Copied to clipboard: ${title} - ${text}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">EnvirosAgro Media</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          A multi-channel platform disseminating knowledge, news, and culture across the agricultural spectrum.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {MEDIA_CHANNELS.map((section) => (
            <div key={section.id} className={`p-6 rounded-2xl border ${section.color.split(' ')[1]} ${section.color.split(' ')[0]} hover:shadow-lg transition-all`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-current">
                        {section.icon}
                    </div>
                    <h4 className="font-bold leading-tight">{section.title}</h4>
                </div>
                <p className="text-xs text-earth-600 mb-6 min-h-[40px]">{section.description}</p>
                
                <div className="space-y-3">
                    {section.channels.map((channel: any, idx) => (
                        <div key={idx} className="bg-white/60 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer relative group pr-8">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm text-earth-900">{channel.name}</span>
                                <span className="text-[10px] uppercase font-bold text-earth-400 border border-earth-200 px-1.5 rounded">{channel.type}</span>
                            </div>
                            <p className="text-[10px] text-earth-500 mb-2">{channel.desc}</p>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 flex items-center gap-1 w-fit">
                               Earn 5 EAC
                            </span>
                            
                            {/* Special Action for Podcast */}
                            {channel.isPodcast && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.PODCAST)}
                                    className="block mt-2 w-full text-center bg-agro-100 text-agro-700 text-xs font-bold py-1 rounded hover:bg-agro-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <PlayCircle size={12} /> Listen Now
                                </button>
                            )}

                            {/* Special Action for Heritage Forum */}
                            {channel.isForum && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.HERITAGE_FORUM)}
                                    className="block mt-2 w-full text-center bg-rose-100 text-rose-700 text-xs font-bold py-1 rounded hover:bg-rose-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <MessageCircle size={12} /> Join Discussion
                                </button>
                            )}

                            {/* Special Action for Webinars */}
                            {channel.isWebinar && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.WEBINAR)}
                                    className="block mt-2 w-full text-center bg-blue-100 text-blue-700 text-xs font-bold py-1 rounded hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Video size={12} /> Watch Live
                                </button>
                            )}

                            {/* Special Action for SmartFarm VR */}
                            {channel.isVR && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.SMART_FARM_VR)}
                                    className="block mt-2 w-full text-center bg-purple-100 text-purple-700 text-xs font-bold py-1 rounded hover:bg-purple-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Glasses size={12} /> Enter VR
                                </button>
                            )}

                            {/* Special Action for Planet Watch News */}
                            {channel.isNews && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.PLANET_WATCH)}
                                    className="block mt-2 w-full text-center bg-green-100 text-green-700 text-xs font-bold py-1 rounded hover:bg-green-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Monitor size={12} /> Watch Report
                                </button>
                            )}

                            {/* Special Action for Green Lens Docs */}
                            {channel.isDoc && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.GREEN_LENS)}
                                    className="block mt-2 w-full text-center bg-green-100 text-green-700 text-xs font-bold py-1 rounded hover:bg-green-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Film size={12} /> Stream Now
                                </button>
                            )}

                            {/* Special Action for SafeHarvest Alerts */}
                            {channel.isAlert && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.SAFE_HARVEST)}
                                    className="block mt-2 w-full text-center bg-red-100 text-red-700 text-xs font-bold py-1 rounded hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Bell size={12} /> View Alerts
                                </button>
                            )}

                            {/* Special Action for NutriLife Blog */}
                            {channel.isBlog && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.NUTRILIFE)}
                                    className="block mt-2 w-full text-center bg-red-100 text-red-700 text-xs font-bold py-1 rounded hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Heart size={12} /> Read Blog
                                </button>
                            )}

                            {/* Special Action for AgBiz Weekly */}
                            {channel.isNewsletter && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.AGBIZ_WEEKLY)}
                                    className="block mt-2 w-full text-center bg-slate-100 text-slate-700 text-xs font-bold py-1 rounded hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <BarChart2 size={12} /> View Market Data
                                </button>
                            )}

                            {/* Special Action for ScaleUp Summit (NEW) */}
                            {channel.isEvent && onNavigate && (
                                <button 
                                    onClick={() => onNavigate(View.SCALEUP_SUMMIT)}
                                    className="block mt-2 w-full text-center bg-slate-100 text-slate-700 text-xs font-bold py-1 rounded hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Calendar size={12} /> Enter Summit
                                </button>
                            )}
                            
                            {/* Share Button */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare(channel.name, channel.desc);
                                }}
                                className="absolute top-3 right-3 text-earth-400 hover:text-agro-600 transition-colors p-1"
                                title="Share"
                            >
                                <Share2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>

      {/* Social Connect Widget */}
      <div className="bg-white rounded-3xl p-8 border border-earth-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                  <h3 className="text-2xl font-bold text-agro-900 mb-2 flex items-center gap-2">
                      <Globe className="text-blue-500" /> Source & Supply Network
                  </h3>
                  <p className="text-earth-600 max-w-xl">
                      Connect your external social media accounts to automatically source trending agricultural news and supply your milestones to your broader network.
                  </p>
              </div>
              
              <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 font-bold text-sm hover:bg-blue-100 transition-colors">
                      <Link2 size={16} /> Connect LinkedIn
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 font-bold text-sm hover:bg-sky-100 transition-colors">
                      <Link2 size={16} /> Connect X (Twitter)
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 border border-green-100 font-bold text-sm">
                      <CheckCircle2 size={16} /> Facebook Linked
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
