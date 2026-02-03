import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/Layout';
import { ClipboardList, MessageSquare, CheckCircle, ChevronRight, MapPin, Calendar, Camera, User, Mail, Phone, HardHat, AlertCircle, Clock, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  location: string;
  deadline: string;
  status: 'assigned' | 'in-progress' | 'completed';
  description: string;
  reporter: string;
}

const mockTasks: Task[] = [
  { id: 'T-882', title: 'Power Outage - Block B', location: 'Engineering Block, Room 402', deadline: 'Today, 5:00 PM', status: 'in-progress', description: 'Complete circuit failure reported by student. Needs immediate inspection of MCB.', reporter: 'Alex Johnson' },
  { id: 'T-901', title: 'Water Leakage', location: 'Girls Hostel, 3rd Floor', deadline: 'Tomorrow', status: 'assigned', description: 'Ceiling leakage in bathroom area. Check main pipe supply.', reporter: 'Sarah Smith' },
  { id: 'T-743', title: 'AC Servicing', location: 'Main Seminar Hall', deadline: 'Feb 5, 2026', status: 'assigned', description: 'Routine maintenance and filter cleaning.', reporter: 'Campus Admin' },
];

export const OfficialDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const updateStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, status });
    }
    toast.success(`Task status updated to ${status.replace('-', ' ')}`);
  };

  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <div className="max-w-6xl mx-auto space-y-10 pb-20">
            <div>
              <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Service Hub</h1>
              <p className="text-neutral-500 font-medium text-lg">You have {tasks.filter(t => t.status !== 'completed').length} pending assignments today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Workload" value={tasks.length} icon={<ClipboardList className="text-emerald-600" />} />
              <StatCard label="In Progress" value={tasks.filter(t => t.status === 'in-progress').length} icon={<Clock className="text-amber-600" />} />
              <StatCard label="Completed" value={tasks.filter(t => t.status === 'completed').length} icon={<CheckCircle2 className="text-blue-600" />} />
            </div>

            <div className="bg-white rounded-[2rem] border border-neutral-200 overflow-hidden shadow-sm">
              <div className="p-10 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="font-black text-neutral-900 text-xl">High Priority Tasks</h3>
                <button onClick={() => setActiveScreen('tasks')} className="text-emerald-600 text-sm font-black uppercase tracking-widest hover:underline">Full Worklist</button>
              </div>
              <div className="divide-y divide-neutral-100">
                {tasks.slice(0, 2).map((task) => (
                  <div key={task.id} className="p-10 flex items-center justify-between group hover:bg-neutral-50/50 transition-colors">
                    <div className="flex gap-8">
                      <div className="p-5 bg-emerald-50 text-emerald-600 rounded-3xl h-fit ring-8 ring-emerald-50/50">
                        <HardHat size={28}/>
                      </div>
                      <div>
                        <h4 className="font-black text-neutral-900 text-lg mb-1">{task.title}</h4>
                        <p className="text-neutral-500 font-medium mb-3 flex items-center gap-2"><MapPin size={16}/> {task.location}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest bg-neutral-100 px-3 py-1 rounded-lg">Deadline: {task.deadline}</span>
                          <StatusBadge status={task.status} />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setSelectedTask(task); setActiveScreen('tasks'); }}
                      className="px-8 py-3 bg-neutral-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                      Process
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="max-w-7xl mx-auto pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-neutral-900">Your Worklist</h3>
                  <span className="bg-emerald-50 text-emerald-600 text-xs font-black px-3 py-1 rounded-lg border border-emerald-100">LIVE</span>
                </div>
                <div className="space-y-5">
                  {tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`w-full text-left p-8 rounded-[2rem] border transition-all ${
                        selectedTask?.id === task.id 
                          ? 'bg-white border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105' 
                          : 'bg-white border-neutral-200 hover:border-emerald-200 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black text-neutral-400 tracking-widest uppercase">ID: {task.id}</span>
                        <StatusBadge status={task.status} />
                      </div>
                      <h4 className="font-black text-neutral-900 mb-3 text-lg">{task.title}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-neutral-500 font-medium">
                          <MapPin size={16} className="text-neutral-300" /> {task.location}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-500 font-medium">
                          <Calendar size={16} className="text-neutral-300" /> {task.deadline}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {selectedTask ? (
                    <motion.div
                      key={selectedTask.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden h-full flex flex-col shadow-xl"
                    >
                      <div className="p-10 border-b border-neutral-100 bg-neutral-50/30">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                          <div>
                            <h2 className="text-4xl font-black text-neutral-900 mb-3 leading-tight">{selectedTask.title}</h2>
                            <div className="flex flex-wrap gap-6 text-neutral-500">
                              <span className="flex items-center gap-2 text-sm font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-neutral-100"><MapPin size={18} className="text-emerald-500"/> {selectedTask.location}</span>
                              <span className="flex items-center gap-2 text-sm font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-neutral-100"><User size={18} className="text-blue-500"/> {selectedTask.reporter}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 w-full md:w-auto">
                            {selectedTask.status !== 'completed' && (
                              <>
                                <button 
                                  onClick={() => updateStatus(selectedTask.id, 'in-progress')}
                                  disabled={selectedTask.status === 'in-progress'}
                                  className={`w-full md:px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                                    selectedTask.status === 'in-progress' 
                                      ? 'bg-amber-100 text-amber-700 cursor-default border-2 border-amber-200' 
                                      : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg'
                                  }`}
                                >
                                  {selectedTask.status === 'in-progress' ? 'Work in Progress' : 'Initiate Task'}
                                </button>
                                <button 
                                   onClick={() => updateStatus(selectedTask.id, 'completed')}
                                   className="w-full md:px-10 py-4 bg-emerald-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/30"
                                >
                                  Complete Report
                                </button>
                              </>
                            )}
                            {selectedTask.status === 'completed' && (
                              <div className="px-10 py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 border-2 border-emerald-100">
                                <CheckCircle size={20}/> Resolution Verified
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] border border-neutral-100 shadow-sm">
                          <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Request Documentation</h4>
                          <p className="text-neutral-700 leading-relaxed text-lg font-medium">{selectedTask.description}</p>
                        </div>
                      </div>

                      <div className="p-10 space-y-10 flex-grow">
                        <div className="space-y-5">
                          <h4 className="text-lg font-black text-neutral-900">Work Logs & Maintenance Notes</h4>
                          <textarea 
                            className="w-full p-8 bg-neutral-50 border border-neutral-200 rounded-[2rem] focus:ring-8 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none resize-none font-medium text-neutral-700 text-lg"
                            rows={5}
                            placeholder="Detail the repairs performed or parts utilized for the resolution..."
                          ></textarea>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="border-4 border-dashed border-neutral-100 rounded-[2rem] p-10 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group">
                            <Camera className="w-12 h-12 text-neutral-200 group-hover:text-emerald-500 mx-auto mb-4 transition-transform group-hover:scale-110" />
                            <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Attach Evidence Photo</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            <button className="h-full py-5 bg-white border-2 border-emerald-600 text-emerald-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-emerald-50 transition-all shadow-sm">
                              Sync Logs to Server
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-white rounded-[2.5rem] border-4 border-dashed border-neutral-100 h-full flex flex-col items-center justify-center text-center p-20">
                      <div className="w-32 h-32 bg-neutral-50 rounded-[3rem] flex items-center justify-center text-neutral-200 mb-8 ring-8 ring-neutral-50/50">
                        <ClipboardList size={64} />
                      </div>
                      <h3 className="text-3xl font-black text-neutral-900 mb-4">Select Task to Process</h3>
                      <p className="text-neutral-500 max-w-sm font-medium text-lg">Choose an assignment from your workload list to begin the resolution workflow.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Assignment Alerts</h2>
              <p className="text-neutral-500 font-medium">Real-time notification of new campus service requests.</p>
            </div>
            <div className="space-y-5">
              {tasks.map((task, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm flex gap-8 items-start hover:shadow-xl transition-all group">
                  <div className="p-5 bg-emerald-50 text-emerald-600 rounded-3xl transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <AlertCircle size={32}/>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-3">
                      <h4 className="text-xl font-black text-neutral-900">New Task Assigned: {task.title}</h4>
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{i + 1}h ago</span>
                    </div>
                    <p className="text-neutral-500 font-medium text-lg mb-6 leading-relaxed">
                      You have been dispatched to <span className="text-neutral-900 font-bold">{task.location}</span>. Resolution is expected by <span className="text-neutral-900 font-bold">{task.deadline}</span>.
                    </p>
                    <button onClick={() => { setSelectedTask(task); setActiveScreen('tasks'); }} className="px-8 py-3 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">Start Processing</button>
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
              <div className="h-48 bg-emerald-600" />
              <div className="px-10 pb-10">
                <div className="relative -mt-20 mb-10 flex flex-col items-center sm:items-start">
                  <div className="w-40 h-40 rounded-[2.5rem] bg-white p-3 shadow-2xl mb-6">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=official" className="w-full h-full rounded-[2rem] bg-neutral-100" />
                  </div>
                  <h2 className="text-4xl font-black text-neutral-900">Officer John</h2>
                  <p className="text-neutral-500 text-xl font-medium">Senior Electrical Technician • Campus Facilities</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-neutral-100">
                  <ProfileField label="Service ID" value="FAC-OFF-2026" icon={<HardHat size={20}/>} />
                  <ProfileField label="Core Specialty" value="Infrastructure & Grid" icon={<ShieldCheck size={20}/>} />
                  <ProfileField label="Official Email" value="john.m@smartcampus.edu" icon={<Mail size={20}/>} />
                  <ProfileField label="Duty Radio" value="EXT-2244" icon={<Phone size={20}/>} />
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
            <h3 className="text-2xl font-black text-neutral-900">Module Locked</h3>
            <p className="text-neutral-500 max-w-xs mt-2">Authentication for this officer sub-module is pending.</p>
            <button onClick={() => setActiveScreen('home')} className="mt-8 px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl">Back to Hub</button>
          </div>
        );
    }
  };

  return (
    <DashboardLayout 
      role="official" 
      onLogout={onLogout} 
      title={activeScreen === 'home' ? 'Service Hub' : activeScreen === 'tasks' ? 'Work Assignments' : activeScreen === 'notifications' ? 'Duty Alerts' : 'Officer Account'}
      activeScreen={activeScreen}
      onScreenChange={setActiveScreen}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

const StatusBadge = ({ status }: { status: Task['status'] }) => {
  const styles = {
    'assigned': 'bg-blue-50 text-blue-600 border border-blue-100',
    'in-progress': 'bg-amber-50 text-amber-600 border border-amber-100',
    'completed': 'bg-emerald-50 text-emerald-600 border border-emerald-100'
  };
  return (
    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${styles[status]}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

const StatCard = ({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm flex items-center justify-between group hover:border-emerald-500 transition-all hover:shadow-lg">
    <div>
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3">{label}</p>
      <p className="text-5xl font-black text-neutral-900">{value}</p>
    </div>
    <div className="p-6 bg-neutral-50 rounded-[2rem] group-hover:bg-emerald-50 transition-all ring-8 ring-neutral-50/50 group-hover:ring-emerald-50/50">
      {icon}
    </div>
  </div>
);

const ProfileField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-6 group">
    <div className="p-5 bg-neutral-50 rounded-3xl text-neutral-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-bold text-neutral-800">{value}</p>
    </div>
  </div>
);
