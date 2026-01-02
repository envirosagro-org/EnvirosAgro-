import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const featuredArticle = {
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

export const FeaturedArticle: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative h-[400px] lg:h-full w-full rounded-3xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover"
              src={featuredArticle.imageUrl}
              alt="Farmer in a field examining crops"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center gap-4">
                <img src={featuredArticle.author.avatarUrl} alt={featuredArticle.author.name} className="w-12 h-12 rounded-full border-2 border-white" />
                <div>
                  <p className="font-semibold text-white">{featuredArticle.author.name}</p>
                  <p className="text-sm text-white/80">{featuredArticle.author.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col justify-center"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="text-sm font-bold uppercase tracking-wider text-agro-500 dark:text-agro-400">{featuredArticle.category}</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl leading-tight">
              {featuredArticle.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {featuredArticle.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{featuredArticle.stats.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{featuredArticle.stats.date}</span>
              </div>
            </div>
            <div className="mt-10">
              <a
                href={featuredArticle.link}
                className="inline-flex items-center gap-2 rounded-lg bg-agro-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-agro-700 transition-all transform hover:scale-105"
              >
                Read the full article <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};