import React from 'react';
import { ShieldAlert, AlertTriangle, Bug, Droplets, Thermometer, ChevronRight, MapPin, Clock } from 'lucide-react';

interface Alert {
  id: number;
  title: string;
  region: string;
  level: string;
  type: string;
  date: string;
  desc: string;
  icon: React.ReactNode;
}

interface ActiveAlertsProps {
  alerts: Alert[];
  onViewAlert: (alert: Alert) => void;
}

export const ActiveAlerts: React.FC<ActiveAlertsProps> = ({ alerts, onViewAlert }) => {
  return (
    <div className="space-y-6">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          onClick={() => onViewAlert(alert)}
          className="rounded-[1.5rem] p-6 border border-earth-100 dark:border-earth-800 bg-white dark:bg-earth-900 transition-all hover:shadow-md group cursor-pointer relative"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="p-3.5 rounded-xl h-fit bg-red-50 dark:bg-red-950/30 text-red-600">
                {alert.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-earth-900 dark:text-white leading-tight">{alert.title}</h3>
                  {alert.level === 'Critical' && (
                    <span className="bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase animate-pulse">Critical</span>
                  )}
                </div>
                <p className="text-[8px] text-earth-400 font-black uppercase tracking-widest">
                  {alert.region} • {alert.date}
                </p>
              </div>
            </div>
            <div className="bg-earth-50 dark:bg-earth-800 p-2 rounded-full text-earth-300 group-hover:text-red-500 transition-all">
              <ChevronRight size={18} />
            </div>
          </div>
          <p className="text-earth-600 dark:text-earth-400 mb-4 text-xs leading-relaxed font-medium line-clamp-2">{alert.desc}</p>
          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/50 flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-red-600">
            Intervention Recommended
            <ChevronRight size={12} />
          </div>
        </div>
      ))}
    </div>
  );
};
