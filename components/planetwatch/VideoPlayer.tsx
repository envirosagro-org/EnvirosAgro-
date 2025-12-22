import React from 'react';
import { Play, Pause, X, Wifi, Volume2, Settings, Maximize, FileText } from 'lucide-react';

interface VideoPlayerProps {
  isBroadcasting: boolean;
  activeSegment: any;
  isPaused: boolean;
  videoProgress: number;
  setIsPaused: (paused: boolean) => void;
  handleCloseBroadcast: () => void;
  handleWatchNow: () => void;
  setShowTranscript: (show: boolean) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isBroadcasting,
  activeSegment,
  isPaused,
  videoProgress,
  setIsPaused,
  handleCloseBroadcast,
  handleWatchNow,
  setShowTranscript,
}) => {
  return (
    <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl group border border-earth-200 dark:border-earth-800">
      {isBroadcasting ? (
        <div className="absolute inset-0 bg-slate-900 flex flex-col">
          <img
            src={activeSegment.image}
            className={`w-full h-full object-cover transition-all duration-1000 ${isPaused ? 'opacity-40 grayscale blur-sm' : 'opacity-80'}`}
            alt="Broadcast Feed"
          />

          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE BROADCAST
              </div>
              <div className="flex gap-2 pointer-events-auto">
                <div className="bg-black/40 backdrop-blur text-white px-3 py-1 rounded-xl text-[10px] font-mono border border-white/10 flex items-center gap-2">
                  <Wifi size={12} className="text-green-400" /> SYNC_OK
                </div>
                <button
                  onClick={handleCloseBroadcast}
                  className="bg-black/40 hover:bg-red-600 backdrop-blur text-white p-2 rounded-xl border border-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-6 border border-white/10 w-full max-w-2xl mx-auto pointer-events-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPaused(!isPaused)} className="text-white hover:text-agro-400 transition-colors">
                    {isPaused ? <Play size={24} fill="currentColor" /> : <Pause size={24} fill="currentColor" />}
                  </button>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-agro-400 uppercase tracking-widest">{activeSegment.title}</span>
                    <span className="text-[9px] text-slate-400 font-mono tracking-tighter mt-0.5">ENVIROSAGRO_FEED_CH_01_HD</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Volume2 size={18} className="text-slate-400 cursor-pointer" />
                  <Settings size={18} className="text-slate-400 cursor-pointer" />
                  <Maximize size={18} className="text-slate-400 cursor-pointer" />
                </div>
              </div>
              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden group/progress cursor-pointer">
                <div
                  className="h-full bg-agro-600 relative transition-all duration-300 shadow-[0_0_15px_#16a34a]"
                  style={{ width: `${videoProgress}%` }}
                >
                  <div className="absolute right-0 top-0 h-full w-2 bg-white shadow-xl opacity-0 group-hover/progress:opacity-100"></div>
                </div>
              </div>
              <div className="flex justify-between mt-3 text-[9px] font-mono text-slate-500 font-bold">
                <span>{Math.floor((videoProgress / 100) * 12)}:{(Math.floor((videoProgress / 100) * 45) % 60).toString().padStart(2, '0')}</span>
                <span>{activeSegment.duration}</span>
              </div>
            </div>
          </div>

          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-full border border-white/20 animate-in zoom-in">
                <Play size={48} className="text-white fill-white ml-2" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <img src={activeSegment.image} className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105" alt="Main News" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>

          <div className="absolute bottom-0 left-0 w-full p-10 text-white">
            <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block animate-pulse shadow-lg">
              {activeSegment.category}
            </span>
            <h3 className="text-4xl font-bold mb-4 leading-tight max-w-2xl tracking-tight">{activeSegment.title}</h3>
            <p className="text-gray-300 text-base mb-8 max-w-xl line-clamp-2 font-medium leading-relaxed">{activeSegment.desc}</p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleWatchNow()}
                className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <Play size={20} fill="currentColor" className="ml-0.5" /> Watch Report
              </button>
              <button
                onClick={() => setShowTranscript(true)}
                className="flex items-center gap-3 text-white hover:text-agro-400 transition-all font-black text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20"
              >
                <FileText size={20} /> Read Transcript
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
