
import { DOCS_LIBRARY, FEATURED_FILM } from '@/components/greenlens/data';
import { notFound } from 'next/navigation';
import { Award, Clapperboard, Users, Film as FilmIcon } from 'lucide-react';
import Link from 'next/link';

interface FilmPageProps {
  params: {
    filmId: string;
  }
}

// Combine all films into one array for easier lookup
const ALL_FILMS = [FEATURED_FILM, ...DOCS_LIBRARY];

export default function FilmPage({ params }: FilmPageProps) {
  const filmId = parseInt(params.filmId, 10);
  const film = ALL_FILMS.find(f => f.id === filmId);

  if (!film) {
    notFound();
  }

  // Get other films for the "More Like This" section
  const relatedFilms = DOCS_LIBRARY.filter(f => f.id !== filmId).slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Film Player and Title */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden shadow-xl mb-8">
           {/* In a real app, this would be a video player component */}
           <img src={film.image} alt={film.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
           <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold font-serif text-white shadow-text">{film.title}</h1>
              <p className="mt-2 text-lg text-gray-300">{film.year} &middot; {film.duration}</p>
           </div>
        </div>

        {/* Film Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-white mb-4">Synopsis</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{film.synopsis}</p>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold font-serif text-gray-900 dark:text-white">Impact</h3>
                    <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400">
                        <Award className="w-6 h-6 mr-2"/>
                        <p className="text-lg font-medium">{film.impact}</p>
                    </div>
                </div>
            </div>

            <div className="md:col-span-1 space-y-8">
                 {/* Crew */}
                 <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
                        <Users className="w-5 h-5 mr-2 text-indigo-500"/>
                        Key Crew
                    </h3>
                    <ul className="mt-4 space-y-3">
                        {film.crew.map(member => (
                            <li key={member.role} className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{member.role}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
                 {/* Awards */}
                 {film.awards && film.awards.length > 0 && (
                     <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
                            <Award className="w-5 h-5 mr-2 text-indigo-500"/>
                            Accolades
                        </h3>
                        <ul className="mt-4 space-y-2">
                            {film.awards.map(award => (
                                <li key={award} className="text-sm text-gray-600 dark:text-gray-300">
                                    {award}
                                </li>
                            ))}
                        </ul>
                     </div>
                 )}
            </div>
        </div>

        {/* More Like This */}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
             <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-white">More Like This</h2>
             <div className="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
                {relatedFilms.map(related => (
                   <div key={related.id} className="group relative">
                      <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden relative">
                         <img src={related.image} alt={related.title} className="w-full h-full object-cover"/>
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"/>
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                         <Link href={`/greenlens/film/${related.id}`}>
                            <span className="absolute inset-0" />
                            {related.title}
                         </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{related.category}</p>
                   </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
}
