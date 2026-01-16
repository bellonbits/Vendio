
import React, { useState } from 'react';
import { Users, Search, Filter, MoreHorizontal, Mail, Phone, Calendar, ArrowRight, Download } from 'lucide-react';
import { Store, Customer } from '../types';

interface CustomerManagementProps {
  store: Store;
}

const mockCustomers: Customer[] = [
  { id: 'c1', name: 'James Wilson', email: 'james.w@example.com', totalOrders: 12, totalSpent: 842.50, lastOrderAt: '2025-05-10' },
  { id: 'c2', name: 'Elena Rodriguez', email: 'elena.ro@gmail.com', totalOrders: 3, totalSpent: 125.00, lastOrderAt: '2025-05-12' },
  { id: 'c3', name: 'Marcus Chen', email: 'marcus@startup.io', totalOrders: 1, totalSpent: 45.00, lastOrderAt: '2025-04-20' },
  { id: 'c4', name: 'Sophie Laurent', email: 'sophie.l@outlook.com', totalOrders: 8, totalSpent: 512.20, lastOrderAt: '2025-05-08' },
];

const CustomerManagement: React.FC<CustomerManagementProps> = ({ store }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="grid md:grid-cols-3 gap-6">
        <CustomerMetric 
          label="Total Unique Customers" 
          value="1,248" 
          change="+42 this week" 
        />
        <CustomerMetric 
          label="Repeat Customer Rate" 
          value="34.2%" 
          change="+1.5% improvement" 
        />
        <CustomerMetric 
          label="Average LTV" 
          value="$154.20" 
          change="Top 5% of your niche" 
        />
      </div>

      {/* Main CRM Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={18} />
              Segments
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-100">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Activity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Value</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Order</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="group hover:bg-slate-50/30 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-lg group-hover:scale-110 transition-transform">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="font-black text-slate-900">{customer.name}</div>
                        <div className="text-sm font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Mail size={12} /> {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{customer.totalOrders} Orders</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(customer.totalOrders * 10, 100)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-slate-900">${customer.totalSpent.toFixed(2)}</div>
                    <div className="text-[10px] font-black text-emerald-500 uppercase mt-0.5">Profitable</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-300" />
                      {new Date(customer.lastOrderAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                      <ArrowRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-slate-200" size={32} />
            </div>
            <h4 className="text-xl font-black text-slate-900">No customers found</h4>
            <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto">Try adjusting your filters or search term to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomerMetric = ({ label, value, change }: { label: string, value: string, change: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{label}</div>
    <div className="text-4xl font-black text-slate-900 mb-2">{value}</div>
    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-full">{change}</div>
  </div>
);

export default CustomerManagement;
