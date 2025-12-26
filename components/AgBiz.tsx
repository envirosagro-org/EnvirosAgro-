import React from 'react';
import { AgBizHero } from './agbiz/AgBizHero';
import { FeaturedArticle } from './agbiz/FeaturedArticle';
import { MarketBriefing } from './agbiz/MarketBriefing';
import { AnalysisReports } from './agbiz/AnalysisReports';
import { AgBizNewsletter } from './agbiz/AgBizNewsletter';

export const AgBiz: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <AgBizHero />
      <FeaturedArticle />
      <MarketBriefing />
      <AnalysisReports />
      <AgBizNewsletter />
    </div>
  );
};