import React, { useState, useEffect, useMemo } from 'react';
import { PlanetWatchHeader } from './planetwatch/PlanetWatchHeader';
import { PlanetWatchStats } from './planetwatch/PlanetWatchStats';
import { VideoPlayer } from './planetwatch/VideoPlayer';
import { NewsList } from './planetwatch/NewsList';
import { Ticker } from './planetwatch/Ticker';
import { CategoryFilters } from './planetwatch/CategoryFilters';
import { TranscriptModal } from './planetwatch/TranscriptModal';
import { ArchiveModal } from './planetwatch/ArchiveModal';
import { ReportGrid } from './planetwatch/ReportGrid';
import { ForecastSection } from './planetwatch/ForecastSection';
import { RegionalIntelligence } from './planetwatch/RegionalIntelligence';

const NEWS_SEGMENTS = [
  {
    id: 1,
    title: "Global Drought Impact Report: Horn of Africa",
    category: "Climate Alert",
    time: "2h ago",
    duration: "12:45",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&auto=format&fit=crop&q=60",
    desc: "Analyzing the severe rainfall deficit affecting crop yields across Kenya, Somalia, and Ethiopia.",
    transcript: "[00:00:05] Reporter: We are standing in the Kiriaini sector where the Dn variable has dropped below 3 months for the first time in a decade.\n[00:00:15] Expert: The impact on soil integrity (In) is cascading. Without immediate intervention via the EA Thrust, we anticipate a 40% loss in local biomass.\n[00:01:22] Reporter: New relief corridors are being established via the IA supply chain network...",
    tags: ["Climate Policy", "East Africa"]
  },
  {
    id: 2,
    title: "Ocean Acidification & Coastal Farming",
    category: "Marine Ecosystems",
    time: "5h ago",
    duration: "08:30",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60",
    desc: "How rising CO2 levels are impacting shellfish farming and coastal agricultural zones.",
    transcript: "[00:00:10] Narrator: The pH levels of our coastal waters are shifting at an exponential rate.\n[00:02:45] Scientist: Coastal aquaculture relies on steady mineral cycles. The HA thrust is currently monitoring toxicity levels in regional estuaries.\n[00:05:30] Narrator: Proposed solutions include integrated seaweed filtration systems...",
    tags: ["Biodiversity", "Marine"]
  },
  {
    id: 3,
    title: "Reforestation Success in the Amazon",
    category: "Conservation",
    time: "Yesterday",
    duration: "15:20",
    image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&auto=format&fit=crop&q=60",
    desc: "Indigenous communities reclaim land using agroforestry techniques, restoring biodiversity.",
    transcript: "[00:00:00] Intro: Indigenous wisdom meets modern satellite telemetry.\n[00:04:15] Elder: We are planting for our grandchildren. The soil is our ancestor.\n[00:10:20] Analyst: NDVI data confirms a 12% increase in canopy density within this quadrant. This is a primary milestone for global EA goals.",
    tags: ["Biodiversity", "Indigenous"]
  },
  {
    id: 4,
    title: "New Pest Resistant Maize Variety Approved",
    category: "Agri-Tech",
    time: "2 days ago",
    duration: "06:15",
    image: "https://images.unsplash.com/photo-1629814682056-2775fa339793?w=800&auto=format&fit=crop&q=60",
    desc: "Scientists unveil a drought-tolerant, pest-resistant strain tailored for semi-arid regions.",
    transcript: "[00:00:15] Lab Lead: This variety, EA-Hybrid-X9, has shown 90% resistance to Fall Armyworm in controlled field trials.\n[00:02:30] Farmer: For us, this means lower costs for chemical inputs and higher m(t) resilience.\n[00:04:45] Lab Lead: Distribution begins next month through the IA cooperative hubs.",
    tags: ["Sustainable Tech", "Market Watch"]
  },
  {
    id: 5,
    title: "The Circular Plastic Economy in Kenya",
    category: "Waste Management",
    time: "3 days ago",
    duration: "10:20",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60",
    desc: "How agricultural plastic is being repurposed into durable farm infrastructure.",
    transcript: "[00:00:30] Reporter: Recycling irrigation pipes into fencing posts is the latest win for the EA Thrust in Nairobi.\n[00:05:10] Project Lead: We've diverted 50 tons of HDPE from landfills this quarter alone.\n[00:08:45] Reporter: Scalability is high, with new processing plants coming online in Q4.",
    tags: ["Climate Policy", "Sustainable Tech"]
  }
];

