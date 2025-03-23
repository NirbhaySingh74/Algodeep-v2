"use client";

import { useRef, useEffect, JSX } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

// Define props interface for FeatureCard
interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  iconBgColor: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  iconBgColor, 
  index 
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-[#292942] to-[#232338] rounded-xl p-8 h-full border border-[#3d3d5c] hover:border-[#6c5ce7] transition-all duration-300 shadow-lg hover:shadow-[#6c5ce7]/20 relative overflow-hidden group"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(108, 92, 231, 0.1), 0 10px 10px -5px rgba(108, 92, 231, 0.04)"
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#6c5ce7]/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-[#6c5ce7]/10 transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#6c5ce7]/5 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2 group-hover:bg-[#6c5ce7]/10 transition-all duration-700"></div>
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${iconBgColor} group-hover:bg-[#6c5ce7]/30 transition-all duration-300 relative`}>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <div className="absolute inset-0 bg-[#6c5ce7]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#a29bfe] transition-colors duration-300">{title}</h3>
      <p className="text-[#a0a0b0] group-hover:text-[#c8c8d8] transition-colors duration-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};