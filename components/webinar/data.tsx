import { User, Calendar, Clock, Mic, BarChart, Settings } from 'lucide-react';

export const UPCOMING_WEBINARS = [
    {
        id: 1,
        title: 'Precision Livestock Farming: The Future of Herd Management',
        date: '2024-08-15T14:00:00Z',
        panelists: [
            { name: 'Dr. Ava Chen', title: 'Lead Researcher, AgriTech Institute' },
            { name: 'John Carter', title: 'CEO, Bovine Dynamics' },
            { name: 'Maria Rodriguez', title: 'Rancher & Early Adopter' },
        ],
        description: 'Join our panel of experts as they discuss how IoT sensors, drone surveillance, and AI-powered analytics are revolutionizing livestock health monitoring, breeding, and overall farm efficiency. We’ll explore real-world case studies and the ROI of investing in precision livestock technologies.',
        image: '/images/webinar/precision-livestock.jpg'
    },
    {
        id: 2,
        title: 'Carbon Markets 101: A Guide for Modern Farmers',
        date: '2024-09-05T16:00:00Z',
        panelists: [
            { name: 'Dr. Ben Carter', title: 'Author of “The Soil Economy”' },
            { name: 'Priya Singh', title: 'Head of Carbon Trading, GreenLeaf' },
            { name: 'Tom Haskins', title: '4th Generation Farmer' },
        ],
        description: 'This introductory workshop will demystify carbon credits and markets. Learn how regenerative farming practices can create a new revenue stream for your operation. Our experts will cover soil carbon measurement, verification processes, and how to connect with carbon buyers.',
        image: '/images/webinar/carbon-markets.jpg'
    },
];

export const ARCHIVED_WEBINARS = [
    {
        id: 3,
        title: 'Vertical Farming: Scaling Up in Urban Environments',
        date: '2024-06-20',
        views: 12843,
        rating: 4.8,
        icon: <BarChart />
    },
    {
        id: 4,
        title: 'The Role of AI in Predictive Pest Management',
        date: '2024-05-15',
        views: 9876,
        rating: 4.9,
        icon: <Mic />
    },
    {
        id: 5,
        title: 'Automated Irrigation Systems: A Deep Dive',
        date: '2024-04-10',
        views: 15234,
        rating: 4.7,
        icon: <Settings />
    },
    {
        id: 6,
        title: 'Genetic Editing vs. GMO: Understanding the Science',
        date: '2024-03-05',
        views: 21845,
        rating: 4.9,
        icon: <User />
    },
];