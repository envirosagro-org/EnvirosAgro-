import React, { useState } from 'react';
import { TopicItem } from './TopicItem';
import { TOPICS, SORT_OPTIONS, CATEGORIES } from './communityData';
import { Search, ChevronDown } from 'lucide-react';

export const TopicList = ({ selectedTopicId, onSelectTopic }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('latest');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const filteredAndSortedTopics = TOPICS
        .filter(topic => 
            topic.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter === 'all' || topic.category.toLowerCase().replace(' ', '-') === categoryFilter)
        )
        .sort((a, b) => {
            switch (sortOrder) {
                case 'popular':
                    return b.stats.views - a.stats.views;
                case 'newest':
                    // This would need a proper date object in a real app
                    return new Date(b.lastActivity) > new Date(a.lastActivity) ? -1 : 1;
                case 'trending':
                    return b.isTrending - a.isTrending;
                default: // latest
                    // This is simplified. A real app would use timestamps.
                    return a.id > b.id ? -1: 1;
            }
        });

    return (
        <div className="space-y-4">
            {/* Search and Filter UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" />
                    <input 
                        type="text"
                        placeholder="Search topics..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <select 
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                        className="bg-white dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-full py-3 px-4 text-sm appearance-none focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                        {SORT_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                    </select>
                    <select 
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                        className="bg-white dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-full py-3 px-4 text-sm appearance-none focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                        {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                    </select>
                </div>
            </div>

            {/* Topic List */}
            <div className="space-y-3">
                {filteredAndSortedTopics.map((topic: any) => (
                    <TopicItem 
                        key={topic.id} 
                        topic={topic} 
                        isSelected={topic.id === selectedTopicId} 
                        onSelectTopic={onSelectTopic} 
                    />
                ))}
            </div>
        </div>
    );
};