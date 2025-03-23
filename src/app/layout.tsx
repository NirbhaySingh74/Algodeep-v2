import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AlgoGrid - Master DSA Patterns',
  description: 'Learn Data Structures and Algorithms systematically with structured patterns and interactive challenges.',
  keywords: [
    'Data Structures',
    'Algorithms',
    'DSA Patterns',
    'Competitive Programming',
    'Systematic Learning',
    'Coding Challenges',
  ],
  openGraph: {
    title: 'AlgoGrid - Master DSA Patterns',
    description: 'Learn Data Structures and Algorithms systematically with structured patterns and interactive challenges.',
    url: 'https://algogrid.xyz', 
    type: 'website',
    images: [
      {
        url: 'AlgoGrid.png', 
        width: 1200,
        height: 630,
        alt: 'AlgoGrid - Master DSA Patterns',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoGrid - Master DSA Patterns',
    description: 'Learn Data Structures and Algorithms systematically with structured patterns and interactive challenges.',
    site: '@AlgoGrid', 
    creator: '@AlgoGrid',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://algogrid.xyz', 
  },
};


export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/AlgoGrid.png" />
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