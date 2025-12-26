import React from 'react';
import { User, View } from '../types';
import { CommunityHeader } from './community/CommunityHeader';
import { ForumHighlights } from './community/ForumHighlights';
import { FeaturedMembers } from './community/FeaturedMembers';
import { Cta } from './Cta';
import { NewsFeed } from './community/NewsFeed';
import { UpcomingEvents } from './community/UpcomingEvents';
import { MemberSpotlight } from './community/MemberSpotlight';

interface CommunityProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onAwardEac: (amount: number) => void; // Although not used, it's good to keep for consistency
}

export const Community: React.FC<CommunityProps> = ({ user, onNavigate }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <CommunityHeader />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <NewsFeed />
              <ForumHighlights />
              <UpcomingEvents />
            </div>
            <div className="space-y-8">
              <FeaturedMembers />
              <MemberSpotlight />
            </div>
          </div>
        </div>
      </div>
      {!user && (
        <Cta 
          title="Join the Conversation"
          subtitle="Create an account to post, comment, and connect with other members of the AgriInnovate community."
          buttonText="Sign Up Now"
          onClick={() => onNavigate(View.SIGN_UP)}
        />
      )}
    </div>
  );
};