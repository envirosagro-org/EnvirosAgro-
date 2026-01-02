import React from 'react';
import { motion } from 'framer-motion';

const reports = [
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const AnalysisReports: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:mx-0 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">In-Depth Analysis & Reports</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Explore our expert commentary on the critical forces shaping the future of agriculture.
          </p>
        </motion.div>
        <motion.div 
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reports.map((report) => (
            <motion.article 
              key={report.title} 
              className="flex flex-col items-start justify-between bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl"
              variants={itemVariants}
            >
              <div className="relative w-full">
                <img src={report.imageUrl} alt={report.title} className="aspect-[16/9] w-full object-cover" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl p-6 flex flex-col items-start h-full">
                <div className="flex items-center gap-x-4 text-xs">
                  <span
                    className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${report.category.color}`}
                  >
                    {report.category.title}
                  </span>
                </div>
                <div className="group relative flex-grow">
                  <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {report.title}
                    </a>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{report.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4 w-full pt-6 border-t border-gray-200 dark:border-gray-700">
                  <img src={report.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                        {report.author.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{report.author.role}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};