
import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { User } from '../../types';
import { registerGroup } from '../../lib/groups';

interface RegisterGroupProps {
  user: User;
  onGroupRegistered: () => void;
}

export const RegisterGroup: React.FC<RegisterGroupProps> = ({ user, onGroupRegistered }) => {
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('Group');
  const [legalId, setLegalId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerGroup(groupName, groupType, legalId, user);
      onGroupRegistered();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-earth-900 rounded-3xl shadow-lg">
      <h3 className="text-2xl font-bold text-agro-900 dark:text-white mb-2">Register a New Group</h3>
      <p className="text-earth-500 dark:text-earth-400 mb-6">Create a new group, society, or club on the EnvirosAgro network.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-bold text-earth-600 dark:text-earth-300">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full mt-2 bg-earth-100 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-xl py-3 px-4 focus:outline-none transition-all dark:text-white"
            placeholder="e.g., 'Future Farmers of America'"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-earth-600 dark:text-earth-300">Group Type</label>
          <select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className="w-full mt-2 bg-earth-100 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-xl py-3 px-4 focus:outline-none transition-all dark:text-white"
          >
            <option value="Group">Group</option>
            <option value="Society">Society</option>
            <option value="Club">Club</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-earth-600 dark:text-earth-300">Legal Registration ID</label>
          <input
            type="text"
            value={legalId}
            onChange={(e) => setLegalId(e.target.value)}
            className="w-full mt-2 bg-earth-100 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-xl py-3 px-4 focus:outline-none transition-all dark:text-white"
            placeholder="e.g., '123-456-7890'"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Register Group <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
