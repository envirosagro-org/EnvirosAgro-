import React, { useState } from 'react';
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
import { Header } from './components/Header';
import { 
  Sprout
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [user, setUser] = useState<User | null>(null);

  const handleNavClick = (view: View) => {
    setCurrentView(view);
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
        return <Database />;
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
        return <Brands />;
      case View.TRADEMARKS:
        return <Trademarks />;
      case View.MEDIA:
        return <Media onNavigate={setCurrentView} />;
      case View.SUPPLY:
        return <Supply />;
      case View.CUSTOMER:
        return <Customer />;
      case View.PARTNERSHIPS:
        return <Partnerships />;
      case View.FINANCE:
        return <Finance onNavigate={setCurrentView} />;
      case View.COMMUNITY:
        return <Community />;
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
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 text-earth-900 font-sans">
      <Header 
        user={user}
        currentView={currentView}
        onNavClick={handleNavClick} 
        onLogout={handleLogout} 
      />

      {/* Main Content */}
      <main className="fade-in">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-earth-900 text-earth-400 py-12 px-6 mt-12 border-t border-earth-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
                <Sprout size={24} />
                <span className="text-xl font-serif font-bold">EnvirosAgro</span>
            </div>
            <p className="max-w-sm mb-6">
              Empowering the agricultural community to build a resilient and sustainable future for our planet.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li onClick={() => setCurrentView(View.HOME)} className="cursor-pointer hover:text-agro-400">Home</li>
              <li onClick={() => setCurrentView(View.INFORMATION)} className="cursor-pointer hover:text-agro-400">About Us</li>
              <li onClick={() => setCurrentView(View.MEDIA)} className="cursor-pointer hover:text-agro-400">Media</li>
              <li onClick={() => setCurrentView(View.SUPPLY)} className="cursor-pointer hover:text-agro-400">Supply Chain</li>
              <li onClick={() => setCurrentView(View.CUSTOMER)} className="cursor-pointer hover:text-agro-400">Customers</li>
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
                   href="https://www.google.com/maps/search/?api=1&query=9X6C%2BP6%2C+Kiriaini+Kenya" 
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
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-earth-800 text-sm text-center">
          &copy; {new Date().getFullYear()} EnvirosAgro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
