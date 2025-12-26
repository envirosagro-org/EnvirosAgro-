import React from 'react';
import { View, User } from '../../types';
import { Hero } from '../Hero';
import { Information } from '../Information';
import { Products } from '../Products';
import { Cart } from '../Cart';
import { Services } from '../Services';
import { Database } from '../Database';
import { PeopleAndCulture } from '../PeopleAndCulture';
import { KnowledgeHub } from '../KnowledgeHub';
import { Dashboard } from '../Dashboard';
import { AiAdvisor } from '../AiAdvisor';
import { RoadmapAI } from '../RoadmapAI';
import { CropDoctor } from '../CropDoctor';
import { SustainabilityCalculator } from '../SustainabilityCalculator';
import { FarmScout } from '../FarmScout';
import { CarbonLedger } from '../CarbonLedger';
import { Auth } from '../Auth';
import { UserProfile } from '../UserProfile';
import { SustainabilityFramework } from '../SustainabilityFramework';
import { Brands } from '../Brands';
import { Trademarks } from '../Trademarks';
import { Media } from '../Media';
import { Supply } from '../Supply';
import { Customer } from '../Customer';
import { Partnerships } from '../Partnerships';
import { Finance } from '../Finance';
import { Community } from '../Community';
import { Podcast } from '../Podcast';
import { HeritageForum } from '../HeritageForum';
import { Webinar } from '../Webinar';
import { SmartFarmVR } from '../SmartFarmVR';
import { PlanetWatch } from '../PlanetWatch';
import { GreenLens } from '../GreenLens';
import { SafeHarvest } from '../SafeHarvest';
import { NutriLife } from '../NutriLife';
import { AgBizWeekly } from '../AgBizWeekly';
import { InvestorPortal } from '../InvestorPortal';
import { ScaleUpSummit } from '../ScaleUpSummit';
import { LiveHost } from '../LiveHost';
import { CommunityGuidelines } from '../CommunityGuidelines';
import { IntranetDashboard } from '../IntranetDashboard';
import { ExtranetDashboard } from '../ExtranetDashboard';
import { PrivacyPolicy } from '../PrivacyPolicy';
import { SupplyChainAudit } from '../SupplyChainAudit';
import { NetworkInputHub } from '../NetworkInputHub';
import { TransmissionGateway } from '../TransmissionGateway';
import { FutureVision } from '../FutureVision';
import { SixSigmaRCA } from '../SixSigmaRCA';
import { FrameworkDistinctions } from '../FrameworkDistinctions';
import { DataRegistry } from '../DataRegistry';
import { Portfolio } from '../Portfolio';

