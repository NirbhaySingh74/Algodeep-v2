import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface AppState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedCompany: string | null;
  setSelectedCompany: (company: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "categories" | "companies";
  setViewMode: (mode: "categories" | "companies") => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  difficultyFilter: string[];
  setDifficultyFilter: (filter: string[]) => void;
  statusFilter: string[];
  setStatusFilter: (filter: string[]) => void;
  sortBy: "name" | "difficulty" | "popularity";
  setSortBy: (sort: "name" | "difficulty" | "popularity") => void;
  companyProblems: any[];
  setCompanyProblems: (problems: any[]) => void;
  stats: {
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
  };
  setStats: (stats: { easySolved: number; mediumSolved: number; hardSolved: number }) => void;
  updateStat: (difficulty: "Easy" | "Medium" | "Hard", increment: boolean) => void;
  fetchStats: (userId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  selectedCompany: null,
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  viewMode: "categories",
  setViewMode: (mode) => set({ viewMode: mode }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  showFilters: false,
  setShowFilters: (show) => set({ showFilters: show }),
  difficultyFilter: [],
  setDifficultyFilter: (filter) => set({ difficultyFilter: filter }),
  statusFilter: [],
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  sortBy: "name",
  setSortBy: (sort) => set({ sortBy: sort }),
  companyProblems: [],
  setCompanyProblems: (problems) => set({ companyProblems: problems }),
  stats: {
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  },
  setStats: (stats) => set({ stats }),
  updateStat: (difficulty, increment) =>
    set((state) => {
      const key = difficulty === "Easy" ? "easySolved" : difficulty === "Medium" ? "mediumSolved" : "hardSolved";
      return {
        stats: {
          ...state.stats,
          [key]: increment ? state.stats[key] + 1 : Math.max(state.stats[key] - 1, 0),
        },
      };
    }),
  fetchStats: async (userId: string) => {
    try {
      // Query user_problems to get all solved problems for the user
      const { data, error } = await supabase
        .from("user_problems")
        .select("problem_id, solved_at")
        .eq("user_id", userId)
        .not("solved_at", "is", null); // Only fetch solved problems

      if (error) throw error;

      if (!data || data.length === 0) {
        // If no solved problems, set stats to 0
        set({
          stats: {
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
          },
        });
        return;
      }

      // Get the problem IDs of solved problems
      const solvedProblemIds = data.map((item) => item.problem_id);

      // Query the problems table to get the difficulty of each solved problem
      const { data: problemsData, error: problemsError } = await supabase
        .from("problems")
        .select("id, difficulty")
        .in("id", solvedProblemIds);

      if (problemsError) throw problemsError;

      // Count the number of solved problems per difficulty
      const stats = problemsData.reduce(
        (acc, problem) => {
          if (problem.difficulty === "Easy") acc.easySolved += 1;
          else if (problem.difficulty === "Medium") acc.mediumSolved += 1;
          else if (problem.difficulty === "Hard") acc.hardSolved += 1;
          return acc;
        },
        { easySolved: 0, mediumSolved: 0, hardSolved: 0 }
      );

      set({ stats });
    } catch (err) {
      console.error("Error fetching stats:", err);
      set({
        stats: {
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
        },
      });
    }
  },
}));