import type { Product, Artisan, Collection, Testimonial, Settings } from '@/types';

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

interface PayloadResponse {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

async function fetchFromPayload(
  endpoint: string,
  options: RequestInit = {}
): Promise {
  const url = `${PAYLOAD_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Payload API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getProducts(
  params?: {
    where?: Record;
    limit?: number;
    page?: number;
  }
): Promise<PayloadResponse> {
  const queryParams = new URLSearchParams();
  
  if (params?.where) {
    queryParams.append('where', JSON.stringify(params.where));
  }
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params?.page) {
    queryParams.append('page', params.page.toString());
  }

  const query = queryParams.toString();
  return fetchFromPayload<PayloadResponse>(
    `/products${query ? `?${query}` : ''}`
  );
}

export async function getProductBySlug(slug: string): Promise {
  try {
    const response = await fetchFromPayload<PayloadResponse>(
      `/products?where[slug][equals]=${slug}&limit=1`
    );
    return response.docs[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getArtisans(featured?: boolean): Promise<PayloadResponse> {
  const where = featured ? { featured: { equals: true } } : {};
  const query = featured ? `?where=${JSON.stringify(where)}` : '';
  return fetchFromPayload<PayloadResponse>(`/artisans${query}`);
}

export async function getArtisanBySlug(slug: string): Promise {
  try {
    const response = await fetchFromPayload<PayloadResponse>(
      `/artisans?where[slug][equals]=${slug}&limit=1`
    );
    return response.docs[0] || null;
  } catch (error) {
    console.error('Error fetching artisan:', error);
    return null;
  }
}

export async function getCollections(): Promise<PayloadResponse> {
  return fetchFromPayload<PayloadResponse>('/collections');
}

export async function getTestimonials(): Promise<PayloadResponse> {
  return fetchFromPayload<PayloadResponse>('/testimonials?limit=10');
}

export async function getSettings(): Promise {
  const response = await fetchFromPayload(
    '/settings?limit=1'
  );
  return response.docs[0];
}

// Fallback data for development when Payload is not running
export const fallbackData = {
  products: [
    {
      id: '1',
      title: 'Maasai Beaded Necklace',
      slug: 'maasai-beaded-necklace',
      price_cents: 4500,
      currency: 'USD',
      images: [],
      hero_image: { id: '1', alt: 'Colorful Maasai beaded necklace', url: '/placeholder-product.jpg' },
      description: 'Handcrafted traditional Maasai beaded necklace',
      materials: 'Glass beads, leather',
      dimensions: '18" length',
      stock: 5,
      sku: 'MBN-001',
      public: true,
      collections: [],
      artisan: {
        id: '1',
        name: 'Grace Mwangi',
        slug: 'grace-mwangi',
        portrait: { id: '2', alt: 'Grace Mwangi', url: '/placeholder-artisan.jpg' },
        location: 'Nairobi, Kenya',
        bio: 'Master beadwork artisan',
        story: '',
        featured: true,
        createdAt: '',
        updatedAt: ''
      },
      backstory: 'Each bead is carefully selected and strung by hand...',
      featured: true,
      createdAt: '',
      updatedAt: ''
    }
  ]
};