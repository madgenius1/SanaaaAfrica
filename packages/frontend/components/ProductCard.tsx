import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.price_cents / 100);

  return (
    <article className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-ivory">
          <Image
            src={product.hero_image?.url || '/placeholder-product.jpg'}
            alt={product.hero_image?.alt || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <span className="absolute top-4 right-4 bg-rust text-white px-3 py-1 text-sm font-medium rounded">
              Featured
            </span>
          )}
        </div>
        
        <div className="p-6">
          <div className="mb-2">
            <span className="text-sm text-sage font-medium">
              {product.artisan.name}
            </span>
          </div>
          
          <h3 className="text-xl font-serif mb-2 text-deepnavy group-hover:text-rust transition-colors">
            {product.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-burgundy">
              {formattedPrice}
            </span>
            <span className="text-rust font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}