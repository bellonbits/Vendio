
import React, { useState } from 'react';
import { 
  Users, 
  Store, 
  DollarSign, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  MoreVertical,
  Activity,
  ArrowUpRight,
  Search,
  ShieldAlert,
  Settings as SettingsIcon,
  Filter,
  ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StoreStatus } from '../types';

const data = [
  { name: 'Jan', volume: 45000, vendors: 120 },
  { name: 'Feb', volume: 52000, vendors: 150 },
  { name: 'Mar', volume: 48000, vendors: 180 },
  { name: 'Apr', volume: 61000, vendors: 220 },
  { name: 'May', volume: 85000, vendors: 310 },
  { name: 'Jun', volume: 92000, vendors: 380 },
];

const mockStores = [
  { id: 's1', name: 'Artisan Breads', owner: 'Jane Doe', status: StoreStatus.ACTIVE, volume: '$12,400', commission: '$620' },
  { id: 's2', name: 'Yoga with Mark', owner: 'Mark Smith', status: StoreStatus.PENDING_APPROVAL, volume: '$0', commission: '$0' },
  { id: 's3', name: 'Digital Planners', owner: 'Sarah Chen', status: StoreStatus.ACTIVE, volume: '$45,200', commission: '$2,260' },
  { id: 's4', name: 'Crafty Creations', owner: 'Tom Hardy', status: StoreStatus.SUSPENDED, volume: '$1,200', commission: '$60' },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'disputes' | 'settings'>('overview');

  return (
    <div className="space-y-8 pb-20">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-2xl w-fit">
        <TabButton label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <TabButton label="Vendors" active={activeTab === 'vendors'} onClick={() => setActiveTab('vendors')} />
        <TabButton label="Disputes" active={activeTab === 'disputes'} onClick={() => setActiveTab('disputes')} />
        <TabButton label="System Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PlatformStat 
              label="Total Gross Volume" 
              value="$1.42M" 
              change="+18.4%" 
              icon={<DollarSign className="text-indigo-600" />} 
            />
            <PlatformStat 
              label="Platform Revenue" 
              value="$71.2k" 
              change="+12.5%" 
              icon={<Activity className="text-emerald-600" />} 
            />
            <PlatformStat 
              label="Active Vendors" 
              value="1,842" 
              change="+342 this month" 
              icon={<Store className="text-blue-600" />} 
            />
            <PlatformStat 
              label="Total Users" 
              value="45.8k" 
              change="+8.2%" 
              icon={<Users className="text-orange-600" />} 
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Growth Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Platform Growth</h3>
                  <p className="text-sm font-medium text-slate-400">Monthly gross volume and vendor acquisition</p>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                    <Tooltip 
                       cursor={{fill: '#f8fafc'}}
                       contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="volume" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Notifications / Alerts */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-8">Moderation Queue</h3>
              <div className="space-y-6">
                <QueueItem title="Store Approval Required" store="Vintage Vault" time="2m ago" priority="high" />
                <QueueItem title="Identity Verification" store="Sarah's Prints" time="1h ago" priority="medium" />
                <QueueItem title="Dispute Flagged" store="Tech Haven" time="4h ago" priority="high" />
                <QueueItem title="Payout Failed" store="Local Roots" time="1d ago" priority="low" />
              </div>
              <button onClick={() => setActiveTab('vendors')} className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                Open Moderator Panel
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vendors' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900">Manage Vendors</h3>
              <p className="text-sm font-medium text-slate-400">Approve new stores and monitor activity</p>
            </div>
            <div className="flex gap-4">
               <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search stores..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Store</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Owner</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockStores.map(store => (
                  <tr key={store.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">{store.name[0]}</div>
                        <span className="font-bold text-slate-900">{store.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">{store.owner}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        store.status === StoreStatus.ACTIVE ? 'bg-emerald-50 text-emerald-600' :
                        store.status === StoreStatus.PENDING_APPROVAL ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {store.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      {store.status === StoreStatus.PENDING_APPROVAL ? (
                        <div className="flex items-center justify-end gap-2">
                          <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors">Approve</button>
                          <button className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors">Reject</button>
                        </div>
                      ) : (
                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'disputes' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                 <ShieldAlert size={24} />
               </div>
               <div>
                 <h3 className="text-xl font-black text-slate-900">Active Disputes</h3>
                 <p className="text-sm font-medium text-slate-400">Total 12 unresolved transaction conflicts</p>
               </div>
             </div>
             
             <div className="space-y-4">
               {[
                 { id: 'DISP-101', store: 'Artisan Breads', amount: '$45.00', reason: 'Item not as described', status: 'In Review' },
                 { id: 'DISP-102', store: 'Tech Haven', amount: '$1,240.00', reason: 'Fraudulent activity suspected', status: 'Urgent' },
                 { id: 'DISP-103', store: 'Riverside Gear', amount: '$89.99', reason: 'Refund requested, merchant unresponsive', status: 'Pending' },
               ].map(dispute => (
                 <div key={dispute.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="font-black text-slate-900 text-sm w-20">{dispute.id}</div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{dispute.store}</div>
                        <div className="text-xs text-slate-500">{dispute.reason}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-sm font-black text-slate-900">{dispute.amount}</div>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${dispute.status === 'Urgent' ? 'bg-rose-600 text-white' : 'bg-white text-slate-400'}`}>
                        {dispute.status}
                      </span>
                      <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
               <SettingsIcon size={24} />
             </div>
             <div>
               <h3 className="text-xl font-black text-slate-900">System Configuration</h3>
               <p className="text-sm font-medium text-slate-400">Global platform parameters and logic</p>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Commission Rate (%)</label>
                 <input type="number" defaultValue={5} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Minimum Payout Threshold ($)</label>
                 <input type="number" defaultValue={20} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold" />
               </div>
            </div>
            <div className="space-y-6">
               <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                 <h4 className="font-bold text-amber-900 text-sm mb-2">Maintenance Mode</h4>
                 <p className="text-xs text-amber-700/70 mb-4">Temporarily disable vendor logins and public storefront access.</p>
                 <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700">Enable Maintenance</button>
               </div>
               <div className="p-6 bg-slate-900 rounded-2xl">
                 <h4 className="font-bold text-white text-sm mb-2">Platform Logs</h4>
                 <p className="text-xs text-slate-400 mb-4">Download system-wide audit logs for security review.</p>
                 <button className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100">Download CSV</button>
               </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Save Global Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
      active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }`}
  >
    {label}
  </button>
);

const PlatformStat = ({ label, value, change, icon }: { label: string, value: string, change: string, icon: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as React.ReactElement<any>, { size: 64 })}
    </div>
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
      {icon}
    </div>
    <div className="text-3xl font-black text-slate-900 mb-2">{value}</div>
    <div className="flex items-center justify-between">
      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-xs font-black text-emerald-600">{change}</span>
    </div>
  </div>
);

const QueueItem = ({ title, store, time, priority }: { title: string, store: string, time: string, priority: 'high' | 'medium' | 'low' }) => (
  <div className="flex gap-4 group cursor-pointer">
    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
      priority === 'high' ? 'bg-rose-500' : priority === 'medium' ? 'bg-amber-500' : 'bg-slate-300'
    }`}></div>
    <div className="flex-1">
      <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</div>
      <div className="text-xs font-medium text-slate-500 mt-0.5">{store} • {time}</div>
    </div>
  </div>
);

export default AdminDashboard;
