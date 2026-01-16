
import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Store as StoreIcon, 
  ShoppingBag, 
  Settings, 
  BarChart3, 
  ExternalLink,
  ChevronRight,
  Plus,
  Package,
  Calendar,
  Users,
  CreditCard,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  UserPlus,
  LineChart as LineChartIcon
} from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import StoreEditor from './pages/StoreEditor';
import ProductManagement from './pages/ProductManagement';
import PublicStorefront from './pages/PublicStorefront';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import CustomerManagement from './pages/CustomerManagement';
import SettingsPage from './pages/SettingsPage';
import OnboardingFlow from './pages/OnboardingFlow';
import AnalyticsPage from './pages/AnalyticsPage';
import { User, Store, StoreStatus } from './types';

type PageType = 'landing' | 'dashboard' | 'editor' | 'products' | 'orders' | 'public' | 'admin' | 'customers' | 'settings' | 'onboarding' | 'analytics';

export interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'order' | 'warning' | 'update' | 'payout' | 'booking';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', title: 'New Order #184', desc: 'Sarah Jenkins bought Mountain Tent', time: '12m ago', type: 'order' },
    { id: 'n2', title: 'Inventory Alert', desc: 'Sleeping Bag is low on stock (2 left)', time: '2h ago', type: 'warning' },
    { id: 'n3', title: 'Store Updated', desc: 'Logo and branding changes saved', time: '5h ago', type: 'update' },
    { id: 'n4', title: 'Payment Processed', desc: 'Payout of $2,450 sent to Stripe', time: 'Yesterday', type: 'payout' },
  ]);

  const addNotification = (notif: Omit<Notification, 'id'>) => {
    const newNotif = { ...notif, id: `notif-${Date.now()}` };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Mock authentication for demo
  const handleLogin = (role: 'vendor' | 'admin' = 'vendor') => {
    const mockUser: User = {
      id: role === 'admin' ? 'admin1' : 'u1',
      email: role === 'admin' ? 'admin@vendio.io' : 'alex@vendio.io',
      name: role === 'admin' ? 'Super Admin' : 'Alex Rivera',
      role: role,
      subscriptionTier: 'pro'
    };
    
    setUser(mockUser);
    
    if (role === 'admin') {
      setCurrentPage('admin');
    } else {
      const mockStore: Store = {
        id: 's1',
        vendorId: 'u1',
        name: 'Riverside Gear',
        slug: 'riverside',
        description: 'Handcrafted outdoor gear for the modern explorer.',
        status: StoreStatus.ACTIVE,
        commissionRate: 0.05,
        theme: {
          primaryColor: '#6366f1',
          fontFamily: 'Inter',
          borderRadius: '0.5rem'
        }
      };
      setActiveStore(mockStore);
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveStore(null);
    setCurrentPage('landing');
  };

  const renderContent = () => {
    if (currentPage === 'onboarding') return <OnboardingFlow user={user!} onComplete={(store) => { setActiveStore(store); setCurrentPage('dashboard'); }} />;
    
    switch (currentPage) {
      case 'landing':
        return <LandingPage onStart={() => handleLogin('vendor')} onAdminStart={() => handleLogin('admin')} />;
      case 'dashboard':
        return <Dashboard store={activeStore!} notifications={notifications} />;
      case 'analytics':
        return <AnalyticsPage store={activeStore!} />;
      case 'editor':
        return <StoreEditor store={activeStore!} setStore={setActiveStore} />;
      case 'products':
        return <ProductManagement store={activeStore!} />;
      case 'orders':
        return <OrdersPage store={activeStore!} />;
      case 'customers':
        return <CustomerManagement store={activeStore!} />;
      case 'admin':
        return <AdminDashboard />;
      case 'settings':
        return <SettingsPage user={user!} store={activeStore} />;
      case 'public':
        return <PublicStorefront 
          store={activeStore!} 
          onBack={() => setCurrentPage('dashboard')} 
          onBookingSuccess={(notif) => addNotification(notif)}
        />;
      default:
        return <LandingPage onStart={() => handleLogin('vendor')} onAdminStart={() => handleLogin('admin')} />;
    }
  };

  if (currentPage === 'public') return renderContent();
  if (currentPage === 'landing') return renderContent();
  if (currentPage === 'onboarding') return renderContent();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">V</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Vendio</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {user?.role === 'admin' ? (
            <NavItem 
              icon={<ShieldCheck size={20} />} 
              label="Admin Hub" 
              active={currentPage === 'admin'} 
              onClick={() => setCurrentPage('admin')} 
            />
          ) : (
            <>
              <NavItem 
                icon={<BarChart3 size={20} />} 
                label="Overview" 
                active={currentPage === 'dashboard'} 
                onClick={() => setCurrentPage('dashboard')} 
              />
              <NavItem 
                icon={<LineChartIcon size={20} />} 
                label="Analytics" 
                active={currentPage === 'analytics'} 
                onClick={() => setCurrentPage('analytics')} 
              />
              <NavItem 
                icon={<StoreIcon size={20} />} 
                label="Store Editor" 
                active={currentPage === 'editor'} 
                onClick={() => setCurrentPage('editor')} 
              />
              <NavItem 
                icon={<Package size={20} />} 
                label="Products" 
                active={currentPage === 'products'} 
                onClick={() => setCurrentPage('products')} 
              />
              <NavItem 
                icon={<ShoppingBag size={20} />} 
                label="Orders" 
                active={currentPage === 'orders'} 
                onClick={() => setCurrentPage('orders')} 
              />
              <NavItem 
                icon={<Users size={20} />} 
                label="Customers" 
                active={currentPage === 'customers'} 
                onClick={() => setCurrentPage('customers')} 
              />
            </>
          )}
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={currentPage === 'settings'} 
            onClick={() => setCurrentPage('settings')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          {activeStore && (
            <button 
              onClick={() => setCurrentPage('public')}
              className="w-full flex items-center justify-between p-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all group mb-2"
            >
              <div className="flex items-center gap-2">
                <ExternalLink size={18} className="group-hover:text-indigo-600 transition-colors" />
                <span>View Store</span>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </button>
          )}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-500">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 capitalize leading-tight">
                {currentPage === 'dashboard' ? 'Overview' : currentPage.replace(/([A-Z])/g, ' $1')}
              </h1>
              {activeStore && <p className="text-xs font-medium text-slate-500">{activeStore.name}</p>}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900">{user?.name}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                {user?.subscriptionTier || 'Free'} Plan
              </span>
            </div>
            <div className="relative group">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt="avatar" 
                className="w-10 h-10 rounded-xl bg-slate-100 ring-2 ring-white shadow-sm cursor-pointer"
              />
              <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-10 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 translate-x-1' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-400'}`}>{icon}</span>
    {label}
  </button>
);

export default App;
