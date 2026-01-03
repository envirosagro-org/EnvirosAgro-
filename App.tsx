import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
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
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Home = lazy(() => import('./views/Home'));
const AgBiz = lazy(() => import('./components/AgBiz'));
const KnowledgeBase = lazy(() => import('./components/KnowledgeBase'));
const Podcast = lazy(() => import('./components/Podcast'));
const GreenLens = lazy(() => import('./components/GreenLens'));
const Services = lazy(() => import('./components/Services'));
const Community = lazy(() => import('./components/Community'));
const Finance = lazy(() => import('./components/Finance'));
const Contact = lazy(() => import('./components/Contact'));
const SixSigmaRCA = lazy(() => import('./components/six-sigma-rca/SixSigmaRCA'));

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

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user, isAuthLoading }, dispatch] = useStateValue();
  const currentView = pathToView(location.pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const appUser: User = {
          uid: user.uid,
          name: user.displayName || 'Anonymous',
          email: user.email || '',
          role: 'user',
          avatar: user.photoURL || undefined,
          joinedDate: user.metadata.creationTime,
          esin: '',
          eacBalance: 0,
          isVerified: user.emailVerified,
        };
        dispatch({ type: 'SET_USER', payload: appUser });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
      dispatch({ type: 'SET_AUTH_LOADING', payload: false });
    });

    return () => unsubscribe();
  }, [dispatch]);

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
        <Routes>
          <Route path="/" element={<Home user={user} onNavigate={onNavigate} />} />
          <Route path="/agbiz" element={<AgBiz user={user} onNavigate={onNavigate} />} />
          <Route path="/knowledge" element={<KnowledgeBase onNavigate={onNavigate} />} />
          <Route path="/podcast" element={<Podcast onNavigate={onNavigate} />} />
          <Route path="/green-lens" element={<GreenLens onNavigate={onNavigate} />} />
          <Route path="/services" element={<Services onNavigate={onNavigate} />} />
          <Route path="/community" element={<Community user={user} onNavigate={onNavigate} />} />
          <Route path="/finance" element={<Finance user={user} onNavigate={onNavigate} />} />
          <Route path="/contact" element={<Contact onNavigate={onNavigate} />} />
          <Route path="/six-sigma-rca" element={<SixSigmaRCA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
