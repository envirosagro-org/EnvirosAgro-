import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  'https://images.unsplash.com/photo-1580910223797-9099403d15a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  'https://images.unsplash.com/photo-1621939512495-4c8a245d6232?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  'https://images.unsplash.com/photo-1615759910381-2b66a8a3a2a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
];

export const FilmStrip: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {images.map((src, index) => (
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