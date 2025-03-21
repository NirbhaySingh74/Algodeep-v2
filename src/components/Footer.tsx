"use client";
import Link from 'next/link';
import { Code2, Github, Twitter, Mail, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { useState } from 'react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');

  return (
    <footer className="bg-gradient-to-b from-[#1e1e2e] to-[#10101c] border-t border-[#3d3d5c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <Code2 className="h-8 w-8 text-[#a29bfe] mr-2" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">AlgoMaster</span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[#a0a0b0] mb-6 max-w-md leading-relaxed"
            >
              Master Data Structures and Algorithms with our structured approach. 
              Practice problems by pattern and ace your coding interviews.
            </motion.p>
            
            {/* Newsletter signup */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-white text-sm mb-3 font-medium">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-[#2d2d42] text-white px-4 py-2 rounded-l-md border border-[#3d3d5c] focus:outline-none focus:border-[#6c5ce7] flex-1"
                />
                <button 
                  className="bg-gradient-to-r from-[#6c5ce7] to-[#00b894] px-4 py-2 rounded-r-md text-white hover:opacity-90 transition-opacity"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex space-x-4 mb-6"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#a0a0b0] hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#a0a0b0] hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@algomaster.com" className="text-[#a0a0b0] hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[#a0a0b0]/70 text-sm"
            >
              © 2025 AlgoMaster. All rights reserved.
            </motion.p>
          </div>
          
          {/* Resources column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: "Practice Problems", href: "/practice/categories" },
                { label: "Blog", href: "/blog" },
                { label: "Learning Roadmap", href: "/roadmap" },
                { label: "Company Questions", href: "/practice/companies" }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={item.href} 
                    className="text-[#a0a0b0] hover:text-white transition-colors flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Company column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={item.href} 
                    className="text-[#a0a0b0] hover:text-white transition-colors flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom accent line */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[#6c5ce7]/20 to-transparent mt-10"
        />
      </div>
    </footer>
  );
}