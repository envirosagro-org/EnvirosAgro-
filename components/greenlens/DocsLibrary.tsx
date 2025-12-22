import React from 'react';
import { ArrowRight, Play, Award } from 'lucide-react';

interface DocsLibraryProps {
  docsLibrary: any[];
  setShowFullCatalog: (show: boolean) => void;
  handleOpenDetails: (film: any) => void;
}

export const DocsLibrary: React.FC<DocsLibraryProps> = ({
  docsLibrary,
  setShowFullCatalog,
  handleOpenDetails,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-earth-900 dark:text-white">Now Streaming</h3>
        <button
          onClick={() => setShowFullCatalog(true)}
          className="text-green-700 dark:text-green-400 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
        >
          View Full Catalog <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {docsLibrary.map((doc) => (
          <div
            key={doc.id}
            onClick={() => handleOpenDetails(doc)}
            className="group cursor-pointer flex flex-col h-full"
          >
            <div className="relative rounded-[2rem] overflow-hidden mb-4 aspect-[3/4] border border-earth-100 dark:border-earth-800 shadow-sm">
              <img src={doc.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={doc.title} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-xl border border-white/20">
                  <Play size={32} fill="currentColor" />
                </div>
                <p className="font-bold text-sm mb-1">{doc.impact}</p>
                <p className="text-[10px] text-gray-300 uppercase tracking-widest font-black">Verified Impact</p>
              </div>

              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-white/10">
                {doc.duration}
              </div>
            </div>

            <h4 className="font-bold text-lg text-earth-900 dark:text-white mb-2 group-hover:text-green-700 transition-colors leading-tight">{doc.title}</h4>
            <div className="flex items-center gap-2 text-xs text-earth-50 dark:text-earth-400 font-medium">
              <span>{doc.category}</span>
              <span className="w-1 h-1 bg-earth-300 dark:bg-earth-700 rounded-full"></span>
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold uppercase text-[10px] tracking-tighter"><Award size={14} /> Impact Film</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
