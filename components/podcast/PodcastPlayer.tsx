import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Mic } from 'lucide-react';

interface PodcastPlayerProps {
  currentEpisode: any;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  progress: number;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  currentEpisode,
  isPlaying,
  setIsPlaying,
  progress,
}) => {
  return (
    <div className="bg-agro-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-8 group">
      {/* Background Cover */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img src={currentEpisode.image} alt="Cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-agro-950 via-agro-950/40 to-transparent"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
        <div className="w-64 h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/20 shrink-0 relative">
          <img src={currentEpisode.image} alt={currentEpisode.title} className="w-full h-full object-cover" />
          {isPlaying && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 items-end h-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-1.5 bg-white/80 rounded-full animate-[pulse_1s_infinite]" style={{ animationDelay: `${i * 0.2}s`, height: `${30 + Math.random() * 70}%` }}></div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-agro-300 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <div className="w-8 h-px bg-agro-400"></div>
            <Mic size={14} /> AgroCulture Podcast
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3 leading-tight tracking-tight">{currentEpisode.title}</h2>
          <p className="text-agro-200 text-lg mb-10 font-medium opacity-80">Hosted by {currentEpisode.host}</p>

          {/* Controls */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center md:justify-start gap-10">
              <button className="text-agro-300 hover:text-white transition-all hover:scale-110"><SkipBack size={32} /></button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-white text-agro-900 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-white/10 active:scale-95 group/play"
              >
                {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
              </button>
              <button className="text-agro-300 hover:text-white transition-all hover:scale-110"><SkipForward size={32} /></button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-lg">
              <div className="flex justify-between text-[10px] font-black text-agro-300 uppercase tracking-widest mb-3">
                <span className="font-mono">12:45</span>
                <span className="font-mono">{currentEpisode.duration}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 cursor-pointer relative overflow-hidden group/bar">
                <div className="bg-agro-400 h-full rounded-full transition-all relative shadow-[0_0_15px_rgba(74,222,128,0.5)]" style={{ width: `${progress}%` }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/bar:animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
