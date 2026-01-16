
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Package, 
  Tag, 
  Zap, 
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  CheckCircle,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { Store, Product, ProductType, BookingSlot } from '../types';

interface ProductManagementProps {
  store: Store;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ store }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedBookingProduct, setSelectedBookingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    type: ProductType.PHYSICAL,
    stock: 0
  });

  // Mock initial products
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'p1',
      storeId: store.id,
      name: 'Professional Camera Tripod',
      description: 'Ultra-lightweight carbon fiber tripod for travel photography.',
      price: 89.99,
      type: ProductType.PHYSICAL,
      imageUrl: 'https://picsum.photos/seed/tripod/200/200',
      stock: 12
    },
    {
      id: 'p2',
      storeId: store.id,
      name: 'Digital Creator Guide',
      description: 'A comprehensive guide to building your personal brand.',
      price: 19.00,
      type: ProductType.DIGITAL,
      imageUrl: 'https://picsum.photos/seed/guide/200/200',
      digitalLink: 'https://example.com/download'
    },
    {
      id: 'p3',
      storeId: store.id,
      name: '1-on-1 Growth Strategy',
      description: 'Personalized business coaching session for scaling your brand.',
      price: 150.00,
      type: ProductType.BOOKING,
      imageUrl: 'https://picsum.photos/seed/coach/200/200',
    }
  ]);

  // Mock initial slots
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([
    { id: 'b1', productId: 'p3', startTime: '2025-06-10T09:00:00', endTime: '2025-06-10T10:00:00', isBooked: true, customerId: 'c1' },
    { id: 'b2', productId: 'p3', startTime: '2025-06-10T11:00:00', endTime: '2025-06-10T12:00:00', isBooked: false },
    { id: 'b3', productId: 'p3', startTime: '2025-06-11T14:00:00', endTime: '2025-06-11T15:00:00', isBooked: false },
  ]);

  const [newSlot, setNewSlot] = useState({ date: '', startTime: '', endTime: '' });

  const handleGenerateDescription = async () => {
    if (!newProduct.name) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a compelling, concise product description for a "${newProduct.name}" for a small business store. Keep it under 150 characters.`,
      });
      if (response.text) {
        setNewProduct(prev => ({ ...prev, description: response.text.trim() }));
      }
    } catch (error) {
      console.error('AI error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addProduct = () => {
    const product: Product = {
      id: `p${Date.now()}`,
      storeId: store.id,
      name: newProduct.name || 'Untitled Product',
      description: newProduct.description || '',
      price: newProduct.price || 0,
      type: newProduct.type as ProductType,
      imageUrl: `https://picsum.photos/seed/${newProduct.name}/200/200`,
      stock: newProduct.stock
    };
    setProducts([product, ...products]);
    setShowAddModal(false);
    setNewProduct({ name: '', description: '', price: 0, type: ProductType.PHYSICAL, stock: 0 });
  };

  const addSlot = () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime || !selectedBookingProduct) return;
    const slot: BookingSlot = {
      id: `b${Date.now()}`,
      productId: selectedBookingProduct.id,
      startTime: `${newSlot.date}T${newSlot.startTime}`,
      endTime: `${newSlot.date}T${newSlot.endTime}`,
      isBooked: false
    };
    setBookingSlots([...bookingSlots, slot]);
    setNewSlot({ date: '', startTime: '', endTime: '' });
  };

  const removeSlot = (id: string) => {
    setBookingSlots(bookingSlots.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            Filters
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status/Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{product.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      product.type === ProductType.PHYSICAL ? 'bg-blue-50 text-blue-700' :
                      product.type === ProductType.DIGITAL ? 'bg-purple-50 text-purple-700' :
                      product.type === ProductType.BOOKING ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {product.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.type === ProductType.PHYSICAL ? (
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${product.stock! > 5 ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                        <span className="text-sm font-medium text-slate-600">{product.stock} in stock</span>
                      </div>
                    ) : product.type === ProductType.BOOKING ? (
                        <button 
                            onClick={() => {
                                setSelectedBookingProduct(product);
                                setShowSlotModal(true);
                            }}
                            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                            <CalendarIcon size={14} />
                            Manage Slots
                        </button>
                    ) : (
                      <span className="text-sm text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Slot Management Modal */}
      {showSlotModal && selectedBookingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowSlotModal(false)}></div>
            <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Manage Bookings</h3>
                        <p className="text-xs text-slate-500 font-medium">{selectedBookingProduct.name}</p>
                    </div>
                    <button onClick={() => setShowSlotModal(false)} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-lg">
                        <Plus size={24} className="rotate-45" />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
                    {/* Add New Slot Form */}
                    <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Plus size={16} />
                            Add Availability
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    value={newSlot.date}
                                    onChange={e => setNewSlot({...newSlot, date: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Time</label>
                                <input 
                                    type="time" 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    value={newSlot.startTime}
                                    onChange={e => setNewSlot({...newSlot, startTime: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Time</label>
                                <input 
                                    type="time" 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    value={newSlot.endTime}
                                    onChange={e => setNewSlot({...newSlot, endTime: e.target.value})}
                                />
                            </div>
                        </div>
                        <button 
                            onClick={addSlot}
                            disabled={!newSlot.date || !newSlot.startTime || !newSlot.endTime}
                            className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
                        >
                            Add Slot to Schedule
                        </button>
                    </div>

                    {/* Existing Slots List */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Clock size={16} />
                            Upcoming Schedule
                        </h4>
                        <div className="space-y-3">
                            {bookingSlots.filter(s => s.productId === selectedBookingProduct.id).length === 0 ? (
                                <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                    <p className="text-sm font-medium text-slate-400">No slots defined for this product yet.</p>
                                </div>
                            ) : (
                                bookingSlots
                                    .filter(s => s.productId === selectedBookingProduct.id)
                                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                                    .map(slot => (
                                    <div key={slot.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${slot.isBooked ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                {slot.isBooked ? <CheckCircle size={20} /> : <CalendarIcon size={20} />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">
                                                    {new Date(slot.startTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                </div>
                                                <div className="text-xs text-slate-500 font-medium">
                                                    {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {slot.isBooked ? (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded">Booked</span>
                                            ) : (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Available</span>
                                            )}
                                            <button 
                                                onClick={() => removeSlot(slot.id)}
                                                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button 
                        onClick={() => setShowSlotModal(false)}
                        className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-100 hover:bg-slate-800 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Add New Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="e.g. Handmade Leather Wallet"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({...newProduct, type: e.target.value as ProductType})}
                  >
                    <option value={ProductType.PHYSICAL}>Physical Good</option>
                    <option value={ProductType.DIGITAL}>Digital Download</option>
                    <option value={ProductType.SERVICE}>Service / Consultation</option>
                    <option value={ProductType.BOOKING}>Booking Slot</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-700">Description</label>
                  <button 
                    onClick={handleGenerateDescription}
                    disabled={isGenerating || !newProduct.name}
                    className="text-xs flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 transition-colors"
                  >
                    <Sparkles size={14} className={isGenerating ? 'animate-pulse' : ''} />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="Tell your customers about this product..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 font-bold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button 
                onClick={addProduct}
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
