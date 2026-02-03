import React from 'react';
import { User, ShieldCheck, HardHat, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Role } from '@/app/App';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface LandingPageProps {
  onSelectRole: (role: Role) => void;
}

const roles: { id: Role; title: string; desc: string; icon: React.ReactNode; image: string; color: string }[] = [
  {
    id: 'student',
    title: 'Student',
    desc: 'Report issues across campus and track their resolution status in real-time.',
    icon: <User className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    color: 'bg-blue-600'
  },
  {
    id: 'admin',
    title: 'Admin',
    desc: 'Manage all reported issues, assign tasks to officials, and oversee campus maintenance.',
    icon: <ShieldCheck className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    color: 'bg-indigo-600'
  },
  {
    id: 'official',
    title: 'Official',
    desc: 'Access your assigned tasks, update work status, and submit completion reports.',
    icon: <HardHat className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1678803262992-d79d06dd5d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    color: 'bg-emerald-600'
  },
  {
    id: 'management',
    title: 'Management',
    desc: 'Monitor high-level campus analytics, performance metrics, and system escalations.',
    icon: <BarChart3 className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1543132220-7bc04a0e790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    color: 'bg-purple-600'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1672912995257-0c8255289523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
          alt="Campus" 
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full text-center mb-10 md:mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">
          Smart Campus <span className="text-blue-600">Issue Reporting</span>
        </h1>
        <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto px-4">
          A unified platform for students, staff, and management to ensure a better campus environment. Select your role to get started.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {roles.map((role, idx) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelectRole(role.id)}
            className="group relative bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
          >
            <div className="relative h-40 w-full mb-6 rounded-2xl overflow-hidden bg-neutral-100">
              <ImageWithFallback 
                src={role.image} 
                alt={role.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute top-3 left-3 p-2 rounded-xl text-white shadow-lg ${role.color}`}>
                {role.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-neutral-900 mb-2">{role.title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed flex-grow">
              {role.desc}
            </p>
            
            <div className="mt-6 flex items-center text-sm font-semibold text-neutral-900">
              Continue as {role.title}
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      <footer className="mt-20 text-neutral-400 text-sm">
        © 2026 Smart Campus Management System • Secure Role-Based Access
      </footer>
    </div>
  );
};
