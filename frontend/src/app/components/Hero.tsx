import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-linear-to-br from-ivory via-sage/10 to-rust/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B233F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
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
              Discover unique, handmade curios from Kenya's finest artisans. 
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

          {/* Hero Image */}
          <div className="relative h-[500px] md:h-[600px] animate-slide-in">
            <div className="absolute inset-0 bg-linear-to-br from-rust/20 to-emerald/20 rounded-3xl transform rotate-3" />
            <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"
                alt="Beautiful handcrafted African jewelry and curios displayed on natural materials"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading font-bold text-navy">Fair Trade</div>
                  <div className="text-sm text-navy/60">Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}