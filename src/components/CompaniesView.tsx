// src/components/CompaniesView.tsx
"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/store";
import { companies } from "@/data/companies";
import {
  Briefcase,
  ExternalLink,
  Star,
  Clock,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle,
} from "lucide-react";
import { ShimmerRow } from "./ShimmerRow";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Problem type definition for better type safety
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

// Difficulty type and color mapping for consistency
const difficultyColors = {
  Easy: { bg: "bg-green-900", text: "text-green-300" },
  Medium: { bg: "bg-yellow-900", text: "text-yellow-300" },
  Hard: { bg: "bg-red-900", text: "text-red-300" },
};

// Frequency color mapping
const getFrequencyColor = (frequency: number) => {
  if (frequency >= 0.7) return { bg: "bg-purple-900", text: "text-purple-300" };
  if (frequency >= 0.4) return { bg: "bg-blue-900", text: "text-blue-300" };
  return { bg: "bg-gray-700", text: "text-gray-300" };
};

// Simple debounce implementation
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Simple intersection observer hook
function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0%" }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = elementRef?.current;
    if (!node || typeof IntersectionObserver !== "function") return;

    const observer = new IntersectionObserver(([entry]) => setEntry(entry), {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin]);

  return entry?.isIntersecting;
}

const CompaniesView: React.FC = () => {
  const {
    selectedCompany,
    setSelectedCompany,
    companyProblems,
    loading,
    difficultyFilter,
    searchQuery,
    setSearchQuery,
    setDifficultyFilter,
  } = useAppStore();

  const pathname = usePathname();
  const router = useRouter();

  // Local UI state
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Problem | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<
    "all" | "solved" | "unsolved" | "favorites"
  >("all");
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [lastAttempted, setLastAttempted] = useState<Record<number, string>>(
    {}
  );
  const [solvedStatus, setSolvedStatus] = useState<Record<number, boolean>>({});

  // Use our custom debounce hook
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Update app store search query when debounced value changes
  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  // Load more ref for infinite scrolling
  const loadMoreRef = React.useRef(null);
  const isInView = useIntersectionObserver(loadMoreRef, { threshold: 0.5 });

  useEffect(() => {
    if (isInView && filteredProblems.length > itemsPerPage) {
      setItemsPerPage((prev) => prev + 10);
    }
  }, [isInView]);

  // Initialize local state based on companyProblems
  useEffect(() => {
    const newFavorites: Record<number, boolean> = {};
    const newLastAttempted: Record<number, string> = {};
    const newSolvedStatus: Record<number, boolean> = {};

    companyProblems.forEach((problem) => {
      newFavorites[problem.ID] = problem.favorite || false;
      if (problem.lastAttempted)
        newLastAttempted[problem.ID] = problem.lastAttempted;
      newSolvedStatus[problem.ID] = problem.solved || false;
    });

    setFavorites(newFavorites);
    setLastAttempted(newLastAttempted);
    setSolvedStatus(newSolvedStatus);
  }, [companyProblems]);

  // Animations
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03, // Slightly faster animation
        duration: 0.3,
      },
    }),
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.2,
      },
    }),
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  // Sort function
  const requestSort = (key: keyof Problem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Local handlers for favorite, attempt, solved
  const toggleFavorite = (problemId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [problemId]: !prev[problemId],
    }));
  };

  const updateLastAttempted = (problemId: number, date: string) => {
    setLastAttempted((prev) => ({
      ...prev,
      [problemId]: date,
    }));
  };

  const toggleSolved = (problemId: number) => {
    setSolvedStatus((prev) => ({
      ...prev,
      [problemId]: !prev[problemId],
    }));
  };

  // Memoized filtered and sorted problems
  const filteredProblems = useMemo(() => {
    let filtered = companyProblems.filter((problem) => {
      // Filter by difficulty
      if (
        difficultyFilter.length > 0 &&
        !difficultyFilter.includes(problem.Difficulty)
      ) {
        return false;
      }

      // Filter by search query (title or ID)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatches = problem.Title.toLowerCase().includes(query);
        const idMatches = problem.ID.toString().includes(query);
        return titleMatches || idMatches;
      }

      // Filter by view mode
      const isSolved = solvedStatus[problem.ID] || problem.solved;
      const isFavorite = favorites[problem.ID];

      if (viewMode === "solved" && !isSolved) return false;
      if (viewMode === "unsolved" && isSolved) return false;
      if (viewMode === "favorites" && !isFavorite) return false;

      return true;
    });

    // Sort problems if sort configuration exists
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valueA = a[sortConfig.key as keyof Problem];
        const valueB = b[sortConfig.key as keyof Problem];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortConfig.direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    companyProblems,
    difficultyFilter,
    searchQuery,
    sortConfig,
    viewMode,
    favorites,
    solvedStatus,
  ]);

  // Paginated problems
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(0, itemsPerPage);
  }, [filteredProblems, itemsPerPage]);

  // Navigate to the dynamic route when a company is clicked
  const handleCompanyClick = useCallback(
    (companyId: string) => {
      if (pathname !== `/practice/companies/${companyId}`) {
        router.push(`/practice/companies/${companyId}`);
      }
      setSelectedCompany(companyId === selectedCompany ? null : companyId);
      // Reset filters and sorting when changing companies
      setSortConfig({ key: null, direction: "asc" });
      setViewMode("all");
      setCurrentPage(1);
      setItemsPerPage(15);
    },
    [pathname, router, selectedCompany, setSelectedCompany]
  );

  // Handle quick actions
  const handleToggleFavorite = (problemId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(problemId);
  };

  const handleAttempt = (problemId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    updateLastAttempted(problemId, new Date().toISOString());
  };

  const handleToggleSolved = (problemId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSolved(problemId);
  };

  const handleRowClick = (problem: Problem) => {
    window.open(problem["Leetcode Question Link"], "_blank");
  };

  // Custom tooltip component (simplified)
  const SimpleTooltip = ({
    content,
    children,
  }: {
    content: string;
    children: React.ReactNode;
  }) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Difficulty filter components
  const DifficultyFilter = () => (
    <motion.div
      className="flex flex-wrap gap-2 mb-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      {["Easy", "Medium", "Hard"].map((difficulty) => (
        <Button
          key={difficulty}
          size="sm"
          variant={
            difficultyFilter.includes(difficulty) ? "default" : "outline"
          }
          className={`${
            difficultyFilter.includes(difficulty)
              ? difficultyColors[difficulty as keyof typeof difficultyColors].bg
              : "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
          } text-xs font-medium`}
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
        className="text-xs font-medium bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
        onClick={() => setDifficultyFilter([])}
      >
        Clear
      </Button>
    </motion.div>
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="pb-10"
    >
      {/* Company grid with improved visibility for logos */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            className={`bg-gray-900 p-5 rounded-xl flex flex-col items-center cursor-pointer transition-all hover:shadow-lg border border-gray-800 ${
              selectedCompany === company.id
                ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-900/40"
                : "hover:border-gray-700"
            }`}
            onClick={() => handleCompanyClick(company.id)}
            whileHover={{
              y: -5,
              backgroundColor: "rgba(31, 41, 55, 0.8)",
            }}
            custom={index}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white p-3 mb-4 flex items-center justify-center shadow-md">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm md:text-base text-gray-200 text-center font-medium mt-1">
              {company.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Company Problems with enhanced features */}
      <AnimatePresence mode="wait">
        {selectedCompany && (
          <motion.div
            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-5 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-white p-2 mr-4 flex items-center justify-center shadow-md">
                    <img
                      src={
                        companies.find((c) => c.id === selectedCompany)?.logo
                      }
                      alt={
                        companies.find((c) => c.id === selectedCompany)?.name
                      }
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">
                      {companies.find((c) => c.id === selectedCompany)?.name}{" "}
                      Interview Questions
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-400 gap-2">
                      <span>Frequently asked coding interview questions</span>
                      {/* <Badge variant="outline" className="ml-2">
                        {filteredProblems.length} problems
                      </Badge> */}
                      {viewMode !== "all" && (
                        <Badge className="bg-indigo-600">
                          {viewMode === "solved"
                            ? "Solved"
                            : viewMode === "unsolved"
                            ? "Unsolved"
                            : "Favorites"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Filter and search section */}
                <div className="hidden md:flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 text-indigo-400" />
                    Filter
                  </Button>

                  <div className="flex flex-wrap gap-1">
                    <Button
                      size="sm"
                      variant={viewMode === "all" ? "default" : "outline"}
                      className={`text-xs font-medium ${
                        viewMode === "all"
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200"
                      }`}
                      onClick={() => setViewMode("all")}
                    >
                      All
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "solved" ? "default" : "outline"}
                      className={`text-xs font-medium ${
                        viewMode === "solved"
                          ? "bg-green-700 hover:bg-green-800 border-green-600"
                          : "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200"
                      }`}
                      onClick={() => setViewMode("solved")}
                    >
                      Solved
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "unsolved" ? "default" : "outline"}
                      className={`text-xs font-medium ${
                        viewMode === "unsolved"
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200"
                      }`}
                      onClick={() => setViewMode("unsolved")}
                    >
                      Unsolved
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "favorites" ? "default" : "outline"}
                      className={`text-xs font-medium ${
                        viewMode === "favorites"
                          ? "bg-amber-700 hover:bg-amber-800 border-amber-600"
                          : "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200"
                      }`}
                      onClick={() => setViewMode("favorites")}
                    >
                      Favorites
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-3">
                <div className="relative w-full">
                  <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
                  <Input
                    placeholder="Search by title or problem ID..."
                    className="pl-9 bg-gray-800 border-gray-700 text-sm"
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    defaultValue={searchQuery}
                  />
                </div>
                <div className="md:hidden flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>

                  <select
                    className="bg-gray-800 border border-gray-700 rounded-md text-sm px-3 py-1"
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
                {showFilters && <DifficultyFilter />}
              </AnimatePresence>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => requestSort("solved")}
                      >
                        Status
                        {sortConfig.key === "solved" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => requestSort("Title")}
                      >
                        Title
                        {sortConfig.key === "Title" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => requestSort("Difficulty")}
                      >
                        Difficulty
                        {sortConfig.key === "Difficulty" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => requestSort("Frequency")}
                      >
                        Frequency
                        {sortConfig.key === "Frequency" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {loading ? (
                    Array(5)
                      .fill(0)
                      .map((_, index) => <ShimmerRow key={index} />)
                  ) : paginatedProblems.length > 0 ? (
                    paginatedProblems.map((problem, index) => (
                      <motion.tr
                        key={problem.ID}
                        className="hover:bg-gray-800 cursor-pointer group"
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={listItemVariants}
                        onClick={() => handleRowClick(problem)}
                        whileHover={{
                          backgroundColor: "rgba(31, 41, 55, 0.8)",
                        }}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <SimpleTooltip
                            content={
                              solvedStatus[problem.ID]
                                ? "Mark as unsolved"
                                : "Mark as solved"
                            }
                          >
                            <motion.div
                              className="flex items-center justify-center"
                              onClick={(e) => handleToggleSolved(problem.ID, e)}
                              whileHover={{ scale: 1.2 }}
                            >
                              {solvedStatus[problem.ID] ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-gray-600 group-hover:border-gray-400" />
                              )}
                            </motion.div>
                          </SimpleTooltip>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2 text-gray-500">
                              {problem.ID}.
                            </span>
                            <div className="text-sm font-medium">
                              {problem.Title}
                              {favorites[problem.ID] && (
                                <Star className="h-3 w-3 text-amber-400 inline ml-2" />
                              )}
                            </div>
                          </div>
                          {lastAttempted[problem.ID] && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Last attempted:{" "}
                              {new Date(
                                lastAttempted[problem.ID]
                              ).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${difficultyColors[problem.Difficulty].bg} ${
                              difficultyColors[problem.Difficulty].text
                            }`}
                          >
                            {problem.Difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                getFrequencyColor(parseFloat(problem.Frequency))
                                  .bg
                              } 
                              ${
                                getFrequencyColor(parseFloat(problem.Frequency))
                                  .text
                              }`}
                          >
                            {parseFloat(problem.Frequency).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <SimpleTooltip content="Open on LeetCode">
                              <a
                                href={problem["Leetcode Question Link"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <motion.button
                                  className="p-1 rounded-full bg-indigo-900 text-indigo-300 hover:bg-indigo-800"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </motion.button>
                              </a>
                            </SimpleTooltip>
                            <SimpleTooltip
                              content={
                                favorites[problem.ID]
                                  ? "Remove from favorites"
                                  : "Add to favorites"
                              }
                            >
                              <motion.button
                                className={`p-1 rounded-full ${
                                  favorites[problem.ID]
                                    ? "bg-amber-700 text-amber-300"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) =>
                                  handleToggleFavorite(problem.ID, e)
                                }
                              >
                                <Star className="h-4 w-4" />
                              </motion.button>
                            </SimpleTooltip>
                            <SimpleTooltip content="Mark as attempted">
                              <motion.button
                                className="p-1 rounded-full bg-blue-900 text-blue-300 hover:bg-blue-800"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => handleAttempt(problem.ID, e)}
                              >
                                <Clock className="h-4 w-4" />
                              </motion.button>
                            </SimpleTooltip>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
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
                            No problems match your current filters. Try
                            adjusting your search or filter settings.
                          </p>
                          <Button
                            className="mt-4"
                            variant="outline"
                            onClick={() => {
                              setLocalSearchQuery("");
                              setDifficultyFilter([]);
                              setViewMode("all");
                            }}
                          >
                            Clear All Filters
                          </Button>
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </tbody>
              </table>

              {/* Infinite scroll trigger */}
              {paginatedProblems.length > 0 &&
                paginatedProblems.length < filteredProblems.length && (
                  <div
                    ref={loadMoreRef}
                    className="py-4 text-center text-gray-500 text-sm"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                      Loading more problems...
                    </div>
                  </div>
                )}

              {/* Pagination info */}
              {paginatedProblems.length > 0 && (
                <div className="p-4 text-sm text-gray-500 border-t border-gray-800 flex justify-between items-center">
                  <div>
                    Showing {paginatedProblems.length} of{" "}
                    {filteredProblems.length} problems
                  </div>
                  {filteredProblems.length > paginatedProblems.length && (
                    <div className="text-indigo-400 text-xs">
                      Scroll to load more
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial state when no company is selected */}
      {!selectedCompany && (
        <motion.div
          className="bg-gray-900 p-8 md:p-10 rounded-xl text-center border border-gray-800 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-full bg-indigo-500/30 blur-xl"></div>
            <Briefcase className="h-20 w-20 mx-auto mb-6 text-indigo-400 relative z-10" />
          </motion.div>
          <h3 className="text-2xl font-medium mb-3 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Prepare for Your Dream Company
          </h3>
          <p className="text-gray-300 max-w-md mx-auto font-medium">
            Choose a company above to see frequently asked interview questions
            tailored to your target company. Track your progress and ace your
            next technical interview.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Badge
              variant="outline"
              className="py-1 px-3 border-indigo-400 bg-indigo-900/30"
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              <span className="text-white font-medium">
                Track your progress
              </span>
            </Badge>
            <Badge
              variant="outline"
              className="py-1 px-3 border-amber-400 bg-amber-900/30"
            >
              <Star className="h-4 w-4 mr-2 text-amber-400" />
              <span className="text-white font-medium">Save favorites</span>
            </Badge>
            <Badge
              variant="outline"
              className="py-1 px-3 border-blue-400 bg-blue-900/30"
            >
              <Filter className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-white font-medium">
                Filter by difficulty
              </span>
            </Badge>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompaniesView;
