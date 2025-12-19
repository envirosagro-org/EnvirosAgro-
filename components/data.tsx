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

export const COLLECTION_TOOLS = [
    { name: "Soil Sample Data Sheet", type: "PDF", size: "150KB", desc: "Standardized template for recording soil pH, texture, and location data." },
    { name: "Pest Scouting Form", type: "Excel", size: "45KB", desc: "Track pest counts, beneficial insects, and damage levels weekly." },
    { name: "Water Quality Log", type: "PDF", size: "120KB", desc: "Record pH, turbidity, and chemical levels for irrigation sources." },
    { name: "Crop Yield Calculator", type: "Excel", size: "2MB", desc: "Automated spreadsheet for estimating harvest potential per hectare." },
    { name: "Biodiversity Checklist", type: "PDF", size: "200KB", desc: "Field guide for identifying and logging local flora and fauna." },
    { name: "Agri-Supply Chain Curriculum", type: "PDF", size: "1.5MB", desc: "4-Year core unit structure for procurement, logistics, and operations." },
];

// Mock Data aligned with Framework and Elements
export const DATASETS = [
  // --- SUSTAINABLE INTEGRATED DEVELOPMENT STRATEGY ---
  {
    id: 'DS-CORE-001',
    name: 'Sustainable Integrated Development Strategy (SIDS)',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'General',
    region: 'Global',
    type: 'Strategic Blueprint',
    size: '12.4 MB',
    date: 'June 01, 2024',
    access: 'Public',
    content: `
# Sustainable Integrated Development: The Overarching Strategy

## 1. Rationale
Sustainable Integrated Development is the primary operational strategy of EnvirosAgro. It is the synthesis of all five agricultural thrusts (SA, EA, HA, TA, IA) into a singular, cohesive engine for societal and ecological progress.

## 2. Core Objective
The objective is to move agricultural systems beyond simple production towards a "Steady-State Resilience" where natural resource extraction and societal growth are perfectly balanced.

## 3. Implementation Pathway
The strategy follows a linear progression:
- **Phase 1: Social Stabilization.** Building social immunity and resolving conflicts (mitigating SI-D).
- **Phase 2: Environmental Integration.** Applying regenerative methods to land.
- **Phase 3: Health Standardization.** Ensuring the biological safety of the system.
- **Phase 4: Technical Optimization.** Scaling through precision tools.
- **Phase 5: Industrial Maturity.** Achieving global value-chain stability.

## 4. Contrast with SI-D
While Sustainable Integrated Development is the *solution* and *method*, Social Influenza Disease (SI-D) is the *primary obstacle* identified within the Social Agriculture thrust. One provides the growth framework; the other diagnoses the societal fractures that prevent growth.
    `
  },
  // --- CASE STUDY: WANKAN VILLAGE ---
  {
    id: 'DS-IA-017',
    name: 'Case Study: Constraints on Agri-Supply Chain (Wankan Village)',
    thrust: 'IA',
    domain: 'Value Chain Development',
    category: 'Finance',
    region: 'Kenya (Kiambu)',
    type: 'Thesis / Case Study',
    size: '3.2 MB',
    date: 'Oct 2024',
    access: 'Public',
    content: `
# CONSTRAINTS ON PERFORMANCE OF AGRICULTURAL SUPPLY CHAIN PRACTICES: A CASE STUDY OF WANKAN VILLAGE GROCERIES

**Author:** Maina Bonface Ndungu  
**Context:** Zetech University, School of Business and Economics  
**Date:** October 2024

## 1. Introduction & Background
Kenya’s rural economy is heavily dependent on agriculture, contributing 33% directly and 27% indirectly to the GDP. Despite this, 46% of the population lives on less than 1 USD a day, and 36.5% are food insecure. This research examines Wankan Village (Kimbo, Ruiru) to identify why there is a disconnect between professional knowledge and actual performance in agricultural supply chains.

## 2. Problem Statement
Ideal agri-supply chain practices—Reduced Costs, Improved Quality, Efficient Resource Utilization, Strategic Relationships, and Reduced Time to Market—are rarely met in the Kenyan context. 

### Key Performance Gaps Identified:
- **Increased Cost of Production:** Fertilizer prices rose from KES 2,600 to KES 6,000 in four years despite subsidies.
- **Decreased Production:** Mixed performance in 2022 saw declines in maize, wheat, and tea outputs.
- **Haphazard Resource Allocation:** Diminishing land parcels due to residential construction and delayed distribution of inputs.

## 3. Theoretical Frameworks Applied
- **Malthusian Theory:** Population growth outstripping arithmetic food supply growth.
- **Political Development:** Modernization vs. Dependency theories regarding government infrastructure.
- **Self-Efficacy:** Albert Bandura's theory on the lack of belief/drive for innovation among management.
- **Milankovitch Theory:** The role of natural orbital cycles in climate-driven agricultural shocks.

## 4. Key Findings from Wankan Village (100% Response Rate)
- **Technology (High Impact):** 99% of surveyed vendors utilize some form of technology, leading to 80% efficiency gains.
- **Climate (Critical Constraint):** Climate change is seen as an independent, largely unpredictable factor that drastically disrupts harvests.
- **Government (Mixed):** 55% perceived positive improvements (roads), but significant concerns exist regarding high taxation on inputs.
- **Population (Disruptive):** Rapid growth has led to mismatched supply and demand, fueling food insecurity.

## 5. Statistical Conclusions (ANOVA & Chi-Square)
- **Technology & Knowledge:** Statistically significant relationship with performance. Poor adoption results in disorganized chains.
- **Climate & Population:** Identified as the most significant, yet independent, influences. They are natural constraints requiring adaptive resilience rather than direct control.

## 6. Strategic Recommendations
1. **Data-Driven Tech:** Tech development must prioritize feasibility studies and actual farmer preferences before rollout.
2. **Bottom-Up Innovation:** Knowledge should flow from frontline workers (farmers) to management, rather than top-down.
3. **Sustainability Integration:** Mitigate climate risks through efficient irrigation and renewable energy.
4. **Fair Budgeting:** Government funds should be distributed proportionally to the revenue generated by specific agricultural sectors.
    `
  },
  // --- SOCIAL AGRICULTURE (SA) ---
  {
    id: 'DS-SA-039',
    name: 'SI-D Theory: Conceptual Exploration',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Global',
    type: 'Conceptual Framework',
    size: '4.2 MB',
    date: 'May 15, 2024',
    access: 'Public',
    content: `
# Social Influenza Disease (SI-D): A Conceptual and Socio-Psychological Exploration

## 1. Introduction
Social Influenza Disease is a conceptual framework describing the rapid spread of harmful social beliefs, psychological stressors, and inherited ideological conflicts within human societies. Unlike biological influenza, it originates not from pathogens but from social interactions, cultural memory, communication patterns, and belief systems. 

## 2. Mechanism of Transmission
### 2.1 Language as the Primary Vector
Language—spoken words, narratives, and symbols—is the main carrier of social influenza. It can activate fear responses, reinforce prejudice, and normalize hostility. Repeated exposure to ambiguous or fear-based language can reprogram neural pathways, influencing cognition and decision-making.

### 2.2 Psychological and Epigenetic Influence
While social influenza does not alter DNA, chronic psychological stress influences epigenetic expression, affecting stress hormone regulation and immune system responsiveness. Prolonged exposure to social tension thus creates biological vulnerability.

## 3. Incubation Zones
The family serves as the primary incubation zone. Conflicting ideologies within families generate emotional fragmentation, increasing susceptibility to external manipulation. Unresolved familial tension often expands outward, influencing community disputes and political polarization.

## 4. Symptoms of SI-D
### 4.1 Societal-Level
- Social disorganization and breakdown of trust.
- Tribalism, discrimination, and religious hostility.
- Resistance to education and rejection of innovation.

### 4.2 Individual-Level
- Chronic anxiety, depression, and identity confusion.
- Hypertension and immune dysfunction linked to prolonged stress.
- Breakdown of intergenerational bonds.

## 5. Conclusion
SI-D provides a lens to understand how narratives shape societies as profoundly as pathogens shape bodies. Prevention requires conscious communication, critical thinking, and collective healing of historical trauma.
    `
  },
  {
    id: 'DS-SA-040',
    name: 'National SI-D Policy & Diagnostic Toolkit',
    thrust: 'SA',
    domain: 'Civic & Governmental',
    category: 'General',
    region: 'National',
    type: 'Policy Toolkit',
    size: '5.8 MB',
    date: 'May 18, 2024',
    access: 'Public',
    content: `
# National SI-D Policy & Implementation Toolkit

## I. Executive Summary
This toolkit provides governments and organizations with actionable models to diagnose and intervene in the spread of Social Influenza Disease (SI-D). It emphasizes the creation of "Social Immunity" as critical national infrastructure.

## II. Diagnostic Framework
### A. Early Warning Indicators
- Polarized language in media and family units.
- Historical narratives used to justify exclusion.
- Rising collective fear without identifiable causes.

### B. Chronic Indicators
- Persistent underdevelopment and innovation resistance.
- High prevalence of stress-related physical diseases.
- Weakening of institutional trust.

## III. Social Immunity Model (SIM)
Just as vaccines protect biologically, social immunity protects the body politic through:
- **Education:** Critical filtering of incoming narratives.
- **Emotional Literacy:** Regulation of collective stress.
- **Ethical Communication:** Reducing the transmission of toxic language.
- **Reconciliation:** Healing intergenerational trauma.

## IV. Intervention Strategy
### 1. Primary: Family-Level
- Programs for intergenerational dialogue.
- Parenting education focusing on emotional modeling.
### 2. Secondary: Community-Level
- Media literacy campaigns.
- Storytelling correction forums led by trusted cultural leaders.
### 3. Tertiary: Institutional-Level
- Curricular reform in schools (Ethics, Logic, EQ).
- Health system integration for stress screening.
    `
  },
  {
    id: 'DS-SA-041',
    name: 'Integrated Sustainability: SI-D × EnvirosAgro',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'Integrated Model',
    size: '3.5 MB',
    date: 'May 20, 2024',
    access: 'Public',
    content: `
# SI-D × EnvirosAgro Integrated Sustainability Framework

## 1. The Rationale
Sustainability does not fail first in the soil; it fails first in social systems. Where Social Influenza Disease (SI-D) exists, agricultural initiatives fail due to distrust, innovation resistance, and fragmented cooperation.

## 2. Integration Model
EnvirosAgro provides the **Environmental & Technical Structure**, while SI-D mitigation provides the **Social Immunity** required for that structure to function.

| System | Role | Failure with SI-D |
|--------|------|-----------------|
| Social | Trust & Knowledge Flow | Conflict & Fragmentation |
| Agricultural | Production & Efficiency | Low Adoption & Misuse |
| Environmental | Resource Stewardship | Overexploitation |

## 3. How SI-D Undermines Agriculture
- **Knowledge Breakdown:** Farmers reject extension services due to ideological mistrust.
- **Cooperative Failure:** Tribalism and family conflict lead to the collapse of shared resources.
- **Stress Cycles:** Chronic social stress results in poor farm decision-making and neglect of soil health.

## 4. Strategic Insights
Nature establishes the boundaries of sustainability, but the human social state determines if those boundaries are respected. SI-D is the "hidden pest" of agriculture—consuming cooperation and weakening resilience long before crops fail.

## 5. Conclusion
Integrating SI-D mitigation into the EnvirosAgro framework transforms sustainability from a technical goal into a societal state. Healthy societies produce healthy farms.
    `
  },
  {
    id: 'DS-SA-001',
    name: 'Historical Farming Patterns in Mesopotamia',
    thrust: 'SA',
    domain: 'Historical Agriculture',
    category: 'Soil',
    region: 'Middle East',
    type: 'PDF Report',
    size: '15 MB',
    date: 'Jan 10, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-002',
    name: 'Global Ag-Economic Trade Flow 2023',
    thrust: 'SA',
    domain: 'Economic Agriculture',
    category: 'Plants',
    region: 'Global',
    type: 'CSV',
    size: '120 MB',
    date: 'Dec 05, 2023',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-003',
    name: 'Rural Sociology Survey: Community Resilience',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Southeast Asia',
    type: 'JSON',
    size: '45 MB',
    date: 'Feb 15, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-004',
    name: 'Indigenous Water Rights & River Treaties',
    thrust: 'SA',
    domain: 'Civic & Governmental',
    category: 'Water',
    region: 'South America',
    type: 'PDF',
    size: '12 MB',
    date: 'Mar 01, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-005',
    name: 'Cultural Significance of Cattle in Pastoral Societies',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'Animals',
    region: 'East Africa',
    type: 'PDF',
    size: '8 MB',
    date: 'Feb 20, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-006',
    name: 'Urban vs Rural Perceptions of Air Quality',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'Air',
    region: 'Europe',
    type: 'CSV',
    size: '22 MB',
    date: 'Jan 15, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-007',
    name: 'Key Insights & Updates for Farmers',
    thrust: 'SA',
    domain: 'Information Domains',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 01, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-008',
    name: 'What is Agriculture? - Philosophy',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '2 MB',
    date: 'Apr 01, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-009',
    name: 'Malthusian Dynamics & Modern Food Security',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '8 MB',
    date: 'Apr 02, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-010',
    name: 'Integrating Agriculture into Education Systems',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '6 MB',
    date: 'Apr 09, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-011',
    name: 'STEM Applications in Agriculture',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '4 MB',
    date: 'Apr 09, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-012',
    name: 'Early Childhood Ag-Development Study',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '3 MB',
    date: 'Apr 09, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-013',
    name: 'Aesthetic Dimensions of Agriculture',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '3 MB',
    date: 'Apr 10, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-014',
    name: 'Agri-Tourism: Designing Therapeutic Landscapes',
    thrust: 'SA',
    domain: 'Economic Agriculture',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '15 MB',
    date: 'Apr 10, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-015',
    name: 'Floral Aesthetics & Cultural Significance',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Article',
    size: '4 MB',
    date: 'Apr 10, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-016',
    name: 'Urban Kitchen Gardening Guide',
    thrust: 'SA',
    domain: 'Economic Agriculture',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '6 MB',
    date: 'Apr 12, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-017',
    name: 'Traditional Recipe: Maize & Sweet Potato Mash',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'Plants',
    region: 'East Africa',
    type: 'PDF Article',
    size: '1 MB',
    date: 'Apr 12, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-018',
    name: 'EnvirosAgro Sustainability Framework Guide',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '10 MB',
    date: 'Apr 14, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-019',
    name: 'Policy Guide: National Food Security Modeling',
    thrust: 'SA',
    domain: 'Civic & Governmental',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '8 MB',
    date: 'Apr 14, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-020',
    name: 'Farmer Identity & Social Stigma Report',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '6 MB',
    date: 'Apr 14, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-021',
    name: 'Psychological Foundations of Agriculture',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '4 MB',
    date: 'Apr 14, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-022',
    name: 'Indigenous Plant Wisdom (Mugumo Tree Study)',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'Plants',
    region: 'Kenya',
    type: 'PDF Case Study',
    size: '5 MB',
    date: 'Apr 14, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-023',
    name: 'The Dual Nature: Art & Science in Ag',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '3 MB',
    date: 'Apr 15, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-024',
    name: 'Ecological Limits & Carrying Capacity Analysis',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Global',
    type: 'PDF Case Study',
    size: '4 MB',
    date: 'Apr 15, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-025',
    name: 'Strategic Agricultural Information Domains',
    thrust: 'SA',
    domain: 'Information Domains',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '4 MB',
    date: 'Apr 20, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-026',
    name: 'Ag-Finance: Loans, Grants & Subsidies',
    thrust: 'SA',
    domain: 'Economic Agriculture',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 20, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-027',
    name: 'Government Ag-Policy & Regulation Digest',
    thrust: 'SA',
    domain: 'Civic & Governmental',
    category: 'General',
    region: 'Global',
    type: 'PDF Document',
    size: '8 MB',
    date: 'Apr 20, 2024',
    access: 'Public'
  },
   {
    id: 'DS-SA-028',
    name: 'Social Dynamics & Community Networks',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Global',
    type: 'PDF Case Study',
    size: '3 MB',
    date: 'Apr 20, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-029',
    name: 'Global Ag-Economy & Market Indicators',
    thrust: 'SA',
    domain: 'Economic Agriculture',
    category: 'General',
    region: 'Global',
    type: 'CSV',
    size: '25 MB',
    date: 'Apr 20, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-030',
    name: 'Modern Agricultural Learning Themes',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Curriculum',
    size: '15 MB',
    date: 'Apr 20, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-031',
    name: 'Global Agricultural Challenges Report',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '10 MB',
    date: 'Apr 22, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-032',
    name: 'Etymology & Psychology of Agriculture',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '3 MB',
    date: 'Apr 24, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-033',
    name: 'Origins of Agriculture: Area vs Diffusion',
    thrust: 'SA',
    domain: 'Historical Agriculture',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '5 MB',
    date: 'Apr 24, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-034',
    name: 'Bantu Agricultural Specialization & Trade',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Africa',
    type: 'PDF Case Study',
    size: '4 MB',
    date: 'Apr 25, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-035',
    name: 'The Shift to Agricultural Monoversity',
    thrust: 'SA',
    domain: 'Sociological & Anthropological',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '2 MB',
    date: 'Apr 25, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-036',
    name: 'Evolution of Ag-Economics',
    thrust: 'SA',
    domain: 'Economic Agriculture',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '6 MB',
    date: 'Apr 25, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-SA-037',
    name: 'EnvirosAgro Library Catalog 2024',
    thrust: 'SA',
    domain: 'Information Domains',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '2 MB',
    date: 'Apr 26, 2024',
    access: 'Public'
  },
  {
    id: 'DS-SA-038',
    name: 'Best Practices Video Library',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'Video Collection',
    size: 'Streaming',
    date: 'Apr 26, 2024',
    access: 'Public'
  },

  // --- ENVIRONMENTAL AGRICULTURE (EA) ---
  {
    id: 'DS-EA-001',
    name: 'Carbon Sequestration Rates by Soil Type',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Soil',
    region: 'North America',
    type: 'XLSX',
    size: '45 MB',
    date: 'Feb 12, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-002',
    name: 'Invasive Plant Species Distribution Map',
    thrust: 'EA',
    domain: 'Agri-Environmental Management',
    category: 'Plants',
    region: 'Australia',
    type: 'GeoJSON',
    size: '150 MB',
    date: 'Mar 05, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-003',
    name: 'Groundwater Depletion & Recharge Rates',
    thrust: 'EA',
    domain: 'Human Impact',
    category: 'Water',
    region: 'Global',
    type: 'CSV',
    size: '210 MB',
    date: 'Jan 30, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-004',
    name: 'Agricultural Methane & N2O Emissions Inventory',
    thrust: 'EA',
    domain: 'Human Impact',
    category: 'Air',
    region: 'Global',
    type: 'XLSX',
    size: '65 MB',
    date: 'Dec 10, 2023',
    access: 'Public'
  },
  {
    id: 'DS-EA-005',
    name: 'Wildlife-Agriculture Conflict Zones',
    thrust: 'EA',
    domain: 'Societal Context',
    category: 'Animals',
    region: 'Asia',
    type: 'PDF Report',
    size: '18 MB',
    date: 'Feb 28, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-006',
    name: 'Weather Insights & Climate Trends',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Air',
    region: 'Global',
    type: 'JSON',
    size: '15 MB',
    date: 'Apr 01, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-007',
    name: 'Bee Pollination & Biodiversity Studies',
    thrust: 'EA',
    domain: 'Biodiversity & Conservation',
    category: 'Animals',
    region: 'Global',
    type: 'PDF Report',
    size: '12 MB',
    date: 'Apr 02, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-008',
    name: 'Plastic Waste Pathways in Agriculture',
    thrust: 'EA',
    domain: 'Human Impact',
    category: 'Soil',
    region: 'Global',
    type: 'PDF Report',
    size: '14 MB',
    date: 'Apr 05, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-009',
    name: 'On-Farm Recycling Guidelines',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'General',
    region: 'Developing Economies',
    type: 'PDF Guide',
    size: '6 MB',
    date: 'Apr 05, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-010',
    name: 'Biodegradable Alternatives Assessment',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Plants',
    region: 'Global',
    type: 'XLSX',
    size: '10 MB',
    date: 'Apr 05, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-011',
    name: 'Sustainable Pest Control Strategies',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Animals',
    region: 'East Africa',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 06, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-012',
    name: 'Mulch Impact on Coffee Soils',
    thrust: 'EA',
    domain: 'Agri-Environmental Management',
    category: 'Soil',
    region: 'Kenya',
    type: 'XLSX',
    size: '8 MB',
    date: 'Apr 06, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-013',
    name: 'Weed Identification & Classification Guide',
    thrust: 'EA',
    domain: 'Biodiversity & Conservation',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '25 MB',
    date: 'Apr 07, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-014',
    name: 'Weeds as Organic Fertilizer & Mulch',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Report',
    size: '9 MB',
    date: 'Apr 07, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-015',
    name: 'Ecological Benefits of Weeds: Carbon & Soil',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'CSV',
    size: '18 MB',
    date: 'Apr 07, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-016',
    name: 'Arid Zone Water Harvesting Strategies',
    thrust: 'EA',
    domain: 'Water Conservation',
    category: 'Water',
    region: 'Kenya/Global',
    type: 'PDF Guide',
    size: '12 MB',
    date: 'Apr 08, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-017',
    name: 'Soil Salinity & Amendment Protocols',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Arid Zones',
    type: 'PDF Report',
    size: '8 MB',
    date: 'Apr 08, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-018',
    name: 'Desert Agroforestry Species Guide',
    thrust: 'EA',
    domain: 'Biodiversity & Conservation',
    category: 'Plants',
    region: 'East Africa/Israel',
    type: 'CSV',
    size: '5 MB',
    date: 'Apr 08, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-019',
    name: 'Animal Biodiversity in Agriculture',
    thrust: 'EA',
    domain: 'Biodiversity & Conservation',
    category: 'Animals',
    region: 'Global',
    type: 'PDF Report',
    size: '10 MB',
    date: 'Apr 09, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-020',
    name: 'Chameleons as Biocontrol Agents in Coffee',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Animals',
    region: 'East Africa',
    type: 'PDF Case Study',
    size: '4 MB',
    date: 'Apr 09, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-021',
    name: 'Vermicomposting & Soil Macroorganisms',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'PDF Guide',
    size: '7 MB',
    date: 'Apr 09, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-022',
    name: 'Microbial Soil Health & Chemical Impact',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'PDF Report',
    size: '9 MB',
    date: 'Apr 09, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-023',
    name: 'Integrated Poultry-Coffee Systems',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Animals',
    region: 'East Africa',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 09, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-024',
    name: 'Closed-Loop Organic Waste Management',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Soil',
    region: 'Urban Zones',
    type: 'PDF Report',
    size: '8 MB',
    date: 'Apr 12, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-025',
    name: 'Urban Biodiversity & Pollinator Support',
    thrust: 'EA',
    domain: 'Biodiversity & Conservation',
    category: 'Animals',
    region: 'Urban Zones',
    type: 'PDF Article',
    size: '3 MB',
    date: 'Apr 12, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-026',
    name: 'Kenya Case Study: Sustainable Time Constant',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Water',
    region: 'Kenya',
    type: 'PDF Report',
    size: '6 MB',
    date: 'Apr 14, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-027',
    name: 'Biomimicry Research: Learning from Nature',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '8 MB',
    date: 'Apr 15, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-028',
    name: 'Apiculture & Pomology Integration Guide',
    thrust: 'EA',
    domain: 'Biodiversity & Conservation',
    category: 'Animals',
    region: 'Global',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 15, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-029',
    name: 'Climate Change Trends & Weather Forecasting',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'Air',
    region: 'Global',
    type: 'JSON Live Feed',
    size: 'N/A',
    date: 'Apr 20, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-030',
    name: 'Sustainable Ag Practices (FAO Guidelines)',
    thrust: 'EA',
    domain: 'Sustainable Solutions',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '12 MB',
    date: 'Apr 22, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-031',
    name: 'Soil Composition & Fertility Analysis',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'CSV',
    size: '30 MB',
    date: 'Apr 28, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-032',
    name: 'Plant Disease Prevalence Map',
    thrust: 'EA',
    domain: 'Biodiversity & Conservation',
    category: 'Plants',
    region: 'Global',
    type: 'GeoJSON',
    size: '85 MB',
    date: 'Apr 28, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-033',
    name: 'Best Practices for Soil Regeneration',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 28, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-034',
    name: 'Global Soil Classification & pH Map',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'CSV',
    size: '120 MB',
    date: 'Apr 29, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-EA-035',
    name: 'Organic Matter & Soil Amendment Guide',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'PDF Analysis Report',
    size: '8 MB',
    date: 'Apr 29, 2024',
    access: 'Public'
  },
  {
    id: 'DS-EA-036',
    name: 'Regional Soil Fertility Profiles',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Soil',
    region: 'Global',
    type: 'CSV',
    size: '45 MB',
    date: 'Apr 29, 2024',
    access: 'Public'
  },

  // --- HEALTH AGRICULTURE (HA) ---
  {
    id: 'DS-HA-001',
    name: 'Epidemiology of Livestock Diseases 2023',
    thrust: 'HA',
    domain: 'Epidemiology',
    category: 'Animals',
    region: 'Global',
    type: 'JSON',
    size: '250 MB',
    date: 'Jan 28, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-HA-002',
    name: 'Farmer Health & Pesticide Drift Exposure',
    thrust: 'HA',
    domain: 'Environmental Health',
    category: 'Air',
    region: 'South America',
    type: 'CSV',
    size: '12 MB',
    date: 'Oct 15, 2023',
    access: 'Public'
  },
  {
    id: 'DS-HA-003',
    name: 'Mycotoxin Levels in Stored Grains',
    thrust: 'HA',
    domain: 'General Ag Health',
    category: 'Plants',
    region: 'Global',
    type: 'XLSX',
    size: '34 MB',
    date: 'Dec 20, 2023',
    access: 'Members Only'
  },
  {
    id: 'DS-HA-004',
    name: 'Waterborne Pathogens in Irrigation Canals',
    thrust: 'HA',
    domain: 'Environmental Health',
    category: 'Water',
    region: 'Southeast Asia',
    type: 'PDF Report',
    size: '9 MB',
    date: 'Mar 08, 2024',
    access: 'Public'
  },
  {
    id: 'DS-HA-005',
    name: 'Soil-Transmitted Helminth Prevalence',
    thrust: 'HA',
    domain: 'Biological Sciences',
    category: 'Soil',
    region: 'Sub-Saharan Africa',
    type: 'CSV',
    size: '15 MB',
    date: 'Jan 22, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-HA-006',
    name: 'Coffee Berry Disease: Dual-Injury Model Analysis',
    thrust: 'HA',
    domain: 'Epidemiology',
    category: 'Plants',
    region: 'East Africa',
    type: 'PDF Report',
    size: '10 MB',
    date: 'Apr 06, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-HA-007',
    name: 'Nutritional & Medicinal Weeds Profile',
    thrust: 'HA',
    domain: 'Nutrition & Botany',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '7 MB',
    date: 'Apr 07, 2024',
    access: 'Public'
  },
  {
    id: 'DS-HA-008',
    name: 'Psychological Benefits of Farming Landscapes',
    thrust: 'HA',
    domain: 'General Ag Health',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '5 MB',
    date: 'Apr 10, 2024',
    access: 'Public'
  },
  {
    id: 'DS-HA-009',
    name: 'Medicinal & Pesticidal Properties of Neem',
    thrust: 'HA',
    domain: 'Nutrition & Botany',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 12, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-HA-010',
    name: 'Eco-Psychology & Mental Health in Farming',
    thrust: 'HA',
    domain: 'General Ag Health',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '5 MB',
    date: 'Apr 14, 2024',
    access: 'Public'
  },
  {
    id: 'DS-HA-011',
    name: 'Farmer Occupational Health & Safety Guide',
    thrust: 'HA',
    domain: 'General Ag Health',
    category: 'General',
    region: 'Global',
    type: 'PDF Manual',
    size: '6 MB',
    date: 'Apr 20, 2024',
    access: 'Public'
  },
  {
    id: 'DS-HA-012',
    name: 'CBD Epidemiology: Climatic Catalysts',
    thrust: 'HA',
    domain: 'Epidemiology',
    category: 'Plants',
    region: 'East Africa',
    type: 'PDF Report',
    size: '8 MB',
    date: 'Apr 22, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-HA-013',
    name: 'Pigweed & Blackjack: Nutritional Breakdown',
    thrust: 'HA',
    domain: 'Nutrition & Botany',
    category: 'Plants',
    region: 'Global',
    type: 'XLSX',
    size: '4 MB',
    date: 'Apr 23, 2024',
    access: 'Public'
  },
  {
    id: 'DS-HA-014',
    name: 'Neem-Based Biopesticide Field Trials',
    thrust: 'HA',
    domain: 'Nutrition & Botany',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '3 MB',
    date: 'Apr 24, 2024',
    access: 'Public'
  },

  // --- TECHNICAL AGRICULTURE (TA) ---
  {
    id: 'DS-TA-001',
    name: 'IoT Sensor Network: Soil Moisture Logs',
    thrust: 'TA',
    domain: 'Ag Information Technology',
    category: 'Soil',
    region: 'Europe',
    type: 'CSV',
    size: '55 MB',
    date: 'Feb 01, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-002',
    name: 'AI Maize Disease Detection Model',
    thrust: 'TA',
    domain: 'AI-Powered Agricultural Diagnostics',
    category: 'Plants',
    region: 'Global',
    type: 'H5 (Model)',
    size: '250 MB',
    date: 'Mar 10, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-003',
    name: 'Automated Milking System Telemetry',
    thrust: 'TA',
    domain: 'Engineering & Industrial Tech',
    category: 'Animals',
    region: 'North America',
    type: 'JSON',
    size: '180 MB',
    date: 'Feb 25, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-004',
    name: 'Drone-Based Atmospheric Sampling Data',
    thrust: 'TA',
    domain: 'Engineering & Industrial Tech',
    category: 'Air',
    region: 'Asia',
    type: 'CSV',
    size: '90 MB',
    date: 'Dec 15, 2023',
    access: 'Public'
  },
  {
    id: 'DS-TA-005',
    name: 'Smart Hydroponic Nutrient Balance Logs',
    thrust: 'TA',
    domain: 'Ag Resources',
    category: 'Water',
    region: 'Middle East',
    type: 'XLSX',
    size: '25 MB',
    date: 'Jan 05, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-006',
    name: 'Coffee Grafting & Rootstock Resilience',
    thrust: 'TA',
    domain: 'Ag Resources',
    category: 'Plants',
    region: 'Kenya',
    type: 'PDF Guide',
    size: '6 MB',
    date: 'Apr 06, 2024',
    access: 'Public'
  },
  {
    id: 'DS-TA-007',
    name: 'Integrated Weed Management (IWM) Protocols',
    thrust: 'TA',
    domain: 'Management Protocols',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '8 MB',
    date: 'Apr 07, 2024',
    access: 'Public'
  },
  {
    id: 'DS-TA-008',
    name: 'AI-Driven Precision Irrigation Models (Arid)',
    thrust: 'TA',
    domain: 'AI-Powered Agricultural Diagnostics',
    category: 'Water',
    region: 'Arid Zones',
    type: 'Python NB',
    size: '15 MB',
    date: 'Apr 08, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-009',
    name: 'Renewable Energy for Off-Grid Farming',
    thrust: 'TA',
    domain: 'Engineering & Industrial Tech',
    category: 'Air',
    region: 'Global',
    type: 'PDF Report',
    size: '10 MB',
    date: 'Apr 08, 2024',
    access: 'Public'
  },
  {
    id: 'DS-TA-010',
    name: 'Plant Wave Tech: Translating Bio-Signals',
    thrust: 'TA',
    domain: 'Design & Media',
    category: 'Plants',
    region: 'Global',
    type: 'Audio/Data',
    size: '45 MB',
    date: 'Apr 10, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-011',
    name: 'Sustainability Coefficient C(a) Calculator',
    thrust: 'TA',
    domain: 'Management Protocols',
    category: 'General',
    region: 'Global',
    type: 'XLSX Tool',
    size: '2 MB',
    date: 'Apr 14, 2024',
    access: 'Public'
  },
  {
    id: 'DS-TA-012',
    name: 'Time Series Modeling for Ag-Resilience',
    thrust: 'TA',
    domain: 'Ag Information Technology',
    category: 'General',
    region: 'Global',
    type: 'Python NB',
    size: '8 MB',
    date: 'Apr 14, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-013',
    name: 'Smart Farming & Precision Tech Updates',
    thrust: 'TA',
    domain: 'Ag Information Technology',
    category: 'General',
    region: 'Global',
    type: 'PDF Report',
    size: '12 MB',
    date: 'Apr 20, 2024',
    access: 'Public'
  },
  {
    id: 'DS-TA-014',
    name: 'Modern Ag-Tech Innovations: IoT & AI',
    thrust: 'TA',
    domain: 'Ag Information Technology',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '15 MB',
    date: 'Apr 22, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-015',
    name: 'Agri-Genetics & Biotechnology Guide',
    thrust: 'TA',
    domain: 'Ag Resources',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Report',
    size: '18 MB',
    date: 'Apr 22, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-016',
    name: 'Agricultural Data Application (ADA) Manual',
    thrust: 'TA',
    domain: 'Ag Information Technology',
    category: 'General',
    region: 'Global',
    type: 'PDF Guide',
    size: '5 MB',
    date: 'Apr 26, 2024',
    access: 'Public'
  },
  {
    id: 'DS-TA-017',
    name: 'Soil Analysis AI Interpretation Log',
    thrust: 'TA',
    domain: 'AI-Powered Agricultural Diagnostics',
    category: 'Soil',
    region: 'Global',
    type: 'CSV',
    size: '25 MB',
    date: 'Apr 29, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-TA-018',
    name: 'Yield Prediction Algorithms (Wheat)',
    thrust: 'TA',
    domain: 'AI-Powered Agricultural Diagnostics',
    category: 'Plants',
    region: 'Global',
    type: 'Python NB',
    size: '15 MB',
    date: 'Apr 29, 2024',
    access: 'Members Only'
  },

  // --- INDUSTRIAL AGRICULTURE (IA) ---
  {
    id: 'DS-IA-001',
    name: 'Post-Harvest Processing Waste Analysis',
    thrust: 'IA',
    domain: 'Industrial Waste',
    category: 'Plants',
    region: 'Global',
    type: 'XLSX',
    size: '18 MB',
    date: 'Jan 05, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-002',
    name: 'Industrial Effluent Treatment Efficiency',
    thrust: 'IA',
    domain: 'Industrial Waste',
    category: 'Water',
    region: 'China',
    type: 'PDF Report',
    size: '12 MB',
    date: 'Feb 18, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-IA-003',
    name: 'Commercial Poultry Value Chain Metrics',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'Animals',
    region: 'USA',
    type: 'CSV',
    size: '40 MB',
    date: 'Nov 30, 2023',
    access: 'Members Only'
  },
  {
    id: 'DS-IA-004',
    name: 'Fertilizer Manufacturing Output & Soil Impact',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'Soil',
    region: 'Europe',
    type: 'PDF Report',
    size: '22 MB',
    date: 'Jan 20, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-005',
    name: 'Ammonia Emissions from Industrial Feedlots',
    thrust: 'IA',
    domain: 'Industrial Waste',
    category: 'Air',
    region: 'Global',
    type: 'CSV',
    size: '35 MB',
    date: 'Dec 28, 2023',
    access: 'Members Only'
  },
  {
    id: 'DS-IA-006',
    name: 'Heavy Metal Contamination in Industrial Soil Zones',
    thrust: 'IA',
    domain: 'Industrial Waste',
    category: 'Soil',
    region: 'Global',
    type: 'XLSX',
    size: '56 MB',
    date: 'Mar 12, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-IA-007',
    name: 'Nitrogen Fertilizer Output vs Soil Acidification',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'Soil',
    region: 'North America',
    type: 'PDF Report',
    size: '18 MB',
    date: 'Feb 22, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-008',
    name: 'Atmospheric Ammonia Concentrations near Mega-Dairies',
    thrust: 'IA',
    domain: 'Industrial Waste',
    category: 'Air',
    region: 'Europe',
    type: 'CSV',
    size: '89 MB',
    date: 'Mar 01, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-IA-009',
    name: 'Agrarian Revolution & Technologies',
    thrust: 'IA',
    domain: 'Industrial Revolution',
    category: 'General',
    region: 'Global',
    type: 'PDF Article',
    size: '4 MB',
    date: 'Apr 01, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-010',
    name: 'Circular Economy in Ag-Plastics',
    thrust: 'IA',
    domain: 'Industrial Waste',
    category: 'Soil',
    region: 'Global',
    type: 'PDF Report',
    size: '7 MB',
    date: 'Apr 05, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-011',
    name: 'Coffee Syrup Value Addition from By-Products',
    thrust: 'IA',
    domain: 'Value Chain Development',
    category: 'Plants',
    region: 'Global',
    type: 'PDF Guide',
    size: '3 MB',
    date: 'Apr 06, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-012',
    name: 'Industrial Value Chain Sustainability Index',
    thrust: 'IA',
    domain: 'Value Chain Development',
    category: 'General',
    region: 'Global',
    type: 'CSV',
    size: '15 MB',
    date: 'Apr 14, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-IA-013',
    name: 'Global Agri-Investment Capital Flows 2024',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'Finance',
    region: 'Global',
    type: 'XLSX',
    size: '45 MB',
    date: 'May 01, 2024',
    access: 'Members Only'
  },
  {
    id: 'DS-IA-014',
    name: 'Agricultural Loan Interest Rate Benchmarks',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'Finance',
    region: 'Global',
    type: 'CSV',
    size: '12 MB',
    date: 'May 01, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-015',
    name: 'Agri-Business Market Capitalization Report',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'Finance',
    region: 'Global',
    type: 'PDF Analysis Report',
    size: '10 MB',
    date: 'May 01, 2024',
    access: 'Public'
  },
  {
    id: 'DS-IA-016',
    name: 'Agricultural Supply Chain Management Curriculum',
    thrust: 'IA',
    domain: 'Value Chain Development',
    category: 'General',
    region: 'Global',
    type: 'PDF Curriculum',
    size: '2.5 MB',
    date: 'May 22, 2024',
    access: 'Public'
  }
];