import React from 'react';

export const CtaSection: React.FC = () => {
  return (
    <div className="bg-sky-700">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join us in shaping the future of agriculture.
          </h2>
          <p className="mt-6 text-lg leading-8 text-sky-100">
            Whether you are a researcher, a farmer, a policymaker, or a concerned citizen, you have a role to play.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-sky-700 shadow-sm hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Partner With Us
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Support Our Work <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};