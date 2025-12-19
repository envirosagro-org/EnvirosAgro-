import React, { useState } from 'react';
import { 
  Users, MapPin, Briefcase, GraduationCap, 
  Search, Plus, Upload, TrendingUp, Award, BookOpen, Zap, Filter
} from 'lucide-react';
import { View } from '../types';

const WORKERS_CLOUD = [
  {
    id: 1,
    name: "Dr. Elena Rossi",
    role: "Senior Agronomist",
    type: "Researcher",
    location: "Nairobi, Kenya",
    available: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
    skills: ["Soil Chemistry", "Crop Genetics", "IPM"]
  },
  {
    id: 2,
    name: "Samuel Kweli",
    role: "Precision Ag Operator",
    type: "Technical Specialist",
    location: "Kampala, Uganda",
    available: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    skills: ["Drone Piloting", "IoT Systems", "GIS Mapping"]
  }
];

const JOBS_LIST = [
  {
    id: 1,
    title: "Regional Sustainability Lead",
    org: "GreenEarth Co-op",
    location: "Kiriaini, Kenya",
    type: "Full-Time",
    salary: "$2,500 - $3,500",
    posted: "2 days ago",
    description: "Seeking a visionary leader to oversee the implementation of the EA thrust across 500 smallholder farms."
  }
];

const CAREER_PATHWAYS = [
  {
    id: 1,
    title: "Certified Sustainable Agronomist (CSA)",
    provider: "EnvirosAgro Academy",
    duration: "6 Months",
    level: "Advanced",
    icon: <Award size={32} className="text-amber-600" />,
    color: "bg-amber-50 border-amber-100",
    desc: "Master the principles of the Five Thrusts and soil regeneration techniques."
  }
];

interface HumanResourceProps {
    onNavigate?: (view: View) => void;
}

export const HumanResource: React.FC<HumanResourceProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'CLOUD' | 'JOBS' | 'REGISTER' | 'CAREER'>('CLOUD');
  const [searchTerm, setSearchTerm] = useState('');

  const handleApply = (title: string) => {
    alert(`Starting application for: ${title}. Redirecting to enrollment...`);
    if(onNavigate) onNavigate(View.SIGN_UP);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-serif font-bold text-agro-900 dark:text-white mb-3">Agro Human Resources</h2>
        <p className="text-earth-600 dark:text-earth-400 max-w-2xl mx-auto">Connecting agricultural talent with global opportunities.</p>
      </div>

      <div className="flex justify-center mb-10 overflow-x-auto no-scrollbar">
        <div className="bg-white dark:bg-earth-900 p-1.5 rounded-full border border-earth-200 dark:border-earth-800 shadow-sm inline-flex whitespace-nowrap">
          <button onClick={() => setActiveTab('CLOUD')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'CLOUD' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 dark:text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}><Users size={18} /> Cloud</button>
          <button onClick={() => setActiveTab('JOBS')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'JOBS' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 dark:text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}><Briefcase size={18} /> Jobs</button>
          <button onClick={() => setActiveTab('CAREER')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'CAREER' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 dark:text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}><TrendingUp size={18} /> Career</button>
          <button onClick={() => setActiveTab('REGISTER')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'REGISTER' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 dark:text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}><Plus size={18} /> Register</button>
        </div>
      </div>

      {activeTab === 'CLOUD' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKERS_CLOUD.map((worker) => (
            <div key={worker.id} className="bg-white dark:bg-earth-900 p-6 rounded-2xl border border-earth-100 dark:border-earth-800 hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-full object-cover border-2 border-agro-100" />
                <div><h4 className="font-bold text-lg text-earth-900 dark:text-white">{worker.name}</h4><p className="text-earth-500 text-sm">{worker.role}</p></div>
              </div>
              <button onClick={() => onNavigate && onNavigate(View.PROFILE)} className="w-full border border-agro-200 text-agro-700 dark:text-agro-400 font-bold py-2 rounded-xl hover:bg-agro-50 transition-colors">View Profile</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'JOBS' && (
        <div className="grid gap-6">
          {JOBS_LIST.map((job) => (
            <div key={job.id} className="bg-white dark:bg-earth-900 p-6 rounded-2xl border border-earth-100 flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1"><h4 className="font-bold text-xl text-earth-900 dark:text-white mb-2">{job.title}</h4><p className="text-earth-600 text-sm">{job.description}</p></div>
                <button onClick={() => handleApply(job.title)} className="bg-agro-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-agro-700 transition-all shadow-lg">Apply Now</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'CAREER' && (
        <div className="grid md:grid-cols-2 gap-6">
          {CAREER_PATHWAYS.map((path) => (
            <div key={path.id} className={`p-6 rounded-2xl border ${path.color} bg-white dark:bg-earth-900 flex gap-4`}>
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">{path.icon}</div>
                <div>
                  <h4 className="font-bold text-lg text-earth-900 dark:text-white">{path.title}</h4>
                  <button onClick={() => onNavigate && onNavigate(View.KNOWLEDGE)} className="text-agro-700 font-bold text-sm hover:underline mt-4 block">View Course Details</button>
                </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'REGISTER' && (
        <div className="max-w-2xl mx-auto">
           <form className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-lg border border-earth-100 space-y-6">
              <input type="text" className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3" placeholder="Full Name" />
              <button type="button" onClick={() => onNavigate && onNavigate(View.SIGN_UP)} className="w-full bg-agro-600 text-white font-bold py-4 rounded-xl shadow-lg">Initialize Professional Profile</button>
           </form>
        </div>
      )}
    </div>
  );
};