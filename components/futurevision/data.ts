export const VISIONS = [
    {
        id: 'biorobotic-pollinators',
        title: 'Bio-Robotic Pollinators',
        category: 'Bio-Integration',
        icon: 'Bee',
        themeColor: 'yellow',
        videoUrl: 'https://www.youtube.com/embed/p7s-uX5pIeE',
        imageUrl: 'https://images.unsplash.com/photo-1620714223083-a57053673398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        stats: [
            { label: 'Pollination Efficiency', description: 'increase in controlled environments' },
            { label: 'Operating Cost', description: 'compared to manual pollination' },
            { label: 'Projected Adoption', description: 'for large-scale commercial farms' },
        ],
        impact: {
            2025: {
                description: "Early-stage prototypes are being tested in controlled lab environments. Focus is on flight stability, flower recognition, and battery life. Initial results show promise but highlight challenges in scalability and resilience to weather.",
                stats: {
                    'Pollination Efficiency': '+15%',
                    'Operating Cost': '+200%',
                    'Projected Adoption': 'R&D Phase',
                }
            },
            2035: {
                description: "Commercial deployments are becoming common in high-value indoor farms (e.g., tomatoes, strawberries). Drones are smaller, more energy-efficient, and operate in coordinated swarms. Regulatory frameworks for outdoor use are in development.",
                stats: {
                    'Pollination Efficiency': '+75%',
                    'Operating Cost': '-30%',
                    'Projected Adoption': 'Niche Commercial',
                }
            },
            2050: {
                description: "Bio-robotic pollinators are a standard agricultural tool, fully integrated with farm management systems. They play a critical role in global food security, especially for crops where natural pollinators have declined. Drones are now biodegradable.",
                stats: {
                    'Pollination Efficiency': '+98%',
                    'Operating Cost': '-60%',
                    'Projected Adoption': 'Widespread Use',
                }
            }
        }
    },
    {
        id: 'synthetic-biology',
        title: 'Synthetic Biology Fertilizers',
        category: 'Eco-Sustain',
        icon: 'FlaskConical',
        themeColor: 'sky',
        videoUrl: 'https://www.youtube.com/embed/jlACgT3A3eM',
        imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3a8a09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        stats: [
            { label: 'Fertilizer Reduction', description: 'potential to replace synthetic nitrogen' },
            { label: 'GHG Emission Cut', description: 'from fertilizer production & use' },
            { label: 'Soil Health', description: 'increase in beneficial microbial activity' },
        ],
        impact: {
            2025: {
                description: "Field trials are underway for the first generation of engineered microbes. The focus is on ensuring containment and studying long-term effects on soil ecosystems. Early results show a 20% reduction in the need for external fertilizers.",
                stats: {
                    'Fertilizer Reduction': '20%',
                    'GHG Emission Cut': '15%',
                    'Soil Health': '+5%',
                }
            },
            2035: {
                description: "Smart fertilizers that respond to plant signals are commercially available for major cereal crops like corn and wheat. Regulatory approval is widespread in several key agricultural regions. Farms are reporting significant cost savings.",
                stats: {
                    'Fertilizer Reduction': '80%',
                    'GHG Emission Cut': '60%',
                    'Soil Health': '+40%',
                }
            },
            2050: {
                description: "Synthetic biology has revolutionized fertilization. Most farms use a subscription service for customized microbes tailored to their specific soil and crop needs. This has led to a dramatic decrease in water pollution and a restoration of soil biodiversity.",
                stats: {
                    'Fertilizer Reduction': '99%',
                    'GHG Emission Cut': '90%',
                    'Soil Health': '+75%',
                }
            }
        }
    },
    {
        id: 'atmospheric-water-gens',
        title: 'Atmospheric Water Generators',
        category: 'Tech-Synthetics',
        icon: 'Cloudy',
        themeColor: 'indigo',
        videoUrl: 'https://www.youtube.com/embed/eOcy0-cnY-k',
        imageUrl: 'https://images.unsplash.com/photo-1509316976299-ffb6cf9e9f18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        stats: [
            { label: 'Water Generation', description: 'per mid-size commercial unit' },
            { label: 'Energy Source', description: 'fully renewable and off-grid capable' },
            { label: 'Arid Viability', description: 'operational in desert environments' },
        ],
        impact: {
            2025: {
                description: "Early models are being deployed in disaster relief and for small-scale, high-value crops in desert regions. The technology is effective but expensive, with high energy consumption per liter of water generated.",
                stats: {
                    'Water Generation': '200 L/day',
                    'Energy Source': 'Solar/Grid',
                    'Arid Viability': '35% Humidity',
                }
            },
            2035: {
                description: "Next-generation materials and improved solar cell efficiency have made AWGs economically viable for medium-scale agriculture in arid countries. They are often used to supplement traditional irrigation, reducing reliance on groundwater.",
                stats: {
                    'Water Generation': '2,000 L/day',
                    'Energy Source': 'Solar',
                    'Arid Viability': '20% Humidity',
                }
            },
            2050: {
                description: "Large-scale AWG farms, covering vast areas with moisture-harvesting surfaces, are transforming desert landscapes into arable land. The technology is now a key component of climate adaptation strategies globally.",
                stats: {
                    'Water Generation': '50,000 L/day',
                    'Energy Source': 'Next-Gen Solar',
                    'Arid Viability': '10% Humidity',
                }
            }
        }
    }
];