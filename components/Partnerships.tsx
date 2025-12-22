import React, { useState } from 'react';
import { Users, Leaf, Cpu, Globe, Layers } from 'lucide-react';
import { View } from '../types';
import { createAgroChat } from '../services/gemini';
import { useCurrency } from '../../context/CurrencyContext';

import { Navigation } from './partnerships/Navigation';
import { PartnerDirectory } from './partnerships/PartnerDirectory';
import { AutomatedGateway } from './partnerships/AutomatedGateway';
import { StatusTracker } from './partnerships/StatusTracker';
import { GatewayStep1 } from './partnerships/GatewayStep1';
import { GatewayStep2 } from './partnerships/GatewayStep2';
import { GatewayStep3 } from './partnerships/GatewayStep3';
import { GatewayStep4 } from './partnerships/GatewayStep4';
import { GatewayStep5 } from './partnerships/GatewayStep5';

const PARTNER_CATEGORIES = [
  {
    id: 'SA',
    title: 'Social Alliances',
    icon: <Users size={32} />,
    color: 'bg-rose-50 text-rose-600',
    description: 'Collaborating with NGOs, cooperatives, and educational institutions to foster community resilience.',
    opportunities: ["JOINT TRAINING WORKSHOPS", "COMMUNITY SEED BANKS", "CULTURAL HERITAGE DOCUMENTATION"]
  },
  {
    id: 'EA',
    title: 'Environmental Coalitions',
    icon: <Leaf size={32} />,
    color: 'bg-green-50 text-green-600',
    description: 'Partnering with conservation bodies to drive biodiversity restoration and carbon neutrality.',
    opportunities: ["CARBON SEQUESTRATION PROJECTS", "BIODIVERSITY MAPPING", "SUSTAINABLE WATER MANAGEMENT"]
  },
  {
    id: 'TA',
    title: 'Tech & Research Labs',
    icon: <Cpu size={32} />,
    color: 'bg-blue-50 text-blue-600',
    description: 'Joint ventures with universities to develop precision agriculture tools and AI diagnostics.',
    opportunities: ["AGTECH PILOT PROGRAMS", "DATA ANALYSIS & MODELING", "PRECISION FARMING TOOLS"]
  }
];

interface PartnershipsProps {
  onNavigate?: (view: View) => void;
  onIntegrationComplete?: (data: { name: string, id: string }) => void;
}

export const Partnerships: React.FC<PartnershipsProps> = ({ onNavigate, onIntegrationComplete }) => {
  const [activeTab, setActiveTab] = useState<'DIRECTORY' | 'AUTOMATED_GATEWAY' | 'STATUS'>('DIRECTORY');

  // Automated Gateway States
  const [autoStep, setAutoStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [issuedId, setIssuedId] = useState<string | null>(null);
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);

  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    offerType: 'Technology',
    thrust: 'TA',
    description: '',
    paymentMethod: 'Tokenz™'
  });

  const { convertPrice } = useCurrency();
  const networkIntegrationFeeUSD = 520;
  const displayedFee = convertPrice(networkIntegrationFeeUSD);

  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(pattern);
    }
  };

  const handleStartVerification = async () => {
    setIsVerifying(true);
    setVerificationLogs(["Initializing bilateral handshake...", "Uplinking to Global Intelligence Ledger..."]);
    triggerHaptic(20);

    const logSequence = [
      "Analyzing organizational alignment...",
      "Calculating projected m(t) impact...",
      "Verifying technical C(a) standards...",
      "Cross-referencing ethical compliance...",
      "Evaluation complete. Generating verdict."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logSequence.length) {
        setVerificationLogs(prev => [...prev, logSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        finalizeVerification();
      }
    }, 1000);
  };

  const finalizeVerification = async () => {
    try {
      const ai = createAgroChat();
      const prompt = `Evaluate this partnership proposal for EnvirosAgro: 
      Org: ${formData.orgName}, Offer: ${formData.offerType}, Description: ${formData.description}. 
      Give a brief, professional technical verdict (2-3 sentences) on why this is a suitable addition to our Five Thrusts ecosystem.`;

      const response = await ai.sendMessage({ message: prompt });
      setEvaluationFeedback(response.text || "Alignment verified based on technical scalability.");
      setIsVerifying(false);
    } catch (err) {
      setEvaluationFeedback("Node verification successful. Alignment within technical tolerance.");
      setIsVerifying(false);
    }
  };

  const handlePayment = () => {
    setIsPaying(true);
    triggerHaptic(50);

    setTimeout(() => {
      setPaymentVerified(true);
      setIsPaying(false);
      const uniqueId = `EA-PART-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}-SYNC`;
      setIssuedId(uniqueId);
      setGeneratedInvoice({
        id: `INV-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toLocaleDateString(),
        amount: displayedFee,
        partner: formData.orgName,
        service: "Network Integration License"
      });
      triggerHaptic([20, 50, 20]);

      if (onIntegrationComplete) {
        onIntegrationComplete({ name: formData.orgName, id: uniqueId });
      }
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-in fade-in duration-700">

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'DIRECTORY' && (
        <PartnerDirectory
          partnerCategories={PARTNER_CATEGORIES}
          setActiveTab={setActiveTab}
        />
      )}

      {activeTab === 'AUTOMATED_GATEWAY' && (
        <AutomatedGateway autoStep={autoStep}>
          {autoStep === 1 && (
            <GatewayStep1
              formData={formData}
              setFormData={setFormData}
              onNext={() => { setAutoStep(2); handleStartVerification(); }}
            />
          )}
          {autoStep === 2 && (
            <GatewayStep2
              isVerifying={isVerifying}
              verificationLogs={verificationLogs}
              evaluationFeedback={evaluationFeedback}
              onNext={() => setAutoStep(3)}
            />
          )}
          {autoStep === 3 && (
            <GatewayStep3 onNext={() => setAutoStep(4)} />
          )}
          {autoStep === 4 && (
            <GatewayStep4
              paymentVerified={paymentVerified}
              generatedInvoice={generatedInvoice}
              displayedFee={displayedFee}
              paymentMethod={formData.paymentMethod}
              setPaymentMethod={(method) => setFormData({ ...formData, paymentMethod: method })}
              handlePayment={handlePayment}
              isPaying={isPaying}
              onNext={() => setAutoStep(5)}
            />
          )}
          {autoStep === 5 && (
            <GatewayStep5
              orgName={formData.orgName}
              issuedId={issuedId}
              onNavigateToHub={() => onNavigate?.(View.NETWORK_INPUT_HUB)}
              onNavigateToDirectory={() => setActiveTab('DIRECTORY')}
              triggerHaptic={triggerHaptic}
            />
          )}
        </AutomatedGateway>
      )}

      {activeTab === 'STATUS' && (
        <StatusTracker
          autoStep={autoStep}
          paymentVerified={paymentVerified}
          issuedId={issuedId}
          onNavigateToHub={() => onNavigate?.(View.NETWORK_INPUT_HUB)}
        />
      )}

      {/* Footer Branding Ribbon */}
      <div className="mt-32 pt-16 border-t border-earth-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-earth-400">
        <span className="flex items-center gap-3"><Globe size={14} className="text-blue-500" /> Global Node Integration</span>
        <span className="flex items-center gap-3"><Layers size={14} className="text-agro-500" /> Trust Architecture v4.2.2</span>
        <span className="flex items-center gap-3 text-slate-600">© ENVIROSAGRO INFRASTRUCTURE</span>
      </div>

    </div>
  );
};
