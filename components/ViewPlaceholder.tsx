import React from 'react';

interface ViewPlaceholderProps {
  view: string;
}

export const ViewPlaceholder: React.FC<ViewPlaceholderProps> = ({ view }) => {
  return (
    <div className="h-screen flex items-center justify-center text-white text-4xl bg-[#050a14] pt-24">
      <div className="text-center">
        <h1 className="font-black uppercase tracking-[0.5em] text-lg mb-4">{view.replace(/_/g, ' ')}</h1>
        <p className="text-sm text-slate-400">Content for this view is under construction.</p>
      </div>
    </div>
  );
};