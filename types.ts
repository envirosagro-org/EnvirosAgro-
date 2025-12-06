
import React from 'react';

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
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
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
  esin?: string; // EnvirosAgro Social ID
  bio?: string;
  avatar?: string;
  joinedDate?: string;
}
