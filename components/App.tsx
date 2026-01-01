
import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { ViewHandler } from './layout/ViewHandler';
import { View, User } from '../types';
import { CurrencyProvider } from '../context/CurrencyContext';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isPartnerIntegrated, setIsPartnerIntegrated] = useState(false);
  const [partnerData, setPartnerData] = useState<{name: string, id: string} | null>(null);
  const [currency, setCurrency] = useState('USD');
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: View, query?: string) => {
    setCurrentView(view);
    if (query) {
      setGlobalSearchQuery(query);
    }
    setIsMenuOpen(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
  };

  const awardEac = (amount: number) => {
    if (user) {
      console.log(`Awarding ${amount} EAC to ${user.name}`);
      // In a real app, you'd update the user's balance here.
      // setUser({ ...user, eacBalance: (user.eacBalance || 0) + amount });
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider value={{ currency, setCurrency }}>
          <CartProvider>
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
          </CartProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
