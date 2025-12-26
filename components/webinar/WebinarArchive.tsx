import React from 'react';
import { ARCHIVED_WEBINARS } from './data.tsx';
import { PlayCircle, Star, Eye } from 'lucide-react';

export const WebinarArchive = () => {
    return (
        <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">From the Archive</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ARCHIVED_WEBINARS.map(webinar => (
                    <div key={webinar.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="text-green-600 mb-4">{React.cloneElement(webinar.icon, { size: 32 })}</div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white h-16">{webinar.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Originally aired: {webinar.date}</p>
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center space-x-1">
                                <Star size={16} className="text-yellow-500" />
                                <span>{webinar.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye size={16} />
                                <span>{webinar.views.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                          <p className="text-green-600 font-semibold">Watch Now</p>
                          <PlayCircle size={24} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};