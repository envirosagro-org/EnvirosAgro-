import React from 'react';
import { PodcastHero } from './podcast/PodcastHero';
import { FeaturedEpisode } from './podcast/FeaturedEpisode';
import { EpisodeList } from './podcast/EpisodeList';
import { SubscribeCta } from './podcast/SubscribeCta';

export const Podcast: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <PodcastHero />
      <FeaturedEpisode />
      <EpisodeList />
      <SubscribeCta />
    </div>
  );
};