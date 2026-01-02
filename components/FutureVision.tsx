import React, { useState } from 'react';
import { Header } from './futurevision/Header';
import { VisionDisplay } from './futurevision/VisionDisplay';
import { ControlPanel } from './futurevision/ControlPanel';
import { VISIONS } from './futurevision/data';
import { ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface FutureVisionProps {
    onNavigate: (view: View) => void;
}

const FutureVision: React.FC<FutureVisionProps> = ({ onNavigate }) => {
    const [activeVision, setActiveVision] = useState(VISIONS[0]);
    const [year, setYear] = useState(2025);

    const handleSelectVision = (vision: any) => {
        setActiveVision(vision);
        setYear(2025); // Reset to the first year when a new vision is selected
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
             <div className="fixed top-0 left-0 w-full z-10 bg-gray-900/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <button 
                            onClick={() => onNavigate(View.HOME)}
                            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm font-bold uppercase tracking-widest"
                            >
                            <ArrowLeft size={18} /> Back to Home
                        </button>
                        <div className="font-bold font-serif text-2xl text-white">Future Vision</div>
                    </div>
                </div>
             </div>

            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <VisionDisplay vision={activeVision} year={year} />
                    </div>
                    <div>
                        <ControlPanel 
                            visions={VISIONS} 
                            activeVision={activeVision} 
                            onSelectVision={handleSelectVision} 
                            year={year}
                            onSelectYear={setYear}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FutureVision;