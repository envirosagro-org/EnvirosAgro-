
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CommunityHeader } from './community/CommunityHeader';
import { FeaturedMembers } from './community/FeaturedMembers';
import { Cta } from '../Cta';
import { IdCard } from './community/IdCard';
import { RegisterGroup } from './community/RegisterGroup';
import { CreatePost } from './community/CreatePost';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Plus } from 'lucide-react';
import { navItems } from './community/navigation';
import FeedTab from './community/tabs/FeedTab';
import ForumTab from './community/tabs/ForumTab';
import EsinTab from './community/tabs/EsinTab';
import EventsTab from './community/tabs/EventsTab';
import { useNavigate } from 'react-router-dom';
import { View } from '../../types';

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [esinStep, setEsinStep] = useState(1);
  const [activeTab, setActiveTab] = useState('feed');
  const [isRegisteringGroup, setIsRegisteringGroup] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleEsinGenerated = (esin: string) => {
    // The user object from useAuth is not directly mutable.
    // To update the user's ESIN, you would typically have a function
    // in your AuthContext that handles updating user data in your backend
    // and then refreshes the user state.
  };
  
  const handleNavigate = (view: View) => {
    // This will be replaced with react-router navigation
    const path = view.toLowerCase().replace(/_/g, '-');
    navigate(`/${path}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedTab />;
      case 'forum':
        return <ForumTab />;
      case 'get-esin':
        return <EsinTab esinStep={esinStep} setEsinStep={setEsinStep} setActiveTab={setActiveTab} onEsinGenerated={handleEsinGenerated} />;
      case 'events':
        return <EventsTab onNavigate={handleNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-earth-950 min-h-screen">
      <CommunityHeader />
      
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="flex flex-col xl:flex-row gap-12">
          
          <aside className="xl:w-[380px] space-y-8">
            {/* ... (rest of the aside content) */}
          </aside>

          <main className="flex-1 space-y-12">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                {/* ... (rest of the search and actions) */}
            </div>
            
            <AnimatePresence>
                {isCreatingPost && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                  >
                    <CreatePost 
                      user={user!} 
                      onClose={() => setIsCreatingPost(false)} 
                      onPostCreated={() => { /* can add a refetch here */ }}
                    />
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
              {isRegisteringGroup && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                >
                  <RegisterGroup user={user!} onGroupRegistered={() => setIsRegisteringGroup(false)} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="animate-in fade-in duration-700">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>

      {!user && (
        <Cta 
          title="Join the Global Network"
          subtitle="Secure your ESIN and unlock access to the full EnvirosAgro ecosystem and community intelligence."
          buttonText="Register Intelligence Node"
          onClick={() => handleNavigate(View.SIGN_UP)}
        />
      )}
    </div>
  );
};

export default Community;
