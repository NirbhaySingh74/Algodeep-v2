import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { useAppStore } from "@/store/store";
const SearchAndFilters: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    difficultyFilter,
    setDifficultyFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
  } = useAppStore();

  const toggleDifficultyFilter = (difficulty: string) => {
    setDifficultyFilter(
      difficultyFilter.includes(difficulty)
        ? difficultyFilter.filter((d) => d !== difficulty)
        : [...difficultyFilter, difficulty]
    );
  };
// console.log("difficultfilter", difficultyFilter);

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(
      statusFilter.includes(status)
        ? statusFilter.filter((s) => s !== status)
        : [...statusFilter, status]
    );
  };

  return (
    <motion.div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full bg-gray-900 text-white px-4 py-3 pl-10 rounded-lg border border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        <motion.button
          className="bg-gray-900 p-3 rounded-lg border border-gray-800 hover:bg-gray-800"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-5 w-5 text-indigo-400" />
        </motion.button>
      </div>
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-400">
                  Difficulty
                </h3>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      difficultyFilter.includes("Easy")
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 text-green-400 hover:bg-gray-700"
                    }`}
                    onClick={() => toggleDifficultyFilter("Easy")}
                  >
                    Easy
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      difficultyFilter.includes("Medium")
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    }`}
                    onClick={() => toggleDifficultyFilter("Medium")}
                  >
                    Medium
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      difficultyFilter.includes("Hard")
                        ? "bg-red-500 text-white"
                        : "bg-gray-800 text-red-400 hover:bg-gray-700"
                    }`}
                    onClick={() => toggleDifficultyFilter("Hard")}
                  >
                    Hard
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-400">
                  Status
                </h3>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusFilter.includes("Solved")
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-800 text-indigo-400 hover:bg-gray-700"
                    }`}
                    onClick={() => toggleStatusFilter("Solved")}
                  >
                    Solved
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusFilter.includes("Unsolved")
                        ? "bg-purple-500 text-white"
                        : "bg-gray-800 text-purple-400 hover:bg-gray-700"
                    }`}
                    onClick={() => toggleStatusFilter("Unsolved")}
                  >
                    Unsolved
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-400">
                  Sort By
                </h3>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sortBy === "name"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-blue-400 hover:bg-gray-700"
                    }`}
                    onClick={() => setSortBy("name")}
                  >
                    Name
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sortBy === "difficulty"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-blue-400 hover:bg-gray-700"
                    }`}
                    onClick={() => setSortBy("difficulty")}
                  >
                    Difficulty
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sortBy === "popularity"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-blue-400 hover:bg-gray-700"
                    }`}
                    onClick={() => setSortBy("popularity")}
                  >
                    Popularity
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchAndFilters;
