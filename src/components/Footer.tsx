import Link from 'next/link';
import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1e1e2e] border-t border-[#3d3d5c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Code2 className="h-8 w-8 text-[#a29bfe] mr-2" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">AlgoMaster</span>
            </div>
            <p className="text-[#a0a0b0] mb-4 max-w-md">
              Master Data Structures and Algorithms with our structured approach. 
              Practice problems by pattern and ace your coding interviews.
            </p>
            <p className="text-[#a0a0b0]/70">© 2025 AlgoMaster. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/practice" className="text-[#a0a0b0] hover:text-white transition-colors">Practice Problems</Link></li>
              <li><Link href="/blog" className="text-[#a0a0b0] hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/roadmap" className="text-[#a0a0b0] hover:text-white transition-colors">Learning Roadmap</Link></li>
              <li><Link href="/companies" className="text-[#a0a0b0] hover:text-white transition-colors">Company Questions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[#a0a0b0] hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-[#a0a0b0] hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-[#a0a0b0] hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#a0a0b0] hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}