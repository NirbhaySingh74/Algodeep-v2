// FeaturesSection.jsx
"use client"
import { DollarSign, Brain, Target, Lightbulb, Search, LineChart } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a28] to-[#1e1e2e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Key Features
          </h2>
          <p className="text-lg text-[#a0a0b0] max-w-3xl mx-auto">
            Everything you need to master algorithms and ace your technical interviews.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Feature Data
const features = [
  {
    icon: <DollarSign className="h-6 w-6 text-[#a29bfe]" />,
    title: "Free Access",
    description:
      "Access the entire feature including problems, solutions, and resources completely free.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Brain className="h-6 w-6 text-[#a29bfe]" />,
    title: "Pattern Recognition",
    description:
      "Develop your problem-solving intuition by learning to recognize common patterns across different coding problems.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Target className="h-6 w-6 text-[#a29bfe]" />,
    title: "Structured Learning Tracks",
    description:
      "Follow curated problem sets tailored to your preparation time, whether you have over three months or less than a month.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-[#a29bfe]" />,
    title: "Comprehensive Solutions",
    description:
      "Master each coding problem with intuitive explanations, multiple solution approaches, and time complexity analysis.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <Search className="h-6 w-6 text-[#a29bfe]" />,
    title: "Search / Filter Problems",
    description:
      "Filter problems by pattern, status, difficulty level or search a specific problem by keyword.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
  {
    icon: <LineChart className="h-6 w-6 text-[#a29bfe]" />,
    title: "Progress Tracking",
    description:
      "Keep track of your progress by marking problems as completed or starring them for revision.",
    iconBgColor: "bg-[#6c5ce7]/20",
  },
];