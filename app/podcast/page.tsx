import { PodcastHero } from '@/components/podcast/PodcastHero';
import { FeaturedEpisode } from '@/components/podcast/FeaturedEpisode';
import { EpisodeList } from '@/components/podcast/EpisodeList';
import { PodcastStats } from '@/components/podcast/PodcastStats';
import { SubscribeCta } from '@/components/podcast/SubscribeCta';

const PodcastPage = () => {
  return (
    <div>
      <PodcastHero />
      <FeaturedEpisode />
      <div className="bg-white dark:bg-earth-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <EpisodeList />
                </div>
                <div>
                    <div className="sticky top-24">
                        <PodcastStats />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <SubscribeCta />
    </div>
  );
};

export default PodcastPage;
