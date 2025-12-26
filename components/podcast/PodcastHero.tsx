import React from 'react';
import { PlayCircle, Mic } from 'lucide-react';

export const PodcastHero = ({ episode, onPlay }: any) => {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
      <img src={episode.image} alt={episode.title} className="w-full h-96 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-10">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-bold uppercase tracking-widest text-green-400 flex items-center gap-2">
            <Mic size={16} /> Featured Episode
          </p>
          <h1 className="text-5xl font-bold font-serif my-4">{episode.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{episode.showNotes.substring(0, 150)}...</p>
          <div className="flex items-center gap-6">
            <button
              onClick={onPlay}
              className="flex items-center gap-3 bg-green-500/90 text-white font-bold py-3 px-8 rounded-full hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <PlayCircle size={24} />
              Play Episode
            </button>
            <div className="text-sm">
                <p className="font-semibold">{episode.duration}</p>
                <p className="text-gray-400">{episode.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};