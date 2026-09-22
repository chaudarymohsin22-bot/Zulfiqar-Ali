/**
 * Meerab Cloth House - Integrated Data API Service
 * Communicates with the Express backend (/api/...) and includes local synchronization
 * so the app runs smoothly in both Node/Cloud Run and Netlify static environments.
 */

import { Product, Order, BlogPost, AdminUser, OrderFormData } from '../types';
import { SEED_PRODUCTS, SEED_BLOGS } from '../data/seedData';

const TOKEN_KEY = 'mch_admin_token';
const ADMIN_USER_KEY = 'mch_admin_user';
const LOCAL_PRODUCTS_KEY = 'mch_local_products';
const LOCAL_ORDERS_KEY = 'mch_local_orders';
const LOCAL_BLOGS_KEY = 'mch_local_blogs';

// Initialize localStorage fallbacks if needed
function getLocalFallback<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // Ignore error
  }
  try {
    localStorage.setItem(key, JSON.stringify(initial));
  } catch (e) {}
  return initial;
}

function setLocalFallback<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

export const api = {
  // --- AUTH ---
  getStoredToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  getStoredAdmin(): AdminUser | null {
    try {
      const raw = localStorage.getItem(ADMIN_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setAuthSession(token: string, user: { email: string; name: string }): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    } catch (e) {}
  },

  clearAuthSession(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
    } catch (e) {}
  },

  async login(email: string, password: string): Promise<{ success: boolean; token: string; user: AdminUser }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        this.setAuthSession(data.token, data.user);
        return data;
      }
    } catch (e) {
      console.warn('Backend login unavailable, checking offline admin fallback:', e);
    }

    // Static/Offline fallback for Netlify demo/testing
    if (email.toLowerCase() === 'admin@meerabcloth.com' && password === 'AdminPassword2026!') {
      const offlineUser: AdminUser = {
        id: 'admin-offline',
        email: 'admin@meerabcloth.com',
        name: 'Mian Zulfiqar Ali (Admin)',
        role: 'Proprietor & Super Admin'
      };
      const offlineToken = 'offline-session-token-' + Date.now();
      this.setAuthSession(offlineToken, offlineUser);
      return { success: true, token: offlineToken, user: offlineUser };
    }

    throw new Error('Invalid email or password. Please check your credentials.');
  },

  async adminLogin(email: string, password: string) {
    return this.login(email, password);
  },

  async verifyAuth(): Promise<boolean> {
    const token = this.getStoredToken();
    if (!token) return false;
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) return true;
    } catch (e) {
      // In offline/static mode, check if token exists
      return !!token;
    }
    return !!token;
  },

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setLocalFallback(LOCAL_PRODUCTS_KEY, data);
        return data;
      }
    } catch (e) {
      console.warn('Using local products fallback:', e);
    }
    return getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback
    }
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const token = this.getStoredToken();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        const saved = await res.json();
        const current = getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
        setLocalFallback(LOCAL_PRODUCTS_KEY, [saved, ...current]);
        return saved;
      }
    } catch (e) {
      console.warn('Backend product creation unavailable, saving to local store:', e);
    }

    // Local fallback
    const newProd: Product = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: productData.name || 'Untitled Fabric',
      code: productData.code || 'MCH-' + Math.floor(100 + Math.random() * 900),
      gender: productData.gender || 'Ladies',
      category: productData.category || 'Cotton',
      fabric: productData.fabric || 'Cotton',
      color: productData.color || 'Multicolor',
      price: productData.price !== undefined ? productData.price : null,
      priceType: productData.priceType || 'Fixed Price',
      availability: productData.availability || 'Available',
      description: productData.description || '',
      mainImage: productData.mainImage || '',
      images: productData.images || [],
      isFeatured: !!productData.isFeatured,
      isNewArrival: !!productData.isNewArrival,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const current = getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
    setLocalFallback(LOCAL_PRODUCTS_KEY, [newProd, ...current]);
    return newProd;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const token = this.getStoredToken();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const saved = await res.json();
        const current = getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
        const next = current.map(p => p.id === id ? saved : p);
        setLocalFallback(LOCAL_PRODUCTS_KEY, next);
        return saved;
      }
    } catch (e) {
      console.warn('Backend update unavailable, saving to local store:', e);
    }

    const current = getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
    const index = current.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    const updated = { ...current[index], ...updates, updatedAt: new Date().toISOString() };
    current[index] = updated;
    setLocalFallback(LOCAL_PRODUCTS_KEY, current);
    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const token = this.getStoredToken();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const current = getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
        setLocalFallback(LOCAL_PRODUCTS_KEY, current.filter(p => p.id !== id));
        return true;
      }
    } catch (e) {}

    const current = getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
    setLocalFallback(LOCAL_PRODUCTS_KEY, current.filter(p => p.id !== id));
    return true;
  },

  // --- ORDERS ---
  async getOrders(): Promise<Order[]> {
    const token = this.getStoredToken();
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLocalFallback(LOCAL_ORDERS_KEY, data);
        return data;
      }
    } catch (e) {
      console.warn('Using local orders fallback:', e);
    }
    return getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
  },

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    try {
      const res = await fetch(`/api/orders/${orderNumber}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    const localOrders = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
    return localOrders.find(o => o.orderNumber === orderNumber || o.id === orderNumber) || null;
  },

  async trackOrders(orderNumber: string, phoneNumber: string): Promise<Order[]> {
    const cleanPhone = phoneNumber ? phoneNumber.trim() : '';
    const cleanOrderNum = orderNumber ? orderNumber.trim() : '';

    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: cleanOrderNum,
          phoneNumber: cleanPhone
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.orders || [];
      } else {
        const err = await res.json().catch(() => null);
        if (err && err.error) {
          throw new Error(err.error);
        }
      }
    } catch (e: any) {
      if (e.message && !e.message.includes('Failed to fetch') && !e.message.includes('NetworkError')) {
        throw e;
      }
      console.warn('Backend tracking endpoint unreachable, falling back to local store search:', e);
    }

    // Local fallback
    const normPhone = cleanPhone.replace(/\D/g, '').replace(/^92/, '').replace(/^0/, '');
    const localOrders = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);

    const matchesPhone = (o: Order) => {
      const p1 = (o.mobileNumber || '').replace(/\D/g, '').replace(/^92/, '').replace(/^0/, '');
      const p2 = (o.whatsappNumber || '').replace(/\D/g, '').replace(/^92/, '').replace(/^0/, '');
      return (
        p1 === normPhone ||
        p2 === normPhone ||
        (normPhone.length >= 9 && (p1.endsWith(normPhone) || normPhone.endsWith(p1))) ||
        (normPhone.length >= 9 && (p2.endsWith(normPhone) || normPhone.endsWith(p2)))
      );
    };

    if (cleanOrderNum) {
      const upperOrderNum = cleanOrderNum.toUpperCase();
      const matched = localOrders.filter(
        o => (o.orderNumber?.toUpperCase() === upperOrderNum || o.id?.toUpperCase() === upperOrderNum) && matchesPhone(o)
      );
      if (matched.length === 0) {
        throw new Error(`No order found matching "${cleanOrderNum}" and phone "${cleanPhone}". Please check your details.`);
      }
      return matched;
    }

    const matched = localOrders.filter(matchesPhone);
    if (matched.length === 0) {
      throw new Error(`No orders found associated with phone number "${cleanPhone}".`);
    }
    return matched;
  },

  async createOrder(product: Product, formData: OrderFormData): Promise<Order> {
    const unitPrice = product.priceType === 'Fixed Price' ? product.price : null;
    const totalPrice = unitPrice !== null ? unitPrice * formData.quantity : null;

    const payload = {
      customerName: formData.customerName,
      mobileNumber: formData.mobileNumber,
      whatsappNumber: formData.whatsappNumber || formData.mobileNumber,
      city: formData.city,
      address: formData.address,
      notes: formData.notes || '',
      productId: product.id,
      productName: product.name,
      productCode: product.code,
      quantity: formData.quantity,
      unitPrice,
      totalPrice
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const newOrder = await res.json();
        const current = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
        setLocalFallback(LOCAL_ORDERS_KEY, [newOrder, ...current]);
        return newOrder;
      }
    } catch (e) {
      console.warn('Backend order creation unavailable, saving to local store:', e);
    }

    // Local fallback order generation
    const current = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
    const year = new Date().getFullYear();
    const orderSeq = (current.length + 1).toString().padStart(4, '0');
    const orderNumber = `MCH-${year}-${orderSeq}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      orderNumber,
      customerName: formData.customerName.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      whatsappNumber: (formData.whatsappNumber || formData.mobileNumber).trim(),
      city: formData.city.trim(),
      address: formData.address.trim(),
      notes: formData.notes?.trim() || '',
      productId: product.id,
      productName: product.name,
      productCode: product.code,
      quantity: formData.quantity,
      unitPrice,
      totalPrice,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setLocalFallback(LOCAL_ORDERS_KEY, [newOrder, ...current]);
    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    const token = this.getStoredToken();
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        const current = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
        setLocalFallback(LOCAL_ORDERS_KEY, current.map(o => o.id === orderId ? updated : o));
        return updated;
      }
    } catch (e) {}

    const current = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
    const order = current.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    order.status = status;
    order.updatedAt = new Date().toISOString();
    setLocalFallback(LOCAL_ORDERS_KEY, [...current]);
    return order;
  },

  async deleteOrder(orderId: string): Promise<boolean> {
    const token = this.getStoredToken();
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const current = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
        setLocalFallback(LOCAL_ORDERS_KEY, current.filter(o => o.id !== orderId));
        return true;
      }
    } catch (e) {}

    const current = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);
    setLocalFallback(LOCAL_ORDERS_KEY, current.filter(o => o.id !== orderId));
    return true;
  },

  // --- BLOG ---
  async getBlogs(): Promise<BlogPost[]> {
    try {
      const res = await fetch('/api/blog');
      if (res.ok) {
        const data = await res.json();
        setLocalFallback(LOCAL_BLOGS_KEY, data);
        return data;
      }
    } catch (e) {}
    return getLocalFallback<BlogPost[]>(LOCAL_BLOGS_KEY, SEED_BLOGS);
  },

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const blogs = await this.getBlogs();
    return blogs.find(b => b.slug === slug || b.id === slug) || null;
  },

  async createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
    const token = this.getStoredToken();
    const slug = data.slug || (data.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...data, slug })
      });
      if (res.ok) {
        const created = await res.json();
        const current = getLocalFallback<BlogPost[]>(LOCAL_BLOGS_KEY, SEED_BLOGS);
        setLocalFallback(LOCAL_BLOGS_KEY, [created, ...current]);
        return created;
      }
    } catch (e) {}

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: data.title || 'Untitled Post',
      slug,
      featuredImage: data.featuredImage || '',
      shortDescription: data.shortDescription || '',
      fullContent: data.fullContent || '',
      category: data.category || 'Fabric Guide',
      publishDate: data.publishDate || new Date().toISOString().split('T')[0],
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const current = getLocalFallback<BlogPost[]>(LOCAL_BLOGS_KEY, SEED_BLOGS);
    setLocalFallback(LOCAL_BLOGS_KEY, [newPost, ...current]);
    return newPost;
  },

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const token = this.getStoredToken();
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        const current = getLocalFallback<BlogPost[]>(LOCAL_BLOGS_KEY, SEED_BLOGS);
        setLocalFallback(LOCAL_BLOGS_KEY, current.map(b => b.id === id ? updated : b));
        return updated;
      }
    } catch (e) {}

    const current = getLocalFallback<BlogPost[]>(LOCAL_BLOGS_KEY, SEED_BLOGS);
    const index = current.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Blog post not found');
    const updated = { ...current[index], ...updates, updatedAt: new Date().toISOString() };
    current[index] = updated;
    setLocalFallback(LOCAL_BLOGS_KEY, current);
    return updated;
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    const token = this.getStoredToken();
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const current = getLocalFallback<BlogPost[]>(LOCAL_BLOGS_KEY, SEED_BLOGS);
        setLocalFallback(LOCAL_BLOGS_KEY, current.filter(b => b.id !== id));
        return true;
      }
    } catch (e) {}

    const current = getLocalFallback<BlogPost[]>(LOCAL_BLOGS_KEY, SEED_BLOGS);
    setLocalFallback(LOCAL_BLOGS_KEY, current.filter(b => b.id !== id));
    return true;
  },

  async createBlog(data: Partial<BlogPost>): Promise<BlogPost> {
    const fullContent = data.fullContent || data.content || '';
    return this.createBlogPost({ ...data, fullContent });
  },

  async updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const fullContent = updates.fullContent || updates.content || undefined;
    return this.updateBlogPost(id, { ...updates, ...(fullContent ? { fullContent } : {}) });
  },

  async deleteBlog(id: string): Promise<boolean> {
    return this.deleteBlogPost(id);
  },

  // --- IMAGE UPLOAD ---
  async uploadImage(fileOrBase64: string | File): Promise<string> {
    const token = this.getStoredToken();

    let base64String = '';
    let mimeType = 'image/jpeg';
    let filename = 'upload.jpg';

    if (typeof fileOrBase64 === 'string') {
      base64String = fileOrBase64;
    } else {
      filename = fileOrBase64.name;
      mimeType = fileOrBase64.type;
      base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(fileOrBase64);
      });
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ imageBase64: base64String, filename, mimeType })
      });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
    } catch (e) {
      console.warn('Server upload failed, using optimized base64/data URL:', e);
    }

    // In static or client environments, return data URL directly
    return base64String;
  },

  // --- STATS ---
  async getStats() {
    const token = this.getStoredToken();
    try {
      const res = await fetch('/api/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const products = getLocalFallback<Product[]>(LOCAL_PRODUCTS_KEY, SEED_PRODUCTS);
    const orders = getLocalFallback<Order[]>(LOCAL_ORDERS_KEY, []);

    return {
      totalProducts: products.length,
      ladiesProducts: products.filter(p => p.gender === 'Ladies').length,
      gentsProducts: products.filter(p => p.gender === 'Gents').length,
      newArrivals: products.filter(p => p.isNewArrival).length,
      featuredProducts: products.filter(p => p.isFeatured).length,
      totalOrders: orders.length,
      newOrders: orders.filter(o => o.status === 'New').length,
      confirmedOrders: orders.filter(o => o.status === 'Confirmed').length,
      processingOrders: orders.filter(o => o.status === 'Processing').length,
      shippedOrders: orders.filter(o => o.status === 'Shipped').length,
      deliveredOrders: orders.filter(o => o.status === 'Delivered').length,
      cancelledOrders: orders.filter(o => o.status === 'Cancelled').length,
    };
  }
};
