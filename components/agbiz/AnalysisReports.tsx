import React from 'react';
import { motion } from 'framer-motion';
import { analysisReports } from '../../data';

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
          {analysisReports.map((report) => (
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