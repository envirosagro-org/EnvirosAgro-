import React from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, Database as DbIcon, Sprout, Cat, Droplets, Wind } from 'lucide-react';

// EnvirosAgro Five Thrusts Framework Data
export const THRUSTS = [
  {
    id: 'SA',
    title: 'Social Agriculture',
    icon: <Users size={20} />,
    color: 'bg-rose-100 text-rose-700',
    borderColor: 'border-rose-200',
    description: 'The foundation of Sustainable Integrated Development. It studies natural societies and their interactions with resources, specifically addressing social risks like Social Influenza Disease (SI-D).',
    domains: [
      'Historical Agriculture: Evolution of civilizations & nature',
      'Geographical Agriculture: Human-resource relationships across locations',
      'Civic & Governmental: Rights, responsibilities, & governance',
      'Economic Agriculture: Production, distribution, & consumption',
      'Sociological & Anthropological: Cultural practices & social interactions',
      'Philosophy & Education: Fundamental questions & learning systems',
      'Information Domains: Weather, Tech, Finance, Govt, Society, Economy, Environment, Health'
    ]
  },
  {
    id: 'EA',
    title: 'Environmental Agriculture',
    icon: <Leaf size={20} />,
    color: 'bg-green-100 text-green-700',
    borderColor: 'border-green-200',
    description: 'A proactive strategy within our Integrated Development model that applies Social Agriculture principles to enhance and regenerate natural resources.',
    domains: [
      'Human Impact: Mitigating adverse consequences of industrialization',
      'Sustainable Solutions: Interdisciplinary approaches to climate change',
      'Societal Context: Social, economic, & political lenses',
      'Agri-Environmental Management: Tech & policy for sustainable development',
      'Biodiversity & Conservation: Preserving ecosystems and species',
      'Soil Health & Regeneration: Management of soil vitality',
      'Water Conservation: Harvesting and efficient use'
    ]
  },
  {
    id: 'HA',
    title: 'Health Agriculture',
    icon: <ShieldPlus size={20} />,
    color: 'bg-red-100 text-red-700',
    borderColor: 'border-red-200',
    description: 'The progressive integration of environmental practices to enhance the holistic wellbeing of natural resources, communities, and the global body politic.',
    domains: [
      'General Ag Health: Disease prevention & emergency response',
      'Biological Sciences: Anatomy & biochemistry of ag health',
      'Health Policy: Resource allocation & healthcare delivery',
      'Epidemiology: Disease distribution & control strategies',
      'Environmental Health: Impact of air, water, & hazards',
      'Informatics: Data analytics for health monitoring',
      'Nutrition & Botany: Medicinal and nutritional value of plants'
    ]
  },
  {
    id: 'TA',
    title: 'Technical Agriculture',
    icon: <Cpu size={20} />,
    color: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-200',
    description: 'The application of innovative methodologies and precision tools to achieve the efficiency required for large-scale Sustainable Integrated Development.',
    domains: [
      'Ag Information Technology (IT): Cybersecurity & data analytics',
      'AI-Powered Agricultural Diagnostics: AI for pest/disease ID, soil analysis, & yield prediction',
      'Engineering & Industrial Tech: Automation & infrastructure',
      'Ag Healthcare: Medical assisting for ag workers',
      'Skilled Trades: Electricians, plumbers, & mechanics',
      'Design & Media: Graphic design & digital content',
      'Ag Resources: Agribusiness & forestry expertise',
      'Management Protocols: Integrated Weed Management (IWM) etc.'
    ]
  },
  {
    id: 'IA',
    title: 'Industrial Agriculture',
    icon: <Factory size={20} />,
    color: 'bg-slate-100 text-slate-700',
    borderColor: 'border-slate-200',
    description: 'The final scale-up phase of our development model, responsibly managing resources through manufacturing, processing, and value-chain optimization.',
    domains: [
      'Industrial Sector: Manufacturing & infrastructure',
      'Industrial Engineering: Process optimization & efficiency',
      'Industrial Design: Aesthetics & functionality of products',
      'Industrial Revolution: History of technological progress',
      'Industrial Waste: Responsible waste management',
      'Value Chain Development: Processing and market scaling'
    ]
  }
];

