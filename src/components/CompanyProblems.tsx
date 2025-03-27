import React, { useState, useEffect, useMemo, RefObject } from "react";
import { motion } from "framer-motion";
import { Company } from "@/data/companies";
import { useAppStore } from "@/store/store";
import FilterSection from "./FilterSection";
import ProblemRow from "./ProblemRow";
import EmptyState from "./EmptyState";
import { ShimmerRow } from "./ShimmerRow";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useNavbar } from "@/lib/useNavbar";
import { toast } from "react-hot-toast";

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

interface ColorConfig {
  bg: string;
  text: string;
}

const difficultyColors: Record<"Easy" | "Medium" | "Hard", ColorConfig> = {
  Easy: { bg: "bg-green-900", text: "text-green-300" },
  Medium: { bg: "bg-yellow-900", text: "text-yellow-300" },
  Hard: { bg: "bg-red-900", text: "text-red-300" },
};

const getFrequencyColor = (frequency: number): ColorConfig => {
  if (frequency >= 0.7) return { bg: "bg-purple-900", text: "text-purple-300" };
  if (frequency >= 0.4) return { bg: "bg-blue-900", text: "text-blue-300" };
  return { bg: "bg-gray-700", text: "text-gray-300" };
};

// Extend the Problem interface to include additional fields
interface ExtendedProblem extends Problem {
  solved: boolean;
  favorite: boolean;
  lastAttempted?: string;
  solved_at: string | null;
}

