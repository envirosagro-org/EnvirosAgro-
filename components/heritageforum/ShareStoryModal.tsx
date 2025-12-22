import React from 'react';
import { Feather, X, CheckCircle2, Sparkles, MapPin, Camera, Trash2, Check, Loader2, Send, ShieldCheck } from 'lucide-react';

interface ShareStoryModalProps {
  setShowShareModal: (show: boolean) => void;
  submitSuccess: boolean;
  aiFeedback: string | null;
  newStory: any;
  setNewStory: (story: any) => void;
  handleShareSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  attachedImage: string | null;
  setAttachedImage: (img: string | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  topics: any[];
}

export const ShareStoryModal: React.FC<ShareStoryModalProps> = ({
  setShowShareModal,
  submitSuccess,
  aiFeedback,
  newStory,
  setNewStory,
  handleShareSubmit,
  isSubmitting,
  attachedImage,
  setAttachedImage,
  fileInputRef,
  topics,
}) => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-white/10 flex flex-col max-h-[90vh]">
        <div className="bg-rose-900 p-10 text-white flex justify-between items-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Feather size={200} /></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-serif font-bold">Preserve Your Legacy</h3>
            <p className="text-xs text-rose-300 font-bold uppercase tracking-widest mt-1">Direct Heritage Link • Community Archive</p>
          </div>
          <button onClick={() => setShowShareModal(false)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all">
            <X size={28} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
          {submitSuccess ? (
            <div className="text-center py-12 animate-in zoom-in">
              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner">
                <CheckCircle2 size={56} className="animate-bounce" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-4">Story Propagated</h3>
              <p className="text-earth-600 dark:text-earth-400 mb-10 max-w-sm mx-auto leading-relaxed">
                Your wisdom has been authenticated by our AI Core and added to the Global Heritage Archive.
              </p>
              {aiFeedback && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-left mb-8">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Sparkles size={12} fill="currentColor" /> AI Validation Analysis
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200 italic font-medium">{aiFeedback}</p>
                </div>
              )}
              <div className="text-[9px] font-mono text-earth-400 uppercase tracking-[0.4em]">REF: HER-ARCH-{Date.now().toString().slice(-6)}</div>
            </div>
          ) : (
            <form onSubmit={handleShareSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Narrative Title</label>
                <input
                  required
                  value={newStory.title}
                  onChange={e => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl px-6 py-4 text-sm font-bold transition-all dark:text-white"
                  placeholder="e.g. The First Rains of 1974"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Domain</label>
                  <select
                    className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl px-5 py-4 text-sm font-bold transition-all appearance-none dark:text-white"
                    value={newStory.category}
                    onChange={e => setNewStory({ ...newStory, category: e.target.value })}
                  >
                    {topics.map(t => <option key={t.id}>{t.title}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" size={16} />
                    <input
                      value={newStory.location}
                      onChange={e => setNewStory({ ...newStory, location: e.target.value })}
                      className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold transition-all dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-1">The Narrative</label>
                <textarea
                  required
                  value={newStory.content}
                  onChange={e => setNewStory({ ...newStory, content: e.target.value })}
                  className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-rose-500 rounded-[2rem] px-8 py-6 text-sm font-medium transition-all min-h-[250px] resize-none dark:text-white leading-relaxed"
                  placeholder="Tell the community about a tradition, a lesson from an elder, or a historic farming event..."
                />
              </div>

              {attachedImage && (
                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border-2 border-rose-100 dark:border-rose-900 group/img shadow-inner animate-in zoom-in-95 duration-500">
                  <img src={attachedImage} className="w-full h-full object-cover" alt="Narrative visual" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setAttachedImage(null)}
                      className="p-4 bg-red-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setAttachedImage(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${attachedImage ? 'bg-green-50 border-green-200 text-green-700' : 'bg-earth-100 dark:bg-earth-800 border-transparent hover:bg-earth-200 text-earth-600 dark:text-earth-400'}`}
                >
                  {attachedImage ? <Check size={20} /> : <Camera size={20} />}
                  {attachedImage ? 'Aesthetic Attached' : 'Attach Visual'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-3 bg-rose-900 hover:bg-rose-800 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-rose-900/20 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> MINTING LEGACY...</> : <><Send size={18} /> Submit to Archives</>}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
          <ShieldCheck size={18} className="text-rose-600" />
          <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Cultural Integrity & Data Sovereignty Enabled</p>
        </div>
      </div>
    </div>
  );
};
