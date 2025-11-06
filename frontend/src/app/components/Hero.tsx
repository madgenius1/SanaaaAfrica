import Link from 'next/link';
// We don't need Image here anymore, as it's now in ImageSlideshow
import ImageSlideshow from './ImageSlideshow'; // Import the new component (assuming it's in the same directory)

// --- Typescript Safety: Define an explicit array of images for the slideshow ---
// Note: If you have a separate file for types, import it instead of redefining.
interface SlideImage {
  src: string;
  alt: string;
}

// Define your images here (or fetch them from an API/config)
const heroImages: SlideImage[] = [
  { src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80", alt: "African jewelry and curios" },
  { src: "https://images.unsplash.com/photo-1549488340-d93f7736f322?w=800&q=80", alt: "Handmade ceramic bowls" },
  { src: "https://images.unsplash.com/photo-1533089309608-8f5223c6f4b6?w=800&q=80", alt: "Woven baskets and textiles" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-linear-to-br from-ivory via-sage/10 to-rust/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B233F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10 w-full">
        {/*
          Key Change:
          md:grid-cols-2: Two columns on medium screens and up.
          flex-col-reverse: The first child (Content) will appear on the bottom on small screens.
                           The second child (Slideshow) will appear on top on small screens.
                           This makes the Slideshow (right side) appear *above* the Content (left side) on mobile,
                           which is generally better for a hero image.
        */}
        <div className="grid md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row">
          
          {/*
            SECTION 1: Content (The original left section)
            This section will display on the LEFT on medium screens and ABOVE the slideshow on small screens due to flex-col-reverse.
          */}
          <div className="space-y-6 animate-fade-in order-2 md:order-1"> {/* order-2/order-1 is redundant due to flex-col-reverse/md:flex-row but makes intent explicit */}
            <div className="inline-block px-4 py-2 bg-emerald/10 rounded-full">
              <span className="text-emerald font-accent font-semibold text-sm">
                ✨ Authentic • Handcrafted • Ethical
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-navy leading-tight">
              Stories Woven in
              <span className="block text-rust mt-2">African Craftsmanship</span>
            </h1>
            
            <p className="text-lg text-navy/70 leading-relaxed max-w-xl">
              Discover unique, handmade curios from Kenya&apos;s finest artisans. 
              Every piece tells a story, preserves tradition, and empowers communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/#products" className="btn btn-primary text-center">
                Shop Collections
              </Link>
              <Link href="/about" className="btn btn-outline text-center">
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-heading font-bold text-rust">50+</div>
                <div className="text-sm text-navy/60 font-accent">Artisans</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-emerald">200+</div>
                <div className="text-sm text-navy/60 font-accent">Products</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-terracotta">15+</div>
                <div className="text-sm text-navy/60 font-accent">Countries</div>
              </div>
            </div>
          </div>

          {/*
            SECTION 2: Image Slideshow (The new right section)
            This section will display on the RIGHT on medium screens and BELOW the content on small screens.
          */}
          <div className="order-1 md:order-2"> {/* order-1/order-2 is redundant due to flex-col-reverse/md:flex-row but makes intent explicit */}
            <ImageSlideshow images={heroImages} intervalMs={5000} /> 
          </div>

        </div>
      </div>
    </section>
  );
}