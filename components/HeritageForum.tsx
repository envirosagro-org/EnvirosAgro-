import React, { useState, useRef } from 'react';
import { Scroll, CloudRain, Heart } from 'lucide-react';
import { validateCommunityPost } from '../services/gemini';

import { HeritageHero } from './heritageforum/HeritageHero';
import { TopicGrid } from './heritageforum/TopicGrid';
import { StoriesFeed } from './heritageforum/StoriesFeed';
import { HeritageSidebar } from './heritageforum/HeritageSidebar';
import { ShareStoryModal } from './heritageforum/ShareStoryModal';
import { ArchiveModal } from './heritageforum/ArchiveModal';
import { ArchiveDetailModal } from './heritageforum/ArchiveDetailModal';
import { TopicDetailModal } from './heritageforum/TopicDetailModal';
import { StoryReadingModal } from './heritageforum/StoryReadingModal';

const MOCK_THREADS = [
  { id: 101, topicId: 1, author: "Farmer Joe", title: "Success with Multi-Story Cropping", replies: 12, lastActive: "10m ago" },
  { id: 102, topicId: 1, author: "Dr. L", title: "Genetic Drift in Heirloom Maize", replies: 45, lastActive: "1h ago" },
  { id: 103, topicId: 2, author: "Elder Maku", title: "Predicting May Rains via Bird Song", replies: 28, lastActive: "3h ago" },
  { id: 104, topicId: 3, author: "Gogo Nyota", title: "Neem Oil Calibration for Coffee", replies: 89, lastActive: "5m ago" },
];

const ARCHIVE_ENTRIES = [
  {
    id: 'arc-1',
    title: "Soil Regeneration Records 1952",
    region: "East Africa",
    type: "Manuscript Scan",
    date: "May 1952",
    tags: ["Soil", "History"],
    size: "4.2 MB",
    fullContent: "A detailed log of soil nitrogen deltas following the Great Rains. Observations recorded by regional agronomists note a 22% spike in organic matter where traditional mulching was combined with early-cycle legumes. The records suggest a standardized fallow period of 3 months was common in the Kiriaini sector.",
    meta: { quality: "High-Res PDF", medium: "Typed Paper", hash: "SHA-256: e8f2...a12" }
  },
  {
    id: 'arc-2',
    title: "Terracing Logic in Ancient Peru",
    region: "Andes",
    type: "Technical Drawing",
    date: "Archived 1988",
    tags: ["Infrastructure", "Legacy"],
    size: "12.8 MB",
    fullContent: "Blueprints detailing the micro-climatic management of Incan terrace systems. The logic focuses on thermal mass stabilization—utilizing stone walls to retain heat during cold Andean nights, extending the growing window for specialized tuber varieties. The gravity-fed irrigation channels maintain a constant 5% grade for optimal flow.",
    meta: { quality: "Vector Reconstruction", medium: "Parchment Scan", hash: "SHA-256: d932...f92" }
  },
  {
    id: 'arc-3',
    title: "Medicinal Tuber Taxonomy",
    region: "Southeast Asia",
    type: "Field Guide",
    date: "Aug 1974",
    tags: ["HA", "Botany"],
    size: "2.1 MB",
    fullContent: "An illustrated guide to 45 wild-harvested tubers used in traditional health agriculture. The records include concentration levels of active saponins and their historical usage in treating digestive distress in both humans and livestock. Modern chemical audits verify a 92% correlation between recorded benefits and biological activity.",
    meta: { quality: "Digital Color", medium: "Field Journal", hash: "SHA-256: c110...b45" }
  },
  {
    id: 'arc-4',
    title: "Rain Ritual Song Transcripts",
    region: "West Africa",
    type: "Oral History Record",
    date: "Oct 1965",
    tags: ["SA", "Culture"],
    size: "850 KB",
    fullContent: "Transcribed lyrics and rhythm patterns of seasonal rainfall ceremonies. Beyond cultural significance, the timing of these songs served as a mnemonic device for identifying the 'Sowing Window'—linked to the flowering of the Baobab tree. Statistical analysis shows these rituals align with an 88% accuracy rate to modern NDVI rainfall benchmarks.",
    meta: { quality: "Text Transcript", medium: "Audio Tape", hash: "SHA-256: a882...e32" }
  },
  {
    id: 'arc-5',
    title: "Colonial-Era Coffee Yield Logs",
    region: "Kenya Cluster",
    type: "Ledger Scan",
    date: "1930-1945",
    tags: ["IA", "Economics"],
    size: "15.4 MB",
    fullContent: "Comprehensive weekly yield data from primary coffee estates. This ledger provides a critical baseline for 'Industrial Agriculture' maturity C(a) scores before the introduction of synthetic inputs. The data highlights the natural resistance of 'SL-28' heirloom varieties to pests during high-moisture seasons.",
    meta: { quality: "Raw Ledger Scan", medium: "Leatherbound Book", hash: "SHA-256: f771...d11" }
  }
];

