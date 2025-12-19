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
/* Added missing import: MapPin */
import { 
  Sprout, LayoutDashboard, BookOpen, MessageSquareText, Menu, X, 
  UserCircle, LogOut, ChevronDown, Info, ShoppingBag, Database as DbIcon, Users, Scale, Tag, FileText, Award, Layers, MonitorPlay, Truck, HeartHandshake, Handshake, Wallet, Fingerprint, Sun, Moon,
  Twitter, Facebook, Linkedin, ArrowLeft, Bug, Sparkles, Calculator, Briefcase, PlayCircle, Coins, TrendingUp, Mail, Grid3X3, Leaf, Heart, Box, ShieldCheck, Monitor, ClipboardCheck, ArrowRight, MapPin
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
      // Fix: Passed handleNavClick as onNavigate prop to CarbonLedger
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
      // Fix: Passed handleNavClick as onNavigate prop to SafeHarvest to fix errors in child component
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
  };

  const backInfo = getBackTarget(currentView);

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-earth-950 text-earth-900 dark:text-earth-50 font-sans transition-colors duration-300">
      
      {/* Dynamic Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 border-b ${
          scrolled 
          ? 'bg-white/80 dark:bg-earth-900/80 backdrop-blur-xl border-earth-100 dark:border-earth-800 py-3 shadow-lg shadow-black/5' 
          : 'bg-transparent border-transparent py-5'
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          
          <div className="flex items-center gap-10">
            <div 
              className="flex items-center gap-2 cursor-pointer group shrink-0" 
              onClick={() => handleNavClick(View.HOME)}
            >
              <div className="group-hover:scale-[1.03] transition-transform duration-500">
                <Logo size={scrolled ? 34 : 42} variant="horizontal" useGradient={true} />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-1">
              <button onClick={() => handleNavClick(View.HOME)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentView === View.HOME ? 'text-agro-700 dark:text-agro-400 bg-agro-50 dark:bg-agro-900/30' : 'text-earth-600 dark:text-earth-300 hover:text-agro-600'}`}>Home</button>
              
              <div className="relative group" onMouseEnter={() => setActiveDropdown('solutions')}>
                 <button className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1 ${activeDropdown === 'solutions' ? 'text-agro-600' : 'text-earth-600 dark:text-earth-300 hover:text-agro-600'}`}>
                   Solutions <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                 </button>
                 {activeDropdown === 'solutions' && (
                   <div className="absolute top-full left-0 w-72 bg-white dark:bg-earth-900 rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800 p-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <button onClick={() => handleNavClick(View.SERVICES)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><Sprout size={18} className="text-agro-600" /> Professional Services</button>
                      <button onClick={() => handleNavClick(View.KNOWLEDGE)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><BookOpen size={18} className="text-blue-600" /> Research & Intelligence</button>
                      <button onClick={() => handleNavClick(View.FARM_SCOUT)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><Grid3X3 size={18} className="text-purple-600" /> AI Precision Scout</button>
                      <button onClick={() => handleNavClick(View.SUSTAINABILITY_FRAMEWORK)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><Layers size={18} className="text-amber-600" /> Five Thrusts Framework</button>
                   </div>
                 )}
              </div>

              <div className="relative group" onMouseEnter={() => setActiveDropdown('ecosystem')}>
                 <button className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1 ${activeDropdown === 'ecosystem' ? 'text-agro-600' : 'text-earth-600 dark:text-earth-300 hover:text-agro-600'}`}>
                   Ecosystem <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'ecosystem' ? 'rotate-180' : ''}`} />
                 </button>
                 {activeDropdown === 'ecosystem' && (
                   <div className="absolute top-full left-0 w-72 bg-white dark:bg-earth-900 rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800 p-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <button onClick={() => handleNavClick(View.COMMUNITY)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><Users size={18} className="text-rose-600" /> Community Network</button>
                      <button onClick={() => handleNavClick(View.BRANDS)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><Box size={18} className="text-orange-600" /> Brand Portfolio</button>
                      <button onClick={() => handleNavClick(View.MEDIA)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><MonitorPlay size={18} className="text-red-600" /> Media Hub</button>
                      <button onClick={() => handleNavClick(View.FINANCE)} className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3 transition-colors"><Wallet size={18} className="text-amber-600" /> Financial Capital</button>
                   </div>
                 )}
              </div>

              <button onClick={() => handleNavClick(View.DASHBOARD)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentView === View.DASHBOARD ? 'text-agro-700' : 'text-earth-600 dark:text-earth-300 hover:text-agro-600'}`}>Impact</button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 mr-2">
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2.5 rounded-full text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800 hover:text-agro-600 transition-all"
                  aria-label="Toggle Theme"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>

            {user ? (
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-800/50">
                        <Coins size={14} className="text-amber-600" />
                        <span className="text-xs font-black text-amber-700 dark:text-amber-400">{user.eacBalance} EAC</span>
                    </div>
                    <button 
                      onClick={() => handleNavClick(View.PROFILE)} 
                      className="flex items-center gap-2 p-1.5 rounded-xl border border-earth-200 dark:border-earth-800 hover:bg-earth-50 dark:hover:bg-earth-800 transition-all shadow-sm bg-white dark:bg-earth-900"
                    >
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-earth-100">
                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-agro-100 flex items-center justify-center text-agro-600 font-bold">{user.name.charAt(0)}</div>}
                        </div>
                        <span className="text-xs font-bold mr-2 hidden md:inline">{user.name}</span>
                    </button>
                    <button onClick={handleLogout} className="p-2.5 text-earth-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"><LogOut size={18} /></button>
                </div>
            ) : (
                <button 
                  onClick={() => handleNavClick(View.SIGN_UP)} 
                  className="nature-gradient text-white px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-agro-900/20 hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all"
                >
                  Get Started
                </button>
            )}
            
            <button className="xl:hidden p-2.5 text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 rounded-xl transition-all" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Dynamic Context Bar */}
        {currentView !== View.HOME && (
          <div className="bg-earth-50/80 dark:bg-earth-950/80 backdrop-blur-md border-b border-earth-100 dark:border-earth-800 animate-in slide-in-from-top-2 duration-300">
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-6 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => handleNavClick(backInfo.target)}
                className="group flex items-center gap-2 text-[10px] font-black text-earth-400 hover:text-agro-600 transition-all uppercase tracking-[0.2em] whitespace-nowrap"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to {backInfo.label}
              </button>
              <div className="h-4 w-px bg-earth-200 dark:bg-earth-800 shrink-0"></div>
              <span className="text-[10px] font-black text-agro-600 uppercase tracking-[0.2em] whitespace-nowrap">
                Current: {currentView.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* Modern Mobile Fullscreen Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[100] bg-white dark:bg-earth-950 p-6 flex flex-col animate-in fade-in duration-300">
           <div className="flex justify-between items-center mb-10">
              <Logo size={32} variant="horizontal" useGradient={true} />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-earth-50 dark:bg-earth-900 rounded-2xl"><X size={24} /></button>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-10 pb-20">
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-2">Navigation</p>
                 <div className="grid gap-2">
                    <button onClick={() => handleNavClick(View.HOME)} className="w-full text-left p-4 rounded-2xl bg-earth-50 dark:bg-earth-900 font-bold text-lg flex justify-between items-center group">
                      Home <ArrowRight className="text-earth-300 group-hover:text-agro-600 transition-colors" />
                    </button>
                    <button onClick={() => handleNavClick(View.DASHBOARD)} className="w-full text-left p-4 rounded-2xl bg-earth-50 dark:bg-earth-900 font-bold text-lg flex justify-between items-center group">
                      Impact <ArrowRight className="text-earth-300 group-hover:text-agro-600 transition-colors" />
                    </button>
                 </div>
              </div>

              <div className="space-y-4">
                 <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest px-2">Ecosystem & Data</p>
                 <div className="grid grid-cols-2 gap-3">
                    {[
                      { view: View.COMMUNITY, icon: <Users size={18} />, label: 'Community', color: 'text-rose-500' },
                      { view: View.KNOWLEDGE, icon: <BookOpen size={18} />, label: 'Intelligence', color: 'text-blue-500' },
                      { view: View.DATABASE, icon: <DbIcon size={18} />, label: 'Datasets', color: 'text-agro-500' },
                      { view: View.MEDIA, icon: <MonitorPlay size={18} />, label: 'Media Hub', color: 'text-red-500' },
                      { view: View.FINANCE, icon: <Wallet size={18} />, label: 'Capital', color: 'text-amber-500' },
                      { view: View.BRANDS, icon: <Box size={18} />, label: 'Portfolio', color: 'text-orange-500' }
                    ].map((item) => (
                      <button key={item.view} onClick={() => handleNavClick(item.view)} className="p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl text-left transition-all hover:scale-[0.98]">
                        <div className={`mb-3 ${item.color}`}>{item.icon}</div>
                        <span className="text-xs font-bold text-earth-800 dark:text-earth-200">{item.label}</span>
                      </button>
                    ))}
                 </div>
              </div>

              <div className="pt-10 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between">
                <button onClick={toggleDarkMode} className="flex items-center gap-3 p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl font-bold text-sm">
                  {isDarkMode ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
                </button>
                {user && (
                  <button onClick={handleLogout} className="p-4 text-red-500 font-bold flex items-center gap-2">
                    <LogOut size={18} /> Logout
                  </button>
                )}
              </div>
           </div>

           {!user && (
              <div className="pt-6">
                <button onClick={() => handleNavClick(View.SIGN_UP)} className="w-full nature-gradient text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl">Get Started Free</button>
              </div>
           )}
        </div>
      )}

      {/* Add padding to account for fixed navbar */}
      <main className="pt-24 min-h-screen">
        <div className="fade-in transition-all duration-500">
          {renderContent()}
        </div>
      </main>

      <footer className="bg-earth-950 text-earth-400 py-24 px-6 mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 text-sm relative z-10">
          <div className="lg:col-span-1">
            <div className="mb-8">
                <Logo size={48} variant="horizontal" color="white" />
            </div>
            <p className="max-w-xs leading-relaxed text-earth-500 mb-10">Empowering the agricultural community through a measured, data-driven framework for global sustainability and resilient futures.</p>
            <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all cursor-pointer text-white border border-white/5"><Twitter size={20} /></div>
                <div className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all cursor-pointer text-white border border-white/5"><Facebook size={20} /></div>
                <div className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all cursor-pointer text-white border border-white/5"><Linkedin size={20} /></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Innovation Ecosystem</h4>
            <ul className="space-y-4">
              <li onClick={() => handleNavClick(View.FARM_SCOUT)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> AI Field Scout</li>
              <li onClick={() => handleNavClick(View.CARBON_LEDGER)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> Carbon Ledger</li>
              <li onClick={() => handleNavClick(View.CROP_DOCTOR)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> AI Crop Doctor</li>
              <li onClick={() => handleNavClick(View.ROADMAP_AI)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> Sustainability Roadmap</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Strategic Hubs</h4>
            <ul className="space-y-4">
              <li onClick={() => handleNavClick(View.PRODUCTS)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> Agro Marketplace</li>
              <li onClick={() => handleNavClick(View.SUPPLY)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> Supply Network</li>
              <li onClick={() => handleNavClick(View.FINANCE)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> Capital & Grants</li>
              <li onClick={() => handleNavClick(View.HUMAN_RESOURCE)} className="cursor-pointer hover:text-agro-400 transition-colors flex items-center gap-2"><ArrowRight size={12} className="text-earth-700" /> Workforce Cloud</li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
             <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Contact Hub</h4>
             <ul className="space-y-5 text-sm">
               <li className="flex items-center gap-3 text-earth-300 font-medium"><Mail size={16} className="text-agro-500" /> envirosagro.com@gmail.com</li>
               <li className="flex items-center gap-3 text-earth-300 font-medium"><MapPin size={16} className="text-agro-500" /> Kiriaini HQ, Kenya</li>
               <li className="pt-4">
                   <button onClick={() => handleNavClick(View.INFORMATION)} className="w-full nature-gradient text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:-translate-y-1 transition-all center">Support Center</button>
               </li>
             </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest">
            <p className="text-earth-600">© {new Date().getFullYear()} ENVIROSAGRO INFRASTRUCTURE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
                <span onClick={() => handleNavClick(View.COMMUNITY_GUIDELINES)} className="hover:text-white cursor-pointer transition-colors">Guidelines</span>
                <span onClick={() => handleNavClick(View.PRIVACY_POLICY)} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span onClick={() => handleNavClick(View.TRADEMARKS)} className="hover:text-white cursor-pointer transition-colors">Trademarks</span>
            </div>
        </div>
      </footer>
      
      <AiConsultantFloating onOpenFull={() => handleNavClick(View.AI_ADVISOR)} />
    </div>
  );
};

export default App;
