import React, { useState, useEffect } from 'react';
import { Play, Pause, X, Mic, FileText } from 'lucide-react';

interface MediaPlayerProps {
  activeMedia: any;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onClose: () => void;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ activeMedia, isPlaying, setIsPlaying, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Mic size={24} />;
      case 'article':
        return <FileText size={24} />;
      default:
        return <Play size={24} />;
    }
  };

  return (
    <div className="fixed bottom-8 left-8 right-8 bg-white dark:bg-earth-800 p-6 rounded-2xl shadow-lg z-50 flex items-center gap-6 border border-earth-200 dark:border-earth-700">
      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
        <img src={activeMedia.image} alt={activeMedia.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-earth-900 dark:text-white">{activeMedia.title}</h3>
        <p className="text-sm text-earth-600 dark:text-earth-400">{activeMedia.author}</p>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setIsPlaying(!isPlaying)} className="text-earth-900 dark:text-white">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <div className="w-48 h-2 bg-earth-200 dark:bg-earth-700 rounded-full overflow-hidden">
          <div className="h-full bg-agro-600" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button onClick={onClose} className="text-earth-600 dark:text-earth-400 hover:text-earth-900 dark:hover:text-white">
        <X size={24} />
      </button>
    </div>
  );
};
