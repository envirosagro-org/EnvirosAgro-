import React from 'react';
import { STORIES } from './data';
import { Mic, Video, Type } from 'lucide-react';

const StoryCard = ({ story }: any) => {

    const getIcon = () => {
        switch (story.type) {
            case 'audio': return <Mic className="h-5 w-5 text-gray-500" />;
            case 'video': return <Video className="h-5 w-5 text-gray-500" />;
            case 'text': return <Type className="h-5 w-5 text-gray-500" />;
            default: return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row gap-6 p-5">
            <div className="sm:w-1/3 h-48 sm:h-auto bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${story.image})` }} />
            <div className="sm:w-2/3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-green-600 uppercase">{story.community}</span>
                    <span className="text-xs text-gray-400">{story.timestamp}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{story.summary}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <p className="font-medium">By {story.author}</p>
                    <div className="flex items-center gap-2">
                        {getIcon()}
                        <span className="capitalize">{story.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StoriesFeed = () => {
  return (
    <div className="space-y-8">
      {STORIES.map(story => <StoryCard key={story.id} story={story} />)}
    </div>
  );
};