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
      { label: 'About', view: View.ABOUT, icon: Users },
      { label: 'Community Guidelines', view: View.COMMUNITY_GUIDELINES, icon: Users },
      { label: 'Trademarks', view: View.TRADEMARKS, icon: ShieldCheck },
      { label: 'Privacy Policy', view: View.PRIVACY_POLICY, icon: ShieldCheck },
      { label: 'Brands', view: View.BRANDS, icon: Tags },
    ],
  },
];


export const MENU_SECTIONS = [
    {
        id: 'perspectives',
        label: 'Perspectives',
        icon: <Globe size={16} />,
        items: [
            { id: View.IMPACT_DASHBOARD, label: 'Impact Dashboard', desc: 'Data-driven insights into our sustainability efforts.', icon: <LayoutGrid size={20} /> },
            { id: View.FUTURE_VISION, label: 'Future Vision', desc: 'Our roadmap for a sustainable and prosperous future.', icon: <Feather size={20} /> },
        ]
    },
    {
        id: 'business',
        label: 'Business',
        icon: <Briefcase size={16} />,
        items: [
            { id: View.FINANCE, label: 'Finance', desc: 'Tools and resources for financial management.', icon: <BarChart3 size={20} /> },
            { id: View.INVESTOR_PORTAL, label: 'Investor Portal', desc: 'Exclusive content and insights for our investors.', icon: <Building2 size={20} /> },
            { id: View.PORTFOLIO, label: 'Portfolio', desc: 'An overview of our diverse investment portfolio.', icon: <BookOpen size={20} /> },
        ]
    },
    {
        id: 'community',
        label: 'Community',
        icon: <Users size={16} />,
        items: [
            { id: View.COMMUNITY, label: 'Community Hub', desc: 'Connect with fellow members and share your experiences.', icon: <Users size={20} /> },
            { id: View.HERITAGE_FORUM, label: 'Heritage Forum', desc: 'Preserving and celebrating our cultural heritage.', icon: <BookOpen size={20} /> },
            { id: View.SCALEUP_SUMMIT, label: 'ScaleUp Summit', desc: 'Join our annual summit for entrepreneurs and innovators.', icon: <MessageSquare size={20} /> },
        ]
    },
    {
        id: 'technology',
        label: 'Technology',
        icon: <BrainCircuit size={16} />,
        items: [
            { id: View.AI_ADVISOR, label: 'AI Advisor', desc: 'Get expert advice and insights from our AI-powered assistant.', icon: <BrainCircuit size={20} /> },
            { id: View.SMART_FARM_VR, label: 'SmartFarm VR', desc: 'Experience the future of farming with our virtual reality simulation.', icon: <Dna size={20} /> },
            { id: View.SIX_SIGMA_RCA, label: 'Six Sigma RCA', desc: 'A systematic approach to problem-solving and process improvement.', icon: <Anchor size={20} /> },
        ]
    },
    {
        id: 'resources',
        label: 'Resources',
        icon: <BookOpen size={16} />,
        items: [
            { id: View.KNOWLEDGE, label: 'Knowledge Hub', desc: 'A curated library of articles, case studies, and tutorials.', icon: <BookOpen size={20} /> },
            { id: View.WEBINAR, label: 'Webinars', desc: 'Join our live webinars and learn from industry experts.', icon: <Mic size={20} /> },
            { id: View.PODCAST, label: 'Podcasts', desc: 'Listen to our podcast series and stay up-to-date on the latest trends.', icon: <Mic size={20} /> },
        ]
    }
];
