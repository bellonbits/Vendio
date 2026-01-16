
export enum StoreStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
  SUSPENDED = 'suspended'
}

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
  BOOKING = 'booking'
}

export interface StoreTheme {
  primaryColor: string;
  fontFamily: string;
  borderRadius: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'vendor' | 'customer';
  subscriptionTier?: 'free' | 'pro' | 'enterprise';
}

export interface Store {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  status: StoreStatus;
  theme: StoreTheme;
  commissionRate: number; // e.g., 0.05 for 5%
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  imageUrl: string;
  stock?: number;
  digitalLink?: string;
}

export interface Order {
  id: string;
  storeId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: { productId: string; quantity: number; priceAtPurchase: number }[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderAt: string;
}

export interface BookingSlot {
  id: string;
  productId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  customerId?: string;
}
