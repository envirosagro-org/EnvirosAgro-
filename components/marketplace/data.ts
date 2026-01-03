import { Atom, Leaf, Hand, BrainCircuit, HeartHandshake, ShieldCheck } from 'lucide-react';

export const THRUST_FILTERS = [
    { id: 'ALL', title: 'All Thrusts', icon: <Atom size={16} />, color: 'bg-gray-600' },
    { id: 'SA', title: 'Social Agriculture', icon: <Hand size={16} />, color: 'bg-rose-600' },
    { id: 'EA', title: 'Environmental Agriculture', icon: <Leaf size={16} />, color: 'bg-green-600' },
    { id: 'TA', title: 'Technological Agriculture', icon: <BrainCircuit size={16} />, color: 'bg-blue-600' },
];

export const PRODUCTS = [
    {
        id: '1',
        name: 'Automated Drone Swarm',
        description: 'A fleet of 5 autonomous drones for crop monitoring and spraying. Comes with a central control unit and AI-powered data analysis.',
        price: '$12,500',
        rating: 4.9,
        image: '/images/products/drones.jpg',
        thrust: 'TA',
        category: 'Hardware',
        type: 'PHYSICAL',
        features: ['Autonomous operation', 'High-resolution imaging', 'AI-powered data analysis'],
        impact: 'Reduces pesticide usage by up to 40%',
    },
    {
        id: '2',
        name: 'Regenerative Agriculture Masterclass',
        description: 'A 12-week online course covering the principles and practices of regenerative agriculture, taught by leading experts.',
        price: '$499',
        rating: 4.8,
        image: '/images/products/masterclass.jpg',
        thrust: 'EA',
        category: 'Education',
        type: 'DIGITAL',
        duration: '12 weeks',
        instructor: 'Dr. Alisha Gupta',
    },
    {
        id: '3',
        name: 'Community Composting Starter Kit',
        description: 'Everything you need to start a successful community composting program, including bins, tools, and educational materials.',
        price: '$1,200',
        rating: 4.7,
        image: '/images/products/compost.jpg',
        thrust: 'SA',
        category: 'Community',
        type: 'PHYSICAL',
    },
];