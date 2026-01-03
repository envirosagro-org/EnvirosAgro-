
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ForumHighlights } from '../ForumHighlights';

const ForumTab = () => {
  return (
    <div className="space-y-12">
      <div className="bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><MessageSquare size={200} /></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-black mb-2">Ecosystem Dialogues</h2>
          <p className="text-blue-100 font-medium">Join 2,400+ peers in technical and strategic agricultural discourse.</p>
        </div>
        <button className="relative z-10 bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-50 transition-all">Start New Topic</button>
      </div>
      <ForumHighlights />
    </div>
  );
};

export default ForumTab;
