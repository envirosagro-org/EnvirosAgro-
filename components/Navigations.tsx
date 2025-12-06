import { View } from '../types';
import { 
    Sprout, LayoutDashboard, BookOpen, MessageSquareText, Info, ShoppingBag, 
    Database as DbIcon, Users, Scale, Tag, FileText, Award, Layers, MonitorPlay, 
    Truck, HeartHandshake, Handshake, Wallet
} from 'lucide-react';

export const NAV_ITEMS = {
    main: [
        {
            label: "Home",
            view: View.HOME,
            icon: null,
            isDropdown: false,
        },
        {
            label: "About",
            isDropdown: true,
            dropdownItems: [
                { label: "Information", view: View.INFORMATION, icon: Info },
                { label: "Our Framework", view: View.SUSTAINABILITY_FRAMEWORK, icon: Scale },
                { label: "Knowledge Hub", view: View.KNOWLEDGE, icon: BookOpen },
            ]
        },
        {
            label: "Platform",
            isDropdown: true,
            dropdownItems: [
                { label: "Media", view: View.MEDIA, icon: MonitorPlay },
                { label: "Supply", view: View.SUPPLY, icon: Truck },
                { label: "Customer", view: View.CUSTOMER, icon: HeartHandshake },
                { label: "Partnerships", view: View.PARTNERSHIPS, icon: Handshake },
                { label: "Finance", view: View.FINANCE, icon: Wallet },
            ]
        },
        {
            label: "Solutions",
            isDropdown: true,
            dropdownItems: [
                { label: "Products", view: View.PRODUCTS, icon: ShoppingBag },
                { label: "Services", view: View.SERVICES, icon: Sprout },
                { isDivider: true },
                { label: "Brands", view: View.BRANDS, icon: Award },
                { label: "Trademarks", view: View.TRADEMARKS, icon: FileText },
            ]
        },
        {
            label: "Network",
            isDropdown: true,
            dropdownItems: [
                { label: "Community & ID", view: View.COMMUNITY, icon: Users },
                { label: "Data Base", view: View.DATABASE, icon: DbIcon },
                { label: "Human Resources", view: View.HUMAN_RESOURCE, icon: Users },
                { label: "Impact Dashboard", view: View.DASHBOARD, icon: LayoutDashboard },
            ]
        },
        {
            label: "AI Advisor",
            view: View.AI_ADVISOR,
            icon: MessageSquareText,
            isDropdown: false,
        }
    ],
    mobile: [
        { section: "About", items: [
            { label: "Information", view: View.INFORMATION, icon: Info },
            { label: "Our Framework", view: View.SUSTAINABILITY_FRAMEWORK, icon: Scale },
            { label: "Knowledge Hub", view: View.KNOWLEDGE, icon: BookOpen },
        ]},
        { section: "Platform", items: [
            { label: "Media", view: View.MEDIA, icon: MonitorPlay },
            { label: "Supply", view: View.SUPPLY, icon: Truck },
            { label: "Customer", view: View.CUSTOMER, icon: HeartHandshake },
            { label: "Partnerships", view: View.PARTNERSHIPS, icon: Handshake },
            { label: "Finance", view: View.FINANCE, icon: Wallet },
        ]},
        { section: "Solutions", items: [
            { label: "Products", view: View.PRODUCTS, icon: ShoppingBag },
            { label: "Services", view: View.SERVICES, icon: Sprout },
            { label: "Brands", view: View.BRANDS, icon: Award },
            { label: "Trademarks", view: View.TRADEMARKS, icon: FileText },
        ]},
        { section: "Network", items: [
            { label: "Community & ID", view: View.COMMUNITY, icon: Users },
            { label: "Data Base", view: View.DATABASE, icon: DbIcon },
            { label: "Human Resources", view: View.HUMAN_RESOURCE, icon: Users },
            { label: "Dashboard", view: View.DASHBOARD, icon: LayoutDashboard },
        ]}
    ]
};