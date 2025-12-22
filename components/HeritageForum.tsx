import React, { useState, useEffect, useRef } from 'react';
// Added missing icon imports: ChevronRight, ArrowRight, PlusCircle, User, Zap, Clock, Activity, Calendar
import { 
  Scroll, Feather, Users, MessageCircle, Heart, Share2, BookOpen, Sparkles, 
  MapPin, CheckCircle2, Loader2, CalendarCheck, X, Send, Camera, Globe,
  ShieldCheck, ArrowLeft, Bookmark, Quote, Info, Search, Filter,
  Star, ExternalLink, Library, ChevronRight, ArrowRight, PlusCircle, User, Zap,
  Check, Trash2, Download, Terminal, FileText, ArrowUpRight, Plus, History,
  Database, Eye, FileDown, Clock, FileCheck, ShieldAlert, Activity, Calendar
} from 'lucide-react';
import { validateCommunityPost } from '../services/gemini';

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
    icon: <SproutIcon />,
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
    icon: <CloudRainIcon />,
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
    icon: <HeartIcon />,
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
  const [activeStory, setActiveStory] = useState<typeof STORIES[0] | null>(null);
  const [activeTopic, setActiveTopic] = useState<typeof FORUM_TOPICS[0] | null>(null);
  const [selectedArchiveRecord, setSelectedArchiveRecord] = useState<typeof ARCHIVE_ENTRIES[0] | null>(null);
  const [topicView, setTopicView] = useState<'OVERVIEW' | 'THREADS' | 'DOCS' | 'DOWNLOADS'>('OVERVIEW');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');
  
  // New Story Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', content: '', category: 'Folklore', location: 'Global' });
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  
  // Image Attachment State
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Archive Search State
  const [archiveSearch, setArchiveSearch] = useState('');

  // Download State
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleRSVP = () => {
    if (rsvpStatus === 'SUCCESS') return;
    setRsvpStatus('LOADING');
    setTimeout(() => setRsvpStatus('SUCCESS'), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAttachedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
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

  const openTopic = (topic: typeof FORUM_TOPICS[0]) => {
    setActiveTopic(topic);
    setTopicView('OVERVIEW');
  };

  const filteredArchives = ARCHIVE_ENTRIES.filter(entry => 
    entry.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
    entry.region.toLowerCase().includes(archiveSearch.toLowerCase()) ||
    entry.tags.some(t => t.toLowerCase().includes(archiveSearch.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <div className="bg-rose-900 rounded-[3rem] p-10 md:p-16 text-white mb-16 relative overflow-hidden shadow-2xl border-4 border-rose-950/20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[5s]">
            <Scroll size={400} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-rose-300 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                 <div className="w-8 h-px bg-rose-400"></div>
                 <Feather size={14} /> Heritage Hub
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[0.9] tracking-tighter">Preserving the <br/><span className="text-rose-400 italic">Soul of Agriculture</span></h1>
              <p className="text-rose-100 text-xl leading-relaxed mb-10 font-medium opacity-90">
                 A sanctuary for indigenous knowledge, cultural storytelling, and the timeless wisdom that connects us to the land.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                    onClick={() => setShowShareModal(true)}
                    className="bg-white text-rose-900 font-black py-4 px-10 rounded-2xl hover:bg-rose-50 transition-all flex items-center gap-3 shadow-xl active:scale-95 text-xs uppercase tracking-widest"
                >
                    <Scroll size={18} /> Share Your Story
                </button>
                <button 
                    onClick={() => setShowArchiveModal(true)}
                    className="bg-rose-800/40 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-rose-800/60 transition-all"
                >
                    <Library size={18} /> Browse Archives
                </button>
              </div>
           </div>
           
           <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 max-w-sm shadow-2xl relative group">
              <div className="absolute -top-4 -left-4 bg-amber-400 text-rose-950 p-2 rounded-xl shadow-lg">
                  <Sparkles size={20} fill="currentColor" />
              </div>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-rose-300 mb-4">Daily Wisdom</h3>
              <p className="text-rose-50 italic text-lg leading-relaxed mb-6 font-medium">
                 "The earth does not belong to us; we belong to the earth. Treat the soil as a living ancestor, and it will feed your children's children."
              </p>
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-400/30 flex items-center justify-center text-rose-100 font-bold text-xs">M</div>
                  <p className="text-xs font-black uppercase tracking-widest text-rose-200">Maasai Proverb</p>
              </div>
           </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="mb-24">
         <div className="flex justify-between items-end mb-10 px-2">
            <div>
                <h2 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.4em] mb-2">Knowledge Domains</h2>
                <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white tracking-tight">Explore Categories</h3>
            </div>
            <button className="text-sm font-bold text-earth-400 hover:text-rose-600 transition-colors flex items-center gap-2">
                View Policy <ShieldCheck size={16} />
            </button>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORUM_TOPICS.map((topic) => (
               <div 
                  key={topic.id} 
                  onClick={() => openTopic(topic)}
                  className={`bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-rose-100 dark:hover:border-rose-900/50 hover:shadow-2xl transition-all cursor-pointer group flex flex-col`}
               >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${topic.color} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                     {topic.icon}
                  </div>
                  <h3 className="font-bold text-xl text-earth-900 dark:text-white mb-3 group-hover:text-rose-700 transition-colors leading-tight">{topic.title}</h3>
                  <p className="text-sm text-earth-500 dark:text-earth-400 mb-8 leading-relaxed font-medium line-clamp-2">{topic.desc}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                     <div className="flex items-center text-[10px] font-black text-earth-300 dark:text-earth-600 gap-1.5 uppercase tracking-widest">
                        <MessageCircle size={14} /> {topic.posts} Threads
                     </div>
                     <ChevronRight size={18} className="text-earth-200 group-hover:text-rose-50 group-hover:translate-x-1 transition-all" />
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Stories Feed */}
      <div className="grid lg:grid-cols-3 gap-12 mb-32">
         <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-4">
                <BookOpen className="text-rose-600" size={32} /> Recent Stories
                </h2>
                <div className="flex bg-earth-50 dark:bg-earth-900 p-1 rounded-xl border border-earth-100 dark:border-earth-800">
                    <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white dark:bg-earth-800 text-rose-600 shadow-sm">Trending</button>
                    <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-earth-400">Latest</button>
                </div>
            </div>
            
            <div className="space-y-10">
               {STORIES.map((story) => (
                  <div 
                    key={story.id} 
                    onClick={() => setActiveStory(story)}
                    className="bg-white dark:bg-earth-900 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl border border-earth-100 dark:border-earth-800 transition-all cursor-pointer group hover:-translate-y-1 duration-500"
                  >
                     <div className="md:flex">
                        <div className="md:w-[40%] h-64 md:h-auto relative overflow-hidden">
                           <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                           <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60"></div>
                           <div className="absolute top-6 left-6 flex gap-2">
                              <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-rose-700 uppercase tracking-widest shadow-lg">
                                 {story.tags[0]}
                              </span>
                           </div>
                        </div>
                        <div className="p-10 md:w-[60%] flex flex-col justify-between">
                           <div>
                              <div className="flex justify-between items-start mb-6">
                                 <div>
                                    <h3 className="font-bold text-2xl text-earth-900 dark:text-white mb-2 leading-tight group-hover:text-rose-700 transition-colors">{story.title}</h3>
                                    <div className="flex items-center gap-3 text-[10px] font-black text-earth-400 uppercase tracking-[0.2em]">
                                       <span className="text-rose-600">{story.author}</span>
                                       <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
                                       <span className="flex items-center gap-1"><MapPin size={12} className="text-rose-400" /> {story.location}</span>
                                    </div>
                                 </div>
                              </div>
                              <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-8 text-sm font-medium line-clamp-3">
                                 {story.content}
                              </p>
                           </div>
                           
                           <div className="flex items-center gap-6 border-t border-earth-50 dark:border-earth-800 pt-6">
                              <button className="flex items-center gap-2 text-[10px] font-black text-earth-400 hover:text-rose-600 transition-colors uppercase tracking-widest">
                                 <Heart size={16} className="text-rose-400" /> {story.likes}
                              </button>
                              <button className="flex items-center gap-2 text-[10px] font-black text-earth-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                                 <MessageCircle size={16} className="text-blue-400" /> {story.comments}
                              </button>
                              <button className="flex items-center gap-1.5 text-rose-600 font-black text-[10px] uppercase tracking-widest ml-auto group-hover:gap-3 transition-all">
                                 Read Narrative <ArrowRight size={14} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Sidebar */}
         <div className="space-y-8">
            <div className="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-[2.5rem] border border-rose-100 dark:border-rose-900/50 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12 group-hover:rotate-45 transition-transform duration-1000"><Users size={180} /></div>
               <h3 className="font-bold text-xl text-rose-900 dark:text-rose-100 mb-6 flex items-center gap-3 relative z-10">
                  <Users size={24} className="text-rose-600" /> Community Elders
               </h3>
               <p className="text-sm text-rose-800 dark:text-rose-300 mb-8 font-medium leading-relaxed relative z-10">
                  Connect with keepers of tradition who can guide you on sustainable, time-tested practices.
               </p>
               <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4 bg-white dark:bg-earth-800 p-4 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 transition-all hover:scale-[1.02]">
                     <div className="w-12 h-12 rounded-2xl bg-earth-200 overflow-hidden border-2 border-white shadow-md">
                        <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-earth-900 dark:text-white truncate">Gogo Nyota</p>
                        <p className="text-[9px] text-earth-500 font-black uppercase tracking-widest">Herbalist • 40y Exp</p>
                     </div>
                     <button className="bg-rose-600 text-white p-2 rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20">
                        <PlusCircle size={18} />
                     </button>
                  </div>
                  <div className="flex items-center gap-4 bg-white dark:bg-earth-800 p-4 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 transition-all hover:scale-[1.02]">
                     <div className="w-12 h-12 rounded-2xl bg-earth-200 overflow-hidden border-2 border-white shadow-md">
                        <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&auto=format&fit=crop&q=100" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-earth-900 dark:text-white truncate">Mzee Kiptoo</p>
                        <p className="text-[9px] text-earth-500 font-black uppercase tracking-widest">Soil Guardian • 50y Exp</p>
                     </div>
                     <button className="bg-rose-600 text-white p-2 rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20">
                        <PlusCircle size={18} />
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>
               {rsvpStatus === 'SUCCESS' && (
                   <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
                       <div className="bg-agro-500 text-white p-1 rounded-full shadow-lg">
                           <CheckCircle2 size={24} />
                       </div>
                   </div>
               )}
               <h3 className="font-bold text-earth-900 dark:text-white mb-2 uppercase tracking-widest text-[10px]">Upcoming Gathering</h3>
               <div className="text-6xl font-serif font-bold text-rose-600 mb-2 group-hover:scale-110 transition-transform">14</div>
               <div className="text-xs font-black text-earth-400 dark:text-earth-500 uppercase tracking-[0.4em] mb-6">May 2024</div>
               <div className="bg-earth-50 dark:bg-earth-800 p-6 rounded-2xl mb-8 border border-earth-100 dark:border-earth-700">
                  <p className="text-sm text-earth-900 dark:text-white font-bold leading-tight">
                     Global Storytelling Night
                  </p>
                  <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest mt-2">Theme: "Seeds of Ancestors"</p>
               </div>
               <button 
                  onClick={handleRSVP}
                  disabled={rsvpStatus !== 'IDLE'}
                  className={`w-full font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${
                    rsvpStatus === 'IDLE' 
                    ? 'bg-rose-900 text-white hover:bg-rose-800 shadow-rose-900/20 active:scale-95' 
                    : rsvpStatus === 'LOADING'
                    ? 'bg-earth-100 dark:bg-earth-800 text-earth-400 cursor-wait'
                    : 'bg-agro-50 dark:bg-agro-900/30 text-agro-700 dark:text-agro-400 border border-agro-100 dark:border-agro-800 shadow-none'
                  }`}
               >
                  {rsvpStatus === 'IDLE' && <><CalendarCheck size={18} /> Confirm Attendance</>}
                  {rsvpStatus === 'LOADING' && <><Loader2 size={18} className="animate-spin" /> Syncing Node...</>}
                  {rsvpStatus === 'SUCCESS' && <><CheckCircle2 size={18} /> Calendar Secured</>}
               </button>
            </div>
         </div>
      </div>

      {/* SHARE YOUR STORY MODAL */}
      {showShareModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-white/10 flex flex-col max-h-[90vh]">
                  <div className="bg-rose-900 p-10 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Feather size={200} /></div>
                      <div className="relative z-10">
                          <h3 className="text-3xl font-serif font-bold">Preserve Your Legacy</h3>
                          <p className="text-xs text-rose-300 font-bold uppercase tracking-widest mt-1">Direct Heritage Link • Community Archive</p>
                      </div>
                      <button onClick={() => setShowShareModal(false)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all">
                          <X size={28} />
                      </button>
                  </div>

                  <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
                      {submitSuccess ? (
                          <div className="text-center py-12 animate-in zoom-in">
                              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner">
                                  <CheckCircle2 size={56} className="animate-bounce" />
                              </div>
                              <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4">Story Propagated</h3>
                              <p className="text-earth-600 dark:text-earth-400 mb-10 max-w-sm mx-auto leading-relaxed">
                                  Your wisdom has been authenticated by our AI Core and added to the Global Heritage Archive.
                              </p>
                              {aiFeedback && (
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-left mb-8">
                                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                          <Sparkles size={12} fill="currentColor" /> AI Validation Analysis
                                      </p>
                                      <p className="text-xs text-blue-800 dark:text-blue-200 italic font-medium">{aiFeedback}</p>
                                  </div>
                              )}
                              <div className="text-[9px] font-mono text-earth-400 uppercase tracking-[0.4em]">REF: HER-ARCH-{Date.now().toString().slice(-6)}</div>
                          </div>
                      ) : (
                          <form onSubmit={handleShareSubmit} className="space-y-8">
                              <div className="space-y-2">
                                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Narrative Title</label>
                                  <input 
                                    required
                                    value={newStory.title}
                                    onChange={e => setNewStory({...newStory, title: e.target.value})}
                                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl px-6 py-4 text-sm font-bold transition-all dark:text-white" 
                                    placeholder="e.g. The First Rains of 1974" 
                                  />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Domain</label>
                                      <select className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl px-5 py-4 text-sm font-bold transition-all appearance-none dark:text-white">
                                          {FORUM_TOPICS.map(t => <option key={t.id}>{t.title}</option>)}
                                      </select>
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Location</label>
                                      <div className="relative">
                                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" size={16} />
                                          <input 
                                            value={newStory.location}
                                            onChange={e => setNewStory({...newStory, location: e.target.value})}
                                            className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold transition-all dark:text-white" 
                                          />
                                      </div>
                                  </div>
                              </div>

                              <div className="space-y-2">
                                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">The Narrative</label>
                                  <textarea 
                                    required
                                    value={newStory.content}
                                    onChange={e => setNewStory({...newStory, content: e.target.value})}
                                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-[2rem] px-8 py-6 text-sm font-medium transition-all min-h-[250px] resize-none dark:text-white leading-relaxed" 
                                    placeholder="Tell the community about a tradition, a lesson from an elder, or a historic farming event..."
                                  />
                              </div>

                              {attachedImage && (
                                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border-2 border-rose-100 dark:border-rose-900 group/img shadow-inner animate-in zoom-in-95 duration-500">
                                    <img src={attachedImage} className="w-full h-full object-cover" alt="Narrative visual" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            type="button"
                                            onClick={() => setAttachedImage(null)}
                                            className="p-4 bg-red-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-4">
                                  <input 
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                  />
                                  <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${attachedImage ? 'bg-green-50 border-green-200 text-green-700' : 'bg-earth-100 dark:bg-earth-800 border-transparent hover:bg-earth-200 text-earth-600 dark:text-earth-400'}`}
                                  >
                                      {attachedImage ? <Check size={20} /> : <Camera size={20} />} 
                                      {attachedImage ? 'Aesthetic Attached' : 'Attach Visual'}
                                  </button>
                                  <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center gap-3 bg-rose-900 hover:bg-rose-800 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-rose-900/20 active:scale-95 disabled:opacity-50"
                                  >
                                      {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> MINTING LEGACY...</> : <><Send size={18} /> Submit to Archives</>}
                                  </button>
                              </div>
                          </form>
                      )}
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
                      <ShieldCheck size={18} className="text-rose-600" />
                      <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Cultural Integrity & Data Sovereignty Enabled</p>
                  </div>
              </div>
          </div>
      )}

      {/* BROWSE ARCHIVES MODAL */}
      {showArchiveModal && (
        <div className="fixed inset-0 z-[170] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-hidden">
            <div className="bg-white dark:bg-earth-900 w-full max-w-5xl h-[85vh] rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border-4 border-rose-900/10 flex flex-col">
                <div className="bg-[#4a1c1c] p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Library size={300} /></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md">
                            <History size={40} className="text-rose-400" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-serif font-bold tracking-tight">Ancient Wisdom Repository</h3>
                            <p className="text-xs text-rose-300 font-black uppercase tracking-[0.4em] mt-2">Verified Historical Records • Data Integrity Guaranteed</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex-1 max-w-md w-full">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-300" size={20} />
                            <input 
                                type="text"
                                value={archiveSearch}
                                onChange={(e) => setArchiveSearch(e.target.value)}
                                placeholder="Search by era, region, or keyword..."
                                className="w-full bg-white/10 border-2 border-white/10 rounded-[2rem] pl-14 pr-6 py-4 text-sm text-white placeholder-rose-300/50 focus:outline-none focus:border-rose-400 transition-all"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowArchiveModal(false)}
                        className="relative z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all border border-white/10 hover:rotate-90"
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]">
                    {filteredArchives.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {filteredArchives.map((entry) => (
                                <div 
                                    key={entry.id} 
                                    onClick={() => setSelectedArchiveRecord(entry)}
                                    className="bg-white dark:bg-earth-800 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-700 hover:shadow-2xl transition-all group flex flex-col hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-2xl text-rose-800 dark:text-rose-400 group-hover:scale-110 transition-transform shadow-inner">
                                            <FileText size={28} />
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="bg-earth-50 dark:bg-earth-900 px-3 py-1 rounded-full text-[9px] font-black text-earth-400 uppercase tracking-widest border border-earth-100 dark:border-earth-700 shadow-sm">
                                                {entry.type}
                                            </span>
                                            <span className="text-[10px] font-mono font-bold text-rose-600/50">{entry.id}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-bold text-earth-900 dark:text-white mb-4 group-hover:text-rose-800 transition-colors leading-tight">{entry.title}</h4>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {entry.tags.map(t => (
                                            <span key={t} className="px-3 py-1 bg-earth-50 dark:bg-earth-900/50 text-[10px] font-bold text-earth-500 rounded-lg">{t}</span>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-6 border-t border-earth-50 dark:border-earth-700 flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-xs text-earth-400 font-bold uppercase tracking-wider">
                                            <Globe size={14} className="text-blue-400" /> {entry.region}
                                            <span className="w-1 h-1 bg-earth-200 rounded-full"></span>
                                            <Clock size={14} /> {entry.date}
                                        </div>
                                        <div className="flex gap-2">
                                          <button 
                                              onClick={(e) => { e.stopPropagation(); setSelectedArchiveRecord(entry); }}
                                              className="p-3 bg-earth-50 dark:bg-earth-900 text-earth-600 dark:text-earth-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm active:scale-90"
                                              title="Open Record"
                                          >
                                              <Eye size={18} />
                                          </button>
                                          <button 
                                              onClick={(e) => { e.stopPropagation(); handleDownloadManual(entry.title); }}
                                              className="p-3 bg-rose-600 text-white rounded-2xl hover:bg-rose-700 shadow-lg shadow-rose-600/20 active:scale-90 transition-all flex items-center gap-2 group/btn"
                                          >
                                              {isDownloading === entry.title ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} className="group-hover/btn:translate-y-0.5 transition-transform" />}
                                              <span className="text-[10px] font-black uppercase tracking-widest pr-1">{entry.size}</span>
                                          </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center text-earth-300">
                            <Database size={64} className="mx-auto mb-6 opacity-20" />
                            <p className="text-xl font-serif italic text-earth-400">The whispers of the past are quiet. No archives match your query.</p>
                            <button onClick={() => setArchiveSearch('')} className="mt-6 text-rose-600 font-black uppercase text-xs tracking-widest hover:underline">Clear Search Filter</button>
                        </div>
                    )}
                </div>

                <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-16 shrink-0">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-rose-600" />
                        <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Integrated m(t) Historical Audit Path Enabled</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Archive Total</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">{ARCHIVE_ENTRIES.length} Records</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-earth-300 uppercase tracking-widest mb-1">Data Weight</p>
                            <p className="text-lg font-serif font-bold text-earth-900 dark:text-white">35.4 GB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* ARCHIVE RECORD DETAIL MODAL */}
      {selectedArchiveRecord && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-3xl animate-in fade-in duration-300 overflow-y-auto">
            <div className="bg-[#fdfcf9] dark:bg-earth-950 w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden border-4 border-rose-900/10 flex flex-col my-8 animate-in zoom-in-95">
                <div className="bg-[#3d1a1a] p-10 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><FileText size={200} /></div>
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                            <FileCheck size={28} className="text-rose-400" />
                        </div>
                        <div>
                            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2 inline-block">Historical Record Node</span>
                            <h3 className="text-3xl font-serif font-bold tracking-tight">{selectedArchiveRecord.title}</h3>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedArchiveRecord(null)}
                        className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 active:scale-90"
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="p-12 md:p-16">
                    <div className="grid lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8 space-y-12">
                            <section>
                                <h4 className="text-xs font-black text-rose-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                    <Database size={16} /> Record Transcription
                                </h4>
                                <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-inner relative group">
                                    <Quote size={48} className="absolute top-6 right-8 text-earth-100 dark:text-earth-800 pointer-events-none" />
                                    <p className="text-xl text-earth-700 dark:text-earth-300 leading-relaxed font-medium italic relative z-10">
                                        "{selectedArchiveRecord.fullContent}"
                                    </p>
                                </div>
                            </section>

                            <div className="bg-earth-50 dark:bg-earth-900/50 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800">
                                <h4 className="text-xs font-black text-rose-600 uppercase tracking-[0.3em] mb-6">Technical Specifications</h4>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {[
                                        { label: "Scan Quality", val: selectedArchiveRecord.meta.quality, icon: <Activity size={16}/> },
                                        { label: "Original Medium", val: selectedArchiveRecord.meta.medium, icon: <Feather size={16}/> },
                                        { label: "SHA-256 Hash", val: selectedArchiveRecord.meta.hash, icon: <Terminal size={16}/>, mono: true },
                                        { label: "Asset Size", val: selectedArchiveRecord.size, icon: <BoxIcon size={16}/> }
                                    ].map((spec, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="p-2.5 bg-white dark:bg-earth-800 rounded-xl shadow-sm text-earth-400 shrink-0">{spec.icon}</div>
                                            <div>
                                                <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest leading-none mb-1.5">{spec.label}</p>
                                                <p className={`text-sm font-bold text-earth-800 dark:text-earth-200 ${spec.mono ? 'font-mono text-xs opacity-60' : ''}`}>{spec.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                                <h4 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] mb-8 border-b border-earth-100 dark:border-earth-800 pb-4">Provenance Data</h4>
                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Region of Origin</p>
                                        <p className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-lg uppercase tracking-tight">
                                            <Globe size={18} className="text-blue-500" /> {selectedArchiveRecord.region}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Chronology</p>
                                        <p className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-lg">
                                            <Calendar size={18} className="text-agro-600" /> {selectedArchiveRecord.date}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-earth-400 uppercase mb-4">Metadata Tags</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedArchiveRecord.tags.map(t => (
                                                <span key={t} className="px-3 py-1 bg-earth-50 dark:bg-earth-800 text-[10px] font-black uppercase text-earth-500 rounded-lg">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleDownloadManual(selectedArchiveRecord.title)}
                                disabled={!!isDownloading}
                                className="w-full bg-rose-900 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-rose-900/20 hover:scale-[1.01] active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isDownloading === selectedArchiveRecord.title ? <Loader2 size={18} className="animate-spin" /> : <><FileDown size={20} /> Access Full Scan</>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
                    <ShieldAlert size={18} className="text-rose-600" />
                    <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Verified Historical Data Node • No Unauthorized Modifications</p>
                </div>
            </div>
        </div>
      )}

      {/* STORY READING MODAL */}
      {activeStory && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto">
              <div 
                  className="bg-[#fdfbf7] dark:bg-earth-950 w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-rose-900/20 flex flex-col my-8"
                  onClick={(e) => e.stopPropagation()}
              >
                  <div className="relative h-[450px] shrink-0">
                      <img src={activeStory.image} className="w-full h-full object-cover" alt={activeStory.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] dark:from-earth-950 via-[#fdfbf7]/20 to-transparent"></div>
                      <button 
                        onClick={() => setActiveStory(null)}
                        className="absolute top-10 right-10 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white backdrop-blur-md transition-all hover:rotate-90 active:scale-90"
                      >
                        <X size={28} />
                      </button>
                      <div className="absolute bottom-10 left-10 right-10">
                          <div className="flex flex-wrap gap-3 mb-6">
                              {activeStory.tags.map(t => <span key={t} className="bg-rose-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-700 shadow-xl">{t}</span>)}
                          </div>
                          <h2 className="text-5xl md:text-7xl font-serif font-bold text-earth-900 dark:text-white leading-[0.9] tracking-tighter mb-6">{activeStory.title}</h2>
                          <div className="flex items-center gap-6 text-[11px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-[0.3em]">
                              <span className="flex items-center gap-2"><User size={16} /> Narrated by {activeStory.author}</span>
                              <span className="flex items-center gap-2"><MapPin size={16} /> {activeStory.location}</span>
                          </div>
                      </div>
                  </div>

                  <div className="p-12 md:p-20 relative">
                      <div className="absolute -top-10 right-20 w-24 h-24 bg-rose-900 rounded-full flex items-center justify-center text-white shadow-2xl animate-float border-4 border-[#fdfbf7] dark:border-earth-950">
                          <Quote size={40} fill="currentColor" />
                      </div>
                      <div className="prose prose-lg prose-rose dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap text-2xl md:text-3xl font-serif italic text-earth-800 dark:text-earth-200 leading-[1.6] opacity-90 drop-shadow-sm">
                              {activeStory.content}
                          </div>
                      </div>
                      
                      <div className="mt-24 pt-10 border-t-2 border-rose-100 dark:border-rose-900/30 flex flex-col md:flex-row justify-between items-center gap-8">
                          <div className="flex gap-8">
                              <button className="flex items-center gap-3 text-sm font-black uppercase text-earth-400 hover:text-rose-600 transition-all group">
                                  <Heart size={24} className="group-hover:scale-110" /> Appreciation
                              </button>
                              <button className="flex items-center gap-3 text-sm font-black uppercase text-earth-400 hover:text-blue-600 transition-all group">
                                  <Share2 size={24} className="group-hover:scale-110" /> Propagate
                              </button>
                          </div>
                          <button 
                            onClick={() => setActiveStory(null)}
                            className="bg-rose-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                          >
                            Return to Feed
                          </button>
                      </div>
                  </div>
                  
                  <div className="p-10 bg-rose-50 dark:bg-rose-900/20 text-center border-t border-rose-100 dark:border-rose-900/50">
                      <p className="text-[10px] text-rose-800 dark:text-rose-300 font-black uppercase tracking-[0.4em]">Verified Archive Entry • ID: HER-{activeStory.id}-X</p>
                  </div>
              </div>
          </div>
      )}

      {/* TOPIC DETAIL MODAL */}
      {activeTopic && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 w-full max-w-3xl rounded-[3.5rem] shadow-2xl overflow-hidden border-2 border-earth-100 dark:border-earth-800 flex flex-col animate-in zoom-in-95">
                  <div className={`p-12 ${activeTopic.color} dark:bg-rose-950/20 relative overflow-hidden shrink-0 transition-all duration-500 ${topicView !== 'OVERVIEW' ? 'py-8' : 'py-12'}`}>
                      {/* Fix: Cast icon element to ReactElement with any props to allow 'size' property during cloneElement */}
                      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">{React.cloneElement(activeTopic.icon as React.ReactElement<any>, { size: 200 })}</div>
                      <button onClick={() => setActiveTopic(null)} className="absolute top-8 right-8 bg-white/40 hover:bg-white text-earth-900 p-2 rounded-full transition-all"><X size={24} /></button>
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                          <div className={`bg-white dark:bg-earth-800 rounded-[2rem] shadow-xl transition-all duration-500 ${topicView !== 'OVERVIEW' ? 'p-3 mb-2 scale-75' : 'p-6 mb-6'}`}>
                              {/* Fix: Cast icon element to ReactElement with any props to allow 'size' property during cloneElement */}
                              {React.cloneElement(activeTopic.icon as React.ReactElement<any>, { size: topicView !== 'OVERVIEW' ? 32 : 48 })}
                          </div>
                          <h3 className={`font-serif font-bold text-earth-900 dark:text-white leading-tight transition-all duration-500 ${topicView !== 'OVERVIEW' ? 'text-2xl' : 'text-4xl mb-2'}`}>{activeTopic.title}</h3>
                          {topicView === 'OVERVIEW' && <p className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-500 mb-6">Network Domain Node</p>}
                      </div>
                  </div>
                  
                  {/* Topic Tab Switcher */}
                  <div className="flex px-12 border-b border-earth-100 dark:border-earth-800 bg-white dark:bg-earth-900">
                      {[
                        { id: 'OVERVIEW', label: 'Overview', icon: <Info size={14}/> },
                        { id: 'THREADS', label: 'Threads', icon: <MessageCircle size={14}/> },
                        { id: 'DOCS', label: 'Documentation', icon: <FileText size={14}/> },
                        { id: 'DOWNLOADS', label: 'Downloads', icon: <Download size={14}/> }
                      ].map(t => (
                        <button 
                            key={t.id}
                            onClick={() => setTopicView(t.id as any)}
                            className={`px-5 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${topicView === t.id ? 'border-rose-600 text-rose-600' : 'border-transparent text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}
                        >
                            {t.icon} {t.label}
                        </button>
                      ))}
                  </div>

                  <div className="p-12 space-y-10 min-h-[400px] max-h-[550px] overflow-y-auto custom-scrollbar">
                      {topicView === 'OVERVIEW' && (
                        <div className="animate-in fade-in duration-500">
                            <section>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600 mb-4">Strategic Overview</h4>
                                <p className="text-xl text-earth-700 dark:text-earth-300 font-medium leading-relaxed">
                                    {activeTopic.detail}
                                </p>
                            </section>
                            
                            <div className="grid md:grid-cols-2 gap-6 mt-10">
                                <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-3xl border border-earth-100 dark:border-earth-700">
                                    <h5 className="font-bold text-earth-900 dark:text-white mb-3 flex items-center gap-2"><Star size={16} className="text-amber-500" /> Active Threads</h5>
                                    <p className="text-sm text-earth-600 dark:text-earth-400 mb-6">Explore communal data sharing and dialogue within this domain.</p>
                                    <button onClick={() => setTopicView('THREADS')} className="w-full bg-white dark:bg-earth-900 py-3 rounded-xl border-2 border-earth-100 dark:border-earth-700 text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all">Open Threads</button>
                                </div>
                                <div className="bg-agro-50 dark:bg-agro-900/10 p-6 rounded-3xl border border-agro-100 dark:border-agro-900/50">
                                    <h5 className="font-bold text-agro-900 dark:text-agro-200 mb-3 flex items-center gap-2"><Zap size={16} className="text-agro-600" /> Resource Access</h5>
                                    <p className="text-sm text-agro-800 dark:text-agro-400 mb-6">Technical manuals and standardized protocols linked to this category.</p>
                                    <button onClick={() => setTopicView('DOWNLOADS')} className="w-full bg-agro-600 text-white py-3 rounded-xl shadow-lg shadow-agro-600/20 text-xs font-black uppercase tracking-widest hover:bg-agro-700 transition-all">Download Manuals</button>
                                </div>
                            </div>
                        </div>
                      )}

                      {topicView === 'THREADS' && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Recent Discussions</h4>
                                <button className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700 shadow-lg shadow-rose-600/20"><Plus size={16}/></button>
                            </div>
                            {MOCK_THREADS.filter(t => t.topicId === activeTopic.id).map(thread => (
                                <div key={thread.id} className="p-5 bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 hover:shadow-md transition-all group cursor-pointer flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-earth-900 dark:text-white group-hover:text-rose-600 transition-colors">{thread.title}</h5>
                                        <p className="text-xs text-earth-400 mt-1">Started by {thread.author} • {thread.lastActive}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-earth-700 dark:text-earth-300 leading-none">{thread.replies}</p>
                                            <p className="text-[8px] font-black uppercase text-earth-400">Replies</p>
                                        </div>
                                        <ChevronRight size={18} className="text-earth-200 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                            {MOCK_THREADS.filter(t => t.topicId === activeTopic.id).length === 0 && (
                                <div className="text-center py-20 bg-earth-50 dark:bg-earth-800/30 rounded-3xl border-2 border-dashed border-earth-200 dark:border-earth-700">
                                    <MessageCircle size={48} className="mx-auto text-earth-200 mb-4 opacity-30" />
                                    <p className="text-earth-400 font-bold uppercase tracking-widest text-sm">No active threads in this domain</p>
                                    <button className="mt-6 bg-rose-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Start the first thread</button>
                                </div>
                            )}
                        </div>
                      )}

                      {topicView === 'DOCS' && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500 prose prose-rose dark:prose-invert max-w-none">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-2xl text-rose-600">
                                    <Library size={24} />
                                </div>
                                <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white m-0">Framework Documentation</h4>
                            </div>
                            <div className="text-lg text-earth-700 dark:text-earth-300 leading-relaxed italic border-l-4 border-rose-600 pl-8 py-2 mb-10">
                                {activeTopic.fullDoc}
                            </div>
                            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                <Terminal className="absolute top-0 right-0 p-8 opacity-5" size={200} />
                                <h5 className="font-bold text-agro-400 flex items-center gap-2 mb-4"><ShieldCheck size={18}/> Technical Validation</h5>
                                <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                                    All procedural knowledge in this domain has been cross-referenced with the Global Resilience Ledger and adheres to current FAO Sustainability Guidelines. 
                                    <br/><br/>
                                    <strong>Last Audit Hash:</strong> <span className="font-mono text-[10px] text-blue-400">ea-7742-heritage-topic-{activeTopic.id}</span>
                                </p>
                            </div>
                        </div>
                      )}

                      {topicView === 'DOWNLOADS' && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600 mb-6">Standardized Manuals</h4>
                            <div className="grid gap-4">
                                {activeTopic.manuals.map(manual => (
                                    <div key={manual.name} className="p-5 bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-earth-50 dark:bg-earth-950/30 rounded-xl text-earth-400 group-hover:text-blue-600 transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-earth-900 dark:text-white text-sm">{manual.name}</h5>
                                                <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest mt-0.5">{manual.size}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDownloadManual(manual.name)}
                                            disabled={!!isDownloading}
                                            className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90 disabled:opacity-50"
                                        >
                                            {isDownloading === manual.name ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 bg-earth-50 dark:bg-earth-800/30 rounded-[2.5rem] text-center border-2 border-dashed border-earth-200 dark:border-earth-700 mt-8">
                                <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed font-medium">
                                    Downloading these assets increases your local **Integrity (In)** coefficient. Ensure you synchronize your device with the Network Node after review.
                                </p>
                            </div>
                        </div>
                      )}
                  </div>

                  <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-12 shrink-0">
                      <div className="flex items-center gap-3">
                        <Info size={18} className="text-earth-400" />
                        <span className="text-[10px] font-black text-earth-500 dark:text-earth-400 uppercase tracking-widest">Authorized Network Information</span>
                      </div>
                      <button 
                        onClick={() => setTopicView('DOCS')} 
                        className={`text-[10px] font-black uppercase tracking-widest hover:underline ${topicView === 'DOCS' ? 'text-earth-400 cursor-default no-underline' : 'text-rose-600'}`}
                        disabled={topicView === 'DOCS'}
                      >
                        Full Documentation
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

// Helper Icons
function SproutIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1.7-1.3 2.9-3.3 3-5.5a7 7 0 0 0-6.2 2.9z"/></svg>; }
function CloudRainIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>; }
function HeartIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>; }
function BoxIcon({ size }: { size: number }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
}
