import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CreatorSection from '@/components/CreatorSection';
import Footer from '@/components/Footer';

// Metadata object for SEO (replaces Head)
// export const metadata = {
//   title: 'AlgoGrid - Master DSA Patterns',
//   description: 'Learn Data Structures and Algorithms systematically. Practice LeetCode problems grouped by patterns. Ace your coding interviews.',
// };

export default function Home() {
  return (
    <>
      {/* Navbar can be moved to layout if it's on every page */}
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <CreatorSection />
      </main>
      <Footer />
    </>
  );
}