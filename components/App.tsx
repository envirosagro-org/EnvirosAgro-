import React, { useState, useEffect } from 'react';
import { View, User } from '../types';
import { Hero } from './Hero';
import { KnowledgeHub } from './KnowledgeHub';
import { Dashboard } from './Dashboard';
import { AiAdvisor } from './AiAdvisor';
import { RoadmapAI } from './RoadmapAI';
import { CropDoctor } from './CropDoctor';
import { SustainabilityCalculator } from './SustainabilityCalculator';
import { FarmScout } from './FarmScout';
import { CarbonLedger } from './CarbonLedger';
import { Auth } from './Auth';
import { Information } from './Information';
import { Products } from './Products';
import { Services } from './Services';
import { Database } from './Database';
import { HumanResource } from './HumanResource';
import { SustainabilityFramework } from './SustainabilityFramework';
import { Brands } from './Brands';
import { Trademarks } from './Trademarks';
import { Media } from './Media';
import { Supply } from './Supply';
import { Customer } from './Customer';
import { Partnerships } from './Partnerships';
import { Finance } from './Finance';
import { Community } from './Community';
import { UserProfile } from './UserProfile';
import { Podcast } from './Podcast';
import { HeritageForum } from './HeritageForum';
import { Webinar } from './Webinar';
import { SmartFarmVR } from './SmartFarmVR';
import { PlanetWatch } from './PlanetWatch';
import { GreenLens } from './GreenLens';
import { SafeHarvest } from './SafeHarvest';
import { NutriLife } from './NutriLife';
import { AgBizWeekly } from './AgBizWeekly';
import { InvestorPortal } from './InvestorPortal';
import { ScaleUpSummit } from './ScaleUpSummit';
import { LiveHost } from './LiveHost';
import { CommunityGuidelines } from './CommunityGuidelines';
import { IntranetDashboard } from './IntranetDashboard';
import { ExtranetDashboard } from './ExtranetDashboard';
import { AiConsultantFloating } from './AiConsultantFloating';
import { PrivacyPolicy } from './PrivacyPolicy';
import { SupplyChainAudit } from './SupplyChainAudit';
import { NetworkInputHub } from './NetworkInputHub';
import { Logo } from './Logo';
import { 
  Sprout, LayoutDashboard, BookOpen, Menu, X, 
  LogOut, ChevronDown, Users, Layers, MonitorPlay, Wallet, Coins, 
  ArrowLeft, BrainCircuit, ShieldCheck, Box, Grid3X3, Activity,
  Twitter, Facebook, Linkedin, Globe, ChevronRight, Maximize2, Minimize2, Monitor,
  Zap, Radio, Mic, Microscope, Calculator, Heart, Fingerprint, Sparkles, Binary,
  Video, Handshake, TrendingUp, Database as DbIcon, Compass, MapPin, Mail, Phone,
  Info, ArrowRight, Network, Server, Factory, ClipboardCheck, Smartphone,
  Scroll, Settings, Cpu, Cloud, Link
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen mode: ${e.message}`);
      });
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
  };

  const awardEac = (amount: number) => {
    if (user) setUser({ ...user, eacBalance: (user.eacBalance || 0) + amount });
  };

  const getBackTarget = (view: View): { target: View; label: string } => {
    const mediaViews = [View.PODCAST, View.HERITAGE_FORUM, View.WEBINAR, View.SMART_FARM_VR, View.PLANET_WATCH, View.GREEN_LENS, View.SAFE_HARVEST, View.NUTRILIFE, View.AGBIZ_WEEKLY, View.SCALEUP_SUMMIT, View.LIVE_HOST];
    if (mediaViews.includes(view)) return { target: View.MEDIA, label: 'Media Hub' };
    if (view === View.COMMUNITY_GUIDELINES) return { target: View.COMMUNITY, label: 'Community' };
    if (view === View.PROFILE) return { target: View.HOME, label: 'Home' };
    if (view === View.SUPPLY_CHAIN_AUDIT) return { target: View.SUPPLY, label: 'Supply Network' };
    if (view === View.AGRO_WORKERS_CLOUD) return { target: View.HUMAN_RESOURCE, label: 'HR Hub' };
    return { target: View.HOME, label: 'Home' };
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME: return <Hero onNavigate={handleNavClick} />;
      case View.INFORMATION: return <Information />;
      case View.PRODUCTS: return <Products />;
      case View.SERVICES: return <Services onNavigate={handleNavClick} />;
      case View.DATABASE: return <Database user={user} onAwardEac={awardEac} />;
      case View.HUMAN_RESOURCE: return <HumanResource user={user} onNavigate={handleNavClick} />;
      case View.AGRO_WORKERS_CLOUD: return <HumanResource user={user} onNavigate={handleNavClick} initialTab="CLOUD" />;
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
      case View.PARTNERSHIPS: return <Partnerships />;
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
      case View.NETWORK_INPUT_HUB: return <NetworkInputHub />;
      default: return <Hero onNavigate={handleNavClick} />;
    }
  };

  const backInfo = getBackTarget(currentView);

  const MENU_SECTIONS = [
    {
      id: 'INTELLIGENCE',
      label: 'Intelligence & Research',
      icon: <Sparkles size={16} className="text-purple-600" />,
      items: [
        { id: View.AI_ADVISOR, label: 'Strategic AI', icon: <BrainCircuit size={18}/>, desc: 'Consulting core' },
        { id: View.KNOWLEDGE, label: 'Knowledge Hub', icon: <BookOpen size={18}/>, desc: 'Research academy' },
        { id: View.CROP_DOCTOR, label: 'Crop Diagnostic', icon: <Microscope size={18}/>, desc: 'Instant health analysis' },
        { id: View.ROADMAP_AI, label: 'Path Optimizer', icon: <Zap size={18}/>, desc: '12-month strategy' },
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
        { id: View.SERVICES, label: 'Scientific Units', icon: <Sprout size={18}/>, desc: 'Lab-grade field protocols' },
        { id: View.FARM_SCOUT, label: 'Field Scouting', icon: <Grid3X3 size={18}/>, desc: 'Real-time sensor grid' }
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
        { id: View.PODCAST, label: 'AgroCulture', icon: <Mic size={18}/>, desc: 'Indigenous oral records' },
        { id: View.HERITAGE_FORUM, label: 'Heritage Forum', icon: <Scroll size={18}/>, desc: 'Community wisdom archive' }
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
        { id: View.BRANDS, label: 'Portfolio', icon: <Box size={18}/>, desc: 'Brand family experience' },
        { id: View.CUSTOMER, label: 'Citizen Portal', icon: <Heart size={18}/>, desc: 'Traceability & wellness' }
      ]
    },
    {
      id: 'PROFESSIONAL',
      label: 'Operations Center',
      icon: <Settings size={16} className="text-slate-600" />,
      items: [
        { id: View.AGRO_WORKERS_CLOUD, label: 'Agro Workers Cloud', icon: <Cloud size={18}/>, desc: 'Professional registry' },
        { id: View.HUMAN_RESOURCE, label: 'Human Resource', icon: <Users size={18}/>, desc: 'Talent & pathways' },
        { id: View.INTRANET_DASHBOARD, label: 'Internal Intranet', icon: <ShieldCheck size={18}/>, desc: 'Organizational control' },
        { id: View.EXTRANET_DASHBOARD, label: 'Partner Extranet', icon: <Globe size={18}/>, desc: 'Stakeholder alignment' },
        { id: View.SUPPLY_CHAIN_AUDIT, label: 'Gap Analysis', icon: <ClipboardCheck size={18}/>, desc: 'Supply chain health' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-earth-950 text-earth-900 dark:text-earth-50 font-sans transition-colors duration-500 overflow-x-hidden selection:bg-agro-500 selection:text-white">
      
      {/* 1. ADVANCED TELEMETRY HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out isolate ${
          scrolled 
          ? 'mt-3 mx-4 md:mx-10 rounded-[2.5rem] bg-white/70 dark:bg-earth-900/80 backdrop-blur-3xl border border-white/40 dark:border-white/5 py-1.5 shadow-cinematic-lg' 
          : 'bg-white/40 dark:bg-earth-950/40 backdrop-blur-xl border-b border-earth-100/10 py-5'
        }`}
      >
        <div className="max-w-[1900px] mx-auto px-8 flex items-center justify-between gap-6">
          
          <div className="flex items-center gap-10">
            <div 
              className="flex items-center gap-2 cursor-pointer group shrink-0 transition-transform active:scale-95" 
              onClick={() => handleNavClick(View.HOME)}
            >
              <Logo size={scrolled ? 34 : 42} variant="horizontal" useGradient={true} />
            </div>

            {/* Network Pulse Indicators */}
            <div className="hidden xl:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-earth-400">
               <div className="flex items-center gap-3 bg-earth-50/50 dark:bg-earth-800/40 px-4 py-2 rounded-xl shadow-inner border border-black/5 dark:border-white/5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                  <span>Pulse: 8.54m(t)</span>
               </div>
               <div className="flex items-center gap-3 bg-earth-50/50 dark:bg-earth-800/40 px-4 py-2 rounded-xl shadow-inner border border-black/5 dark:border-white/5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Sync: Global_Ok</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Context Controls */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
                <button 
                  onClick={() => handleNavClick(View.DASHBOARD)} 
                  className={`p-2.5 rounded-xl transition-all ${currentView === View.DASHBOARD ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}
                  title="Impact Dashboard"
                >
                   <LayoutDashboard size={20} />
                </button>
                <button 
                  onClick={toggleFullscreen} 
                  className={`p-2.5 rounded-xl transition-all ${isFullscreen ? 'bg-blue-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}
                >
                   {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
            </div>

            {/* Profile Pod */}
            <div className="flex items-center gap-2 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
              {user ? (
                  <div className="flex items-center gap-1.5 px-1.5">
                      <div className="hidden lg:flex items-center gap-3 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 group cursor-default">
                          <Coins size={16} className="text-amber-500 group-hover:rotate-12 transition-transform" />
                          <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">{user.eacBalance} EAC</span>
                      </div>
                      <button 
                        onClick={() => handleNavClick(View.PROFILE)} 
                        className="flex items-center gap-3 p-1 rounded-xl hover:bg-white dark:hover:bg-earth-700 transition-all group"
                      >
                          <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white dark:border-earth-600 shadow-sm group-hover:scale-105 transition-transform">
                              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-agro-100 flex items-center justify-center text-agro-600 font-black text-xs">{user.name.charAt(0)}</div>}
                          </div>
                      </button>
                      <button 
                        onClick={handleLogout} 
                        className="p-2.5 text-earth-400 hover:text-red-500 hover:bg-white dark:hover:bg-earth-700 rounded-xl transition-all" 
                      >
                        <LogOut size={20} />
                      </button>
                  </div>
              ) : (
                  <button 
                    onClick={() => handleNavClick(View.SIGN_UP)} 
                    className="nature-gradient text-white px-7 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] shadow-lg hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all ml-2"
                  >
                    Sync ID
                  </button>
              )}
            </div>
            
            <button 
              className={`p-3 rounded-2xl transition-all active:scale-90 shadow-xl border-4 border-white dark:border-earth-800 ${isMenuOpen ? 'bg-red-600 text-white border-red-500 shadow-red-600/20' : 'bg-agro-900 text-white border-agro-800 shadow-agro-900/20'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Dynamic Context Breadcrumb Overlay */}
        {!isMenuOpen && currentView !== View.HOME && (
          <div className="bg-white/70 dark:bg-earth-950/50 backdrop-blur-3xl border-t border-earth-100/30 dark:border-white/5 animate-in slide-in-from-top-1 mt-1.5 shadow-sm">
            <div className="max-w-[1900px] mx-auto px-10 py-2 flex items-center gap-8 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => handleNavClick(backInfo.target)}
                className="group flex items-center gap-2 text-[9px] font-black text-earth-400 hover:text-agro-600 transition-all uppercase tracking-[0.4em] whitespace-nowrap"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
                {backInfo.label}
              </button>
              <div className="h-4 w-px bg-earth-200 dark:bg-white/10 shrink-0"></div>
              <div className="flex items-center gap-3">
                <div className="p-1 bg-agro-500/10 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                </div>
                <span className="text-[9px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-[0.4em] whitespace-nowrap">
                   {currentView.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. ENVIROSAGRO STRATEGIC MEGA MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-white/95 dark:bg-earth-950/95 backdrop-blur-[60px] animate-in fade-in duration-500 overflow-y-auto">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03] pointer-events-none"></div>
           
           <div className="p-8 pb-32 max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
                 <Logo size={48} variant="horizontal" useGradient={true} />
                 <div className="flex items-center gap-6">
                    {/* Cloud Status Indicator for Professionals */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-center gap-4">
                        <div className="p-2 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20"><Cloud size={18} /></div>
                        <div className="text-left">
                            <p className="text-[8px] font-black text-earth-400 uppercase tracking-[0.4em]">Professional Cloud</p>
                            <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{user?.role === 'Researcher' ? 'SYNCED_NODE_08' : 'GUEST_ACCESS'}</p>
                        </div>
                    </div>
                    <div className="bg-agro-50 dark:bg-agro-900/30 px-6 py-3 rounded-2xl border border-agro-100 dark:border-agro-800 flex items-center gap-4">
                        <div className="p-2 bg-agro-600 text-white rounded-lg shadow-lg shadow-agro-600/20"><Activity size={18} /></div>
                        <div className="text-left">
                            <p className="text-[8px] font-black text-earth-400 uppercase tracking-filled">Network Status</p>
                            <p className="text-xs font-black text-agro-600 uppercase tracking-widest">v4.2.2-STABLE • ALL NODES SYNCED</p>
                        </div>
                    </div>
                    <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-agro-900 text-white rounded-full shadow-2xl hover:rotate-90 transition-all border-4 border-white/20">
                        <X size={32} />
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 items-start">
                 {MENU_SECTIONS.map((section) => (
                    <section key={section.id} className="space-y-8 group/sec">
                       <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-earth-400 flex items-center gap-4 pb-4 border-b border-earth-100 dark:border-white/5 transition-all group-hover/sec:text-earth-900 dark:group-hover/sec:text-white">
                           {section.icon} {section.label}
                       </h3>
                       <div className="grid gap-3">
                          {section.items.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => handleNavClick(item.id)} 
                                className={`flex items-start gap-5 p-4 rounded-[1.5rem] text-left transition-all border border-transparent group relative overflow-hidden ${currentView === item.id ? 'bg-agro-600 text-white shadow-xl shadow-agro-600/20' : 'hover:bg-agro-500/5 dark:hover:bg-white/5 hover:border-agro-500/10'}`}
                            >
                               <div className={`p-3 rounded-2xl shadow-sm transition-all group-hover:scale-110 group-hover:rotate-3 shrink-0 ${currentView === item.id ? 'bg-white text-agro-600' : 'bg-white dark:bg-earth-800 text-earth-400 group-hover:text-agro-600 shadow-inner border border-black/5'}`}>
                                 {item.icon}
                               </div>
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

              <div className="mt-32 pt-12 border-t border-earth-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
                 <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-earth-400">
                    <button onClick={() => handleNavClick(View.SUSTAINABILITY_FRAMEWORK)} className="hover:text-agro-600 transition-colors flex items-center gap-3 group">
                        <Layers size={14} className="group-hover:rotate-12 transition-transform" /> Framework Standards
                    </button>
                    <button onClick={() => handleNavClick(View.PRIVACY_POLICY)} className="hover:text-agro-600 transition-colors flex items-center gap-3 group">
                        <ShieldCheck size={14} className="group-hover:rotate-12 transition-transform" /> Governance Protocols
                    </button>
                    <button onClick={() => handleNavClick(View.COMMUNITY_GUIDELINES)} className="hover:text-agro-600 transition-colors flex items-center gap-3 group">
                        <Heart size={14} className="group-hover:rotate-12 transition-transform" /> Ethical Code
                    </button>
                 </div>
                 <div className="bg-earth-50 dark:bg-white/5 px-8 py-4 rounded-3xl border border-earth-100 dark:border-white/10 flex items-center gap-5">
                    <Globe size={18} className="text-blue-500" />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                       EnvirosAgro Global Strategic Authority <br/>
                       <span className="text-[8px] text-earth-400 mt-1 block">m(t) Resilience Sync v4.2.2-STABLE</span>
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}
      
      <main className="min-h-screen pt-28 lg:pt-36 pb-20">
        <div className="mx-auto max-w-[1900px]">
          {renderContent()}
        </div>
      </main>
      
      <AiConsultantFloating onOpenFull={() => handleNavClick(View.AI_ADVISOR)} />
      
      <footer className="bg-[#050a14] dark:bg-earth-950 text-slate-400 pt-24 pb-12 px-10 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>

        <div className="mx-auto max-w-[1700px] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-16 mb-24">
              
              <div className="space-y-8">
                  <Logo size={40} variant="horizontal" color="white" />
                  <p className="leading-relaxed text-slate-500 font-medium text-xs opacity-90 uppercase tracking-widest max-w-xs">
                    "To ensure agriculture and its environ is smooth, reliable and safe."
                  </p>
                  <div className="flex gap-4">
                      {[Twitter, Facebook, Linkedin].map((Icon, i) => (
                          <div key={i} className="w-11 h-11 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center transition-all cursor-pointer text-slate-400 border border-white/10 group shadow-lg">
                              <Icon size={20} className="group-hover:scale-110 transition-transform" />
                          </div>
                      ))}
                  </div>
              </div>

              <div className="space-y-8">
                  <h4 className="text-white font-black uppercase tracking-[0.5em] text-[10px] flex items-center gap-3 pb-3 border-b border-white/5">
                      <Zap size={14} className="text-amber-500" /> Control Hub
                  </h4>
                  <ul className="space-y-4">
                      {[
                        { label: 'Network Input Hub', view: View.NETWORK_INPUT_HUB },
                        { id: View.DASHBOARD, label: 'Resilience Monitor' },
                        { id: View.KNOWLEDGE, label: 'Intelligence Base' },
                        { id: View.SUSTAINABILITY_FRAMEWORK, label: 'Thrust Metrics' },
                        { id: View.SUPPLY_CHAIN_AUDIT, label: 'Performance Audit' }
                      ].map(link => (
                        <li key={link.label} onClick={() => handleNavClick(link.view || link.id as View)} className="cursor-pointer hover:text-agro-400 transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-wider group">
                           <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-agro-500 transition-all"></div>
                           {link.label}
                        </li>
                      ))}
                  </ul>
              </div>

              <div className="space-y-8">
                  <h4 className="text-white font-black uppercase tracking-[0.5em] text-[10px] flex items-center gap-3 pb-3 border-b border-white/5">
                      <Cpu size={14} className="text-blue-500" /> Tech Units
                  </h4>
                  <ul className="space-y-4">
                      {[
                        { id: View.CROP_DOCTOR, label: 'AI Diagnostic' },
                        { id: View.FARM_SCOUT, label: 'Field Telemetry' },
                        { id: View.SMART_FARM_VR, label: 'Virtual Training' },
                        { id: View.SERVICES, label: 'Scientific Services' },
                        { id: View.ROADMAP_AI, label: 'Strategy Core' }
                      ].map(link => (
                        <li key={link.id} onClick={() => handleNavClick(link.id)} className="cursor-pointer hover:text-blue-400 transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-wider group">
                           <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-all"></div>
                           {link.label}
                        </li>
                      ))}
                  </ul>
              </div>

              <div className="space-y-8">
                  <h4 className="text-white font-black uppercase tracking-[0.5em] text-[10px] flex items-center gap-3 pb-3 border-b border-white/5">
                      <Users size={14} className="text-rose-500" /> Collective
                  </h4>
                  <ul className="space-y-4">
                      {[
                        { id: View.COMMUNITY, label: 'Member Hubs' },
                        { id: View.FINANCE, label: 'Tokenz™ Exchange' },
                        { id: View.INVESTOR_PORTAL, label: 'Capital Node' },
                        { id: View.BRANDS, label: 'Portfolio' },
                        { id: View.SUPPLY, label: 'Supply Chain' }
                      ].map(link => (
                        <li key={link.id} onClick={() => handleNavClick(link.id)} className="cursor-pointer hover:text-rose-400 transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-wider group">
                           <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-rose-500 transition-all"></div>
                           {link.label}
                        </li>
                      ))}
                  </ul>
              </div>

              <div className="space-y-8">
                  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-inner relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Globe size={100} /></div>
                      <div className="flex items-center gap-3 mb-6 relative z-10">
                          <div className="w-2 h-2 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                          <span className="text-[10px] font-black text-agro-500 uppercase tracking-[0.4em]">Grid_Active</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider mb-8 relative z-10">
                        Global Headquarters <br/>
                        <span className="text-slate-400">Kiriaini, Murang'a Cluster <br/> East Africa, 0.45S, 36.9E</span>
                      </p>
                      <button onClick={() => handleNavClick(View.INFORMATION)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-3 rounded-2xl text-[9px] uppercase tracking-widest transition-all">
                        Contact Command Node
                      </button>
                  </div>
              </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">
              <p>© {new Date().getFullYear()} ENVIROSAGRO STRATEGIC INFRASTRUCTURE. ALL ASSETS HASHED VIA m(t) LEDGER.</p>
              
              <div className="flex gap-12">
                  <span onClick={() => handleNavClick(View.PRIVACY_POLICY)} className="hover:text-white cursor-pointer transition-colors">Privacy Sovereignty</span>
                  <span onClick={() => handleNavClick(View.TRADEMARKS)} className="hover:text-white cursor-pointer transition-colors">Legal & IP</span>
              </div>

              <div className="flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 group cursor-default">
                  <Activity size={16} className="text-blue-500 animate-pulse group-hover:scale-125 transition-transform" />
                  <span className="text-slate-400 group-hover:text-white transition-colors">UPLINK_STABLE: v4.2.2-G_NODE</span>
              </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;