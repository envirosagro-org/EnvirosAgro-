import React from 'react';
import { WebinarHeader } from './webinar/WebinarHeader';
import { UpcomingWebinars } from './webinar/UpcomingWebinars';
import { WebinarArchive } from './webinar/WebinarArchive';

export const Webinar = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <WebinarHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <UpcomingWebinars />
                <WebinarArchive />
            </div>
        </div>
    );
};