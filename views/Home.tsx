
import React from 'react';
import { Hero } from '../components/Hero';
import { FrameworkDistinctions } from '../components/FrameworkDistinctions';
import { Cta } from '../components/Cta';
import { PeopleAndCulture } from '../components/PeopleAndCulture';
import { Podcast } from '../components/Podcast';
import { ImpactStats } from '../components/greenlens/ImpactStats';
import { View } from '../types';

export const Home = ({ onNavigate }) => (
  <>
    <Hero onNavigate={onNavigate} />
    <FrameworkDistinctions />
    <Cta 
      title="Ready to dive in?" 
      subtitle="Start your free trial today." 
      buttonText="Get Started" 
      onClick={() => onNavigate(View.KNOWLEDGE, { query: 'Getting Started' })}
    />
    <ImpactStats />
    <Podcast />
    <PeopleAndCulture />
  </>
);
