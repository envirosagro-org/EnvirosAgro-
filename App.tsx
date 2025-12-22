import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import { Hero } from './components/Hero';
import { KnowledgeHub } from './components/KnowledgeHub';
import { Dashboard } from './components/Dashboard';
import { AiAdvisor } from './components/AiAdvisor';
import { RoadmapAI } from './components/RoadmapAI';
import { CropDoctor } from './components/CropDoctor';
import { SustainabilityCalculator } from './components/SustainabilityCalculator';
import { FarmScout } from './components/FarmScout';
import { CarbonLedger } from './components/CarbonLedger';
import { Auth } from './components/Auth';
import { Information } from './components/Information';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Database } from './components/Database';
import { PeopleAndCulture } from './components/PeopleAndCulture';
import { SustainabilityFramework } from './components/SustainabilityFramework';
import { Brands } from './components/Brands';
import { Trademarks } from './components/Trademarks';
import { Media } from './components/Media';
import { Supply } from './components/Supply';
import { Customer } from './components/Customer';
import { Partnerships } from './components/Partnerships';
import { Finance } from './components/Finance';
import { Community } from './components/Community';
import { UserProfile } from './components/UserProfile';
import { Podcast } from './components/Podcast';
import { HeritageForum } from './components/HeritageForum';
import { Webinar } from './components/Webinar';
import { SmartFarmVR } from './components/SmartFarmVR';
import { PlanetWatch } from './components/PlanetWatch';
import { GreenLens } from './components/GreenLens';
import { SafeHarvest } from './components/SafeHarvest';
import { NutriLife } from './components/NutriLife';
import { AgBizWeekly } from './components/AgBizWeekly';
import { InvestorPortal } from './components/InvestorPortal';
import { ScaleUpSummit } from './components/ScaleUpSummit';
import { LiveHost } from './components/LiveHost';
import { CommunityGuidelines } from './components/CommunityGuidelines';
import { IntranetDashboard } from './components/IntranetDashboard';
import { ExtranetDashboard } from './components/ExtranetDashboard';
import { AiConsultantFloating } from './components/AiConsultantFloating';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { SupplyChainAudit } from './components/SupplyChainAudit';
import { NetworkInputHub } from './components/NetworkInputHub';
import { TransmissionGateway } from './components/TransmissionGateway';
import { FutureVision } from './components/FutureVision';
import { SixSigmaRCA } from './components/SixSigmaRCA';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { CurrencyProvider } from './context/CurrencyContext'; // Fixed path
import {
  LayoutDashboard, BookOpen, Menu, X, LogOut, Users, Layers,
  MonitorPlay, Wallet, Coins, ArrowLeft, BrainCircuit, ShieldCheck,
  Box, Grid3X3, Activity, Globe, Maximize2, Minimize2, Zap, Radio,
  Mic, Microscope, Calculator, Heart, Fingerprint, Sparkles, Video,
  TrendingUp, Database as DbIcon, Mail, Settings, Cpu, Cloud,
  Server, Network, ClipboardCheck, AlertOctagon, Info
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [, setCurrency] = useState('USD'); // Keep for now as state
  
  const [isPartnerIntegrated, setIsPartnerIntegrated] = useState(() => {
    return localStorage.getItem('ea_partner_integrated') === 'true';
  });
  const [partnerData, setPartnerData] = useState<{name: string, id: string} | null>(() => {
    const saved = localStorage.getItem('ea_partner_data');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('ea_partner_integrated', String(isPartnerIntegrated));
    if (partnerData) {
      localStorage.setItem('ea_partner_data', JSON.stringify(partnerData));
    }
  }, [isPartnerIntegrated, partnerData]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  const handleNavClick = (view: View, searchQuery?: string) => {
    if (searchQuery !== undefined) setGlobalSearchQuery(searchQuery);
    else setGlobalSearchQuery('');
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
    setIsPartnerIntegrated(false);
    setPartnerData(null);
    localStorage.removeItem('ea_partner_integrated');
    localStorage.removeItem('ea_partner_data');
  };

  const awardEac = (amount: number) => {
    if (user) setUser({ ...user, eacBalance: (user.eacBalance || 0) + amount });
  };

  const getBackTarget = (view: View): { target: View; label: string } => {
    const mediaViews = [
        View.PODCAST, View.HERITAGE_FORUM, View.WEBINAR, View.SMART_FARM_VR, 
        View.PLANET_WATCH, View.GREEN_LENS, View.SAFE_HARVEST, View.NUTRILIFE, 
        View.AGBIZ_WEEKLY, View.SCALEUP_SUMMIT, View.LIVE_HOST
    ];
    if (mediaViews.includes(view)) return { target: View.MEDIA, label: 'Media Hub' };
    
    const techViews = [View.AI_ADVISOR, View.ROADMAP_AI, View.CROP_DOCTOR, View.SUSTAINABILITY_CALCULATOR, View.KNOWLEDGE];
    if (techViews.includes(view)) return { target: View.DASHBOARD, label: 'Dashboard' };
    
    const infraViews = [View.DATABASE, View.SUPPLY_CHAIN_AUDIT, View.NETWORK_INPUT_HUB, View.TRANSMISSION_GATEWAY, View.SUPPLY];
    if (infraViews.includes(view)) return { target: View.SUSTAINABILITY_FRAMEWORK, label: 'Framework' };

    if (view === View.SIX_SIGMA_RCA) return { target: View.INTRANET_DASHBOARD, label: 'Intranet' };
    if (view === View.COMMUNITY_GUIDELINES) return { target: View.COMMUNITY, label: 'Community' };
    if (view === View.PROFILE) return { target: View.HOME, label: 'Home' };
    if (view === View.FUTURE_VISION) return { target: View.DASHBOARD, label: 'Dashboard' };
    if (view === View.CARBON_LEDGER) return { target: View.FINANCE, label: 'Finance' };
    if (view === View.INVESTOR_PORTAL) return { target: View.FINANCE, label: 'Finance' };
    
    return { target: View.HOME, label: 'Home' };
  };

  const MENU_SECTIONS = [
    {
      id: 'INTELLIGENCE',
      label: 'Intelligence & Research',
      icon: <Sparkles size={16} className="text-purple-600" />,
      items: [
        { id: View.AI_ADVISOR, label: 'Strategic AI', icon: <BrainCircuit size={18}/>, desc: 'Consulting core' },
        { id: View.FUTURE_VISION, label: 'Future Vision Lab', icon: <Sparkles size={18}/>, desc: 'AI visual projection' },
        { id: View.KNOWLEDGE, label: 'Knowledge Hub', icon: <BookOpen size={18}/>, desc: 'Research academy' },
        { id: View.CROP_DOCTOR, label: 'Crop Diagnostic', icon: <Microscope size={18}/>, desc: 'Instant health analysis' },
        { id: View.SUSTAINABILITY_CALCULATOR, label: 'm(t) Simulator', icon: <Calculator size={18}/>, desc: 'Equation-based modeling' }
      ]
    },
    {
      id: 'INFRASTRUCTURE',
      label: 'Infrastructure & Assets',
      icon: <Server size={16} className="text-blue-600" />,
      items: [
        { id: View.NETWORK_INPUT_HUB, label: 'Network Input Hub', icon: <Network size={18}/>, desc: 'ERP, VMI & Cloud ingest' },
        { id: View.DATABASE, label: 'Data Registry', icon: <DbIcon size={18}/>, desc: 'Global intelligence node' },
        { id: View.CARBON_LEDGER, label: 'Carbon Engine', icon: <Layers size={18}/>, desc: 'Sequestration ledger' },
        { id: View.SUPPLY, label: 'Supply Network', icon: <Box size={18}/>, desc: 'Green logistics chain' },
        { id: View.FARM_SCOUT, label: 'Field Telemetry', icon: <Grid3X3 size={18}/>, desc: 'Real-time sensor grid' }
      ]
    },
    {
      id: 'BROADCAST',
      label: 'Broadcast & Culture',
      icon: <Radio size={16} className="text-red-500" />,
      items: [
        { id: View.MEDIA, label: 'Media Hub', icon: <MonitorPlay size={18}/>, desc: 'Network newsroom' },
        { id: View.PLANET_WATCH, label: 'Planet Watch', icon: <Globe size={18}/>, desc: 'Daily climate reports' },
        { id: View.GREEN_LENS, label: 'Impact Cinema', icon: <Video size={18}/>, desc: 'Cinematic documentaries' },
        { id: View.PODCAST, label: 'AgroCulture', icon: <Mic size={18}/>, desc: 'Indigenous oral records' }
      ]
    },
    {
      id: 'ECOSYSTEM',
      label: 'Ecosystem & Finance',
      icon: <Users size={16} className="text-rose-600" />,
      items: [
        { id: View.COMMUNITY, label: 'Member Hubs', icon: <Users size={18}/>, desc: 'Social ID & Co-ops' },
        { id: View.FINANCE, label: 'Capital Exchange', icon: <Wallet size={18}/>, desc: 'Tokenz™ & liquidity' },
        { id: View.INVESTOR_PORTAL, label: 'Investor Node', icon: <TrendingUp size={18}/>, desc: 'Impact deployments' },
        { id: View.BRANDS, label: 'Portfolio', icon: <Box size={18}/>, desc: 'Brand family experience' }
      ]
    },
    {
      id: 'PROFESSIONAL',
      label: 'Operations Center',
      icon: <Settings size={16} className="text-slate-600" />,
      items: [
        { id: View.AGRO_WORKERS_CLOUD, label: 'People & Culture', icon: <Cloud size={18}/>, desc: 'Professional registry' },
        { id: View.TRANSMISSION_GATEWAY, label: 'Transmission Gateway', icon: <Mail size={18}/>, desc: 'Direct secure uplink' },
        { id: View.INTRANET_DASHBOARD, label: 'Internal Intranet', icon: <ShieldCheck size={18}/>, desc: 'Organizational control' },
        { id: View.SIX_SIGMA_RCA, label: 'Quality Audit (RCA)', icon: <AlertOctagon size={18}/>, desc: 'Zero-defect methodology' }
      ]
    }
  ];

  const backInfo = getBackTarget(currentView);

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-[#fafaf9] dark:bg-earth-950 text-earth-900 dark:text-earth-50 font-sans transition-colors duration-500 flex flex-col">
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out isolate ${scrolled ? 'mt-3 mx-4 md:mx-10 rounded-[2.5rem] bg-white/70 dark:bg-earth-900/80 backdrop-blur-3xl border border-white/40 dark:border-white/5 py-1.5 shadow-xl' : 'bg-white/40 dark:bg-earth-950/40 backdrop-blur-xl border-b border-earth-100/10 py-5'}`}>
          <div className="max-w-[1900px] mx-auto px-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2 cursor-pointer group shrink-0 transition-transform active:scale-95" onClick={() => handleNavClick(View.HOME)}>
                <Logo size={scrolled ? 34 : 42} variant="horizontal" useGradient={true} />
              </div>
              <div className="hidden xl:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-earth-400">
                 <div className="flex items-center gap-3 bg-earth-50/50 dark:bg-earth-800/40 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                    <span>Pulse: 8.54m(t)</span>
                 </div>
                 <div className="flex items-center gap-3 bg-earth-50/50 dark:bg-earth-800/40 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Sync: Global_Ok</span>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
                  <button onClick={() => handleNavClick(View.DASHBOARD)} className={`p-2.5 rounded-xl transition-all ${currentView === View.DASHBOARD ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}><LayoutDashboard size={20} /></button>
                  <button onClick={toggleFullscreen} className={`p-2.5 rounded-xl transition-all ${isFullscreen ? 'bg-blue-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}>{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>
              </div>
              <div className="flex items-center gap-2 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
                {user ? (
                    <div className="flex items-center gap-1.5 px-1.5">
                        <div className="hidden lg:flex items-center gap-3 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 group cursor-default">
                            <Coins size={16} className="text-amber-500" />
                            <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">{user.eacBalance} EAC</span>
                        </div>
                        <button onClick={() => handleNavClick(View.PROFILE)} className="flex items-center gap-3 p-1 rounded-xl hover:bg-white dark:hover:bg-earth-700 transition-all group">
                            <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white dark:border-earth-600 shadow-sm">{user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" /> : <div className="w-full h-full bg-agro-100 flex items-center justify-center text-agro-600 font-black text-xs">{user.name.charAt(0)}</div>}</div>
                        </button>
                        <button onClick={handleLogout} className="p-2.5 text-earth-400 hover:text-red-500 hover:bg-white dark:hover:bg-earth-700 rounded-xl transition-all"><LogOut size={20} /></button>
                    </div>
                ) : (
                    <button onClick={() => handleNavClick(View.SIGN_UP)} className="bg-agro-600 text-white px-7 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] shadow-lg hover:bg-agro-500 active:scale-95 transition-all ml-2">Sync ID</button>
                )}
              </div>
              <button className={`p-3 rounded-2xl transition-all active:scale-90 shadow-xl border-4 border-white dark:border-earth-800 ${isMenuOpen ? 'bg-red-600 text-white border-red-500' : 'bg-agro-900 text-white border-agro-800'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>
          </div>
        </header>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[110] bg-white/95 dark:bg-earth-950/95 backdrop-blur-[60px] animate-in fade-in duration-500 overflow-y-auto">
             <div className="p-8 pb-32 max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
                   <Logo size={48} variant="horizontal" useGradient={true} />
                   <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-agro-900 text-white rounded-full shadow-2xl transition-all border-4 border-white/20"><X size={32} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 items-start">
                   {MENU_SECTIONS.map((section) => (
                      <section key={section.id} className="space-y-8 group/sec">
                         <h3 className="text-[11px] font-black uppercase tracking(0.5em] text-earth-400 flex items-center gap-4 pb-4 border-b border-earth-100 dark:border-white/5">{section.icon} {section.label}</h3>
                         <div className="grid gap-3">
                            {section.items.map(item => (
                              <button key={item.id} onClick={() => handleNavClick(item.id)} className={`flex items-start gap-5 p-4 rounded-[1.5rem] text-left transition-all border border-transparent group relative overflow-hidden ${currentView === item.id ? 'bg-agro-600 text-white shadow-xl' : 'hover:bg-agro-500/5 dark:hover:bg-white/5 hover:border-agro-500/10'}`}>
                                 <div className={`p-3 rounded-2xl shadow-sm shrink-0 ${currentView === item.id ? 'bg-white text-agro-600' : 'bg-white dark:bg-earth-800 text-earth-400 group-hover:text-agro-600 shadow-inner'}`}>{item.icon}</div>
                                 <div>
                                    <span className={`text-[11px] font-black uppercase tracking-widest mb-1.5 block ${currentView === item.id ? 'text-white' : 'text-earth-800 dark:text-earth-100'}`}>{item.label}</span>
                                    <p className={`text-[9px] font-medium leading-relaxed opacity-60 ${currentView === item.id ? 'text-white' : 'text-earth-400'}`}>{item.desc}</p>
                                 </div>
                              </button>
                            ))}
                         </div>
                      </section>
                   ))}
                </div>
             </div>
          </div>
        )}

        <main className="flex-1 min-h-screen pt-28 lg:pt-36 pb-20">
          <div className="mx-auto max-w-[1900px]">
            {currentView !== View.HOME && (
              <div className="px-8 mb-6 animate-in slide-in-from-left-4 duration-500">
                <button 
                  onClick={() => handleNavClick(backInfo.target)}
                  className="flex items-center gap-3 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-[0.3em] transition-all group"
                >
                  <div className="p-2.5 bg-white dark:bg-earth-900 rounded-xl shadow-sm border border-earth-100 dark:border-earth-800 group-hover:bg-agro-50 transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                  </div>
                  <span>Back to {backInfo.label}</span>
                </button>
              </div>
            )}
            
            <ViewHandler 
              currentView={currentView} 
              handleNavClick={handleNavClick} 
              user={user} 
              setUser={setUser} 
              awardEac={awardEac} 
              globalSearchQuery={globalSearchQuery} 
              isPartnerIntegrated={isPartnerIntegrated} 
              setIsPartnerIntegrated={setIsPartnerIntegrated} 
              partnerData={partnerData} 
              setPartnerData={setPartnerData} 
              setCurrency={setCurrency}
            />
          </div>
        </main>
        <AiConsultantFloating onOpenFull={() => handleNavClick(View.AI_ADVISOR)} />
        {currentView === View.HOME && <Footer onNavigate={handleNavClick} />}
      </div>
    </CurrencyProvider>
  );
};

const ViewHandler = ({ currentView, handleNavClick, user, setUser, awardEac, globalSearchQuery, isPartnerIntegrated, setIsPartnerIntegrated, partnerData, setPartnerData, setCurrency }) => {
    switch (currentView) {
      case View.HOME: return <Hero onNavigate={handleNavClick} />;
      case View.INFORMATION: return <Information onNavigate={handleNavClick} />;
      case View.PRODUCTS: return <Products setCurrency={setCurrency} />;
      case View.SERVICES: return <Services onNavigate={handleNavClick} />;
      case View.DATABASE: return <Database user={user} onAwardEac={awardEac} />;
      case View.HUMAN_RESOURCE: return <PeopleAndCulture user={user} onNavigate={handleNavClick} />;
      case View.AGRO_WORKERS_CLOUD: return <PeopleAndCulture user={user} onNavigate={handleNavClick} initialTab="CLOUD" />;
      case View.KNOWLEDGE: return <KnowledgeHub onNavigate={handleNavClick} initialSearch={globalSearchQuery} />;
      case View.DASHBOARD: return <Dashboard onNavigate={handleNavClick} />;
      case View.AI_ADVISOR: return <AiAdvisor />;
      case View.ROADMAP_AI: return <RoadmapAI />;
      case View.CROP_DOCTOR: return <CropDoctor />;
      case View.SUSTAINABILITY_CALCULATOR: return <SustainabilityCalculator />;
      case View.FARM_SCOUT: return <FarmScout onNavigate={handleNavClick} />;
      case View.CARBON_LEDGER: return <CarbonLedger user={user} onAwardEac={awardEac} onNavigate={handleNavClick} />;
      case View.SIGN_UP: return <Auth onLogin={(u) => { setUser({...u, eacBalance: 100}); handleNavClick(View.HOME); }} onNavigate={handleNavClick} />;
      case View.PROFILE: return user ? <UserProfile user={user} onUpdateUser={(u) => setUser(u)} /> : <Auth onLogin={(u) => { setUser({...u, eacBalance: 100}); handleNavClick(View.HOME); }} onNavigate={handleNavClick} />;
      case View.SUSTAINABILITY_FRAMEWORK: return <SustainabilityFramework onNavigate={handleNavClick} />;
      case View.BRANDS: return <Brands onNavigate={handleNavClick} />;
      case View.TRADEMARKS: return <Trademarks />;
      case View.MEDIA: return <Media onNavigate={handleNavClick} />;
      case View.SUPPLY: return <Supply onNavigate={handleNavClick} />;
      case View.CUSTOMER: return <Customer onNavigate={handleNavClick} />;
      case View.PARTNERSHIPS: return <Partnerships onNavigate={handleNavClick} onIntegrationComplete={(data) => { setIsPartnerIntegrated(true); setPartnerData(data); }} />;
      case View.FINANCE: return <Finance user={user} onNavigate={handleNavClick} />;
      case View.COMMUNITY: return <Community user={user} onNavigate={handleNavClick} onAwardEac={awardEac} />;
      case View.PODCAST: return <Podcast />;
      case View.HERITAGE_FORUM: return <HeritageForum />;
      case View.WEBINAR: return <Webinar />;
      case View.SMART_FARM_VR: return <SmartFarmVR />;
      case View.PLANET_WATCH: return <PlanetWatch />;
      case View.GREEN_LENS: return <GreenLens />;
      case View.SAFE_HARVEST: return <SafeHarvest onNavigate={handleNavClick} />;
      case View.NUTRILIFE: return <NutriLife />;
      case View.AGBIZ_WEEKLY: return <AgBizWeekly />;
      case View.INVESTOR_PORTAL: return <InvestorPortal onNavigate={handleNavClick} />;
      case View.SCALEUP_SUMMIT: return <ScaleUpSummit />;
      case View.LIVE_HOST: return <LiveHost />;
      case View.COMMUNITY_GUIDELINES: return <CommunityGuidelines onNavigate={handleNavClick} />;
      case View.INTRANET_DASHBOARD: return <IntranetDashboard />;
      case View.EXTRANET_DASHBOARD: return <ExtranetDashboard />;
      case View.PRIVACY_POLICY: return <PrivacyPolicy />;
      case View.SUPPLY_CHAIN_AUDIT: return <SupplyChainAudit />;
      case View.NETWORK_INPUT_HUB: return <NetworkInputHub onNavigate={handleNavClick} isIntegrated={isPartnerIntegrated} partnerName={partnerData?.name} partnerId={partnerData?.id} />;
      case View.TRANSMISSION_GATEWAY: return <TransmissionGateway onNavigate={handleNavClick} />;
      case View.FUTURE_VISION: return <FutureVision />;
      case View.SIX_SIGMA_RCA: return <SixSigmaRCA />;
      default: return <Hero onNavigate={handleNavClick} />;
    }
}

export default App;
