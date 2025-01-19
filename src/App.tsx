import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ValidatorMetrics } from './pages/ValidatorMetrics';
import { SetupWizard } from './pages/SetupWizard';
import { StakingPage } from './pages/StakingPage';
import MetricsPage from './pages/MetricsPage';
import { DevicePairingPage } from './pages/DevicePairingPage';
import { DocsPage } from './pages/DocsPage';
import GlobalManagementPage from './pages/GlobalManagementPage';
import { Dashboard } from './pages/Dashboard';
import { DeviceList } from './components/DeviceList';
import { DeviceDetail } from './components/DeviceDetail';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AuthForm from './components/Auth/AuthForm';
import { AuthProvider } from './contexts/AuthContext';
import StakingDione from './pages/StakingDione'
import { DioneProvider, useDione } from "./contexts/DioneContext";

export default function App() {

  return (
    <AuthProvider>
      <DioneProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/metrics" element={<ValidatorMetrics />} />
                  <Route path="/setup" element={<SetupWizard />} />
                  <Route path="/energy" element={<MetricsPage />} />
                  <Route path="/staking" element={<StakingPage />} />
                  <Route path="/pair" element={<DevicePairingPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                  <Route path="/management" element={<GlobalManagementPage />} />
                  <Route path="/staking-dione" element={<StakingDione />} />
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DeviceList />} />
                    <Route path="device/:id" element={<DeviceDetail />} />
                  </Route>
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router></DioneProvider>
    </AuthProvider> 
  );
}