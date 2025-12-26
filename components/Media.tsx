import React, { useState } from 'react';
import { View } from '../types';
import { Camera, Mic, Newspaper, Scroll, Globe, Rocket, Tv, BoxSelect, X, PlayCircle } from 'lucide-react';

const mediaLinks = [
  {
    id: View.GREEN_LENS,
    title: 'GreenLens',
    description: 'Visually-driven stories of agricultural innovation.',
    icon: <Camera size={24} />,
    asset: '4K HDR Optimized'
  },
  {
    id: View.PODCAST,
    title: 'Podcast',
    description: 'Tune into conversations with leading experts.',
    icon: <Mic size={24} />,
    asset: 'High-Fidelity Audio'
  },
  {
    id: View.AGBIZ_WEEKLY,
    title: 'AgBiz Weekly',
    description: 'Your weekly briefing on the business of agriculture.',
    icon: <Newspaper size={24} />,
    asset: 'Weekly Reports'
  },
  {
    id: View.HERITAGE_FORUM,
    title: 'Heritage Forum',
    description: 'Ancient wisdom for modern farming challenges.',
    icon: <Scroll size={24} />,
    asset: 'Oral Histories'
  },
  {
    id: View.PLANET_WATCH,
    title: 'Planet Watch',
    description: 'Real-time data on global environmental health.',
    icon: <Globe size={24} />,
    asset: 'Live Environmental Data'
  },
  {
    id: View.FUTURE_VISION,
    title: 'Future Vision',
    description: 'Exploring the next frontier of agricultural technology.',
    icon: <Rocket size={24} />,
    asset: 'Tech Previews'
  },
  {
    id: View.WEBINAR,
    title: 'Webinar',
    description: 'Live and on-demand expert presentations.',
    icon: <Tv size={24} />,
    asset: 'On-Demand Video'
  },
  {
    id: View.SMART_FARM_VR,
    title: 'Smart Farm VR',
    description: 'Immersive virtual tours of cutting-edge farms.',
    icon: <BoxSelect size={24} />,
    asset: 'VR Experiences'
  },
];

const MediaModal: React.FC<{ media: any, onClose: () => void, onNavigate: (view: View) => void }> = ({ media, onClose, onNavigate }) => {
    if (!media) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white/10 dark:bg-gray-800/50 border border-white/20 rounded-3xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 scale-95 hover:scale-100" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-green-400">
                                {media.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold font-serif text-white">{media.title}</h2>
                                <p className="text-xs text-green-300 font-black uppercase tracking-[0.3em] mt-1">{media.asset}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-gray-300 mt-6">{media.description}</p>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => { onNavigate(media.id); onClose(); }}
                            className="flex items-center gap-3 bg-green-500/80 text-white font-bold py-3 px-8 rounded-full hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <PlayCircle size={24} />
                            Explore {media.title}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const Media: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Media Hub</h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Explore our multimedia content channels.</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediaLinks.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group" onClick={() => setSelectedMedia(item)}>
              <div className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-agro-500 text-white mx-auto group-hover:bg-green-500 transition-colors">
                      {item.icon}
                  </div>
                  <div className='text-center mt-4'>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
                <p className="w-full text-center text-agro-600 dark:text-agro-400 font-semibold group-hover:text-green-500 transition-colors">
                  View Details
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} onNavigate={onNavigate} />
    </>
  );
};
