'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Testimonial } from '../types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const testimonial = testimonials[current];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-ivory rounded-2xl p-8 md:p-12 shadow-lg relative">
        {/* Quote Icon */}
        <div className="absolute top-6 left-6 text-rust/20 text-6xl font-heading">
          &apos;&apos;
        </div>

        <div className="relative z-10">
          {/* Testimonial Content */}
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl text-navy font-body italic leading-relaxed mb-6">
              {testimonial.quote}
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center justify-center space-x-4">
            {testimonial.photo && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={testimonial.photo.url}
                  alt={testimonial.photo.alt || testimonial.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}
            <div className="text-left">
              <div className="font-heading font-semibold text-navy">
                {testimonial.name}
              </div>
              <div className="flex text-rust">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? 'bg-rust w-8' : 'bg-rust/30'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={previous}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-rust hover:text-white transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-rust hover:text-white transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}