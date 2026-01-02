import React, { useState } from 'react';
import { TopicList } from './TopicList';
import { ThreadView } from './ThreadView'; 
import { TOPICS } from './communityData';

export const ForumFeed: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(TOPICS[0].id);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const selectedTopic = TOPICS.find(t => t.id === selectedTopicId);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-earth-900 dark:text-white mb-4">Topics</h2>
                <TopicList 
                    selectedTopicId={selectedTopicId}
                    onSelectTopic={handleSelectTopic}
                />
            </div>
            <div className="lg:col-span-2">
                 <h2 className="text-2xl font-bold text-earth-900 dark:text-white mb-4">Discussion</h2>
                {selectedTopic ? (
                    <ThreadView topic={selectedTopic} />
                ) : (
                    <div className="h-full flex items-center justify-center bg-earth-50 dark:bg-earth-900/50 rounded-lg">
                        <p className="text-earth-500">Select a topic to view the discussion.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};