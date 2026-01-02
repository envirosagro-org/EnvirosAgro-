import React from 'react';
import { motion } from 'framer-motion';
import { Bee, FlaskConical, Cloudy } from 'lucide-react';

const ICONS: any = {
    Bee: <Bee className="h-8 w-8" />,
    FlaskConical: <FlaskConical className="h-8 w-8" />,
    Cloudy: <Cloudy className="h-8 w-8" />,
}

export const VisionSelector = ({ visions, activeVision, onSelectVision, year, onSelectYear }: any) => {
  const timelineYears = [2025, 2035, 2050];
  const activeVisionData = visions.find((v:any) => v.id === activeVision.id);
  const themeColor = activeVisionData.themeColor || 'yellow';

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl h-full flex flex-col justify-between">
        <div>
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Select Future Vision</h3>
            <div className="grid grid-cols-3 gap-4">
            {visions.map((vision: any) => (
                <motion.button 
                    key={vision.id}
                    onClick={() => onSelectVision(vision)}
                    className={`relative aspect-square rounded-2xl transition-all duration-300 ${activeVision.id === vision.id ? 'bg-white/20 shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                    style={{ color: `var(--color-${vision.themeColor})` }}
                >
                    {ICONS[vision.icon]}
                    {activeVision.id === vision.id && (
                         <motion.div 
                            layoutId="activeVisionIndicator"
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full"
                            style={{ backgroundColor: `var(--color-${vision.themeColor})` }}
                        />
                    )}
                </motion.button>
            ))}
            </div>
        </div>

      <div className="mt-8">
          <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Time Travel</h3>
          <div className="relative px-2">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-white/10 rounded-full -translate-y-1/2"></div>
              <motion.div 
                className="absolute top-1/2 left-4 h-1 rounded-full" 
                style={{ backgroundColor: `var(--color-${themeColor})` }}
                initial={{ width: 0 }} 
                animate={{ width: `${((timelineYears.indexOf(year) / (timelineYears.length - 1)) * 95)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
              
              <div className="relative flex justify-between">
                  {timelineYears.map(y => (
                      <div key={y} className="text-center relative">
                          <button 
                              onClick={() => onSelectYear(y)}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${year === y ? 'scale-110 shadow-lg' : 'bg-earth-800 border-transparent hover:border-white/20'}`}
                              style={{
                                  backgroundColor: year === y ? `var(--color-${themeColor})` : '#2d2d2d',
                                  borderColor: year === y ? `rgba(255,255,255,0.3)` : 'transparent',
                              }}
                            >
                              <span className={`text-sm font-bold ${year === y ? 'text-white' : 'text-white/40'}`}>{y % 100}</span>
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};