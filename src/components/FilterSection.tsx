import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { useAppStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterSectionProps {
  viewMode: "all" | "solved" | "unsolved" | "favorites";
  setViewMode: (mode: "all" | "solved" | "unsolved" | "favorites") => void;
}

const FilterSection: React.FC<FilterSectionProps> = React.memo(({ viewMode, setViewMode }) => {
  const { searchQuery, setSearchQuery, difficultyFilter, setDifficultyFilter } = useAppStore();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative w-full">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
          <Input
            placeholder="Search by title or problem ID..."
            className="pl-9 bg-gray-800 border-gray-700 text-sm"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 text-indigo-400" />
            Filter
          </Button>
          <select
            className="bg-gray-800 border border-gray-700 rounded-md text-sm px-3 py-1 text-gray-200"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
          >
            <option value="all">All</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
            <option value="favorites">Favorites</option>
          </select>
        </div>
      </div>
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {["Easy", "Medium", "Hard"].map((difficulty) => (
              <Button
                key={difficulty}
                size="sm"
                variant={difficultyFilter.includes(difficulty) ? "default" : "outline"}
                className={`text-xs font-medium ${difficultyFilter.includes(difficulty) ? "bg-indigo-600" : "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"}`}
                onClick={() => {
                  const newFilter = difficultyFilter.includes(difficulty)
                    ? difficultyFilter.filter((d) => d !== difficulty)
                    : [...difficultyFilter, difficulty];
                  setDifficultyFilter(newFilter);
                }}
              >
                {difficulty}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-medium bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
              onClick={() => setDifficultyFilter([])}
            >
              Clear
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FilterSection.displayName = "FilterSection";
export default FilterSection;