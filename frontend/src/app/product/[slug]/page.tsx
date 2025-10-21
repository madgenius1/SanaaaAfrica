import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SocialShare from '@/app/components/SocialShare';
import { Product } from '@/app/types';

// Mock data - replace with actual API call in production
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Maasai Beaded Necklace',
    slug: 'maasai-beaded-necklace',
    price: 45.00,
    currency: 'USD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
        alt: 'Colorful Maasai beaded necklace with intricate geometric patterns'
      },
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
        alt: 'Close-up of Maasai necklace beadwork detail'
      }
    ],
    shortDescription: 'Hand-beaded traditional Maasai necklace with vibrant colors.',
    longDescription: 'This stunning necklace showcases traditional Maasai beadwork craftsmanship passed down through generations. Each bead is carefully selected and hand-strung using techniques that have been preserved for centuries. The vibrant colors represent different aspects of Maasai culture and spirituality.',
    backstory: 'Created in Kajiado County by skilled Maasai women artisans, this necklace takes approximately 8 hours to complete. The geometric patterns are not merely decorative—they tell stories of community, family, and the natural world.',
    artisan: {
      id: 'a1',
      name: 'Mama Nashipae',
      slug: 'mama-nashipae',
      portrait: {
        url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
        alt: 'Portrait of Mama Nashipae smiling while working on beadwork'
      },
      location: 'Kajiado, Kenya',
      bio: 'Master beadwork artisan with over 30 years of experience',
      story: 'Mama Nashipae learned beading from her grandmother at age 10. Today, she leads a cooperative of 25 women, teaching traditional techniques while creating sustainable income for her community.'
    },
    tags: ['jewelry', 'necklace', 'maasai', 'handmade'],
    featured: true,
    stock: 8,
    weight: 0.15,
    dimensions: '20" length, adjustable',
    seo: {
      title: 'Authentic Maasai Beaded Necklace | Handcrafted in Kenya',
      metaDescription: 'Beautiful hand-beaded Maasai necklace by skilled artisan Mama Nashipae. Traditional patterns, vibrant colors, fair trade certified.',
      ogImage: {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80',
        alt: 'Maasai beaded necklace product image'
      }
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
];

async function getProduct(slug: string): Promise<Product | null> {
  // In production, fetch from Payload CMS API
  // const response = await fetch(`${process.env.PAYLOAD_URL}/api/products?where[slug][equals]=${slug}`);
  // const data = await response.json();
  // return data.docs[0] || null;
  
  return mockProducts.find(p => p.slug === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const seoTitle = product.seo?.title || `${product.title} | Sanaa African Curios`;
  const seoDescription = product.seo?.metaDescription || product.shortDescription;
  const ogImage = product.seo?.ogImage?.url || product.images[0]?.url;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [{ url: ogImage, width: 1200, height: 630, alt: product.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency || 'USD',
  }).format(product.price);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.map(img => img.url),
    description: product.shortDescription,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Sanaa African Curios'
    },
    offers: {
      '@type': 'Offer',
      url: `https://sanaa-curios.com/product/${product.slug}`,
      priceCurrency: product.currency || 'USD',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Sanaa African Curios'
      }
    },
    ...(product.artisan && {
      creator: {
        '@type': 'Person',
        name: product.artisan.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: product.artisan.location
        }
      }
    })
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <nav className="flex items-center space-x-2 text-sm text-navy/60">
              <Link href="/" className="hover:text-rust transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#products" className="hover:text-rust transition-colors">Products</Link>
              <span>/</span>
              <span className="text-navy font-medium">{product.title}</span>
            </nav>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-white shadow cursor-pointer hover:shadow-lg transition-shadow">
                      <Image
                        src={image.url}
                        alt={image.alt || `${product.title} view ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="font-heading text-navy mb-4">{product.title}</h1>
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-heading font-bold text-rust">
                    {formattedPrice}
                  </span>
                  {product.stock > 0 && product.stock < 10 && (
                    <span className="text-sm text-burgundy font-accent">
                      Only {product.stock} left in stock
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-emerald/10 text-emerald text-sm rounded-full font-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="prose prose-navy">
                <p className="text-lg text-navy/80 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Artisan Info */}
              {product.artisan && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start space-x-4">
                    {product.artisan.portrait && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={product.artisan.portrait.url}
                          alt={product.artisan.portrait.alt || product.artisan.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-navy mb-1">
                        Handcrafted by {product.artisan.name}
                      </h3>
                      <p className="text-sm text-navy/60 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {product.artisan.location}
                      </p>
                      <p className="text-sm text-navy/70 leading-relaxed">
                        {product.artisan.bio}
                      </p>
                      <Link
                        href={`/artisan/${product.artisan.slug}`}
                        className="text-rust hover:text-terracotta text-sm font-accent font-semibold mt-2 inline-flex items-center"
                      >
                        View artisan profile
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Backstory */}
              {product.backstory && (
                <div className="bg-sage/10 rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-navy mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    The Story Behind This Piece
                  </h3>
                  <p className="text-navy/80 leading-relaxed">
                    {product.backstory}
                  </p>
                </div>
              )}

              {/* Add to Cart */}
              <div className="space-y-4">
                <button
                  className="btn btn-primary w-full text-lg py-4 flex items-center justify-center space-x-2"
                  disabled={product.stock === 0}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>

                {/* Product Details */}
                <div className="border-t pt-4 space-y-2 text-sm text-navy/70">
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span className="font-medium text-navy">{product.dimensions}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <span className="font-medium text-navy">{product.weight} kg</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>SKU:</span>
                    <span className="font-medium text-navy">{product.id}</span>
                  </div>
                </div>

                {/* Social Share */}
                <SocialShare
                  url={`https://sanaa-curios.com/product/${product.slug}`}
                  title={product.title}
                  description={product.shortDescription}
                  image={product.images[0].url}
                />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <div className="text-emerald mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-xs text-navy/70 font-accent">Fair Trade</span>
                </div>
                <div className="text-center">
                  <div className="text-rust mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="text-xs text-navy/70 font-accent">Secure Payment</span>
                </div>
                <div className="text-center">
                  <div className="text-sage mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-navy/70 font-accent">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}