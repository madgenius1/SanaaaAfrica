import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import TestimonialSlider from './components/TestimonialSlider';
import ImpactStats from './components/ImpactStats';
import { Product, Testimonial } from './types';

// Default mock data for local development without backend
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Maasai Beaded Necklace',
    slug: 'maasai-beaded-necklace',
    price: 45.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      alt: 'Colorful Maasai beaded necklace with intricate geometric patterns in red, blue, and white'
    }],
    shortDescription: 'Hand-beaded traditional Maasai necklace with vibrant colors and intricate patterns.',
    longDescription: 'This stunning necklace showcases traditional Maasai beadwork craftsmanship passed down through generations.',
    backstory: 'Each bead is carefully selected and strung by skilled Maasai women artisans in Kajiado County.',
    artisan: {
      id: 'a1',
      name: 'Mama Nashipae',
      slug: 'mama-nashipae',
      location: 'Kajiado, Kenya',
      bio: 'Master beadwork artisan with 30 years of experience',
      story: 'Mama Nashipae learned beading from her grandmother and now teaches young women in her community.'
    },
    tags: ['jewelry', 'necklace', 'maasai', 'handmade'],
    featured: true,
    stock: 8,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Kikoy Beach Wrap',
    slug: 'kikoy-beach-wrap',
    price: 32.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      alt: 'Colorful striped kikoy fabric wrap in coastal colors of blue, turquoise and white'
    }],
    shortDescription: 'Versatile cotton kikoy wrap in coastal-inspired colors, perfect for beach or home.',
    longDescription: 'Traditional Kenyan kikoy made from soft cotton with vibrant stripes.',
    backstory: 'Woven using century-old techniques on traditional looms by coastal artisans.',
    artisan: {
      id: 'a2',
      name: 'Ali Hassan',
      slug: 'ali-hassan',
      location: 'Lamu, Kenya',
      bio: 'Third-generation weaver preserving coastal textile traditions',
      story: 'Ali continues his family\'s weaving legacy on the historic island of Lamu.'
    },
    tags: ['garments', 'kikoy', 'beach', 'cotton'],
    featured: true,
    stock: 15,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Kiondo Sisal Basket',
    slug: 'kiondo-sisal-basket',
    price: 55.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
      alt: 'Handwoven sisal basket with natural brown and black geometric patterns'
    }],
    shortDescription: 'Handwoven kiondo basket made from natural sisal with leather handles.',
    longDescription: 'Traditional Kenyan kiondo basket, perfect for shopping or storage.',
    backstory: 'Each basket takes 3-5 days to weave by hand using sustainable sisal fibers.',
    artisan: {
      id: 'a3',
      name: 'Grace Wanjiru',
      slug: 'grace-wanjiru',
      location: 'Muranga, Kenya',
      bio: 'Award-winning basket weaver and women\'s cooperative leader',
      story: 'Grace leads a cooperative of 50 women weavers, providing sustainable income.'
    },
    tags: ['bags', 'basket', 'sisal', 'sustainable'],
    featured: true,
    stock: 6,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },
  {
    id: '4',
    title: 'Soapstone Love Birds',
    slug: 'soapstone-love-birds',
    price: 28.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
      alt: 'Pair of carved soapstone birds in natural cream and terracotta tones'
    }],
    shortDescription: 'Hand-carved Kisii soapstone love birds symbolizing unity and partnership.',
    longDescription: 'Beautiful decorative soapstone sculpture carved by Kisii artisans.',
    backstory: 'Kisii soapstone has been carved for centuries in western Kenya.',
    artisan: {
      id: 'a4',
      name: 'John Ombati',
      slug: 'john-ombati',
      location: 'Kisii, Kenya',
      bio: 'Master soapstone carver specializing in wildlife sculptures',
      story: 'John learned carving from his father and now exports globally.'
    },
    tags: ['decor', 'sculpture', 'soapstone', 'kisii'],
    featured: false,
    stock: 12,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05'
  },
  {
    id: '5',
    title: 'Batik Print Dress',
    slug: 'batik-print-dress',
    price: 68.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      alt: 'Flowing cotton dress with vibrant batik print in warm earth tones'
    }],
    shortDescription: 'Flowing cotton dress featuring authentic African batik print designs.',
    longDescription: 'Handmade dress with traditional batik printing techniques.',
    backstory: 'Each dress is hand-dyed using wax-resist batik methods.',
    tags: ['garments', 'dress', 'batik', 'fashion'],
    featured: false,
    stock: 5,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10'
  },
  {
    id: '6',
    title: 'Wooden Serving Bowl',
    slug: 'wooden-serving-bowl',
    price: 42.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      alt: 'Hand-carved wooden bowl with smooth natural finish'
    }],
    shortDescription: 'Hand-carved wooden bowl from indigenous Kenyan hardwood.',
    longDescription: 'Beautiful serving bowl perfect for fruits or salads.',
    backstory: 'Carved from sustainably sourced olive wood using traditional tools.',
    tags: ['decor', 'kitchenware', 'wood', 'handcarved'],
    featured: false,
    stock: 10,
    createdAt: '2024-02-12',
    updatedAt: '2024-02-12'
  },
  {
    id: '7',
    title: 'Leather Sandals',
    slug: 'leather-sandals',
    price: 52.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
      alt: 'Handmade leather sandals with woven straps in natural tan color'
    }],
    shortDescription: 'Handcrafted leather sandals with traditional Maasai beaded detailing.',
    longDescription: 'Comfortable and stylish leather sandals made by local cobblers.',
    backstory: 'Each pair is hand-stitched using locally sourced leather.',
    tags: ['shoes', 'sandals', 'leather', 'footwear'],
    featured: false,
    stock: 8,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15'
  },
  {
    id: '8',
    title: 'Woven Wall Hanging',
    slug: 'woven-wall-hanging',
    price: 85.00,
    currency: 'USD',
    images: [{
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80',
      alt: 'Large woven wall hanging with geometric patterns in natural and dyed fibers'
    }],
    shortDescription: 'Large woven wall art featuring traditional patterns in natural fibers.',
    longDescription: 'Statement piece woven with banana fiber and natural dyes.',
    backstory: 'Created using techniques preserved over generations of weavers.',
    tags: ['decor', 'wall-art', 'woven', 'textiles'],
    featured: true,
    stock: 3,
    createdAt: '2024-02-18',
    updatedAt: '2024-02-18'
  }
];

