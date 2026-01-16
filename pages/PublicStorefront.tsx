
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Share2, 
  Info, 
  ChevronRight, 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  Shield, 
  Mail, 
  Bell, 
  CheckCircle,
  Sparkles,
  // Fix: Import missing Plus icon
  Plus
} from 'lucide-react';
import { Store, Product, ProductType, BookingSlot } from '../types';
import { Notification } from '../App';

interface PublicStorefrontProps {
  store: Store;
  onBack: () => void;
  onBookingSuccess: (notif: Omit<Notification, 'id'>) => void;
}

const PublicStorefront: React.FC<PublicStorefrontProps> = ({ store, onBack, onBookingSuccess }) => {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock slots for the booking product
  const mockSlots: BookingSlot[] = [
    { id: 'slot-1', productId: 'p3', startTime: '2025-06-12T09:00:00', endTime: '2025-06-12T10:00:00', isBooked: false },
    { id: 'slot-2', productId: 'p3', startTime: '2025-06-12T11:00:00', endTime: '2025-06-12T12:00:00', isBooked: false },
    { id: 'slot-3', productId: 'p3', startTime: '2025-06-13T14:00:00', endTime: '2025-06-13T15:00:00', isBooked: false },
  ];

  // Mock products for the storefront
  const products: Product[] = [
    {
      id: 'p1',
      storeId: store.id,
      name: 'Lightweight Mountain Tent',
      description: 'The perfect companion for solo adventurers. Wind resistant and waterproof.',
      price: 245.00,
      type: ProductType.PHYSICAL,
      imageUrl: 'https://picsum.photos/seed/tent/400/400',
    },
    {
      id: 'p2',
      storeId: store.id,
      name: 'Titanium Camping Cookset',
      description: 'Full nested set for two people. Weighs only 350g total.',
      price: 68.00,
      type: ProductType.PHYSICAL,
      imageUrl: 'https://picsum.photos/seed/pot/400/400',
    },
    {
      id: 'p3',
      storeId: store.id,
      name: 'Outdoor Survival Masterclass',
      description: '1-hour video consultation on wilderness survival basics.',
      price: 45.00,
      type: ProductType.BOOKING,
      imageUrl: 'https://picsum.photos/seed/survival/400/400',
    }
  ];

  const handleBooking = async () => {
    if (!selectedSlot || !selectedProduct) return;
    
    setIsProcessing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const slot = mockSlots.find(s => s.id === selectedSlot);
    const timeStr = slot ? new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    
    // Trigger Vendor Notification
    onBookingSuccess({
      title: 'New Booking Confirmed',
      desc: `A new session for "${selectedProduct.name}" at ${timeStr} has been booked.`,
      time: 'Just now',
      type: 'booking'
    });
    
    setIsProcessing(false);
    setShowSuccess(true);
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setSelectedSlot(null);
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 max-w-md mx-auto shadow-2xl" style={{ fontFamily: store.theme.fontFamily }}>
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-8 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-4 text-center">Booking Confirmed!</h2>
        <p className="text-slate-500 text-center mb-10 font-medium">
          Your spot for <strong>{selectedProduct?.name}</strong> is locked in.
        </p>
        
        <div className="w-full space-y-4 mb-12">
          <div className="flex items-center gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600">
              <Mail size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-indigo-900">Confirmation Sent</p>
              <p className="text-[10px] font-medium text-indigo-700/70">An automated email was sent to your inbox.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900">Vendor Notified</p>
              <p className="text-[10px] font-medium text-slate-500">The merchant has been alerted of your booking.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={closeModals}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 active:scale-95 transition-all"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative shadow-2xl border-x border-slate-100" style={{ fontFamily: store.theme.fontFamily }}>
      {/* Dynamic Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-900">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-900"><Share2 size={20} /></button>
          <div className="relative">
             <ShoppingCart size={20} className="text-slate-500" />
             {cartCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                 {cartCount}
               </span>
             )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="px-6 py-10 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-50 mx-auto border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: store.theme.primaryColor }}>{store.name[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{store.name}</h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          {store.description}
        </p>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-24 space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Our Offerings</h2>
        {products.map(product => (
          <div 
            key={product.id} 
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => {
              setSelectedProduct(product);
              setSelectedSlot(null);
            }}
          >
            <img src={product.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt="" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">{product.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{product.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-extrabold" style={{ color: store.theme.primaryColor }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.type === ProductType.BOOKING && (
                  <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    <CalendarIcon size={8} /> Booking
                  </span>
                )}
                {product.type === ProductType.DIGITAL && (
                  <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold uppercase">Digital</span>
                )}
              </div>
            </div>
            <button className="p-2 text-slate-300 hover:text-indigo-600">
              <ChevronRight size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="py-8 text-center opacity-40">
        <div className="flex items-center justify-center gap-1.5 grayscale">
          <span className="text-xs font-medium">Powered by</span>
          <div className="w-4 h-4 bg-slate-900 rounded-sm flex items-center justify-center text-white text-[6px] font-bold">V</div>
          <span className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Vendio</span>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={closeModals}></div>
          <div className="relative bg-white w-full max-w-md mx-auto rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
            <div className="relative shrink-0">
              <img src={selectedProduct.imageUrl} className="w-full h-48 object-cover" alt="" />
              <button 
                onClick={closeModals}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">{selectedProduct.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-extrabold" style={{ color: store.theme.primaryColor }}>
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-500 leading-relaxed text-sm">
                {selectedProduct.description}
              </p>

              {selectedProduct.type === ProductType.BOOKING && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Available Slots
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {mockSlots.map(slot => (
                      <button 
                        key={slot.id}
                        disabled={slot.isBooked}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          selectedSlot === slot.id 
                            ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-600/10' 
                            : 'border-slate-100 bg-slate-50 hover:bg-white'
                        } ${slot.isBooked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                      >
                        <div>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                            {new Date(slot.startTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-xs font-bold text-slate-500 mt-0.5">
                            {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {selectedSlot === slot.id && <Check className="text-indigo-600" size={18} strokeWidth={3} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 sticky bottom-0 bg-white">
                {selectedProduct.type === ProductType.BOOKING ? (
                  <button 
                    disabled={!selectedSlot || isProcessing}
                    onClick={handleBooking}
                    className="w-full py-4 text-white rounded-2xl font-black text-lg shadow-lg transition-all active:scale-[0.95] flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: store.theme.primaryColor }}
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Confirm Booking
                      </>
                    )}
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setCartCount(prev => prev + 1);
                      closeModals();
                    }}
                    className="w-full py-4 text-white rounded-2xl font-black text-lg shadow-lg transition-all active:scale-[0.95]"
                    style={{ backgroundColor: store.theme.primaryColor }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pb-2">
                <Shield size={12} className="shrink-0" />
                Secure Checkout via Vendio Pay • PCI Compliant
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      {cartCount > 0 && !selectedProduct && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 pointer-events-none">
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl pointer-events-auto active:scale-95 transition-all">
            <ShoppingCart size={20} />
            Checkout • {cartCount} items
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicStorefront;
