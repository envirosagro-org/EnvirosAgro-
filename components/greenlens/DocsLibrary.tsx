import React from 'react';

const documentaries = [
  {
    title: 'Harvest of the Future',
    description: 'How technology is transforming the way we grow food.',
    imageUrl: 'https://images.unsplash.com/photo-1627920769854-37a86e961440?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    title: 'Guardians of the Bees',
    description: 'A look into the critical role of pollinators and the fight to save them.',
    imageUrl: 'https://images.unsplash.com/photo-1533231043187-a64015688d3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    title: 'The Water Guardians',
    description: 'Innovative solutions for water conservation in agriculture.',
    imageUrl: 'https://images.unsplash.com/photo-1596649514493-a09a5286b24f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    title: 'From Seed to Supermarket',
    description: 'Tracing the journey of our food from the farm to your table.',
    imageUrl: 'https://images.unsplash.com/photo-1578839017814-1b1d10a2f447?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  }
];

export const DocsLibrary: React.FC = () => {
  return (
    <div className="bg-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">From the Library</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Explore our collection of stories about the people, ideas, and technologies shaping the future of food.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {documentaries.map((doc) => (
            <article
              key={doc.title}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img src={doc.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                  {doc.title}
                </a>
              </h3>
              <p className="text-sm text-slate-400">{doc.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};