import React from 'react';

export const AgBizNewsletter: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Get AgBiz Weekly in your inbox.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            The best of our analysis and insights, delivered to you every Tuesday.
          </p>
          <form className="mt-10 sm:flex sm:items-center sm:justify-center">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <div className="w-full sm:max-w-xs">
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-800"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto flex-none rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};