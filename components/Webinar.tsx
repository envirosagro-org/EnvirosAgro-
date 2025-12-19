import React, { useState } from 'react';
import { PlayCircle, Calendar, Clock, Users, Video, AlertCircle, CheckCircle2, MonitorPlay, ArrowRight } from 'lucide-react';

const UPCOMING_WEBINARS = [
  {
    id: 1,
    title: "Precision Drones: Calibration & Flight Paths",
    instructor: "Eng. Sarah Kimani",
    date: "May 15, 2024",
    time: "14:00 GMT+3",
    attendees: 342,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=60",
    tags: ["Drones", "IoT"]
  },
  {
    id: 2,
    title: "Soil Sensor Network Setup",
    instructor: "Tech Team Lead",
    date: "May 18, 2024",
    time: "10:00 GMT+3",
    attendees: 128,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60",
    tags: ["Sensors", "Soil Health"]
  },
  {
    id: 3,
    title: "AI Disease Detection App Training",
    instructor: "Dr. A. Patel",
    date: "May 22, 2024",
    time: "15:30 GMT+3",
    attendees: 560,
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60",
    tags: ["AI", "Mobile App"]
  }
];

const ARCHIVED_VIDEOS = [
  {
    id: 101,
    title: "Introduction to Smart Irrigation",
    duration: "45:10",
    views: "1.2k",
    date: "Apr 10, 2024",
    thumbnail: "https://images.unsplash.com/photo-1563514227146-89309e704d3b?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 102,
    title: "Solar Pump Maintenance 101",
    duration: "32:05",
    views: "890",
    date: "Mar 28, 2024",
    thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 103,
    title: "Data Logging for Certification",
    duration: "55:00",
    views: "2.1k",
    date: "Mar 15, 2024",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
  }
];

export const Webinar: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<number[]>([]);

  const handleRegister = (id: number) => {
    if (isRegistered.includes(id)) return;
    setIsRegistered([...isRegistered, id]);
    alert("Successfully registered! Check your email for the join link.");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <MonitorPlay size={16} /> Technical Agriculture
        </div>
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">TechAg Webinars</h2>
        <p className="text-xl text-earth-600 max-w-2xl mx-auto">
          Master the tools of modern farming. From drone piloting to AI diagnostics, learn directly from industry engineers and agronomists.
        </p>
      </div>

      {/* Featured Live Stream Area */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl mb-16 border border-slate-800">
         <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-2 relative aspect-video bg-black flex items-center justify-center group cursor-pointer">
               <img 
                 src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&auto=format&fit=crop&q=80" 
                 className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
               />
               <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-white/50 group-hover:scale-110 transition-transform">
                     <PlayCircle size={48} className="text-white fill-white" />
                  </div>
                  <p className="text-white font-bold uppercase tracking-widest text-sm">Watch Latest Replay</p>
               </div>
               <div className="absolute top-6 left-6 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span> LIVE NOW
               </div>
            </div>
            
            <div className="p-8 lg:p-10 flex flex-col justify-between bg-slate-900 text-white">
               <div>
                  <h3 className="text-2xl font-bold mb-2">Automated Hydroponics Systems</h3>
                  <p className="text-slate-400 text-sm mb-6">
                     Learn how to set up and calibrate pH sensors for optimal nutrient delivery in vertical farms.
                  </p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-sm text-slate-300">
                        <Users size={18} className="text-blue-400" /> 1,204 watching
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-300">
                        <Clock size={18} className="text-blue-400" /> Started 15m ago
                     </div>
                  </div>
               </div>
               
               <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors mt-8 flex items-center justify-center gap-2">
                  Join Session <ArrowRight size={18} />
               </button>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         
         {/* Upcoming Schedule */}
         <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-2">
               <Calendar className="text-agro-600" /> Upcoming Schedule
            </h3>
            <div className="space-y-6">
               {UPCOMING_WEBINARS.map((webinar) => (
                  <div key={webinar.id} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
                     <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                        <img src={webinar.image} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                           {webinar.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                 {tag}
                              </span>
                           ))}
                        </div>
                        <h4 className="text-xl font-bold text-earth-900 mb-2">{webinar.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-earth-500 mb-4">
                           <span className="flex items-center gap-1 font-medium text-agro-700"><Users size={14} /> {webinar.instructor}</span>
                           <span className="flex items-center gap-1"><Calendar size={14} /> {webinar.date}</span>
                           <span className="flex items-center gap-1"><Clock size={14} /> {webinar.time}</span>
                        </div>
                        
                        {isRegistered.includes(webinar.id) ? (
                           <button disabled className="bg-green-100 text-green-700 font-bold px-6 py-2 rounded-lg text-sm flex items-center gap-2 cursor-default">
                              <CheckCircle2 size={16} /> Registered
                           </button>
                        ) : (
                           <button 
                              onClick={() => handleRegister(webinar.id)}
                              className="bg-earth-900 text-white font-bold px-6 py-2 rounded-lg text-sm hover:bg-agro-600 transition-colors"
                           >
                              Register for Free
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Archive Sidebar */}
         <div>
            <h3 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-2">
               <Video className="text-earth-400" /> Archive
            </h3>
            <div className="bg-earth-50 p-6 rounded-3xl border border-earth-100">
               <div className="space-y-6">
                  {ARCHIVED_VIDEOS.map((video) => (
                     <div key={video.id} className="group cursor-pointer">
                        <div className="relative rounded-xl overflow-hidden mb-3 aspect-video">
                           <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <PlayCircle size={32} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                           </div>
                           <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {video.duration}
                           </span>
                        </div>
                        <h5 className="font-bold text-earth-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{video.title}</h5>
                        <p className="text-xs text-earth-500">{video.views} views • {video.date}</p>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-8 border border-earth-200 bg-white text-earth-600 font-bold py-3 rounded-xl hover:bg-earth-100 transition-colors text-sm">
                  View Full Library
               </button>
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-100 p-6 rounded-2xl">
               <div className="flex items-start gap-3">
                  <AlertCircle className="text-amber-600 shrink-0 mt-1" size={20} />
                  <div>
                     <h4 className="font-bold text-amber-900 text-sm mb-1">Certification Credits</h4>
                     <p className="text-xs text-amber-800 leading-relaxed">
                        Attending live webinars earns you Continuing Education Units (CEUs) towards your EnvirosAgro Tech Certification.
                     </p>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};