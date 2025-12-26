import React, { useState, useEffect, useMemo } from 'react';
import { GreenLensHero } from './greenlens/GreenLensHero';
import { GreenLensStats } from './greenlens/GreenLensStats';
import { FilmStrip } from './greenlens/FilmStrip';
import { HeroPlayer } from './greenlens/HeroPlayer';
import { CatalogModal } from './greenlens/CatalogModal';
import { DetailsModal } from './greenlens/DetailsModal';
import { FEATURED_FILM, DOCS_LIBRARY, CATEGORIES } from './greenlens/data';

export const GreenLens: React.FC = () => {
  const [activeFilm, setActiveFilm] = useState(FEATURED_FILM);
  const [isWatching, setIsWatching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsFilm, setDetailsFilm] = useState<typeof FEATURED_FILM | null>(null);

  // Catalog State
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCatalog = useMemo(() => {
    return [FEATURED_FILM, ...DOCS_LIBRARY].filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                            doc.description.toLowerCase().includes(catalogSearch.toLowerCase());
      const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [catalogSearch, activeCategory]);

  useEffect(() => {
    let interval: any;
    if (isWatching && !isPaused) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + 0.05));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isWatching, isPaused]);

  const handleWatchNow = (film?: any) => {
    if (film) setActiveFilm(film);
    setIsWatching(true);
    setProgress(0);
    setIsPaused(false);
    setShowDetailsModal(false);
    setShowFullCatalog(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetails = (film: any) => {
    setDetailsFilm(film);
    setShowDetailsModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">

      {isWatching ? (
        <HeroPlayer
          isWatching={isWatching}
          activeFilm={activeFilm}
          isPaused={isPaused}
          progress={progress}
          setIsWatching={setIsWatching}
          setIsPaused={setIsPaused}
          handleWatchNow={handleWatchNow}
          handleOpenDetails={handleOpenDetails}
        />
      ) : (
        <>
          <GreenLensHero 
            activeFilm={activeFilm} 
            handleWatchNow={handleWatchNow} 
            handleOpenDetails={handleOpenDetails} 
          />

          <GreenLensStats />

          <FilmStrip 
            title="Featured Documentaries" 
            docs={DOCS_LIBRARY} 
            onSelect={handleOpenDetails} 
          />

          <FilmStrip 
            title="Award Winning Series" 
            docs={[...DOCS_LIBRARY].reverse()} 
            onSelect={handleOpenDetails} 
          />

          <div className="flex justify-center mt-12 mb-20">
            <button 
              onClick={() => setShowFullCatalog(true)}
              className="px-12 py-5 bg-earth-900 dark:bg-earth-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-agro-600 transition-all shadow-xl active:scale-95"
            >
              Explore Full Cinema Catalog
            </button>
          </div>
        </>
      )}

      {showFullCatalog && (
        <CatalogModal
          catalogSearch={catalogSearch}
          setCatalogSearch={setCatalogSearch}
          setShowFullCatalog={setShowFullCatalog}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={CATEGORIES}
          filteredCatalog={filteredCatalog}
          handleOpenDetails={handleOpenDetails}
          handleWatchNow={handleWatchNow}
        />
      )}

      {showDetailsModal && detailsFilm && (
        <DetailsModal
          detailsFilm={detailsFilm}
          setShowDetailsModal={setShowDetailsModal}
          handleWatchNow={handleWatchNow}
        />
      )}

    </div>
  );
};
