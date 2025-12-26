'use client';

import React, { useState } from 'react';
import { DOCS_LIBRARY, FEATURED_FILM, CATEGORIES } from '@/components/greenlens/data';
import { Film } from 'lucide-react';
import Link from 'next/link';

const FilmCard = ({ film }: { film: typeof DOCS_LIBRARY[0] }) => (
  <div className="group relative border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div className="relative h-64 w-full overflow-hidden bg-white">
      <img
        src={film.image}
        alt={film.title}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
    <div className="p-4 bg-white dark:bg-gray-900">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            <Link href={`/greenlens/film/${film.id}`}>
                <span className="absolute inset-0" />
                {film.title}
            </Link>
        </h3>
        <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400 font-medium">{film.category}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{film.description}</p>
    </div>
  </div>
);


export default function GreenLensPage() {
  const [filter, setFilter] = useState('All');

  const filteredDocs = filter === 'All' ? DOCS_LIBRARY : DOCS_LIBRARY.filter(d => d.category === filter);

  return (
    <div className="bg-earth-50 dark:bg-earth-950">
      {/* Hero Section for Featured Film */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={FEATURED_FILM.image}
            alt={FEATURED_FILM.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold font-serif tracking-tight text-white sm:text-5xl lg:text-6xl">{FEATURED_FILM.title}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">{FEATURED_FILM.description}</p>
          <div className="mt-10">
            <Link
              href={`/greenlens/film/${FEATURED_FILM.id}`}
              className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Watch the Film
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-800 pb-6">
          <h2 className="text-3xl font-bold font-serif tracking-tight text-gray-900 dark:text-white sm:text-4xl">Film Library</h2>
        </div>

        <section aria-labelledby="library-heading" className="pt-6 pb-24">
          <h2 id="library-heading" className="sr-only">
            Films
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                        type="button"
                        onClick={() => setFilter(category)}
                        className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === category ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Film grid */}
            <div className="lg:col-span-3">
              {filteredDocs.length > 0 ? (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredDocs.map((film) => (
                    <FilmCard key={film.id} film={film} />
                  ))}
                </div>
              ) : (
                 <div className="text-center py-16">
                    <Film className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No films found</h3>
                    <p className="mt-1 text-sm text-gray-500">No films match the selected category.</p>
                 </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
