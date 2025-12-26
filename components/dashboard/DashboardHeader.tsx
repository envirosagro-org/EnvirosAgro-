import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="max-w-[1700px] mx-auto">
      <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-widest">Dashboard</h1>
      <p className="text-slate-400 mt-2 text-sm sm:text-base">Welcome to your central hub for insights and operations.</p>
    </header>
  );
};