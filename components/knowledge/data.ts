
export const ARTICLES = [
    {
        id: 1,
        category: "Soil Health",
        title: "The Living Soil: An Introduction to Mycorrhizal Fungi",
        summary: "Discover the symbiotic relationship between plants and fungi that forms the foundation of a thriving agricultural ecosystem. Learn how to cultivate this vital connection.",
        imageUrl: "https://images.unsplash.com/photo-1592150621124-3c47ad43c316?w=800",
        readingTime: "12 min read",
        content: `
            <h2 class="text-2xl font-bold mb-4">The Underground Network</h2>
            <p class="mb-6">Mycorrhizal fungi are not just passive inhabitants of the soil; they are active partners in plant growth. These fungi form a vast network of tiny threads called hyphae that extend far beyond the reach of plant roots, effectively increasing the root surface area by hundreds or even thousands of times.</p>
            <h3 class="text-xl font-bold mb-3">Key Benefits:</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Nutrient Acquisition:</strong> Hyphae excel at extracting phosphorus, nitrogen, and micronutrients from the soil and delivering them to the host plant.</li>
                <li><strong>Water Access:</strong> In times of drought, these fungal networks can access water in deep soil pores that roots cannot reach.</li>
                <li><strong>Soil Structure:</strong> Fungi produce glomalin, a biological "glue" that helps bind soil particles together into stable aggregates, improving aeration and drainage.</li>
                <li><strong>Pathogen Protection:</strong> A healthy mycorrhizal colony can physically block and chemically repel soil-borne diseases.</li>
            </ul>
            <p class="italic border-l-4 border-agro-500 pl-4 py-2 bg-agro-50 dark:bg-agro-900/20">"By fostering these fungal relationships, farmers can reduce their reliance on synthetic fertilizers and build a more resilient production system."</p>
        `
    },
    {
        id: 2,
        category: "Water Management",
        title: "Keyline Design: Shaping the Land to Hold Water",
        summary: "An in-depth guide to the principles of keyline design, a landscape modification technique that maximizes water retention and distribution across your farm.",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        readingTime: "18 min read",
        content: `
            <h2 class="text-2xl font-bold mb-4">Gravity-Powered Hydrology</h2>
            <p class="mb-6">Developed by P.A. Yeomans in Australia, Keyline Design is a system of landscape planning that uses the natural topography to capture, store, and spread water. The goal is to move water from the 'valleys' (where it concentrates and causes erosion) to the 'ridges' (where it is typically scarce).</p>
            <h3 class="text-xl font-bold mb-3">The Scale of Permanence:</h3>
            <p class="mb-4">Keyline design prioritizes interventions based on their longevity and difficulty to change:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Climate (Most permanent)</li>
                <li>Land Shape</li>
                <li>Water Supply</li>
                <li>Roads & Infrastructure</li>
                <li>Trees & Fencing</li>
                <li>Soil (Least permanent, easiest to improve)</li>
            </ol>
            <p>Implementing Keyline cultivation patterns can transform a farm's water-holding capacity, turning 'flashy' runoff into stable soil moisture.</p>
        `
    },
    {
        id: 3,
        category: "Integrated Pest Management",
        title: "Attracting Beneficial Insects: Your Farm's Natural Pest Control",
        summary: "Learn how to create habitats and plant species that attract predatory insects, reducing the need for chemical pesticides and fostering a balanced ecosystem.",
        imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800",
        readingTime: "15 min read",
        content: `
            <h2 class="text-2xl font-bold mb-4">Bio-Control in Action</h2>
            <p class="mb-6">Instead of reaching for a sprayer, smart farmers are designing their landscapes to host an army of beneficial insects. Ladybugs, lacewings, hoverflies, and parasitic wasps are highly efficient predators that can keep pest populations below economic thresholds.</p>
            <h3 class="text-xl font-bold mb-3">Top Attractor Plants:</h3>
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-earth-50 dark:bg-earth-800 p-4 rounded-xl border border-earth-100 dark:border-earth-700 text-center">
                    <span class="font-bold block">Yarrow</span>
                    <span class="text-xs">Attracts Ladybugs</span>
                </div>
                <div class="bg-earth-50 dark:bg-earth-800 p-4 rounded-xl border border-earth-100 dark:border-earth-700 text-center">
                    <span class="font-bold block">Dill & Fennel</span>
                    <span class="text-xs">Attracts Hoverflies</span>
                </div>
            </div>
            <p>By providing a continuous source of nectar and pollen (refugia), you ensure these beneficial insects remain on your farm throughout the growing season.</p>
        `
    },
    {
        id: 4,
        category: "Agroforestry",
        title: "Silvopasture: Integrating Trees, Forage, and Livestock",
        summary: "Explore the ancient practice of silvopasture, a method of combining forestry and grazing to create a mutually beneficial and highly productive system.",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        readingTime: "20 min read",
        content: `
            <h2 class="text-2xl font-bold mb-4">Multi-Tiered Production</h2>
            <p class="mb-6">Silvopasture is the intentional integration of trees, forage plants, and livestock. It is one of the most effective ways to sequester carbon while maintaining agricultural output. Unlike traditional open grazing, silvopasture provides shade for animals, reducing heat stress and improving weight gain.</p>
            <h3 class="text-xl font-bold mb-3">System Dynamics:</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Tree Canopy:</strong> Provides timber, fruit, or fodder and manages the microclimate.</li>
                <li><strong>Forage Layer:</strong> High-quality grasses and legumes thrive in the filtered light.</li>
                <li><strong>Livestock:</strong> Manage the vegetation and provide nutrient cycling through manure.</li>
            </ul>
            <p>This integrated approach results in a more diverse income stream and a landscape that is significantly more resilient to climate extremes.</p>
        `
    },
];
