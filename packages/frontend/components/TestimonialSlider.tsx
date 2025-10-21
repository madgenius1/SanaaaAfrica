'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className="bg-emerald text-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-heading-1 text-center mb-12 font-serif">
          What Our Customers Say
        </h2>
        
        <div className="relative min-h-[300px]">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="text-center">
                {testimonial.photo && (
                  <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.photo.url}
                      alt={testimonial.photo.alt || testimonial.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                
                <blockquote className="text-xl md:text-2xl italic mb-6 text-balance">
                  "{testimonial.quote}"
                </blockquote>
                
                <cite className="not-italic">
                  <div className="font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-ivory/80">{testimonial.relation}</div>
                </cite>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current ? 'bg-rust w-8' : 'bg-white/40'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}