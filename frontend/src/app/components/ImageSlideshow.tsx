import { useState, useEffect } from 'react';
import Image from 'next/image';

// --- Typescript Safety: Define Image Type and Props Type ---
interface SlideImage {
  src: string;
  alt: string;
}

interface ImageSlideshowProps {
  images: SlideImage[];
  intervalMs?: number; // Optional prop for slideshow interval
}

// Dummy image data for demonstration (You will replace these)
const defaultImages: SlideImage[] = [
  { src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80", alt: "African jewelry and curios" },
  { src: "https://images.unsplash.com/photo-1549488340-d93f7736f322?w=800&q=80", alt: "Handmade ceramic bowls" },
  { src: "https://images.unsplash.com/photo-1533089309608-8f5223c6f4b6?w=800&q=80", alt: "Woven baskets and textiles" },
];

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images = defaultImages, intervalMs = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up the automatic slideshow interval
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, intervalMs);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  // Use a unique key on the Image component to force a re-render for transition effects
  const currentImage = images[currentIndex];

  return (
    <div className="relative h-[500px] md:h-[600px] animate-slide-in">
      {/* Background/Frame effect */}
      <div className="absolute inset-0 bg-linear-to-br from-rust/20 to-emerald/20 rounded-3xl transform rotate-3" />
      
      <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 ease-in-out">
        {/*
          Key Change: Use a unique key on the Image component to trigger CSS transitions (or better, an animation library)
          A simple 'opacity' transition is applied via a wrapper div.
        */}
        <div key={currentImage.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover"
            priority={currentIndex === 0} // Only set priority for the first image
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      
      {/* Floating badge (kept for original design) */}
      {/* ... your floating badge HTML ... */}
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
  );
};

export default ImageSlideshow;