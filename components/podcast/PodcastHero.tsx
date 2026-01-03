import React from 'react';
import { HERO_IMAGE } from './data';

export const PodcastHero: React.FC = () => {
  return (
    <div className="relative bg-gray-800 py-20 sm:py-32">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={HERO_IMAGE}
          alt="Podcast background"
        />
        <div className="absolute inset-0 bg-gray-800/80" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Agri-Innovators</h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Tune into conversations with the brightest minds in agriculture, exploring the trends, tech, and policies shaping our food future.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
            Listen to Latest Episode
          </button>
          <button className="text-sm font-semibold leading-6 text-white">Subscribe <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
};