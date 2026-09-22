/**
 * Meerab Cloth House - Types & Interfaces
 */

export type Gender = 'Ladies' | 'Gents';

export type PriceType = 'Fixed Price' | 'Contact for Price';

export type Availability = 'Available' | 'Out of Stock' | 'Coming Soon';

export interface Product {
  id: string;
  name: string;
  code: string;
  gender: Gender;
  category: string;
  fabric: string;
  color: string;
  price: number | null;
  priceType: PriceType;
  availability: Availability;
  description: string;
  mainImage: string;
  images: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'New' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  city: string;
  address: string;
  notes?: string;
  productId: string;
  productName: string;
  productCode: string;
  productImage?: string;
  quantity: number;
  unitPrice: number | null;
  totalPrice: number | null;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  shortDescription: string;
  fullContent: string;
  content?: string;
  author?: string;
  category: string;
  publishDate: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  token?: string;
}

export interface OrderFormData {
  customerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  city: string;
  address: string;
  notes?: string;
  quantity: number;
}
