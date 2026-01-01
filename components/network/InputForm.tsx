
import React from 'react';

interface InputFormProps {
  isIntegrated: boolean;
  partnerName: string | undefined;
  partnerId: string | undefined;
}

export const InputForm: React.FC<InputFormProps> = ({ isIntegrated, partnerName }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        {isIntegrated ? (
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Submit Your Data, {partnerName}</h2>
        ) : (
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Submit Your Data</h2>
        )}
      <form>
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700 dark:text-gray-200">Data Point 1</span>
            <input type="text" className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0" />
          </label>
          <label className="block">
            <span className="text-gray-700 dark:text-gray-200">Data Point 2</span>
            <input type="text" className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0" />
          </label>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Submit</button>
        </div>
      </form>
    </div>
  );
};
