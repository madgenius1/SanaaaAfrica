import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0];
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency || 'USD',
  }).format(product.price);

  return (
    <Link href={`/product/${product.slug}`}>
      <article className="card group">
        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-ivory">
          {mainImage && (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          
          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-rust text-white px-3 py-1 rounded-full text-xs font-accent font-semibold">
              Featured
            </div>
          )}
          
          {/* Stock Badge */}
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-4 right-4 bg-burgundy text-white px-3 py-1 rounded-full text-xs font-accent font-semibold">
              Only {product.stock} left
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-navy px-4 py-2 rounded-lg font-accent font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-emerald bg-emerald/10 px-2 py-1 rounded-full font-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-heading font-semibold text-xl text-navy group-hover:text-rust transition-colors line-clamp-2">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-navy/70 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Artisan */}
          {product.artisan && (
            <div className="flex items-center space-x-2 text-sm text-navy/60">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-accent">by {product.artisan.name}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-heading font-bold text-rust">
              {formattedPrice}
            </span>
            <button
              className="p-2 rounded-full bg-rust/10 text-rust hover:bg-rust hover:text-white transition-colors"
              aria-label={`Add ${product.title} to cart`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}