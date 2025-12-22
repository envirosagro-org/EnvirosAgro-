import React from 'react';
import { X, Clock, Calendar, User, Zap, Leaf, Globe, Award, Star, Play, Share2 } from 'lucide-react';

interface DetailsModalProps {
  detailsFilm: any;
  setShowDetailsModal: (show: boolean) => void;
  handleWatchNow: (film: any) => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
  detailsFilm,
  setShowDetailsModal,
  handleWatchNow,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto" onClick={() => setShowDetailsModal(false)}>
      <div
        className="bg-white dark:bg-earth-900 w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header/Cover */}
        <div className="relative h-96 shrink-0">
          <img src={detailsFilm.image} className="w-full h-full object-cover" alt={detailsFilm.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900 dark:from-earth-950 via-earth-900/40 to-transparent"></div>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="absolute top-8 right-8 bg-black/40 hover:bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/10 transition-all hover:rotate-90 active:scale-90"
          >
            <X size={28} />
          </button>
          <div className="absolute bottom-10 left-10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{detailsFilm.category}</span>
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-earth-300"><Clock size={12} /> {detailsFilm.duration}</span>
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-earth-300"><Calendar size={12} /> {detailsFilm.year}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{detailsFilm.title}</h3>
          </div>
        </div>

        <div className="p-10 md:p-14">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h4 className="text-xs font-black text-green-600 uppercase tracking-[0.3em] mb-4">Synopsis</h4>
                <p className="text-lg text-earth-700 dark:text-earth-300 leading-relaxed font-medium">
                  {detailsFilm.synopsis || detailsFilm.description}
                </p>
              </section>

              <section>
                <h4 className="text-xs font-black text-green-600 uppercase tracking-[0.3em] mb-6">Production Credits</h4>
                <div className="grid grid-cols-2 gap-8">
                  {(detailsFilm.crew || [{ role: "Director", name: detailsFilm.director || "Unknown" }]).map((member: any, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-earth-50 dark:bg-earth-800 rounded-xl flex items-center justify-center text-earth-400">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest">{member.role}</p>
                        <p className="font-bold text-earth-900 dark:text-white">{member.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-earth-50 dark:bg-earth-800/50 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-700">
                <h4 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                  <Zap size={14} className="text-amber-500" /> Impact Metrics
                </h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-green-600">
                      <Leaf size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest leading-none mb-1">Environmental Impact</p>
                      <p className="font-bold text-earth-900 dark:text-white">{detailsFilm.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-earth-900 rounded-xl shadow-sm text-blue-600">
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest leading-none mb-1">Certification</p>
                      <p className="font-bold text-earth-900 dark:text-white">Gold Standard</p>
                    </div>
                  </div>
                </div>
              </div>

              {(detailsFilm.awards && detailsFilm.awards.length > 0) && (
                <div className="bg-agro-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transition-transform group-hover:rotate-45 duration-1000">
                    <Award size={100} />
                  </div>
                  <h4 className="text-[10px] font-black text-agro-400 uppercase tracking-[0.4em] mb-6 relative z-10">Recognition</h4>
                  <ul className="space-y-3 relative z-10">
                    {detailsFilm.awards.map((award: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-agro-100">
                        <Star size={14} className="text-amber-400" fill="currentColor" /> {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleWatchNow(detailsFilm)}
                className="w-full nature-gradient text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-agro-900/20 hover:scale-[1.01] active:scale-95 transition-all"
              >
                <Play size={20} fill="currentColor" /> Watch Now
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
          <Share2 size={18} className="text-green-600" />
          <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Share this impact story with your network</p>
        </div>
      </div>
    </div>
  );
};
