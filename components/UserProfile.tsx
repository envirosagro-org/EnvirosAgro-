
import React, { useState } from 'react';
import { User } from '../types';
import { IdCard } from './community/IdCard';
import { GetESIN } from './community/GetESIN';

interface UserProfileProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser }) => {
  const [showIdCard, setShowIdCard] = useState(false);
  const [esinStep, setEsinStep] = useState(1);

  const handleEsinGenerated = (esin: string) => {
    if (user) {
      onUpdateUser({ ...user, esin });
    }
  };

  const handleSetActiveTab = (tab: any) => {
    // This function is passed to GetESIN, but it's not clear
    // what it should do in the context of UserProfile.
    // For now, it will just log the tab to the console.
    console.log('Set active tab to:', tab);
    // When an ESIN is generated, we want to show the ID card.
    if(tab === 'ID_CARD') {
      setShowIdCard(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div className="space-y-4">
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <hr />
          {user.esin ? (
            <div>
              <p><strong>ESIN:</strong> {user.esin}</p>
              <button
                onClick={() => setShowIdCard(!showIdCard)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {showIdCard ? 'Hide' : 'Show'} ID Card
              </button>
              {showIdCard && <IdCard user={user} />}
            </div>
          ) : (
            <GetESIN 
              esinStep={esinStep} 
              setEsinStep={setEsinStep} 
              setActiveTab={handleSetActiveTab} 
              onEsinGenerated={handleEsinGenerated} 
            />
          )}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};
