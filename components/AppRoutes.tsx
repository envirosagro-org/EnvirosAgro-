
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import NetworkInputHubSkeleton from './skeletons/NetworkInputHubSkeleton';

// Lazy-loaded components
const NetworkInputHub = React.lazy(() => import('./NetworkInputHub'));
const Auth = React.lazy(() => import('./Auth'));
// ... (import all other lazy-loaded components)

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <NetworkInputHubSkeleton />;
  }

  return (
    <Router>
      <Suspense fallback={<NetworkInputHubSkeleton />}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Auth />} />
          <Route path="/" element={user ? <NetworkInputHub /> : <Navigate to="/login" />} />
          {/* Add all other routes here */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
