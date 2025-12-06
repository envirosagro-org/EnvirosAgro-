
import React, { useState } from 'react';
import { 
  User, Users, MapPin, Briefcase, GraduationCap, ChevronRight, 
  Search, Plus, Upload, CheckCircle, X, Filter, FileText, Send,
  TrendingUp, Award, BookOpen, Zap
} from 'lucide-react';

// Mock Data
const WORKERS_CLOUD: any[] = [];

const JOBS_LIST: any[] = [];

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
  },
  {
    id: 2,
    title: "AgTech Leadership Bootcamp",
    provider: "TechHarvest Institute",
    duration: "4 Weeks",
    level: "Intermediate",
    icon: <Zap size={32} className="text-blue-600" />,
    color: "bg-blue-50 border-blue-100",
    desc: "Intensive training for managing modern, data-driven agricultural operations."
  },
  {
    id: 3,
    title: "Regenerative Mentorship Program",
    provider: "Global Farmers Network",
    duration: "Ongoing",
    level: "All Levels",
    icon: <Users size={32} className="text-green-600" />,
    color: "bg-green-50 border-green-100",
    desc: "One-on-one guidance from experienced sustainable farming pioneers."
  },
  {
    id: 4,
    title: "Cooperative Management Certification",
    provider: "Social Ag Alliance",
    duration: "3 Months",
    level: "Beginner",
    icon: <BookOpen size={32} className="text-rose-600" />,
    color: "bg-rose-50 border-rose-100",
    desc: "Learn legal, financial, and social governance for agricultural societies."
  }
];

type Tab = 'CLOUD' | 'JOBS' | 'REGISTER' | 'CAREER';

