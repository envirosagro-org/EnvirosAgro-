noimport React from 'react';

export enum View {
  HOME = 'HOME',
  INFORMATION = 'INFORMATION',
  PRODUCTS = 'PRODUCTS',
  SERVICES = 'SERVICES',
  DATABASE = 'DATABASE',
  HUMAN_RESOURCE = 'HUMAN_RESOURCE',
  DASHBOARD = 'DASHBOARD',
  KNOWLEDGE = 'KNOWLEDGE',
  AI_ADVISOR = 'AI_ADVISOR',
  ROADMAP_AI = 'ROADMAP_AI',
  CROP_DOCTOR = 'CROP_DOCTOR',
  SUSTAINABILITY_CALCULATOR = 'SUSTAINABILITY_CALCULATOR',
  FARM_SCOUT = 'FARM_SCOUT',
  CARBON_LEDGER = 'CARBON_LEDGER',
  SIGN_UP = 'SIGN_UP',
  PROFILE = 'PROFILE',
  SUSTAINABILITY_FRAMEWORK = 'SUSTAINABILITY_FRAMEWORK',
  BRANDS = 'BRANDS',
  TRADEMARKS = 'TRADEMARKS',
  MEDIA = 'MEDIA',
  SUPPLY = 'SUPPLY',
  CUSTOMER = 'CUSTOMER',
  PARTNERSHIPS = 'PARTNERSHIPS',
  FINANCE = 'FINANCE',
  COMMUNITY = 'COMMUNITY',
  PODCAST = 'PODCAST',
  HERITAGE_FORUM = 'HERITAGE_FORUM',
  WEBINAR = 'WEBINAR',
  SMART_FARM_VR = 'SMART_FARM_VR',
  PLANET_WATCH = 'PLANET_WATCH',
  GREEN_LENS = 'GREEN_LENS',
  SAFE_HARVEST = 'SAFE_HARVEST',
  NUTRILIFE = 'NUTRILIFE',
  AGBIZ_WEEKLY = 'AGBIZ_WEEKLY',
  INVESTOR_PORTAL = 'INVESTOR_PORTAL',
  SCALEUP_SUMMIT = 'SCALEUP_SUMMIT',
  LIVE_HOST = 'LIVE_HOST',
  INTRANET_DASHBOARD = 'INTRANET_DASHBOARD',
  EXTRANET_DASHBOARD = 'EXTRANET_DASHBOARD',
  COMMUNITY_GUIDELINES = 'COMMUNITY_GUIDELINES',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  SUPPLY_CHAIN_AUDIT = 'SUPPLY_CHAIN_AUDIT',
  NETWORK_INPUT_HUB = 'NETWORK_INPUT_HUB',
  AGRO_WORKERS_CLOUD = 'AGRO_WORKERS_CLOUD',
  TRANSMISSION_GATEWAY = 'TRANSMISSION_GATEWAY',
  FUTURE_VISION = 'FUTURE_VISION',
  SIX_SIGMA_RCA = 'SIX_SIGMA_RCA'
}

export interface NavItem {
  id: View;
  label: string;
  icon: React.ReactNode;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: 'Research' | 'Practice' | 'Technology';
  fullContent?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface User {
  name: string;
  email: string;
  role: 'Farmer' | 'Researcher' | 'Stakeholder' | 'Other';
  location?: string;
  esin?: string;
  bio?: string;
  avatar?: string;
  joinedDate?: string;
  eacBalance?: number;
}