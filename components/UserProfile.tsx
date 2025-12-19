import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { 
  User as UserIcon, MapPin, Calendar, Mail, Edit2, Save, X, 
  ShieldCheck, Sprout, QrCode, Fingerprint, Activity, BookOpen, Briefcase, Coins
} from 'lucide-react';

interface UserProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location || '',
    bio: user.bio || '',
    avatar: user.avatar || ''
  });

  // Sync state with props if user changes
  useEffect(() => {
    setFormData({
        name: user.name,
        location: user.location || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
    });
  }, [user]);

  const handleCancel = () => {
    // Revert changes to original user data
    setFormData({
        name: user.name,
        location: user.location || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
    });
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: formData.name,
      location: formData.location,
      bio: formData.bio,
      avatar: formData.avatar
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Identity Card & Stats */}
        <div className="space-y-8">
          
          {/* Digital ID Card */}
          <div className="bg-white dark:bg-earth-900 p-6 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800 transition-colors">
             <h3 className="font-bold text-earth-900 dark:text-earth-100 mb-4 flex items-center gap-2">
                <Fingerprint className="text-agro-600" /> Digital Identity
             </h3>
             
             <div className="w-full bg-gradient-to-br from-agro-800 to-agro-900 rounded-2xl overflow-hidden shadow-lg relative text-white aspect-[1.58/1]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <img src="https://picsum.photos/600/400?grayscale" className="w-full h-full object-cover" alt="ID Background" />
                </div>
                
                {/* Header */}
                <div className="relative z-10 p-4 flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Sprout size={20} className="text-agro-400" />
                        <span className="font-serif font-bold tracking-tight text-sm">EnvirosAgro</span>
                      </div>
                      <div className="bg-white/20 p-1 rounded-lg">
                        <QrCode size={16} />
                      </div>
                </div>

                {/* Content */}
                <div className="relative z-10 px-4 mt-2 flex gap-3">
                      <div className="w-16 h-16 bg-white rounded-lg p-0.5 shrink-0 overflow-hidden">
                        {user.avatar ? (
                            <img src={user.avatar} className="w-full h-full object-cover rounded" alt="Avatar" />
                        ) : (
                            <div className="w-full h-full bg-earth-200 flex items-center justify-center rounded text-earth-400">
                                <UserIcon size={24} />
                            </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[8px] text-agro-300 uppercase tracking-wider font-bold">Member Name</p>
                        <h4 className="font-bold text-base leading-tight mb-1 truncate">{user.name}</h4>
                        <p className="text-[10px] text-agro-200 truncate">{user.location || 'Location Not Set'}</p>
                        
                        <div className="mt-2">
                            <p className="text-[8px] text-agro-300 uppercase tracking-wider font-bold">ESIN Number</p>
                            <p className="font-mono text-xs text-agro-100 tracking-wider">{user.esin || 'PENDING-REG'}</p>
                        </div>
                      </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 p-3 mt-auto border-t border-white/10 flex justify-between items-end absolute bottom-0 w-full">
                    <div>
                        <p className="text-[8px] text-agro-400">Sustainability Framework Member</p>
                    </div>
                    <ShieldCheck size={16} className="text-agro-400" />
                </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-xs text-earth-500 dark:text-earth-400">
               <span>Status: <strong className="text-green-600 dark:text-green-400">Active</strong></span>
               <span>Member Since: <strong>{user.joinedDate || '2024'}</strong></span>
            </div>
          </div>

          {/* Tokenz Wallet */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-3xl shadow-sm border border-amber-100 dark:border-amber-900/50 transition-colors">
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                   <Coins className="text-amber-600 dark:text-amber-500" /> Tokenz Wallet
                </h3>
                <span className="bg-white dark:bg-amber-900/50 px-2 py-1 rounded text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                   ESIN Linked
                </span>
             </div>
             <div className="text-3xl font-serif font-bold text-amber-800 dark:text-amber-200 mb-1">{user.eacBalance || 0} EAC</div>
             <p className="text-xs text-amber-600 dark:text-amber-400 mb-4">≈ ${((user.eacBalance || 0) * 0.1).toFixed(2)} USD</p>
             
             <div className="space-y-2">
                <div className="flex justify-between text-xs text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800/50 pb-1">
                   <span>Wallet Address</span>
                   <span className="font-mono">{user.esin || 'N/A'}</span>
                </div>
             </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-earth-900 p-6 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800 transition-colors">
             <h3 className="font-bold text-earth-900 dark:text-earth-100 mb-4">Sustainability Impact</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-sm text-earth-600 dark:text-earth-400">Sustainability Score C(a)</span>
                   <span className="font-serif font-bold text-agro-700 dark:text-agro-400 text-xl">2.4</span>
                </div>
                <div className="w-full bg-earth-100 dark:bg-earth-800 rounded-full h-2">
                   <div className="bg-agro-500 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <div className="pt-4 border-t border-earth-100 dark:border-earth-800 flex gap-4 text-center">
                   <div className="flex-1">
                      <div className="text-lg font-bold text-earth-900 dark:text-white">12</div>
                      <div className="text-xs text-earth-500 dark:text-earth-400">Datasets</div>
                   </div>
                   <div className="flex-1 border-l border-earth-100 dark:border-earth-800">
                      <div className="text-lg font-bold text-earth-900 dark:text-white">5</div>
                      <div className="text-xs text-earth-500 dark:text-earth-400">Courses</div>
                   </div>
                   <div className="flex-1 border-l border-earth-100 dark:border-earth-800">
                      <div className="text-lg font-bold text-earth-900 dark:text-white">3</div>
                      <div className="text-xs text-earth-500 dark:text-earth-400">Certificates</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Middle & Right: Details and Activity */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Profile Header & Edit */}
           <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800 relative transition-colors">
              <div className="absolute top-6 right-6">
                 {!isEditing ? (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-agro-600 dark:text-agro-400 font-bold text-sm hover:bg-agro-50 dark:hover:bg-agro-900/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <Edit2 size={16} /> Edit Profile
                    </button>
                 ) : (
                    <button 
                        onClick={handleCancel}
                        className="flex items-center gap-2 text-earth-400 font-bold text-sm hover:bg-earth-50 dark:hover:bg-earth-800 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <X size={16} /> Cancel
                    </button>
                 )}
              </div>

              {isEditing ? (
                 <form onSubmit={handleSave} className="space-y-6 max-w-lg">
                    <h2 className="text-2xl font-bold text-earth-900 dark:text-white mb-6">Edit Profile</h2>
                    
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-earth-700 dark:text-earth-300">Full Name</label>
                       <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full border border-earth-200 dark:border-earth-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50 dark:bg-earth-800 text-earth-900 dark:text-white"
                       />
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-earth-700 dark:text-earth-300">Location</label>
                       <input 
                          type="text" 
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full border border-earth-200 dark:border-earth-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50 dark:bg-earth-800 text-earth-900 dark:text-white"
                          placeholder="e.g. Nairobi, Kenya"
                       />
                    </div>

                    <div className="space-y-1">
                       <label className="text-sm font-bold text-earth-700 dark:text-earth-300">Avatar URL</label>
                       <div className="flex gap-2">
                           <input 
                              type="text" 
                              value={formData.avatar}
                              onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                              className="w-full border border-earth-200 dark:border-earth-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50 dark:bg-earth-800 text-earth-900 dark:text-white"
                              placeholder="https://..."
                           />
                           <div className="w-12 h-12 rounded-lg bg-earth-100 dark:bg-earth-800 shrink-0 overflow-hidden border border-earth-200 dark:border-earth-700">
                               {formData.avatar && <img src={formData.avatar} className="w-full h-full object-cover" alt="Preview" />}
                           </div>
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-sm font-bold text-earth-700 dark:text-earth-300">Bio / Description</label>
                       <textarea 
                          rows={4}
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          className="w-full border border-earth-200 dark:border-earth-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-earth-50 dark:bg-earth-800 text-earth-900 dark:text-white"
                          placeholder="Tell us about your farming practices..."
                       />
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="flex-1 bg-white dark:bg-transparent border border-earth-200 dark:border-earth-700 text-earth-600 dark:text-earth-300 font-bold px-6 py-3 rounded-xl hover:bg-earth-50 dark:hover:bg-earth-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 bg-agro-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-agro-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                 </form>
              ) : (
                 <>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-earth-100 dark:bg-earth-800 rounded-full flex items-center justify-center text-earth-400 dark:text-earth-500 text-3xl font-serif overflow-hidden">
                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-earth-900 dark:text-white">{user.name}</h2>
                            <p className="text-agro-600 dark:text-agro-400 font-bold text-sm uppercase tracking-wide">{user.role}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center gap-3 text-earth-600 dark:text-earth-300">
                            <MapPin size={20} className="text-earth-400" />
                            <span>{user.location || 'No location set'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-earth-600 dark:text-earth-300">
                            <Mail size={20} className="text-earth-400" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-earth-600 dark:text-earth-300">
                            <Calendar size={20} className="text-earth-400" />
                            <span>Joined {user.joinedDate}</span>
                        </div>
                    </div>

                    <div className="bg-earth-50 dark:bg-earth-800 p-6 rounded-2xl border border-earth-100 dark:border-earth-700">
                        <h4 className="font-bold text-earth-900 dark:text-earth-100 mb-2">About</h4>
                        <p className="text-earth-600 dark:text-earth-300 leading-relaxed italic">
                            {user.bio || "No bio added yet. Click edit to tell the community about your agricultural journey."}
                        </p>
                    </div>
                 </>
              )}
           </div>

           {/* Activity Feed */}
           <div>
              <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-2">
                 <Activity className="text-earth-400" /> Recent Activity
              </h3>
              
              <div className="space-y-4">
                 <div className="bg-white dark:bg-earth-900 p-4 rounded-xl border border-earth-100 dark:border-earth-800 flex gap-4 items-start transition-colors">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 mt-1">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <p className="text-earth-900 dark:text-earth-100 font-medium">Downloaded "Sustainable Pest Control Strategies"</p>
                        <p className="text-xs text-earth-500 dark:text-earth-400">2 days ago • Environmental Agriculture</p>
                    </div>
                 </div>

                 <div className="bg-white dark:bg-earth-900 p-4 rounded-xl border border-earth-100 dark:border-earth-800 flex gap-4 items-start transition-colors">
                    <div className="bg-rose-50 dark:bg-rose-900/30 p-2 rounded-lg text-rose-600 dark:text-rose-400 mt-1">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <p className="text-earth-900 dark:text-earth-100 font-medium">Applied for "Sustainable Farming Consultant"</p>
                        <p className="text-xs text-earth-500 dark:text-earth-400">1 week ago • GreenEarth Advisory</p>
                    </div>
                 </div>

                 <div className="bg-white dark:bg-earth-900 p-4 rounded-xl border border-earth-100 dark:border-earth-800 flex gap-4 items-start transition-colors">
                    <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400 mt-1">
                        <Sprout size={20} />
                    </div>
                    <div>
                        <p className="text-earth-900 dark:text-earth-100 font-medium">Completed "Introduction to Regenerative Ag" Module</p>
                        <p className="text-xs text-earth-500 dark:text-earth-400">2 weeks ago • EnvirosAgro Academy</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};