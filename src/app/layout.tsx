import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AlgoGrid - Master DSA Patterns & Coding Challenges',
  description: 'Learn Data Structures and Algorithms systematically. Practice 265+ LeetCode questions organized by patterns and company-specific challenges to ace your coding interviews.',
  keywords: [
    'Data Structures',
    'Algorithms',
    'DSA Patterns',
    'LeetCode Questions',
    'Competitive Programming',
    'Coding Challenges',
    'Systematic Learning',
    'Company-Specific Questions',
    'Coding Interview Preparation',
  ],
  openGraph: {
    title: 'AlgoGrid - Master DSA Patterns & Coding Challenges',
    description: 'Learn Data Structures and Algorithms systematically. Practice 265+ LeetCode questions organized by patterns and company-specific challenges to ace your coding interviews.',
    url: 'https://www.algogrid.xyz',
    siteName: 'AlgoGrid',
    type: 'website',
    images: [
      {
        url: 'favicon.ico', // Replace with a real 1200x630 image
        width: 1200,
        height: 630,
        alt: 'AlgoGrid - Master DSA Patterns',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoGrid - Master DSA Patterns & Coding Challenges',
    description: 'Learn Data Structures and Algorithms systematically. Practice 265+ LeetCode questions organized by patterns and company-specific challenges to ace your coding interviews.',
    site: '@AlgoGrid',
    creator: '@AlgoGrid',
    images: ['favicon.ico'], // Same image as Open Graph
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.algogrid.xyz',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Structured data for Organization and WebSite
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'AlgoGrid',
      url: 'https://www.algogrid.xyz',
      logo: 'https://www.algogrid.xyz/AlgoGrid.png',
      sameAs: [
        'https://x.com/nirbhay_74', // Your Twitter URL
        'https://www.linkedin.com/in/nirbhay-singh-b8a169207/', // Replace with your LinkedIn URL
        'https://portfolio-v2-two-rouge.vercel.app/', // Replace with your portfolio URL
      ],
    },
    {
      '@type': 'WebSite',
      url: 'https://www.algogrid.xyz',
      name: 'AlgoGrid',
      description: 'Learn Data Structures and Algorithms systematically with structured patterns and interactive challenges.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.algogrid.xyz/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Add structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}