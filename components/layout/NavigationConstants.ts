
import { View } from '../../types';
import {
    LayoutGrid, BarChart3, HeartHandshake, Briefcase, Info, Home, Building, Factory, 
    BookOpen, Users, Mail, Phone, ShoppingCart, LogIn, Settings, ShieldCheck, TrendingUp, 
    Cloud, Globe, BrainCircuit, Bot, Rss, Mic, Video, Star, Anchor, Atom, Scale, Hand, LandPlot, Sun, Leaf, Sparkles, Sigma, Search
} from 'lucide-react';

export const NAVIGATION_STRUCTURE = [
    { label: 'Home', view: View.HOME, icon: Home },
    {
        label: 'About', view: View.ABOUT, icon: Info,
        subItems: [
            { label: 'Our Mission', view: View.ABOUT, icon: HeartHandshake },
            { label: 'Our Story', view: View.FUTURE_VISION, icon: Sparkles },
            { label: 'Brands', view: View.BRANDS, icon: Building },
            { label: 'Partnerships', view: View.PARTNERSHIPS, icon: Hand },
            { label: 'Media Center', view: View.MEDIA, icon: Rss },
        ],
    },
    {
        label: 'Products', view: View.PRODUCTS, icon: ShoppingCart,
        subItems: [
            { label: 'All Products', view: View.PRODUCTS, icon: ShoppingCart },
            { label: 'Crop Doctor', view: View.CROP_DOCTOR, icon: Leaf },
            { label: 'Smart Farming', view: View.SMART_FARM_VR, icon: Sun },
            { label: 'Safe Harvest', view: View.SAFE_HARVEST, icon: ShieldCheck },
        ],
    },
    {
        label: 'Services', view: View.SERVICES, icon: Briefcase,
        subItems: [
            { label: 'All Services', view: View.SERVICES, icon: Briefcase },
            { label: 'AI Advisor', view: View.AI_ADVISOR, icon: Bot },
            { label: 'AgBiz', view: View.AGBIZ, icon: TrendingUp },
            { label: 'Finance', view: View.FINANCE, icon: Scale },
        ],
    },
    {
        label: 'Community', view: View.COMMUNITY, icon: Users,
        subItems: [
            { label: 'Main Hub', view: View.COMMUNITY, icon: Users },
            { label: 'Heritage Forum', view: View.HERITAGE_FORUM, icon: Anchor },
            { label: 'Scale-Up Summit', view: View.SCALEUP_SUMMIT, icon: Star },
        ],
    },
    {
        label: 'Knowledge', view: View.KNOWLEDGE, icon: BookOpen,
        subItems: [
            { label: 'Knowledge Hub', view: View.KNOWLEDGE, icon: BrainCircuit },
            { label: 'Podcast', view: View.PODCAST, icon: Mic },
            { label: 'Webinars', view: View.WEBINAR, icon: Video },
        ],
    },
];
