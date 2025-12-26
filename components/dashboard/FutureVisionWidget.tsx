import React from 'react';

const futureItems = [
  { title: 'AI-Powered Insights', description: 'Automated recommendations based on your data.' },
  { title: 'Advanced Reporting', description: 'Generate custom reports with deeper analytics.' },
  { title: 'Mobile App', description: 'Access your dashboard on the go.' },
];

export const FutureVisionWidget: React.FC = () => {
  return (
    <div className="bg-white/5 rounded-lg p-6 h-96">
      <h3 className="text-lg font-semibold text-white mb-4">Future Vision</h3>
      <ul>
        {futureItems.map((item, index) => (
          <li key={index} className="mb-4">
            <p className="text-md font-semibold text-white">{item.title}</p>
            <p className="text-sm text-slate-400">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};