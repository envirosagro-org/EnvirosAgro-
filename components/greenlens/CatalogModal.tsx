import React from 'react';
import { X, Search, PlayCircle, Info } from 'lucide-react';

export const CatalogModal = ({
  catalogSearch,
  setCatalogSearch,
  setShowFullCatalog,
  activeCategory,
  setActiveCategory,
  categories,
  filteredCatalog,
  handleOpenDetails,
  handleWatchNow,
}: any) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white">Cinema Catalog</h2>
            <p className="text-gray-400 mt-1">Explore our full library of impact documentaries.</p>
          </div>
          <button onClick={() => setShowFullCatalog(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-grow">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === cat 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {filteredCatalog.map((doc: any) => (
            <div key={doc.id} className="group relative rounded-xl overflow-hidden bg-white/5 shadow-lg">
              <img src={doc.image} alt={doc.title} className="w-full h-64 object-cover group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-lg font-bold text-white">{doc.title}</h3>
                <p className="text-xs text-gray-400">{doc.category} &middot; {doc.year}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleWatchNow(doc)} className="bg-green-500 rounded-full p-4 text-white hover:scale-110 transition-transform">
                  <PlayCircle size={32} />
                </button>
                <button onClick={() => handleOpenDetails(doc)} className="bg-white/20 rounded-full p-3 text-white hover:scale-110 transition-transform">
                  <Info size={24} />
                </button>
              </div>
            </div>
          ))}
          {filteredCatalog.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p>No films match your criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};