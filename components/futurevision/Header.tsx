import React from 'react';
import { Rocket } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <Rocket className="mx-auto h-12 w-12 text-green-400" />
      <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">Future Vision</h1>
      <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
        A curated showcase of breakthrough technologies poised to redefine agriculture.
      </p>
    </header>
  );
};