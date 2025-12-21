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
import { HumanResource } from './components/HumanResource';
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
import { Logo } from './components/Logo';
import { 
  Sprout, LayoutDashboard, BookOpen, Menu, X, 
  LogOut, ChevronDown, Database as DbIcon, Users, Layers, MonitorPlay, Wallet, Coins, 
  ArrowLeft, BrainCircuit, ShieldCheck, Box, Grid3X3, Activity,
  Twitter, Facebook, Linkedin, Globe, ChevronRight, Maximize2, Minimize2, Monitor
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  // Fullscreen & Wide Mode States
  const [isWideMode, setIsWideMode] = useState(false);
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

  // Fullscreen Listener
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
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleNavClick = (view: View, searchQuery?: string) => {
    if (searchQuery !== undefined) {
      setGlobalSearchQuery(searchQuery);
    } else {
      setGlobalSearchQuery('');
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (newUser: User) => {
    setUser({ ...newUser, eacBalance: newUser.eacBalance || 100 }); 
    setCurrentView(View.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
  };

  const awardEac = (amount: number) => {
    if (user) {
      setUser({ ...user, eacBalance: (user.eacBalance || 0) + amount });
    }
  };

  const getBackTarget = (view: View): { target: View; label: string } => {
    const mediaViews = [
      View.PODCAST, View.HERITAGE_FORUM, View.WEBINAR, View.SMART_FARM_VR,
      View.PLANET_WATCH, View.GREEN_LENS, View.SAFE_HARVEST, View.NUTRILIFE,
      View.AGBIZ_WEEKLY, View.SCALEUP_SUMMIT, View.LIVE_HOST
    ];
    if (mediaViews.includes(view)) return { target: View.MEDIA, label: 'Media Hub' };
    if (view === View.COMMUNITY_GUIDELINES) return { target: View.COMMUNITY, label: 'Community' };
    if (view === View.PROFILE) return { target: View.HOME, label: 'Home' };
    if (view === View.SUPPLY_CHAIN_AUDIT) return { target: View.SUPPLY, label: 'Supply Network' };
    return { target: View.HOME, label: 'Home' };
  };

  const renderContent = () => {
    return (
      <div key={currentView} className="animate-in fade-in zoom-in-95 duration-700">
        {(() => {
          switch (currentView) {
            case View.HOME: return <Hero onNavigate={handleNavClick} />;
            case View.INFORMATION: return <Information />;
            case View.PRODUCTS: return <Products />;
            case View.SERVICES: return <Services onNavigate={handleNavClick} />;
            case View.DATABASE: return <Database user={user} onAwardEac={awardEac} />;
            case View.HUMAN_RESOURCE: return <HumanResource onNavigate={handleNavClick} />;
            case View.KNOWLEDGE: return <KnowledgeHub onNavigate={handleNavClick} initialSearch={globalSearchQuery} />;
            case View.DASHBOARD: return <Dashboard onNavigate={handleNavClick} />;
            case View.AI_ADVISOR: return <AiAdvisor />;
            case View.ROADMAP_AI: return <RoadmapAI />;
            case View.CROP_DOCTOR: return <CropDoctor />;
            case View.SUSTAINABILITY_CALCULATOR: return <SustainabilityCalculator />;
            case View.FARM_SCOUT: return <FarmScout onNavigate={handleNavClick} />;
            case View.CARBON_LEDGER: return <CarbonLedger user={user} onAwardEac={awardEac} onNavigate={handleNavClick} />;
            case View.SIGN_UP: return <Auth onLogin={handleLogin} onNavigate={handleNavClick} />;
            case View.PROFILE: return user ? <UserProfile user={user} onUpdateUser={(u) => setUser(u)} /> : <Auth onLogin={handleLogin} onNavigate={handleNavClick} />;
            case View.SUSTAINABILITY_FRAMEWORK: return <SustainabilityFramework />;
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
            default: return <Hero onNavigate={handleNavClick} />;
          }
        })()}
      </div>
    );
  };

  const backInfo = getBackTarget(currentView);

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-earth-950 text-earth-900 dark:text-earth-50 font-sans transition-colors duration-500 overflow-x-hidden">
      
      {/* Immersive Fixed Translucent Navigation Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out isolate ${
          scrolled 
          ? 'mt-3 mx-4 md:mx-10 rounded-[2.5rem] bg-white/70 dark:bg-earth-900/80 backdrop-blur-3xl border border-white/40 dark:border-white/5 py-1.5 shadow-cinematic-lg' 
          : 'bg-white/40 dark:bg-earth-950/40 backdrop-blur-xl border-b border-earth-100/10 py-5'
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className={`mx-auto px-8 flex items-center justify-between gap-8 ${isWideMode ? 'max-w-none' : 'max-w-7xl'}`}>
          
          <div className="flex items-center gap-12">
            <div 
              className="flex items-center gap-2 cursor-pointer group shrink-0 transition-transform active:scale-95" 
              onClick={() => handleNavClick(View.HOME)}
            >
              <Logo size={scrolled ? 34 : 42} variant="horizontal" useGradient={true} />
            </div>

            {/* Main Operational Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <button 
                onClick={() => handleNavClick(View.HOME)} 
                className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all relative overflow-hidden group ${currentView === View.HOME ? 'text-agro-700 dark:text-agro-400 bg-agro-50/60 dark:bg-agro-900/50' : 'text-earth-500 dark:text-earth-400 hover:text-agro-600'}`}
              >
                Foundation
                {currentView === View.HOME && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-agro-500 shadow-[0_0_10px_#22c55e]"></span>}
              </button>
              
              <div className="relative" onMouseEnter={() => setActiveDropdown('solutions')}>
                 <button className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all flex items-center gap-2 ${activeDropdown === 'solutions' ? 'text-agro-600' : 'text-earth-500 dark:text-earth-400 hover:text-agro-600'}`}>
                   Solutions <ChevronDown size={14} className={`transition-transform duration-500 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                 </button>
                 {activeDropdown === 'solutions' && (
                   <div className="absolute top-full left-0 mt-3 w-80 bg-white/95 dark:bg-earth-900/95 backdrop-blur-[40px] rounded-[3rem] shadow-cinematic-lg border border-earth-100 dark:border-white/10 p-3 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03] pointer-events-none rounded-[3rem]"></div>
                      {[
                        { id: View.SERVICES, label: 'Scientific Services', icon: <Sprout size={18} className="text-agro-600" />, desc: 'Consulting & expert protocols' },
                        { id: View.KNOWLEDGE, label: 'Research Intelligence', icon: <BookOpen size={18} className="text-blue-600" />, desc: 'Standardized data repository' },
                        { id: View.FARM_SCOUT, label: 'Precision Scouting', icon: <Grid3X3 size={18} className="text-purple-600" />, desc: 'Real-time AI field monitoring' },
                        { id: View.SUSTAINABILITY_FRAMEWORK, label: 'Resilience Model', icon: <Layers size={18} className="text-amber-600" />, desc: 'The Five Thrusts standard' }
                      ].map(item => (
                        <button key={item.id} onClick={() => handleNavClick(item.id)} className="w-full text-left p-5 rounded-3xl hover:bg-earth-50/80 dark:hover:bg-earth-800 flex items-start gap-4 transition-all group/item relative z-10">
                            <div className="mt-0.5 bg-white dark:bg-earth-700 p-3 rounded-2xl shadow-sm group-hover/item:scale-110 group-hover/item:rotate-3 transition-all">{item.icon}</div>
                            <div>
                                <p className="text-xs font-black text-earth-900 dark:text-white uppercase tracking-widest">{item.label}</p>
                                <p className="text-[10px] text-earth-400 font-medium mt-1 leading-relaxed opacity-80">{item.desc}</p>
                            </div>
                        </button>
                      ))}
                   </div>
                 )}
              </div>

              <div className="relative" onMouseEnter={() => setActiveDropdown('ecosystem')}>
                 <button className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all flex items-center gap-2 ${activeDropdown === 'ecosystem' ? 'text-agro-600' : 'text-earth-500 dark:text-earth-400 hover:text-agro-600'}`}>
                   Network <ChevronDown size={14} className={`transition-transform duration-500 ${activeDropdown === 'ecosystem' ? 'rotate-180' : ''}`} />
                 </button>
                 {activeDropdown === 'ecosystem' && (
                   <div className="absolute top-full left-0 mt-3 w-80 bg-white/95 dark:bg-earth-900/95 backdrop-blur-[40px] rounded-[3rem] shadow-cinematic-lg border border-earth-100 dark:border-white/10 p-3 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03] pointer-events-none rounded-[3rem]"></div>
                      {[
                        { id: View.COMMUNITY, label: 'Member collectives', icon: <Users size={18} className="text-rose-600" />, desc: 'Social ID & ESIN hubs' },
                        { id: View.BRANDS, label: 'Brand Portfolio', icon: <Box size={18} className="text-orange-600" />, desc: 'Our specialized ag-tech divisions' },
                        { id: View.MEDIA, label: 'Broadcast Media', icon: <MonitorPlay size={18} className="text-red-600" />, desc: 'Global intelligence newsroom' },
                        { id: View.FINANCE, label: 'Capital Exchange', icon: <Wallet size={18} className="text-amber-600" />, desc: 'Tokenz & impact investment' }
                      ].map(item => (
                        <button key={item.id} onClick={() => handleNavClick(item.id)} className="w-full text-left p-5 rounded-3xl hover:bg-earth-50/80 dark:hover:bg-earth-800 flex items-start gap-4 transition-all group/item relative z-10">
                            <div className="mt-0.5 bg-white dark:bg-earth-700 p-3 rounded-2xl shadow-sm group-hover/item:scale-110 group-hover/item:rotate-3 transition-all">{item.icon}</div>
                            <div>
                                <p className="text-xs font-black text-earth-900 dark:text-white uppercase tracking-widest">{item.label}</p>
                                <p className="text-[10px] text-earth-400 font-medium mt-1 leading-relaxed opacity-80">{item.desc}</p>
                            </div>
                        </button>
                      ))}
                   </div>
                 )}
              </div>

              <button 
                onClick={() => handleNavClick(View.DASHBOARD)} 
                className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all ${currentView === View.DASHBOARD ? 'text-agro-700 bg-agro-50/60 dark:bg-agro-900/50' : 'text-earth-500 dark:text-earth-400 hover:text-agro-600'}`}
              >
                Telemetry
              </button>
            </div>
          </div>

          {/* User Control & Immersive Action Pod */}
          <div className="flex items-center gap-4">
            {/* View Mode Controls */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
                <button 
                  onClick={() => setIsWideMode(!isWideMode)} 
                  className={`p-2 rounded-xl transition-all ${isWideMode ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800'}`}
                  title={isWideMode ? "Standard Width" : "Theater Mode"}
                >
                   <Monitor size={16} />
                </button>
                <button 
                  onClick={toggleFullscreen} 
                  className={`p-2 rounded-xl transition-all ${isFullscreen ? 'bg-blue-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800'}`}
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Immersive View"}
                >
                   {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-earth-50/50 dark:bg-earth-800/40 rounded-2xl border border-earth-100/50 dark:border-white/5 shadow-inner">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e] shrink-0"></div>
               <span className="text-[9px] font-black text-earth-400 uppercase tracking-widest hidden sm:block">Network Pulse: 8.54m</span>
            </div>

            <div className="flex items-center gap-2 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
              {user ? (
                  <div className="flex items-center gap-1.5 px-1.5">
                      <div className="hidden sm:flex items-center gap-2.5 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 group cursor-default">
                          <Coins size={14} className="text-amber-500 group-hover:rotate-12 transition-transform" />
                          <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">{user.eacBalance} EAC</span>
                      </div>
                      
                      <button 
                        onClick={() => handleNavClick(View.PROFILE)} 
                        className="flex items-center gap-3 p-1 rounded-xl hover:bg-white dark:hover:bg-earth-700 transition-all group"
                      >
                          <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white dark:border-earth-600 shadow-sm group-hover:scale-105 transition-transform">
                              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-agro-100 dark:bg-agro-900/50 flex items-center justify-center text-agro-600 font-black text-xs">{user.name.charAt(0)}</div>}
                          </div>
                      </button>
                      
                      <button 
                        onClick={handleLogout} 
                        className="p-2.5 text-earth-400 hover:text-red-500 hover:bg-white dark:hover:bg-earth-700 rounded-xl transition-all" 
                        title="Secure Terminal Logout"
                      >
                        <LogOut size={18} />
                      </button>
                  </div>
              ) : (
                  <button 
                    onClick={() => handleNavClick(View.SIGN_UP)} 
                    className="nature-gradient text-white px-7 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] shadow-lg hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all ml-2"
                  >
                    Register ID
                  </button>
              )}
            </div>
            
            <button 
              className="lg:hidden p-3 text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 rounded-2xl transition-all active:scale-90" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Translucent Dynamic Context Header Bar */}
        {currentView !== View.HOME && (
          <div className="bg-white/70 dark:bg-earth-950/50 backdrop-blur-3xl border-t border-earth-100/30 dark:border-white/5 animate-in slide-in-from-top-1 duration-700 mt-1.5 overflow-hidden shadow-sm">
            <div className={`${isWideMode ? 'max-w-none' : 'max-w-7xl'} mx-auto px-10 py-2.5 flex items-center gap-10 overflow-x-auto no-scrollbar`}>
              <button 
                onClick={() => handleNavClick(backInfo.target)}
                className="group flex items-center gap-3 text-[9px] font-black text-earth-400 hover:text-agro-600 transition-all uppercase tracking-[0.4em] whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full border border-earth-100 dark:border-earth-800 flex items-center justify-center group-hover:bg-agro-50 transition-colors">
                  <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> 
                </div>
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
      
      {/* Primary Content Scrollway */}
      <main className={`min-h-screen pt-24 lg:pt-32 transition-all duration-700 ${isWideMode ? 'px-4' : ''}`}>
        <div className={`mx-auto transition-all duration-700 ${isWideMode ? 'max-w-none' : 'max-w-7xl'}`}>
          {renderContent()}
        </div>
      </main>
      
      {/* AI Consultant */}
      <AiConsultantFloating onOpenFull={() => handleNavClick(View.AI_ADVISOR)} />
      
      {/* Optimized & Shortened Organization Footer */}
      <footer className="bg-[#0a0f1a] dark:bg-earth-950 text-slate-400 py-10 px-10 mt-8 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent"></div>

        <div className={`mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10 ${isWideMode ? 'max-w-none' : 'max-w-7xl'}`}>
          
          {/* Left Side: Branding, Pulse & Socials */}
          <div className="max-w-md space-y-6">
            <div className="space-y-4">
                <Logo size={40} variant="horizontal" color="white" />
                <p className="leading-relaxed text-slate-500 font-medium text-xs opacity-80 max-w-xs">
                  Pioneering global resilience through the Five Thrusts framework. Standardizing sustainable development across verified network nodes.
                </p>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex gap-2">
                    {[Twitter, Facebook, Linkedin].map((Icon, i) => (
                        <div key={i} className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all cursor-pointer text-white border border-white/5 group shadow-inner">
                            <Icon size={16} className="group-hover:scale-110 transition-transform group-hover:text-blue-400" />
                        </div>
                    ))}
                </div>
                <div className="h-6 w-px bg-white/10"></div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-agro-600/20 rounded-xl flex items-center justify-center border border-agro-500/20">
                        <Globe size={16} className="text-agro-400" />
                    </div>
                    <div>
                        <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em]">Network Pulse</p>
                        <div className="flex items-center gap-1.5 text-agro-500 font-black text-[9px] uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                            SYNCED
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Right Side: Compressed Link Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-6">
            <div className="space-y-4">
                <h4 className="text-white font-black uppercase tracking-[0.4em] text-[8px] pb-2 border-b border-white/5">Infrastructure</h4>
                <ul className="space-y-2.5">
                {[
                    { label: 'Field Scout AI', view: View.FARM_SCOUT },
                    { label: 'Carbon Ledger', view: View.CARBON_LEDGER },
                    { label: 'Crop Doctor', view: View.CROP_DOCTOR },
                    { label: 'Roadmap AI', view: View.ROADMAP_AI }
                ].map(link => (
                    <li key={link.label} onClick={() => handleNavClick(link.view)} className="cursor-pointer hover:text-agro-400 transition-all flex items-center gap-2.5 text-[11px] font-bold group">
                    <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-agro-500 transition-all"></div>
                    {link.label}
                    </li>
                ))}
                </ul>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-black uppercase tracking-[0.4em] text-[8px] pb-2 border-b border-white/5">Network</h4>
                <ul className="space-y-2.5">
                {[
                    { label: 'Talent Cloud', view: View.HUMAN_RESOURCE },
                    { label: 'Partner Hub', view: View.EXTRANET_DASHBOARD },
                    { label: 'Global Data', view: View.DATABASE },
                    { label: 'Investor Node', view: View.INVESTOR_PORTAL }
                ].map(link => (
                    <li key={link.label} onClick={() => handleNavClick(link.view)} className="cursor-pointer hover:text-agro-400 transition-all flex items-center gap-2.5 text-[11px] font-bold group">
                    <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-agro-500 transition-all"></div>
                    {link.label}
                    </li>
                ))}
                </ul>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-black uppercase tracking-[0.4em] text-[8px] pb-2 border-b border-white/5">Channels</h4>
                <ul className="space-y-2.5">
                {[
                    { label: 'Impact Docs', view: View.GREEN_LENS },
                    { label: 'Newsroom', view: View.PLANET_WATCH },
                    { label: 'Forum', view: View.HERITAGE_FORUM },
                    { label: 'Summit', view: View.SCALEUP_SUMMIT }
                ].map(link => (
                    <li key={link.label} onClick={() => handleNavClick(link.view)} className="cursor-pointer hover:text-agro-400 transition-all flex items-center gap-2.5 text-[11px] font-bold group">
                    <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-agro-500 transition-all"></div>
                    {link.label}
                    </li>
                ))}
                </ul>
            </div>
          </div>
        </div>

        {/* Compressed Bottom Bar */}
        <div className={`mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] font-black uppercase tracking-[0.3em] ${isWideMode ? 'max-w-none px-4' : 'max-w-7xl'}`}>
            <p className="text-slate-600">© {new Date().getFullYear()} ENVIROSAGRO INFRASTRUCTURE. DATA SOVEREIGNTY ENABLED.</p>
            <div className="flex flex-wrap justify-center gap-8 text-slate-500">
                <span onClick={() => handleNavClick(View.PRIVACY_POLICY)} className="hover:text-white cursor-pointer transition-colors">Governance</span>
                <span onClick={() => handleNavClick(View.COMMUNITY_GUIDELINES)} className="hover:text-white cursor-pointer transition-colors">Ethics</span>
                <span onClick={() => handleNavClick(View.TRADEMARKS)} className="hover:text-white cursor-pointer transition-colors">Legal</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;