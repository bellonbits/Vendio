
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Store } from '../types';
import { Notification } from '../App';

interface DashboardProps {
  store: Store;
  notifications: Notification[];
}

const data = [
  { name: 'Mon', revenue: 400, orders: 24 },
  { name: 'Tue', revenue: 300, orders: 13 },
  { name: 'Wed', revenue: 900, orders: 48 },
  { name: 'Thu', revenue: 200, orders: 19 },
  { name: 'Fri', revenue: 800, orders: 38 },
  { name: 'Sat', revenue: 1100, orders: 52 },
  { name: 'Sun', revenue: 1300, orders: 61 },
];

const Dashboard: React.FC<DashboardProps> = ({ store, notifications }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, Alex!</h2>
          <p className="text-slate-500">Here's what's happening at {store.name} today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Store is live
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value="$12,845.00" 
          change="+12.5%" 
          trend="up" 
          icon={<TrendingUp className="text-indigo-600" />} 
        />
        <StatCard 
          label="Active Customers" 
          value="1,240" 
          change="+3.2%" 
          trend="up" 
          icon={<Users className="text-blue-600" />} 
        />
        <StatCard 
          label="Orders" 
          value="184" 
          change="-2.1%" 
          trend="down" 
          icon={<ShoppingBag className="text-emerald-600" />} 
        />
        <StatCard 
          label="Store Views" 
          value="45.2k" 
          change="+18.4%" 
          trend="up" 
          icon={<TrendingUp className="text-orange-600" />} 
        />
      </div>

      {/* Charts & Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 text-lg">Sales Performance</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-sm font-medium">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#6366f1', fontWeight: 600 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 text-lg mb-6">Recent Activity</h3>
          <div className="flex-1 space-y-6">
            {notifications.slice(0, 5).map(notif => (
              <ActivityItem 
                key={notif.id}
                title={notif.title} 
                desc={notif.desc} 
                time={notif.time} 
                type={notif.type} 
              />
            ))}
          </div>
          <button className="mt-6 w-full py-2 bg-slate-50 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change, trend, icon }: { label: string, value: string, change: string, trend: 'up' | 'down', icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <button className="text-slate-400 hover:text-slate-600">
        <MoreVertical size={18} />
      </button>
    </div>
    <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className={`text-xs font-bold flex items-center gap-0.5 ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </span>
    </div>
  </div>
);

const ActivityItem = ({ title, desc, time, type }: { title: string, desc: string, time: string, type: string }) => (
  <div className="flex gap-4">
    <div className="relative mt-1">
      <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-white ${
        type === 'order' ? 'bg-indigo-600' : 
        type === 'warning' ? 'bg-orange-500' :
        type === 'update' ? 'bg-blue-500' : 
        type === 'booking' ? 'bg-amber-500' : 'bg-emerald-500'
      }`}></div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-bold text-slate-900 truncate">{title}</div>
      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{desc}</div>
      <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{time}</div>
    </div>
  </div>
);

export default Dashboard;
