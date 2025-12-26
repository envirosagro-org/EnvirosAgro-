import React from 'react';
import { PlayCircle } from 'lucide-react';

export const FilmStrip = ({ title, docs, onSelect }: any) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="flex overflow-x-auto space-x-6 pb-6 -mx-6 px-6">
        {docs.map((doc: any) => (
          <div
            key={doc.id}
            onClick={() => onSelect(doc)}
            className="group relative flex-shrink-0 w-64 rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            <img src={doc.image} alt={doc.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <PlayCircle size={64} className="text-white" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-400">{doc.category}</p>
              <h3 className="text-lg font-bold text-white mt-1">{doc.title}</h3>
              <p className="text-sm text-gray-400">{doc.year} &middot; {doc.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};