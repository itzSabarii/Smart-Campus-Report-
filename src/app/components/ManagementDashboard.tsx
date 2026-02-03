import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle2, Users, ArrowUpRight, ArrowDownRight, Filter, Download, User, Mail, ShieldCheck, MapPin, Phone } from 'lucide-react';

const data = [
  { name: 'Electrical', issues: 40, resolved: 32 },
  { name: 'Plumbing', issues: 30, resolved: 25 },
  { name: 'IT/WiFi', issues: 65, resolved: 60 },
  { name: 'Facilities', issues: 20, resolved: 18 },
  { name: 'Cleanliness', issues: 45, resolved: 30 },
];

const performanceData = [
  { month: 'Jan', rate: 75 },
  { month: 'Feb', rate: 82 },
  { month: 'Mar', rate: 78 },
  { month: 'Apr', rate: 85 },
  { month: 'May', rate: 90 },
  { month: 'Jun', rate: 88 },
];

const pieData = [
  { name: 'Resolved', value: 82, color: '#10b981' },
  { name: 'In Progress', value: 48, color: '#f59e0b' },
  { name: 'Pending', value: 12, color: '#ef4444' },
];

export const ManagementDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeScreen, setActiveScreen] = useState('home');

  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Executive Summary</h1>
                <p className="text-neutral-500 font-medium">Real-time campus operational intelligence.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-2xl text-sm font-bold shadow-sm hover:bg-neutral-50">
                <Download size={18}/> Export PDF Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Overall Health" value="92%" trend="+2.4%" positive={true} icon={<TrendingUp className="text-purple-600" />} />
              <KPICard title="Escalated Issues" value="04" trend="-15%" positive={true} icon={<AlertTriangle className="text-red-600" />} />
              <KPICard title="Resolution Time" value="4.2h" trend="+10%" positive={false} icon={<CheckCircle2 className="text-emerald-600" />} />
              <KPICard title="User Satisfaction" value="4.8/5" trend="+0.3" positive={true} icon={<Users className="text-blue-600" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-900 mb-8">Departmental Resolution Efficiency</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}}
                      />
                      <Bar dataKey="issues" fill="#a855f7" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="resolved" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold text-neutral-900 mb-8 w-full">Resolution Mix</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{borderRadius: '12px'}} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full space-y-4 mt-6">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}} />
                        <span className="text-sm font-medium text-neutral-500">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-neutral-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="max-w-7xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-neutral-900">Advanced Analytics</h2>
            <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-8">Monthly Operational Performance</h3>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                    <Tooltip contentStyle={{borderRadius: '16px'}} />
                    <Area type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorRate)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case 'escalations':
        return (
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-neutral-900">Critical Escalations</h2>
              <button className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl text-sm flex items-center gap-2">
                <AlertTriangle size={18}/> Emergency Protocols
              </button>
            </div>
            <div className="bg-white rounded-[2rem] border border-neutral-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-neutral-50/50">
                  <tr>
                    <th className="px-8 py-5 text-xs font-black text-neutral-400 uppercase tracking-widest">Department</th>
                    <th className="px-8 py-5 text-xs font-black text-neutral-400 uppercase tracking-widest">Reason for Alert</th>
                    <th className="px-8 py-5 text-xs font-black text-neutral-400 uppercase tracking-widest">Overdue By</th>
                    <th className="px-8 py-5 text-xs font-black text-neutral-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <CriticalRow dept="Electrical Infrastructure" reason="Critical spare parts stock-out" delay="72h" severity="high" />
                  <CriticalRow dept="Server Management" reason="Cooling system redundancy failure" delay="12h" severity="critical" />
                  <CriticalRow dept="Campus Security" reason="Camera system maintenance backlog" delay="14d" severity="medium" />
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-neutral-900">Authority Alerts</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm flex gap-6 items-start">
                  <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                    <TrendingUp size={24}/>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900">Weekly Performance Surge</h4>
                    <p className="text-sm text-neutral-500 mt-1 mb-4">Resolution efficiency increased by 14% compared to last week.</p>
                    <button onClick={() => setActiveScreen('home')} className="text-sm font-bold text-purple-600 hover:underline">View Performance Stats</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-sm">
              <div className="h-40 bg-purple-700" />
              <div className="px-10 pb-10">
                <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-xl mb-4">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=management" className="w-full h-full rounded-[2rem] bg-neutral-100" />
                  </div>
                  <h2 className="text-3xl font-black text-neutral-900">Dr. Sarah Thompson</h2>
                  <p className="text-neutral-500 font-medium">Chief Operational Officer • Campus Authority</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
                  <ProfileField label="Authority Tier" value="Tier 1 - Executive" icon={<ShieldCheck size={18}/>} />
                  <ProfileField label="Primary Email" value="coo@smartcampus.edu" icon={<Mail size={18}/>} />
                  <ProfileField label="Access Level" value="Full System Administration" icon={<User size={18}/>} />
                  <ProfileField label="Office Extension" value="Ext. 9901" icon={<Phone size={18}/>} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Screen not implemented</div>;
    }
  };

  return (
    <DashboardLayout 
      role="management" 
      onLogout={onLogout} 
      title={activeScreen === 'home' ? 'Executive Portal' : activeScreen.charAt(0).toUpperCase() + activeScreen.slice(1)}
      activeScreen={activeScreen}
      onScreenChange={setActiveScreen}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

const KPICard = ({ title, value, trend, positive, icon }: { title: string; value: string; trend: string; positive: boolean; icon: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-neutral-200 shadow-sm flex flex-col gap-4 group hover:border-purple-500 transition-colors">
    <div className="flex justify-between items-start">
      <div className="p-4 bg-neutral-50 rounded-2xl group-hover:bg-purple-50 transition-colors">{icon}</div>
      <div className={`flex items-center text-xs font-black px-2.5 py-1 rounded-lg ${
        positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
      }`}>
        {positive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {trend}
      </div>
    </div>
    <div>
      <p className="text-4xl font-black text-neutral-900 tracking-tight mb-1">{value}</p>
      <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{title}</p>
    </div>
  </div>
);

const CriticalRow = ({ dept, reason, delay, severity }: { dept: string, reason: string, delay: string, severity: 'medium' | 'high' | 'critical' }) => (
  <tr className="hover:bg-neutral-50/50 transition-colors group">
    <td className="px-8 py-6">
      <div className="font-bold text-neutral-900">{dept}</div>
    </td>
    <td className="px-8 py-6 text-sm font-medium text-neutral-600">{reason}</td>
    <td className="px-8 py-6">
      <span className={`text-sm font-black ${severity === 'critical' ? 'text-red-600' : 'text-amber-600'}`}>{delay} Overdue</span>
    </td>
    <td className="px-8 py-6">
      <button className="px-6 py-2 bg-neutral-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10">
        Escalate
      </button>
    </td>
  </tr>
);

const ProfileField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-neutral-50 rounded-xl text-neutral-400">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">{label}</p>
      <p className="font-bold text-neutral-800">{value}</p>
    </div>
  </div>
);
