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

export const AgBiz: React.FC<AgBizProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => onNavigate(View.HOME)}
          className="flex items-center gap-2 text-gray-500 hover:text-agro-600 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
      <AgBizHero />
      <FeaturedArticle />
      <MarketBriefing />
      <AnalysisReports />
      <AgBizNewsletter />
    </div>
  );
};