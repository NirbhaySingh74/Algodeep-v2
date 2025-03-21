"use client"
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Zap, Code, ChevronRight, ArrowRight, Briefcase, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function EnhancedHeroSection() {
  // Cursor effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // For parallax scrolling effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  // Dynamic particles system
  const [particles, setParticles] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const heroRef = useRef(null);
  
  // Mouse movement effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);
  
  // Handle window resize and particles initialization
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      
      // Create particles
      const newParticles = [...Array(40)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.7,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        color: Math.random() > 0.7 ? "#a29bfe" : (Math.random() > 0.5 ? "#6c5ce7" : "#00b894"),
      }));
      
      setParticles(newParticles);
      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const titleWords = ["Master", "DSA", "Patterns"];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24" // Added padding-top to fix navbar overlap
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10101c] via-[#1a1a28] to-[#1e1e2e]"></div>
      
      {/* Perspective grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMDAgMCBMIDAgMCAwIDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwOCwgOTIsIDIzMSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#6c5ce7]/10 rounded-full filter blur-[100px] opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#00b894]/10 rounded-full filter blur-[100px] opacity-30 animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      {/* Cursor follower */}
      <motion.div
        className="hidden md:block fixed w-32 h-32 rounded-full pointer-events-none z-0"
        style={{ 
          x: cursorXSpring, 
          y: cursorYSpring,
          background: "radial-gradient(circle, rgba(108,92,231,0.1) 0%, rgba(108,92,231,0) 70%)",
          transform: "translate(-50%, -50%)"
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: 0,
              filter: "blur(0px)"
            }}
            animate={{
              y: [particle.y, particle.y - 200 - Math.random() * 200, particle.y],
              x: [
                particle.x, 
                particle.x + (Math.random() > 0.5 ? 80 + Math.random() * 40 : -80 - Math.random() * 40),
                particle.x
              ],
              opacity: [0, particle.opacity, 0],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
      
      {/* Code brackets in background */}
      <motion.div 
        className="absolute text-[#6c5ce7]/5 text-[400px] font-mono font-bold select-none z-0 leading-none"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        {"{ }"}
      </motion.div>
      
      {/* Main content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          className="inline-block mb-6 mt-6" // Added margin-top for better spacing
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="px-4 py-1.5 bg-gradient-to-r from-[#6c5ce7]/10 to-[#00b894]/10 backdrop-blur-sm rounded-full border border-[#6c5ce7]/20">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894] font-medium">
              <Code className="inline-block w-4 h-4 mr-2 mb-1" />
              Accelerate Your Interview Prep
            </span>
          </div>
        </motion.div>
        
        {/* Animated title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          {titleWords.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-4 overflow-hidden">
              {Array.from(word).map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className={`inline-block ${
                    wordIndex === 0 ? "text-white" : 
                    wordIndex === 1 ? "bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]" :
                    "text-[#00b894]"
                  }`}
                  custom={letterIndex}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>
        
        {/* Sub-heading */}
        <motion.p
          className="text-xl text-[#a0a0b0] mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Learn Data Structures and Algorithms systematically. Practice {" "}
          <span className="text-white font-medium">265 problems</span> organized by patterns and explore 
          company-specific questions to ace your coding interviews.
        </motion.p>
        
        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              href="/practice/categories"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white overflow-hidden rounded-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#6c5ce7] to-[#00b894] group-hover:opacity-90 transition-opacity"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <span className="absolute top-0 left-0 w-full h-1 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <span className="relative flex items-center">
                Explore Problems
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="h-5 w-5" />
                </motion.span>
              </span>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              href="/practice/companies"
              className="group inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-[#a29bfe] hover:text-white transition-colors bg-[#2d2d42]/50 hover:bg-[#2d2d42] backdrop-blur-sm rounded-lg border border-[#6c5ce7]/20 hover:border-[#6c5ce7]/40"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Company Questions
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Stats counter */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="py-6 px-4 rounded-lg bg-[#2d2d42]/30 backdrop-blur-sm border border-[#6c5ce7]/10">
            <div className="flex items-center justify-center mb-2">
              <Lightbulb className="h-5 w-5 text-[#a29bfe] mr-2" />
              <span className="text-[#a0a0b0] text-sm font-medium uppercase tracking-wider">Problem Collection</span>
            </div>
            <motion.div 
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              265
            </motion.div>
            <div className="text-[#a0a0b0] text-sm mt-1">Curated Problems</div>
          </div>
          
          <div className="py-6 px-4 rounded-lg bg-[#2d2d42]/30 backdrop-blur-sm border border-[#6c5ce7]/10">
            <div className="flex items-center justify-center mb-2">
              <Code className="h-5 w-5 text-[#a29bfe] mr-2" />
              <span className="text-[#a0a0b0] text-sm font-medium uppercase tracking-wider">Problem Patterns</span>
            </div>
            <motion.div 
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              15
            </motion.div>
            <div className="text-[#a0a0b0] text-sm mt-1">Algorithm Categories</div>
          </div>
          
          <div className="py-6 px-4 rounded-lg bg-[#2d2d42]/30 backdrop-blur-sm border border-[#6c5ce7]/10">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-5 w-5 text-[#a29bfe] mr-2" />
              <span className="text-[#a0a0b0] text-sm font-medium uppercase tracking-wider">Top Companies</span>
            </div>
            <motion.div 
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              10
            </motion.div>
            <div className="text-[#a0a0b0] text-sm mt-1">With ~200 Problems Each</div>
          </div>
        </motion.div>
        
        {/* Feature Highlights - Removed "Comprehensive Solutions" feature */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          {[
            { title: "Pattern-Based Learning", description: "Problems organized by algorithm patterns" },
            { title: "Company-Specific Practice", description: "Questions from top tech interviews" },
            { title: "Progress Tracking", description: "Mark completed problems and track progress" }
          ].map((feature, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg bg-[#2d2d42]/20 backdrop-blur-sm">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6c5ce7]/20 flex items-center justify-center mr-3">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-[#a29bfe] font-bold">0{index + 1}</span>
                </motion.div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{feature.title}</h3>
                <p className="text-[#a0a0b0] text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-[#a0a0b0] text-sm mb-2">Scroll for more</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5 text-[#6c5ce7] transform rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}