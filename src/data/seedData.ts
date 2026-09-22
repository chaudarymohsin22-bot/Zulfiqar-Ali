import { Product, BlogPost } from '../types';

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-l-001',
    name: 'Luxury Embroidered Lawn 3-Piece Unstitched Suit',
    code: 'MCH-L-101',
    gender: 'Ladies',
    category: 'Embroidered',
    fabric: 'Lawn',
    color: 'Teal & Gold',
    price: 4850,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Premium quality summer lawn unstitched 3-piece suit with intricate neckline embroidery, printed lawn shirt, dyed cambric trouser, and printed voil dupatta. Soft, breathable, and colorfast weave.',
    mainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'prod-l-002',
    name: 'Digital Printed 2-Piece Summer Lawn Unstitched',
    code: 'MCH-L-102',
    gender: 'Ladies',
    category: 'Printed',
    fabric: 'Lawn',
    color: 'Mustard & Navy',
    price: 2650,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Fine high-count summer lawn unstitched 2-piece (Shirt & Trouser). Crisp floral design with premium dyes that maintain luster after washing. Easy to tailor to custom silhouette.',
    mainImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isNewArrival: false,
    createdAt: '2026-03-02T11:00:00Z',
    updatedAt: '2026-03-02T11:00:00Z',
  },
  {
    id: 'prod-l-003',
    name: 'Traditional Hand-Woven Khaddar 3-Piece Suit',
    code: 'MCH-L-103',
    gender: 'Ladies',
    category: 'Khaddar',
    fabric: 'Khaddar',
    color: 'Rust Orange',
    price: 3800,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Authentic pure woven khaddar unstitched 3-piece suit suitable for transition seasons. Rich texture with matching woolen-blend printed shawl and plain khaddar trouser.',
    mainImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    isNewArrival: true,
    createdAt: '2026-03-03T12:00:00Z',
    updatedAt: '2026-03-03T12:00:00Z',
  },
  {
    id: 'prod-l-004',
    name: 'Pure Karandi Embroidered Festive Collection',
    code: 'MCH-L-104',
    gender: 'Ladies',
    category: 'Karandi',
    fabric: 'Karandi',
    color: 'Deep Maroon',
    price: null,
    priceType: 'Contact for Price',
    availability: 'Available',
    description: 'Exclusive unstitched Karandi suit with delicate zari and resham thread embroidery on shirt daman and sleeves. Available with embroidered organza dupatta. Contact us for custom pricing and stock confirmation.',
    mainImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2026-03-04T14:00:00Z',
    updatedAt: '2026-03-04T14:00:00Z',
  },
  {
    id: 'prod-l-005',
    name: 'Fine Egyptian Cotton 2-Piece Everyday Suit',
    code: 'MCH-L-105',
    gender: 'Ladies',
    category: 'Cotton',
    fabric: 'Cotton',
    color: 'Ivory Cream',
    price: 2950,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Pure 100% fine combed cotton unstitched fabric. Breathable texture designed specifically for Pakistani summer weather. Non-shrink finish.',
    mainImage: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    isNewArrival: false,
    createdAt: '2026-03-05T09:00:00Z',
    updatedAt: '2026-03-05T09:00:00Z',
  },
  {
    id: 'prod-l-006',
    name: 'Pure Irish Linen 3-Piece Printed Collection',
    code: 'MCH-L-106',
    gender: 'Ladies',
    category: 'Linen',
    fabric: 'Linen',
    color: 'Emerald Green',
    price: 3600,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'High thread-count woven linen fabric 3-piece unstitched suit with digital printed linen shirt and dupatta, matching plain trousers.',
    mainImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isNewArrival: false,
    createdAt: '2026-03-06T11:00:00Z',
    updatedAt: '2026-03-06T11:00:00Z',
  },

  // Gents Products
  {
    id: 'prod-g-001',
    name: 'Executive Wash & Wear Shalwar Qameez Fabric (4.5m)',
    code: 'MCH-G-201',
    gender: 'Gents',
    category: 'Wash & Wear',
    fabric: 'Wash & Wear',
    color: 'Charcoal Grey',
    price: 2950,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Wrinkle-resistant luxury wash & wear gents fabric. Superior drape, lightweight, and engineered for all-day comfort. 4.5 meters standard cutting for complete suit.',
    mainImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'prod-g-002',
    name: 'Premium Royal Boski Unstitched Gents Suit (6 Ounce)',
    code: 'MCH-G-202',
    gender: 'Gents',
    category: 'Boski',
    fabric: 'Boski',
    color: 'Off-White / Cream',
    price: 6500,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Traditional Chinese royal silk weave Boski fabric (6 pound weight). Unmatched softness, cooling sensation on skin, and graceful fall for traditional Pakistani festivities and Friday prayers.',
    mainImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2026-03-02T10:30:00Z',
    updatedAt: '2026-03-02T10:30:00Z',
  },
  {
    id: 'prod-g-003',
    name: 'Superior Egyptian Latha Pure Cotton Fabric (4.5m)',
    code: 'MCH-G-203',
    gender: 'Gents',
    category: 'Cotton',
    fabric: 'Cotton',
    color: 'Crisp White',
    price: 3200,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Finest 100% combed long-staple cotton latha fabric. Firm, crisp finish with natural cooling breathability. The quintessential choice for authentic white Pakistani Shalwar Qameez.',
    mainImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    isNewArrival: true,
    createdAt: '2026-03-03T11:00:00Z',
    updatedAt: '2026-03-03T11:00:00Z',
  },
  {
    id: 'prod-g-004',
    name: 'Pure Heavyweight Kamalia Khaddar Gents Fabric',
    code: 'MCH-G-204',
    gender: 'Gents',
    category: 'Khaddar',
    fabric: 'Khaddar',
    color: 'Earthy Brown',
    price: 3500,
    priceType: 'Fixed Price',
    availability: 'Available',
    description: 'Authentic handloom-spun Kamalia style khaddar unstitched suit fabric. Solid weight, durable weave, and provides warmth during cool evenings.',
    mainImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    isNewArrival: false,
    createdAt: '2026-03-04T12:00:00Z',
    updatedAt: '2026-03-04T12:00:00Z',
  },
  {
    id: 'prod-g-005',
    name: 'Exclusive Wool-Blend Premium Suiting Fabric',
    code: 'MCH-G-205',
    gender: 'Gents',
    category: 'Premium Suiting',
    fabric: 'Premium Suiting',
    color: 'Midnight Navy',
    price: null,
    priceType: 'Contact for Price',
    availability: 'Available',
    description: 'High-end imported blend unstitched fabric crafted for waistcoats, prince coats, and two-piece formal suits. Exquisite sheen and firm structure.',
    mainImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isNewArrival: false,
    createdAt: '2026-03-05T13:00:00Z',
    updatedAt: '2026-03-05T13:00:00Z',
  },
  {
    id: 'prod-g-006',
    name: 'Fine Tropical Linen Unstitched Gents Suit',
    code: 'MCH-G-206',
    gender: 'Gents',
    category: 'Linen',
    fabric: 'Linen',
    color: 'Sage Olive',
    price: 3400,
    priceType: 'Fixed Price',
    availability: 'Coming Soon',
    description: 'Air-permeable natural flax linen fabric for gents kurtas and shalwar suits. Rich earthy texture that gets softer with every wash.',
    mainImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    isNewArrival: true,
    createdAt: '2026-03-06T15:00:00Z',
    updatedAt: '2026-03-06T15:00:00Z',
  }
];

