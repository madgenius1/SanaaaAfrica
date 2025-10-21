import type { Metadata } from 'next';
import { Inter, Playfair_Display, Libre_Franklin } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const libreFranklin = Libre_Franklin({ 
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sanaa African Curios — Handcrafted African Jewelry, Garments & Décor',
  description: 'Discover authentic, hand-made curios from Kenya. Every purchase preserves culture and supports artisan livelihoods. Shop ethical jewelry, garments, bags and home décor.',
  keywords: 'Kenyan handcrafted jewelry, African artisan goods, ethical African fashion, handmade bags Kenya, African home decor, Kenyan artisans, sustainable fashion Africa, African gifts, cultural jewelry, export quality curios, artisan stories, fair trade jewelry',
  authors: [{ name: 'Sanaa African Curios' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanaa-curios.com',
    siteName: 'Sanaa African Curios',
    title: 'Sanaa African Curios — Handcrafted African Jewelry, Garments & Décor',
    description: 'Discover authentic, hand-made curios from Kenya. Every purchase preserves culture and supports artisan livelihoods.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanaa African Curios - Handcrafted African Art',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanaa African Curios — Handcrafted African Jewelry, Garments & Décor',
    description: 'Discover authentic, hand-made curios from Kenya. Every purchase preserves culture and supports artisan livelihoods.',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${libreFranklin.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}