export const HumanResource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('CLOUD');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null); // For Application Modal
  const [isApplying, setIsApplying] = useState(false); // Application submission state

  // Filter Logic
  const filteredWorkers = WORKERS_CLOUD.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredJobs = JOBS_LIST.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.org.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setSelectedJob(null);
      alert("Application Submitted Successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-serif font-bold text-agro-900 mb-3">Agro Human Resources</h2>
        <p className="text-earth-600 max-w-2xl mx-auto">
          The central hub for connecting agricultural talent with opportunities. 
          Browse the global worker cloud, find your next role, or register your expertise.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-10 overflow-x-auto">
        <div className="bg-white p-1.5 rounded-full border border-earth-200 shadow-sm inline-flex whitespace-nowrap">
          <button 
            onClick={() => setActiveTab('CLOUD')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'CLOUD' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 hover:bg-earth-50'}`}
          >
            <Users size={18} /> Agro-Workers Cloud
          </button>
          <button 
            onClick={() => setActiveTab('JOBS')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'JOBS' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 hover:bg-earth-50'}`}
          >
            <Briefcase size={18} /> Available Jobs
          </button>
          <button 
            onClick={() => setActiveTab('CAREER')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'CAREER' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 hover:bg-earth-50'}`}
          >
            <TrendingUp size={18} /> Career Advancement
          </button>
          <button 
            onClick={() => setActiveTab('REGISTER')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'REGISTER' ? 'bg-agro-600 text-white shadow-md' : 'text-earth-600 hover:bg-earth-50'}`}
          >
            <Plus size={18} /> Register as Worker
          </button>
        </div>
      </div>

      {/* Search Bar (Shared for Cloud and Jobs) */}
      {(activeTab === 'CLOUD' || activeTab === 'JOBS') && (
        <div className="max-w-2xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-3.5 text-earth-400" size={20} />
          <input 
            type="text" 
            placeholder={activeTab === 'CLOUD' ? "Search workers by name, role, or skill..." : "Search jobs by title or company..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-earth-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 shadow-sm"
          />
        </div>
      )}

      {/* VIEW 1: AGRO-WORKERS CLOUD */}
      {activeTab === 'CLOUD' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-xl text-earth-900">Registered Professionals ({filteredWorkers.length})</h3>
             <button className="text-agro-600 text-sm font-bold flex items-center gap-1 hover:underline">
               <Filter size={16} /> Advanced Filter
             </button>
          </div>
          
          {filteredWorkers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <div key={worker.id} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-full object-cover border-2 border-agro-100" />
                      <div>
                        <h4 className="font-bold text-lg text-agro-900 leading-tight">{worker.name}</h4>
                        <p className="text-earth-500 text-sm">{worker.role}</p>
                      </div>
                    </div>
                    {worker.available && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        Available
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-earth-500 mb-4">
                    <MapPin size={14} /> {worker.location}
                    <span className="text-earth-300">|</span>
                    <GraduationCap size={14} /> {worker.type}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {worker.skills.map((skill: string) => (
                      <span key={skill} className="text-xs bg-earth-50 text-earth-600 px-2 py-1 rounded-lg border border-earth-100">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button className="w-full border border-agro-200 text-agro-700 font-bold py-2 rounded-xl hover:bg-agro-50 transition-colors">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-earth-50 rounded-2xl border border-earth-100">
               <Users size={48} className="mx-auto text-earth-300 mb-4" />
               <h3 className="text-lg font-bold text-earth-600">No Professionals Found</h3>
               <p className="text-earth-500 text-sm mb-6">The database is currently updating. Be the first to register!</p>
               <button 
                 onClick={() => setActiveTab('REGISTER')}
                 className="bg-agro-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-agro-700 transition-colors"
               >
                 Register Now
               </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: AVAILABLE JOB LISTS */}
      {activeTab === 'JOBS' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           {filteredJobs.length > 0 ? (
             <div className="grid lg:grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 transition-all flex flex-col md:flex-row justify-between gap-6">
                     <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="font-bold text-xl text-earth-900">{job.title}</h4>
                          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded border border-blue-100">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-earth-500 mb-4">
                           <span className="font-semibold text-agro-700 flex items-center gap-1"><Briefcase size={14} /> {job.org}</span>
                           <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                           <span className="flex items-center gap-1 text-green-600 font-bold">{job.salary}</span>
                        </div>
                        <p className="text-earth-600 mb-2">{job.description}</p>
                        <p className="text-xs text-earth-400">Posted {job.posted}</p>
                     </div>
                     
                     <div className="flex flex-col justify-center min-w-[150px]">
                        <button 
                          onClick={() => setSelectedJob(job)}
                          className="bg-agro-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-agro-700 transition-colors shadow-lg shadow-agro-100"
                        >
                          Apply Now
                        </button>
                     </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="text-center py-16 bg-earth-50 rounded-2xl border border-earth-100">
               <Briefcase size={48} className="mx-auto text-earth-300 mb-4" />
               <h3 className="text-lg font-bold text-earth-600">No Jobs Available</h3>
               <p className="text-earth-500 text-sm">There are currently no open positions listed. Please check back later.</p>
             </div>
           )}
        </div>
      )}

      {/* VIEW 3: CAREER ADVANCEMENT */}
      {activeTab === 'CAREER' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="bg-agro-900 rounded-3xl p-8 mb-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                 <h3 className="text-2xl font-serif font-bold mb-2">Accelerate Your Agricultural Career</h3>
                 <p className="text-agro-100 max-w-xl">
                    Gain new skills, earn recognized certifications, and connect with industry mentors to lead the future of sustainable farming.
                 </p>
              </div>
              <button className="bg-white text-agro-900 font-bold px-6 py-3 rounded-full hover:bg-agro-100 transition-colors">
                 Explore All Courses
              </button>
           </div>

           <h3 className="text-xl font-bold text-earth-900 mb-6">Pathways to Success</h3>
           <div className="grid md:grid-cols-2 gap-6 mb-12">
              {CAREER_PATHWAYS.map((path) => (
                 <div key={path.id} className={`p-6 rounded-2xl border ${path.color} bg-white hover:shadow-lg transition-all flex gap-4`}>
                    <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                       {path.icon}
                    </div>
                    <div>
                       <h4 className="font-bold text-lg text-earth-900 mb-1">{path.title}</h4>
                       <p className="text-xs font-bold text-agro-600 uppercase tracking-wide mb-2">
                          {path.provider} • {path.level}
                       </p>
                       <p className="text-earth-600 text-sm mb-4">
                          {path.desc}
                       </p>
                       <div className="flex items-center justify-between">
                          <span className="text-xs bg-earth-100 text-earth-600 px-2 py-1 rounded font-medium">
                             Duration: {path.duration}
                          </span>
                          <button className="text-agro-700 font-bold text-sm hover:underline">
                             View Details
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           <div className="bg-white rounded-3xl p-8 border border-earth-200 shadow-sm text-center">
              <h3 className="text-xl font-bold text-earth-900 mb-2">Need Career Guidance?</h3>
              <p className="text-earth-600 mb-6 max-w-lg mx-auto">
                 Our HR specialists can review your profile and suggest the best path for your professional growth within the EnvirosAgro ecosystem.
              </p>
              <button className="border-2 border-earth-200 text-earth-700 font-bold px-8 py-3 rounded-full hover:border-agro-600 hover:text-agro-600 transition-all">
                 Request Career Counseling
              </button>
           </div>
        </div>
      )}

      {/* VIEW 4: AGRO-WORKER REGISTRATION INTERFACE */}
      {activeTab === 'REGISTER' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
           <div className="bg-white p-8 rounded-3xl shadow-lg border border-earth-100">
              <h3 className="text-2xl font-bold text-earth-900 mb-2">Join the Agro-Workers Cloud</h3>
              <p className="text-earth-600 mb-8">Create your professional profile to be discovered by employers and partners worldwide.</p>
              
              <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-earth-700">Full Name</label>
                       <input type="text" className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-earth-700">Role / Specialty</label>
                       <input type="text" className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500" placeholder="e.g. Soil Scientist" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-700">Location</label>
                    <input type="text" className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500" placeholder="City, Country" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-700">Skills (comma separated)</label>
                    <input type="text" className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500" placeholder="Irrigation, Drone Piloting, Organic Farming..." />
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-700">Professional Bio</label>
                    <textarea rows={4} className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500" placeholder="Tell us about your experience..."></textarea>
                 </div>

                 <div className="p-4 border-2 border-dashed border-earth-200 rounded-xl text-center hover:bg-earth-50 transition-colors cursor-pointer">
                    <Upload className="mx-auto text-earth-400 mb-2" />
                    <span className="text-sm text-earth-500 font-medium">Upload Resume / CV (PDF)</span>
                 </div>

                 <button type="button" className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
                    Register Profile
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* MODAL: JOB APPLICATION INTERFACE */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-agro-50 p-6 border-b border-agro-100 flex justify-between items-start">
                 <div>
                    <h3 className="font-bold text-xl text-agro-900">Apply for Position</h3>
                    <p className="text-agro-700 text-sm mt-1">{selectedJob.title} at {selectedJob.org}</p>
                 </div>
                 <button onClick={() => setSelectedJob(null)} className="text-agro-400 hover:text-agro-700 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="p-8">
                 <form onSubmit={handleApplySubmit} className="space-y-5">
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-earth-700">Full Name</label>
                       <input required type="text" className="w-full border border-earth-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-earth-700">Email Address</label>
                       <input required type="email" className="w-full border border-earth-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-earth-700">Cover Letter</label>
                       <textarea required rows={4} className="w-full border border-earth-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-agro-500" placeholder="Why are you a good fit?"></textarea>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-earth-50 rounded-xl border border-earth-200">
                       <FileText className="text-agro-500" />
                       <div className="flex-1">
                          <p className="text-sm font-bold text-earth-700">Upload Resume</p>
                          <p className="text-xs text-earth-500">PDF, DOCX up to 5MB</p>
                       </div>
                       <button type="button" className="text-xs font-bold text-agro-600 hover:underline">Choose File</button>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isApplying}
                        className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {isApplying ? 'Submitting...' : <><Send size={18} /> Submit Application</>}
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
