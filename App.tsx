import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import { Home } from './views/Home';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { View, User } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { StateProvider, useStateValue } from './context/StateContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { reducer, initialState } from './context/reducer';
import { Loader2 } from 'lucide-react';
import { AgBiz } from './components/AgBiz';
import { KnowledgeBase } from './components/KnowledgeBase';

const NotFound = () => (
  <div className="h-screen flex items-center justify-center text-4xl">Not Found</div>
);

const pathToView = (path: string): View => {
  const viewStr = path.substring(1).toUpperCase().replace(/-/g, '_');
  if (Object.values(View).includes(viewStr as View)) {
    return viewStr as View;
  }
  return View.HOME;
}

const componentMap: { [key in View]?: React.ComponentType<any> } = {
    [View.HOME]: Home,
    [View.AGBIZ]: AgBiz,
    [View.KNOWLEDGE]: KnowledgeBase,
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user, isAuthLoading }, dispatch] = useStateValue();
  const currentView = pathToView(location.pathname);

  const onNavigate = (view: View, params?: any) => {
    const path = view === View.HOME ? '/' : `/${view.toLowerCase().replace(/_/g, '-')}`;
    navigate(path, { state: params });
  };

  if (isAuthLoading) {
    return (
        <div className="h-screen bg-earth-950 flex flex-col items-center justify-center gap-6">
            <Loader2 className="text-agro-500 animate-spin" size={48} />
            <p className="text-[10px] font-black text-agro-400 uppercase tracking-[0.4em] animate-pulse">Initializing Ecosystem Engine...</p>
        </div>
    );
  }

  return (
    <main className='bg-white dark:bg-gray-900'>
      <ScrollToTop />
      <Navbar onNavigate={onNavigate} currentView={currentView} />
      <Suspense fallback={
        <div className="h-screen bg-earth-950 flex flex-col items-center justify-center gap-6">
          <Loader2 className="text-agro-500 animate-spin" size={48} />
          <p className="text-[10px] font-black text-agro-400 uppercase tracking-[0.4em] animate-pulse">Loading Page...</p>
        </div>
      }>
        <div>
          <Routes>
            <Route path="/" element={<Home user={user} onNavigate={onNavigate} />} />
            <Route path="/home" element={<Home user={user} onNavigate={onNavigate} />} />
            {Object.keys(componentMap).map(viewKey => {
              const viewValue = viewKey as View;
              const Component = componentMap[viewValue] || (() => <div className="h-screen flex items-center justify-center text-4xl">Not Found</div>);
              const props = {
                  user,
                  onNavigate,
                  navigationParams: location.state,
                  onLogin: (u: User) => dispatch({ type: 'SET_USER', payload: u }),
              };
              return (
                  <Route 
                      key={viewValue} 
                      path={`/${viewValue.toLowerCase().replace(/_/g, '-')}`} 
                      element={<Component {...props} />} 
                  />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

const AppWrapper = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  </StateProvider>
);

export default AppWrapper;
