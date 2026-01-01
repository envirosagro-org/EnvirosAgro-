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

export const FutureVision: React.FC<FutureVisionProps> = ({ onNavigate }) => {
    const [activeVision, setActiveVision] = useState(VISIONS[0]);

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <button 
                onClick={() => onNavigate(View.HOME)}
                className="flex items-center gap-2 text-gray-500 hover:text-agro-400 transition-colors text-sm font-bold uppercase tracking-widest"
                >
                <ArrowLeft size={16} /> Back to Home
                </button>
            </div>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <VisionDisplay vision={activeVision} />
                    </div>
                    <div>
                        <ControlPanel 
                            visions={VISIONS} 
                            activeVision={activeVision} 
                            onSelectVision={setActiveVision} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};