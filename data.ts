import { TrendingUp, Landmark, Cpu, PenSquare } from 'lucide-react';

export const agBizFeatures = [
  {
    name: 'Market Trends',
    description: 'Stay ahead of commodity prices, futures, and global market shifts.',
    icon: TrendingUp,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20'
  },
  {
    name: 'Policy & Regulation',
    description: 'Understand how new legislation and trade agreements impact your business.',
    icon: Landmark,
    color: 'text-green-400',
    bg: 'bg-green-900/20'
  },
  {
    name: 'AgTech Insights',
    description: 'The latest on venture capital, startups, and technology disrupting the industry.',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-900/20'
  },
  {
    name: 'Expert Analysis',
    description: 'In-depth commentary from leading agricultural economists and analysts.',
    icon: PenSquare,
    color: 'text-amber-400',
    bg: 'bg-amber-900/20'
  },
];

export const featuredArticle = {
  category: 'Deep Dive',
  title: 'Navigating the Carbon Market: A Guide for Modern Farmers',
  excerpt: 'Carbon credits present a significant new revenue stream for farmers, but the market is notoriously complex. This guide breaks down the core opportunities, potential pitfalls, and strategic steps for successfully participating in agricultural carbon programs.',
  author: {
    name: 'Dr. Evelyn Reed',
    role: 'Agricultural Economist',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  stats: {
    readTime: '12 min read',
    date: 'October 26, 2023',
  },
  imageUrl: 'https://images.unsplash.com/photo-1563514227-925955360679?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
  link: '#',
};

export const marketBriefingStats = [
  { name: 'Corn Futures (Dec)', value: '$5.48', change: '+0.37%', changeType: 'increase' },
  { name: 'Soybean Futures (Nov)', value: '$13.21', change: '-0.23%', changeType: 'decrease' },
  { name: 'Wheat Futures (Dec)', value: '$7.60', change: '+1.06%', changeType: 'increase' },
  { name: 'Live Cattle (Dec)', value: '$1.85/lb', change: '-0.54%', changeType: 'decrease' },
];

export const analysisReports = [
  {
    title: 'Global Fertilizer Market Outlook 2024',
    description: 'An in-depth analysis of supply, demand, and price trends for key nutrients shaping the upcoming year.',
    category: { title: 'Market Analysis', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
    author: {
      name: 'John Carter',
      role: 'Chief Economist',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    imageUrl: 'https://images.unsplash.com/photo-1612454556949-540804d04130?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
  },
  {
    title: 'The Rise of Autonomous Tractors',
    description: 'How automation is transforming farm operations, addressing labor shortages, and the future of agricultural work.',
    category: { title: 'AgTech', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' },
    author: {
      name: 'Emily Chen',
      role: 'Technology Analyst',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    imageUrl: 'https://images.unsplash.com/photo-1605152276396-856858641434?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
  },
  {
    title: 'EU Green Deal: Impact on US Agriculture',
    description: "A breakdown of the EU's Farm to Fork strategy and what it means for American exports and farming practices.",
    category: { title: 'Policy', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    author: {
      name: 'David Miller',
      role: 'Policy Advisor',
      imageUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    imageUrl: 'https://images.unsplash.com/photo-1587984829813-582b305d2f63?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
  },
];