const TICKER_ITEMS = [
  "BREAKING: El Niño expected to peak in late 2024, farmers advised to prepare drainage systems.",
  "MARKET: Global wheat prices stabilize after bumper harvest in Northern Hemisphere.",
  "POLICY: EU passes new regenerative agriculture subsidy package for smallholders.",
  "TECH: Drone-based pollination trials show 30% yield increase in almond orchards."
];

const CATEGORIES = [
  { name: 'Climate Policy', desc: 'Updates on global regulations and national subsidies.' },
  { name: 'Sustainable Tech', desc: 'New hardware and AI tools reaching the field.' },
  { name: 'Biodiversity', desc: 'Conservation wins and ecosystem management logs.' },
  { name: 'Market Watch', desc: 'Real-time commodity trends and supply chain shifts.' }
];

export const PlanetWatch: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState(NEWS_SEGMENTS[0]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [showTranscript, setShowTranscript] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveSearch, setArchiveSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [isRescanning, setIsRescanning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isBroadcasting && !isPaused) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isBroadcasting, isPaused]);

  const handleWatchNow = (segment?: typeof NEWS_SEGMENTS[0]) => {
    if (segment) setActiveSegment(segment);
    setIsBroadcasting(true);
    setVideoProgress(0);
    setIsPaused(false);
    setShowArchive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseBroadcast = () => {
    setIsBroadcasting(false);
    setVideoProgress(0);
  };

  const handleCategoryClick = (cat: string) => {
    setIsRescanning(true);
    setActiveCategoryFilter(cat === activeCategoryFilter ? null : cat);
    setTimeout(() => setIsRescanning(false), 800);
  };

  const handleCopyTranscript = () => {
    if (activeSegment.transcript) {
      navigator.clipboard.writeText(activeSegment.transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayedSegments = useMemo(() => {
    if (!activeCategoryFilter) return NEWS_SEGMENTS;
    return NEWS_SEGMENTS.filter(s => s.tags.includes(activeCategoryFilter));
  }, [activeCategoryFilter]);

  const archiveResults = useMemo(() => {
    return NEWS_SEGMENTS.filter(s =>
      s.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
      s.desc.toLowerCase().includes(archiveSearch.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(archiveSearch.toLowerCase()))
    );
  }, [archiveSearch]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">

      <PlanetWatchHeader />
      
      <PlanetWatchStats />

      {/* Main News Player */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <VideoPlayer
            isBroadcasting={isBroadcasting}
            activeSegment={activeSegment}
            isPaused={isPaused}
            videoProgress={videoProgress}
            setIsPaused={setIsPaused}
            handleCloseBroadcast={handleCloseBroadcast}
            handleWatchNow={handleWatchNow}
            setShowTranscript={setShowTranscript}
          />
        </div>

        {/* Up Next List */}
        <div className="lg:col-span-1">
          <NewsList
            isRescanning={isRescanning}
            activeCategoryFilter={activeCategoryFilter}
            setActiveCategoryFilter={setActiveCategoryFilter}
            displayedSegments={displayedSegments}
            activeSegment={activeSegment}
            setActiveSegment={setActiveSegment}
            isBroadcasting={isBroadcasting}
            setVideoProgress={setVideoProgress}
            setShowArchive={setShowArchive}
          />
        </div>
      </div>

      <Ticker tickerItems={TICKER_ITEMS} />

      <div className="mt-24">
        <RegionalIntelligence />
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-agro-600 pl-6">Intelligence Reports</h2>
        <ReportGrid />
      </div>

      <div className="mt-24">
        <ForecastSection />
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-serif font-black text-earth-900 dark:text-white mb-8 border-l-4 border-agro-600 pl-6">Browse by Focus</h2>
        <CategoryFilters
          categories={CATEGORIES}
          activeCategoryFilter={activeCategoryFilter}
          handleCategoryClick={handleCategoryClick}
          newsSegments={NEWS_SEGMENTS}
        />
      </div>

      {showTranscript && (
        <TranscriptModal
          activeSegment={activeSegment}
          setShowTranscript={setShowTranscript}
          handleCopyTranscript={handleCopyTranscript}
          copied={copied}
        />
      )}

      {showArchive && (
        <ArchiveModal
          archiveSearch={archiveSearch}
          setArchiveSearch={setArchiveSearch}
          setShowArchive={setShowArchive}
          archiveResults={archiveResults}
          handleWatchNow={handleWatchNow}
          newsSegmentsCount={NEWS_SEGMENTS.length}
        />
      )}

    </div>
  );
};
