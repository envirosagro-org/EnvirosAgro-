
import React from 'react';
import { NewsFeed } from '../NewsFeed';
import { UpcomingEvents } from '../UpcomingEvents';
import { MemberSpotlight } from '../MemberSpotlight';

const FeedTab = () => {
  return (
    <div className="space-y-12">
      <NewsFeed />
      <div className="grid lg:grid-cols-2 gap-8">
        <UpcomingEvents />
        <MemberSpotlight />
      </div>
    </div>
  );
};

export default FeedTab;
