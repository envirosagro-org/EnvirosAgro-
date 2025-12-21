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
  // --- NATIONAL AGRICULTURE PRODUCTION REPORT 2024 (KNBS) ---
  {
    id: 'DS-IA-017',
    name: 'National Agriculture Production Report 2024 (KNBS)',
    thrust: 'IA',
    domain: 'Industrial Sector',
    category: 'General',
    region: 'Kenya',
    type: 'Official Statistical Report',
    size: '8.4 MB',
    date: 'April 2024',
    access: 'Public',
    content: `
# National Agriculture Production Report 2024
**Published by:** Kenya National Bureau of Statistics (KNBS)

## Executive Summary
The agricultural sector remains an integral part of Kenya’s economy, accounting for **21.8 per cent of the Gross Domestic Product (GDP) in 2023**. It employs over 40 per cent of the total population and remains the cornerstone of national food security.

### Sector Performance (2023)
- **Gross Value Added (GVA):** KSh 3,295.2 billion.
- **Crop Growth:** Accounted for 70.7 per cent of the GVA.
- **Animal Production:** Accounted for 17.3 per cent of the GVA.
- **Food Crop Area:** Increased from 4,935.3 thousand hectares in 2022 to 5,371.7 thousand hectares in 2023.
- **Total Production:** Increased from 8.5 million tonnes to 10.7 million tonnes in 2023.

## Key Sub-Sector Insights
- **Coffee:** Area increased to 111.9 thousand hectares, though clean production declined to 48.7 thousand tonnes due to adverse weather.
- **Tea:** Produced a record 570.3 million Kgs in 2023, boosted by favorable rains and government fertilizer subsidies.
- **Sugar:** Production declined by 40.8 per cent to 473.9 thousand tonnes due to a lack of mature cane for milling.
- **Pyrethrum:** Acreage more than doubled to 9,362 acres, with production reaching 1,680.0 tonnes.
- **Meat:** Total production was 556.7 thousand tonnes valued at KSh 305 billion.
- **Dairy:** Registered 5.2 billion Kilogrammes of milk produced.
- **Fisheries:** Total production reached 161.3 thousand tonnes valued at KSh 35.9 billion.

## Strategic Context
The report aligns with the government's Bottom-Up Economic Transformation Agenda (BETA), prioritizing the revitalization of agriculture to drive economic growth and improve rural livelihoods.
    `
  },
  {
    id: 'DS-EA-037',
    name: 'Food Crop Performance Index (2019-2023)',
    thrust: 'EA',
    domain: 'Soil Health & Regeneration',
    category: 'Plants',
    region: 'Kenya',
    type: 'Data Series',
    size: '2.1 MB',
    date: 'April 2024',
    access: 'Public',
    content: `
# Food Crop Performance Index (2019-2023)
Detailed metrics for Kenya's primary food staples over a 5-year cycle.

## Maize (Primary Staple)
- **2023 Area:** 2,430,013 Ha
- **2023 Production:** 4,285,206 Tons (47.6M 90kg bags)
- **Total Value:** KSh 180.8 Billion
- **Leading Counties:** Uasin Gishu (476k tons), Trans Nzoia (448k tons), Narok (314k tons).

## Wheat
- **2023 Area:** 104,440 Ha
- **2023 Production:** 309,492 Tons
- **Trend:** Production declined from 368.7k tons in 2022 due to acreage shifts to maize and Quelea bird menace.

## Irrigated Rice
- **Total Paddy:** 229,064 Tons
- **Mwea Scheme:** 153,654 Tons (Dominant scheme)
- **Net Pay to Plot Holders:** KSh 10.5 Billion total across all schemes.

## Pulses & Legumes
- **Dry Beans:** 860,973 Tons (Increased from 750k in 2022).
- **Green Grams:** 182,260 Tons (Leading Counties: Kitui, Makueni).
- **Cowpeas:** 171,803 Tons.

## Roots & Tubers
- **Irish Potatoes:** 2,309,915 Tons (Leading Counties: Nakuru, Nyandarua, Elgeyo Marakwet).
- **Sweet Potatoes:** 669,100 Tons.
    `
  },
  {
    id: 'DS-HA-015',
    name: 'National Livestock & Dairy Census 2024',
    thrust: 'HA',
    domain: 'Epidemiology',
    category: 'Animals',
    region: 'Kenya',
    type: 'Census Summary',
    size: '5.2 MB',
    date: 'April 2024',
    access: 'Public',
    content: `
# National Livestock & Dairy Census 2024
Comprehensive population and product metrics for the livestock sector.

## Livestock Populations (2023)
- **Cattle:** 21.9 Million (Dairy: 5.5M, Beef: 16.3M)
- **Sheep:** 23.2 Million
- **Goats:** 35.0 Million
- **Camels:** 4.3 Million
- **Poultry (Indigenous):** 54.3 Million

## Dairy Production
- **Total Milk Produced:** 5.3 Billion Kilogrammes
- **Value:** KSh 312.7 Billion
- **Formal Milk Intake:** 806.6 Million Kgs
- **Trend:** 14.8% increase in production attributed to improved rainfall and pasture.

## Meat Production (556.7k Tons Total)
- **Beef:** 237,907 Tons
- **Chevron (Goat):** 77,521 Tons
- **Mutton (Sheep):** 51,691 Tons
- **Poultry Meat:** 93,622 Tons
- **Pork:** 40,056 Tons

## Other Products
- **Eggs:** 194.7 Million Trays
- **Honey:** 17,151 Tons
- **Hides:** 1.3 Million pieces
- **Beehives:** 1.6 Million total (7.4% increase in modern hive types).
    `
  },
  {
    id: 'DS-IA-018',
    name: 'Industrial & Cash Crop Logistics (2024)',
    thrust: 'IA',
    domain: 'Value Chain Development',
    category: 'Finance',
    region: 'Kenya',
    type: 'Logistics Audit',
    size: '4.5 MB',
    date: 'April 2024',
    access: 'Public',
    content: `
# Industrial & Cash Crop Logistics (2024)
Analysis of high-value export crops and processing chains.

## Tea (Major Foreign Exchange Earner)
- **Made Tea Prod:** 570.3 Million Kgs (6.6% increase).
- **Export Earnings:** KSh 180.57 Billion.
- **Pakistan Market:** Accounts for 40% of total export volume.
- **Area:** 227.8 thousand hectares.

## Coffee
- **Clean Coffee Prod:** 48.7 thousand tonnes.
- **Acreage:** 111.9 thousand hectares.
- **Top Exporters:** USA (23.4%), Germany (17.4%), Belgium (10.5%).
- **Domestic Consumption:** Level increased by 23.5% to 2.1 thousand tonnes.

## Sugar Industry
- **Area harvested:** 80.7 thousand hectares.
- **Factory Deliveries:** 5.6 Million tonnes.
- **Imports:** Nearly doubled to 608.2 thousand tonnes to meet local deficit.

## Fiber & Oil Crops
- **Sisal:** 25.6 thousand tonnes produced; exports declined to Nigeria due to forex challenges.
- **Cotton:** Revitalization efforts saw area increase to 12.2 thousand hectares; prod at 3.9k tons.
- **Coconut:** Production reached 81.7 thousand tonnes valued at KSh 9.4 Billion.
- **Macadamia:** 44.4 thousand tonnes (nuts-in-shell). Earnings declined due to low global kernel prices.
    `
  },
  {
    id: 'DS-EA-038',
    name: 'Fisheries & Blue Economy Audit (2021-2023)',
    thrust: 'EA',
    domain: 'Water Conservation',
    category: 'Water',
    region: 'Kenya',
    type: 'Aquatic Database',
    size: '3.1 MB',
    date: 'April 2024',
    access: 'Public',
    content: `
# Fisheries & Blue Economy Audit (2021-2023)

## Production Summary (2023)
- **Total Fish Production:** 161.3 thousand tonnes.
- **Total Value:** KSh 35.9 Billion.
- **Trend:** 7.2% decline in production compared to 2022.

## Source Breakdown
- **Inland Capture (Freshwater):** 121.4 thousand tonnes (56% of total).
  - **Lake Victoria:** 70.3 thousand tonnes (18.6% decline).
  - **Lake Turkana:** 15.9 thousand tonnes.
- **Marine (Artisanal):** 37.0 thousand tonnes.
- **Aquaculture (Fish Farming):** 31.7 thousand tonnes (14% increase).

## Aquaculture Growth
Cage culture now accounts for **73 per cent** of total aquaculture production, driven by higher profitability and concerted government investment.

## Marine Dynamics
Marine artisanal production increased to 37.0 thousand tonnes. Industrial marine catch increased for prawns and deep-water crabs, but decreased for deep-sea longlining.
    `
  },

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
  // --- LIFE WITH PLANTS MANIFESTO ---
  {
    id: 'DS-SA-043',
    name: 'Life with Plants: An EnvirosAgro Perspective',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'Global',
    type: 'Philosophical Manifesto',
    size: '1.8 MB',
    date: 'May 20, 2024',
    access: 'Public',
    content: `
# Life with Plants: An EnvirosAgro Perspective

## 1. Agriculture as Human–Nature Interaction
EnvirosAgro defines agriculture not merely as food production, but as the art and science of structured human interaction with natural resources—including plants, animals, water, soil, air, and energy—guided by the principle of sustainability. This interaction is intentional, reciprocal, and continuous, shaping both human survival and ecological balance.

Plants occupy a central role in this relationship. They are not passive resources, but living systems that interact with humans biologically, socially, spiritually, and technologically. Human civilization itself evolved alongside plants, and sustainability is fundamentally a reflection of how well this relationship is managed.

## 2. Plants as the Foundation of Human Life
Plants are the primary source of human nourishment throughout life. Every culture, economy, and biological system depends on plants either directly or indirectly. Beyond nutrition, plants influence physical health, mental clarity, emotional stability, social organization, and spiritual meaning.

## 3. Three Pathways of Plant Consumption
Human interaction with plants can be understood through three interlinked processes: chemical, spiritual (social agriculture), and technical.

### 3.1 Chemical Consumption
Chemical consumption refers to the biochemical interaction between plant compounds and the human body. Key elements include macronutrients, micronutrients, and phytochemicals. These support growth, immunity, and brain development. Sustainable agricultural practices directly affect human biochemical well-being.

### 3.2 Technical Consumption
Technical consumption involves the methods by which humans prepare, preserve, and transform plants for use. This includes home science, cooking techniques, fermentation, and processing technologies. Sustainable technical practices ensure that plants are consumed with minimal waste and maximum benefit.

### 3.3 Spiritual and Social Consumption (Social Agriculture)
Humans experience an innate spiritual urge to connect with plants, shaped by cultural traditions, rituals, and beliefs. Eating is psychological and social. Shared meals and sacred plants strengthen family bonds and cultural identity, aligning with our Social Agriculture (SA) thrust.

## 4. Plants Beyond Food: Medicine and Consciousness
Plants extend their influence into pharmaceuticals and consciousness modulation. Plant-derived medicines cure diseases and manage pain, while direct plant use can achieve states of stimulation, relaxation, or spiritual elevation.

## 5. Plants as Living Energy Systems
Plants interact with their environment through electrical signals, chemical emissions, and vibrational patterns, generating unique biological waves. This understanding gives rise to the concept of **Plant Wave Technology**.

## 6. Plant Wave Technology
This technology explores how biological signals emitted by plants can be translated into sound, rhythm, and frequency-based experiences. Harmonic patterns derived from plant electrical activity can support healing, meditation, and emotional balance without requiring physical consumption.

## 7. Cultural Context: The Sacred Relationship
### 7.1 The Mugumo Tree (Ficus sycomorus)
Revered by the Kikuyu community as a sacred site for guidance and harmony. Through plant wave technology, its tranquility can be experienced in musical form.
### 7.2 Miraa (Khat)
The biological rhythms of Miraa generate stimulatory wave patterns reflecting its energetic properties.

## 8. Sustainability Through Deep Plant Relationships
True sustainability emerges when humans respect plants as living systems, balance their interactions, and use technology to amplify harmony rather than exploitation.

## 9. Conclusion
Plants feed us, heal us, calm us, and connect us to nature and culture. Agriculture is a sustainable art of coexistence. **Plants do not merely grow for us; they grow with us.**
    `
  },
  // --- INTRODUCTION TO AGRICULTURE CURRICULUM ---
  {
    id: 'DS-SA-042',
    name: 'Introduction to Agriculture: Curriculum Foundations',
    thrust: 'SA',
    domain: 'Philosophy & Education',
    category: 'General',
    region: 'East Africa / Global',
    type: 'Curriculum Note',
    size: '1.2 MB',
    date: 'July 15, 2024',
    access: 'Public',
    content: `
# Introduction to Agriculture: Foundations of Practice

## 1. Definition of Agriculture
Agriculture is defined as the science and art of cultivation of crops and rearing of livestock. It is a fundamental pillar for socioeconomic and healthy futures within agricultural communities.

### 1.1 Agriculture as a Science
As a science, it involves experimentation and the application of scientific knowledge in critical areas:
- **Soil analysis**: Determining nutrient levels, composition, and pH.
- **Control of pests and diseases**: Identifying destructive organisms and implementing protective protocols.
- **Farm machinery and structures**: Engineering efficient infrastructure for production.
- **Crop and livestock breeding**: Enhancing genetic resilience and productivity.

### 1.2 Agriculture as an Art
As an art, it involves the use of learned skills and craftsmanship in:
- **Tilling the land**: Physical preparation of the seedbed.
- **Construction**: Building necessary farm infrastructure.
- **Measurement**: Quantifying inputs, outputs, and land dimensions.
- **Harvesting**: Timely and skillful collection of crops.
- **Feeding and handling of livestock**: Providing optimal care and nutrition.
- **Marketing**: Strategic positioning of goods for trade and consumption.

## 2. Branches of Agriculture
The field is subdivided into several specialized domains:

- **Crop Farming (Arable Farming)**:
  - **Field Crops Cultivation**: Maize, beans, potatoes, coffee, tea, and cotton.
  - **Horticulture**: Growing perishable, high-value crops, including Floriculture (flowers), Olericulture (vegetables), and Pomoculture (fruits).
- **Livestock Farming**:
  - **Pastoralism**: Rearing mammalian livestock such as cattle, sheep, goats, rabbits, pigs, and camels.
  - **Fish Farming (Aquaculture)**: Rearing fish and other aquatic organisms in controlled environments.
  - **Bee Keeping (Apiculture)**: Managing bee colonies in structures known as beehives.
  - **Poultry Keeping**: Rearing domesticated birds for various products.
- **Agricultural Economics**: Allocation of scarce resources (land, labor, capital, management) for production.
- **Agricultural Engineering**: Deals with the design, use, and maintenance of farm tools, machinery, and structures.

## 3. Systems of Farming
- **Extensive System**: Large land area with low investment per unit area. Cheap and requires less labor, but yields lower profit per unit.
- **Intensive Farming**: Maximum utilization of resources with high management level. Can be practiced on limited land and results in high yields.
- **Large Scale Farming**: Farming over 20 hectares, primarily commercial and highly mechanized. Realizes economies of scale.
- **Small Scale Farming**: Typically less than 5 hectares, common among Kenyan farmers due to land availability constraints.

## 4. Methods of Farming
- **Mixed Farming**: Growing crops and keeping livestock on the same land, providing mutual benefits (manure and feed).
- **Nomadic Pastoralism**: Moving animals in search of water and pasture, primarily in arid and semi-arid zones.
- **Shifting Cultivation**: Traditional method where land is abandoned once soil fertility is exhausted, allowing it to rest and regain nutrients.
- **Organic Farming**: Growing crops and rearing livestock without agrochemicals to reduce long-term environmental and health impacts.
- **Agro-Forestry**: Integrating trees and crops on the same land to reduce erosion and improve soil nitrates.

## 5. Importance of Agriculture to the Economy
Agriculture remains the backbone of development by:
- Providing food security and meeting nutritional requirements.
- Creating employment opportunities (direct and indirect).
- Providing raw materials for the industrial sector.
- Earning foreign exchange through exports.
- Providing a market for industrial goods from agro-based industries.
- Generating income for farmers and revenue for governments.
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
Social Influenza Disease is a conceptual framework describing the spread of harmful social beliefs and psychological stressors within human societies.

## 2. Mechanism of Transmission
### 2.1 Language as the Primary Vector
Language—spoken words, narratives, and symbols—is the main carrier of social influenza.

### 2.2 Psychological and Epigenetic Influence
While social influenza does not alter DNA, chronic psychological stress influences epigenetic expression.

## 3. symptoms of SI-D
- Social disorganization and breakdown of trust.
- Tribalism and discrimination.
- Resistance to education and rejection of innovation.
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
    access: 'Public'
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
    access: 'Public'
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
