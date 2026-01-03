import { Play } from 'lucide-react';
import { EPISODES } from './data.tsx';

export const EpisodeList: React.FC = () => {
  const episodes = EPISODES;

  return (
    <div className="bg-white dark:bg-earth-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold font-serif tracking-tight text-earth-900 dark:text-white sm:text-4xl">Recent Episodes</h2>
          <p className="mt-6 text-lg leading-8 text-earth-600 dark:text-earth-300">
            Catch up on our latest conversations with the people shaping the future of agriculture.
          </p>
        </div>
        <div className="mt-16">
          <ul className="divide-y divide-earth-100 dark:divide-earth-800">
            {episodes.map((episode) => (
              <li key={episode.id} className="py-8 group">
                <div className="md:flex items-center">
                  <div className="md:flex-grow">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Guest: {episode.guest}</p>
                    <h3 className="text-xl font-bold text-earth-900 dark:text-white group-hover:text-indigo-600 transition-colors">{episode.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-earth-600 dark:text-earth-400">{episode.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0 flex flex-col items-start md:items-end">
                    <p className="text-sm font-medium text-earth-500">Duration: {episode.duration}</p>
                    <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95">
                      <Play size={16} />
                      <span>Play Episode</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
