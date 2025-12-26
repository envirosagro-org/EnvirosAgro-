import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Rewind, FastForward, Volume2, VolumeX } from 'lucide-react';
import { Episode } from '../../types';

interface EpisodePlayerProps {
    episode: Episode;
}

export const EpisodePlayer: React.FC<EpisodePlayerProps> = ({ episode }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(audioRef.current) {
            audioRef.current.currentTime = parseFloat(e.target.value);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="relative h-64 bg-cover bg-center" style={{backgroundImage: `url(${episode.coverArt})`}}>
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="p-8 relative">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{episode.title}</h2>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">with {episode.guest}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-4">{episode.description}</p>

              <audio 
                  ref={audioRef} 
                  src={episode.audioUrl} 
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
              />

              <div className="mt-6">
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                  </div>
                  <input 
                      type="range" 
                      min="0" 
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
                  />
              </div>

              <div className="flex items-center justify-center space-x-6 mt-6">
                  <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"><Rewind /></button>
                  <button 
                      onClick={togglePlayPause}
                      className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition">
                      {isPlaying ? <Pause size={28}/> : <Play size={28}/>}
                  </button>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"><FastForward /></button>
              </div>
            </div>
        </div>
    );
};