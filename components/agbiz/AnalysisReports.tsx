import React from 'react';

const reports = [
  {
    title: 'Global Fertilizer Market Outlook 2024',
    description: 'An analysis of supply, demand, and price trends for key nutrients.',
    category: { title: 'Analysis', href: '#' },
    author: {
      name: 'John Carter',
      role: 'Chief Economist',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    title: 'The Rise of Autonomous Tractors',
    description: 'How automation is transforming farm operations and the future of agricultural labor.',
    category: { title: 'AgTech', href: '#' },
    author: {
      name: 'Emily Chen',
      role: 'Technology Analyst',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  {
    title: 'EU Green Deal: Impact on US Agriculture',
    description: 'A breakdown of the EU's new sustainability policies and what they mean for American farmers.',
    category: { title: 'Policy', href: '#' },
    author: {
      name: 'David Miller',
      role: 'Policy Advisor',
      imageUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
  },
];

export const AnalysisReports: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Analysis & Reports</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            In-depth research and expert commentary on the forces shaping agriculture.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {reports.map((report) => (
            <article key={report.title} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <div className="relative w-full h-0 pb-[56.25%] rounded-2xl bg-gray-100 dark:bg-gray-800"></div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <a
                    href={report.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    {report.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {report.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{report.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={report.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {report.author.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{report.author.role}</p>
                  </div>
                </div>
              </article>
          ))}
        </div>
      </div>
    </div>
  );
};