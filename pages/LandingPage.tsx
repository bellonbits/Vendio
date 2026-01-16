
import React from 'react';
import { ShoppingBag, ArrowRight, Zap, Globe, Shield, Rocket, CreditCard, ChevronRight, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onAdminStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onAdminStart }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-xl shadow-indigo-200">V</div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">Vendio</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#cases" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Success Stories</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onAdminStart}
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors mr-2"
          >
            <ShieldCheck size={18} />
            Admin Login
          </button>
          <button 
            onClick={onStart}
            className="bg-indigo-600 text-white px-7 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black mb-8 tracking-widest uppercase">
          <Sparkles size={14} fill="currentColor" />
          The future of multi-vendor commerce
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
          Own your store. <br />
          <span className="text-indigo-600">Monetize your link.</span>
        </h1>
        <p className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Whether you sell physical goods, digital assets, or professional services, 
          Vendio provides the infrastructure to scale your business with one unified dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button 
            onClick={onStart}
            className="group w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
          >
            Create Your Hub
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-sm">
            View Marketplace
          </button>
        </div>

        {/* Floating elements visual logic */}
        <div className="mt-24 relative max-w-5xl mx-auto">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-50 animate-pulse delay-700"></div>
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3" 
            alt="Vendio Analytics" 
            className="rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] border border-slate-100 ring-8 ring-white mx-auto relative z-10"
          />
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-slate-50/50 border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by global innovators</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
             <span className="text-2xl font-black italic">STRIPE</span>
             <span className="text-2xl font-black italic">SHOPIFY</span>
             <span className="text-2xl font-black italic">GUMROAD</span>
             <span className="text-2xl font-black italic">PATREON</span>
             <span className="text-2xl font-black italic">KLARNA</span>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Everything you need, nothing you don't.</h2>
            <p className="text-slate-500 font-medium">We've stripped away the complexity of traditional e-commerce to give you a platform that just works.</p>
            <button className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">
              Compare all features <ChevronRight size={18} />
            </button>
          </div>
          <FeatureCard 
            icon={<Zap className="text-amber-500" fill="currentColor" />} 
            title="Instant Checkout" 
            desc="One-click payments via Stripe, Apple Pay, and Google Pay. Don't let friction kill your conversion rate." 
          />
          <FeatureCard 
            icon={<Globe className="text-indigo-500" />} 
            title="Global Infrastructure" 
            desc="Serve customers anywhere with high-availability edge delivery and multi-currency support." 
          />
          <FeatureCard 
            icon={<Shield className="text-emerald-500" />} 
            title="PCI Compliance" 
            desc="Enterprise-grade security handled for you. Focus on selling, we'll handle the risk management." 
          />
          <FeatureCard 
            icon={<Rocket className="text-rose-500" />} 
            title="Creator Ecosystem" 
            desc="Built-in audience tools, link-in-bio optimization, and affiliate management systems." 
          />
          <FeatureCard 
            icon={<CreditCard className="text-sky-500" />} 
            title="Flexible Payouts" 
            desc="Withdraw your earnings instantly to your bank account or mobile wallet (M-Pesa supported)." 
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 pt-24 pb-12 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">V</div>
              <span className="text-xl font-bold tracking-tighter text-slate-900">Vendio</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">Vendio is the world's most modular commerce engine. Empowering over 100,000 entrepreneurs to build their dreams without technical hurdles.</p>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">Storefronts</a></li>
              <li><a href="#" className="hover:text-indigo-600">Digital Goods</a></li>
              <li><a href="#" className="hover:text-indigo-600">Booking Engine</a></li>
              <li><a href="#" className="hover:text-indigo-600">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-200 opacity-60">
          <p className="text-sm font-bold text-slate-400">© 2025 Vendio Commerce Inc.</p>
          <div className="flex gap-8">
            <div className="w-5 h-5 bg-slate-300 rounded-full"></div>
            <div className="w-5 h-5 bg-slate-300 rounded-full"></div>
            <div className="w-5 h-5 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-2 group">
    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-colors">
      <div className="scale-125">{icon}</div>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const Sparkles = ({ size, fill, className }: { size: number, fill?: string, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={fill || "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 1" />
    <path d="m19 19 1 1" />
    <path d="m5 21 1-1" />
    <path d="m19 3 1 1" />
  </svg>
);

export default LandingPage;
