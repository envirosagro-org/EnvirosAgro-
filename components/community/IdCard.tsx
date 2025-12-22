import React from 'react';
import { CreditCard, Sprout, QrCode, Info } from 'lucide-react';
import { User } from '../../types';

interface IdCardProps {
  user: User | null;
}

export const IdCard: React.FC<IdCardProps> = ({ user }) => {
  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-earth-900 p-6 rounded-[2rem] shadow-sm border border-earth-100 dark:border-earth-800">
        <h3 className="font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
          <CreditCard size={18} className="text-agro-600" /> Digital ID
        </h3>
        {user ? (
          <div className="w-full bg-gradient-to-br from-agro-800 to-agro-950 rounded-2xl overflow-hidden shadow-xl relative text-white aspect-[1.58/1] p-5">
            <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400" className="w-full h-full object-cover" alt="ID" />
            </div>
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="flex items-center gap-1.5">
                <Sprout size={20} className="text-agro-400" />
                <span className="font-serif font-bold tracking-tight text-base">EnvirosAgro</span>
              </div>
              <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                <QrCode size={18} />
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl p-1 overflow-hidden shadow-lg">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover rounded-lg" alt="Avatar" /> : <div className="w-full h-full bg-agro-100 flex items-center justify-center rounded-lg text-agro-600 font-bold">{user.name.charAt(0)}</div>}
              </div>
              <div>
                <h4 className="text-lg font-bold truncate max-w-[180px]">{user.name}</h4>
                <p className="text-[9px] text-agro-300 font-black uppercase tracking-widest">{user.role}</p>
                <p className="font-mono text-[10px] text-agro-100 tracking-widest mt-1">{user.esin || 'EA-PENDING-2024'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center bg-earth-50 dark:bg-earth-800/30 rounded-2xl border-2 border-dashed border-earth-200 dark:border-earth-700">
            <Info size={32} className="mx-auto text-earth-300 mb-2 opacity-50" />
            <p className="text-earth-400 font-bold uppercase tracking-widest text-[8px]">Sign In to view ID</p>
          </div>
        )}
      </div>
    </div>
  );
};
