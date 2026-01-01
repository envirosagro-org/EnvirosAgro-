
import React, { useState } from 'react';
import { User, View } from '../types';
import { CommunityHeader } from './community/CommunityHeader';
import { ForumHighlights } from './community/ForumHighlights';
import { FeaturedMembers } from './community/FeaturedMembers';
import { Cta } from './Cta';
import { NewsFeed } from './community/NewsFeed';
import { UpcomingEvents } from './community/UpcomingEvents';
import { MemberSpotlight } from './community/MemberSpotlight';
import { GetESIN } from './community/GetESIN';
import { IdCard } from './community/IdCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; // Assuming you have a Tabs component

interface CommunityProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onAwardEac?: (amount: number) => void;
}

export const Community: React.FC<CommunityProps> = ({ user, onNavigate }) => {
  const [esinStep, setEsinStep] = useState(1);
  const [activeTab, setActiveTab] = useState('feed');
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  const handleEsinGenerated = (esin: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, esin });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <CommunityHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Profile Area */}
          <div className="md:w-1/3 space-y-8">
            <IdCard user={currentUser} />
            
            <div className="bg-white dark:bg-earth-900 rounded-[2rem] p-6 shadow-sm border border-earth-100 dark:border-earth-800">
              <h3 className="text-lg font-bold mb-4">Registration Portal</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveTab('get-esin')}
                  className={`w-full py-3 px-4 rounded-xl text-left font-semibold transition-colors ${activeTab === 'get-esin' ? 'bg-agro-600 text-white' : 'bg-earth-50 dark:bg-earth-800 hover:bg-earth-100 dark:hover:bg-earth-700'}`}
                >
                  Register for ESIN
                </button>
                <button 
                  onClick={() => setActiveTab('id-card')}
                  className={`w-full py-3 px-4 rounded-xl text-left font-semibold transition-colors ${activeTab === 'id-card' ? 'bg-agro-600 text-white' : 'bg-earth-50 dark:bg-earth-800 hover:bg-earth-100 dark:hover:bg-earth-700'}`}
                >
                  Digital ID Portal
                </button>
                <button 
                  onClick={() => setActiveTab('feed')}
                  className={`w-full py-3 px-4 rounded-xl text-left font-semibold transition-colors ${activeTab === 'feed' ? 'bg-agro-600 text-white' : 'bg-earth-50 dark:bg-earth-800 hover:bg-earth-100 dark:hover:bg-earth-700'}`}
                >
                  Community Feed
                </button>
              </div>
            </div>

            <FeaturedMembers />
            <MemberSpotlight />
          </div>

          {/* Main Content Area */}
          <div className="md:w-2/3 space-y-8">
            {activeTab === 'feed' && (
              <>
                <NewsFeed />
                <ForumHighlights />
                <UpcomingEvents />
              </>
            )}

            {activeTab === 'get-esin' && (
              <GetESIN 
                esinStep={esinStep} 
                setEsinStep={setEsinStep} 
                setActiveTab={setActiveTab} 
                onEsinGenerated={handleEsinGenerated} 
              />
            )}

            {activeTab === 'id-card' && (
              <div className="bg-white dark:bg-earth-900 rounded-[2rem] p-8 shadow-sm border border-earth-100 dark:border-earth-800">
                <h2 className="text-2xl font-bold mb-6">Your Digital Identity</h2>
                <IdCard user={currentUser} />
                <div className="mt-8 p-6 bg-earth-50 dark:bg-earth-800 rounded-2xl">
                  <h4 className="font-bold mb-2">About EnvirosAgro ID</h4>
                  <p className="text-sm text-earth-600 dark:text-earth-400 leading-relaxed">
                    Your EnvirosAgro Digital ID is a secure, verifiable identifier linked to your ESIN (Environmental Sustainability Identification Number). It allows you to participate in our ecosystem, track your impact, and access exclusive community features.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!currentUser && (
        <Cta 
          title="Join the Conversation"
          subtitle="Create an account to post, comment, and connect with other members of the EnvirosAgro community."
          buttonText="Sign Up Now"
          onClick={() => onNavigate(View.SIGN_UP)}
        />
      )}
    </div>
  );
};
