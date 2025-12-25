import React from 'react';
import { View } from '../../types';
import {
  BrainCircuit, Sparkles, BookOpen, Microscope, Calculator,
  Network, Database as DbIcon, Layers, Box, Grid3X3,
  MonitorPlay, Globe, Video, Mic, Users, Wallet,
  TrendingUp, Cloud, Mail, ShieldCheck, AlertOctagon, Settings,
  Server, Radio
} from 'lucide-react';

export const MENU_SECTIONS = [
  {
    id: 'INTELLIGENCE',
    label: 'Intelligence & Research',
    icon: <Sparkles size={16} className="text-purple-600" />,
    items: [
      { id: View.AI_ADVISOR, label: 'Strategic AI', icon: <BrainCircuit size={18}/>, desc: 'Consulting core' },
      { id: View.FUTURE_VISION, label: 'Future Vision Lab', icon: <Sparkles size={18}/>, desc: 'AI visual projection' },
      { id: View.KNOWLEDGE, label: 'Knowledge Hub', icon: <BookOpen size={18}/>, desc: 'Research academy' },
      { id: View.CROP_DOCTOR, label: 'Crop Diagnostic', icon: <Microscope size={18}/>, desc: 'Instant health analysis' },
      { id: View.SUSTAINABILITY_CALCULATOR, label: 'm(t) Simulator', icon: <Calculator size={18}/>, desc: 'Equation-based modeling' }
    ]
  },
  {
    id: 'INFRASTRUCTURE',
    label: 'Infrastructure & Assets',
    icon: <Server size={16} className="text-blue-600" />,
    items: [
      { id: View.NETWORK_INPUT_HUB, label: 'Network Input Hub', icon: <Network size={18}/>, desc: 'ERP, VMI & Cloud ingest' },
      { id: View.DATABASE, label: 'Data Registry', icon: <DbIcon size={18}/>, desc: 'Global intelligence node' },
      { id: View.CARBON_LEDGER, label: 'Carbon Engine', icon: <Layers size={18}/>, desc: 'Sequestration ledger' },
      { id: View.SUPPLY, label: 'Supply Network', icon: <Box size={18}/>, desc: 'Green logistics chain' },
      { id: View.FARM_SCOUT, label: 'Field Telemetry', icon: <Grid3X3 size={18}/>, desc: 'Real-time sensor grid' }
    ]
  },
  {
    id: 'BROADCAST',
    label: 'Broadcast & Culture',
    icon: <Radio size={16} className="text-red-500" />,
    items: [
      { id: View.MEDIA, label: 'Media Hub', icon: <MonitorPlay size={18}/>, desc: 'Network newsroom' },
      { id: View.PLANET_WATCH, label: 'Planet Watch', icon: <Globe size={18}/>, desc: 'Daily climate reports' },
      { id: View.GREEN_LENS, label: 'Impact Cinema', icon: <Video size={18}/>, desc: 'Cinematic documentaries' },
      { id: View.PODCAST, label: 'AgroCulture', icon: <Mic size={18}/>, desc: 'Indigenous oral records' }
    ]
  },
  {
    id: 'ECOSYSTEM',
    label: 'Ecosystem & Finance',
    icon: <Users size={16} className="text-rose-600" />,
    items: [
      { id: View.COMMUNITY, label: 'Member Hubs', icon: <Users size={18}/>, desc: 'Social ID & Co-ops' },
      { id: View.FINANCE, label: 'Capital Exchange', icon: <Wallet size={18}/>, desc: 'Tokenz™ & liquidity' },
      { id: View.INVESTOR_PORTAL, label: 'Investor Node', icon: <TrendingUp size={18}/>, desc: 'Impact deployments' },
      { id: View.BRANDS, label: 'Portfolio', icon: <Box size={18}/>, desc: 'Brand family experience' }
    ]
  },
  {
    id: 'PROFESSIONAL',
    label: 'Operations Center',
    icon: <Settings size={16} className="text-slate-600" />,
    items: [
      { id: View.PEOPLE_AND_CULTURE_CLOUD, label: 'People & Culture', icon: <Cloud size={18}/>, desc: 'Professional registry' },
      { id: View.TRANSMISSION_GATEWAY, label: 'Transmission Gateway', icon: <Mail size={18}/>, desc: 'Direct secure uplink' },
      { id: View.INTRANET_DASHBOARD, label: 'Internal Intranet', icon: <ShieldCheck size={18}/>, desc: 'Organizational control' },
      { id: View.SIX_SIGMA_RCA, label: 'Quality Audit (RCA)', icon: <AlertOctagon size={18}/>, desc: 'Zero-defect methodology' }
    ]
  }
];

export const getBackTarget = (view: View): { target: View; label: string } => {
  const mediaViews = [
      View.PODCAST, View.HERITAGE_FORUM, View.WEBINAR, View.SMART_FARM_VR, 
      View.PLANET_WATCH, View.GREEN_LENS, View.SAFE_HARVEST, View.NUTRILIFE, 
      View.AGBIZ_WEEKLY, View.SCALEUP_SUMMIT, View.LIVE_HOST
  ];
  if (mediaViews.includes(view)) return { target: View.MEDIA, label: 'Media Hub' };
  
  const techViews = [View.AI_ADVISOR, View.ROADMAP_AI, View.CROP_DOCTOR, View.SUSTAINABILITY_CALCULATOR, View.KNOWLEDGE];
  if (techViews.includes(view)) return { target: View.DASHBOARD, label: 'Dashboard' };
  
  const infraViews = [View.DATABASE, View.SUPPLY_CHAIN_AUDIT, View.NETWORK_INPUT_HUB, View.TRANSMISSION_GATEWAY, View.SUPPLY];
  if (infraViews.includes(view)) return { target: View.SUSTAINABILITY_FRAMEWORK, label: 'Framework' };

  if (view === View.SIX_SIGMA_RCA) return { target: View.INTRANET_DASHBOARD, label: 'Intranet' };
  if (view === View.COMMUNITY_GUIDELINES) return { target: View.COMMUNITY, label: 'Community' };
  if (view === View.PROFILE) return { target: View.HOME, label: 'Home' };
  if (view === View.FUTURE_VISION) return { target: View.DASHBOARD, label: 'Dashboard' };
  if (view === View.CARBON_LEDGER) return { target: View.FINANCE, label: 'Finance' };
  if (view === View.INVESTOR_PORTAL) return { target: View.FINANCE, label: 'Finance' };
  
  return { target: View.HOME, label: 'Home' };
};
