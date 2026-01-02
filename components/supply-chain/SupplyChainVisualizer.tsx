import React, { useState } from 'react';
import { SupplyChainNode } from './SupplyChainNode';
import { SupplyChainModal } from './SupplyChainModal';
import { SUPPLY_CHAIN_STAGES } from './constants';
import { View } from '../../types';
import { motion } from 'framer-motion';

interface SupplyChainVisualizerProps {
    onNavigate: (view: View) => void;
}

export const SupplyChainVisualizer: React.FC<SupplyChainVisualizerProps> = ({ onNavigate }) => {
    const [activeStage, setActiveStage] = useState(null);

    return (
        <div className="relative mb-20">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-earth-200 -z-10 hidden lg:block transform -translate-y-1/2 rounded-full"></div>
            
            <div className="grid lg:grid-cols-5 gap-6">
                {SUPPLY_CHAIN_STAGES.map((stage, index) => (
                    <motion.div key={stage.id} custom={index} initial={{ opacity: 0, y: 50 }} animate={i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })} >
                        <SupplyChainNode stage={stage} onNodeClick={setActiveStage} />
                    </motion.div>
                ))}
            </div>

            <SupplyChainModal 
                stage={activeStage} 
                onClose={() => setActiveStage(null)} 
                onNavigate={onNavigate} 
            />
        </div>
    );
};