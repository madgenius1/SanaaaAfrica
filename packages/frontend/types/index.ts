export interface Media {
  id: string;
  alt: string;
  url: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface Artisan {
  id: string;
  name: string;
  slug: string;
  portrait: Media;
  location: string;
  bio: string;
  story: string;
  socialLinks?: {
    platform: 'instagram' | 'facebook' | 'twitter';
    url: string;
  }[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroImage: Media;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price_cents: number;
  currency: string;
  images: Media[];
  hero_image: Media;
  description: string;
  materials: string;
  dimensions: string;
  stock: number;
  sku: string;
  public: boolean;
  collections: Collection[];
  artisan: Artisan;
  backstory: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: Media;
  stripePriceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  relation: string;
  quote: string;
  photo?: Media;
  createdAt: string;
}

export interface Settings {
  id: string;
  siteName: string;
  defaultCurrency: string;
  socialHandles: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    pinterest?: string;
    tiktok?: string;
  };
  heroContent: {
    headline: string;
    subheadline: string;
    ctaText: string;
    backgroundImage: Media;
  };
  featuredCollections: Collection[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}