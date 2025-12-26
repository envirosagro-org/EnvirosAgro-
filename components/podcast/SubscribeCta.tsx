
import React from 'react';
import { Mail } from 'lucide-react';

export const SubscribeCta: React.FC = () => {
  return (
    <div className="relative bg-indigo-700 dark:bg-indigo-900/50">
      <div className="absolute inset-0">
        <img className="w-full h-full object-cover" src="/images/podcast/audio-waves.svg" alt="Audio waveform" />
        <div className="absolute inset-0 bg-indigo-700/80 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold font-serif text-white sm:text-4xl">
          <span className="block">Don\'t Miss an Episode.</span>
          <span className="block">Subscribe to Our Podcast.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">
          Get notified when a new episode drops, and get access to exclusive content and behind-the-scenes updates.
        </p>
        <form className="mt-8 sm:flex justify-center">
          <div className="min-w-0 flex-1">
            <label htmlFor="cta-email" className="sr-only">Email address</label>
            <input 
              id="cta-email" 
              type="email" 
              className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white" 
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button 
              type="submit" 
              className="block w-full bg-indigo-500 border border-transparent rounded-md py-3 px-5 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:px-10"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
