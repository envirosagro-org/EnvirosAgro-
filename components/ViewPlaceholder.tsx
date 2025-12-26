
import React from 'react';

interface ViewPlaceholderProps {
  viewName: string;
}

export const ViewPlaceholder: React.FC<ViewPlaceholderProps> = ({ viewName }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        {viewName}
      </h1>
    </div>
  );
};
