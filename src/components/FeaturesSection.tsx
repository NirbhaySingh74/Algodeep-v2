"use client";
import {
  Code,
  Building,
  Filter,
  Bookmark,
  Star,
  LineChart,
  BrainCircuit,
  Folder,
} from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a28] to-[#1e1e2e] z-0"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#6c5ce7]/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#6c5ce7]/5 rounded-full blur-3xl transform translate-y-1/2"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHpNMCAwaDMwdjMwSDB6TTMwIDBoMzB2MzBIMzB6IiBzdHJva2U9IiMzZDNkNWMiIHN0cm9rZS1vcGFjaXR5PSIuMSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-20 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-3">
            <div className="px-3 py-1 rounded-full bg-[#6c5ce7]/10 border border-[#6c5ce7]/20 text-[#a29bfe] text-sm font-medium">
              Why Choose Us
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Key <span className="text-[#a29bfe]">Features</span>
          </h2>
          <p className="text-xl text-[#a0a0b0] max-w-3xl mx-auto leading-relaxed">
            Everything you need to master coding problems and ace your technical
            interviews.
          </p>

          <div className="absolute left-1/2 -bottom-8 w-20 h-1 bg-gradient-to-r from-transparent via-[#6c5ce7] to-transparent transform -translate-x-1/2"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Updated Feature Data for Neetcode-like platform
const features = [
  {
    icon: <Folder className="h-7 w-7 text-[#a29bfe]" />,
    title: "Category-wise Problems",
    description:
      "Practice problems organized by patterns and categories like Arrays, Dynamic Programming, Graphs, and more.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Building className="h-7 w-7 text-[#a29bfe]" />,
    title: "Company-wise Collections",
    description:
      "Access problem sets frequently asked by top tech companies like Google, Meta, Amazon, and Microsoft.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Filter className="h-7 w-7 text-[#a29bfe]" />,
    title: "Advanced Filtering",
    description:
      "Filter problems by difficulty, status, pattern, or search specific problems using keywords.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Bookmark className="h-7 w-7 text-[#a29bfe]" />,
    title: "Mark as Solved",
    description:
      "Keep track of your progress by marking problems as solved and visualize your journey through different topics.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Star className="h-7 w-7 text-[#a29bfe]" />,
    title: "Star for Revision",
    description:
      "Star important problems you want to revisit later and create your personalized revision list.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <BrainCircuit className="h-7 w-7 text-[#a29bfe]" />,
    title: "Solution Approaches",
    description:
      "Access multiple solution approaches with detailed explanations and time/space complexity analysis for each problem.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
];