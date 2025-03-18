import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description, iconBgColor, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div 
      className="bg-[#292942] rounded-xl p-6 h-full border border-[#3d3d5c] hover:border-[#6c5ce7]/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconBgColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-[#a0a0b0]">{description}</p>
    </motion.div>
  );
}