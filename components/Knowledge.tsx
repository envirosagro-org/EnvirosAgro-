import React from 'react';
import { KnowledgeHeader } from './knowledge/KnowledgeHeader';
import { ArticleList } from './knowledge/ArticleList';
import { Tutorials } from './knowledge/Tutorials';
import { CaseStudies } from './knowledge/CaseStudies';

export const Knowledge: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KnowledgeHeader />
        <div className="mt-8">
          <ArticleList />
          <Tutorials />
          <CaseStudies />
        </div>
      </div>
    </div>
  );
};