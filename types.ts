export enum View {
    HOME = 'home',
    AI_ADVISOR = 'ai_advisor',
    DASHBOARD = 'dashboard',
    OP_CENTER = 'op_center',
    FINANCE = 'finance',
    CARBON_LEDGER = 'carbon_ledger',
    KNOWLEDGE = 'knowledge',
    COMMUNITY = 'community',
    PLANET_WATCH = 'planet_watch',
    HERITAGE_FORUM = 'heritage_forum',
    AGBIZ_WEEKLY = 'agbiz_weekly',
    FUTURE_VISION = 'future_vision',
    GREEN_LENS = 'green_lens',
    SCALEUP_SUMMIT = 'scaleup_summit',
    SMART_FARM_VR = 'smart_farm_vr',
    PODCAST = 'podcast',
    LIVE_HOST = 'live_host',
    SAFE_HARVEST = 'safe_harvest',
    NUTRILIFE = 'nutrilife',
    INVESTOR_PORTAL = 'investor_portal',
    PARTNERSHIPS = 'partnerships',
    PEOPLE_AND_CULTURE = 'people_and_culture',
    ROADMAP_AI = 'roadmap_ai',
    SUPPLY_CHAIN_AUDIT = 'supply_chain_audit',
    SIX_SIGMA_RCA = 'six_sigma_rca',
    CROP_DOCTOR = 'crop_doctor',
    FARM_SCOUT = 'farm_scout',
    NETWORK_INPUT_HUB = 'network_input_hub',
    PRIVACY_POLICY = 'privacy_policy',
    COMMUNITY_GUIDELINES = 'community_guidelines',
    PROFILE = 'profile',
    INFORMATION = 'information',
    PRODUCTS = 'products',
    CART = 'cart',
    SERVICES = 'services',
    DATABASE = 'database',
    PEOPLE_AND_CULTURE_CLOUD = 'people_and_culture_cloud',
    SUSTAINABILITY_CALCULATOR = 'sustainability_calculator',
    SIGN_UP = 'sign_up',
    SUSTAINABILITY_FRAMEWORK = 'sustainability_framework',
    BRANDS = 'brands',
    TRADEMARKS = 'trademarks',
    MEDIA = 'media',
    SUPPLY = 'supply',
    CUSTOMER = 'customer',
    WEBINAR = 'webinar',
    INTRANET_DASHBOARD = 'intranet_dashboard',
    EXTRANET_DASHBOARD = 'extranet_dashboard',
    TRANSMISSION_GATEWAY = 'transmission_gateway',
    FRAMEWORK_DISTINCTIONS = 'framework_distinctions',
    INFO_LEGAL = 'info_legal',
    DATA_REGISTRY = 'data_registry',
    PORTFOLIO = 'portfolio',
}

export interface ThrustScore {
    SA: number; // Social
    EA: number; // Environment
    HA: number; // Health
    TA: number; // Technical
    IA: number; // Industrial
}

export interface FarmData {
    id: string;
    name: string;
    region: string;
    country: string;
    primary_crop: string;
    sustainability_score: number;
    thrust_scores: ThrustScore;
    last_audit: string;
    monitored_assets: number;
    active_alerts: number;
    latitude: number;
    longitude: number;
}

export interface Post {
    id: string;
    author: {
        name: string;
        esin: string;
        avatar: string;
        isVerified: boolean;
        cluster: string;
    };
    timestamp: string;
    content: string;
    practice: string;
    likes: number;
    comments: number;
    image?: string;
    isOfficial: boolean;
}

export interface CommunityMember {
    name: string;
    esin: string;
    joinDate: string;
    cluster: string;
    avatarUrl: string;
    isVerified: boolean;
    role: string;
    activeSince: string;
    contributions: number;
    sustainabilityScore: number;
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    currency: string;
    type: 'credit' | 'debit';
    status: 'completed' | 'pending' | 'failed';
}

export interface Episode {
    id: string;
    title: string;
    image: string;
    duration: string;
    date: string;
}

export interface User {
    uid: string;
    email: string | null;
    name: string | null;
    avatar: string | null;
    eacBalance: number;
    esin: string;
    cluster: string;
}
