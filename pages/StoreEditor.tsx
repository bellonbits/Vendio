
import React from 'react';
import { 
  Palette, 
  Layout as LayoutIcon, 
  Smartphone, 
  Monitor, 
  Save, 
  Eye, 
  Type, 
  Image as ImageIcon,
  Circle,
  // Fix: Import missing Plus and Globe icons
  Plus,
  Globe
} from 'lucide-react';
import { Store } from '../types';

interface StoreEditorProps {
  store: Store;
  setStore: (store: Store) => void;
}

const StoreEditor: React.FC<StoreEditorProps> = ({ store, setStore }) => {
  const updateTheme = (key: string, value: string) => {
    setStore({
      ...store,
      theme: { ...store.theme, [key]: value }
    });
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-8">
      {/* Controls */}
      <div className="w-full md:w-80 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <section>
            <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
              <Palette size={18} className="text-indigo-600" />
              Branding
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Accent Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'].map(color => (
                    <button
                      key={color}
                      onClick={() => updateTheme('primaryColor', color)}
                      className={`h-8 rounded-lg border-2 transition-all ${store.theme.primaryColor === color ? 'border-indigo-600 scale-110 shadow-sm' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="relative">
                    <input 
                      type="color" 
                      value={store.theme.primaryColor}
                      onChange={(e) => updateTheme('primaryColor', e.target.value)}
                      className="absolute inset-0 w-full h-8 opacity-0 cursor-pointer" 
                    />
                    <div className="h-8 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
                      <Plus size={14} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Logo</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50">
                    <ImageIcon size={20} />
                  </div>
                  <span className="text-xs font-medium text-slate-500">Click to upload</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
              <LayoutIcon size={18} className="text-indigo-600" />
              Layout
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-indigo-600 bg-indigo-50">
                <div className="w-full h-12 bg-white rounded-md border border-indigo-200 flex flex-col gap-1 p-2">
                  <div className="w-full h-1.5 bg-indigo-100 rounded" />
                  <div className="w-2/3 h-1.5 bg-indigo-50 rounded" />
                </div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Single Column</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all">
                <div className="w-full h-12 bg-white rounded-md border border-slate-200 flex flex-wrap gap-1 p-2">
                  <div className="w-1/2 h-4 bg-slate-50 rounded" />
                  <div className="w-[calc(50%-4px)] h-4 bg-slate-50 rounded" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Grid View</span>
              </button>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
              <Type size={18} className="text-indigo-600" />
              Typography
            </h3>
            <select 
              value={store.theme.fontFamily}
              onChange={(e) => updateTheme('fontFamily', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium"
            >
              <option value="Inter">Modern (Inter)</option>
              <option value="Georgia">Classic (Georgia)</option>
              <option value="Courier Prime">Minimal (Courier)</option>
            </select>
          </section>
        </div>

        <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {/* Preview */}
      <div className="flex-1 bg-slate-200 rounded-3xl p-6 relative flex flex-col items-center">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-300 shadow-sm z-20">
          <button className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><Smartphone size={16} /></button>
          <button className="p-1.5 rounded-full text-slate-400 hover:text-slate-600"><Monitor size={16} /></button>
          <div className="w-px h-4 bg-slate-300 mx-2" />
          <span className="text-xs font-bold text-slate-500">LIVE PREVIEW</span>
        </div>

        <div className="mt-12 w-full max-w-sm h-full bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden relative">
          {/* Mockup Screen Content */}
          <div className="h-full overflow-y-auto custom-scrollbar" style={{ fontFamily: store.theme.fontFamily }}>
            <div className="h-24 relative overflow-hidden">
               <div className="absolute inset-0" style={{ backgroundColor: store.theme.primaryColor, opacity: 0.1 }}></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                   <span className="text-xl font-bold" style={{ color: store.theme.primaryColor }}>RG</span>
                 </div>
               </div>
            </div>
            
            <div className="px-6 pt-12 text-center">
              <h1 className="text-xl font-bold text-slate-900">{store.name}</h1>
              <p className="text-xs text-slate-500 mt-2 px-4">{store.description}</p>
              
              <div className="flex justify-center gap-4 mt-6">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Smartphone size={14} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Globe size={14} />
                </div>
              </div>
            </div>

            <div className="px-6 mt-8 space-y-4 pb-12">
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-50"></div>
                <div className="flex-1">
                  <div className="h-2 w-24 bg-slate-100 rounded"></div>
                  <div className="h-2 w-16 bg-slate-50 rounded mt-2"></div>
                </div>
                <div className="font-bold text-sm" style={{ color: store.theme.primaryColor }}>$45</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-50"></div>
                <div className="flex-1">
                  <div className="h-2 w-20 bg-slate-100 rounded"></div>
                  <div className="h-2 w-12 bg-slate-50 rounded mt-2"></div>
                </div>
                <div className="font-bold text-sm" style={{ color: store.theme.primaryColor }}>$120</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreEditor;