const FORUM_TOPICS = [
  {
    id: 1,
    title: "Indigenous Seed Saving",
    desc: "Preserving heirloom varieties and the stories they carry.",
    icon: <Scroll size={24} />,
    color: "bg-green-50 text-green-800",
    borderColor: "border-green-100",
    posts: 124,
    detail: "Seed saving is the core of agricultural sovereignty. Our ancestors didn't just save seeds for food; they saved them for resilience. This topic covers technical methods of preservation, the ritual of exchange, and the documentation of varieties like 'Mnyamunyi' maize and 'Kienyeji' greens.",
    manuals: [
      { name: "Heirloom_Preservation_v2.pdf", size: "1.2MB" },
      { name: "Maize_Genetic_Audit_2023.csv", size: "450KB" }
    ],
    fullDoc: "Agricultural sovereignty begins with the seed. Unlike commercial hybrids that require annual repurchasing, heirloom varieties are adapted to localized micro-climates. This documentation outlines the 'Thrust EA' standards for storage: maintaining a consistent 12% moisture level and utilize indigenous pest repellants like ash and dried neem leaves."
  },
  {
    id: 2,
    title: "Rain & Harvest Rituals",
    desc: "Traditional ceremonies that honor the cycles of nature.",
    icon: <CloudRain size={24} />,
    color: "bg-blue-50 text-blue-800",
    borderColor: "border-blue-100",
    posts: 85,
    detail: "Understanding the spiritual connection between the community and the climate. We explore how traditional knowledge systems predicted rainfall through biological indicators—bird migrations, flowering patterns, and insect behavior—and the festivals that ensured communal gratitude.",
    manuals: [
      { name: "Lunar_Harvest_Cycles.pdf", size: "800KB" }
    ],
    fullDoc: "Rainfall duration (Dn) is an independent variable in the EnvirosAgro resilience formula. Historically, rituals served as a community synchronization event, ensuring all plots were prepared simultaneously to maximize the In (soil integrity) factor. Modern data shows these ritual timings often aligned perfectly with biomass deltas visible from satellite."
  },
  {
    id: 3,
    title: "Medicinal Roots & Herbs",
    desc: "Ancient wisdom on healing plants and natural remedies.",
    icon: <Heart size={24} />,
    color: "bg-rose-50 text-rose-800",
    borderColor: "border-rose-100",
    posts: 210,
    detail: "The farm is the first hospital. This domain archives the properties of plants like the Neem tree, Aloe Vera, and various wild tubers. We focus on the intersection of Ethnobotany and modern Health Agriculture (HA) to validate traditional cures.",
    manuals: [
      { name: "Ethnobotany_Pharmacopeia.pdf", size: "4.5MB" },
      { name: "Neem_Solution_Guide.pdf", size: "200KB" }
    ],
    fullDoc: "The HA (Health Agriculture) Thrust recognizes that the nutritional profile of crops is influenced by soil health. Medicinal herbs found on the fringes of farm plots often serve dual roles as pest repellents. Our ongoing research aims to standardize the concentration of active bio-compounds in wild-harvested tubers."
  },
  {
    id: 4,
    title: "Oral History & Folklore",
    desc: "Myths, legends, and lessons passed down through generations.",
    icon: <Scroll size={24} />,
    color: "bg-amber-50 text-amber-800",
    borderColor: "border-amber-100",
    posts: 156,
    detail: "Storytelling is our most durable data storage. Every folk tale carries a survival lesson—about greed, environmental stewardship, or communal unity. We are digitizing these oral archives to ensure the 'Social Immunity' of future generations.",
    manuals: [
      { name: "Storytelling_Framework_SA.pdf", size: "1.1MB" }
    ],
    fullDoc: "Folklore functions as a 'Social Vaccine' against Social Influenza Disease (SI-D). By archiving narratives that prioritize communal resource sharing (Ubuntu), we strengthen the foundation upon which technical and industrial agriculture can be built."
  }
];

