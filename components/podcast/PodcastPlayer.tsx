import React from 'react';
import { Play, Pause, Rewind, FastForward } from 'lucide-react';
import { Episode } from '../../types';

interface PodcastPlayerProps {
  episode: Episode;
  isPlaying: boolean;
  onPlayPause: () => void;
  onRewind: () => void;
  onFastForward: () => void;
  progress: number;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ episode, isPlaying, onPlayPause, onRewind, onFastForward, progress }) => {
  if (!episode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-lg border-t border-white/10 shadow-t-2xl z-40 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-24">
          <img src={episode.image} alt={episode.title} className="w-16 h-16 rounded-lg object-cover mr-6 shadow-md" />
          
          <div className="flex-grow">
            <h3 className="font-bold text-white">{episode.title}</h3>
            <p className="text-sm text-gray-400">
              {episode.guests.map((g) => g.name).join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-6 text-white mx-8">
            <button onClick={onRewind} className="hidden md:block text-gray-400 hover:text-white transition-colors"><Rewind size={24} /></button>
            <button onClick={onPlayPause} className="bg-green-500 rounded-full p-4 text-white hover:bg-green-600 transition-colors shadow-lg">
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
            <button onClick={onFastForward} className="hidden md:block text-gray-400 hover:text-white transition-colors"><FastForward size={24} /></button>
          </div>
          
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
        <div className="h-full bg-green-500 transition-all duration-1000 linear" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};