export const SEED_BLOGS: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'The Essential Guide to Pakistani Unstitched Fabrics: From Lawn to Boski',
    slug: 'essential-guide-pakistani-unstitched-fabrics',
    featuredImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Discover the distinct qualities of unstitched fabrics in Pakistan, how thread counts matter, and what makes lawn and wash & wear timeless staples.',
    category: 'Fabric Guide',
    publishDate: '2026-03-10',
    isPublished: true,
    fullContent: `Pakistan boasts one of the richest fabric traditions in the world. Unstitched cloth remains the preferred choice across the country because it allows complete personalization of fit, neckline, cut, and sleeve design.

### 1. Summer Lawn: The Pinnacle of Breathability
Lawn is woven with fine, high-count combed cotton yarns. It is lightweight, exceptionally smooth, and accepts both digital pigment printing and delicate embroidery. When selecting lawn, inspect the tightness of the weave and ensure the fabric feels supple rather than stiff.

### 2. Traditional Gents Boski: The Aristocrat of Fabrics
Boski is traditionally spun from silk filaments, offering an unmistakable fluid drape and subtle natural sheen. Known for its cooling effect during intense heat, a genuine Boski suit requires gentle hand washing and mild pressing to preserve its signature texture.

### 3. Wash & Wear: Everyday Resilience
Modern gents unstitched wash & wear blends polyester and viscose fibres to provide crease resistance and easy maintenance. Ideal for busy professionals who demand a sharp, wrinkle-free appearance throughout long working days.

### 4. Khaddar and Karandi for Mild Seasons
Woven with thicker slub yarns, Khaddar and Karandi offer textured charm with natural thermal comfort. Perfect for early spring and late autumn, these fabrics celebrate Pakistani handloom heritage.`,
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  {
    id: 'blog-002',
    title: 'How to Care for Your Unstitched Lawn & Cotton Suits',
    slug: 'how-to-care-for-unstitched-lawn-and-cotton-suits',
    featuredImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Practical tips for washing, pre-shrinking (shrinking/khalis), and ironing fine cotton and embroidered fabrics to maximize longevity.',
    category: 'Fabric Care',
    publishDate: '2026-03-12',
    isPublished: true,
    fullContent: `Proper fabric care begins long before your suit visits the master tailor. Taking thoughtful steps preserves vibrant colors and prevents seam distortion.

### Step 1: Pre-Shrinking (Kharra Lagana / Shrinking)
Always soak 100% pure cotton, lawn, or latha fabrics in clean, lukewarm water for 30 to 45 minutes before sending them to the tailor. This natural pre-shrinkage ensures the tailored garment never tightens after its initial home wash.

### Step 2: Wash in Mild Water
Avoid harsh chemical detergents and bleach. Use gentle liquid detergents. Always separate light pastels from deep navy, maroon, and bottle green fabrics.

### Step 3: Shade Drying
Never dry fine embroidered fabrics under direct, scorching afternoon sunlight. Line-dry inside-out under shade to retain the brilliance of pigments and silk embroidery threads.

### Step 4: Ironing Temperature
Iron while the fabric is slightly damp, or use a fine water mister. For embroidered panels, iron on the reverse side over a soft towel to prevent crushing delicate stitchwork.`,
    createdAt: '2026-03-12T10:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z'
  },
  {
    id: 'blog-003',
    title: 'Gents Shalwar Qameez Styling: Collars, Cuffs, and Fabric Selection',
    slug: 'gents-shalwar-qameez-styling-collars-and-cuffs',
    featuredImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Explore traditional vs modern styling choices for gents unstitched fabrics: ban collars, shirt collars, french cuffs, and waistcoat pairings.',
    category: 'Styling Tips',
    publishDate: '2026-03-15',
    isPublished: true,
    fullContent: `The Pakistani Shalwar Qameez is both timeless and versatile. When tailoring unstitched fabric, your choice of cut and finishing touches defines your personal style.

### 1. Ban Collar vs. Turn-down Collar
The Mandarin or 'Ban' collar remains the gold standard for formal and semi-formal wear, giving a clean, vertical posture. For everyday work suits in wash & wear, a soft shirt collar provides relaxed convenience.

### 2. Button Selection
Complement premium fabrics with genuine horn, bone, or matte metallic stud buttons. Avoid loud plastic fastenings that detract from high-quality textiles.

### 3. Pairing with Waistcoats
Solid wash & wear or crisp white latha suits harmonize effortlessly with textured jacquard or raw silk waistcoats. Keep the underlying suit monochromatic to let the waistcoat craftsmanship shine.`,
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  }
];
