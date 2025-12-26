import React from 'react';
import { TrendingUp, Clock, Library } from 'lucide-react';
import { Episode } from '../../types';

interface AudioStreamListProps {
  episodes: Episode[];
  currentEpisode: Episode;
  isPlaying: boolean;
  handleSelectEpisode: (ep: Episode) => void;
  setShowArchive: (show: boolean) => void;
}

export const AudioStreamList: React.FC<AudioStreamListProps> = ({
  episodes,
  currentEpisode,
  isPlaying,
  handleSelectEpisode,
  setShowArchive,
}) => {
  return (
    <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 overflow-hidden sticky top-24">
      <div className="p-8 border-b border-earth-100 dark:border-earth-800 bg-earth-50 dark:bg-earth-900/50 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-xl text-earth-900 dark:text-white">Audio Stream</h3>
          <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest mt-1">Network Transmission Active</p>
        </div>
        <div className="bg-agro-500 text-white p-2 rounded-xl shadow-lg shadow-agro-500/20">
          <TrendingUp size={20} />
        </div>
      </div>
      <div className="divide-y divide-earth-50 dark:divide-earth-800">
        {episodes.slice(0, 4).map((ep) => (
          <div
            key={ep.id}
            onClick={() => handleSelectEpisode(ep)}
            className={`p-6 hover:bg-agro-50 dark:hover:bg-agro-900/20 cursor-pointer transition-all group ${currentEpisode.id === ep.id ? 'bg-agro-50 dark:bg-agro-900/10' : ''}`}
          >
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                <img src={ep.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={ep.title} />
                {currentEpisode.id === ep.id && isPlaying && (
                  <div className="absolute inset-0 bg-agro-900/60 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="flex gap-1 items-end h-4">
                      {[1, 2, 3].map(i => <div key={i} className={`w-1 bg-white rounded-full animate-bounce [animation-delay:${i * 0.1}s]`} ></div>)}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className={`text-sm font-bold mb-2 line-clamp-2 leading-tight transition-colors ${currentEpisode.id === ep.id ? 'text-agro-700 dark:text-agro-400' : 'text-earth-900 dark:text-white group-hover:text-agro-700'}`}>
                  {ep.title}
                </h4>
                <div className="flex items-center gap-4 text-[9px] font-black text-earth-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={10} /> {ep.duration}</span>
                  <span className="w-1 h-1 bg-earth-200 dark:bg-earth-800 rounded-full"></span>
                  <span>{ep.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 text-center bg-earth-50/50 dark:bg-earth-900/30">
        <button
          onClick={() => setShowArchive(true)}
          className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 text-earth-700 dark:text-earth-300 font-black py-4 rounded-2xl hover:bg-agro-50 dark:hover:bg-agro-900/20 hover:text-agro-700 transition-all text-xs uppercase tracking-widest shadow-sm active:scale-95 flex items-center justify-center gap-3"
        >
          <Library size={18} /> View All Episodes
        </button>
      </div>
    </div>
  );
};
