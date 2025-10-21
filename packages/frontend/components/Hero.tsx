import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  backgroundImage: string;
}

export default function Hero({
  headline,
  subheadline,
  ctaText,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Hero background"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deepnavy/60 to-deepnavy/30" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h1 className="text-display font-serif mb-6 animate-fade-in text-balance">
          {headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-slide-up text-balance opacity-90">
          {subheadline}
        </p>
        <Link 
          href="#shop" 
          className="btn-primary inline-block text-lg animate-slide-up"
          aria-label="Shop our collection"
        >
          {ctaText}
        </Link>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}