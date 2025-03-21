import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Company } from "@/data/companies";
import { useAppStore } from "@/store/store";
import FilterSection from "./FilterSection";
import ProblemRow from "./ProblemRow";
import EmptyState from "./EmptyState";
import { ShimmerRow } from "./ShimmerRow";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/button";

interface Problem {
  ID: number;
  Title: string;
  Difficulty: "Easy" | "Medium" | "Hard";
  Frequency: string;
  solved: boolean;
  "Leetcode Question Link": string;
  favorite?: boolean;
  lastAttempted?: string;
}

interface CompanyProblemsProps {
  company: Company;
  problems: Problem[];
  loading: boolean;
}

const difficultyColors = {
  Easy: { bg: "bg-green-900", text: "text-green-300" },
  Medium: { bg: "bg-yellow-900", text: "text-yellow-300" },
  Hard: { bg: "bg-red-900", text: "text-red-300" },
};

const getFrequencyColor = (frequency: number) => {
  if (frequency >= 0.7) return { bg: "bg-purple-900", text: "text-purple-300" };
  if (frequency >= 0.4) return { bg: "bg-blue-900", text: "text-blue-300" };
  return { bg: "bg-gray-700", text: "text-gray-300" };
};

const CompanyProblems: React.FC<CompanyProblemsProps> = React.memo(
  ({ company, problems, loading }) => {
    const { difficultyFilter, searchQuery, setDifficultyFilter } = useAppStore();
    const [sortConfig, setSortConfig] = useState<{ key: keyof Problem | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });
    const [viewMode, setViewMode] = useState<"all" | "solved" | "unsolved" | "favorites">("all");
    const [itemsPerPage, setItemsPerPage] = useState(15); // Initial 15 items
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});
    const [lastAttempted, setLastAttempted] = useState<Record<number, string>>({});
    const [solvedStatus, setSolvedStatus] = useState<Record<number, boolean>>({});
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isInView = useIntersectionObserver(loadMoreRef, { threshold: 0.1 });

    // Reset itemsPerPage when company changes
    useEffect(() => {
      setItemsPerPage(15); // Reset to initial value when company changes
    }, [company]);

    // Define filteredProblems first
    const filteredProblems = useMemo(() => {
      const filtered = problems.filter((problem) => {
        if (difficultyFilter.length > 0 && !difficultyFilter.includes(problem.Difficulty)) return false;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return problem.Title.toLowerCase().includes(query) || problem.ID.toString().includes(query);
        }
        const isSolved = solvedStatus[problem.ID] || problem.solved;
        const isFavorite = favorites[problem.ID];
        if (viewMode === "solved" && !isSolved) return false;
        if (viewMode === "unsolved" && isSolved) return false;
        if (viewMode === "favorites" && !isFavorite) return false;
        return true;
      });

      if (sortConfig.key) {
        filtered.sort((a, b) => {
          const valueA = a[sortConfig.key as keyof Problem];
          const valueB = b[sortConfig.key as keyof Problem];
          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortConfig.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          }
          if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
          if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }
      return filtered;
    }, [problems, difficultyFilter, searchQuery, sortConfig, viewMode, favorites, solvedStatus]);

    // Paginated problems
    const paginatedProblems = useMemo(() => filteredProblems.slice(0, itemsPerPage), [filteredProblems, itemsPerPage]);

    // Load more items when in view with increased delay
    useEffect(() => {
      if (isInView && !loading && !isLoadingMore && filteredProblems.length > itemsPerPage) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setItemsPerPage((prev) => Math.min(prev + 10, filteredProblems.length));
          setIsLoadingMore(false);
        }, 1500); // Increased delay to 1.5 seconds
      }
    }, [isInView, loading, filteredProblems.length, itemsPerPage, isLoadingMore]);

    // Initialize local state from problems
    useEffect(() => {
      const newFavorites: Record<number, boolean> = {};
      const newLastAttempted: Record<number, string> = {};
      const newSolvedStatus: Record<number, boolean> = {};
      problems.forEach((problem) => {
        newFavorites[problem.ID] = problem.favorite || false;
        if (problem.lastAttempted) newLastAttempted[problem.ID] = problem.lastAttempted;
        newSolvedStatus[problem.ID] = problem.solved || false;
      });
      setFavorites(newFavorites);
      setLastAttempted(newLastAttempted);
      setSolvedStatus(newSolvedStatus);
    }, [problems]);

    const requestSort = (key: keyof Problem) => {
      let direction: "asc" | "desc" = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };

    // Manual load more
    const handleLoadMore = () => {
      setIsLoadingMore(true);
      setTimeout(() => {
        setItemsPerPage((prev) => Math.min(prev + 10, filteredProblems.length));
        setIsLoadingMore(false);
      }, 1500); // Match delay with scroll for consistency
    };

    return (
      <motion.div
        className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg flex flex-col h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-white p-2 mr-4 flex items-center justify-center shadow-md">
              <img src={company.logo} alt={company.name} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h3 className="text-xl font-medium">{company.name} Interview Questions</h3>
              <div className="flex items-center mt-1 text-sm text-gray-400 gap-2">
                <span>Frequently asked coding interview questions</span>
                {viewMode !== "all" && (
                  <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                    {viewMode === "solved" ? "Solved" : viewMode === "unsolved" ? "Unsolved" : "Favorites"}
                  </span>
                )}
              </div>
            </div>
          </div>
          <FilterSection viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        <div className="overflow-x-auto max-h-[calc(100vh-250px)] overflow-y-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16" onClick={() => requestSort("solved")}>
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" onClick={() => requestSort("'Title")}>
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28" onClick={() => requestSort("Difficulty")}>
                  Difficulty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28" onClick={() => requestSort("Frequency")}>
                  Frequency
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {loading ? (
                Array(5).fill(0).map((_, i) => <ShimmerRow key={i} />)
              ) : paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem, index) => (
                  <ProblemRow
                    key={problem.ID}
                    problem={problem}
                    index={index}
                    difficultyColors={difficultyColors}
                    getFrequencyColor={getFrequencyColor}
                    favorites={favorites}
                    lastAttempted={lastAttempted}
                    solvedStatus={solvedStatus}
                    setFavorites={setFavorites}
                    setLastAttempted={setLastAttempted}
                    setSolvedStatus={setSolvedStatus}
                  />
                ))
              ) : (
                <EmptyState onClearFilters={() => setDifficultyFilter([])} />
              )}
            </tbody>
          </table>
          {paginatedProblems.length < filteredProblems.length && (
            <div ref={loadMoreRef} className="py-4 text-center text-gray-500 text-sm">
              {isLoadingMore ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                  Loading more problems...
                </div>
              ) : (
                <div className="h-4" /> // Placeholder to maintain layout
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                Load More (Manual)
              </Button>
            </div>
          )}
        </div>
        {paginatedProblems.length > 0 && (
          <div className="p-4 text-sm text-gray-500 border-t border-gray-800 flex justify-between items-center bg-gray-900">
            <div>
              Showing {paginatedProblems.length} of {filteredProblems.length} problems
            </div>
            {filteredProblems.length > paginatedProblems.length && (
              <div className="text-indigo-400 text-xs">Scroll to load more</div>
            )}
          </div>
        )}
      </motion.div>
    );
  }
);

CompanyProblems.displayName = "CompanyProblems";
export default CompanyProblems;