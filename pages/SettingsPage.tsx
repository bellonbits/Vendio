
import React, { useState } from 'react';
import { CreditCard, Shield, Bell, Zap, Check, ChevronRight, Smartphone, Building, Globe, Mail } from 'lucide-react';
import { User, Store } from '../types';

interface SettingsPageProps {
  user: User;
  store: Store | null;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, store }) => {
  const [activeSection, setActiveSection] = useState<'billing' | 'payouts' | 'profile'>('billing');

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Settings Navigation */}
      <aside className="w-full lg:w-72 space-y-2">
        <SettingNavItem 
          icon={<Zap size={18} />} 
          label="Subscription" 
          active={activeSection === 'billing'} 
          onClick={() => setActiveSection('billing')} 
        />
        <SettingNavItem 
          icon={<CreditCard size={18} />} 
          label="Payout Methods" 
          active={activeSection === 'payouts'} 
          onClick={() => setActiveSection('payouts')} 
        />
        <SettingNavItem 
          icon={<Building size={18} />} 
          label="Business Profile" 
          active={activeSection === 'profile'} 
          onClick={() => setActiveSection('profile')} 
        />
        <SettingNavItem 
          icon={<Bell size={18} />} 
          label="Notifications" 
          active={false} 
          onClick={() => {}} 
        />
        <SettingNavItem 
          icon={<Shield size={18} />} 
          label="Security" 
          active={false} 
          onClick={() => {}} 
        />
      </aside>

      {/* Main Settings Content */}
      <div className="flex-1">
        {activeSection === 'billing' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-20 rotate-12">
                 <Zap size={140} />
               </div>
               <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-sm">Current Plan</span>
                <h2 className="text-5xl font-black mb-4 capitalize">{user.subscriptionTier || 'Free'} Plan</h2>
                <p className="text-slate-400 font-medium max-w-sm mb-8">You are currently on the {user.subscriptionTier} plan. Scale your business by unlocking premium features.</p>
                <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-95">
                  Upgrade to Enterprise
                </button>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <PricingCard 
                name="Pro" 
                price="$29" 
                features={["Custom domain", "0% platform fees", "Unlimited products", "Priority support"]} 
                active={user.subscriptionTier === 'pro'}
              />
              <PricingCard 
                name="Enterprise" 
                price="Custom" 
                features={["SLA Guarantees", "Dedicated account manager", "Advanced analytics", "Custom integrations"]} 
                active={user.subscriptionTier === 'enterprise'}
              />
            </div>
          </div>
        )}

        {activeSection === 'payouts' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Payout Methods</h3>
              <p className="text-slate-500 font-medium">Configure how you receive your hard-earned money.</p>
            </div>

            <div className="space-y-4">
              <PayoutCard 
                icon={<CreditCard className="text-indigo-600" />} 
                title="Stripe Connect" 
                status="Connected" 
                desc="Automatic daily payouts to your bank account."
                connected={true}
              />
              <PayoutCard 
                icon={<Smartphone className="text-emerald-600" />} 
                title="M-Pesa Payouts" 
                status="Not Configured" 
                desc="Withdraw instantly to your M-Pesa mobile wallet."
                connected={false}
              />
              <PayoutCard 
                icon={<Globe className="text-blue-600" />} 
                title="PayPal Business" 
                status="Not Configured" 
                desc="Global payouts to your verified PayPal account."
                connected={false}
              />
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl">
              <h4 className="font-black text-indigo-900 mb-2">Platform Commission</h4>
              <p className="text-indigo-700/70 text-sm font-medium leading-relaxed">Vendio takes a 5% commission on all transactions on the Free plan. Pro and Enterprise users enjoy 0% platform fees, only paying standard processing fees from providers like Stripe.</p>
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
           <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Account Details</h3>
                <p className="text-slate-500 font-medium">Update your personal and business information.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input 
                        type="email" 
                        defaultValue={user.email} 
                        className="w-full pl-12 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold opacity-70 cursor-not-allowed outline-none" 
                        readOnly 
                      />
                    </div>
                  </div>
                  {store && (
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Store Name</label>
                      <input 
                        type="text" 
                        defaultValue={store.name} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                      />
                    </div>
                  )}
                </div>
                <div className="pt-4 flex justify-end">
                   <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                     Save Changes
                   </button>
                </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

const SettingNavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
      active ? 'bg-white shadow-xl shadow-slate-200/50 text-indigo-600 font-black scale-[1.02]' : 'text-slate-500 font-bold hover:bg-white hover:shadow-lg hover:shadow-slate-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`transition-colors ${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'}`}>{icon}</div>
      <span>{label}</span>
    </div>
    <ChevronRight size={16} className={`transition-transform ${active ? 'translate-x-1' : 'opacity-0'}`} />
  </button>
);

const PricingCard = ({ name, price, features, active }: { name: string, price: string, features: string[], active: boolean }) => (
  <div className={`p-8 rounded-[2.5rem] border transition-all ${active ? 'bg-indigo-50 border-indigo-200 shadow-xl shadow-indigo-100/30' : 'bg-white border-slate-100 shadow-sm'}`}>
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-xl font-black text-slate-900">{name}</h4>
      {active && <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Active</span>}
    </div>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-black text-slate-900">{price}</span>
      {price !== 'Custom' && <span className="text-slate-400 font-bold">/mo</span>}
    </div>
    <ul className="space-y-4 mb-10">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Check size={12} strokeWidth={4} />
          </div>
          {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${
      active ? 'bg-indigo-100 text-indigo-700 cursor-default' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200'
    }`}>
      {active ? 'Manage Plan' : 'Select Plan'}
    </button>
  </div>
);

const PayoutCard = ({ icon, title, status, desc, connected }: { icon: React.ReactNode, title: string, status: string, desc: string, connected: boolean }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-indigo-200 transition-colors">
    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
      <div className="scale-125">{icon}</div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-1">
        <h4 className="font-black text-slate-900">{title}</h4>
        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider ${connected ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
          {status}
        </span>
      </div>
      <p className="text-xs font-medium text-slate-400 leading-relaxed">{desc}</p>
    </div>
    <button className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${
      connected ? 'bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
    }`}>
      {connected ? 'Disconnect' : 'Connect'}
    </button>
  </div>
);

export default SettingsPage;
