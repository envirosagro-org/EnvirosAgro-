import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface Alert {
  id: number;
  title: string;
  region: string;
  level: string;
  type: string;
  date: string;
  icon: React.ReactNode;
  color: string;
}

interface ActiveAlertsProps {
  alerts: Alert[];
  onViewAlert: (alert: Alert) => void;
}

export const ActiveAlerts: React.FC<ActiveAlertsProps> = ({ alerts, onViewAlert }) => {
  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <div 
          key={alert.id} 
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg hover:border-red-300 ${alert.color}`}
          onClick={() => onViewAlert(alert)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block p-3 bg-white/50 rounded-lg">{alert.icon}</div>
              <div>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${alert.level === 'Critical' ? 'text-red-600' : 'text-orange-600'}`}>{alert.level}</span>
                <h3 className="font-bold text-base sm:text-lg text-earth-900">{alert.title}</h3>
                <p className="text-xs text-earth-600">{alert.region}</p>
              </div>
            </div>
            <ChevronRight className="text-red-400" size={28} />
          </div>
        </div>
      ))}
    </div>
  );
};