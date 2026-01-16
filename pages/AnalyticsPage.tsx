
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Globe, 
  Zap, 
  ArrowUpRight, 
  ShoppingBag, 
  Users, 
  MousePointer2 
} from 'lucide-react';
import { Store } from '../types';

interface AnalyticsPageProps {
  store: Store;
}

const salesData = [
  { date: '2025-05-01', sales: 4200, orders: 12 },
  { date: '2025-05-02', sales: 3800, orders: 10 },
  { date: '2025-05-03', sales: 5100, orders: 15 },
  { date: '2025-05-04', sales: 4800, orders: 14 },
  { date: '2025-05-05', sales: 6200, orders: 18 },
  { date: '2025-05-06', sales: 7500, orders: 22 },
  { date: '2025-05-07', sales: 8100, orders: 25 },
];

const categoryData = [
  { name: 'Physical Goods', value: 400 },
  { name: 'Digital Items', value: 300 },
  { name: 'Bookings', value: 300 },
];

const COLORS = ['#6366f1', '#ec4899', '#f59e0b'];

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ store }) => {
  return (
    <div className="space-y-8 pb-20">
      {/* Header Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth</p>
            <h4 className="text-xl font-black text-slate-900">+24.5%</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Conversion</p>
            <h4 className="text-xl font-black text-slate-900">3.82%</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sessions</p>
            <h4 className="text-xl font-black text-slate-900">12,402</h4>
          </div>
        </div>
      </div>

      {/* Main Revenue Chart */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-black text-slate-900">Sales Over Time</h3>
            <p className="text-sm font-medium text-slate-400">Total revenue generated from all sources</p>
          </div>
          <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
            Download Report
          </button>
        </div>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}} 
                dy={10}
                tickFormatter={(val) => new Date(val).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
              <Tooltip 
                 contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">Revenue by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {categoryData.map((item, i) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                   <span className="text-[10px] font-black uppercase text-slate-400 truncate">{item.name}</span>
                </div>
                <div className="text-sm font-bold text-slate-900">${item.value}k</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">Top Performing Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Mountain Tent', revenue: '$12,400', sales: 50, trend: 'up' },
              { name: 'Titanium Pot', revenue: '$8,200', sales: 120, trend: 'up' },
              { name: 'Survival Class', revenue: '$4,500', sales: 100, trend: 'down' },
              { name: 'Digital Guide', revenue: '$2,100', sales: 110, trend: 'up' },
            ].map(product => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <ShoppingBag size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{product.name}</h4>
                    <p className="text-[10px] font-medium text-slate-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">{product.revenue}</div>
                  <div className={`text-[10px] font-bold ${product.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {product.trend === 'up' ? 'Hot' : 'Stable'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