export const RESOURCE_TYPES = [
    { id: 'All', label: 'All Resources', icon: null },
    { id: 'Plants', label: 'Plants', icon: <Sprout size={16} /> },
    { id: 'Animals', label: 'Animals', icon: <Cat size={16} /> },
    { id: 'Water', label: 'Water', icon: <Droplets size={16} /> },
    { id: 'Soil', label: 'Soil', icon: <DbIcon size={16} /> },
    { id: 'Air', label: 'Air', icon: <Wind size={16} /> },
    { id: 'Finance', label: 'Finance', icon: <Factory size={16} /> }
];

const FILE_FORMATS = ['PDF Report', 'TXT Log', 'DOCX Protocol', 'XLSX Telemetry', 'JSON Dataset'];

export const DATASETS = [
  // --- CORE SYSTEM DATASETS (Integrated from all specialized units) ---
  
  // 1. SOCIAL AGRICULTURE (SA) & COMMUNITY HERITAGE - 30 Entries
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: `SA-2024-${String(i+1).padStart(3, '0')}`,
    version: '2.4.2',
    name: [
      'Indigenous Seed Saving Protocol',
      'Rain Ritual Timing vs NDVI Correlation',
      'Communal Trust Index: Cluster Alpha',
      'Historical Land Use: Murang\'a 1950-2020',
      'Ubuntu Framework: Social Resilience Score',
      'SI-D Regional Diagnostic: Central Cluster',
      'Traditional Pest Management Archive',
      'Mugumo Tree: Hydrological Proxy Study',
      'Gender Parity in Cooperative Governance',
      'Youth Tech-Adoption Demographic Log'
    ][i % 10] + (i > 9 ? ` (Batch ${Math.floor(i/10)})` : ''),
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: i % 2 === 0 ? 'Finance' : 'Plants',
    region: ['Central Highlands', 'Rift Valley', 'Coastal Cluster', 'Western Delta'][i % 4],
    type: FILE_FORMATS[i % FILE_FORMATS.length],
    size: `${(Math.random() * 8 + 1).toFixed(1)} MB`,
    date: `May ${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}, 2024`,
    access: 'Public',
    content: `# Heritage Intelligence Dossier\nAnalyzing the impact of ancestral wisdom on modern $m(t)$ scores. \n\n## Findings\n- Traditional mulching techniques correlate with a 15% higher soil moisture (In) retention during droughts.\n- Social Connectivity (Sc) is a primary prerequisite for large-scale TA Thrust adoption.`
  })),

  // 2. ENVIRONMENTAL AGRICULTURE (EA) & NATURAL ASSETS - 40 Entries
  ...Array.from({ length: 40 }).map((_, i) => ({
    id: `EA-2024-${String(i+1).padStart(3, '0')}`,
    version: '4.2.2',
    name: [
      'Soil Carbon Sequestration Baseline',
      'Aquifer Isotopic Recharge Mapping',
      'Methane Emission Delta: Zone G',
      'Soil Integrity index In(val): Sector 4',
      'NDVI Biomass Density: 2024 Cycle',
      'Reforestation Survival Rate: ASAL',
      'Nitrogen Runoff Probability Matrix',
      'Microbiome Diversity Metagenomics',
      'Watershed Erosion Risk Assessment',
      'Carbon Credit Minting Audit Trail'
    ][i % 10] + (i > 9 ? ` (Revision ${Math.floor(i/10)})` : ''),
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: ['Soil', 'Water', 'Air'][i % 3],
    region: ['Northern Frontier', 'Eastern Arid Zone', 'Central Basin', 'Coastal Strip'][i % 4],
    type: FILE_FORMATS[(i + 1) % FILE_FORMATS.length],
    size: `${(Math.random() * 45 + 5).toFixed(1)} MB`,
    date: `May ${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}, 2024`,
    access: 'Public',
    content: `# Environmental Resource Telemetry\nVerifying biomass assets for carbon ledger integration. \n\n## Technical Metadata\n- Sentinel-Sync ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}\n- Confidence Interval: 99.4%\n- Delta-In: +0.42 (Seasonal Improvement)`
  })),

  // 3. HEALTH AGRICULTURE (HA) & BIOLOGICAL SAFETY - 25 Entries
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `HA-2024-${String(i+1).padStart(3, '0')}`,
    version: '1.8.4',
    name: [
      'Zoonotic Pathogen Surveillance Log',
      'Nutrient Density: Indigenous Greens',
      'Aflatoxin Contamination Risk Map',
      'Dairy Herd Biological Integrity',
      'Herbal Root Saponin Concentration',
      'PPE Compliance Audit: Field Units',
      'Pesticide Residue Compliance Ledger',
      'NutriLife: Bio-fortification Study',
      'Pathogen Viral Load: Maize Cluster',
      'SafeHarvest: Emergency Response Log'
    ][i % 10] + (i > 9 ? ' (Node Sync)' : ''),
    thrust: 'HA',
    domain: 'Epidemiology',
    category: i % 2 === 0 ? 'Animals' : 'Plants',
    region: 'Global Network Hubs',
    type: FILE_FORMATS[(i + 2) % FILE_FORMATS.length],
    size: `${(Math.random() * 15 + 2).toFixed(1)} MB`,
    date: `May ${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}, 2024`,
    access: 'Internal',
    content: `# Biological Integrity Report\nTracking pathogens and nutritional bioavailability. \n\n## Health Indicators\n- Biological Safety (Bs): 0.98\n- Nutritional Index: 8.4/10\n- Protocol: SafeHarvest v2.1 adherence verified.`
  })),

  // 4. TECHNICAL AGRICULTURE (TA) & AI DIAGNOSTICS - 30 Entries
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: `TA-2024-${String(i+1).padStart(3, '0')}`,
    version: '9.4.0',
    name: [
      'AI Neural Weights: Coffee Rust v9',
      'IoT Mesh Topology: Arid Sector B',
      'Drone Swarm Path Optimization',
      'Satellite Spectral Calibration Data',
      'Precision Irrigation Logic Flow',
      'Neural Net Inference: Yield Pred',
      'Smart Sensor Battery Lifecycle',
      'Robotic Weeding Accuracy Metrics',
      'In-situ Soil Sensor Raw Telemetry',
      'Blockchain Ledger: C(a) Verification'
    ][i % 10] + (i > 9 ? ` (Alpha-Rev ${Math.floor(i/10)})` : ''),
    thrust: 'TA',
    domain: 'AI-Powered Agricultural Diagnostics',
    category: ['Air', 'Water', 'Soil', 'Plants'][i % 4],
    region: 'Technical Operations Node',
    type: 'JSON Dataset',
    size: `${(Math.random() * 800 + 100).toFixed(0)} MB`,
    date: `May ${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}, 2024`,
    access: 'Proprietary',
    content: `# Technical Ag Infrastructure Optimization\nDeploying AI-driven precision tools for m(t) stabilization.\n\n## System Benchmarks\n- Latency: 14ms (Central Node)\n- Accuracy Delta: +12% since last weights update.`
  })),

  // 5. INDUSTRIAL AGRICULTURE (IA) & SCALE-UP - 30 Entries
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: `IA-2024-${String(i+1).padStart(3, '0')}`,
    version: '1.6.2',
    name: [
      'Supply Chain Maturity Audit',
      'Processing Facility Energy Index',
      'Value Chain Traceability Hashed',
      'Logistics Fleet Emission Delta',
      'Market Liquidity: Tokenz Swap',
      'Post-Harvest Loss Reduction Log',
      'Zero-Waste Factory Blueprint',
      'Cold-Chain Integrity Telemetry',
      'Global Export Compliance Brief',
      'CAPEX Amortization Resilience'
    ][i % 10] + (i > 9 ? ' (Industrial Scale)' : ''),
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'Finance',
    region: ['Industrial Hub 1', 'Export Node Alpha', 'Mombasa Port Cluster', 'Hub Beta'][i % 4],
    type: 'XLSX Telemetry',
    size: `${(Math.random() * 120 + 20).toFixed(1)} MB`,
    date: `May ${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}, 2024`,
    access: 'Partner-Only',
    content: `# Industrial Maturity Benchmarks\nScaling smallholder output to global market standards. \n\n## Maturity Indicators\n- Throughput Efficiency: 94.2%\n- Waste Divergence: 88%\n- C(a) Industrial Floor: 7.2`
  }))
];