const CompanyProblems: React.FC<CompanyProblemsProps> = React.memo(
  ({ company, problems, loading }) => {
    const { difficultyFilter, searchQuery, setDifficultyFilter, setSearchQuery, updateStat } = useAppStore();
    const { user } = useNavbar();
    const [sortConfig, setSortConfig] = useState<{
      key: keyof Problem | null;
      direction: "asc" | "desc";
    }>({ key: null, direction: "asc" });
    const [viewMode, setViewMode] = useState<"all" | "solved" | "unsolved" | "favorites">("all");
    const [itemsPerPage, setItemsPerPage] = useState<number>(15);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Step 1: Initialize problemsData with extended fields
    const [problemsData, setProblemsData] = useState<ExtendedProblem[]>(
      problems.map((p) => ({
        ...p,
        solved: p.solved ?? false,
        favorite: p.favorite ?? false,
        lastAttempted: p.lastAttempted,
        solved_at: null,
      }))
    );

    const loadMoreRef: RefObject<HTMLDivElement | null> = React.useRef(null);
    const isInView = useIntersectionObserver(loadMoreRef as RefObject<Element>, { threshold: 0.1 });

    // Step 2: Fetch user problem metadata from the company_user_problems table
    useEffect(() => {
      const fetchUserProblems = async () => {
        if (!user?.id) {
          // If no user, reset to default values
          setProblemsData(
            problems.map((p) => ({
              ...p,
              solved: false,
              favorite: false,
              lastAttempted: undefined,
              solved_at: null,
            }))
          );
          return;
        }

        try {
          const { data, error } = await supabase
            .from("company_user_problems")
            .select("problem_id, last_attempted, favorite, solved_at")
            .eq("user_id", user.id);

          if (error) throw new Error(`Fetch failed: ${error.message}`);

          const userProblems = data as { problem_id: string; last_attempted: string | null; favorite: boolean; solved_at: string | null }[];
          const solvedProblemIds = new Set(userProblems.filter((up) => up.solved_at !== null).map((up) => up.problem_id));
          const favoriteProblemIds = new Set(userProblems.filter((up) => up.favorite).map((up) => up.problem_id));
          const lastAttemptedMap = new Map(userProblems.map((up) => [up.problem_id, up.last_attempted]));
          const solvedAtMap = new Map(userProblems.map((up) => [up.problem_id, up.solved_at]));

          setProblemsData(
            problems.map((problem) => ({
              ...problem,
              solved: solvedProblemIds.has(problem.ID.toString()),
              favorite: favoriteProblemIds.has(problem.ID.toString()),
              lastAttempted: lastAttemptedMap.get(problem.ID.toString()) || undefined,
              solved_at: solvedAtMap.get(problem.ID.toString()) || null,
            }))
          );
        } catch (err) {
          console.error("Fetch error:", err instanceof Error ? err.message : String(err));
          setError("Failed to fetch user problems");
        }
      };

      fetchUserProblems();
    }, [problems, user]);

    // Step 3: Update solved status in the database
    const updateProblemStatus = async (problemId: number, solved: boolean) => {
      const problem = problemsData.find((p) => p.ID === problemId);
      if (!problem) return;

      // Optimistically update the local state
      setProblemsData((prev) =>
        prev.map((p) =>
          p.ID === problemId
            ? { ...p, solved, solved_at: solved ? new Date().toISOString() : null }
            : p
        )
      );

      if (!user?.id) {
        setError("Changes are not saved. Please log in to save your progress.");
        return;
      }

      try {
        toast.loading("Saving solved status...", { id: `solved-${problemId}` });

        // Update the company_user_problems table
        const { error: upsertError } = await supabase
          .from("company_user_problems")
          .upsert(
            {
              user_id: user.id,
              problem_id: problemId.toString(),
              favorite: problem.favorite || false,
              last_attempted: problem.lastAttempted || null,
              solved_at: solved ? new Date().toISOString() : null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id,problem_id" } // Fixed: Use a single string for onConflict
          );
        if (upsertError) throw new Error(`Upsert failed: ${upsertError.message}`);

        // Update the store (ProgressStats will re-fetch stats from the database)
        updateStat(problem.Difficulty as "Easy" | "Medium" | "Hard", solved);

        toast.success("Solved status saved!", { id: `solved-${problemId}` });
      } catch (err) {
        console.error("Update error:", err instanceof Error ? err.message : String(err));
        // Revert the local state on error
        setProblemsData((prev) =>
          prev.map((p) =>
            p.ID === problemId
              ? { ...p, solved: !solved, solved_at: !solved ? null : p.solved_at }
              : p
          )
        );
        setError(err instanceof Error ? err.message : "Failed to update problem status");
        toast.error("Failed to save solved status.", { id: `solved-${problemId}` });
      }
    };

    // Step 4: Update favorite status in the database
    const toggleFavorite = async (problemId: number) => {
      const problem = problemsData.find((p) => p.ID === problemId);
      const newFavoriteStatus = !problem?.favorite;

      // Optimistically update the local state
      setProblemsData((prev) =>
        prev.map((p) =>
          p.ID === problemId ? { ...p, favorite: newFavoriteStatus } : p
        )
      );

      if (!user?.id) {
        setError("Changes are not saved. Please log in to save your progress.");
        return;
      }

      try {
        toast.loading("Saving favorite status...", { id: `favorite-${problemId}` });

        const { error } = await supabase
          .from("company_user_problems")
          .upsert(
            {
              user_id: user.id,
              problem_id: problemId.toString(),
              favorite: newFavoriteStatus,
              last_attempted: problem?.lastAttempted || null,
              solved_at: problem?.solved ? problem.solved_at || new Date().toISOString() : null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id,problem_id" } // Fixed: Use a single string for onConflict
          );
        if (error) throw new Error(`Favorite upsert failed: ${error.message}`);

        toast.success(newFavoriteStatus ? "Added to favorites!" : "Removed from favorites!", {
          id: `favorite-${problemId}`,
        });
      } catch (err) {
        console.error("Favorite update error:", err instanceof Error ? err.message : String(err));
        // Revert the local state on error
        setProblemsData((prev) =>
          prev.map((p) =>
            p.ID === problemId ? { ...p, favorite: !newFavoriteStatus } : p
          )
        );
        setError(err instanceof Error ? err.message : "Failed to update favorite status");
        toast.error("Failed to save favorite status.", { id: `favorite-${problemId}` });
      }
    };

    // Step 5: Update last attempted timestamp in the database
    const updateLastAttempted = async (problemId: number) => {
      const newLastAttempted = new Date().toISOString();
      const problem = problemsData.find((p) => p.ID === problemId);

      // Optimistically update the local state
      setProblemsData((prev) =>
        prev.map((p) =>
          p.ID === problemId ? { ...p, lastAttempted: newLastAttempted } : p
        )
      );

      if (!user?.id) {
        setError("Changes are not saved. Please log in to save your progress.");
        return;
      }

      try {
        toast.loading("Saving attempt history...", { id: `history-${problemId}` });

        const { error } = await supabase
          .from("company_user_problems")
          .upsert(
            {
              user_id: user.id,
              problem_id: problemId.toString(),
              last_attempted: newLastAttempted,
              favorite: problem?.favorite || false,
              solved_at: problem?.solved ? problem.solved_at || new Date().toISOString() : null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id,problem_id" } // Fixed: Use a single string for onConflict
          );
        if (error) throw new Error(`Last attempted upsert failed: ${error.message}`);

        toast.success("Attempt history saved!", { id: `history-${problemId}` });
      } catch (err) {
        console.error("Last attempted update error:", err instanceof Error ? err.message : String(err));
        // Revert the local state on error
        setProblemsData((prev) =>
          prev.map((p) =>
            p.ID === problemId ? { ...p, lastAttempted: undefined } : p
          )
        );
        setError(err instanceof Error ? err.message : "Failed to update last attempted");
        toast.error("Failed to save attempt history.", { id: `history-${problemId}` });
      }
    };

    // Step 6: Update the filtering logic to use problemsData
    const filteredProblems = useMemo(() => {
      const filtered = problemsData.filter((problem) => {
        if (difficultyFilter.length > 0 && !difficultyFilter.includes(problem.Difficulty)) return false;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            problem.Title.toLowerCase().includes(query) ||
            problem.ID.toString().includes(query)
          );
        }
        const isSolved = problem.solved;
        const isFavorite = problem.favorite;
        if (viewMode === "solved" && !isSolved) return false;
        if (viewMode === "unsolved" && isSolved) return false;
        if (viewMode === "favorites" && !isFavorite) return false;
        return true;
      });

      if (sortConfig.key) {
        filtered.sort((a, b) => {
          const valueA = a[sortConfig.key as keyof Problem];
          const valueB = b[sortConfig.key as keyof Problem];

          if (valueA === undefined || valueB === undefined) return 0;

          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortConfig.direction === "asc"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
          if (typeof valueA === "number" && typeof valueB === "number") {
            return sortConfig.direction === "asc"
              ? valueA - valueB
              : valueB - valueA;
          }
          if (typeof valueA === "boolean" && typeof valueB === "boolean") {
            return sortConfig.direction === "asc"
              ? Number(valueA) - Number(valueB)
              : Number(valueB) - Number(valueA);
          }
          return 0;
        });
      }
      return filtered;
    }, [problemsData, difficultyFilter, searchQuery, sortConfig, viewMode]);

    const paginatedProblems = useMemo(() =>
      filteredProblems.slice(0, itemsPerPage),
      [filteredProblems, itemsPerPage]
    );

    useEffect(() => {
      if (isInView && !loading && !isLoadingMore && filteredProblems.length > itemsPerPage) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setItemsPerPage((prev) => Math.min(prev + 10, filteredProblems.length));
          setIsLoadingMore(false);
        }, 1500);
      }
    }, [isInView, loading, filteredProblems.length, itemsPerPage, isLoadingMore]);

    useEffect(() => {
      setItemsPerPage(15);
    }, [company]);

    const requestSort = (key: keyof Problem) => {
      let direction: "asc" | "desc" = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };

    const handleLoadMore = () => {
      setIsLoadingMore(true);
      setTimeout(() => {
        setItemsPerPage((prev) => Math.min(prev + 10, filteredProblems.length));
        setIsLoadingMore(false);
      }, 1500);
    };

    const clearAllFilters = () => {
      setDifficultyFilter([]);
      setSearchQuery("");
      setViewMode("all");
    };

    return (
      <motion.div
        className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg flex flex-col h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        {error && (
          <div className="p-4 bg-red-900 text-red-300 text-center">
            {error}
          </div>
        )}
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-white p-2 mr-4 flex items-center justify-center shadow-md">
              <img
                src={company.logo}
                alt={company.name}
                width={40}
                height={40}
                className="object-contain"
              />
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
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16 cursor-pointer"
                  onClick={() => requestSort("solved")}
                >
                  Status
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("Title")}
                >
                  Title
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28 cursor-pointer"
                  onClick={() => requestSort("Difficulty")}
                >
                  Difficulty
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28 cursor-pointer"
                  onClick={() => requestSort("Frequency")}
                >
                  Frequency
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {loading ? (
                Array(20).fill(0).map((_, i) => <ShimmerRow key={i} />)
              ) : paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem, index) => (
                  <ProblemRow
                    key={problem.ID}
                    problem={problem}
                    index={index}
                    difficultyColors={difficultyColors}
                    getFrequencyColor={getFrequencyColor}
                    updateProblemStatus={updateProblemStatus}
                    toggleFavorite={toggleFavorite}
                    updateLastAttempted={updateLastAttempted}
                  />
                ))
              ) : (
                <EmptyState onClearFilters={clearAllFilters} />
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
                <div className="h-4" />
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                Load More (Problems)
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