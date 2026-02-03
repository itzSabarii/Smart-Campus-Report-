import React, { useState } from 'react';
import { LogOut, Bell, Search, LayoutGrid, Settings, Menu, X, FileText, ShieldCheck, User, ClipboardList, BarChart3, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export type Role = 'student' | 'admin' | 'official' | 'management';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: Role;
  onLogout: () => void;
  title: string;
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

const roleBrand = {
  student: { name: 'Student Portal', color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
  admin: { name: 'Admin Console', color: 'bg-indigo-600', hover: 'hover:bg-indigo-700' },
  official: { name: 'Service Hub', color: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
  management: { name: 'Management Suite', color: 'bg-purple-600', hover: 'hover:bg-purple-700' },
};

const roleNavItems: Record<Role, { label: string; icon: React.ReactNode; id: string }[]> = {
  student: [
    { label: 'Dashboard', icon: <LayoutGrid size={20} />, id: 'home' },
    { label: 'My Reports', icon: <FileText size={20} />, id: 'reports' },
    { label: 'Notifications', icon: <Bell size={20} />, id: 'notifications' },
    { label: 'Profile', icon: <User size={20} />, id: 'profile' },
  ],
  admin: [
    { label: 'Dashboard', icon: <LayoutGrid size={20} />, id: 'home' },
    { label: 'All Reports', icon: <FileText size={20} />, id: 'all-reports' },
    { label: 'Assign Tasks', icon: <ShieldCheck size={20} />, id: 'assign' },
    { label: 'Notifications', icon: <Bell size={20} />, id: 'notifications' },
    { label: 'Profile', icon: <User size={20} />, id: 'profile' },
  ],
  official: [
    { label: 'Dashboard', icon: <LayoutGrid size={20} />, id: 'home' },
    { label: 'Assigned Tasks', icon: <ClipboardList size={20} />, id: 'tasks' },
    { label: 'Notifications', icon: <Bell size={20} />, id: 'notifications' },
    { label: 'Profile', icon: <User size={20} />, id: 'profile' },
  ],
  management: [
    { label: 'Dashboard', icon: <LayoutGrid size={20} />, id: 'home' },
    { label: 'Analytics', icon: <BarChart3 size={20} />, id: 'analytics' },
    { label: 'Escalations', icon: <AlertTriangle size={20} />, id: 'escalations' },
    { label: 'Notifications', icon: <Bell size={20} />, id: 'notifications' },
    { label: 'Profile', icon: <User size={20} />, id: 'profile' },
  ],
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  role, 
  onLogout, 
  title, 
  activeScreen, 
  onScreenChange 
}) => {
  const brand = roleBrand[role];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = roleNavItems[role];

  const handleNavClick = (id: string) => {
    if (onScreenChange) {
      onScreenChange(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-neutral-200 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${brand.color}`}>
              <LayoutGrid size={18} />
            </div>
            <span className="font-bold text-neutral-900 tracking-tight text-lg">Smart Campus</span>
          </div>
          <button className="lg:hidden p-2 text-neutral-400" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem 
              key={item.id}
              icon={item.icon} 
              label={item.label} 
              active={activeScreen === item.id}
              onClick={() => handleNavClick(item.id)}
              badge={item.id === 'notifications' ? '3' : undefined}
            />
          ))}
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">System</div>
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeScreen === 'settings'} 
            onClick={() => handleNavClick('settings')} 
          />
          <NavItem 
            icon={<ShieldCheck size={20} />} 
            label="Privacy Policy" 
            active={activeScreen === 'privacy'} 
            onClick={() => handleNavClick('privacy')} 
          />
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden w-full">
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-all"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-neutral-900 truncate max-w-[200px] md:max-w-none">{title}</h2>
          </div>

          <div className="flex items-center gap-3 md:pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-neutral-900 leading-tight">Alex Johnson</p>
              <p className="text-[10px] text-neutral-500 leading-tight font-bold uppercase tracking-wider">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-neutral-200 overflow-hidden ring-2 ring-neutral-100">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} 
                alt="Avatar" 
              />
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-4 md:p-8 bg-[#F8FAFC]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, badge, onClick }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={clsx(
      "flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all cursor-pointer group",
      active 
        ? "bg-neutral-900 text-white shadow-lg shadow-neutral-900/10" 
        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
    )}
  >
    <div className="flex items-center gap-3 pointer-events-none">
      <span className={clsx(active ? "text-white" : "text-neutral-400 group-hover:text-neutral-900")}>
        {icon}
      </span>
      <span className="font-semibold text-sm">{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center pointer-events-none">
        {badge}
      </span>
    )}
  </button>
);
