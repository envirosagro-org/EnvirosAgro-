import React, { useState } from 'react';
import { Header } from './futurevision/Header';
import { VisionDisplay } from './futurevision/VisionDisplay';
import { ControlPanel } from './futurevision/ControlPanel';
import { VISIONS } from './futurevision/data';

export const FutureVision = () => {
    const [activeVision, setActiveVision] = useState(VISIONS[0]);

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
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