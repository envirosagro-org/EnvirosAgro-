import React from 'react';
import { AgBizHero } from './agbiz/AgBizHero';
import { FeaturedArticle } from './agbiz/FeaturedArticle';
import { MarketBriefing } from './agbiz/MarketBriefing';
import { AnalysisReports } from './agbiz/AnalysisReports';
import { AgBizNewsletter } from './agbiz/AgBizNewsletter';
import { ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface AgBizProps {
  onNavigate: (view: View) => void;
}

const AgBiz: React.FC<AgBizProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
       <header className="bg-white dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
             <button 
              onClick={() => onNavigate(View.HOME)}
              className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">AgBiz Intelligence</h1>
           </div>
         </div>
       </header>
      
      <main>
        <AgBizHero />
        <FeaturedArticle />
        <MarketBriefing />
        <AnalysisReports />
        <AgBizNewsletter />
      </main>
    </div>
  );
};

export default AgBiz;