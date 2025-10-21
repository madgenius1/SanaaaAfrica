import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deepnavy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif mb-4">Sanaa African Curios</h3>
            <p className="text-ivory/80 mb-4">
              Handcrafted African treasures with stories that matter.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/sanaa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rust transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/sanaa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rust transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/sanaa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rust transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/#shop" className="text-ivory/80 hover:text-rust transition-colors">All Products</Link></li>
              <li><Link href="/#collections" className="text-ivory/80 hover:text-rust transition-colors">Collections</Link></li>
              <li><Link href="/#featured" className="text-ivory/80 hover:text-rust transition-colors">Featured Items</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">About</h4>
            <ul className="space-y-2">
              <li><Link href="/#artisans" className="text-ivory/80 hover:text-rust transition-colors">Our Artisans</Link></li>
              <li><Link href="/#impact" className="text-ivory/80 hover:text-rust transition-colors">Our Impact</Link></li>
              <li><Link href="/#story" className="text-ivory/80 hover:text-rust transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Stay Connected</h4>
            <p className="text-ivory/80 mb-4 text-sm">
              Get updates on new arrivals and artisan stories.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-rust"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="btn-primary"
                aria-label="Subscribe to newsletter"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ivory/60">
          <p>© {currentYear} Sanaa African Curios. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-rust transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-rust transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-rust transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}