import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, ChevronRight, AlertCircle, Info } from 'lucide-react';

const DUMMY_REPORTS = [
  {
    id: 'REP-001',
    title: 'Sub-Saharan Water Table Recessions',
    region: 'East Africa',
    date: 'Oct 14, 2024',
    severity: 'High',
    tags: ['Water', 'Climate'],
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'REP-002',
    title: 'Coastal Salinity Infiltration Trends',
    region: 'Southeast Asia',
    date: 'Oct 12, 2024',
    severity: 'Medium',
    tags: ['Marine', 'Agriculture'],
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'REP-003',
    title: 'Amazon Basin Reforestation Progress',
    region: 'South America',
    date: 'Oct 10, 2024',
    severity: 'Low',
    tags: ['Biodiversity', 'Forestry'],
    image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'REP-004',
    title: 'Arctic Permafrost Thaw Monitoring',
    region: 'Arctic Circle',
    date: 'Oct 08, 2024',
    severity: 'Critical',
    tags: ['Climate', 'Geology'],
    image: 'https://images.unsplash.com/photo-1589113103553-5672b7a91517?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'REP-005',
    title: 'Great Barrier Reef Bleaching Event',
    region: 'Australia',
    date: 'Oct 05, 2024',
    severity: 'High',
    tags: ['Marine', 'Biodiversity'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'REP-006',
    title: 'European Heatwave Impact Analysis',
    region: 'Europe',
    date: 'Oct 03, 2024',
    severity: 'Medium',
    tags: ['Weather', 'Health'],
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop&q=60'
  }
];

export const ReportGrid: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" size={18} />
          <input 
            type="text" 
            placeholder="Search intelligence reports..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-earth-900 border border-earth-100 dark:border-earth-800 rounded-2xl focus:ring-2 focus:ring-agro-500 transition-all text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat 
                  ? 'bg-agro-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-earth-900 text-earth-500 border border-earth-100 dark:border-earth-800 hover:bg-earth-50 dark:hover:bg-earth-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_REPORTS.filter(r => filter === 'All' || r.severity === filter).map((report) => (
          <div key={report.id} className="group bg-white dark:bg-earth-900 rounded-[2.5rem] overflow-hidden border border-earth-100 dark:border-earth-800 hover:border-agro-500/30 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <img src={report.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={report.title} />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-earth-950/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  report.severity === 'Critical' ? 'bg-red-500' : 
                  report.severity === 'High' ? 'bg-orange-500' : 
                  report.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-earth-900 dark:text-white">{report.severity}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                 <button className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                    Open Report <ChevronRight size={14} />
                 </button>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-3 text-earth-400 mb-4">
                <div className="flex items-center gap-1.5 bg-earth-50 dark:bg-earth-800 px-3 py-1 rounded-lg">
                  <MapPin size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{report.region}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-earth-50 dark:bg-earth-800 px-3 py-1 rounded-lg">
                  <Calendar size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{report.date}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-3 group-hover:text-agro-600 transition-colors">{report.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-earth-50 dark:border-earth-800">
                {report.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-agro-50 dark:bg-agro-900/20 text-agro-600 dark:text-agro-400 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
