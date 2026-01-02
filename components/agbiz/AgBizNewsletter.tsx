import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

export const AgBizNewsletter: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 py-16 sm:py-24">
       <div className="absolute inset-0 overflow-hidden -z-1">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900/50"></div>
         <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white dark:from-gray-900 to-transparent"></div>
         <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
       </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get AgBiz Weekly In Your Inbox
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-gray-300">
            The best of our analysis and insights, delivered to you every Tuesday morning.
          </p>
          <form className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-agro-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-agro-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>

          <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-5 text-gray-400">
            We care about your data. Read our <a href="#" className="underline">privacy policy</a>.
          </p>
          
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#4f46e5" />
                <stop offset={1} stopColor="#3b82f6" />
              </radialGradient>
            </defs>
          </svg>

        </motion.div>
      </div>
    </div>
  );
};