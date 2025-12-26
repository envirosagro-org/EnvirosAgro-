import React, { useState } from 'react';
import { PodcastHeader } from './podcast/PodcastHeader';
import { EpisodePlayer } from './podcast/EpisodePlayer';
import { EpisodeList } from './podcast/EpisodeList';
import { EPISODES } from './podcast/data';

export const Podcast = () => {
    const [currentEpisode, setCurrentEpisode] = useState(EPISODES[0]);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
            <PodcastHeader />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <EpisodePlayer episode={currentEpisode} />
                    </div>
                    <div className="lg:col-span-1">
                        <EpisodeList 
                            episodes={EPISODES} 
                            currentEpisode={currentEpisode} 
                            onSelectEpisode={setCurrentEpisode} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};