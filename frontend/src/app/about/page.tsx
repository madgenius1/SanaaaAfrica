import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Sanaa African Curios',
  description: 'Learn about our mission to preserve African culture and support artisan communities through fair trade handcrafted goods.',
};

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-rust/10 to-emerald/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-navy mb-6">Our Story</h1>
            <p className="text-xl text-navy/80 leading-relaxed">
              Sanaa African Curios was born from a simple belief: that every handcrafted piece 
              tells a story worth sharing, and every artisan deserves fair recognition for their craft.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-navy mb-6">Our Mission</h2>
              <div className="space-y-4 text-navy/80 leading-relaxed">
                <p>
                  We connect the world with authentic African craftsmanship, creating sustainable 
                  livelihoods for artisans while preserving cultural heritage for future generations.
                </p>
                <p>
                  Every purchase directly supports artisan families, funds community development 
                  projects, and helps keep traditional techniques alive in an increasingly modern world.
                </p>
                <p>
                  We believe in fair trade, ethical sourcing, and transparent partnerships. Our artisans 
                  receive fair wages, work in safe conditions, and maintain ownership of their designs 
                  and intellectual property.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1523496922380-91d5afba98a3?w=800&q=80"
                alt="Artisan working on traditional African crafts"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <h2 className="font-heading text-navy text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-rust rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-navy mb-3">Authenticity</h3>
              <p className="text-navy/70">
                Every piece is genuinely handcrafted using traditional techniques passed down through generations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-navy mb-3">Fair Trade</h3>
              <p className="text-navy/70">
                We ensure fair wages, ethical working conditions, and long-term partnerships with all artisans.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-sage rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-navy mb-3">Sustainability</h3>
              <p className="text-navy/70">
                We use eco-friendly materials and practices that protect the environment for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-navy text-center mb-12">Our Impact</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-rust/5 rounded-xl p-6">
                <h4 className="font-heading text-rust text-2xl mb-2">250+ Artisans</h4>
                <p className="text-navy/70">
                  We've partnered with over 250 skilled artisans across Kenya, providing sustainable income 
                  and preserving traditional crafts.
                </p>
              </div>
              <div className="bg-emerald/5 rounded-xl p-6">
                <h4 className="font-heading text-emerald text-2xl mb-2">15 Communities</h4>
                <p className="text-navy/70">
                  Our reach extends to 15 different communities, supporting education, healthcare, 
                  and economic development initiatives.
                </p>
              </div>
              <div className="bg-sage/20 rounded-xl p-6">
                <h4 className="font-heading text-emerald text-2xl mb-2">$100K+ Generated</h4>
                <p className="text-navy/70">
                  Over $100,000 in fair wages paid directly to artisans, with 10% of profits funding 
                  community development projects.
                </p>
              </div>
              <div className="bg-terracotta/5 rounded-xl p-6">
                <h4 className="font-heading text-terracotta text-2xl mb-2">100% Fair Trade</h4>
                <p className="text-navy/70">
                  Every single product is fair trade certified, ensuring ethical practices throughout 
                  our entire supply chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-linear-to-br from-navy to-navy/90 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-white mb-4">Meet Some of Our Artisans</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The talented individuals behind every handcrafted piece
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-rust">
                <Image
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80"
                  alt="Mama Nashipae, beadwork artisan"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <h3 className="font-heading text-xl mb-2">Mama Nashipae</h3>
              <p className="text-white/70 text-sm mb-2">Beadwork Master</p>
              <p className="text-white/60 text-sm">
                30+ years creating traditional Maasai jewelry in Kajiado County
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-rust">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                  alt="John Ombati, soapstone carver"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <h3 className="font-heading text-xl mb-2">John Ombati</h3>
              <p className="text-white/70 text-sm mb-2">Soapstone Carver</p>
              <p className="text-white/60 text-sm">
                Master carver from Kisii, specializing in wildlife sculptures
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-rust">
                <Image
                  src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80"
                  alt="Grace Wanjiru, basket weaver"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <h3 className="font-heading text-xl mb-2">Grace Wanjiru</h3>
              <p className="text-white/70 text-sm mb-2">Basket Weaver</p>
              <p className="text-white/60 text-sm">
                Award-winning weaver leading a cooperative of 50 women
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-ivory">
        <div className="container-custom text-center">
          <h2 className="font-heading text-navy mb-6">Join Our Mission</h2>
          <p className="text-xl text-navy/70 max-w-2xl mx-auto mb-8">
            Every purchase makes a difference. Shop authentic African crafts and support 
            artisan communities today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#products" className="btn btn-primary">
              Shop Collections
            </a>
            <a href="/contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}