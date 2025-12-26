import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react';
import { UPCOMING_WEBINARS } from './data.tsx';

const Countdown = ({ date }:any) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(date) - +new Date();
        let timeLeft:any = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="flex items-center space-x-4">
            {timeLeft.days > 0 && <span className="font-bold">{timeLeft.days}d </span>}
            {timeLeft.hours > 0 && <span className="font-bold">{timeLeft.hours}h </span>}
            {timeLeft.minutes > 0 && <span className="font-bold">{timeLeft.minutes}m</span>}
        </div>
    );
};

export const UpcomingWebinars = () => {
    return (
        <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Live Events</h2>
            <div className="space-y-12">
                {UPCOMING_WEBINARS.map(webinar => (
                    <div key={webinar.id} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="lg:col-span-2 h-64 lg:h-full bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${webinar.image})` }} />
                        <div className="lg:col-span-3">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <div className="flex items-center space-x-2"><Calendar size={16} /><p>{new Date(webinar.date).toLocaleDateString()}</p></div>
                                <div className="flex items-center space-x-2"><Clock size={16} /><p>{new Date(webinar.date).toLocaleTimeString()}</p></div>
                                <div className="flex items-center space-x-2 text-green-600 font-semibold"><Clock size={16} /><Countdown date={webinar.date} /></div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{webinar.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{webinar.description}</p>
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center"><Users size={18} className="mr-2" /> Panelists</h4>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    {webinar.panelists.map(p => <div key={p.name} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"><strong>{p.name}</strong>, <em className="text-gray-600 dark:text-gray-400">{p.title}</em></div>)}
                                </div>
                            </div>
                            <button className="mt-6 w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition flex items-center justify-center">
                                Register Now <ChevronRight size={20} className="ml-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};