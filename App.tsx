import React, { useEffect, useState, lazy, Suspense } from 'react';
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
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

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
    [View.ABOUT]: lazy(() => import('./components/about/page')),
    [View.DASHBOARD]: lazy(() => import('./components/Dashboard')),
    [View.IMPACT_DASHBOARD]: lazy(() => import('./components/ImpactDashboard')),
    [View.CROP_DOCTOR]: lazy(() => import('./components/CropDoctor')),
    [View.FARM_SCOUT]: lazy(() => import('./components/FarmScout')),
    [View.SMART_FARM_VR]: lazy(() => import('./components/SmartFarmVR')),
    [View.SAFE_HARVEST]: lazy(() => import('./components/SafeHarvest')),
    [View.PROFILE]: lazy(() => import('./components/UserProfile')),
    [View.PLANET_WATCH]: lazy(() => import('./components/PlanetWatch')),
    [View.SUSTAINABILITY_FRAMEWORK]: lazy(() => import('./components/SustainabilityFramework')),
    [View.CARBON_LEDGER]: lazy(() => import('./components/CarbonLedger')),
    [View.GREEN_LENS]: lazy(() => import('./components/GreenLens')),
    [View.NUTRILIFE]: lazy(() => import('./components/NutriLife')),
    [View.AGBIZ]: lazy(() => import('./components/AgBiz')),
    [View.AGBIZ_WEEKLY]: lazy(() => import('./components/AgBizWeekly')),
    [View.FINANCE]: lazy(() => import('./components/Finance')),
    [View.INVESTOR_PORTAL]: lazy(() => import('./components/InvestorPortal')),
    [View.SUPPLY_CHAIN_AUDIT]: lazy(() => import('./components/SupplyChainAudit')),
    [View.COMMUNITY]: lazy(() => import('./components/Community')),
    [View.HERITAGE_FORUM]: lazy(() => import('./components/HeritageForum')),
    [View.SCALEUP_SUMMIT]: lazy(() => import('./components/ScaleUpSummit')),
    [View.AI_ADVISOR]: lazy(() => import('./components/AiAdvisor')),
    [View.ROADMAP_AI]: lazy(() => import('./components/RoadmapAI')),
    [View.SIX_SIGMA_RCA]: lazy(() => import('./components/SixSigmaRCA')),
    [View.AI_CONSULTANT_FLOATING]: lazy(() => import('./components/AiConsultantFloating')),
    [View.COMMUNITY_GUIDELINES]: lazy(() => import('./components/CommunityGuidelines')),
    [View.TRADEMARKS]: lazy(() => import('./components/Trademarks')),
    [View.PRIVACY_POLICY]: lazy(() => import('./components/PrivacyPolicy')),
    [View.BRANDS]: lazy(() => import('./components/Brands')),
    [View.DATA_REGISTRY]: lazy(() => import('./components/DataRegistry')),
    [View.NETWORK_INPUT_HUB]: lazy(() => import('./components/NetworkInputHub')),
    [View.KNOWLEDGE]: lazy(() => import('./components/KnowledgeHub')),
    [View.FUTURE_VISION]: lazy(() => import('./components/FutureVision')),
    [View.SERVICES]: lazy(() => import('./components/Services')),
    [View.TRANSMISSION_GATEWAY]: lazy(() => import('./components/TransmissionGateway')),
    [View.PROFESSIONAL]: lazy(() => import('./components/professional/ProfessionalView')),
    [View.RESILIENCE]: lazy(() => import('./components/professional/ResilienceView')),
    [View.FIVE_THRUSTS]: lazy(() => import('./components/five-thrusts/Thrusts')),
    [View.INFORMATION]: lazy(() => import('./components/Information')),
    [View.PRODUCTS]: lazy(() => import('./components/marketplace/Products')),
    [View.PRODUCT_DETAIL]: lazy(() => import('./components/ProductDetail')),
    [View.CART]: lazy(() => import('./components/Cart')),
    [View.DATABASE]: lazy(() => import('./components/Database')),
    [View.SUSTAINABILITY_CALCULATOR]: lazy(() => import('./components/SustainabilityCalculator')),
    [View.MEDIA]: lazy(() => import('./components/Media')),
    [View.SUPPLY]: lazy(() => import('./components/Supply')),
    [View.CUSTOMER]: lazy(() => import('./components/Customer')),
    [View.PARTNERSHIPS]: lazy(() => import('./components/Partnerships')),
    [View.PODCAST]: lazy(() => import('./components/Podcast')),
    [View.WEBINAR]: lazy(() => import('./components/Webinar')),
    [View.LIVE_HOST]: lazy(() => import('./components/LiveHost')),
    [View.INTRANET_DASHBOARD]: lazy(() => import('./components/IntranetDashboard')),
    [View.EXTRANET_DASHBOARD]: lazy(() => import('./components/ExtranetDashboard')),
    [View.FRAMEWORK_DISTINCTIONS]: lazy(() => import('./components/FrameworkDistinctions')),
    [View.PORTFOLIO]: lazy(() => import('./components/Portfolio')),
    [View.AUTH]: lazy(() => import('./components/Auth')),
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user, isAuthLoading }, dispatch] = useStateValue();
  const currentView = pathToView(location.pathname);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          dispatch({ type: 'SET_USER', payload: userDoc.data() as User });
        } else { // New user
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName!,
            avatar: firebaseUser.photoURL!,
            role: 'user', // default role
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          dispatch({ type: 'SET_USER', payload: newUser });
        }
        if(location.pathname.startsWith('/auth')) {
            onNavigate(View.DASHBOARD);
        }
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
      dispatch({ type: 'SET_AUTH_LOADING', payload: false });
    });

    return () => unsubscribe();
  }, [dispatch, location.pathname]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle the rest
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
                  // Auth-specific props
                  ...(viewValue === View.AUTH && {
                      isLoading,
                      error,
                      onGoogleLogin: handleGoogleLogin, // Pass the function itself
                      onEmailLogin: () => {}, // Replace with your email login logic
                  })
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
