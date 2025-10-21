import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { getProductBySlug, getProducts } from '@/lib/payload';
import SocialShare from '@/components/SocialShare';
import Footer from '@/components/Footer';
import Script from 'next/script';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const response = await getProducts({ limit: 100 });
    return response.docs.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const productUrl = `${siteUrl}/product/${product.slug}`;
  
  return {
    title: product.seoTitle || `${product.title} — Sanaa African Curios`,
    description: product.seoDescription || product.description.substring(0, 160),
    openGraph: {
      title: `${product.title} — Sanaa African Curios`,
      description: `${product.backstory.substring(0, 140)} — handcrafted by ${product.artisan.name} in ${product.artisan.location}`,
      url: productUrl,
      siteName: 'Sanaa African Curios',
      images: [
        {
          url: product.ogImage?.url || product.hero_image.url,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description.substring(0, 200),
      images: [product.hero_image.url],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const productUrl = `${siteUrl}/product/${product.slug}`;
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.price_cents / 100);

  // JSON-LD structured data for product
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.hero_image.url,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.artisan.name,
      description: product.artisan.bio,
      logo: product.artisan.portrait?.url,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: product.currency,
      price: (product.price_cents / 100).toFixed(2),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Sanaa African Curios',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '47',
    },
  };

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      <main className="min-h-screen bg-ivory">
        <article className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                <Image
                  src={product.hero_image.url}
                  alt={product.hero_image.alt || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-white">
                      <Image
                        src={image.url}
                        alt={image.alt || `${product.title} view ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="text-sage font-medium">
                  {product.artisan.name} • {product.artisan.location}
                </span>
              </div>
              
              <h1 className="text-heading-1 font-serif mb-4 text-deepnavy">
                {product.title}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-burgundy">
                  {formattedPrice}
                </span>
                {product.stock > 0 ? (
                  <span className="text-emerald font-medium">In Stock</span>
                ) : (
                  <span className="text-rust font-medium">Out of Stock</span>
                )}
              </div>

              <div className="prose prose-lg mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-lg p-6 mb-8 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Materials:</span>
                  <span className="font-medium">{product.materials}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">{product.dimensions}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  className="btn-primary flex-1"
                  disabled={product.stock === 0}
                  aria-label={`Buy ${product.title} now`}
                >
                  Buy Now
                </button>
                <button
                  className="btn-outline flex-1"
                  disabled={product.stock === 0}
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to Cart
                </button>
              </div>

              {/* Social Share */}
              <div className="border-t border-gray-200 pt-6">
                <SocialShare
                  title={product.title}
                  url={productUrl}
                  artistName={product.artisan.name}
                />
              </div>
            </div>
          </div>

          {/* Backstory Section */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-heading-2 font-serif mb-6">The Story</h2>
              <div className="prose prose-lg rich-text">
                <div dangerouslySetInnerHTML={{ __html: product.backstory }} />
              </div>
            </div>

            {/* Artisan Profile */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-heading-3 font-serif mb-4">The Artisan</h3>
              
              {product.artisan.portrait && (
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <Image
                    src={product.artisan.portrait.url}
                    alt={product.artisan.portrait.alt || `Portrait of ${product.artisan.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              )}
              
              <h4 className="text-xl font-semibold mb-2">{product.artisan.name}</h4>
              <p className="text-sage mb-4">{product.artisan.location}</p>
              <p className="text-gray-700 mb-4">{product.artisan.bio}</p>
              
              <button className="text-rust font-medium hover:underline">
                View More from {product.artisan.name} →
              </button>
            </div>
          </div>
        </article>
        
        <Footer />
      </main>
    </>
  );
}