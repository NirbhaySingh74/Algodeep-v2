// app/practice/categories/page.tsx
"use client";
import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";
import ProgressStats from "@/components/ProgressStats";
// import SearchAndFilters from "@/components/SearchAndFilters";
import CategoriesView from "@/components/CategoriesView";
import { useAppStore } from "@/store/store";
import { motion } from "framer-motion";

const contentVariants = {
  expanded: { marginLeft: "280px" },
  collapsed: { marginLeft: "80px" },
};

export default function CategoriesPage() {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* <Navbar /> */}
      <Sidebar />
      <motion.div
        className="flex-1 flex flex-col overflow-hidden mt-16"
        initial="expanded"
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <main className="flex-1 overflow-y-auto p-6 bg-gray-950">
          <ProgressStats />
          {/* <SearchAndFilters /> */}
          <CategoriesView />
        </main>
      </motion.div>
    </div>
  );
}
