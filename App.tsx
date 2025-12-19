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
import { 
  Sprout, LayoutDashboard, BookOpen, MessageSquareText, Menu, X, 
  UserCircle, LogOut, ChevronDown, Info, ShoppingBag, Database as DbIcon, Users, Scale, Tag, FileText, Award, Layers, MonitorPlay, Truck, HeartHandshake, Handshake, Wallet, Fingerprint, Sun, Moon,
  Twitter, Facebook, Linkedin, ArrowLeft, Bug, Sparkles, Calculator, Briefcase, PlayCircle, Coins, TrendingUp, Mail, Grid3X3, Leaf, Heart, Box, ShieldCheck, Monitor
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

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
    setUser(newUser);
    setCurrentView(View.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
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
    return { target: View.HOME, label: 'Home' };
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME: return <Hero onNavigate={handleNavClick} />;
      case View.INFORMATION: return <Information />;
      case View.PRODUCTS: return <Products />;
      case View.SERVICES: return <Services />;
      case View.DATABASE: return <Database user={user} />;
      case View.HUMAN_RESOURCE: return <HumanResource />;
      case View.KNOWLEDGE: return <KnowledgeHub onNavigate={handleNavClick} initialSearch={globalSearchQuery} />;
      case View.DASHBOARD: return <Dashboard onNavigate={handleNavClick} />;
      case View.AI_ADVISOR: return <AiAdvisor />;
      case View.ROADMAP_AI: return <RoadmapAI />;
      case View.CROP_DOCTOR: return <CropDoctor />;
      case View.SUSTAINABILITY_CALCULATOR: return <SustainabilityCalculator />;
      case View.FARM_SCOUT: return <FarmScout />;
      case View.CARBON_LEDGER: return <CarbonLedger />;
      case View.SIGN_UP: return <Auth onLogin={handleLogin} onNavigate={handleNavClick} />;
      case View.PROFILE: return user ? <UserProfile user={user} onUpdateUser={(u) => setUser(u)} /> : <Auth onLogin={handleLogin} onNavigate={handleNavClick} />;
      case View.SUSTAINABILITY_FRAMEWORK: return <SustainabilityFramework />;
      case View.BRANDS: return <Brands onNavigate={handleNavClick} />;
      case View.TRADEMARKS: return <Trademarks />;
      case View.MEDIA: return <Media onNavigate={handleNavClick} />;
      case View.SUPPLY: return <Supply onNavigate={handleNavClick} />;
      case View.CUSTOMER: return <Customer onNavigate={handleNavClick} />;
      case View.PARTNERSHIPS: return <Partnerships />;
      case View.FINANCE: return <Finance onNavigate={handleNavClick} />;
      case View.COMMUNITY: return <Community onNavigate={handleNavClick} />;
      case View.PODCAST: return <Podcast />;
      case View.HERITAGE_FORUM: return <HeritageForum />;
      case View.WEBINAR: return <Webinar />;
      case View.SMART_FARM_VR: return <SmartFarmVR />;
      case View.PLANET_WATCH: return <PlanetWatch />;
      case View.GREEN_LENS: return <GreenLens />;
      case View.SAFE_HARVEST: return <SafeHarvest />;
      case View.NUTRILIFE: return <NutriLife />;
      case View.AGBIZ_WEEKLY: return <AgBizWeekly />;
      case View.INVESTOR_PORTAL: return <InvestorPortal onNavigate={handleNavClick} />;
      case View.SCALEUP_SUMMIT: return <ScaleUpSummit />;
      case View.LIVE_HOST: return <LiveHost />;
      case View.COMMUNITY_GUIDELINES: return <CommunityGuidelines onNavigate={handleNavClick} />;
      case View.INTRANET_DASHBOARD: return <IntranetDashboard />;
      case View.EXTRANET_DASHBOARD: return <ExtranetDashboard />;
      default: return <Hero onNavigate={handleNavClick} />;
    }
  };

  const backInfo = getBackTarget(currentView);

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950 text-earth-900 dark:text-earth-50 font-sans transition-colors duration-300">
      <nav className="bg-white/95 dark:bg-earth-900/95 shadow-sm sticky top-0 z-50 border-b border-earth-100 dark:border-earth-800 transition-colors" onMouseLeave={() => setActiveDropdown(null)}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavClick(View.HOME)}>
            <div className="bg-agro-600 text-white p-2 rounded-lg group-hover:scale-110 transition-transform"><Sprout size={24} /></div>
            <span className="text-xl font-serif font-bold text-agro-900 dark:text-white tracking-tight">EnvirosAgro</span>
          </div>

          <div className="hidden xl:flex items-center space-x-1">
            <button onClick={() => handleNavClick(View.HOME)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${currentView === View.HOME ? 'bg-agro-50 text-agro-700 dark:bg-agro-900' : 'text-earth-600 dark:text-earth-300 hover:text-agro-600'}`}>Home</button>
            
            <div className="relative" onMouseEnter={() => setActiveDropdown('about')}>
               <button className="px-4 py-2 rounded-full text-sm font-bold text-earth-600 dark:text-earth-300 hover:text-agro-600 flex items-center gap-1">About <ChevronDown size={14} /></button>
               {activeDropdown === 'about' && (
                 <div className="absolute top-full left-0 w-64 bg-white dark:bg-earth-900 rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800 py-3 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.INFORMATION)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Info size={16} className="text-blue-500" /> Organization Info</button>
                    <button onClick={() => handleNavClick(View.SUSTAINABILITY_FRAMEWORK)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Layers size={16} className="text-agro-500" /> Five Thrusts Framework</button>
                    <button onClick={() => handleNavClick(View.BRANDS)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Tag size={16} className="text-rose-500" /> Brand Family</button>
                    <button onClick={() => handleNavClick(View.TRADEMARKS)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Scale size={16} className="text-slate-500" /> IP & Trademarks</button>
                 </div>
               )}
            </div>

            <div className="relative" onMouseEnter={() => setActiveDropdown('network')}>
               <button className="px-4 py-2 rounded-full text-sm font-bold text-earth-600 dark:text-earth-300 hover:text-agro-600 flex items-center gap-1">Network <ChevronDown size={14} /></button>
               {activeDropdown === 'network' && (
                 <div className="absolute top-full left-0 w-64 bg-white dark:bg-earth-900 rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800 py-3 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.COMMUNITY)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Users size={16} className="text-rose-500" /> Groups & Societies</button>
                    <button onClick={() => handleNavClick(View.CUSTOMER)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Heart size={16} className="text-red-500" /> Customer Experience</button>
                    <button onClick={() => handleNavClick(View.BRANDS)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Box size={16} className="text-orange-500" /> Brand Portfolio</button>
                    <button onClick={() => handleNavClick(View.HUMAN_RESOURCE)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Briefcase size={16} className="text-blue-500" /> Workforce Cloud</button>
                    <button onClick={() => handleNavClick(View.DATABASE)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><DbIcon size={16} className="text-agro-500" /> Research Database</button>
                    <button onClick={() => handleNavClick(View.DASHBOARD)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><LayoutDashboard size={16} className="text-indigo-500" /> Impact Dashboard</button>
                 </div>
               )}
            </div>

            <div className="relative" onMouseEnter={() => setActiveDropdown('ai')}>
               <button className="px-4 py-2 rounded-full text-sm font-bold text-earth-600 dark:text-earth-300 hover:text-purple-600 flex items-center gap-1">AI Tools <ChevronDown size={14} /></button>
               {activeDropdown === 'ai' && (
                 <div className="absolute top-full left-0 w-64 bg-white dark:bg-earth-900 rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800 py-3 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.FARM_SCOUT)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Grid3X3 size={16} className="text-blue-500" /> AI Field Scout</button>
                    <button onClick={() => handleNavClick(View.AI_ADVISOR)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><MessageSquareText size={16} className="text-purple-500" /> Sustainability Advisor</button>
                    <button onClick={() => handleNavClick(View.CROP_DOCTOR)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Bug size={16} className="text-red-500" /> AI Crop Doctor</button>
                    <button onClick={() => handleNavClick(View.ROADMAP_AI)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Sparkles size={16} className="text-amber-500" /> Strategic Roadmap</button>
                 </div>
               )}
            </div>

            <div className="relative" onMouseEnter={() => setActiveDropdown('dashboards')}>
               <button className="px-4 py-2 rounded-full text-sm font-bold text-earth-600 dark:text-earth-300 hover:text-blue-600 flex items-center gap-1">Admin <ChevronDown size={14} /></button>
               {activeDropdown === 'dashboards' && (
                 <div className="absolute top-full left-0 w-64 bg-white dark:bg-earth-900 rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800 py-3 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.INTRANET_DASHBOARD)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><ShieldCheck size={16} className="text-blue-500" /> Intranet (Org)</button>
                    <button onClick={() => handleNavClick(View.EXTRANET_DASHBOARD)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Monitor size={16} className="text-purple-500" /> Extranet (Partner)</button>
                 </div>
               )}
            </div>

            <div className="relative" onMouseEnter={() => setActiveDropdown('eco')}>
               <button className="px-4 py-2 rounded-full text-sm font-bold text-earth-600 dark:text-earth-300 hover:text-agro-600 flex items-center gap-1">Ecosystem <ChevronDown size={14} /></button>
               {activeDropdown === 'eco' && (
                 <div className="absolute top-full right-0 w-64 bg-white dark:bg-earth-900 rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800 py-3 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.PRODUCTS)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><ShoppingBag size={16} className="text-orange-500" /> Marketplace</button>
                    <button onClick={() => handleNavClick(View.CARBON_LEDGER)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Leaf size={16} className="text-green-500" /> Carbon Ledger</button>
                    <button onClick={() => handleNavClick(View.SUPPLY)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><Truck size={16} className="text-slate-500" /> Supply Chain Hub</button>
                    <button onClick={() => handleNavClick(View.CUSTOMER)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-3"><HeartHandshake size={16} className="text-rose-500" /> Traceability Hub</button>
                 </div>
               )}
            </div>

            <button onClick={() => handleNavClick(View.FINANCE)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1 ${currentView === View.FINANCE ? 'text-amber-600' : 'text-earth-600 dark:text-earth-300 hover:text-amber-600'}`}>Capital <Coins size={14} /></button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2.5 rounded-full text-earth-500 hover:bg-earth-100 dark:hover:bg-earth-800 transition-colors">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
                <div className="flex items-center gap-2">
                    <button onClick={() => handleNavClick(View.PROFILE)} className="flex items-center gap-2 hover:bg-earth-50 dark:hover:bg-earth-800 px-3 py-1.5 rounded-xl transition-all">
                        <div className="w-8 h-8 bg-agro-100 rounded-full flex items-center justify-center overflow-hidden border border-agro-200">
                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserCircle size={20} className="text-agro-600" />}
                        </div>
                        <span className="text-sm font-bold hidden sm:inline">{user.name}</span>
                    </button>
                    <button onClick={handleLogout} className="text-earth-400 hover:text-red-500 transition-colors p-2"><LogOut size={20} /></button>
                </div>
            ) : (
                <button onClick={() => handleNavClick(View.SIGN_UP)} className="nature-gradient hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all">Sign In</button>
            )}
            <button className="xl:hidden p-2 text-earth-600 dark:text-earth-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {currentView !== View.HOME && (
          <div className="bg-earth-50/95 dark:bg-earth-900/95 border-b border-earth-100 dark:border-earth-800 animate-in slide-in-from-top-2 duration-300">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
              <button 
                onClick={() => handleNavClick(backInfo.target)}
                className="group flex items-center gap-2 text-xs font-bold text-earth-500 hover:text-agro-600 dark:text-earth-400 dark:hover:text-agro-400 transition-all uppercase tracking-widest"
              >
                <div className="p-1.5 bg-white dark:bg-earth-800 rounded-lg shadow-sm border border-earth-200 dark:border-earth-700 group-hover:nature-gradient dark:group-hover:bg-agro-900 group-hover:border-agro-200 group-hover:text-white transition-colors">
                  <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                </div>
                Back to {backInfo.label}
              </button>
            </div>
          </div>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-white dark:bg-earth-950 p-6 pt-24 overflow-y-auto animate-in slide-in-from-top-4 duration-300">
           <div className="flex flex-col space-y-8 pb-20">
              <button onClick={() => handleNavClick(View.HOME)} className="text-left text-3xl font-bold text-agro-900 dark:text-agro-400">Home</button>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-earth-400 border-b border-earth-100 pb-2">Network</h4>
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => handleNavClick(View.COMMUNITY)} className="flex flex-col gap-2 p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl text-left"><Users size={20} className="text-rose-500" /> <span className="text-sm font-bold">Groups</span></button>
                   <button onClick={() => handleNavClick(View.CUSTOMER)} className="flex flex-col gap-2 p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl text-left"><Heart size={20} className="text-red-500" /> <span className="text-sm font-bold">Experience</span></button>
                   <button onClick={() => handleNavClick(View.BRANDS)} className="flex flex-col gap-2 p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl text-left"><Box size={20} className="text-orange-500" /> <span className="text-sm font-bold">Portfolio</span></button>
                   <button onClick={() => handleNavClick(View.DATABASE)} className="flex flex-col gap-2 p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl text-left"><DbIcon size={20} className="text-agro-500" /> <span className="text-sm font-bold">Database</span></button>
                   <button onClick={() => handleNavClick(View.FARM_SCOUT)} className="flex flex-col gap-2 p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl text-left"><Grid3X3 size={20} className="text-blue-500" /> <span className="text-sm font-bold">Scout</span></button>
                   <button onClick={() => handleNavClick(View.DASHBOARD)} className="flex flex-col gap-2 p-4 bg-earth-50 dark:bg-earth-900 rounded-2xl text-left"><LayoutDashboard size={20} className="text-indigo-500" /> <span className="text-sm font-bold">Impact</span></button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-earth-400 border-b border-earth-100 pb-2">Admin Tools</h4>
                <div className="grid grid-cols-1 gap-2">
                   <button onClick={() => handleNavClick(View.INTRANET_DASHBOARD)} className="flex items-center gap-3 p-3 text-lg font-medium"><ShieldCheck className="text-blue-500" /> Intranet Dashboard</button>
                   <button onClick={() => handleNavClick(View.EXTRANET_DASHBOARD)} className="flex items-center gap-3 p-3 text-lg font-medium"><Monitor className="text-purple-500" /> Extranet Dashboard</button>
                </div>
              </div>

              <div className="pt-8 border-t border-earth-100 dark:border-earth-800">
                  {user ? (
                      <button onClick={() => handleNavClick(View.PROFILE)} className="flex items-center gap-4 p-4 bg-agro-50 dark:bg-agro-900 rounded-2xl w-full">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border border-agro-200">
                              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserCircle size={24} className="text-agro-600" />}
                          </div>
                          <div className="text-left">
                              <p className="font-bold text-agro-900 dark:text-agro-400">{user.name}</p>
                              <p className="text-xs text-agro-600">View Profile</p>
                          </div>
                      </button>
                  ) : (
                      <button onClick={() => handleNavClick(View.SIGN_UP)} className="w-full nature-gradient text-white py-4 rounded-2xl font-bold text-lg shadow-lg">Get Started</button>
                  )}
              </div>
           </div>
        </div>
      )}

      <main className="fade-in">{renderContent()}</main>

      <footer className="bg-earth-900 text-earth-400 py-16 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-white">
                <Sprout size={28} />
                <span className="text-2xl font-serif font-bold">EnvirosAgro</span>
            </div>
            <p className="max-w-sm leading-relaxed">Empowering the agricultural community through a measured, data-driven framework for global sustainability.</p>
            <div className="flex gap-4 mt-6">
                <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
                <Facebook size={20} className="hover:text-white cursor-pointer transition-colors" />
                <Linkedin size={20} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Innovation Hub</h4>
            <ul className="space-y-3 text-sm">
              <li onClick={() => handleNavClick(View.FARM_SCOUT)} className="cursor-pointer hover:text-white transition-colors">AI Field Scout</li>
              <li onClick={() => handleNavClick(View.CARBON_LEDGER)} className="cursor-pointer hover:text-white transition-colors">Carbon Ledger</li>
              <li onClick={() => handleNavClick(View.CROP_DOCTOR)} className="cursor-pointer hover:text-white transition-colors">AI Crop Doctor</li>
              <li onClick={() => handleNavClick(View.ROADMAP_AI)} className="cursor-pointer hover:text-white transition-colors">Sustainability Roadmap</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Ecosystem</h4>
            <ul className="space-y-3 text-sm">
              <li onClick={() => handleNavClick(View.PRODUCTS)} className="cursor-pointer hover:text-white transition-colors">Agro Marketplace</li>
              <li onClick={() => handleNavClick(View.SUPPLY)} className="cursor-pointer hover:text-white transition-colors">Supply Chain</li>
              <li onClick={() => handleNavClick(View.FINANCE)} className="cursor-pointer hover:text-white transition-colors">Capital & Grants</li>
              <li onClick={() => handleNavClick(View.HUMAN_RESOURCE)} className="cursor-pointer hover:text-white transition-colors">Workforce Cloud</li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Connect</h4>
             <ul className="space-y-3 text-sm">
               <li className="flex items-center gap-2"><Mail size={16} /> envirosagro.com@gmail.com</li>
               <li>Kiriaini Headquarters, Kenya</li>
               <li className="pt-2">
                   <button onClick={() => handleNavClick(View.INFORMATION)} className="bg-white/10 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/20 transition-all">Support Center</button>
               </li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
            <p>© {new Date().getFullYear()} EnvirosAgro Infrastructure. All rights reserved.</p>
            <div className="flex gap-6">
                <span onClick={() => handleNavClick(View.COMMUNITY_GUIDELINES)} className="hover:text-white cursor-pointer">Guidelines</span>
                <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                <span onClick={() => handleNavClick(View.TRADEMARKS)} className="hover:text-white cursor-pointer">Trademarks</span>
            </div>
        </div>
      </footer>
      <AiConsultantFloating />
    </div>
  );
};

export default App;
