import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Public Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Public Pages
import { HomePage } from './pages/HomePage';
import { LadiesPage } from './pages/LadiesPage';
import { GentsPage } from './pages/GentsPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { OrderPage } from './pages/OrderPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin Portal Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminProductFormPage } from './pages/admin/AdminProductFormPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminOrderDetailPage } from './pages/admin/AdminOrderDetailPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';
import { AdminBlogFormPage } from './pages/admin/AdminBlogFormPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Layout Wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2421]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SearchModal />
      <FloatingWhatsApp />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Storefront Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/ladies"
            element={
              <PublicLayout>
                <LadiesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/gents"
            element={
              <PublicLayout>
                <GentsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/new-arrivals"
            element={
              <PublicLayout>
                <NewArrivalsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PublicLayout>
                <ProductDetailsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/order/:productId"
            element={
              <PublicLayout>
                <OrderPage />
              </PublicLayout>
            }
          />
          <Route
            path="/order-confirmation/:orderNumber"
            element={
              <PublicLayout>
                <OrderConfirmationPage />
              </PublicLayout>
            }
          />
          <Route
            path="/my-orders"
            element={
              <PublicLayout>
                <MyOrdersPage />
              </PublicLayout>
            }
          />
          <Route
            path="/track-order"
            element={
              <PublicLayout>
                <MyOrdersPage />
              </PublicLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <PublicLayout>
                <BlogListPage />
              </PublicLayout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <PublicLayout>
                <BlogPostPage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/edit/:id" element={<AdminProductFormPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="orders/:id" element={<AdminOrderDetailPage />} />
            <Route path="blog" element={<AdminBlogPage />} />
            <Route path="blog/new" element={<AdminBlogFormPage />} />
            <Route path="blog/edit/:id" element={<AdminBlogFormPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                  <h1 className="font-cinzel text-4xl font-bold text-[#0B3B2C] mb-3">404 - Page Not Found</h1>
                  <p className="text-gray-600 text-sm mb-6">
                    The requested page could not be found at Meerab Cloth House.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3B2C] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#0E4B37]"
                  >
                    Return to Home
                  </a>
                </div>
              </PublicLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
