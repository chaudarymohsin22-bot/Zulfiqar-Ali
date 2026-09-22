import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure data and uploads directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

// Helper to read/write JSON
function readJSON<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
  return fallback;
}

function writeJSON<T>(file: string, data: T): void {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
}

// Initial Admin credentials
// Email: admin@meerabcloth.com
// Password default: AdminPassword2026!
const DEFAULT_PASSWORD_HASH = crypto.createHash('sha256').update('AdminPassword2026!').digest('hex');

if (!fs.existsSync(ADMIN_FILE)) {
  writeJSON(ADMIN_FILE, {
    email: 'admin@meerabcloth.com',
    passwordHash: DEFAULT_PASSWORD_HASH,
    name: 'Mian Zulfiqar Ali (Admin)'
  });
}

// Token store for active sessions
const activeSessions = new Map<string, { email: string; expiresAt: number }>();

function generateToken(email: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  activeSessions.set(token, { email, expiresAt });
  return token;
}

function verifyAuth(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// Order number counter
let lastOrderNumberSeq = 100;

function generateOrderNumber(): string {
  const orders = readJSON<any[]>(ORDERS_FILE, []);
  const year = new Date().getFullYear();
  const nextNum = (orders.length + 1).toString().padStart(4, '0');
  return `MCH-${year}-${nextNum}`;
}

async function startServer() {
  const app = express();
  
  // Middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- API ROUTES ---

  // Health
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', business: 'Meerab Cloth House', time: new Date().toISOString() });
  });

  // Admin Auth Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    const admin = readJSON<{ email: string; passwordHash: string; name: string }>(ADMIN_FILE, {
      email: 'admin@meerabcloth.com',
      passwordHash: DEFAULT_PASSWORD_HASH,
      name: 'Mian Zulfiqar Ali'
    });

    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if (email.toLowerCase() === admin.email.toLowerCase() && hash === admin.passwordHash) {
      const token = generateToken(admin.email);
      res.json({
        success: true,
        token,
        user: { email: admin.email, name: admin.name }
      });
      return;
    }

    res.status(401).json({ error: 'Invalid admin credentials' });
  });

  // Admin Auth Verify
  app.get('/api/auth/me', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ authenticated: false });
      return;
    }
    const admin = readJSON<{ email: string; name: string }>(ADMIN_FILE, {
      email: 'admin@meerabcloth.com',
      name: 'Mian Zulfiqar Ali'
    });
    res.json({ authenticated: true, user: { email: admin.email, name: admin.name } });
  });

  // 1. PRODUCTS
  app.get('/api/products', (req, res) => {
    const products = readJSON<any[]>(PRODUCTS_FILE, []);
    res.json(products);
  });

  app.get('/api/products/:id', (req, res) => {
    const products = readJSON<any[]>(PRODUCTS_FILE, []);
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  });

  app.post('/api/products', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    const products = readJSON<any[]>(PRODUCTS_FILE, []);
    const newProduct = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    writeJSON(PRODUCTS_FILE, products);
    res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    const products = readJSON<any[]>(PRODUCTS_FILE, []);
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    const updated = {
      ...products[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };
    products[index] = updated;
    writeJSON(PRODUCTS_FILE, products);
    res.json(updated);
  });

  app.delete('/api/products/:id', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    let products = readJSON<any[]>(PRODUCTS_FILE, []);
    products = products.filter(p => p.id !== req.params.id);
    writeJSON(PRODUCTS_FILE, products);
    res.json({ success: true, message: 'Product deleted' });
  });

  // Helper to normalize phone numbers for customer order lookup
  const normalizePhone = (phone: string | undefined | null): string => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('92') && digits.length >= 12) {
      return digits.slice(2);
    }
    if (digits.startsWith('0') && digits.length >= 10) {
      return digits.slice(1);
    }
    return digits;
  };

  // 2. ORDERS
  app.get('/api/orders', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Customer order information is private' });
      return;
    }
    const orders = readJSON<any[]>(ORDERS_FILE, []);
    res.json(orders);
  });

  // Track orders endpoint for customers
  app.post('/api/orders/track', (req, res) => {
    const { orderNumber, phoneNumber } = req.body || {};
    if (!phoneNumber) {
      res.status(400).json({ error: 'Please enter your mobile/phone number.' });
      return;
    }

    const cleanPhone = normalizePhone(phoneNumber);
    if (!cleanPhone || cleanPhone.length < 7) {
      res.status(400).json({ error: 'Please enter a valid Pakistani phone number (e.g. 0347-6430299).' });
      return;
    }

    const orders = readJSON<any[]>(ORDERS_FILE, []);
    
    // Check phone match helper
    const matchesPhone = (o: any) => {
      const p1 = normalizePhone(o.mobileNumber);
      const p2 = normalizePhone(o.whatsappNumber);
      return (
        p1 === cleanPhone ||
        p2 === cleanPhone ||
        (cleanPhone.length >= 9 && (p1.endsWith(cleanPhone) || cleanPhone.endsWith(p1))) ||
        (cleanPhone.length >= 9 && (p2.endsWith(cleanPhone) || cleanPhone.endsWith(p2)))
      );
    };

    if (orderNumber && orderNumber.trim()) {
      const cleanOrderNum = orderNumber.trim().toUpperCase();
      const matched = orders.filter(o => {
        const orderMatch =
          o.orderNumber?.toUpperCase() === cleanOrderNum ||
          o.id?.toUpperCase() === cleanOrderNum;
        return orderMatch && matchesPhone(o);
      });

      if (matched.length === 0) {
        res.status(404).json({
          error: `No order found with number "${orderNumber.trim()}" and phone "${phoneNumber.trim()}". Please check your order details.`
        });
        return;
      }

      res.json({ orders: matched });
      return;
    }

    // Lookup all orders by phone number
    const matched = orders.filter(matchesPhone);
    if (matched.length === 0) {
      res.status(404).json({
        error: `No orders found associated with phone number "${phoneNumber.trim()}".`
      });
      return;
    }

    res.json({ orders: matched });
  });

  app.get('/api/orders/:orderNumber', (req, res) => {
    const orders = readJSON<any[]>(ORDERS_FILE, []);
    const order = orders.find(o => o.orderNumber === req.params.orderNumber || o.id === req.params.orderNumber);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    // Safe order confirmation view (returns order info for confirmation page)
    res.json(order);
  });

  app.post('/api/orders', (req, res) => {
    const {
      customerName,
      mobileNumber,
      whatsappNumber,
      city,
      address,
      notes,
      productId,
      productName,
      productCode,
      quantity,
      unitPrice,
      totalPrice
    } = req.body;

    if (!customerName || !mobileNumber || !city || !address || !productId) {
      res.status(400).json({ error: 'Please provide all required order fields' });
      return;
    }

    const orders = readJSON<any[]>(ORDERS_FILE, []);
    const orderNumber = generateOrderNumber();
    const newOrder = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      orderNumber,
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.trim(),
      whatsappNumber: (whatsappNumber || mobileNumber).trim(),
      city: city.trim(),
      address: address.trim(),
      notes: notes ? notes.trim() : '',
      productId,
      productName,
      productCode,
      quantity: Number(quantity) || 1,
      unitPrice: unitPrice !== null && unitPrice !== undefined ? Number(unitPrice) : null,
      totalPrice: totalPrice !== null && totalPrice !== undefined ? Number(totalPrice) : null,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.unshift(newOrder);
    writeJSON(ORDERS_FILE, orders);
    res.status(201).json(newOrder);
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    const { status } = req.body;
    const orders = readJSON<any[]>(ORDERS_FILE, []);
    const order = orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    order.status = status;
    order.updatedAt = new Date().toISOString();
    writeJSON(ORDERS_FILE, orders);
    res.json(order);
  });

  app.delete('/api/orders/:id', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    let orders = readJSON<any[]>(ORDERS_FILE, []);
    orders = orders.filter(o => o.id !== req.params.id);
    writeJSON(ORDERS_FILE, orders);
    res.json({ success: true });
  });

  // 3. BLOG POSTS
  app.get('/api/blog', (req, res) => {
    const blogs = readJSON<any[]>(BLOGS_FILE, []);
    res.json(blogs);
  });

  app.get('/api/blog/:slug', (req, res) => {
    const blogs = readJSON<any[]>(BLOGS_FILE, []);
    const post = blogs.find(b => b.slug === req.params.slug || b.id === req.params.slug);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json(post);
  });

  app.post('/api/blog', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    const blogs = readJSON<any[]>(BLOGS_FILE, []);
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newPost = {
      ...req.body,
      id: req.body.id || `blog-${Date.now()}`,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    blogs.unshift(newPost);
    writeJSON(BLOGS_FILE, blogs);
    res.status(201).json(newPost);
  });

  app.put('/api/blog/:id', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    const blogs = readJSON<any[]>(BLOGS_FILE, []);
    const index = blogs.findIndex(b => b.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    const updated = {
      ...blogs[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };
    blogs[index] = updated;
    writeJSON(BLOGS_FILE, blogs);
    res.json(updated);
  });

  app.delete('/api/blog/:id', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    let blogs = readJSON<any[]>(BLOGS_FILE, []);
    blogs = blogs.filter(b => b.id !== req.params.id);
    writeJSON(BLOGS_FILE, blogs);
    res.json({ success: true });
  });

  // 4. IMAGE UPLOAD
  app.post('/api/upload', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
      return;
    }
    const { imageBase64, filename, mimeType } = req.body;
    if (!imageBase64) {
      res.status(400).json({ error: 'No image data provided' });
      return;
    }

    try {
      const ext = mimeType?.includes('png') ? '.png' : mimeType?.includes('webp') ? '.webp' : '.jpg';
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');
      const uniqueName = `upload-${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
      const filePath = path.join(UPLOADS_DIR, uniqueName);
      
      fs.writeFileSync(filePath, buffer);
      
      const fileUrl = `/uploads/${uniqueName}`;
      res.json({ url: fileUrl, filename: uniqueName });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Failed to save image file' });
    }
  });

  // 5. STATS
  app.get('/api/stats', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const products = readJSON<any[]>(PRODUCTS_FILE, []);
    const orders = readJSON<any[]>(ORDERS_FILE, []);

    const stats = {
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
    res.json(stats);
  });

  // Reset or Seed initial data endpoint (useful if database is empty)
  app.post('/api/admin/seed', (req, res) => {
    if (!verifyAuth(req)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const { products, blogs } = req.body;
    if (products) writeJSON(PRODUCTS_FILE, products);
    if (blogs) writeJSON(BLOGS_FILE, blogs);
    res.json({ success: true, message: 'Database seeded successfully' });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Meerab Cloth House server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
