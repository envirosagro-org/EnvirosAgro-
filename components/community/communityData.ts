import { TrendingUp, Users, MessageSquare } from 'lucide-react';

export const TOPICS = [
    {
        id: 'T001',
        title: 'What are your go-to methods for soil moisture testing?',
        category: 'Precision Agriculture',
        author: {
            name: 'Dr. Eleanor Vance',
            avatar: '/images/avatars/eleanor-vance.jpg'
        },
        stats: {
            replies: 42,
            views: 1800,
            participants: 15
        },
        lastActivity: '3 hours ago',
        isTrending: true,
        tags: ['soil', 'moisture', 'testing', 'sensors'],
        participants: [
            { name: 'Sam Wilson', avatar: '/images/avatars/sam-wilson.jpg' },
            { name: 'Jane Doe', avatar: '/images/avatars/jane-doe.jpg' },
            { name: 'Peter Jones', avatar: '/images/avatars/peter-jones.jpg' },
        ]
    },
    {
        id: 'T002',
        title: 'Best crop choices for vertical farming setups?',
        category: 'Urban Farming',
        author: {
            name: 'Marco Diaz',
            avatar: '/images/avatars/marco-diaz.jpg'
        },
        stats: {
            replies: 28,
            views: 1200,
            participants: 10
        },
        lastActivity: '1 day ago',
        isTrending: false,
        tags: ['vertical-farming', 'hydroponics', 'crop-selection'],
        participants: [
            { name: 'Emily Carter', avatar: '/images/avatars/emily-carter.jpg' },
            { name: 'Chris Lee', avatar: '/images/avatars/chris-lee.jpg' },
        ]
    },
    {
        id: 'T003',
        title: 'The ROI of drone-based pesticide spraying: A case study',
        category: 'Agri-Tech',
        author: {
            name: 'Chen Liang',
            avatar: '/images/avatars/chen-liang.jpg'
        },
        stats: {
            replies: 65,
            views: 3200,
            participants: 25
        },
        lastActivity: '5 hours ago',
        isTrending: true,
        tags: ['drones', 'agri-tech', 'roi', 'case-study'],
        participants: [
            { name: 'Dr. Alan Grant', avatar: '/images/avatars/alan-grant.jpg' },
            { name: 'Sarah Jenkins', avatar: '/images/avatars/sarah-jenkins.jpg' },
            { name: 'Tom Howard', avatar: '/images/avatars/tom-howard.jpg' },
        ]
    },
    {
        id: 'T004',
        title: 'Organic vs. Synthetic Fertilizers: A Heated Debate',
        category: 'Sustainable Practices',
        author: {
            name: 'Sarah Jenkins',
            avatar: '/images/avatars/sarah-jenkins.jpg'
        },
        stats: {
            replies: 112,
            views: 5600,
            participants: 48
        },
        lastActivity: '2 days ago',
        isTrending: false,
        tags: ['organic', 'fertilizers', 'sustainability'],
        participants: [
            { name: 'Dr. Eleanor Vance', avatar: '/images/avatars/eleanor-vance.jpg' },
            { name: 'Marco Diaz', avatar: '/images/avatars/marco-diaz.jpg' },
        ]
    },
    {
        id: 'T005',
        title: 'DIY automated irrigation systems for small-scale farms',
        category: 'DIY & Innovation',
        author: {
            name: 'Tom Howard',
            avatar: '/images/avatars/tom-howard.jpg'
        },
        stats: {
            replies: 76,
            views: 4100,
            participants: 32
        },
        lastActivity: '8 hours ago',
        isTrending: true,
        tags: ['diy', 'automation', 'irrigation'],
        participants: [
             { name: 'Chen Liang', avatar: '/images/avatars/chen-liang.jpg' },
        ]
    },
];

export const SORT_OPTIONS = [
    { id: 'latest', label: 'Latest Activity' },
    { id: 'trending', label: 'Trending' },
    { id: 'popular', label: 'Popular' },
    { id: 'newest', label: 'Newest' },
];

export const CATEGORIES = [
    { id: 'all', label: 'All Categories' },
    { id: 'precision-agriculture', label: 'Precision Agriculture' },
    { id: 'urban-farming', label: 'Urban Farming' },
    { id: 'agri-tech', label: 'Agri-Tech' },
    { id: 'sustainable-practices', label: 'Sustainable Practices' },
    { id: 'diy-innovation', label: 'DIY & Innovation' },
];

export const FEATURED_MEMBERS = [
    {
        id: 1,
        name: "Dr. Eleanor Vance",
        title: "Soil Scientist",
        avatar: "/images/avatars/eleanor-vance.jpg",
        contributions: 134,
        specialty: "Soil Health",
    },
    {
        id: 2,
        name: "Chen Liang",
        title: "Agri-Tech Entrepreneur",
        avatar: "/images/avatars/chen-liang.jpg",
        contributions: 98,
        specialty: "Drones & AI",
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        title: "Organic Farmer",
        avatar: "/images/avatars/sarah-jenkins.jpg",
        contributions: 210,
        specialty: "Sustainable Farming",
    },
    {
        id: 4,
        name: "Marco Diaz",
        title: "Vertical Farming Specialist",
        avatar: "/images/avatars/marco-diaz.jpg",
        contributions: 75,
        specialty: "Urban Agriculture",
    },
];