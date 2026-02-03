import React, { useState } from 'react';
import { LandingPage } from '@/app/components/LandingPage';
import { LoginPage } from '@/app/components/LoginPage';
import { StudentDashboard } from '@/app/components/StudentDashboard';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { OfficialDashboard } from '@/app/components/OfficialDashboard';
import { ManagementDashboard } from '@/app/components/ManagementDashboard';
import { Toaster } from 'sonner';
import { Role } from '@/app/components/Layout';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setView('login');
  };

  const handleLogin = () => {
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('landing');
    setSelectedRole(null);
  };

  const renderView = () => {
    if (view === 'landing') {
      return <LandingPage onSelectRole={handleRoleSelect} />;
    }

    if (view === 'login' && selectedRole) {
      return (
        <LoginPage 
          role={selectedRole} 
          onLogin={handleLogin} 
          onBack={() => setView('landing')} 
        />
      );
    }

    if (view === 'dashboard' && selectedRole) {
      switch (selectedRole) {
        case 'student':
          return <StudentDashboard onLogout={handleLogout} />;
        case 'admin':
          return <AdminDashboard onLogout={handleLogout} />;
        case 'official':
          return <OfficialDashboard onLogout={handleLogout} />;
        case 'management':
          return <ManagementDashboard onLogout={handleLogout} />;
        default:
          return <LandingPage onSelectRole={handleRoleSelect} />;
      }
    }

    return <LandingPage onSelectRole={handleRoleSelect} />;
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {renderView()}
      <Toaster position="top-right" />
    </div>
  );
}