interface ViewHandlerProps {
  currentView: View;
  handleNavClick: (view: View, query?: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  awardEac: (amount: number) => void;
  globalSearchQuery: string;
  isPartnerIntegrated: boolean;
  setIsPartnerIntegrated: (val: boolean) => void;
  partnerData: { name: string; id: string } | null;
  setPartnerData: (data: { name: string; id: string } | null) => void;
  setCurrency: (currency: string) => void;
}

export const ViewHandler: React.FC<ViewHandlerProps> = ({
  currentView,
  handleNavClick,
  user,
  setUser,
  awardEac,
  globalSearchQuery,
  isPartnerIntegrated,
  setIsPartnerIntegrated,
  partnerData,
  setPartnerData,
  setCurrency
}) => {
  switch (currentView) {
    case View.HOME: return <Hero onNavigate={handleNavClick} />;
    case View.INFORMATION: return <Information onNavigate={handleNavClick} />;
    case View.PRODUCTS: return <Products setCurrency={setCurrency} />;
    case View.CART: return <Cart onNavigate={handleNavClick} />;
    case View.SERVICES: return <Services onNavigate={handleNavClick} />;
    case View.DATABASE: return <Database user={user} onAwardEac={awardEac} />;
    case View.PEOPLE_AND_CULTURE: return <PeopleAndCulture user={user} onNavigate={handleNavClick} />;
    case View.PEOPLE_AND_CULTURE_CLOUD: return <PeopleAndCulture user={user} onNavigate={handleNavClick} initialTab="CLOUD" />;
    case View.KNOWLEDGE: return <Information onNavigate={handleNavClick} />;
    case View.DASHBOARD: return <Dashboard onNavigate={handleNavClick} />;
    case View.AI_ADVISOR: return <AiAdvisor />;
    case View.ROADMAP_AI: return <RoadmapAI />;
    case View.CROP_DOCTOR: return <CropDoctor />;
    case View.SUSTAINABILITY_CALCULATOR: return <SustainabilityCalculator />;
    case View.FARM_SCOUT: return <FarmScout onNavigate={handleNavClick} />;
    case View.CARBON_LEDGER: return <CarbonLedger user={user} onAwardEac={awardEac} onNavigate={handleNavClick} />;
    case View.SIGN_UP: return <Auth onLogin={(u) => { setUser(u); handleNavClick(View.HOME); }} onNavigate={handleNavClick} />;
    case View.PROFILE: return user ? <UserProfile user={user} onUpdateUser={(u) => setUser(u)} /> : <Auth onLogin={(u) => { setUser(u); handleNavClick(View.HOME); }} onNavigate={handleNavClick} />;
    case View.SUSTAINABILITY_FRAMEWORK: return <SustainabilityFramework onNavigate={handleNavClick} />;
    case View.BRANDS: return <Brands onNavigate={handleNavClick} />;
    case View.TRADEMARKS: return <Trademarks />;
    case View.MEDIA: return <Media onNavigate={handleNavClick} />;
    case View.SUPPLY: return <Supply onNavigate={handleNavClick} />;
    case View.CUSTOMER: return <Customer onNavigate={handleNavClick} />;
    case View.PARTNERSHIPS: return <Partnerships onNavigate={handleNavClick} onIntegrationComplete={(data) => { setIsPartnerIntegrated(true); setPartnerData(data); }} />;
    case View.FINANCE: return <Finance user={user} onNavigate={handleNavClick} />;
    case View.COMMUNITY: return <Community user={user} onNavigate={handleNavClick} onAwardEac={awardEac} />;
    case View.PODCAST: return <Podcast />;
    case View.HERITAGE_FORUM: return <HeritageForum />;
    case View.WEBINAR: return <Webinar />;
    case View.SMART_FARM_VR: return <SmartFarmVR />;
    case View.PLANET_WATCH: return <PlanetWatch />;
    case View.GREEN_LENS: return <GreenLens />;
    case View.SAFE_HARVEST: return <SafeHarvest onNavigate={handleNavClick} />;
    case View.NUTRILIFE: return <NutriLife />;
    case View.AGBIZ_WEEKLY: return <AgBizWeekly />;
    case View.INVESTOR_PORTAL: return <InvestorPortal onNavigate={handleNavClick} />;
    case View.SCALEUP_SUMMIT: return <ScaleUpSummit />;
    case View.LIVE_HOST: return <LiveHost />;
    case View.COMMUNITY_GUIDELINES: return <CommunityGuidelines onNavigate={handleNavClick} />;
    case View.INTRANET_DASHBOARD: return <IntranetDashboard />;
    case View.EXTRANET_DASHBOARD: return <ExtranetDashboard />;
    case View.PRIVACY_POLICY: return <PrivacyPolicy />;
    case View.SUPPLY_CHAIN_AUDIT: return <SupplyChainAudit />;
    case View.NETWORK_INPUT_HUB: return <NetworkInputHub onNavigate={handleNavClick} isIntegrated={isPartnerIntegrated} partnerName={partnerData?.name} partnerId={partnerData?.id} />;
    case View.TRANSMISSION_GATEWAY: return <TransmissionGateway onNavigate={handleNavClick} />;
    case View.FUTURE_VISION: return <FutureVision />;
    case View.SIX_SIGMA_RCA: return <SixSigmaRCA />;
    case View.FRAMEWORK_DISTINCTIONS: return <FrameworkDistinctions />;
    case View.DATA_REGISTRY: return <DataRegistry />;
    case View.PORTFOLIO: return <Portfolio user={user} />;
    default: return <Hero onNavigate={handleNavClick} />;
  }
};
