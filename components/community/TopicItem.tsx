import React from 'react';
import { TrendingUp, Users, MessageSquare } from 'lucide-react';

export const TopicItem = ({ topic, isSelected, onSelectTopic }: any) => {

    return (
        <div 
            className={`p-5 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'bg-white dark:bg-earth-800 shadow-lg scale-105' : 'bg-earth-50 dark:bg-earth-900/50 hover:bg-earth-100 dark:hover:bg-earth-800/50'}`}
            onClick={() => onSelectTopic(topic.id)}
        >
            <div className="flex justify-between items-start">
                <div className="w-2/3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">{topic.category}</span>
                    <h3 className={`font-bold text-base mt-1 ${isSelected ? 'text-earth-900 dark:text-white' : 'text-earth-700 dark:text-earth-300'}`}>{topic.title}</h3>
                </div>
                {topic.isTrending && (
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                        <TrendingUp size={12} />
                        <span>Trending</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {[topic.author, ...topic.participants].slice(0,3).map((p, i) => (
                            <img key={i} src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full border-2 border-white dark:border-earth-800" />
                        ))}
                    </div>
                    <span className="text-xs text-earth-500 dark:text-earth-400">by {topic.author.name} & others</span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-earth-500 dark:text-earth-400">
                    <div className="flex items-center gap-1.5">
                        <Users size={14} />
                        <span>{topic.stats.participants}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare size={14} />
                        <span>{topic.stats.replies}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}