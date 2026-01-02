import { Product } from '../../types';
import { GraduationCap, Users, Leaf, ShieldPlus, Cpu, Factory } from 'lucide-react';

export const THRUST_FILTERS = [
  { id: 'ALL', title: 'All Assets', icon: null },
  { id: 'MC', title: 'Masterclasses', icon: <GraduationCap size={16} />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'SA', title: 'Social', icon: <Users size={16} />, color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { id: 'EA', title: 'Environmental', icon: <Leaf size={16} />, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'HA', title: 'Health', icon: <ShieldPlus size={16} />, color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'TA', title: 'Technical', icon: <Cpu size={16} />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'IA', title: 'Industrial', icon: <Factory size={16} />, color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Heirloom Seed Starter Kit',
    description: 'A collection of indigenous, drought-resistant seeds verified by the SA Thrust for community resilience. Perfect for establishing high-yield community gardens.',
    price: '$24.99',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592150621124-3c47ad43c316?w=400&auto=format&fit=crop&q=60',
    thrust: 'SA',
    category: 'Seeds',
    type: 'PHYSICAL',
    features: ['Non-GMO', 'Indigenous Species', 'Climate-Resilient', 'High Germination Rate']
  },
  {
    id: 'p2',
    name: 'Bio-Active Compost Tea',
    description: 'Rich microbial inoculant designed to restore soil health and boost the EA resilience coefficient. Formulated for rapid nutrient cycling.',
    price: '$35.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&auto=format&fit=crop&q=60',
    thrust: 'EA',
    category: 'Soil',
    type: 'PHYSICAL',
    features: ['High Microbial Density', 'Organic Certified', 'Restores Soil Micro-biome', 'Carbon Sequestration Support']
  },
  {
    id: 'p5',
    name: 'AI Pest Detection Drone (Precision-X)',
    description: 'Advanced drone technology enabling a paradigm shift in crop protection. Moves from broad-spectrum pesticides to precision interventions using multispectral and hyperspectral sensors.',
    price: '$2,450.00',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&auto=format&fit=crop&q=60',
    thrust: 'TA',
    category: 'Robotics',
    type: 'PHYSICAL',
    features: ['90% Pesticide Reduction', '5-10% Yield Increase', 'Multispectral Sensors', 'Real-time AI Diagnosis'],
    impact: 'Up to 90% reduction in chemical usage through targeted micro-dosing.'
  },
  {
    id: 'mc4',
    name: 'Carbon Credit Masterclass',
    description: 'A practical guide for agricultural producers on how to monetize regenerative farming practices like no-till, cover cropping, and rotational grazing.',
    price: '$199.00',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&auto=format&fit=crop&q=60',
    thrust: 'MC',
    category: 'Finance',
    type: 'DIGITAL',
    duration: '8 Hours',
    instructor: 'Priya Sharma, CFA',
    features: ['MRV Protocol Training', 'Verra & Gold Standard Insights', 'Soil Sampling Methods', 'Monetization Roadmap'],
    impact: 'Unlock new revenue streams while improving long-term farm resilience.'
  },
  {
    id: 'p4',
    name: 'Solar-Powered IoT Soil Sensor',
    description: 'Precision TA hardware for real-time monitoring of moisture, NPK, and pH levels. Mesh network compatible for large-scale deployments.',
    price: '$120.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&auto=format&fit=crop&q=60',
    thrust: 'TA',
    category: 'Tech',
    type: 'PHYSICAL',
    features: ['Solar Charged', 'Real-time Cloud Sync', 'Precision NPK Analysis', 'IP68 Waterproof']
  },
  {
    id: 'p6',
    name: 'Modular Vertical Farm Unit',
    description: 'Scalable LED-powered vertical farming module for urban food production. Optimized for high-density leafy greens and herbs.',
    price: '$5,900.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&auto=format&fit=crop&q=60',
    thrust: 'IA',
    category: 'Infrastructure',
    type: 'PHYSICAL',
    features: ['Automated Fertigation', 'Smart LED Spectrum Control', 'Space-Efficient', 'Year-round Production']
  },
  {
    id: 'mc1',
    name: 'SI-D Diagnostic Masterclass',
    description: 'Deep dive into diagnosing Social Influenza Disease in post-conflict clusters. Learn to identify and mitigate social vulnerabilities in agricultural communities.',
    price: '$99.00',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60',
    thrust: 'MC',
    category: 'Learning',
    type: 'DIGITAL',
    duration: '12 Hours',
    instructor: 'Dr. Elena Rossi',
    features: ['Case Studies', 'Interactive Diagnostics', 'Community Resiliency Tools', 'Certification']
  },
];