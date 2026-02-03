import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/Layout';
import { Plus, Clock, CheckCircle2, AlertCircle, Image as ImageIcon, X, MapPin, Calendar, User, Mail, Phone, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Issue {
  id: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  location?: string;
}

const mockIssues: Issue[] = [
  { id: '1', category: 'Electrical', priority: 'high', description: 'Power outage in Room 402, Block B.', status: 'Open', date: '2026-02-01', location: 'Block B, 4th Floor' },
  { id: '2', category: 'Plumbing', priority: 'medium', description: 'Water leakage in the girls hostel 3rd floor.', status: 'In Progress', date: '2026-01-30', location: 'Girls Hostel, Wing A' },
  { id: '3', category: 'Facilities', priority: 'low', description: 'Broken chair in Library study zone.', status: 'Resolved', date: '2026-01-28', location: 'Central Library' },
];

const mockNotifications = [
  { id: 1, title: 'Issue Resolved', message: 'Your report #3 (Broken chair) has been marked as resolved.', time: '2h ago', type: 'success' },
  { id: 2, title: 'In Progress', message: 'Work has started on your report #2 (Water leakage).', time: '5h ago', type: 'info' },
  { id: 3, title: 'New Comment', message: 'Admin commented on your report: "Technician assigned".', time: '1d ago', type: 'message' },
];

export const StudentDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [isReporting, setIsReporting] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    const newIssue: Issue = {
      id: (issues.length + 1).toString(),
      category: data.category,
      priority: data.priority,
      description: data.description,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      location: data.location || 'Main Campus',
    };
    setIssues([newIssue, ...issues]);
    setIsReporting(false);
    reset();
    toast.success('Issue reported successfully!');
  };

  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <div className="max-w-6xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Student Hub</h1>
                <p className="text-neutral-500 font-medium">Welcome back, Alex! Here is your campus status overview.</p>
              </div>
              <button 
                onClick={() => setIsReporting(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Plus size={20} />
                Report New Issue
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Reports" value={issues.length} icon={<AlertCircle className="text-blue-600" />} />
              <StatCard label="Active Tasks" value={issues.filter(i => i.status !== 'Resolved').length} icon={<Clock className="text-amber-600" />} />
              <StatCard label="Completed" value={issues.filter(i => i.status === 'Resolved').length} icon={<CheckCircle2 className="text-emerald-600" />} />
            </div>

            <div className="bg-white rounded-[2rem] border border-neutral-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="font-bold text-neutral-900 text-lg">Recent Activities</h3>
                <button onClick={() => setActiveScreen('reports')} className="text-blue-600 text-sm font-bold hover:underline">View All Reports</button>
              </div>
              <div className="divide-y divide-neutral-100">
                {issues.slice(0, 3).map((issue) => (
                  <button 
                    key={issue.id} 
                    onClick={() => { setSelectedIssue(issue); setActiveScreen('issue-detail'); }}
                    className="w-full text-left p-8 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex gap-6 items-start">
                      <div className={`p-4 rounded-2xl ${
                        issue.status === 'Open' ? 'bg-red-50 text-red-600' :
                        issue.status === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {issue.status === 'Open' ? <AlertCircle size={24} /> : 
                         issue.status === 'In Progress' ? <Clock size={24} /> : 
                         <CheckCircle2 size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-neutral-900">{issue.category}</h4>
                          <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-full ${
                            issue.priority === 'high' ? 'bg-red-100 text-red-700' :
                            issue.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {issue.priority}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 mb-2 line-clamp-1">{issue.description}</p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                          <span className="flex items-center gap-1 font-medium"><Calendar size={12}/> {issue.date}</span>
                          <span className="flex items-center gap-1 font-medium"><MapPin size={12}/> {issue.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className={`text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all ${
                        issue.status === 'Open' ? 'text-red-600 bg-red-50' :
                        issue.status === 'In Progress' ? 'text-amber-600 bg-amber-50' :
                        'text-emerald-600 bg-emerald-50'
                      }`}>
                        {issue.status}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-neutral-900 tracking-tight">My Reports</h2>
                <p className="text-neutral-500 font-medium">History of all issues you've reported.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50">Filter Status</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-white p-8 rounded-[2rem] border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                      issue.status === 'Open' ? 'text-red-600 bg-red-50' :
                      issue.status === 'In Progress' ? 'text-amber-600 bg-amber-50' :
                      'text-emerald-600 bg-emerald-50'
                    }`}>
                      {issue.status}
                    </span>
                    <span className="text-xs text-neutral-400 font-bold tracking-widest uppercase">#{issue.id}</span>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">{issue.category}</h4>
                  <p className="text-sm text-neutral-500 mb-8 leading-relaxed line-clamp-3">{issue.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Reported on</span>
                      <span className="text-sm font-bold text-neutral-700">{issue.date}</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedIssue(issue); setActiveScreen('issue-detail'); }}
                      className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                      View Full Details <X size={14} className="rotate-45" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'issue-detail':
        return selectedIssue ? (
          <div className="max-w-4xl mx-auto pb-20">
            <button onClick={() => setActiveScreen('reports')} className="mb-6 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 font-bold text-sm">
              <X size={18} /> Back to My Reports
            </button>
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-xl">
              <div className={`h-4 bg-gradient-to-r ${
                selectedIssue.status === 'Open' ? 'from-red-500 to-red-600' :
                selectedIssue.status === 'In Progress' ? 'from-amber-500 to-amber-600' :
                'from-emerald-500 to-emerald-600'
              }`} />
              <div className="p-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-neutral-900 mb-2">{selectedIssue.category}</h2>
                    <p className="text-neutral-500 font-medium">Ticket Reference: #{selectedIssue.id}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-4 py-2 rounded-xl font-black text-xs uppercase mb-2 ${
                       selectedIssue.status === 'Open' ? 'bg-red-50 text-red-600' :
                       selectedIssue.status === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                       'bg-emerald-50 text-emerald-600'
                    }`}>
                      {selectedIssue.status}
                    </div>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Priority: {selectedIssue.priority}</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <section>
                    <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Problem Context</h4>
                    <p className="text-neutral-700 leading-relaxed text-lg font-medium bg-neutral-50 p-8 rounded-3xl">{selectedIssue.description}</p>
                  </section>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-neutral-100">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-neutral-100 rounded-2xl text-neutral-500"><MapPin size={24}/></div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Reported Location</p>
                        <p className="font-bold text-neutral-900">{selectedIssue.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-neutral-100 rounded-2xl text-neutral-500"><Calendar size={24}/></div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Submission Date</p>
                        <p className="font-bold text-neutral-900">{selectedIssue.date}</p>
                      </div>
                    </div>
                  </div>

                  <section>
                    <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-10 text-center">Resolution Journey</h4>
                    <div className="relative space-y-10 max-w-xl mx-auto before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
                      <TimelineItem 
                        title="Report Filed" 
                        desc="System successfully captured your issue report." 
                        time={selectedIssue.date} 
                        active 
                      />
                      <TimelineItem 
                        title="Admin Verification" 
                        desc="Campus team is reviewing the severity and location." 
                        time="Processed" 
                        active={selectedIssue.status !== 'Open'} 
                      />
                      <TimelineItem 
                        title="Officer Assigned" 
                        desc="A specialized officer has been dispatched to the site." 
                        time="In Transit" 
                        active={selectedIssue.status === 'In Progress' || selectedIssue.status === 'Resolved'} 
                      />
                      <TimelineItem 
                        title="Issue Resolved" 
                        desc="The reported problem has been successfully addressed." 
                        time="Complete" 
                        active={selectedIssue.status === 'Resolved'} 
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        ) : null;
      case 'notifications':
        return (
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Alert Center</h2>
                <p className="text-neutral-500 font-medium">Stay updated on your reported issues.</p>
              </div>
              <button className="text-blue-600 text-sm font-bold hover:underline">Clear All</button>
            </div>
            <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-neutral-100">
                {mockNotifications.map((notif) => (
                  <div key={notif.id} className="p-8 hover:bg-neutral-50 transition-colors flex gap-6">
                    <div className={`p-4 h-fit rounded-2xl ${
                      notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                      notif.type === 'info' ? 'bg-blue-50 text-blue-600' :
                      'bg-purple-50 text-purple-600'
                    }`}>
                      {notif.type === 'success' ? <CheckCircle2 size={24}/> :
                       notif.type === 'info' ? <Clock size={24}/> :
                       <ImageIcon size={24}/>}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-neutral-900 text-lg">{notif.title}</h4>
                        <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">{notif.time}</span>
                      </div>
                      <p className="text-neutral-500 text-sm leading-relaxed font-medium">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto pb-20">
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-sm">
              <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700" />
              <div className="px-10 pb-10">
                <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-xl mb-6">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" className="w-full h-full rounded-[2rem] bg-neutral-100" />
                  </div>
                  <h2 className="text-3xl font-black text-neutral-900">Alex Johnson</h2>
                  <p className="text-neutral-500 font-medium">B.Tech Computer Science • Final Year Candidate</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
                  <ProfileField label="Identity Number" value="ST-2026-X8" icon={<User size={18}/>} />
                  <ProfileField label="Campus Email" value="alex.j@smartcampus.edu" icon={<Mail size={18}/>} />
                  <ProfileField label="Registered Phone" value="+1 (555) 000-1234" icon={<Phone size={18}/>} />
                  <ProfileField label="Academic Block" value="Engineering Faculty" icon={<BookOpen size={18}/>} />
                </div>

                <div className="mt-16 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-4 bg-neutral-900 text-white font-bold rounded-2xl hover:bg-neutral-800 transition-all">Update Information</button>
                  <button onClick={onLogout} className="flex-1 py-4 border-2 border-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-all">Sign Out</button>
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
            <h3 className="text-2xl font-black text-neutral-900">Module Under Construction</h3>
            <p className="text-neutral-500 max-w-xs mt-2">The requested section is currently being integrated into the campus network.</p>
            <button onClick={() => setActiveScreen('home')} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl">Return to Dashboard</button>
          </div>
        );
    }
  };

  return (
    <DashboardLayout 
      role="student" 
      onLogout={onLogout} 
      title={activeScreen === 'home' ? 'Campus Overview' : activeScreen === 'reports' ? 'My Issue Reports' : activeScreen === 'notifications' ? 'Alert Center' : activeScreen === 'profile' ? 'My Profile' : 'Student Hub'}
      activeScreen={activeScreen}
      onScreenChange={setActiveScreen}
    >
      {renderContent()}

      <AnimatePresence>
        {isReporting && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-10 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <div>
                  <h3 className="text-2xl font-black text-neutral-900">Submit New Ticket</h3>
                  <p className="text-sm text-neutral-500 font-medium">Help us keep the campus running smoothly.</p>
                </div>
                <button onClick={() => setIsReporting(false)} className="p-3 hover:bg-neutral-200 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">Service Category</label>
                    <select 
                      {...register('category', { required: true })}
                      className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-neutral-700"
                    >
                      <option value="Electrical">Electrical Infrastructure</option>
                      <option value="Plumbing">Water & Plumbing</option>
                      <option value="Facilities">General Facilities</option>
                      <option value="Internet/IT">Campus IT Network</option>
                      <option value="Cleaning">Sanitation & Cleaning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">Issue Location</label>
                    <input 
                      {...register('location', { required: true })}
                      placeholder="e.g. Block B, 4th Floor"
                      className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-neutral-700"
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-3 text-center">Set Priority Level</label>
                  <div className="flex gap-4">
                    {['low', 'medium', 'high'].map((p) => (
                      <label key={p} className="flex-1 cursor-pointer">
                        <input 
                          type="radio" 
                          value={p} 
                          {...register('priority', { required: true })}
                          className="peer sr-only"
                        />
                        <div className={`text-center py-3 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all peer-checked:shadow-lg ${
                          p === 'low' ? 'border-neutral-100 text-blue-600 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600' :
                          p === 'medium' ? 'border-neutral-100 text-amber-600 peer-checked:bg-amber-600 peer-checked:text-white peer-checked:border-amber-600' :
                          'border-neutral-100 text-red-600 peer-checked:bg-red-600 peer-checked:text-white peer-checked:border-red-600'
                        }`}>
                          {p}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">Explain the Problem</label>
                  <textarea 
                    {...register('description', { required: true })}
                    rows={4}
                    placeholder="Provide specific details to help the technician..."
                    className="w-full p-6 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-neutral-700 resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsReporting(false)}
                    className="flex-1 py-4 text-neutral-500 font-bold hover:bg-neutral-50 rounded-2xl transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.02] transition-all"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

const StatCard = ({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-neutral-200 shadow-sm flex items-center justify-between group hover:border-blue-500 transition-colors">
    <div>
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-4xl font-black text-neutral-900">{value}</p>
    </div>
    <div className="p-5 bg-neutral-50 rounded-3xl group-hover:bg-blue-50 transition-colors">
      {icon}
    </div>
  </div>
);

const TimelineItem = ({ title, desc, time, active }: { title: string; desc: string; time: string; active: boolean }) => (
  <div className="relative pl-12">
    <div className={`absolute left-0 mt-1.5 h-10 w-10 rounded-xl flex items-center justify-center z-10 transition-all ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110' : 'bg-neutral-100 text-neutral-300'
    }`}>
      {active ? <CheckCircle2 size={18}/> : <Clock size={18}/>}
    </div>
    <div className={active ? 'opacity-100 translate-x-0 transition-all' : 'opacity-40 translate-x-2 transition-all'}>
      <div className="flex justify-between items-center mb-1">
        <h5 className="font-black text-neutral-900">{title}</h5>
        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{time}</span>
      </div>
      <p className="text-sm text-neutral-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ProfileField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-4 bg-neutral-50 rounded-2xl text-neutral-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="font-bold text-neutral-800">{value}</p>
    </div>
  </div>
);
