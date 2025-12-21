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
  LogOut, ChevronDown, Users, Layers, MonitorPlay, Wallet, Coins, 
  ArrowLeft, BrainCircuit, ShieldCheck, Box, Grid3X3, Activity,
  Twitter, Facebook, Linkedin, Globe, ChevronRight, Maximize2, Minimize2, Monitor,
  Zap, Radio, Mic, Microscope, Calculator, Heart, Fingerprint, Sparkles, Binary,
  Video, Handshake, TrendingUp, Database as DbIcon, Compass, MapPin, Mail, Phone,
  Info,
  // Added comment above fix: Added missing ArrowRight import from lucide-react
  ArrowRight
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

  const handleLogin = (newUser: User) => {
    setUser({ ...newUser, eacBalance: newUser.eacBalance || 100 }); 
    setCurrentView(View.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
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
      
      {/* COMPRESSED FLOATING HEADER */}
      <header 
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-in-out isolate ${
          scrolled 
          ? 'mt-4 w-[92%] max-w-4xl rounded-full bg-white/70 dark:bg-earth-900/80 backdrop-blur-3xl border border-white/40 dark:border-white/5 py-1.5 shadow-cinematic-lg px-4' 
          : 'mt-0 w-full bg-white/40 dark:bg-earth-950/40 backdrop-blur-xl border-b border-earth-100/10 py-5 px-8'
        }`}
      >
        <div className="mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-2 cursor-pointer group shrink-0 transition-transform active:scale-95" 
              onClick={() => handleNavClick(View.HOME)}
            >
              <Logo size={scrolled ? 30 : 38} variant="horizontal" useGradient={true} />
            </div>

            {/* Desktop Quick Nav - High Compression */}
            <nav className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => handleNavClick(View.DASHBOARD)} 
                className={`p-2.5 rounded-full transition-all flex items-center gap-2 ${currentView === View.DASHBOARD ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-500 dark:text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800'}`}
                title="Global Telemetry"
              >
                <LayoutDashboard size={18} />
                {!scrolled && <span className="text-[10px] font-black uppercase tracking-widest pr-2">Telemetry</span>}
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(true)} 
                className="bg-agro-50 dark:bg-agro-950/40 text-agro-700 dark:text-agro-400 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-agro-100 dark:hover:bg-agro-900 transition-all border border-agro-100/50"
              >
                <Compass size={18} className="animate-spin-slow" />
                Strategic Hub
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Controls - Hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-black/5 dark:bg-earth-900/50 rounded-full border border-white/10 shadow-inner backdrop-blur-md">
                <button onClick={toggleFullscreen} className={`p-2 rounded-full transition-all ${isFullscreen ? 'bg-blue-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800'}`}>
                   {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
            </div>

            <div className="flex items-center gap-2 p-1 bg-black/5 dark:bg-earth-900/50 rounded-full border border-white/10 shadow-inner backdrop-blur-md">
              {user ? (
                  <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleNavClick(View.PROFILE)} 
                        className="flex items-center gap-3 p-1 rounded-xl hover:bg-white dark:hover:bg-earth-700 transition-all group"
                      >
                          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-earth-600 shadow-sm group-hover:scale-105 transition-transform">
                              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-agro-100 dark:bg-agro-900/50 flex items-center justify-center text-agro-600 font-black text-xs">{user.name.charAt(0)}</div>}
                          </div>
                          {!scrolled && <span className="text-[10px] font-black text-earth-700 dark:text-earth-200 uppercase tracking-widest pr-2">{user.eacBalance} EAC</span>}
                      </button>
                      <button 
                        onClick={handleLogout} 
                        className="p-2.5 text-earth-400 hover:text-red-500 rounded-full transition-all" 
                        title="Secure Terminal Logout"
                      >
                        <LogOut size={18} />
                      </button>
                  </div>
              ) : (
                  <button 
                    onClick={() => handleNavClick(View.SIGN_UP)} 
                    className="nature-gradient text-white px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Sync ID
                  </button>
              )}
            </div>
            
            <button 
              className="p-3 text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 rounded-full transition-all active:scale-90 bg-white/40 dark:bg-white/5 border border-white/10 shadow-sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open Global Menu"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* BREADCRUMB TELEMETRY - COMPRESSED */}
        {!isMenuOpen && currentView !== View.HOME && (
          <div className="mt-1.5 flex items-center justify-center gap-6 px-4 animate-in slide-in-from-top-1">
              <button 
                onClick={() => handleNavClick(backInfo.target)}
                className="group flex items-center gap-2 text-[8px] font-black text-earth-400 hover:text-agro-600 transition-all uppercase tracking-[0.3em] whitespace-nowrap"
              >
                <ArrowLeft size={10} className="group-hover:-translate-x-0.5 transition-transform" /> 
                {backInfo.label}
              </button>
              <div className="h-3 w-px bg-earth-200 dark:bg-white/10 shrink-0"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[8px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-[0.3em] whitespace-nowrap">
                   {currentView.replace('_', ' ')}
                </span>
              </div>
          </div>
        )}
      </header>

      {/* IMMERSIVE GLOBAL MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-white/95 dark:bg-earth-950/95 backdrop-blur-[60px] animate-in fade-in duration-500 overflow-y-auto">
           <div className="p-8 pb-32 max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-16">
                 <Logo size={48} variant="horizontal" useGradient={true} />
                 <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-black/5 dark:bg-white/5 rounded-full text-slate-600 dark:text-slate-300 shadow-xl border border-white/10">
                    <X size={32} />
                 </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {/* Intelligence Section */}
                 <section className="space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-earth-400 flex items-center gap-3 pb-3 border-b border-earth-100 dark:border-white/5">
                        <Sparkles size={16} className="text-purple-600" /> Intelligence
                    </h3>
                    <div className="grid gap-2">
                       {[
                         { id: View.KNOWLEDGE, label: 'Knowledge Hub', icon: <BookOpen size={18}/> },
                         { id: View.AI_ADVISOR, label: 'Strategic AI', icon: <BrainCircuit size={18}/> },
                         { id: View.CROP_DOCTOR, label: 'Crop Diagnostic', icon: <Microscope size={18}/> },
                         { id: View.ROADMAP_AI, label: 'Path Optimizer', icon: <Zap size={18}/> },
                         { id: View.SUSTAINABILITY_CALCULATOR, label: 'm(t) Simulator', icon: <Calculator size={18}/> }
                       ].map(item => (
                         <button key={item.id} onClick={() => handleNavClick(item.id)} className="flex items-center gap-4 p-4 bg-earth-50/50 dark:bg-white/5 rounded-2xl text-left hover:bg-agro-500/10 transition-all border border-transparent hover:border-agro-500/20 group">
                            <div className="p-2 bg-white dark:bg-earth-800 rounded-xl shadow-sm text-agro-600 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 dark:text-white">{item.label}</span>
                         </button>
                       ))}
                    </div>
                 </section>

                 {/* Infrastructure Section */}
                 <section className="space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-earth-400 flex items-center gap-3 pb-3 border-b border-earth-100 dark:border-white/5">
                        <Monitor size={16} className="text-blue-600" /> Infrastructure
                    </h3>
                    <div className="grid gap-2">
                       {[
                         { id: View.DATABASE, label: 'Data Registry', icon: <DbIcon size={18}/> },
                         { id: View.CARBON_LEDGER, label: 'Carbon Engine', icon: <Layers size={18}/> },
                         { id: View.FINANCE, label: 'Capital Node', icon: <Wallet size={18}/> },
                         { id: View.SUPPLY, label: 'Supply Network', icon: <Box size={18}/> },
                         { id: View.SERVICES, label: 'Scientific Units', icon: <Sprout size={18}/> },
                         { id: View.FARM_SCOUT, label: 'Telemetry', icon: <Grid3X3 size={18}/> }
                       ].map(item => (
                         <button key={item.id} onClick={() => handleNavClick(item.id)} className="flex items-center gap-4 p-4 bg-earth-50/50 dark:bg-white/5 rounded-2xl text-left hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-500/20 group">
                            <div className="p-2 bg-white dark:bg-earth-800 rounded-xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 dark:text-white">{item.label}</span>
                         </button>
                       ))}
                    </div>
                 </section>

                 {/* Broadcast Section */}
                 <section className="space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-earth-400 flex items-center gap-3 pb-3 border-b border-earth-100 dark:border-white/5">
                        <Radio size={16} className="text-red-500" /> Broadcast
                    </h3>
                    <div className="grid gap-2">
                       {[
                         { id: View.MEDIA, label: 'Network News', icon: <MonitorPlay size={18}/> },
                         { id: View.PLANET_WATCH, label: 'Planet Watch', icon: <Globe size={18}/> },
                         { id: View.GREEN_LENS, label: 'Impact Cinema', icon: <Video size={18}/> },
                         { id: View.PODCAST, label: 'AgroCulture', icon: <Mic size={18}/> },
                         { id: View.HERITAGE_FORUM, label: 'Heritage Forum', icon: <BookOpen size={18}/> }
                       ].map(item => (
                         <button key={item.id} onClick={() => handleNavClick(item.id)} className="flex items-center gap-4 p-4 bg-earth-50/50 dark:bg-white/5 rounded-2xl text-left hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 group">
                            <div className="p-2 bg-white dark:bg-earth-800 rounded-xl shadow-sm text-red-600 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 dark:text-white">{item.label}</span>
                         </button>
                       ))}
                    </div>
                 </section>

                 {/* Ecosystem Section */}
                 <section className="space-y-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-earth-400 flex items-center gap-3 pb-3 border-b border-earth-100 dark:border-white/5">
                        <Users size={16} className="text-rose-600" /> Ecosystem
                    </h3>
                    <div className="grid gap-2">
                       {[
                         { id: View.COMMUNITY, label: 'Member Hubs', icon: <Users size={18}/> },
                         { id: View.BRANDS, label: 'Portfolio', icon: <Box size={18}/> },
                         { id: View.CUSTOMER, label: 'Citizen Portal', icon: <Heart size={18}/> },
                         { id: View.PARTNERSHIPS, label: 'Alliances', icon: <Handshake size={18}/> },
                         { id: View.INVESTOR_PORTAL, label: 'Investor Node', icon: <TrendingUp size={18}/> }
                       ].map(item => (
                         <button key={item.id} onClick={() => handleNavClick(item.id)} className="flex items-center gap-4 p-4 bg-earth-50/50 dark:bg-white/5 rounded-2xl text-left hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20 group">
                            <div className="p-2 bg-white dark:bg-earth-800 rounded-xl shadow-sm text-rose-600 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 dark:text-white">{item.label}</span>
                         </button>
                       ))}
                    </div>
                 </section>
              </div>

              {/* Bottom Quick Links */}
              <div className="mt-20 pt-10 border-t border-earth-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-earth-400">
                    <button onClick={() => handleNavClick(View.SUSTAINABILITY_FRAMEWORK)} className="hover:text-agro-600 transition-colors">Framework Architecture</button>
                    <button onClick={() => handleNavClick(View.PRIVACY_POLICY)} className="hover:text-agro-600 transition-colors">Governance Protocols</button>
                    <button onClick={() => handleNavClick(View.COMMUNITY_GUIDELINES)} className="hover:text-agro-600 transition-colors">Ethical Standards</button>
                 </div>
                 <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <Activity size={14} className="text-agro-500" /> 
                    NETWORK_SYNC: v4.2.2_STABLE
                 </div>
              </div>
           </div>
        </div>
      )}
      
      {/* MAIN CONTENT AREA */}
      <main className="min-h-screen pt-24 lg:pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          {renderContent()}
        </div>
      </main>
      
      <AiConsultantFloating onOpenFull={() => handleNavClick(View.AI_ADVISOR)} />
      
      {/* CONDITIONAL GLOBAL FOOTER */}
      {currentView !== View.KNOWLEDGE && currentView !== View.INVESTOR_PORTAL && currentView !== View.AI_ADVISOR && (
        <footer className="bg-[#050a14] dark:bg-earth-950 text-slate-400 pt-20 pb-10 px-10 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>

          <div className="mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                {/* Brand & Mission */}
                <div className="space-y-6">
                    <Logo size={40} variant="horizontal" color="white" />
                    <p className="leading-relaxed text-slate-500 font-medium text-xs opacity-90 leading-relaxed uppercase tracking-widest max-w-xs">
                      "To ensure agriculture and its environ is smooth, reliable and safe."
                    </p>
                    <div className="flex gap-4">
                        {[Twitter, Facebook, Linkedin].map((Icon, i) => (
                            <div key={i} className="w-10 h-10 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center transition-all cursor-pointer text-slate-400 border border-white/10 group shadow-lg">
                                <Icon size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* About EnvirosAgro */}
                <div className="space-y-6">
                    <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
                        <Info size={14} className="text-blue-500" /> About EnvirosAgro
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium uppercase tracking-wider">
                        EnvirosAgro is a pioneering global network dedicated to standardizing agricultural resilience through the Five Thrusts framework. We bridge the gap between indigenous wisdom and predictive data intelligence.
                    </p>
                    <button onClick={() => handleNavClick(View.INFORMATION)} className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest flex items-center gap-2 transition-all">
                        Learn More <ArrowRight size={14} />
                    </button>
                </div>

                {/* Contact Node */}
                <div className="space-y-6">
                    <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
                        <MapPin size={14} className="text-agro-500" /> Contact Node
                    </h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Globe size={14} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Headquarters</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-snug">Kiriaini, Murang'a County,<br/>Central Highlands, Kenya</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Mail size={14} className="text-agro-400" />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Global Comms</p>
                                <p className="text-xs font-bold text-slate-400">envirosagro.com@gmail.com</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-0.5 p-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Phone size={14} className="text-amber-400" />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Emergency Support</p>
                                <p className="text-xs font-bold text-slate-400">+254 700 000 000</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Trust & Links */}
                <div className="space-y-8">
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-inner">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 bg-agro-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                            <span className="text-[10px] font-black text-agro-500 uppercase tracking-[0.4em]">Network Active</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider mb-4">
                            Standardizing global m(t) resilience for verified nodes and industrial stakeholders.
                        </p>
                        <div className="flex items-center gap-2 px-4 py-2 bg-agro-500/10 rounded-xl border border-agro-500/20 text-agro-400 text-[8px] font-black uppercase tracking-widest">
                            <ShieldCheck size={12} /> SECURE_UPLINK_STABLE
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Strip */}
            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">
                <p>© {new Date().getFullYear()} ENVIROSAGRO INFRASTRUCTURE. DATA SOVEREIGNTY ENABLED.</p>
                
                <div className="flex gap-10">
                    <span onClick={() => handleNavClick(View.PRIVACY_POLICY)} className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                    <span onClick={() => handleNavClick(View.COMMUNITY_GUIDELINES)} className="hover:text-white cursor-pointer transition-colors">Ethics</span>
                    <span onClick={() => handleNavClick(View.TRADEMARKS)} className="hover:text-white cursor-pointer transition-colors">Legal</span>
                </div>

                <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10">
                    <Activity size={14} className="text-blue-500 animate-pulse" />
                    <span className="text-slate-400">Node Sync: v4.2.2-STABLE</span>
                </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;