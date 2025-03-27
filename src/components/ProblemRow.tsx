import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Clock } from "lucide-react";

interface ExtendedProblem {
  ID: number;
  Title: string;
  Difficulty: "Easy" | "Medium" | "Hard";
  Frequency: string;
  solved: boolean;
  "Leetcode Question Link": string;
  favorite: boolean;
  lastAttempted?: string;
  solved_at: string | null;
}

interface ColorConfig {
  bg: string;
  text: string;
}

interface ProblemRowProps {
  problem: ExtendedProblem;
  index: number;
  difficultyColors: Record<"Easy" | "Medium" | "Hard", ColorConfig>;
  getFrequencyColor: (frequency: number) => ColorConfig;
  updateProblemStatus: (problemId: number, solved: boolean) => void;
  toggleFavorite: (problemId: number) => void;
  updateLastAttempted: (problemId: number) => void;
}

const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  index,
  difficultyColors,
  getFrequencyColor,
  updateProblemStatus,
  toggleFavorite,
  updateLastAttempted,
}) => {
  const frequency = parseFloat(problem.Frequency);
  const frequencyColor = getFrequencyColor(frequency);
  const isSolved = problem.solved;
  const isFavorite = problem.favorite;

  const handleMarkAsSolved = () => {
    updateProblemStatus(problem.ID, !isSolved);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(problem.ID);
  };

  const handleAttempted = () => {
    updateLastAttempted(problem.ID);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="hover:bg-gray-800"
    >
      <td className="px-4 py-3">
        <button onClick={handleMarkAsSolved}>
          <CheckCircle
            className={`h-5 w-5 ${isSolved ? "text-green-500" : "text-gray-500"}`}
          />
        </button>
      </td>
      <td className="px-4 py-3 text-gray-200">
        <a
          href={problem["Leetcode Question Link"]}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400"
        >
          {problem.Title}
        </a>
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs ${difficultyColors[problem.Difficulty].bg} ${difficultyColors[problem.Difficulty].text}`}
        >
          {problem.Difficulty}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs ${frequencyColor.bg} ${frequencyColor.text}`}
        >
          {(frequency * 100).toFixed(0)}%
        </span>
      </td>
      <td className="px-4 py-3 flex gap-2">
        <button onClick={handleToggleFavorite}>
          <Star
            className={`h-5 w-5 ${isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
          />
        </button>
        <button onClick={handleAttempted}>
          <Clock className="h-5 w-5 text-gray-500" />
        </button>
      </td>
    </motion.tr>
  );
};

export default ProblemRow;