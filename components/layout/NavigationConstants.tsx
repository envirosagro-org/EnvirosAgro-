
import { View } from '../../types';
import {
    LayoutGrid, BarChart3, Leaf, BrainCircuit, Users, HeartHandshake, Briefcase, Info, MessageSquare, Mic, 
    BookOpen, Globe, GitBranch, ShieldCheck, Factory, Dna, Anchor, Feather, Settings, Building2, Link, Tags, Home
} from 'lucide-react';

export const NAVIGATION_STRUCTURE = [
  {
    label: 'Home',
    icon: Home,
    view: View.HOME,
  },
  {
    label: 'Ecological Integrity',
    icon: Leaf,
    subItems: [
      { label: 'Planet Watch', view: View.PLANET_WATCH, icon: Globe },
      { label: 'Safe Harvest', view: View.SAFE_HARVEST, icon: ShieldCheck },
      { label: 'Sustainability Framework', view: View.SUSTAINABILITY_FRAMEWORK, icon: Anchor },
      { label: 'Carbon Ledger', view: View.CARBON_LEDGER, icon: GitBranch },
      { label: 'Green Lens', view: View.GREEN_LENS, icon: Feather },
      { label: 'Nutri-Life', view: View.NUTRILIFE, icon: Dna },
    ],
  },
  {
    label: 'Economic Viability',
    icon: BarChart3,
    subItems: [
      { label: 'AgBiz', view: View.AGBIZ, icon: Factory },
      { label: 'AgBiz Weekly', view: View.AGBIZ_WEEKLY, icon: Briefcase },
      { label: 'Finance', view: View.FINANCE, icon: Link },
      { label: 'Investor Portal', view: View.INVESTOR_PORTAL, icon: Building2 },
      { label: 'Supply Chain Audit', view: View.SUPPLY_CHAIN_AUDIT, icon: Settings },
    ],
  },
  {
    label: 'Social Equity',
    icon: Users,
    subItems: [
      { label: 'Community', view: View.COMMUNITY, icon: Users },
      { label: 'Heritage Forum', view: View.HERITAGE_FORUM, icon: BookOpen },
      { label: 'People and Culture', view: View.PEOPLE_AND_CULTURE, icon: HeartHandshake },
      { label: 'ScaleUp Summit', view: View.SCALEUP_SUMMIT, icon: MessageSquare },
    ],
  },
  {
    label: 'Technological Innovation',
    icon: BrainCircuit,
    subItems: [
        { label: 'AI Advisor', view: View.AI_ADVISOR, icon: BrainCircuit },
        { label: 'Crop Doctor', view: View.CROP_DOCTOR, icon: Leaf },
        { label: 'Farm Scout', view: View.FARM_SCOUT, icon: Globe },
        { label: 'SmartFarm VR', view: View.SMART_FARM_VR, icon: Dna },
        { label: 'Roadmap AI', view: View.ROADMAP_AI, icon: GitBranch },
        { label: 'Six Sigma RCA', view: View.SIX_SIGMA_RCA, icon: Anchor },
        { label: 'AI Floating Consultant', view: View.AI_CONSULTANT_FLOATING, icon: Feather },
        { label: 'Data Registry', view: View.DATA_REGISTRY, icon: Feather },
    ],
  },
  {
    label: 'About Us',
    icon: Info,
    subItems: [
      { label: 'Community Guidelines', view: View.COMMUNITY_GUIDELINES, icon: Users },
      { label: 'Trademarks', view: View.TRADEMARKS, icon: ShieldCheck },
      { label: 'Privacy Policy', view: View.PRIVACY_POLICY, icon: ShieldCheck },
      { label: 'Brands', view: View.BRANDS, icon: Tags },
    ],
  },
];
