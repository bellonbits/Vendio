
import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  MoreVertical,
  ExternalLink,
  Download
} from 'lucide-react';
import { Store, Order } from '../types';

interface OrdersPageProps {
  store: Store;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ store }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const orders: Order[] = [
    {
      id: 'ORD-8291',
      storeId: store.id,
      customerId: 'c1',
      // Added missing customer properties
      customerName: 'James Wilson',
      customerEmail: 'james.w@example.com',
      items: [{ productId: 'p1', quantity: 1, priceAtPurchase: 245 }],
      totalAmount: 245,
      status: 'paid',
      createdAt: '2025-05-12T14:30:00Z'
    },
    {
      id: 'ORD-8292',
      storeId: store.id,
      customerId: 'c2',
      // Added missing customer properties
      customerName: 'Elena Rodriguez',
      customerEmail: 'elena.ro@gmail.com',
      items: [{ productId: 'p2', quantity: 1, priceAtPurchase: 68 }],
      totalAmount: 68,
      status: 'shipped',
      createdAt: '2025-05-12T16:45:00Z'
    },
    {
      id: 'ORD-8293',
      storeId: store.id,
      customerId: 'c3',
      // Added missing customer properties
      customerName: 'Marcus Chen',
      customerEmail: 'marcus@startup.io',
      items: [{ productId: 'p3', quantity: 2, priceAtPurchase: 45 }],
      totalAmount: 90,
      status: 'pending',
      createdAt: '2025-05-13T09:15:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'pending': return 'bg-orange-50 text-orange-700 border-orange-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle2 size={14} />;
      case 'shipped': return <Truck size={14} />;
      case 'pending': return <Clock size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            All Orders
          </button>
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'completed' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Completed
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{order.id}</h4>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Placed on May 12, 2025 • {order.items.length} items</p>
                </div>
              </div>
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                <div className="text-lg font-bold text-slate-900">${order.totalAmount.toFixed(2)}</div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <ExternalLink size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Summary of items */}
            <div className="mt-6 pt-6 border-t border-slate-50 flex gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse"></div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
