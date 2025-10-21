import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import ArtistCard from '@/components/ArtistCard';
import TestimonialSlider from '@/components/TestimonialSlider';
import ImpactStats from '@/components/ImpactStats';
import Footer from '@/components/Footer';
import { getProducts, getArtisans, getTestimonials, getSettings, fallbackData } from '@/lib/payload';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch data with fallback
  let products, artisans, testimonials, settings;
  
  try {
    [products, artisans, testimonials, settings] = await Promise.all([
      getProducts({ where: { public: { equals: true } }, limit: 8 }),
      getArtisans(true),
      getTestimonials(),
      getSettings(),
    ]);
  } catch (error) {
    console.error('Failed to fetch from Payload, using fallback data:', error);
    // Use fallback data for development
    products = { docs: fallbackData.products, totalDocs: 1, limit: 8, totalPages: 1, page: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null };
    artisans = { docs: [], totalDocs: 0, limit: 10, totalPages: 0, page: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null };
    testimonials = { docs: [], totalDocs: 0, limit: 10, totalPages: 0, page: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null };
    settings = {
      id: '1',
      siteName: 'Sanaa African Curios',
      defaultCurrency: 'USD',
      socialHandles: {},
      heroContent: {
        headline: 'Handcrafted African Treasures',
        subheadline: 'Every piece tells a story. Every purchase changes a life.',
        ctaText: 'Explore Collection',
        backgroundImage: { id: '1', alt: 'Hero background', url: '/placeholder-product.jpg' },
      },
      featuredCollections: [],
    };
  }

  return (
    <main id="main-content">
      <Hero
        headline={settings.heroContent.headline}
        subheadline={settings.heroContent.subheadline}
        ctaText={settings.heroContent.ctaText}
        backgroundImage={settings.heroContent.backgroundImage.url}
      />

      {/* Shop Preview */}
      <section id="shop" className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-1 font-serif mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces that celebrate African craftsmanship and cultural heritage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.docs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Gallery */}
      {artisans.docs.length > 0 && (
        <section id="artisans" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-heading-1 font-serif mb-4">Meet Our Artisans</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The talented hands and creative minds behind every piece
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artisans.docs.slice(0, 3).map((artisan) => (
                <ArtistCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Stats */}
      <ImpactStats />

      {/* Testimonials */}
      {testimonials.docs.length > 0 && (
        <TestimonialSlider testimonials={testimonials.docs} />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}