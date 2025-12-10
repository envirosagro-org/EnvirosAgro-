
import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import { Hero } from './components/Hero';
import { KnowledgeHub } from './components/KnowledgeHub';
import { Dashboard } from './components/Dashboard';
import { AiAdvisor } from './components/AiAdvisor';
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
import { 
  Sprout, LayoutDashboard, BookOpen, MessageSquareText, Menu, X, 
  UserCircle, LogOut, ChevronDown, Info, ShoppingBag, Database as DbIcon, Users, Scale, Tag, FileText, Award, Layers, MonitorPlay, Truck, HeartHandshake, Handshake, Wallet, Fingerprint, Sun, Moon,
  Twitter, Facebook, Linkedin, Link
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for desktop dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setCurrentView(View.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return <Hero onNavigate={setCurrentView} />;
      case View.INFORMATION:
        return <Information />;
      case View.PRODUCTS:
        return <Products />;
      case View.SERVICES:
        return <Services />;
      case View.DATABASE:
        return <Database user={user} />;
      case View.HUMAN_RESOURCE:
        return <HumanResource />;
      case View.KNOWLEDGE:
        return <KnowledgeHub />;
      case View.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case View.AI_ADVISOR:
        return <AiAdvisor />;
      case View.SIGN_UP:
        return <Auth onLogin={handleLogin} onNavigate={setCurrentView} />;
      case View.PROFILE:
        return user ? <UserProfile user={user} onUpdateUser={handleUpdateUser} /> : <Auth onLogin={handleLogin} onNavigate={setCurrentView} />;
      case View.SUSTAINABILITY_FRAMEWORK:
        return <SustainabilityFramework />;
      case View.BRANDS:
        return <Brands onNavigate={setCurrentView} />;
      case View.TRADEMARKS:
        return <Trademarks />;
      case View.MEDIA:
        return <Media onNavigate={setCurrentView} />;
      case View.SUPPLY:
        return <Supply onNavigate={setCurrentView} />;
      case View.CUSTOMER:
        return <Customer onNavigate={setCurrentView} />;
      case View.PARTNERSHIPS:
        return <Partnerships />;
      case View.FINANCE:
        return <Finance onNavigate={setCurrentView} />;
      case View.COMMUNITY:
        return <Community onNavigate={setCurrentView} />;
      case View.PODCAST:
        return <Podcast />;
      case View.HERITAGE_FORUM:
        return <HeritageForum />;
      case View.WEBINAR:
        return <Webinar />;
      case View.SMART_FARM_VR:
        return <SmartFarmVR />;
      case View.PLANET_WATCH:
        return <PlanetWatch />;
      case View.GREEN_LENS:
        return <GreenLens />;
      case View.SAFE_HARVEST:
        return <SafeHarvest />;
      case View.NUTRILIFE:
        return <NutriLife />;
      case View.AGBIZ_WEEKLY:
        return <AgBizWeekly />;
      case View.INVESTOR_PORTAL:
        return <InvestorPortal />;
      case View.SCALEUP_SUMMIT:
        return <ScaleUpSummit />;
      case View.LIVE_HOST:
        return <LiveHost />;
      case View.COMMUNITY_GUIDELINES:
        return <CommunityGuidelines onNavigate={setCurrentView} />;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950 text-earth-900 dark:text-earth-50 font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-earth-900 shadow-sm sticky top-0 z-50 border-b border-earth-100 dark:border-earth-800 transition-colors duration-300" onMouseLeave={() => setActiveDropdown(null)}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavClick(View.HOME)}
          >
            <div className="bg-agro-600 text-white p-2 rounded-lg">
                <Sprout size={24} />
            </div>
            <span className="text-xl font-serif font-bold text-agro-900 dark:text-white tracking-tight">EnvirosAgro</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick(View.HOME)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === View.HOME ? 'bg-agro-50 text-agro-700 dark:bg-agro-900 dark:text-agro-200' : 'text-earth-600 dark:text-earth-300 hover:text-agro-600 dark:hover:text-agro-400'}`}
            >
              Home
            </button>

            {/* About Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('about')}>
               <button className="px-4 py-2 rounded-full text-sm font-medium text-earth-600 dark:text-earth-300 hover:text-agro-600 dark:hover:text-agro-400 flex items-center gap-1 transition-colors">
                  About <ChevronDown size={14} />
               </button>
               {activeDropdown === 'about' && (
                 <div className="absolute top-full left-0 w-56 bg-white dark:bg-earth-900 rounded-xl shadow-xl border border-earth-100 dark:border-earth-800 py-2 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.INFORMATION)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <Info size={16} /> Information
                    </button>
                    <button onClick={() => handleNavClick(View.SUSTAINABILITY_FRAMEWORK)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <Scale size={16} /> Our Framework
                    </button>
                    <button onClick={() => handleNavClick(View.KNOWLEDGE)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <BookOpen size={16} /> Knowledge Hub
                    </button>
                 </div>
               )}
            </div>

             {/* Value Chain Dropdown */}
             <div className="relative" onMouseEnter={() => setActiveDropdown('value-chain')}>
               <button className="px-4 py-2 rounded-full text-sm font-medium text-earth-600 dark:text-earth-300 hover:text-agro-600 dark:hover:text-agro-400 flex items-center gap-1 transition-colors">
                  Value Chain <ChevronDown size={14} />
               </button>
               {activeDropdown === 'value-chain' && (
                 <div className="absolute top-full left-0 w-56 bg-white dark:bg-earth-900 rounded-xl shadow-xl border border-earth-100 dark:border-earth-800 py-2 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.SUPPLY)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <Truck size={16} /> Supply Network
                    </button>
                    <button onClick={() => handleNavClick(View.PRODUCTS)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <ShoppingBag size={16} /> Products
                    </button>
                    <button onClick={() => handleNavClick(View.SERVICES)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <Sprout size={16} /> Services
                    </button>
                    <button onClick={() => handleNavClick(View.CUSTOMER)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <HeartHandshake size={16} /> Customer Exp.
                    </button>
                    <div className="border-t border-earth-100 dark:border-earth-800 my-1 mx-2"></div>
                    <button onClick={() => handleNavClick(View.BRANDS)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <Award size={16} /> Brands
                    </button>
                    <button onClick={() => handleNavClick(View.TRADEMARKS)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <FileText size={16} /> Trademarks
                    </button>
                 </div>
               )}
            </div>

            {/* Platform Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('platform')}>
               <button className="px-4 py-2 rounded-full text-sm font-medium text-earth-600 dark:text-earth-300 hover:text-agro-600 dark:hover:text-agro-400 flex items-center gap-1 transition-colors">
                  Platform <ChevronDown size={14} />
               </button>
               {activeDropdown === 'platform' && (
                 <div className="absolute top-full left-0 w-56 bg-white dark:bg-earth-900 rounded-xl shadow-xl border border-earth-100 dark:border-earth-800 py-2 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.MEDIA)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <MonitorPlay size={16} /> Media
                    </button>
                     <button onClick={() => handleNavClick(View.PARTNERSHIPS)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <Handshake size={16} /> Partnerships
                    </button>
                     <button onClick={() => handleNavClick(View.FINANCE)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 hover:text-agro-600 flex items-center gap-2">
                        <Wallet size={16} /> Finance
                    </button>
                 </div>
               )}
            </div>

             {/* Network Dropdown */}
             <div className="relative" onMouseEnter={() => setActiveDropdown('network')}>
               <button className="px-4 py-2 rounded-full text-sm font-medium text-earth-600 dark:text-earth-300 hover:text-agro-600 dark:hover:text-agro-400 flex items-center gap-1 transition-colors">
                  Network <ChevronDown size={14} />
               </button>
               {activeDropdown === 'network' && (
                 <div className="absolute top-full left-0 w-56 bg-white dark:bg-earth-900 rounded-xl shadow-xl border border-earth-100 dark:border-earth-800 py-2 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleNavClick(View.COMMUNITY)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-2">
                        <Users size={16} /> Community & ID
                    </button>
                    <button onClick={() => handleNavClick(View.DATABASE)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-2">
                        <DbIcon size={16} /> Data Base
                    </button>
                    <button onClick={() => handleNavClick(View.HUMAN_RESOURCE)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-2">
                        <Users size={16} /> Human Resources
                    </button>
                    <button onClick={() => handleNavClick(View.DASHBOARD)} className="w-full text-left px-4 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-2">
                        <LayoutDashboard size={16} /> Impact Dashboard
                    </button>
                 </div>
               )}
            </div>

            <button
              onClick={() => handleNavClick(View.AI_ADVISOR)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${currentView === View.AI_ADVISOR ? 'bg-agro-50 text-agro-700 dark:bg-agro-900 dark:text-agro-200' : 'text-earth-600 dark:text-earth-300 hover:text-agro-600 dark:hover:text-agro-400'}`}
            >
              <MessageSquareText size={18} /> AI Advisor
            </button>
          </div>

          {/* Auth Section & Dark Mode Toggle (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Dark Mode Toggle */}
            <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-earth-500 dark:text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800 transition-colors"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-earth-200 dark:border-earth-700">
                    <button 
                        onClick={() => handleNavClick(View.PROFILE)}
                        className="flex items-center gap-2 hover:bg-earth-50 dark:hover:bg-earth-800 px-3 py-1.5 rounded-xl transition-all"
                    >
                        <div className="w-8 h-8 bg-earth-100 dark:bg-earth-800 rounded-full flex items-center justify-center text-earth-600 dark:text-earth-300 overflow-hidden">
                            {user.avatar ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" /> : <UserCircle size={20} />}
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-sm font-bold text-earth-900 dark:text-white">{user.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-agro-600 dark:text-agro-400 font-bold">{user.role}</span>
                        </div>
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="text-earth-400 hover:text-red-500 transition-colors p-2"
                        title="Sign Out"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => handleNavClick(View.SIGN_UP)}
                    className="bg-agro-600 hover:bg-agro-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-agro-200 dark:shadow-none transition-all flex items-center gap-2"
                >
                    Sign In
                </button>
            )}
          </div>

          {/* Mobile Controls (Menu + Dark Mode) */}
          <div className="lg:hidden flex items-center gap-3">
             <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-earth-500 dark:text-earth-400"
            >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
                className="p-2 text-earth-600 dark:text-earth-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-earth-900 border-t border-earth-100 dark:border-earth-800 py-4 px-6 absolute w-full shadow-lg h-[calc(100vh-80px)] overflow-y-auto transition-colors duration-300">
            <div className="flex flex-col space-y-2">
              <button onClick={() => handleNavClick(View.HOME)} className="px-4 py-3 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800">Home</button>
              
              <div className="px-4 py-2 text-xs font-bold text-earth-400 uppercase tracking-wider">About</div>
              <button onClick={() => handleNavClick(View.INFORMATION)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Info size={18}/> Information</button>
              <button onClick={() => handleNavClick(View.SUSTAINABILITY_FRAMEWORK)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Scale size={18}/> Our Framework</button>
              <button onClick={() => handleNavClick(View.KNOWLEDGE)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><BookOpen size={18}/> Knowledge Hub</button>

              <div className="px-4 py-2 text-xs font-bold text-earth-400 uppercase tracking-wider mt-2">Value Chain</div>
              <button onClick={() => handleNavClick(View.SUPPLY)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Truck size={18}/> Supply Network</button>
              <button onClick={() => handleNavClick(View.PRODUCTS)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><ShoppingBag size={18}/> Products</button>
              <button onClick={() => handleNavClick(View.SERVICES)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Sprout size={18}/> Services</button>
              <button onClick={() => handleNavClick(View.CUSTOMER)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><HeartHandshake size={18}/> Customer Exp.</button>
              <button onClick={() => handleNavClick(View.BRANDS)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Award size={18}/> Brands</button>
              <button onClick={() => handleNavClick(View.TRADEMARKS)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><FileText size={18}/> Trademarks</button>

              <div className="px-4 py-2 text-xs font-bold text-earth-400 uppercase tracking-wider mt-2">Platform</div>
              <button onClick={() => handleNavClick(View.MEDIA)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><MonitorPlay size={18}/> Media</button>
              <button onClick={() => handleNavClick(View.PARTNERSHIPS)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Handshake size={18}/> Partnerships</button>
              <button onClick={() => handleNavClick(View.FINANCE)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Wallet size={18}/> Finance</button>


              <div className="px-4 py-2 text-xs font-bold text-earth-400 uppercase tracking-wider mt-2">Network</div>
              <button onClick={() => handleNavClick(View.COMMUNITY)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Users size={18}/> Community & ID</button>
              <button onClick={() => handleNavClick(View.DATABASE)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><DbIcon size={18}/> Data Base</button>
              <button onClick={() => handleNavClick(View.HUMAN_RESOURCE)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><Users size={18}/> Human Resources</button>
              <button onClick={() => handleNavClick(View.DASHBOARD)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800 flex gap-2"><LayoutDashboard size={18}/> Dashboard</button>
              
              <button onClick={() => handleNavClick(View.AI_ADVISOR)} className="mt-4 px-4 py-3 rounded-xl text-left font-bold text-agro-700 dark:text-agro-300 bg-agro-50 dark:bg-agro-900/50 flex gap-2"><MessageSquareText size={18}/> AI Advisor</button>

              <div className="border-t border-earth-100 dark:border-earth-800 my-4 pt-4">
                 {user ? (
                     <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-3 px-4" onClick={() => handleNavClick(View.PROFILE)}>
                            <div className="bg-earth-100 dark:bg-earth-800 p-1.5 rounded-full text-earth-600 dark:text-earth-300 w-10 h-10 flex items-center justify-center overflow-hidden">
                                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserCircle size={24} />}
                            </div>
                            <div>
                                <div className="font-bold text-earth-900 dark:text-white">{user.name}</div>
                                <div className="text-xs text-agro-600 dark:text-agro-400 font-bold uppercase">{user.role}</div>
                            </div>
                         </div>
                         <button 
                            onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                            className="px-4 py-3 rounded-xl text-left font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                        >
                            <LogOut size={20} /> Sign Out
                        </button>
                     </div>
                 ) : (
                    <button
                        onClick={() => handleNavClick(View.SIGN_UP)}
                        className="w-full bg-agro-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                        Sign In / Sign Up
                    </button>
                 )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="fade-in">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-earth-900 dark:bg-black text-earth-400 dark:text-earth-500 py-12 px-6 mt-12 border-t border-earth-800 dark:border-earth-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
                <Sprout size={24} />
                <span className="text-xl font-serif font-bold">EnvirosAgro</span>
            </div>
            <p className="max-w-sm mb-6">
              Empowering the agricultural community to build a resilient and sustainable future for our planet.
            </p>
            <div className="flex gap-4">
                <a href="https://x.com/EnvirosAgro?t=gT8YnEjPwlV7Jx1ZSnc7Mw&s=09" target="_blank" rel="noreferrer" className="bg-earth-800 dark:bg-earth-900 p-2 rounded-full hover:bg-agro-600 hover:text-white transition-all">
                    <Twitter size={20} />
                </a>
                <a href="https://www.facebook.com/share/1FLj2JHbq8/" target="_blank" rel="noreferrer" className="bg-earth-800 dark:bg-earth-900 p-2 rounded-full hover:bg-agro-600 hover:text-white transition-all">
                    <Facebook size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-earth-800 dark:bg-earth-900 p-2 rounded-full hover:bg-agro-600 hover:text-white transition-all">
                    <Linkedin size={20} />
                </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li onClick={() => setCurrentView(View.HOME)} className="cursor-pointer hover:text-agro-400">Home</li>
              <li onClick={() => setCurrentView(View.INFORMATION)} className="cursor-pointer hover:text-agro-400">About Us</li>
              <li onClick={() => setCurrentView(View.MEDIA)} className="cursor-pointer hover:text-agro-400">Media</li>
              <li onClick={() => setCurrentView(View.SUPPLY)} className="cursor-pointer hover:text-agro-400">Supply Chain</li>
              <li onClick={() => setCurrentView(View.COMMUNITY_GUIDELINES)} className="cursor-pointer hover:text-agro-400 text-agro-200">Community Guidelines</li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-4">Contact</h4>
             <ul className="space-y-2">
               <li>
                 <a href="mailto:envirosagro.com@gmail.com" className="hover:text-agro-400">envirosagro.com@gmail.com</a>
               </li>
               <li>
                 <a href="tel:+254740161447" className="hover:text-agro-400">+254 740 161 447</a>
               </li>
               <li>
                 <a 
                   href="https://www.google.com/maps?cid=15197208055071949030" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-agro-400"
                 >
                   9X6C+P6, Kiriaini, Kenya
                 </a>
               </li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-earth-800 dark:border-earth-900 text-sm text-center">
          &copy; {new Date().getFullYear()} EnvirosAgro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
