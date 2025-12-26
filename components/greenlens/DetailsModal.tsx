import React from 'react';
import { X, PlayCircle, Award, Users } from 'lucide-react';
import { Film } from '../../types';

interface DetailsModalProps {
    detailsFilm: Film;
    setShowDetailsModal: (show: boolean) => void;
    handleWatchNow: (film: Film) => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ detailsFilm, setShowDetailsModal, handleWatchNow }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 animate-in fade-in duration-300 flex items-center justify-center">
      <div className="relative bg-white/5 dark:bg-gray-800/20 rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10">
        <button onClick={() => setShowDetailsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
          <X size={28} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <img src={detailsFilm.image} alt={detailsFilm.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          <div className="p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-green-400">{detailsFilm.category}</p>
            <h2 className="text-3xl font-bold my-2">{detailsFilm.title}</h2>
            <p className="text-sm text-gray-400 mb-6">{detailsFilm.year} &middot; {detailsFilm.duration} &middot; Directed by {detailsFilm.director}</p>

            <button
              onClick={() => handleWatchNow(detailsFilm)}
              className="w-full mb-6 px-6 py-3 bg-green-500 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg active:scale-95"
            >
              <PlayCircle size={24} />
              Watch Film
            </button>
            
            <div className="space-y-4 text-gray-300">
              <p>{detailsFilm.synopsis}</p>
              
              <div>
                <h3 className="font-bold text-white flex items-center gap-2 mb-2"><Users size={18} /> Crew</h3>
                <ul className="text-sm space-y-1 pl-4">
                  {detailsFilm.crew.map((member) => (
                    <li key={member.name}><strong>{member.role}:</strong> {member.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white flex items-center gap-2 mb-2"><Award size={18} /> Accolades</h3>
                <ul className="text-sm space-y-1 pl-4">
                  {detailsFilm.awards.map((award: string) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};