export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  images: ProductImage[];
  shortDescription: string;
  longDescription: string;
  backstory: string;
  artisan?: Artisan;
  collection?: Collection;
  tags: string[];
  featured: boolean;
  stock: number;
  weight?: number;
  dimensions?: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Artisan {
  id: string;
  name: string;
  slug: string;
  portrait?: ProductImage;
  location: string;
  bio: string;
  story: string;
  socialLinks?: SocialLinks;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  coverImage?: ProductImage;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  photo?: ProductImage;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  defaultOGImage?: ProductImage;
  socialHandles: SocialLinks;
  shippingInfoText: string;
}

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  twitter?: string;
  pinterest?: string;
}

export interface SEO {
  title?: string;
  metaDescription?: string;
  ogImage?: ProductImage;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CheckoutFormData {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface StripeCheckoutSession {
  sessionId: string;
  url: string;
}