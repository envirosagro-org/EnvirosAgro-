import React from 'react';
import { FILM_STRIP_IMAGES } from './data';

export const FilmStrip: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {FILM_STRIP_IMAGES.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-slate-800 sm:w-72 sm:rounded-2xl rotate-2 even:rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
            >
              <img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};