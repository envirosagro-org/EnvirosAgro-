import { View } from '../../types';
import {
    LayoutGrid, BarChart3, Leaf, BrainCircuit, Users, HeartHandshake, Briefcase, Info, MessageSquare, Mic, 
    BookOpen, Globe, GitBranch, ShieldCheck, Factory, Dna, Anchor, Feather, Settings, Building2, Link
} from 'lucide-react';

export const MENU_SECTIONS = [
    {
        id: 'enviros_core',
        label: 'Enviros Core',
        icon: <Dna size={18} />,
        items: [
            { id: View.HOME, label: 'Home', desc: "The main dashboard for EnvirosAgro", icon: <LayoutGrid size={20} /> },
            { id: View.DASHBOARD, label: 'Dashboard', desc: "Your personal dashboard", icon: <BarChart3 size={20} /> },
            { id: View.AI_ADVISOR, label: 'AI Advisor', desc: "Get advice from our AI", icon: <BrainCircuit size={20} /> },
        ]
    },
    {
        id: 'sustainability',
        label: 'Sustainability',
        icon: <Leaf size={18} />,
        items: [
            { id: View.SUSTAINABILITY_FRAMEWORK, label: 'Framework', desc: "Our sustainability framework", icon: <GitBranch size={20} /> },
            { id: View.CARBON_LEDGER, label: 'Carbon Ledger', desc: "Track your carbon footprint", icon: <Globe size={20} /> },
        ]
    },
    {
        id: 'community',
        label: 'Community',
        icon: <Users size={18} />,
        items: [
            { id: View.COMMUNITY, label: 'Community', desc: "Connect with other farmers", icon: <MessageSquare size={20} /> },
            { id: View.PEOPLE_AND_CULTURE, label: 'People & Culture', desc: "Our people and culture", icon: <HeartHandshake size={20} /> },
        ]
    },
    {
        id: 'business',
        label: 'Business',
        icon: <Briefcase size={18} />,
        items: [
            { id: View.FINANCE, label: 'Finance', desc: "Manage your finances", icon: <Briefcase size={20} /> },
            { id: View.PORTFOLIO, label: 'Portfolio', desc: "Your financial portfolio", icon: <Feather size={20} /> },
            { id: View.PARTNERSHIPS, label: 'Partnerships', desc: "Our partners", icon: <Link size={20} /> },
        ]
    },
    {
        id: 'resources',
        label: 'Resources',
        icon: <BookOpen size={18} />,
        items: [
            { id: View.INFORMATION, label: 'Information', desc: "General information", icon: <Info size={20} /> },
            { id: View.KNOWLEDGE, label: 'Knowledge Hub', desc: "Our knowledge hub", icon: <BookOpen size={20} /> },
            { id: View.DATA_REGISTRY, label: 'Data Registry', desc: "Our data registry", icon: <Factory size={20} /> },
        ]
    },
];

export const getBackTarget = (currentView: View) => {
    switch (currentView) {
        case View.DASHBOARD:
        case View.AI_ADVISOR:
        case View.SUSTAINABILITY_FRAMEWORK:
        case View.CARBON_LEDGER:
        case View.COMMUNITY:
        case View.PEOPLE_AND_CULTURE:
        case View.FINANCE:
        case View.PORTFOLIO:
        case View.PARTNERSHIPS:
        case View.INFORMATION:
        case View.KNOWLEDGE:
        case View.DATA_REGISTRY:
            return { target: View.HOME, label: 'Home' };
        default:
            return { target: View.HOME, label: 'Home' };
    }
};