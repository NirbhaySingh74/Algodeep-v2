import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Providers } from './providers';
import { Toaster } from "react-hot-toast";
import Script from 'next/script';

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
        url: 'https://www.algogrid.xyz/og-image.png', // Replace with your actual Open Graph image
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
    images: ['https://www.algogrid.xyz/og-image.png'], // Replace with your actual Open Graph image
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
      logo: 'https://www.algogrid.xyz/AlgoGrid.png', // Ensure this file exists
      sameAs: [
        'https://x.com/nirbhay_74',
        'https://www.linkedin.com/in/nirbhay-singh-b8a169207/',
        'https://portfolio-v2-two-rouge.vercel.app/',
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </Providers>

        {/* Google Analytics using next/script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1ZXEEWMMJF"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1ZXEEWMMJF');
          `}
        </Script>
      </body>
    </html>
  );
}