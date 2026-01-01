
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import { Home } from './views/Home';
import { PeopleAndCulture } from './components/PeopleAndCulture';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Dashboard } from './components/Dashboard';
import { CropDoctor } from './components/CropDoctor';
import { FarmScout } from './components/FarmScout';
import { SmartFarmVR } from './components/SmartFarmVR';
import { SafeHarvest } from './components/SafeHarvest';
import { View } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { StateProvider } from './context/StateContext';
import { reducer, initialState } from './context/reducer';
import { NAVIGATION_STRUCTURE } from './components/layout/NavigationConstants';
import { ViewPlaceholder } from './components/ViewPlaceholder';
import { UserProfile } from './components/UserProfile';
import { PlanetWatch } from './components/PlanetWatch';
import { SustainabilityFramework } from './components/SustainabilityFramework';
import { CarbonLedger } from './components/CarbonLedger';
import { GreenLens } from './components/GreenLens';
import { NutriLife } from './components/NutriLife';
import { AgBiz } from './components/AgBiz';
import { AgBizWeekly } from './components/AgBizWeekly';
import { Finance } from './components/Finance';
import { InvestorPortal } from './components/InvestorPortal';
import { SupplyChainAudit } from './components/SupplyChainAudit';
import { Community } from './components/Community';
import { HeritageForum } from './components/HeritageForum';
import { ScaleUpSummit } from './components/ScaleUpSummit';
import { AiAdvisor } from './components/AiAdvisor';
import { RoadmapAI } from './components/RoadmapAI';
import { SixSigmaRCA } from './components/SixSigmaRCA';
import { AiConsultantFloating } from './components/AiConsultantFloating';
import { CommunityGuidelines } from './components/CommunityGuidelines';
import { Trademarks } from './components/Trademarks';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Brands } from './components/Brands';
import { DataRegistry } from './components/DataRegistry';
import { ImpactDashboard } from './components/ImpactDashboard';
import { NetworkInputHub } from './components/NetworkInputHub';

const NotFound = () => (
  <div className="h-screen flex items-center justify-center text-4xl">Not Found</div>
);

const pathToView = (path: string): View => {
  const view = path.substring(1).toUpperCase().replace(/-/g, '_');
  return (Object.values(View) as string[]).includes(view) ? (View as any)[view] : View.HOME;
}

const allViews = NAVIGATION_STRUCTURE.flatMap(category => 
  category.subItems ? category.subItems.map(item => item.view) : (category.view ? [category.view] : [])
);

const componentMap: { [key in View]?: React.ComponentType<any> } = {
    [View.HOME]: Home,
    [View.DASHBOARD]: Dashboard,
    [View.IMPACT_DASHBOARD]: ImpactDashboard,
    [View.CROP_DOCTOR]: CropDoctor,
    [View.FARM_SCOUT]: FarmScout,
    [View.SMART_FARM_VR]: SmartFarmVR,
    [View.SAFE_HARVEST]: SafeHarvest,
    [View.PEOPLE_AND_CULTURE]: PeopleAndCulture,
    [View.PROFILE]: UserProfile,
    [View.PLANET_WATCH]: PlanetWatch,
    [View.SUSTAINABILITY_FRAMEWORK]: SustainabilityFramework,
    [View.CARBON_LEDGER]: CarbonLedger,
    [View.GREEN_LENS]: GreenLens,
    [View.NUTRILIFE]: NutriLife,
    [View.AGBIZ]: AgBiz,
    [View.AGBIZ_WEEKLY]: AgBizWeekly,
    [View.FINANCE]: Finance,
    [View.INVESTOR_PORTAL]: InvestorPortal,
    [View.SUPPLY_CHAIN_AUDIT]: SupplyChainAudit,
    [View.COMMUNITY]: Community,
    [View.HERITAGE_FORUM]: HeritageForum,
    [View.SCALEUP_SUMMIT]: ScaleUpSummit,
    [View.AI_ADVISOR]: AiAdvisor,
    [View.ROADMAP_AI]: RoadmapAI,
    [View.SIX_SIGMA_RCA]: SixSigmaRCA,
    [View.AI_CONSULTANT_FLOATING]: AiConsultantFloating,
    [View.COMMUNITY_GUIDELINES]: CommunityGuidelines,
    [View.TRADEMARKS]: Trademarks,
    [View.PRIVACY_POLICY]: PrivacyPolicy,
    [View.BRANDS]: Brands,
    [View.DATA_REGISTRY]: DataRegistry,
    [View.NETWORK_INPUT_HUB]: NetworkInputHub,
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = pathToView(location.pathname);

  const onNavigate = (view: View, params?: any) => {
    const path = view === View.HOME ? '/' : `/${view.toLowerCase().replace(/_/g, '-')}`;
    navigate(path, { state: params });
  };

  return (
    <main className='bg-white dark:bg-gray-900'>
      <ScrollToTop />
      <Navbar onNavigate={onNavigate} currentView={currentView} />
      <div>
        <Routes>
          <Route path="/" element={<Home onNavigate={onNavigate} />} />
          <Route path="/home" element={<Home onNavigate={onNavigate} />} />
          {allViews.map(view => {
            const Component = componentMap[view] || (() => <ViewPlaceholder viewName={view} />);
            return <Route key={view} path={`/${view.toLowerCase().replace(/_/g, '-')}`} element={<Component onNavigate={onNavigate} />} />
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

const AppWrapper = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </StateProvider>
);

export default AppWrapper;
