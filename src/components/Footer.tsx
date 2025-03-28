"use client";
import Link from "next/link";
import { Code2, Github, Twitter, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Make sure this path matches your Supabase client setup
import { toast } from "react-hot-toast";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!emailInput || !/^\S+@\S+\.\S+$/.test(emailInput)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: emailInput })
        .select();

      if (error) {
        if (error.code === "23505") { // Unique constraint violation
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to the newsletter!");
        setEmailInput(""); // Clear input on success
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#1e1e2e] border-t border-[#3d3d5c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <Code2 className="h-8 w-8 text-[#a29bfe] mr-2" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">
                AlgoGrid
              </span>
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
                  disabled={isSubmitting}
                  className="bg-[#2d2d42] text-white px-4 py-2 rounded-l-md border border-[#3d3d5c] focus:outline-none focus:border-[#a29bfe] flex-1 disabled:opacity-50"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] px-4 py-2 rounded-r-md text-white transition-opacity ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                  }`}
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
              <a href="https://github.com/NirbhaySingh74" target="_blank" rel="noopener noreferrer"
                className="text-[#a0a0b0] hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://x.com/nirbhay_74" target="_blank" rel="noopener noreferrer"
                className="text-[#a0a0b0] hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:nkumarwork7@gmail.com"
                className="text-[#a0a0b0] hover:text-white transition-colors">
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
              © 2025 AlgoGrid. All rights reserved.
            </motion.p>
          </div>

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
                { label: "Learning Roadmap", href: "/roadmap" },
                { label: "Github", href: "https://github.com/NirbhaySingh74" },
                { label: "My Profile", href: "https://www.nirbhay.work/" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
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

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[#a29bfe]/20 to-transparent mt-10"
        />
      </div>
    </footer>
  );
}