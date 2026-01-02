import { ShoppingCart, Package, Factory, Truck, Store, Search, Leaf, FileText, CheckCircle2, Scale, Scan, Microscope, Recycle, Sun, RefreshCw } from 'lucide-react';

export const SUPPLY_CHAIN_STAGES = [
  {
    id: 1,
    title: "Strategic Purchasing",
    icon: ShoppingCart,
    color: "blue",
    stats: "Vol: 500k Tons",
    description: "Procurement of raw materials from registered farmer groups using fair-trade protocols and smart contracts.",
    modalContent: {
        title: "Strategic Purchasing Protocol",
        features: [
            { icon: Search, title: "1. Demand Analysis", desc: "AI-driven forecasting utilizing market trends and historical data to predict needs." },
            { icon: Leaf, title: "2. Supplier Vetting", desc: "Rigorous verification of ES-G compliance, labor practices, and environmental impact." },
            { icon: FileText, title: "3. Smart Contracts", desc: "Automated, blockchain-backed agreements ensure transparent and timely payments." },
            { icon: CheckCircle2, title: "4. Fulfillment & Logistics", desc: "Automated orders trigger logistics workflows for efficient pickup and delivery." },
        ],
        cta: {
            label: "Register as Vendor",
            view: 'PARTNERSHIPS'
        }
    }
  },
  {
    id: 2,
    title: "Aggregation & Quality",
    icon: Package,
    color: "amber",
    stats: "98% Purity",
    description: "Centralized collection points where produce is graded, cleaned, and batched for processing.",
    modalContent: {
        title: "Quality Standards",
        features: [
            { icon: Scale, title: "Digital Weighing", desc: "IoT-enabled scales sync with our ledger for transparent, instant payment calculations." },
            { icon: Scan, title: "Optical Grading", desc: "High-resolution AI cameras sort produce by size, color, and ripeness, ensuring premium quality." },
            { icon: Microscope, title: "On-site Labs & Audits", desc: "Mobile testing units verify purity and safety, with results logged on the blockchain." },
        ],
        cta: {
            label: "View Quality Certifications",
            view: 'SUSTAINABILITY_FRAMEWORK'
        }
    }
  },
  {
    id: 3,
    title: "Sustainable Processing",
    icon: Factory,
    color: "slate",
    stats: "Zero Waste",
    description: "Value addition facilities transforming raw inputs into shelf-stable goods with minimal environmental footprint.",
    modalContent: {
        title: "Sustainable Processing",
        features: [
            { icon: Recycle, title: "Zero Waste Production", desc: "All byproducts are repurposed; husks and shells are converted into energy briquettes." },
            { icon: Sun, title: "Renewable Energy", desc: "Facilities are powered by on-site solar arrays and biomass generators." },
            { icon: RefreshCw, title: "Water Recycling", desc: "Advanced filtration systems purify and reuse over 90% of water used in processing." },
        ],
        cta: {
            label: "Virtual Factory Tour",
            view: 'SMART_FARM_VR'
        }
    }
  },
  {
    id: 4,
    title: "Green Logistics",
    icon: Truck,
    color: "green",
    stats: "Fleet: 50 EVs",
    description: "Low-carbon transportation network optimizing routes from hubs to markets using live tracking.",
    modalContent: {
        title: "Green Logistics",
        isMap: true,
        stats: [
            { value: "50", label: "EVs in Fleet" },
            { value: "-25%", label: "Carbon Reduction" },
            { value: "99.8%", label: "On-Time Delivery" },
        ],
        cta: {
            label: "Open Fleet Dashboard",
            view: 'DASHBOARD'
        }
    }
  },
  {
    id: 5,
    title: "Market Distribution",
    icon: Store,
    color: "rose",
    stats: "Global Reach",
    description: "Delivering finished products to retailers, wholesalers, and direct consumers with full traceability.",
    modalContent: {
        title: "Global Distribution",
        isMap: true,
        stats: [
            { value: "7", label: "Continents" },
            { value: "120+", label: "Countries" },
            { value: "9,500+", label: "Retail Partners" },
        ],
        cta: {
            label: "View Live Prices & Market Data",
            view: 'AGBIZ_WEEKLY'
        }
    }
  }
];