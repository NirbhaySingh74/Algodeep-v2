import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <td colSpan={5} className="text-center py-10">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Search className="h-20 w-20 mx-auto mb-6 text-gray-700" />
        <h3 className="text-2xl font-medium mb-3 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          No Results Found
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          No problems match your current filters. Try adjusting your search or filter settings.
        </p>
        <Button
          className="mt-4 bg-transparent border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors"
          variant="outline"
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      </motion.div>
    </td>
  </motion.tr>
);

export default EmptyState;