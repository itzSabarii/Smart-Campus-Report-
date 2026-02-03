import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/Layout';
import { Users, FileText, CheckCircle, Clock, Filter, MoreVertical, ExternalLink, BarChart, Search, UserPlus, Bell, ShieldCheck, User, Settings, Mail, Phone, MapPin, Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminIssue {
  id: string;
  reporter: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
}

const mockAdminIssues: AdminIssue[] = [
  { id: 'R-402', reporter: 'Alex Johnson', category: 'Electrical', priority: 'high', assignedTo: 'John Mechanic', status: 'In Progress', date: '2026-02-01' },
  { id: 'R-109', reporter: 'Sarah Smith', category: 'Plumbing', priority: 'medium', assignedTo: 'Unassigned', status: 'Open', date: '2026-02-02' },
  { id: 'R-882', reporter: 'Michael Chen', category: 'Facilities', priority: 'low', assignedTo: 'Dave Wood', status: 'Resolved', date: '2026-01-30' },
  { id: 'R-221', reporter: 'Emma Wilson', category: 'IT Support', priority: 'high', assignedTo: 'Unassigned', status: 'Open', date: '2026-02-02' },
  { id: 'R-556', reporter: 'David Lee', category: 'Cleaning', priority: 'low', assignedTo: 'Clean Team', status: 'In Progress', date: '2026-02-03' },
];

const chartData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 19 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 22 },
  { name: 'Fri', count: 30 },
  { name: 'Sat', count: 8 },
  { name: 'Sun', count: 5 },
];

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [issues, setIssues] = useState(mockAdminIssues);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssueForAssign, setSelectedIssueForAssign] = useState<AdminIssue | null>(null);

  const filteredIssues = issues.filter(i => 
    i.reporter.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIssueForAssign) {
      const updatedIssues = issues.map(i => 
        i.id === selectedIssueForAssign.id 
          ? { ...i, assignedTo: (e.target as any).official.value, status: 'In Progress' as const } 
          : i
      );
      setIssues(updatedIssues);
      setSelectedIssueForAssign(null);
      toast.success('Issue assigned successfully!');
    }
  };

  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Admin Overview</h1>
                <p className="text-neutral-500 font-medium">Monitoring campus maintenance performance.</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-500 flex items-center gap-2">
                <Calendar size={16}/> Feb 3, 2026
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Total Reports" value="142" icon={<FileText className="text-indigo-600" />} trend="+12%" />
              <StatCard label="Unassigned" value={issues.filter(i => i.assignedTo === 'Unassigned').length} icon={<Clock className="text-amber-600" />} trend="-5%" />
              <StatCard label="In Progress" value="48" icon={<ExternalLink className="text-blue-600" />} trend="+8%" />
              <StatCard label="Resolved" value="82" icon={<CheckCircle className="text-emerald-600" />} trend="+24%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-neutral-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-lg text-neutral-900">Weekly Activity Surge</h3>
                  <button className="text-indigo-600 text-sm font-bold hover:underline">Full Analytics</button>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                      <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200 shadow-sm">
                <h3 className="font-bold text-lg text-neutral-900 mb-6">Critical Escalations</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 pb-6 border-b border-neutral-100 last:border-0 last:pb-0">
                      <div className="p-3 bg-red-50 text-red-600 rounded-2xl h-fit">
                        <AlertCircle size={20}/>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900 line-clamp-1">Late Response: Ticket #R-402</p>
                        <p className="text-xs text-neutral-500 mb-3">Priority 'High' exceeded 24h limit.</p>
                        <button onClick={() => setActiveScreen('assign')} className="text-[10px] font-black uppercase text-indigo-600 tracking-widest hover:underline">Reassign Immediately</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'all-reports':
        return (
          <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Central Repository</h2>
                <p className="text-neutral-500 font-medium">Manage every campus report from one place.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search ID, reporter, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                  />
                </div>
                <button className="px-6 py-3 bg-white border border-neutral-200 rounded-2xl text-sm font-bold text-neutral-600 flex items-center gap-2 hover:bg-neutral-50 transition-colors shadow-sm">
                  <Filter size={18}/> Filters
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-neutral-50/50 border-b border-neutral-200">
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Ref Ticket</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Submitted By</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Category</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Priority</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Assignment</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredIssues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-neutral-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <span className="font-black text-neutral-900">#{issue.id}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.reporter}`} className="w-full h-full" alt="" />
                            </div>
                            <span className="text-sm font-bold text-neutral-700">{issue.reporter}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-semibold text-neutral-600">{issue.category}</td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full ${
                            issue.priority === 'high' ? 'bg-red-50 text-red-600' :
                            issue.priority === 'medium' ? 'bg-amber-50 text-amber-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {issue.priority}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          {issue.assignedTo === 'Unassigned' ? (
                            <button 
                              onClick={() => { setSelectedIssueForAssign(issue); setActiveScreen('assign'); }}
                              className="text-indigo-600 text-xs font-black uppercase hover:underline flex items-center gap-1.5"
                            >
                              <UserPlus size={14}/> Quick Assign
                            </button>
                          ) : (
                            <span className="text-sm font-bold text-neutral-700">{issue.assignedTo}</span>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-2.5 h-2.5 rounded-full ring-4 ${
                              issue.status === 'Open' ? 'bg-red-500 ring-red-50' :
                              issue.status === 'In Progress' ? 'bg-amber-500 ring-amber-50' :
                              'bg-emerald-500 ring-emerald-50'
                            }`}></div>
                            <span className="text-sm font-bold text-neutral-700">{issue.status}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2.5 hover:bg-neutral-100 rounded-xl text-neutral-400 group-hover:text-neutral-900 transition-all"><MoreVertical size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'assign':
        return (
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Workforce Assignment</h2>
              <p className="text-neutral-500 font-medium">Dispatch specialized officers to resolve pending issues.</p>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-xl">
              <div className="p-10">
                {selectedIssueForAssign ? (
                  <form onSubmit={handleAssignSubmit} className="space-y-10">
                    <div className="bg-indigo-50 p-8 rounded-3xl flex justify-between items-center border border-indigo-100">
                      <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Selected Case</p>
                        <h3 className="text-2xl font-black text-indigo-900">{selectedIssueForAssign.category} - Ticket #{selectedIssueForAssign.id}</h3>
                        <div className="flex items-center gap-4 mt-2 text-indigo-600 font-bold text-sm">
                          <span className="flex items-center gap-1.5"><User size={16}/> {selectedIssueForAssign.reporter}</span>
                          <span className="flex items-center gap-1.5"><Calendar size={16}/> {selectedIssueForAssign.date}</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => setSelectedIssueForAssign(null)} className="px-4 py-2 bg-white text-indigo-600 font-black text-xs uppercase rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all">Clear Selection</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Choose Official</label>
                        <select 
                          name="official"
                          required
                          className="w-full p-5 bg-neutral-50 border border-neutral-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-bold text-neutral-700"
                        >
                          <option value="">Select Technician...</option>
                          <option value="John Mechanic">John Mechanic (Electrical Dept)</option>
                          <option value="Dave Wood">Dave Wood (Carpentry Dept)</option>
                          <option value="Sarah Clean">Sarah Clean (Facilities Dept)</option>
                          <option value="Mike Tech">Mike Tech (IT Infrastructure)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Urgency Override</label>
                        <select className="w-full p-5 bg-neutral-50 border border-neutral-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-bold text-neutral-700">
                          <option value="low">Standard Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                          <option value="critical">Critical / Emergency</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Resolution Target Date</label>
                      <input type="date" className="w-full p-5 bg-neutral-50 border border-neutral-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-bold text-neutral-700" />
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-neutral-100">
                      <button type="button" onClick={() => setActiveScreen('all-reports')} className="flex-1 py-5 bg-neutral-50 text-neutral-500 font-bold rounded-3xl hover:bg-neutral-100 transition-all">Cancel Dispatch</button>
                      <button type="submit" className="flex-1 py-5 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-3xl shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all">Confirm Assignment</button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-neutral-50 rounded-[2rem] flex items-center justify-center text-neutral-300 mx-auto mb-8 ring-8 ring-neutral-50/50">
                      <UserPlus size={48}/>
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 mb-3">Awaiting Ticket Selection</h3>
                    <p className="text-neutral-500 mb-10 max-w-sm mx-auto font-medium">Please browse the central repository and choose a report to begin the assignment workflow.</p>
                    <button onClick={() => setActiveScreen('all-reports')} className="px-10 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 hover:scale-[1.05] transition-all">Go to Central Repository</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">System Alerts</h2>
              <p className="text-neutral-500 font-medium">Critical network updates and ticket escalations.</p>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-neutral-200 shadow-sm flex gap-6 items-start hover:border-indigo-500 transition-colors group">
                  <div className={`p-4 rounded-2xl h-fit transition-all ${i % 2 === 0 ? 'bg-red-50 text-red-600 group-hover:scale-110' : 'bg-indigo-50 text-indigo-600 group-hover:scale-110'}`}>
                    {i % 2 === 0 ? <AlertCircle size={28}/> : <Plus size={28}/>}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-black text-neutral-900 text-lg">{i % 2 === 0 ? 'High Priority Escalation' : 'New Incoming Report'}</h4>
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{i * 5}m ago</span>
                    </div>
                    <p className="text-neutral-500 font-medium leading-relaxed mb-4">
                      {i % 2 === 0 ? 'Case #R-402 has remained unaddressed for over 24 hours. Immediate re-assignment is required to maintain SLA targets.' : 'A new IT Support request has been filed regarding campus-wide WiFi stability in Block C.'}
                    </p>
                    <button onClick={() => setActiveScreen(i % 2 === 0 ? 'assign' : 'all-reports')} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Take Action Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto pb-20">
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-sm">
              <div className="h-48 bg-indigo-600" />
              <div className="px-10 pb-10">
                <div className="relative -mt-20 mb-10">
                  <div className="w-40 h-40 rounded-[2.5rem] bg-white p-3 shadow-2xl mb-6">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" className="w-full h-full rounded-[2rem] bg-neutral-100" />
                  </div>
                  <h2 className="text-4xl font-black text-neutral-900 mb-1">Campus Administrator</h2>
                  <p className="text-neutral-500 text-lg font-medium">Lead Operations Officer • Maintenance Division</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-neutral-100">
                  <ProfileField label="Employee Identification" value="ADMIN-MOD-001" icon={<ShieldCheck size={20}/>} />
                  <ProfileField label="Primary Contact Email" value="admin@smartcampus.edu" icon={<Mail size={20}/>} />
                  <ProfileField label="Stationed Office" value="Admin Block, Room 102" icon={<MapPin size={20}/>} />
                  <ProfileField label="Emergency Hotline" value="+1 (555) 999-0000" icon={<Phone size={20}/>} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-neutral-100 rounded-3xl flex items-center justify-center text-neutral-300 mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-black text-neutral-900">Module Unreachable</h3>
            <p className="text-neutral-500 max-w-xs mt-2">The administrative sub-module is not responding.</p>
            <button onClick={() => setActiveScreen('home')} className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl">Return to Hub</button>
          </div>
        );
    }
  };

  return (
    <DashboardLayout 
      role="admin" 
      onLogout={onLogout} 
      title={activeScreen === 'home' ? 'Admin Hub' : activeScreen === 'all-reports' ? 'Campus Repository' : activeScreen === 'assign' ? 'Workforce Dispatch' : activeScreen === 'notifications' ? 'System Alerts' : 'Profile Control'}
      activeScreen={activeScreen}
      onScreenChange={setActiveScreen}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

const StatCard = ({ label, value, icon, trend }: { label: string; value: string | number; icon: React.ReactNode; trend: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200 shadow-sm flex flex-col gap-6 group hover:border-indigo-500 transition-all hover:shadow-lg">
    <div className="flex items-center justify-between">
      <div className="p-5 bg-neutral-50 rounded-3xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">{icon}</div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
        {trend}
      </span>
    </div>
    <div>
      <p className="text-5xl font-black text-neutral-900 tracking-tighter mb-1">{value}</p>
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{label}</p>
    </div>
  </div>
);

const ProfileField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-5 group">
    <div className="p-5 bg-neutral-50 rounded-3xl text-neutral-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-bold text-neutral-800">{value}</p>
    </div>
  </div>
);
