import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Users } from 'lucide-react';

const events = [
  {
    title: 'Sustainable Farming Workshop',
    date: 'AUG 15',
    time: '10:00 AM - 1:00 PM',
    location: 'Online Webinar',
  },
  {
    title: 'Community Garden Harvest Day',
    date: 'AUG 22',
    time: '9:00 AM onwards',
    location: 'Greenfield Community Garden',
  },
  {
    title: 'Agri-Tech Expo 2024',
    date: 'SEP 05',
    time: 'All Day Event',
    location: 'National Convention Center',
  },
];

export const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-white dark:bg-earth-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="font-bold text-xl text-earth-900 dark:text-white flex items-center gap-2">
          <Users size={24} className="text-agro-500" />
          Upcoming Events
        </h3>
        <p className="text-sm text-earth-600 dark:text-earth-400">Connect with the community and grow your knowledge.</p>
      </div>

      <div className="space-y-2 px-2">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-earth-50 dark:hover:bg-earth-700/50 transition-colors">
            <div className="bg-agro-100 dark:bg-agro-900/50 text-agro-600 dark:text-agro-300 font-bold rounded-lg p-3 text-center w-16 flex-shrink-0">
              <p className="text-xs">{event.date.split(' ')[0]}</p>
              <p className="text-2xl">{event.date.split(' ')[1]}</p>
            </div>
            <div>
              <h4 className="font-semibold text-earth-800 dark:text-white leading-tight">{event.title}</h4>
              <div className="flex items-center gap-4 text-xs text-earth-500 dark:text-earth-400 mt-1">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-earth-50 dark:bg-earth-800/50 mt-2">
        <button className="w-full text-center text-sm font-bold text-agro-600 dark:text-agro-400 hover:text-agro-700 dark:hover:text-agro-300 flex items-center justify-center gap-1">
          View all events <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
