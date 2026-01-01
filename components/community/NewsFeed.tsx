import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { Newspaper, Clock, ExternalLink, Zap, Sprout, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    timestamp: Timestamp;
    author: string;
    image?: string;
}

export const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for community news/announcements
    const q = query(collection(db, 'news'), orderBy('timestamp', 'desc'), limit(5));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as NewsItem[];
        setNews(items);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const MOCK_NEWS: NewsItem[] = [
    {
        id: '1',
        title: "Cluster Alpha Achieves +15% Soil Integrity",
        excerpt: "Recent results from the EA Thrust implementation in the Central Highlands show a significant uptick in microbial activity.",
        category: "ENVIRONMENTAL",
        author: "Lead Node Analyst",
        timestamp: Timestamp.now()
    },
    {
        id: '2',
        title: "ScaleUp Summit 2024: Registration Open",
        excerpt: "Secure your delegation seat for the biggest industrial agriculture event of the year.",
        category: "INDUSTRIAL",
        author: "Events Terminal",
        timestamp: Timestamp.now()
    }
  ];

  const displayNews = news.length > 0 ? news : MOCK_NEWS;

  return (
    <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] p-8 md:p-10 border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-black text-earth-900 dark:text-white flex items-center gap-3">
          <Newspaper className="text-agro-600" /> Ecosystem Dispatch
        </h2>
        <div className="flex gap-2">
            <span className="bg-agro-50 dark:bg-agro-900/30 text-agro-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-agro-100 dark:border-agro-800">Live Link</span>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
            {displayNews.map((item, i) => (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item.id} 
                    className="group border-b border-earth-50 dark:border-earth-800 last:border-0 pb-6 last:pb-0"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                            item.category === 'ENVIRONMENTAL' ? 'bg-green-50 text-green-600 border border-green-100' :
                            item.category === 'INDUSTRIAL' ? 'bg-slate-50 text-slate-600 border border-slate-100' :
                            'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                            {item.category}
                        </span>
                        <span className="text-[10px] text-earth-400 font-medium flex items-center gap-1">
                            <Clock size={12} /> {item.timestamp.toDate().toLocaleDateString()}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-earth-900 dark:text-white group-hover:text-agro-600 transition-colors leading-tight mb-2">
                        {item.title}
                    </h3>
                    <p className="text-sm text-earth-500 dark:text-earth-400 line-clamp-2 leading-relaxed">
                        {item.excerpt}
                    </p>
                    <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-agro-600 hover:underline">
                        Read Analysis <ExternalLink size={12} />
                    </button>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {loading && news.length === 0 && (
          <div className="py-10 text-center flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-earth-100 border-t-agro-500 rounded-full animate-spin"></div>
             <p className="text-[10px] font-black text-earth-400 uppercase tracking-[0.3em]">Synchronizing Stream...</p>
          </div>
      )}
    </div>
  );
};