const STORIES = [
  {
    id: 1,
    author: "Mama Amani",
    role: "Community Elder",
    location: "Kiriaini, Kenya",
    title: "The Legend of the Mugumo Tree",
    content: "My grandmother told me that the Mugumo tree is not just a plant, but a shrine. Before the rains came, the elders would gather beneath its vast canopy. They didn't just pray; they observed. They noticed how the ants moved and how the wind changed direction. It was a classroom of nature. \n\nOne year, a stranger came and wanted to cut the tree for timber. The village said no, for the tree was the guardian of our water source. Today, that tree still stands, and the stream beneath it has never run dry, even in the harshest droughts. This is the power of respect for the land.",
    likes: 45,
    comments: 12,
    tags: ["Folklore", "Trees", "Conservation"],
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    author: "Elder Juma",
    role: "Master Farmer",
    location: "Tanga, Tanzania",
    title: "Why We Plant by the Moon",
    content: "Modern science calls it gravitational pull, but we know it as the breath of the earth. Planting cassava when the moon is waning ensures that the energy goes down into the roots, making them heavy and sweet. \n\nI have farmed for 50 years, and while I use soil sensors today, I still look at the sky. The moon is our clock. It tells us when the pests are weak and when the water is rising. Combining the old clock with the new sensors—that is where true mastery lies.",
    likes: 38,
    comments: 8,
    tags: ["Practices", "Astronomy", "Resilience"],
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&auto=format&fit=crop&q=80"
  }
];

export const HeritageForum: React.FC = () => {
  const [activeStory, setActiveStory] = useState<any>(null);
  const [activeTopic, setActiveTopic] = useState<any>(null);
  const [selectedArchiveRecord, setSelectedArchiveRecord] = useState<any>(null);
  const [topicView, setTopicView] = useState<'OVERVIEW' | 'THREADS' | 'DOCS' | 'DOWNLOADS'>('OVERVIEW');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', content: '', category: 'Folklore', location: 'Global' });
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [archiveSearch, setArchiveSearch] = useState('');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleRSVP = () => {
    if (rsvpStatus === 'SUCCESS') return;
    setRsvpStatus('LOADING');
    setTimeout(() => setRsvpStatus('SUCCESS'), 2000);
  };

  const handleShareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.content.trim()) return;

    setIsSubmitting(true);
    setAiFeedback(null);

    try {
      const feedback = await validateCommunityPost(newStory.content);
      setAiFeedback(feedback);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowShareModal(false);
        setSubmitSuccess(false);
        setAttachedImage(null);
        setNewStory({ title: '', content: '', category: 'Folklore', location: 'Global' });
      }, 3500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleDownloadManual = (fileName: string) => {
    setIsDownloading(fileName);
    setTimeout(() => {
      setIsDownloading(null);
      alert(`Successfully downlinked ${fileName} to local repository.`);
    }, 2000);
  };

  const filteredArchives = ARCHIVE_ENTRIES.filter(entry =>
    entry.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
    entry.region.toLowerCase().includes(archiveSearch.toLowerCase()) ||
    entry.tags.some(t => t.toLowerCase().includes(archiveSearch.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <HeritageHero
        setShowShareModal={setShowShareModal}
        setShowArchiveModal={setShowArchiveModal}
      />

      <TopicGrid
        topics={FORUM_TOPICS}
        openTopic={(topic) => { setActiveTopic(topic); setTopicView('OVERVIEW'); }}
      />

      <div className="grid lg:grid-cols-3 gap-12 mb-32">
        <StoriesFeed stories={STORIES} setActiveStory={setActiveStory} />
        <HeritageSidebar rsvpStatus={rsvpStatus} handleRSVP={handleRSVP} />
      </div>

      {showShareModal && (
        <ShareStoryModal
          setShowShareModal={setShowShareModal}
          submitSuccess={submitSuccess}
          aiFeedback={aiFeedback}
          newStory={newStory}
          setNewStory={setNewStory}
          handleShareSubmit={handleShareSubmit}
          isSubmitting={isSubmitting}
          attachedImage={attachedImage}
          setAttachedImage={setAttachedImage}
          fileInputRef={fileInputRef}
          topics={FORUM_TOPICS}
        />
      )}

      {showArchiveModal && (
        <ArchiveModal
          archiveSearch={archiveSearch}
          setArchiveSearch={setArchiveSearch}
          setShowArchiveModal={setShowArchiveModal}
          filteredArchives={filteredArchives}
          setSelectedArchiveRecord={setSelectedArchiveRecord}
          handleDownloadManual={handleDownloadManual}
          isDownloading={isDownloading}
          archiveEntriesCount={ARCHIVE_ENTRIES.length}
        />
      )}

      {selectedArchiveRecord && (
        <ArchiveDetailModal
          selectedArchiveRecord={selectedArchiveRecord}
          setSelectedArchiveRecord={setSelectedArchiveRecord}
          handleDownloadManual={handleDownloadManual}
          isDownloading={isDownloading}
        />
      )}

      {activeStory && (
        <StoryReadingModal
          activeStory={activeStory}
          setActiveStory={setActiveStory}
        />
      )}

      {activeTopic && (
        <TopicDetailModal
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          topicView={topicView}
          setTopicView={setTopicView}
          mockThreads={MOCK_THREADS}
          handleDownloadManual={handleDownloadManual}
          isDownloading={isDownloading}
        />
      )}
    </div>
  );
};
