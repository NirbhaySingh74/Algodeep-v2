"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [particles, setParticles] = useState<
    { x: number; y: number; opacity: number; delay: number }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setParticles(
        [...Array(25)].map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5 + 0.3,
          delay: Math.random() * 5, // Varying start times
        }))
      );
    }
  }, []);

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a28] to-[#1e1e2e]"></div>

      {/* Animated particles */}
      {particles.length > 0 && (
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#6c5ce7] rounded-full"
              initial={{ x: particle.x, y: particle.y, opacity: particle.opacity }}
              animate={{
                y: [particle.y, particle.y - Math.random() * 200, particle.y],
                x: [particle.x, particle.x + (Math.random() > 0.5 ? 50 : -50)],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ rotate: [-2, 2, -2] }} // Subtle wavy effect on hover
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">Master DSA</span>{" "}
          <span className="text-[#00b894]">Patterns</span>
        </motion.h1>

        <motion.p
          className="text-lg text-[#a0a0b0] mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Learn Data Structures and Algorithms systematically. Practice LeetCode
          problems grouped by patterns. Ace your coding interviews.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.1, y: -5 }} // Subtle bounce on hover
        >
          <Link
            href="/practice/categories"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-[#6c5ce7] to-[#00b894] rounded-lg shadow-lg hover:from-[#5a4ad1] hover:to-[#00a382] transition-all duration-300 transform hover:scale-105"
          >
            Start Practicing
            <Zap className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}