const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    quote: 'The craftsmanship is incredible! I love knowing my purchase directly supports artisan families.',
    photo: {
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      alt: 'Portrait of Sarah Mitchell'
    }
  },
  {
    id: 't2',
    name: 'David Ochieng',
    quote: 'Authentic African art delivered worldwide. The backstories of each piece make them even more special.',
    photo: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      alt: 'Portrait of David Ochieng'
    }
  },
  {
    id: 't3',
    name: 'Maria Rodriguez',
    quote: 'Beautiful quality and fast shipping. These pieces bring warmth and culture into my home.',
    photo: {
      url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80',
      alt: 'Portrait of Maria Rodriguez'
    }
  }
];

export default function HomePage() {
  // In production, fetch from Payload CMS
  // const products = await fetchProducts();
  const products = mockProducts;
  const testimonials = mockTestimonials;

  const featuredProducts = products.filter(p => p.featured);
  const jewelry = products.filter(p => p.tags.includes('jewelry'));
  const garments = products.filter(p => p.tags.includes('garments'));

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="section-padding bg-white" id="products">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-heading text-navy mb-4">Featured Collections</h2>
            <p className="text-lg text-navy/70 max-w-2xl mx-auto">
              Handpicked pieces that showcase the finest African craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <ImpactStats />

      {/* Jewelry Section */}
      <section className="section-padding bg-ivory" id="jewelry">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-navy mb-2">Handcrafted Jewelry</h2>
              <p className="text-navy/70">Unique pieces telling timeless stories</p>
            </div>
            <a href="/category/jewelry" className="text-rust hover:text-terracotta font-accent font-semibold flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jewelry.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-navy mb-4">What Our Customers Say</h2>
            <p className="text-lg text-navy/70">Real stories from real people</p>
          </div>

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-linear-to-br from-rust to-terracotta text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading mb-6">Support African Artisans</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Every purchase preserves cultural heritage and provides sustainable income for artisan families across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#products" className="btn bg-white text-rust hover:bg-ivory">
              Shop Now
            </a>
            <a href="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-rust">
              Learn Our Story
            </a>
          </div>
        </div>
      </section>
    </>
  );
}