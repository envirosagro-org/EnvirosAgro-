import React from 'react';

const FutureVisionWidget: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-6 h-full">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Future Vision</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Our roadmap for the next five years is focused on expanding our reach, enhancing our technology, and deepening our impact. We are committed to creating a more sustainable and equitable future for all.
      </p>
      <div className="flex justify-end">
        <button className="bg-agro-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-agro-700 transition-colors">
          View Roadmap
        </button>
      </div>
    </div>
  );
};

export default FutureVisionWidget;
