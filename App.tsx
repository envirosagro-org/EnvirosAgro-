
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
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
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
import { CommandPalette } from './components/CommandPalette';
import { AboutPage } from './components/about/page';
import { KnowledgeHub } from './components/KnowledgeHub';
import { FutureVision } from './components/FutureVision';
import { Services } from './components/Services';
import { TransmissionGateway } from './components/TransmissionGateway';
import { ProfessionalView } from './components/professional/ProfessionalView';
import { ResilienceView } from './components/professional/ResilienceView';
import { Thrusts } from './components/five-thrusts/Thrusts';
import { Information } from './components/Information';
import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Database } from './components/Database';
import { SustainabilityCalculator } from './components/SustainabilityCalculator';
import { Media } from './components/Media';
import { Supply } from './components/Supply';
import { Customer } from './components/Customer';
import { Partnerships } from './components/Partnerships';
import { Podcast } from './components/Podcast';
import { Webinar } from './components/Webinar';
import { LiveHost } from './components/LiveHost';
import { IntranetDashboard } from './components/IntranetDashboard';
import { ExtranetDashboard } from './components/ExtranetDashboard';
import { FrameworkDistinctions } from './components/FrameworkDistinctions';
import { Portfolio } from './components/Portfolio';

const NotFound = () => (
  <div className="h-screen flex items-center justify-center text-4xl">Not Found</div>
);

const pathToView = (path: string): View => {
  const view = path.substring(1).toUpperCase().replace(/-/g, '_');
  return (Object.values(View) as string[]).includes(view) ? (View as any)[view] : View.HOME;
}

const componentMap: { [key in View]?: React.ComponentType<any> } = {
    [View.HOME]: Home,
    [View.ABOUT]: AboutPage,
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
    [View.KNOWLEDGE]: KnowledgeHub,
    [View.FUTURE_VISION]: FutureVision,
    [View.SERVICES]: Services,
    [View.TRANSMISSION_GATEWAY]: TransmissionGateway,
    [View.PROFESSIONAL]: ProfessionalView,
    [View.RESILIENCE]: ResilienceView,
    [View.FIVE_THRUSTS]: Thrusts,
    [View.INFORMATION]: Information,
    [View.PRODUCTS]: Products,
    [View.CART]: Cart,
    [View.DATABASE]: Database,
    [View.SUSTAINABILITY_CALCULATOR]: SustainabilityCalculator,
    [View.MEDIA]: Media,
    [View.SUPPLY]: Supply,
    [View.CUSTOMER]: Customer,
    [View.PARTNERSHIPS]: Partnerships,
    [View.PODCAST]: Podcast,
    [View.WEBINAR]: Webinar,
    [View.LIVE_HOST]: LiveHost,
    [View.INTRANET_DASHBOARD]: IntranetDashboard,
    [View.EXTRANET_DASHBOARD]: ExtranetDashboard,
    [View.FRAMEWORK_DISTINCTIONS]: FrameworkDistinctions,
    [View.PORTFOLIO]: Portfolio,
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
      <CommandPalette onNavigate={onNavigate} />
      <div>
        <Routes>
          <Route path="/" element={<Home onNavigate={onNavigate} />} />
          <Route path="/home" element={<Home onNavigate={onNavigate} />} />
          {Object.values(View).map(view => {
            const Component = componentMap[view as View] || (() => <ViewPlaceholder viewName={view} />);
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
        <LanguageProvider>
          <CurrencyProvider>
            <App />
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  </StateProvider>
);

export default AppWrapper;
