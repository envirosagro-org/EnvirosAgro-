
import { IMPACT_STORIES } from '@/components/ourimpact/data';
import { notFound } from 'next/navigation';
import { Leaf, Mountain, Users } from 'lucide-react';
import Link from 'next/link';

interface StoryPageProps {
  params: {
    storyId: string;
  }
}

export default function StoryPage({ params }: StoryPageProps) {
  const storyId = parseInt(params.storyId, 10);
  const story = IMPACT_STORIES.find(s => s.id === storyId);

  if (!story) {
    notFound();
  }

  const relatedStories = IMPACT_STORIES.filter(s => s.id !== storyId).slice(0, 2);

  return (
    <div className="bg-white dark:bg-earth-950">
      <div className="relative h-96 w-full lg:h-[500px]">
        <img src={story.imageUrl} alt={story.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {story.category}
            </span>
            <h1 className="mt-4 text-4xl lg:text-6xl font-bold font-serif text-white leading-tight shadow-text">
              {story.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 prose prose-lg dark:prose-invert max-w-none">
             <p className="lead text-xl text-earth-600 dark:text-earth-300">{story.summary}</p>
             <p>{story.fullStory}</p>
          </div>

          <aside className="lg:col-span-1 space-y-8">
            <div className="p-6 bg-earth-50 dark:bg-earth-900 rounded-lg">
              <h3 className="text-lg font-semibold font-serif text-earth-900 dark:text-white">Key Metrics</h3>
                <dl className="mt-4 space-y-4">
                    {story.keyMetrics.map((metric) => (
                       <div key={metric.label} className="flex items-start">
                         <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-800/20 dark:text-indigo-400">
                           {metric.label.includes('Hectares') ? <Mountain size={18} /> : metric.label.includes('Carbon') ? <Leaf size={18} /> : <Users size={18} /> }
                         </div>
                         <div className="ml-4">
                            <dt className="text-sm text-earth-600 dark:text-earth-400">{metric.label}</dt>
                            <dd className="text-xl font-bold text-earth-900 dark:text-white">{metric.value}</dd>
                         </div>
                       </div>
                    ))}
                </dl>
            </div>

            <div className="p-6 bg-earth-50 dark:bg-earth-900 rounded-lg">
                <h3 className="text-lg font-semibold font-serif text-earth-900 dark:text-white">Related Stories</h3>
                <div className="mt-4 space-y-4">
                  {relatedStories.map(related => (
                    <Link href={`/our-impact/story/${related.id}`} key={related.id} className="block group">
                      <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">{related.title}</h4>
                      <p className="text-sm text-earth-600 dark:text-earth-400 mt-1">{related.summary.substring(0, 80)}...</p>
                    </Link>
                  ))}
                </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
