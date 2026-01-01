
import React from 'react';

export const PastSubmissions: React.FC = () => {
  // Dummy data for past submissions
  const submissions = [
    { id: 1, dataPoint1: 'Value A', dataPoint2: 'Value B', timestamp: '2023-10-27T10:00:00Z' },
    { id: 2, dataPoint1: 'Value C', dataPoint2: 'Value D', timestamp: '2023-10-26T15:30:00Z' },
    // Add more submissions as needed
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Past Submissions</h3>
      {submissions.length > 0 ? (
        <ul className="space-y-4">
          {submissions.map(submission => (
            <li key={submission.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(submission.timestamp).toLocaleString()}</p>
              <p className="text-gray-800 dark:text-gray-200">Data Point 1: {submission.dataPoint1}</p>
              <p className="text-gray-800 dark:text-gray-200">Data Point 2: {submission.dataPoint2}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 dark:text-gray-200">No past submissions to display.</p>
      )}
    </div>
  );
};
