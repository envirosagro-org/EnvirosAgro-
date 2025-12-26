
import React, { useState } from 'react';
import { MAP_DATA } from './mapdata';
import { MapPin, X } from 'lucide-react';

// A (very) simplified mercator projection for demonstration purposes
const project = (lat: number, lng: number) => {
    const lngRad = lng * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const x = (lngRad + Math.PI) / (2 * Math.PI);
    const y = (Math.PI - Math.log(Math.tan(Math.PI/4 + latRad/2))) / (2*Math.PI);
    return { x: x * 100, y: y * 100 };
}

export const ImpactMap: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof MAP_DATA[0] | null>(null);

  return (
    <div className="bg-earth-100 dark:bg-earth-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-3xl font-bold font-serif tracking-tight text-earth-900 dark:text-white sm:text-4xl">Our Global Footprint</h2>
          <p className="mt-6 text-lg leading-8 text-earth-600 dark:text-earth-300">
            From the Andes to the Mekong Delta, our projects are making a tangible impact. Explore our initiatives across the globe.
          </p>
        </div>
        <div className="mt-16 relative h-[500px] w-full bg-earth-200 dark:bg-earth-800 rounded-lg shadow-xl overflow-hidden">
          {/* This would be a real map component (e.g., Google Maps, Leaflet) */}
          <img src="/images/impact/world-map.svg" className="w-full h-full object-cover" alt="World Map"/>
          <div className="absolute inset-0">
            {MAP_DATA.map((projectData) => {
              const { x, y } = project(projectData.position.lat, projectData.position.lng);
              return (
                <button
                  key={projectData.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setSelectedProject(projectData)}
                  aria-label={`View ${projectData.name}`}
                >
                  <MapPin className={`w-8 h-8 transition-transform duration-300 ${selectedProject?.id === projectData.id ? 'text-indigo-500 scale-125' : 'text-red-600 hover:text-red-500'}`} />
                  <span className="absolute bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{projectData.name}</span>
                </button>
              );
            })}
          </div>

          {selectedProject && (
            <div className="absolute top-4 right-4 w-80 bg-white dark:bg-earth-950 rounded-lg shadow-2xl p-6 transform transition-transform animate-in slide-in-from-right-16 duration-500">
               <button onClick={() => setSelectedProject(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                    <X size={24} />
               </button>
              <h3 className="text-xl font-serif font-bold text-earth-900 dark:text-white">{selectedProject.name}</h3>
              <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{selectedProject.focus}</p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{selectedProject.region}</p>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-earth-700">
                 <p className="text-sm text-earth-600 dark:text-earth-300">
                    Learn more about this project's impact and story.
                 </p>
                 <a
                    href={`/our-impact/story/${selectedProject.storyId}`}
                    className="mt-4 inline-block bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                    Read the Story
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
