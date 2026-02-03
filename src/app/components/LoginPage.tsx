import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, User, ShieldCheck, HardHat, BarChart3, Lock, Mail } from 'lucide-react';
import { Role } from '@/app/App';
import { toast } from 'sonner';

interface LoginPageProps {
  role: Role;
  onLogin: () => void;
  onBack: () => void;
}

const roleConfig = {
  student: { title: 'Student', icon: <User className="w-8 h-8" />, color: 'bg-blue-600', textColor: 'text-blue-600' },
  admin: { title: 'Administrator', icon: <ShieldCheck className="w-8 h-8" />, color: 'bg-indigo-600', textColor: 'text-indigo-600' },
  official: { title: 'Related Official', icon: <HardHat className="w-8 h-8" />, color: 'bg-emerald-600', textColor: 'text-emerald-600' },
  management: { title: 'Authority / Management', icon: <BarChart3 className="w-8 h-8" />, color: 'bg-purple-600', textColor: 'text-purple-600' },
};

export const LoginPage: React.FC<LoginPageProps> = ({ role, onLogin, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const config = roleConfig[role];

  const onSubmit = (data: any) => {
    console.log('Login data:', data);
    toast.success(`Welcome back, ${config.title}!`);
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-neutral-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <button 
          onClick={onBack}
          className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to role selection
        </button>

        <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-neutral-100">
          <div className="flex flex-col items-center text-center mb-10">
            <div className={`p-4 rounded-2xl text-white shadow-lg mb-4 ${config.color}`}>
              {config.icon}
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Sign in as</h2>
            <p className={`text-lg font-semibold ${config.textColor}`}>{config.title}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">User ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  {...register('identifier', { required: 'Please enter your ID or Email' })}
                  type="text"
                  placeholder="Enter your university ID"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier.message as string}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-neutral-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  {...register('password', { required: 'Please enter your password' })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer ${config.color}`}
            >
              Log in to Dashboard
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-neutral-100 text-center">
            <p className="text-sm text-neutral-500">
              Need help? Contact <a href="#" className="text-blue-600 font-medium">IT Support</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
