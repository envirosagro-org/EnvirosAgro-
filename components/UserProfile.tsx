import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { 
  User as UserIcon, MapPin, Calendar, Mail, Edit2, Save, X, 
  ShieldCheck, Sprout, QrCode, Fingerprint, Activity, BookOpen, Briefcase, Coins,
  Camera, Upload, Crop, Check, Loader2, RotateCcw, Image as ImageIcon,
  ArrowUpRight, CheckCircle2, Cloud, Zap
} from 'lucide-react';

interface UserProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const getCroppedImg = (imageSrc: string, pixelCrop: { x: number, y: number, width: number, height: number }): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No 2d context');
      canvas.width = 400;
      canvas.height = 400;
      ctx.beginPath();
      ctx.arc(200, 200, 200, 0, Math.PI * 2, true);
      ctx.clip();
      ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, 400, 400);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    image.onerror = (error) => reject(error);
  });
};

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImageStudio, setShowImageStudio] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location || '',
    bio: user.bio || '',
    avatar: user.avatar || ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({
        name: user.name,
        location: user.location || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
    });
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setTempImage(reader.result as string);
            setShowImageStudio(true);
        };
        reader.readAsDataURL(file);
    }
  };

  const finalizeImage = async () => {
    if (!tempImage) return;
    setIsProcessing(true);
    try {
        const img = new Image();
        img.src = tempImage;
        await new Promise(r => img.onload = r);
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        const cropped = await getCroppedImg(tempImage, { x, y, width: size, height: size });
        setFormData(prev => ({ ...prev, avatar: cropped }));
        setShowImageStudio(false);
        setTempImage(null);
    } catch (err) {
        console.error("Image Processing Error:", err);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleCancel = () => {
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
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      
      {/* 1. IMAGE STUDIO MODAL */}
      {showImageStudio && tempImage && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-white dark:bg-earth-900 w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col">
                <div className="bg-agro-900 p-8 text-white flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Crop size={150} /></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-serif font-bold tracking-tight">Image Studio</h3>
                        <p className="text-xs text-agro-300 font-black uppercase tracking-widest mt-1">Circular Crop & Optimization</p>
                    </div>
                    <button onClick={() => setShowImageStudio(false)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-10 flex flex-col items-center">
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-agro-500 shadow-2xl mb-10 group">
                        <img src={tempImage} className="w-full h-full object-cover" alt="To Crop" />
                        <div className="absolute inset-0 border-[20px] border-black/40 pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full border-2 border-white/50 rounded-full"></div>
                        </div>
                    </div>
                    <div className="w-full space-y-6">
                        <p className="text-sm text-center text-earth-500 dark:text-earth-400 font-medium">
                            Your image will be automatically centered and scaled to network standards (400x400px).
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => fileInputRef.current?.click()} className="bg-earth-50 dark:bg-earth-800 text-earth-700 dark:text-earth-300 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-earth-100 dark:border-earth-700 flex items-center justify-center gap-2 hover:bg-earth-100 transition-all">
                                <RotateCcw size={16} /> Reselect
                            </button>
                            <button onClick={finalizeImage} disabled={isProcessing} className="bg-agro-600 hover:bg-agro-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50">
                                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <><Check size={16} /> Apply Crop</>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
                    <ShieldCheck size={18} className="text-agro-600" />
                    <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Digital Asset Standardization Active</p>
                </div>
            </div>
        </div>
      )}

      {/* 2. MAIN PROFILE LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          <div className="bg-white dark:bg-earth-900 p-6 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 transition-colors">
             <h3 className="font-bold text-earth-900 dark:text-earth-100 mb-6 flex items-center gap-2">
                <Fingerprint className="text-agro-600" /> Digital Identity
             </h3>
             <div className="w-full bg-gradient-to-br from-agro-800 to-agro-950 rounded-[2rem] overflow-hidden shadow-2xl relative text-white aspect-[1.58/1] group">
                <div className="absolute inset-0 opacity-10">
                    <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600" className="w-full h-full object-cover" alt="ID Background" />
                </div>
                <div className="relative z-10 p-5 flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Sprout size={24} className="text-agro-400" />
                        <span className="font-serif font-bold tracking-tight text-lg">EnvirosAgro</span>
                      </div>
                      <div className="bg-white/20 p-2 rounded-xl border border-white/10 backdrop-blur-sm shadow-xl">
                        <QrCode size={20} />
                      </div>
                </div>
                <div className="relative z-10 px-6 mt-2 flex gap-6">
                      <div className="relative group/avatar">
                          <div className="w-24 h-24 bg-white dark:bg-earth-800 rounded-3xl p-1 shrink-0 overflow-hidden shadow-2xl border-2 border-white/20">
                            {formData.avatar ? (
                                <img src={formData.avatar} className="w-full h-full object-cover rounded-2xl" alt="Avatar" />
                            ) : (
                                <div className="w-full h-full bg-earth-200 dark:bg-earth-700 flex items-center justify-center rounded-2xl text-earth-400">
                                    <UserIcon size={40} />
                                </div>
                            )}
                          </div>
                          <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-agro-600 text-white p-2.5 rounded-2xl shadow-xl hover:bg-agro-700 transition-all active:scale-90 border-4 border-white dark:border-earth-900 opacity-0 group-hover/avatar:opacity-100">
                            <Camera size={16} />
                          </button>
                      </div>
                      <div className="overflow-hidden flex-1 flex flex-col justify-center">
                        <p className="text-[9px] text-agro-400 uppercase tracking-widest font-black mb-1">Authenticated Node</p>
                        <h4 className="font-bold text-xl leading-tight mb-1 truncate">{user.name}</h4>
                        <p className="text-xs text-agro-200 truncate opacity-60">{user.location || 'Loc: STANDBY'}</p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-[9px] text-agro-400 uppercase tracking-widest font-black">Network Registry</p>
                            <p className="font-mono text-xs text-agro-100 tracking-[0.2em]">{user.esin || 'EA-PENDING-2024'}</p>
                        </div>
                      </div>
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[8px] font-black uppercase text-agro-500 tracking-[0.3em]">m(t) Resilience Member</span>
                    <ShieldCheck size={18} className="text-agro-400" />
                </div>
            </div>
            
            {/* Added Professional Cloud Badge */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 text-white rounded-lg"><Cloud size={16} /></div>
                    <div>
                        <p className="text-[10px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-widest">Workers Cloud</p>
                        <p className="text-[9px] font-bold text-blue-500">Professional Node Active</p>
                    </div>
                </div>
                <CheckCircle2 size={16} className="text-blue-600" />
            </div>

            <div className="mt-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-earth-400">
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Node Status: Active</span>
               <span>{user.joinedDate || 'Est. 2024'}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/20 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/50 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700"><Coins size={120} /></div>
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                    <h3 className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-3">
                        <Coins className="text-amber-600" size={24} /> Tokenz Wallet
                    </h3>
                    <span className="bg-white dark:bg-amber-900/40 px-3 py-1 rounded-full text-[9px] font-black text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        SYNCED
                    </span>
                </div>
                <div className="text-5xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-2 tracking-tighter">{user.eacBalance || 0} <span className="text-lg font-sans font-black opacity-40 uppercase">EAC</span></div>
                <p className="text-sm text-amber-700 dark:text-amber-400 font-bold mb-8">≈ ${((user.eacBalance || 0) * 0.1).toFixed(2)} Capital Reserve</p>
                <button className="w-full bg-white dark:bg-earth-800 text-amber-700 dark:text-amber-400 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800 hover:bg-amber-50 transition-all flex items-center justify-center gap-2">
                   View Rewards Ledger <ArrowUpRight size={14} />
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-12">
           <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] shadow-sm border border-earth-100 dark:border-earth-800 relative transition-all">
              <div className="absolute top-8 right-8 flex gap-4">
                 {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-earth-50 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all">
                        <Edit2 size={16} /> Edit Profile
                    </button>
                 ) : (
                    <button onClick={handleCancel} className="flex items-center gap-2 text-earth-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-all">
                        <X size={16} /> Cancel
                    </button>
                 )}
              </div>

              {isEditing ? (
                 <form onSubmit={handleSave} className="space-y-8">
                    <h2 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-8">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Global Member Name</label>
                           <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl px-6 py-4 font-bold text-earth-900 dark:text-white transition-all outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Network Hub Location</label>
                           <div className="relative">
                               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300" size={18} />
                               <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl pl-12 pr-4 py-4 font-bold text-earth-900 dark:text-white transition-all outline-none" placeholder="e.g. Nairobi, Kenya" />
                           </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Identity Visual</label>
                        <div className="flex items-center gap-8 bg-earth-50 dark:bg-earth-800 p-8 rounded-3xl border border-earth-100 dark:border-earth-700">
                           <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className="w-24 h-24 bg-white dark:bg-earth-900 rounded-full overflow-hidden border-4 border-white dark:border-earth-700 shadow-xl group-hover:brightness-75 transition-all">
                                    {formData.avatar ? <img src={formData.avatar} className="w-full h-full object-cover" alt="Avatar" /> : <div className="w-full h-full flex items-center justify-center text-earth-300"><ImageIcon size={40}/></div>}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Upload size={24} className="text-white" /></div>
                           </div>
                           <div className="flex-1">
                               <p className="text-sm font-bold text-earth-800 dark:text-earth-200 mb-2">Upload Profile Picture</p>
                               <p className="text-xs text-earth-500 dark:text-earth-400 mb-4 leading-relaxed font-medium">Images are standardized for network identification. JPG, PNG or WEBP accepted.</p>
                               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                               <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black uppercase tracking-widest text-agro-600 hover:text-agro-700 transition-colors flex items-center gap-2">
                                  <Camera size={14} /> Open Image Studio
                               </button>
                           </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Biographical Intelligence</label>
                       <textarea rows={4} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-[2rem] px-8 py-6 font-medium text-earth-900 dark:text-white transition-all outline-none resize-none leading-relaxed" placeholder="Document your agricultural journey and localized expertise..." />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={handleCancel} className="flex-1 py-5 bg-white dark:bg-transparent border-2 border-earth-100 dark:border-earth-700 text-earth-50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-earth-50">Cancel Changes</button>
                        <button type="submit" className="flex-1 bg-agro-900 text-white font-black py-5 rounded-2xl shadow-2xl shadow-agro-900/30 hover:bg-agro-950 transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest active:scale-95"><Save size={18} /> Update Node Info</button>
                    </div>
                 </form>
              ) : (
                 <>
                    <div className="flex items-center gap-8 mb-10">
                        <div className="relative">
                            <div className="w-28 h-28 bg-earth-100 dark:bg-earth-800 rounded-[2.5rem] border-4 border-earth-50 dark:border-earth-700 shadow-xl overflow-hidden flex items-center justify-center">
                                {formData.avatar ? <img src={formData.avatar} className="w-full h-full object-cover" /> : <span className="text-4xl font-serif text-earth-300">{user.name.charAt(0)}</span>}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-2xl border-4 border-white dark:border-earth-900 shadow-lg flex items-center justify-center text-white">
                                <CheckCircle2 size={16} />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-serif font-bold text-earth-900 dark:text-white tracking-tight mb-2">{user.name}</h2>
                            <div className="flex gap-4">
                                <span className="px-3 py-1 bg-agro-50 dark:bg-agro-900/30 text-agro-700 dark:text-agro-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-agro-100 dark:border-agro-800">{user.role} Hub</span>
                                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-blue-100 dark:border-blue-800">Tier 3 (Gold)</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-10 border-y border-earth-50 dark:border-earth-800 py-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-earth-300 uppercase tracking-widest">Network Cluster</span>
                            <div className="flex items-center gap-2 text-earth-800 dark:text-earth-200 font-bold">
                                <MapPin size={16} className="text-red-500" /> {user.location || 'Loc: STANDBY'}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-earth-300 uppercase tracking-widest">Communication Uplink</span>
                            <div className="flex items-center gap-2 text-earth-800 dark:text-earth-200 font-bold">
                                <Mail size={16} className="text-blue-500" /> {user.email}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-earth-300 uppercase tracking-widest">Enrollment Cycle</span>
                            <div className="flex items-center gap-2 text-earth-800 dark:text-earth-200 font-bold">
                                <Calendar size={16} className="text-agro-600" /> Since {user.joinedDate}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-earth-50 dark:bg-earth-800/30 p-10 rounded-[2.5rem] border border-earth-100 dark:border-earth-700 relative z-10">
                            <h4 className="text-[10px] font-black text-agro-600 uppercase tracking-[0.4em] mb-4">Biography / Mission</h4>
                            <p className="text-xl text-earth-600 dark:text-earth-300 leading-relaxed italic font-medium">
                                {user.bio || "No biographical intelligence synchronized yet. Update your profile to document your agricultural journey and localized expertise."}
                            </p>
                        </div>
                    </div>
                 </>
              )}
           </div>

           {/* Activity Feed */}
           <div className="animate-in fade-in duration-1000 delay-300">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-earth-900 dark:text-white flex items-center gap-3">
                    <Activity className="text-agro-600" /> Node Activity Log
                  </h3>
                  <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Global History</button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 {[
                    { type: 'DATASET', title: "Soil Resilience Analysis Q2", meta: "2 days ago • Environmental Thrust", icon: <BookOpen className="text-blue-500" /> },
                    { type: 'APPLICATION', title: "Sustainable Advisory Role", meta: "1 week ago • GreenEarth Node", icon: <Briefcase className="text-rose-500" /> },
                    { type: 'LEARNING', title: "Regenerative Basics Mastery", meta: "2 weeks ago • Academy Cert", icon: <Sprout className="text-agro-500" /> },
                    { type: 'FINANCE', title: "EAC Grant Disbursement", meta: "3 weeks ago • SA Project fund", icon: <Coins className="text-amber-500" /> }
                 ].map((activity, i) => (
                    <div key={i} className="bg-white dark:bg-earth-900 p-6 rounded-[2rem] border border-earth-100 dark:border-earth-800 flex gap-5 items-start transition-all hover:shadow-lg group">
                        <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl group-hover:scale-110 transition-transform shadow-inner border border-black/5 shrink-0">
                            {activity.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[8px] font-black text-earth-300 dark:text-earth-600 uppercase tracking-[0.3em] mb-1">{activity.type}</p>
                            <h4 className="font-bold text-earth-900 dark:text-earth-100 truncate mb-1 text-sm">{activity.title}</h4>
                            <p className="text-[10px] text-earth-400 font-bold uppercase tracking-tighter">{activity.meta}</p>
                        </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};