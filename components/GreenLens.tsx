import React, { useState, useEffect, useMemo } from 'react';
import { GreenLensHero } from './greenlens/GreenLensHero';
import { GreenLensStats } from './greenlens/GreenLensStats';
import { FilmStrip } from './greenlens/FilmStrip';
import { HeroPlayer } from './greenlens/HeroPlayer';
import { CatalogModal } from './greenlens/CatalogModal';
import { DetailsModal } from './greenlens/DetailsModal';

const FEATURED_FILM = {
  id: 1,
  title: "Roots of Resilience: The Great Green Wall",
  category: "Restoration",
  duration: "1h 24m",
  year: "2023",
  director: "Amani K.",
  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
  description: "A cinematic journey across the Sahel, following the ambitious African-led initiative to grow an 8,000km natural wonder of the world to combat desertification.",
  synopsis: "The Great Green Wall is an epic ambition to grow an 8,000km natural wonder of the world across the entire width of Africa. Its goal is to provide food, jobs and a future for the millions of people who live in a region on the frontline of climate change. This documentary follows the pioneers working on the ground to transform the Sahel into a green haven, proving that humanity can indeed heal the Earth.",
  impact: "15% Canopy Increase",
  crew: [
    { role: "Director", name: "Amani K." },
    { role: "Cinematography", name: "Liam Sterling" },
    { role: "Scientific Lead", name: "Dr. Elena Rossi" }
  ],
  awards: ["Green Film Award 2023", "Critics Choice: Impact"]
};

const DOCS_LIBRARY = [
  {
    id: 2,
    title: "Guardians of the Soil",
    category: "Regenerative Ag",
    duration: "45m",
    year: "2024",
    image: "https://images.unsplash.com/photo-1625246333195-551e51245128?w=800&auto=format&fit=crop&q=60",
    impact: "1.2k Farmers Trained",
    description: "The story of four farmers transitioning to regenerative practices.",
    synopsis: "Soil is not dirt; it is a living organism. 'Guardians of the Soil' dives into the microbial universe beneath our feet. Through the lens of four farmers in different continents, we witness the struggle and triumph of letting go of chemical dependency to embrace the natural intelligence of the earth. This film serves as a practical and emotional guide to the regenerative revolution.",
    crew: [{ role: "Director", name: "Marcus Thorne" }],
    awards: ["Best Feature Doc - AgroFilm Fest"]
  },
  {
    id: 3,
    title: "Beneath the Canopy",
    category: "Biodiversity",
    duration: "52m",
    year: "2022",
    image: "https://images.unsplash.com/photo-1448375240586-dfd8f37933ff?w=800&auto=format&fit=crop&q=60",
    impact: "500 Acres Protected",
    description: "Exploring the symbiotic relationships in tropical agroforestry.",
    synopsis: "In the heart of the rainforest, agriculture and nature aren't at odds—they are partners. 'Beneath the Canopy' explores the intricate web of life in shade-grown coffee and cocoa plantations. From the insects that pollinate to the birds that manage pests, discover why preserving the canopy is the ultimate insurance for our food systems.",
    crew: [{ role: "Director", name: "Sarah Jenkins" }],
    awards: ["Earth Day Selection 2022"]
  },
  {
    id: 4,
    title: "Water Wars & Peace",
    category: "Conservation",
    duration: "1h 10m",
    year: "2023",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=80",
    impact: "Policy Change Enacted",
    description: "How communities are redefining water rights through conservation.",
    synopsis: "As rivers dry up and glaciers melt, water has become the most valuable commodity on Earth. This film investigates the innovative community-led management systems that are preventing conflict and ensuring water security in the most arid regions of the globe. A story of diplomacy, engineering, and shared survival.",
    crew: [{ role: "Director", name: "James Mwangi" }],
    awards: ["Sundance Impact Nominee"]
  },
  {
    id: 5,
    title: "The Urban Harvest",
    category: "Food Security",
    duration: "38m",
    year: "2024",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    impact: "50 Community Gardens",
    description: "The rise of vertical and rooftop farming in modern megacities.",
    synopsis: "By 2050, 70% of the world will live in cities. 'The Urban Harvest' explores the technological and social movement to grow food where it is consumed. From high-tech aeroponics to community-managed rooftops, witness how concrete jungles are becoming the breadbaskets of the future.",
    crew: [{ role: "Director", name: "Lisa Chen" }],
    awards: ["Urban Future Award 2024"]
  }
];

const CATEGORIES = ["All", "Restoration", "Regenerative Ag", "Biodiversity", "Conservation", "Food Security"];

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
