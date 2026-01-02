export const FEATURED_FILM = {
    id: 1,
    title: "Roots of Resilience: The Great Green Wall",
    category: "Restoration",
    duration: "1h 24m",
    year: "2023",
    image: "/images/greenlens/great-green-wall.jpg",
    youtubeId: "vG-QZotN6_Q",
    description: "A cinematic journey across the Sahel, following the ambitious African-led initiative to grow an 8,000km natural wonder of the world to combat desertification.",
    synopsis: "The Great Green Wall is an epic ambition to grow an 8,000km natural wonder of the world across the entire width of Africa. Its goal is to provide food, jobs and a future for the millions of people who live in a region on the frontline of climate change. This documentary follows the pioneers working on the ground to transform the Sahel into a green haven, proving that humanity can indeed heal the Earth.",
    impact: "15% Canopy Increase",
    crew: [
      { role: "Director", name: "Amani K." },
      { role: "Cinematography", name: "Liam Sterling" },
      { role: "Sound Design", name: "Echo Collective" },
      { role: "Editor", name: "Jordan Vance" }
    ],
    awards: ["Sundance Grand Jury Prize", "Tribeca Visionary Award"]
  };
  
  export const GALLERY_FILMS = [
    {
      id: 2,
      title: "Bio-char: The Black Gold Rush",
      category: "Soil Health",
      duration: "55m",
      year: "2024",
      image: "/images/greenlens/bio-char.jpg",
      impact: "80% Reduction in Fertilizer Use",
      description: "Investigating the power of bio-char to restore degraded soils and sequester carbon.",
      synopsis: "This film follows a group of farmers and scientists who are leading the charge in the bio-char revolution. From small-scale community projects to large agricultural operations, discover how this ancient soil amendment can boost fertility, reduce the need for chemical fertilizers, and play a crucial role in mitigating climate change. It's a story of innovation, hope, and the power of working with nature.",
      crew: [{ role: "Director", name: "Maya Lin" }],
      awards: ["Green Docs Fest Winner"]
    },
    {
      id: 3,
      title: "Guardians of the Seed",
      category: "Biodiversity",
      duration: "1h 10m",
      year: "2023",
      image: "/images/greenlens/seed-guardians.jpg",
      impact: "Protection of 500+ Heirloom Varieties",
      description: "Meet the farmers and activists saving our agricultural heritage, one seed at a time.",
      synopsis: "In an era of industrialized agriculture, global seed diversity is plummeting. This documentary profiles the dedicated individuals who are building community seed banks, reviving ancient farming practices, and fighting to keep heirloom varieties from extinction. It's a beautiful and urgent call to protect the source of our food.",
      crew: [{ role: "Director", name: "Carlos Suarez" }],
      awards: ["Slow Food Film Festival Selection"]
    },
    {
      id: 4,
      title: "The Flow of Power",
      category: "Water Scarcity",
      duration: "1h 5m",
      year: "2024",
      image: "/images/greenlens/water-rights.jpg",
      impact: "Policy Change Enacted",
      description: "How communities are redefining water rights through conservation.",
      synopsis: "As rivers dry up and glaciers melt, water has become the most valuable commodity on Earth. This film investigates the innovative community-led management systems that are preventing conflict and ensuring water security in the most arid regions of the globe. A story of diplomacy, engineering, and shared survival.",
      crew: [{ role: "Director", name: "James Mwangi" }],
      awards: ["Sundance Impact Nominee"]
    },
    {
      id: 5,
      title: "The Urban Harvest",
      category: "Food Security",
      duration: "38m",
      year: "2024",
      image: "/images/greenlens/the-urban-harvest.jpg",
      impact: "50 Community Gardens",
      description: "The rise of vertical and rooftop farming in modern megacities.",
      synopsis: "By 2050, 70% of the world will live in cities. How will we feed them? This film explores the burgeoning urban agriculture movement, from high-tech vertical farms to community-run rooftop gardens. It showcases the pioneers who are transforming concrete jungles into edible landscapes, creating jobs, and improving food security for all.",
      crew: [{ role: "Director", name: "Lina Chen" }],
      awards: ["Smart Cities Expo Audience Award"]
    }
  ];

  export const DOCS_LIBRARY = [FEATURED_FILM, ...GALLERY_FILMS];