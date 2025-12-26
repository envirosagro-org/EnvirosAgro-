import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import { Hero } from './components/Hero';
import { FrameworkDistinctions } from './components/FrameworkDistinctions';
import { Cta } from './components/Cta';
import { PeopleAndCulture } from './components/PeopleAndCulture';
import { Footer } from './components/Footer';
import { Podcast } from './components/Podcast';
import { ImpactStats } from './components/greenlens/ImpactStats';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Dashboard } from './components/Dashboard';
import { CropDoctor } from './components/CropDoctor';
import { FarmScout } from './components/FarmScout';
import { SmartFarmVR } from './components/SmartFarmVR';
import { SafeHarvest } from './components/SafeHarvest';
import { ProfessionalView } from './components/professional/ProfessionalView';
import { ResilienceView } from './components/professional/ResilienceView';
import { Thrusts } from './components/five-thrusts/Thrusts';
import { View } from './types';

const Home = ({ onNavigate }) => (
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

const NotFound = () => (
  <div className="h-screen flex items-center justify-center text-white text-4xl">Not Found</div>
);

function App() {
  const navigate = useNavigate();

  const onNavigate = (view: View, params?: any) => {
    const path = view === View.HOME ? '/' : `/${view.toLowerCase().replace(/_/g, '-')}`;
    navigate(path, { state: params });
  };

  return (
    <main>
      <ScrollToTop />
      <Navbar onNavigate={onNavigate} />
      <Routes>
        <Route path="/" element={<Home onNavigate={onNavigate} />} />
        <Route path="/home" element={<Home onNavigate={onNavigate} />} />
        <Route path="/dashboard" element={<Dashboard onNavigate={onNavigate} />} />
        <Route path="/crop-doctor" element={<CropDoctor onNavigate={onNavigate} />} />
        <Route path="/farm-scout" element={<FarmScout onNavigate={onNavigate} />} />
        <Route path="/smart-farm-vr" element={<SmartFarmVR />} />
        <Route path="/safe-harvest" element={<SafeHarvest onNavigate={onNavigate} />} />
        <Route path="/professional" element={<ProfessionalView onNavigate={onNavigate} />} />
        <Route path="/resilience" element={<ResilienceView onNavigate={onNavigate} />} />
        <Route path="/five-thrusts" element={<Thrusts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
