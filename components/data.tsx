import { View } from '../types';
import {
  GlobeAltIcon,
  BoltIcon,
  ScaleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Droplets, Wind, Sprout, Cat } from 'lucide-react';

export const customerData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-5678',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    phone: '555-9012',
    status: 'Inactive',
  },
];

export const DATASETS = [
  {
    id: 'ds-001',
    name: 'Global Soil Moisture Data',
    domain: 'Agriculture',
    region: 'Global',
    type: 'Soil Science',
    thrust: 'SA',
    version: '1.0',
    category: 'Environment'
  },
  {
    id: 'ds-002',
    name: 'Crop Yield Predictions',
    domain: 'Agriculture',
    region: 'USA',
    type: 'Agronomy',
    thrust: 'SA',
    version: '1.2',
    category: 'Crops'
  },
  {
    id: 'ds-003',
    name: 'Historical Weather Data',
    domain: 'Climate',
    region: 'Global',
    type: 'Meteorology',
    thrust: 'R',
    version: '2.5',
    category: 'Environment'
  }
];

export const services = [
  {
    name: 'Impact Dashboard',
    description: 'Visualize your environmental and social impact.',
    icon: GlobeAltIcon,
    view: View.IMPACT_DASHBOARD,
  },
  {
    name: 'Crop Doctor',
    description: 'Diagnose crop diseases and get treatment advice.',
    icon: BoltIcon,
    view: View.CROP_DOCTOR,
  },
  {
    name: 'Sustainability Calculator',
    description: 'Measure and improve your farm\'s sustainability.',
    icon: ScaleIcon,
    view: View.SUSTAINABILITY_CALCULATOR,
  },
  {
    name: 'Safe Harvest',
    description: 'Ensure food safety and compliance with standards.',
    icon: CheckCircleIcon,
    view: View.SAFE_HARVEST,
  },
];

export const thrusts = [
  {
    name: 'Resilience',
    description: 'Building a resilient food system for a changing world.',
    view: View.RESILIENCE,
  },
  {
    name: 'Information',
    description: 'Unlocking the power of data for a better food future.',
    view: View.INFORMATION,
  },
  {
    name: 'Professional',
    description: 'Empowering the next generation of agricultural leaders.',
    view: View.PROFESSIONAL,
  },
];

export const THRUSTS = [
    {
        id: 'SA',
        title: 'Systems Analysis',
        icon: <Droplets />,
        color: 'text-blue-500',
        description: 'Analyzing the interconnectedness of food, water, and energy systems.',
        domains: ['Interdisciplinary Research', 'Policy Analysis', 'Economic Modeling']
    },
    {
        id: 'R',
        title: 'Resilience',
        icon: <Wind />,
        color: 'text-green-500',
        description: 'Building a resilient food system for a changing world.',
        domains: ['Climate Adaptation', 'Supply Chain Optimization', 'Disaster Preparedness']
    },
    {
        id: 'I',
        title: 'Information',
        icon: <Sprout />,
        color: 'text-yellow-500',
        description: 'Unlocking the power of data for a better food future.',
        domains: ['Data Science', 'Precision Agriculture', 'Knowledge Sharing']
    },
    {
        id: 'P',
        title: 'Professional',
        icon: <Cat />,
        color: 'text-purple-500',
        description: 'Empowering the next generation of agricultural leaders.',
        domains: ['Education & Training', 'Capacity Building', 'Community Engagement']
    },
];

export const RESOURCE_TYPES = ['All', 'Environment', 'Crops', 'Animals', 'Water'];