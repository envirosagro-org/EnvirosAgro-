import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import { Header } from './components/layout/Header';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { ViewHandler } from './components/layout/ViewHandler';
import { getBackTarget } from './components/layout/NavigationConstants';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { AiConsultantFloating } from './components/AiConsultantFloating';
import { CurrencyProvider } from './context/CurrencyContext';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [, setCurrency] = useState('USD');
  const [authLoading, setAuthLoading] = useState(true);
  
  const [isPartnerIntegrated, setIsPartnerIntegrated] = useState(() => {
    return localStorage.getItem('ea_partner_integrated') === 'true';
  });
  const [partnerData, setPartnerData] = useState<{name: string, id: string} | null>(() => {
    const saved = localStorage.getItem('ea_partner_data');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthLoading(true);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    await auth.signOut();
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

  const backInfo = getBackTarget(currentView);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-earth-950 flex flex-col items-center justify-center">
        <Logo size={80} variant="horizontal" useGradient={true} />
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-agro-500 animate-[progress_1.5s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-earth-500">Syncing Node...</p>
        </div>
      </div>
    );
  }

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-[#fafaf9] dark:bg-earth-950 text-earth-900 dark:text-earth-50 font-sans transition-colors duration-500 flex flex-col">
        <Header 
          scrolled={scrolled}
          currentView={currentView}
          handleNavClick={handleNavClick}
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          user={user}
          handleLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <MenuOverlay 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleNavClick={handleNavClick}
          currentView={currentView}
        />

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

export default App;
