"use client";

import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/store";
import { ReactNode } from "react";

const contentVariants = {
  expanded: { marginLeft: "280px" },
  collapsed: { marginLeft: "80px" },
};

export default function PracticeLayout({ children }: { children: ReactNode }) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <motion.div
        className="flex-1 flex flex-col overflow-hidden mt-16"
        initial="expanded"
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <main className="flex-1 overflow-y-auto p-6 bg-gray-950">
          {children}
        </main>
      </motion.div>
    </div>
  );
}