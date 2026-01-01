import { Award } from 'lucide-react';

export const WORKERS_CLOUD = [
  {
    id: 1,
    name: "Dr. Elena Rossi",
    role: "Senior Agronomist",
    type: "Researcher",
    location: "Nairobi, Kenya",
    available: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
    skills: ["Soil Chemistry", "Crop Genetics", "IPM"],
    esin: "EA-RES-2024-8842"
  },
  {
    id: 2,
    name: "Samuel Kweli",
    role: "Precision Ag Operator",
    type: "Technical Specialist",
    location: "Kampala, Uganda",
    available: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    skills: ["Drone Piloting", "IoT Systems", "GIS Mapping"],
    esin: "EA-TEC-2024-9102"
  }
];

export const VALUE_CHAIN_LINKS = [
  { id: 'registry', label: 'Cloud Registry', status: 'ACTIVE', desc: 'Verified professional identity node.' },
  { id: 'telemetry', label: 'Field Telemetry', status: 'LINKED', desc: 'Direct input to Farm Scout networks.' },
  { id: 'supply', label: 'Supply Audit', status: 'AUTHORIZED', desc: 'Verify batches for industrial maturity.' },
  { id: 'capital', label: 'Capital Exchange', status: 'ELIGIBLE', desc: 'Access Tokenz™ micro-grant tiers.' }
];

export const PROFESSIONAL_LEDGER = [
  { id: 'TX-884', type: 'BATCH_VERIFY', asset: 'Kiriaini Arabica Lot #4', date: '2h ago', points: '+15 XP' },
  { id: 'TX-901', type: 'DATA_CONTRIBUTE', asset: 'Q2 Soil Integrity Log', date: '5h ago', points: '+25 XP' },
  { id: 'TX-772', type: 'SECURITY_AUDIT', asset: 'Zone A-4 Node Sync', date: 'Yesterday', points: '+10 XP' }
];

export const JOBS_LIST = [
  {
    id: 1,
    title: "Regional Sustainability Lead",
    org: "GreenEarth Co-op",
    location: "Kiriaini, Kenya",
    type: "Full-Time",
    salary: "$2,500 - $3,500",
    posted: "2 days ago",
    description: "Seeking a visionary leader to oversee the implementation of the EA thrust across 500 smallholder farms."
  }
];

export const CAREER_PATHWAYS = [
  {
    id: 1,
    title: "Certified Sustainable Agronomist (CSA)",
    provider: "EnvirosAgro Academy",
    duration: "6 Months",
    level: "Advanced",
    icon: <Award size={32} className="text-amber-600" />,
    color: "bg-amber-50 border-amber-100",
    desc: "Master the principles of the Five Thrusts and soil regeneration techniques."
  }
];
