import React, { useState } from 'react';
import { HeritageHeader } from './heritageforum/HeritageHeader';
import { TopicGrid } from './heritageforum/TopicGrid';
import { StoriesFeed } from './heritageforum/StoriesFeed';
import { CultureMap } from './heritageforum/CultureMap';

export const HeritageForum = () => {
    const [activeTab, setActiveTab] = useState('feed');

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <HeritageHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Explore by Topic</h2>
                    <TopicGrid />
                </div>

                <div className="mt-16">
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                        <button onClick={() => setActiveTab('feed')} className={`px-6 py-3 font-semibold ${activeTab === 'feed' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}>Latest Stories</button>
                        <button onClick={() => setActiveTab('map')} className={`px-6 py-3 font-semibold ${activeTab === 'map' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}>Culture Map</button>
                    </div>
                    {activeTab === 'feed' ? <StoriesFeed /> : <CultureMap />}
                </div>
            </div>
        </div>
    );
};