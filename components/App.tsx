import React, { useState, useEffect, Suspense } from 'react';
import { Auth } from './Auth';
import { Products } from './marketplace/Products';
import { ProductDetail } from './ProductDetail';
import { Customer } from './Customer';
import { CustomerDetail } from './CustomerDetail';
import { AiChat } from './AiChat';
import { View, User, Product } from '../types';
import { auth, db } from '../lib/firebase';
import { 
  signInWithRedirect, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import NetworkInputHubSkeleton from './skeletons/NetworkInputHubSkeleton';

const NetworkInputHub = React.lazy(() => import('./NetworkInputHub'));
const FutureVision = React.lazy(() => import('./FutureVision'));
const Services = React.lazy(() => import('./Services'));
const RoadmapAI = React.lazy(() => import('./RoadmapAI'));
const Finance = React.lazy(() => import('./Finance'));
const Portfolio = React.lazy(() => import('./Portfolio'));
const KnowledgeHub = React.lazy(() => import('./KnowledgeHub'));
const TransmissionGateway = React.lazy(() => import('./TransmissionGateway'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const ImpactDashboard = React.lazy(() => import('./ImpactDashboard'));
const CropDoctor = React.lazy(() => import('./CropDoctor'));
const FarmScout = React.lazy(() => import('./FarmScout'));
const SmartFarmVR = React.lazy(() => import('./SmartFarmVR'));
const SafeHarvest = React.lazy(() => import('./SafeHarvest'));
const UserProfile = React.lazy(() => import('./UserProfile'));
const PlanetWatch = React.lazy(() => import('./PlanetWatch'));
const SustainabilityFramework = React.lazy(() => import('./SustainabilityFramework'));
const CarbonLedger = React.lazy(() => import('./carbonledger/CarbonLedger'));
const GreenLens = React.lazy(() => import('./GreenLens'));
const NutriLife = React.lazy(() => import('./NutriLife'));
const AgBiz = React.lazy(() => import('./AgBiz'));
const AgBizWeekly = React.lazy(() => import('./AgBizWeekly'));
const InvestorPortal = React.lazy(() => import('./InvestorPortal'));
const SupplyChainAudit = React.lazy(() => import('./SupplyChainAudit'));
const Community = React.lazy(() => import('./Community'));
const HeritageForum = React.lazy(() => import('./HeritageForum'));
const ScaleUpSummit = React.lazy(() => import('./ScaleUpSummit'));
const AiAdvisor = React.lazy(() => import('./AiAdvisor'));
const SixSigmaRCA = React.lazy(() => import('./six-sigma-rca'));
const AiConsultantFloating = React.lazy(() => import('./AiConsultantFloating'));
const CommunityGuidelines = React.lazy(() => import('./CommunityGuidelines'));
const Trademarks = React.lazy(() => import('./Trademarks'));
const PrivacyPolicy = React.lazy(() => import('./PrivacyPolicy'));
const Brands = React.lazy(() => import('./Brands'));
const DataRegistry = React.lazy(() => import('./DataRegistry'));
const About = React.lazy(() => import('./about/page'));
const Professional = React.lazy(() => import('./professional/ProfessionalView'));
const Resilience = React.lazy(() => import('./professional/ResilienceView'));
const FiveThrusts = React.lazy(() => import('./five-thrusts/Thrusts'));
const Information = React.lazy(() => import('./Information'));
const Cart = React.lazy(() => import('./Cart'));
const Database = React.lazy(() => import('./Database'));
const SustainabilityCalculator = React.lazy(() => import('./SustainabilityCalculator'));
const Media = React.lazy(() => import('./Media'));
const Supply = React.lazy(() => import('./Supply'));
const Partnerships = React.lazy(() => import('./Partnerships'));
const Podcast = React.lazy(() => import('./Podcast'));
const Webinar = React.lazy(() => import('./Webinar'));
const LiveHost = React.lazy(() => import('./LiveHost'));
const IntranetDashboard = React.lazy(() => import('./IntranetDashboard'));
const ExtranetDashboard = React.lazy(() => import('./ExtranetDashboard'));
const FrameworkDistinctions = React.lazy(() => import('./FrameworkDistinctions'));
const CommunityGarden = React.lazy(() => import('./CommunityGarden'));
const DesignSystem = React.lazy(() => import('./DesignSystem'));
const GroupLogin = React.lazy(() => import('./GroupLogin'));
const OrganizationLogin = React.lazy(() => import('./OrganizationLogin'));

function App() {
  const [view, setView] = useState<View>(View.AUTH);
  const [user, setUser] = useState<User | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
          setView(View.HOME);
        } else {
          setError("User data not found. Please contact support.");
          await signOut(auth);
          setUser(null);
          setView(View.AUTH);
        }
      } else {
        setUser(null);
        setView(View.AUTH);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setIsLoading(true);
          const firebaseUser = result.user;
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (!userDoc.exists()) {
            const userData: Omit<User, 'uid'> = {
              name: firebaseUser.displayName || 'New User',
              email: firebaseUser.email || '',
              role: 'Farmer',
              joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              avatar: firebaseUser.photoURL || undefined,
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
            setUser({ uid: firebaseUser.uid, ...userData });
          } else {
            setUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
          }
          setView(View.HOME);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleRedirectResult();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
      setIsLoading(false);
    }
  };
  
  const handleEmailLogin = async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
          await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        console.error(err);
      } finally {
          setIsLoading(false);
      }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setView(View.AUTH);
  };

  const handleNavigate = (newView: View, params?: any) => {
    if (newView === View.PRODUCT_DETAIL && params) {
      setCurrentProduct(params);
    }
    setView(newView);
  };

  const renderContent = () => {
    if (isLoading) {
        return <NetworkInputHubSkeleton />;
    }

    switch (view) {
      case View.AUTH:
        return <Auth 
          onGoogleLogin={handleGoogleLogin}
          onEmailLogin={handleEmailLogin}
          isLoading={isLoading}
          error={error}
        />;
      case View.PRODUCTS:
        return <Products onNavigate={handleNavigate} />;
      case View.PRODUCT_DETAIL:
        return <ProductDetail onNavigate={handleNavigate} product={currentProduct} />;
      case View.CUSTOMER:
        return <Customer onNavigate={handleNavigate} />;
      case View.CUSTOMER_DETAIL:
        return <CustomerDetail />;
      case View.AI_CHAT:
        return <AiChat />;
      case View.FUTURE_VISION:
        return <Suspense fallback={<div>Loading Vision Lab...</div>}><FutureVision onNavigate={handleNavigate} /></Suspense>;
      case View.SERVICES:
        return <Suspense fallback={<div>Loading Services...</div>}><Services onNavigate={handleNavigate} /></Suspense>;
      case View.ROADMAP_AI:
        return <Suspense fallback={<div>Loading AI Roadmap...</div>}><RoadmapAI /></Suspense>;
      case View.FINANCE:
        return <Suspense fallback={<div>Loading Capital Node...</div>}><Finance /></Suspense>;
      case View.PORTFOLIO:
        return <Suspense fallback={<div>Loading Portfolio...</div>}><Portfolio user={user} /></Suspense>;
      case View.KNOWLEDGE:
        return <Suspense fallback={<div>Loading Knowledge Hub...</div>}><KnowledgeHub onNavigate={handleNavigate} /></Suspense>;
      case View.TRANSMISSION_GATEWAY:
        return <Suspense fallback={<div>Loading Transmission Gateway...</div>}><TransmissionGateway onNavigate={handleNavigate} /></Suspense>;
      case View.DASHBOARD:
        return <Suspense fallback={<div>Loading Dashboard...</div>}><Dashboard user={user} onNavigate={handleNavigate} /></Suspense>;
      case View.IMPACT_DASHBOARD:
        return <Suspense fallback={<div>Loading Impact Dashboard...</div>}><ImpactDashboard onNavigate={handleNavigate} /></Suspense>;
      case View.CROP_DOCTOR:
        return <Suspense fallback={<div>Loading Crop Doctor...</div>}><CropDoctor /></Suspense>;
      case View.FARM_SCOUT:
        return <Suspense fallback={<div>Loading Farm Scout...</div>}><FarmScout /></Suspense>;
      case View.SMART_FARM_VR:
        return <Suspense fallback={<div>Loading Smart Farm VR...</div>}><SmartFarmVR /></Suspense>;
      case View.SAFE_HARVEST:
        return <Suspense fallback={<div>Loading Safe Harvest...</div>}><SafeHarvest /></Suspense>;
      case View.PROFILE:
        return <Suspense fallback={<div>Loading Profile...</div>}><UserProfile user={user} onLogout={handleLogout} /></Suspense>;
      case View.PLANET_WATCH:
        return <Suspense fallback={<div>Loading Planet Watch...</div>}><PlanetWatch /></Suspense>;
      case View.SUSTAINABILITY_FRAMEWORK:
        return <Suspense fallback={<div>Loading Sustainability Framework...</div>}><SustainabilityFramework /></Suspense>;
      case View.CARBON_LEDGER:
        return <Suspense fallback={<div>Loading Carbon Ledger...</div>}><CarbonLedger user={user} onNavigate={handleNavigate} /></Suspense>;
      case View.GREEN_LENS:
        return <Suspense fallback={<div>Loading Green Lens...</div>}><GreenLens /></Suspense>;
      case View.NUTRILIFE:
        return <Suspense fallback={<div>Loading Nutrilife...</div>}><NutriLife /></Suspense>;
      case View.AGBIZ:
        return <Suspense fallback={<div>Loading AgBiz...</div>}><AgBiz /></Suspense>;
      case View.AGBIZ_WEEKLY:
        return <Suspense fallback={<div>Loading AgBiz Weekly...</div>}><AgBizWeekly /></Suspense>;
      case View.INVESTOR_PORTAL:
        return <Suspense fallback={<div>Loading Investor Portal...</div>}><InvestorPortal /></Suspense>;
      case View.SUPPLY_CHAIN_AUDIT:
        return <Suspense fallback={<div>Loading Supply Chain Audit...</div>}><SupplyChainAudit /></Suspense>;
      case View.COMMUNITY:
        return <Suspense fallback={<div>Loading Community...</div>}><Community user={user} onNavigate={handleNavigate} /></Suspense>;
      case View.HERITAGE_FORUM:
        return <Suspense fallback={<div>Loading Heritage Forum...</div>}><HeritageForum /></Suspense>;
      case View.SCALEUP_SUMMIT:
        return <Suspense fallback={<div>Loading Scaleup Summit...</div>}><ScaleUpSummit /></Suspense>;
      case View.AI_ADVISOR:
        return <Suspense fallback={<div>Loading AI Advisor...</div>}><AiAdvisor /></Suspense>;
      case View.SIX_SIGMA_RCA:
        return <Suspense fallback={<div>Loading Six Sigma RCA...</div>}><SixSigmaRCA /></Suspense>;
      case View.AI_CONSULTANT_FLOATING:
        return <Suspense fallback={<div>Loading AI Consultant...</div>}><AiConsultantFloating /></Suspense>;
      case View.COMMUNITY_GUIDELINES:
        return <Suspense fallback={<div>Loading Community Guidelines...</div>}><CommunityGuidelines /></Suspense>;
      case View.TRADEMARKS:
        return <Suspense fallback={<div>Loading Trademarks...</div>}><Trademarks /></Suspense>;
      case View.PRIVACY_POLICY:
        return <Suspense fallback={<div>Loading Privacy Policy...</div>}><PrivacyPolicy /></Suspense>;
      case View.BRANDS:
        return <Suspense fallback={<div>Loading Brands...</div>}><Brands /></Suspense>;
      case View.DATA_REGISTRY:
        return <Suspense fallback={<div>Loading Data Registry...</div>}><DataRegistry /></Suspense>;
      case View.ABOUT:
        return <Suspense fallback={<div>Loading About...</div>}><About /></Suspense>;
      case View.PROFESSIONAL:
        return <Suspense fallback={<div>Loading Professional...</div>}><Professional /></Suspense>;
      case View.RESILIENCE:
        return <Suspense fallback={<div>Loading Resilience...</div>}><Resilience /></Suspense>;
      case View.FIVE_THRUSTS:
        return <Suspense fallback={<div>Loading Five Thrusts...</div>}><FiveThrusts /></Suspense>;
      case View.INFORMATION:
        return <Suspense fallback={<div>Loading Information...</div>}><Information /></Suspense>;
      case View.CART:
        return <Suspense fallback={<div>Loading Cart...</div>}><Cart /></Suspense>;
      case View.DATABASE:
        return <Suspense fallback={<div>Loading Database...</div>}><Database /></Suspense>;
      case View.SUSTAINABILITY_CALCULATOR:
        return <Suspense fallback={<div>Loading Sustainability Calculator...</div>}><SustainabilityCalculator /></Suspense>;
      case View.MEDIA:
        return <Suspense fallback={<div>Loading Media...</div>}><Media /></Suspense>;
      case View.SUPPLY:
        return <Suspense fallback={<div>Loading Supply...</div>}><Supply /></Suspense>;
      case View.PARTNERSHIPS:
        return <Suspense fallback={<div>Loading Partnerships...</div>}><Partnerships /></Suspense>;
      case View.PODCAST:
        return <Suspense fallback={<div>Loading Podcast...</div>}><Podcast /></Suspense>;
      case View.WEBINAR:
        return <Suspense fallback={<div>Loading Webinar...</div>}><Webinar /></Suspense>;
      case View.LIVE_HOST:
        return <Suspense fallback={<div>Loading Live Host...</div>}><LiveHost /></Suspense>;
      case View.INTRANET_DASHBOARD:
        return <Suspense fallback={<div>Loading Intranet Dashboard...</div>}><IntranetDashboard /></Suspense>;
      case View.EXTRANET_DASHBOARD:
        return <Suspense fallback={<div>Loading Extranet Dashboard...</div>}><ExtranetDashboard /></Suspense>;
      case View.FRAMEWORK_DISTINCTIONS:
        return <Suspense fallback={<div>Loading Framework Distinctions...</div>}><FrameworkDistinctions /></Suspense>;
      case View.COMMUNITY_GARDEN:
        return <Suspense fallback={<div>Loading Community Garden...</div>}><CommunityGarden /></Suspense>;
      case View.DESIGN_SYSTEM:
        return <Suspense fallback={<div>Loading Design System...</div>}><DesignSystem /></Suspense>;
      case View.GROUP_LOGIN:
        return <Suspense fallback={<div>Loading Group Login...</div>}><GroupLogin onNavigate={handleNavigate} /></Suspense>;
      case View.ORGANIZATION_LOGIN:
        return <Suspense fallback={<div>Loading Organization Login...</div>}><OrganizationLogin onNavigate={handleNavigate} /></Suspense>;
      case View.HOME:
      default:
        if (user) {
          return (
            <Suspense fallback={<NetworkInputHubSkeleton />}>
              <NetworkInputHub 
                user={user} 
                onNavigate={handleNavigate} 
                onLogout={handleLogout} 
              />
            </Suspense>
          );
        } 
        return <Auth 
          onGoogleLogin={handleGoogleLogin}
          onEmailLogin={handleEmailLogin}
          isLoading={isLoading}
          error={error}
        />;
    }
  }

  return renderContent();
}

export default App;
