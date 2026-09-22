import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, BlogPost, AdminUser } from '../types';
import { api } from '../services/api';

interface AppContextType {
  products: Product[];
  orders: Order[];
  blogs: BlogPost[];
  loading: boolean;
  adminUser: AdminUser | null;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshBlogs: () => Promise<void>;
  setAdminUser: (user: AdminUser | null) => void;
  logoutAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(api.getStoredAdmin());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const refreshProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const refreshOrders = async () => {
    if (adminUser) {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
      }
    }
  };

  const refreshBlogs = async () => {
    try {
      const data = await api.getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([refreshProducts(), refreshBlogs()]);
      if (adminUser) {
        await refreshOrders();
      }
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (adminUser) {
      refreshOrders();
    }
  }, [adminUser]);

  const logoutAdmin = () => {
    api.clearAuthSession();
    setAdminUser(null);
    setOrders([]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        blogs,
        loading,
        adminUser,
        refreshProducts,
        refreshOrders,
        refreshBlogs,
        setAdminUser,
        logoutAdmin,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
