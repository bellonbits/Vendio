
import React, { useState } from 'react';
import { User, Store, StoreStatus } from '../types';
import { ArrowRight, Sparkles, Store as StoreIcon, Rocket, Globe, Palette, CheckCircle2 } from 'lucide-react';

interface OnboardingFlowProps {
  user: User;
  onComplete: (store: Store) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [storeData, setStoreData] = useState({
    name: '',
    slug: '',
    description: '',
    primaryColor: '#6366f1'
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      const newStore: Store = {
        id: `s_${Date.now()}`,
        vendorId: user.id,
        name: storeData.name,
        slug: storeData.slug || storeData.name.toLowerCase().replace(/\s+/g, '-'),
        description: storeData.description,
        status: StoreStatus.PENDING_APPROVAL,
        commissionRate: 0.05,
        theme: {
          primaryColor: storeData.primaryColor,
          fontFamily: 'Inter',
          borderRadius: '1rem'
        }
      };
      onComplete(newStore);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-16">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                step >= i ? 'bg-indigo-600' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-8">
              <StoreIcon size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-3">Name your empire.</h1>
              <p className="text-slate-500 font-medium">Every great business starts with a name. You can always change this later.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Name</label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g. Pixel Perfect Goods"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl px-6 py-4 text-xl font-bold transition-all outline-none"
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store URL</label>
                <div className="flex items-center bg-slate-50 rounded-2xl border-2 border-transparent focus-within:border-indigo-600 transition-all">
                  <span className="pl-6 text-slate-400 font-bold text-sm">vendio.io/</span>
                  <input 
                    type="text" 
                    placeholder="pixel-perfect"
                    className="flex-1 bg-transparent px-2 py-4 text-sm font-bold outline-none"
                    value={storeData.slug}
                    onChange={(e) => setStoreData({...storeData, slug: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mb-8">
              <Palette size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-3">Pick your vibe.</h1>
              <p className="text-slate-500 font-medium">Choose a color that represents your brand identity.</p>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#0f172a'].map(color => (
                <button 
                  key={color}
                  onClick={() => setStoreData({...storeData, primaryColor: color})}
                  className={`h-16 rounded-3xl border-4 transition-all ${
                    storeData.primaryColor === color ? 'border-slate-900 scale-110 shadow-xl' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="p-8 rounded-[2rem] border-2 border-slate-100 bg-slate-50/50 flex items-center gap-6">
              <div 
                className="w-16 h-16 rounded-2xl shrink-0 shadow-lg shadow-indigo-100 flex items-center justify-center font-black text-white"
                style={{ backgroundColor: storeData.primaryColor }}
              >
                {storeData.name[0] || '?'}
              </div>
              <div>
                <h4 className="font-black text-slate-900">{storeData.name || 'Your Store'}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Store Preview</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-600 mx-auto mb-10 shadow-xl shadow-emerald-50">
              <CheckCircle2 size={56} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-4">You're ready to launch!</h1>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">Your store has been created and is waiting for a quick automated review. You can start adding products immediately.</p>
            </div>
            <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100 space-y-4">
               <div className="flex items-center gap-3 text-indigo-700 font-black justify-center">
                 <Sparkles size={20} />
                 Free 14-day Pro Trial Activated
               </div>
               <p className="text-indigo-600/70 text-sm font-medium">We've given you full access to all features so you can see the power of Vendio firsthand.</p>
            </div>
          </div>
        )}

        <div className="mt-16 flex items-center justify-between">
          <button 
            onClick={() => step > 1 && setStep(step - 1)}
            className={`text-slate-400 font-black uppercase text-xs tracking-widest hover:text-slate-900 transition-colors ${step === 1 ? 'invisible' : ''}`}
          >
            Back
          </button>
          <button 
            disabled={step === 1 && !storeData.name}
            onClick={handleNext}
            className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 disabled:opacity-50 disabled:shadow-none active:scale-95"
          >
            {step === 3 ? 'Launch Dashboard' : 'Continue'}
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
