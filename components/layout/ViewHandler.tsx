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
import { AiConsultantFloating } from '../AiConsultantFloating';
import { ImpactDashboard } from '../ImpactDashboard';

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
    case View.HOME:
      return (
        <>
          <Hero onNavigate={handleNavClick} />
          <Community user={user} onNavigate={handleNavClick} onAwardEac={awardEac} />
        </>
      );
    case View.IMPACT_DASHBOARD:
      return <ImpactDashboard onNavigate={handleNavClick} />;
    case View.PLANET_WATCH:
      return <PlanetWatch />;
    case View.SAFE_HARVEST:
      return <SafeHarvest onNavigate={handleNavClick} />;
    case View.SUSTAINABILITY_FRAMEWORK:
      return <SustainabilityFramework onNavigate={handleNavClick} />;
    case View.CARBON_LEDGER:
      return <CarbonLedger user={user} onAwardEac={awardEac} onNavigate={handleNavClick} />;
    case View.GREEN_LENS:
      return <GreenLens />;
    case View.NUTRILIFE:
      return <NutriLife />;
    case View.AGBIZ:
      return <AgBizWeekly />;
    case View.FINANCE:
      return <Finance user={user} onNavigate={handleNavClick} />;
    case View.INVESTOR_PORTAL:
      return <InvestorPortal onNavigate={handleNavClick} />;
    case View.SUPPLY_CHAIN_AUDIT:
      return <SupplyChainAudit />;
    case View.COMMUNITY:
      return <Community user={user} onNavigate={handleNavClick} onAwardEac={awardEac} />;
    case View.HERITAGE_FORUM:
      return <HeritageForum />;
    case View.PEOPLE_AND_CULTURE:
      return <PeopleAndCulture user={user} onNavigate={handleNavClick} />;
    case View.SCALEUP_SUMMIT:
      return <ScaleUpSummit />;
    case View.AI_ADVISOR:
      return <AiAdvisor />;
    case View.CROP_DOCTOR:
      return <CropDoctor />;
    case View.FARM_SCOUT:
      return <FarmScout onNavigate={handleNavClick} />;
    case View.SMART_FARM_VR:
      return <SmartFarmVR />;
    case View.ROADMAP_AI:
      return <RoadmapAI />;
    case View.SIX_SIGMA_RCA:
      return <SixSigmaRCA />;
    case View.AI_CONSULTANT_FLOATING:
      return <AiConsultantFloating />;
    case View.DATA_REGISTRY:
      return <DataRegistry />;
    case View.OUR_STORY:
      return <Information onNavigate={handleNavClick} />;
    case View.COMMUNITY_GUIDELINES:
      return <CommunityGuidelines onNavigate={handleNavClick} />;
    case View.TRADEMARKS:
      return <Trademarks />;
    case View.PRIVACY_POLICY:
      return <PrivacyPolicy />;
    case View.KNOWLEDGE:
      return <KnowledgeHub onNavigate={handleNavClick} />;
    case View.FUTURE_VISION:
      return <FutureVision />;
    case View.NETWORK_INPUT_HUB:
        return <NetworkInputHub onNavigate={handleNavClick} isIntegrated={isPartnerIntegrated} partnerName={partnerData?.name} partnerId={partnerData?.id} />;
    case View.SERVICES:
        return <Services onNavigate={handleNavClick} />;
    case View.BRANDS:
        return <Brands onNavigate={handleNavClick} />;
    case View.TRANSMISSION_GATEWAY:
        return <TransmissionGateway onNavigate={handleNavClick} />;
    case View.PROFESSIONAL:
        return <PeopleAndCulture user={user} onNavigate={handleNavClick} />;
    case View.RESILIENCE:
        return <FrameworkDistinctions />;
    case View.FIVE_THRUSTS:
        return <FrameworkDistinctions />;
    case View.PROFILE:
        return user ? <UserProfile user={user} onUpdateUser={(u) => setUser(u)} /> : <Auth onLogin={(u) => { setUser(u); handleNavClick(View.HOME); }} onNavigate={handleNavClick} />;
    default:
      return <Hero onNavigate={handleNavClick} />;
  }
};
