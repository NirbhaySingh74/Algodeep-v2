// store/store.ts
import { create } from "zustand";

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
}));