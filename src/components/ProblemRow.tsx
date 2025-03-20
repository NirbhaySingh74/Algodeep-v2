import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ExternalLink, Star, Clock } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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

interface ProblemRowProps {
  problem: Problem;
  index: number;
  difficultyColors: any;
  getFrequencyColor: (frequency: number) => { bg: string; text: string };
  favorites: Record<number, boolean>;
  lastAttempted: Record<number, string>;
  solvedStatus: Record<number, boolean>;
  setFavorites: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  setLastAttempted: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  setSolvedStatus: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.02, duration: 0.2 },
  }),
};

const ProblemRow: React.FC<ProblemRowProps> = React.memo(
  ({
    problem,
    index,
    difficultyColors,
    getFrequencyColor,
    favorites,
    lastAttempted,
    solvedStatus,
    setFavorites,
    setLastAttempted,
    setSolvedStatus,
  }) => {
    const toggleFavorite = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFavorites((prev) => ({ ...prev, [problem.ID]: !prev[problem.ID] }));
    };

    const toggleSolved = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSolvedStatus((prev) => ({ ...prev, [problem.ID]: !prev[problem.ID] }));
    };

    const markAttempted = (e: React.MouseEvent) => {
      e.stopPropagation();
      setLastAttempted((prev) => ({ ...prev, [problem.ID]: new Date().toISOString() }));
    };

    return (
      <motion.tr
        className="hover:bg-gray-800 cursor-pointer group"
        custom={index}
        initial="hidden"
        animate="visible"
        variants={listItemVariants}
        onClick={() => window.open(problem["Leetcode Question Link"], "_blank")}
        whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.8)" }}
      >
        <td className="px-4 py-3 whitespace-nowrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  className="flex items-center justify-center"
                  onClick={toggleSolved}
                  whileHover={{ scale: 1.2 }}
                >
                  {solvedStatus[problem.ID] ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-600 group-hover:border-gray-400" />
                  )}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                {solvedStatus[problem.ID] ? "Mark as unsolved" : "Mark as solved"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2 text-gray-500">{problem.ID}.</span>
            <div className="text-sm font-medium">
              {problem.Title}
              {favorites[problem.ID] && <Star className="h-3 w-3 text-amber-400 inline ml-2" />}
            </div>
          </div>
          {lastAttempted[problem.ID] && (
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last attempted: {new Date(lastAttempted[problem.ID]).toLocaleDateString()}
            </div>
          )}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${difficultyColors[problem.Difficulty].bg} ${difficultyColors[problem.Difficulty].text}`}
          >
            {problem.Difficulty}
          </span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getFrequencyColor(parseFloat(problem.Frequency)).bg} ${getFrequencyColor(parseFloat(problem.Frequency)).text}`}
          >
            {parseFloat(problem.Frequency).toFixed(2)}
          </span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    className="p-1 rounded-full bg-indigo-900 text-indigo-300 hover:bg-indigo-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={problem["Leetcode Question Link"]} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>Open on LeetCode</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    className={`p-1 rounded-full ${favorites[problem.ID] ? "bg-amber-700 text-amber-300" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFavorite}
                  >
                    <Star className="h-4 w-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>{favorites[problem.ID] ? "Remove from favorites" : "Add to favorites"}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    className="p-1 rounded-full bg-blue-900 text-blue-300 hover:bg-blue-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={markAttempted}
                  >
                    <Clock className="h-4 w-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>Mark as attempted</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </td>
      </motion.tr>
    );
  }
);

ProblemRow.displayName = "ProblemRow";
export default ProblemRow;