import Image from 'next/image';
import type { Artisan } from '@/types';

interface ArtistCardProps {
  artisan: Artisan;
}

export default function ArtistCard({ artisan }: ArtistCardProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
        <Image
          src={artisan.portrait?.url || '/placeholder-artisan.jpg'}
          alt={artisan.portrait?.alt || `Portrait of ${artisan.name}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-serif mb-2 text-deepnavy">
          {artisan.name}
        </h3>
        
        <p className="text-sage font-medium mb-3">
          {artisan.location}
        </p>
        
        <p className="text-gray-700 line-clamp-3">
          {artisan.bio}
        </p>
        
        {artisan.socialLinks && artisan.socialLinks.length > 0 && (
          <div className="flex gap-3 mt-4">
            {artisan.socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rust hover:text-terracotta transition-colors"
                aria-label={`${artisan.name} on ${link.platform}`}
              >
                <span className="capitalize">{link.platform}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}