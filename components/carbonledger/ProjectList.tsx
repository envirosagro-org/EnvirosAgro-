import React from 'react';
import { Globe, Zap } from 'lucide-react';

interface ProjectListProps {
  projects: any[];
  setSelectedProjectId: (id: number) => void;
  setShowMintModal: (show: boolean) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, setSelectedProjectId, setShowMintModal }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-6">Active Sequestration Projects</h3>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-earth-900 p-6 rounded-2xl border border-earth-100 dark:border-earth-800 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl text-green-600">
                <Globe size={24} />
              </div>
              <div>
                <h4 className="font-bold text-earth-900 dark:text-white">{project.name}</h4>
                <p className="text-xs text-earth-500">{project.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-12 w-full md:w-auto">
              <div className="text-center">
                <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Impact</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${project.impact === 'High' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{project.impact}</span>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Available</p>
                <span className="font-bold text-earth-900 dark:text-white">{project.availableTons} <span className="text-agro-600">Tons</span></span>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-earth-400 uppercase mb-1">Status</p>
                <span className="text-xs font-bold text-earth-600 dark:text-earth-400">{project.status}</span>
              </div>
              <button onClick={() => { setSelectedProjectId(project.id); setShowMintModal(true); }} className="p-2 bg-agro-50 dark:bg-agro-900/30 text-agro-600 rounded-lg hover:bg-agro-600 hover:text-white transition-all">
                <Zap size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
