"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/store";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ExternalLink, Star, Check } from "lucide-react";
import { categories, problems, Problem, Category } from "@/data/problems";
import { useNavbar } from "@/lib/useNavbar";

const CategoriesView: React.FC = () => {
  const { viewMode, selectedCategory, setSelectedCategory, updateStat } = useAppStore();
  const { user, isLoading: sessionLoading } = useNavbar();
  const [problemsData, setProblemsData] = React.useState<Problem[]>(problems);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user?.id) {
      fetchUserProblems();
    } else {
      setProblemsData(problems.map((p) => ({ ...p, solved: false })));
    }
  }, [user]);

  const fetchUserProblems = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("user_problems")
        .select("problem_id")
        .eq("user_id", user.id);

      if (error) throw error;

      const solvedProblemIds = new Set(data?.map((up: any) => up.problem_id));
      setProblemsData(
        problems.map((problem) => ({
          ...problem,
          solved: solvedProblemIds.has(problem.id.toString()),
        }))
      );
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch user problems");
      setProblemsData(problems.map((p) => ({ ...p, solved: false })));
    }
  };

  const updateProblemStatus = async (problemId: number, solved: boolean) => {
    if (!user?.id) {
      setError("Please log in to mark problems as solved");
      return;
    }

    // Optimistically update the UI first
    setProblemsData((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, solved } : p))
    );

    try {
      const problem = problemsData.find((p) => p.id === problemId);
      if (!problem) throw new Error(`Problem ${problemId} not found`);

      const difficultyField =
        problem.difficulty === "Easy"
          ? "easy_solved"
          : problem.difficulty === "Medium"
          ? "medium_solved"
          : "hard_solved";

      if (solved) {
        const { error: insertError } = await supabase
          .from("user_problems")
          .insert({
            user_id: user.id,
            problem_id: problemId.toString(),
          });
        if (insertError) throw insertError;
      } else {
        const { error: deleteError } = await supabase
          .from("user_problems")
          .delete()
          .match({
            user_id: user.id,
            problem_id: problemId.toString(),
          });
        if (deleteError) throw deleteError;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(difficultyField)
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      const currentCount = profileData?.[difficultyField] || 0;
      const newCount = solved ? currentCount + 1 : Math.max(currentCount - 1, 0);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ [difficultyField]: newCount })
        .eq("id", user.id);

      if (updateError) throw updateError;

      updateStat(problem.difficulty as "Easy" | "Medium" | "Hard", solved);
    } catch (err) {
      console.error("Update error:", err);
      // Revert optimistic update on error
      setProblemsData((prev) =>
        prev.map((p) => (p.id === problemId ? { ...p, solved: !solved } : p))
      );
      setError(err instanceof Error ? err.message : "Failed to update problem status");
    }
  };

  if (sessionLoading) {
    return <div className="text-white">Loading session...</div>;
  }

  if (!user) {
    return <div className="text-white">Please log in to view your progress</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      {viewMode === "categories" && (
        <motion.div className="space-y-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="p-5 flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-400">
                      {problemsData.filter((p) => p.category === category.id).length}{" "}
                      problems
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-3">
                    {problemsData.filter((p) => p.category === category.id && p.solved).length}{" "}
                    /{" "}
                    {problemsData.filter((p) => p.category === category.id).length}
                  </span>
                  <ChevronDown
                    className={`ml-3 h-5 w-5 text-gray-400 transition-transform ${
                      selectedCategory === category.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </motion.div>

              <AnimatePresence>
                {selectedCategory === category.id && (
                  <motion.div
                    className="border-t border-gray-800"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Difficulty
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {problemsData
                          .filter((problem) => problem.category === category.id)
                          .map((problem, index) => (
                            <motion.tr
                              key={problem.id}
                              className="hover:bg-gray-800 cursor-pointer"
                              custom={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                  delay: index * 0.05,
                                  duration: 0.3,
                                },
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    updateProblemStatus(problem.id, !problem.solved);
                                  }}
                                  className="relative"
                                >
                                  <motion.div
                                    className={`h-6 w-6 rounded-md flex items-center justify-center cursor-pointer border-2 ${
                                      problem.solved
                                        ? "bg-gradient-to-r from-indigo-500-to-purple-600 border-transparent shadow-lg shadow-purple-900/50"
                                        : "bg-transparent border-gray-600 hover:border-gray-400"
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    {problem.solved && (
                                      <Check className="h-4 w-4 text-white" />
                                    )}
                                  </motion.div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                  className={`text-sm font-medium ${
                                    problem.solved ? "text-indigo-400" : ""
                                  }`}
                                >
                                  <a
                                    href={problem.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {problem.title}
                                  </a>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    problem.difficulty === "Easy"
                                      ? "bg-green-900 text-green-300"
                                      : problem.difficulty === "Medium"
                                      ? "bg-yellow-900 text-yellow-300"
                                      : "bg-red-900 text-red-300"
                                  }`}
                                >
                                  {problem.difficulty}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  <a
                                    href={problem.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <motion.button
                                      className="p-1 rounded-full bg-indigo-900 text-indigo-300 hover:bg-indigo-800"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </motion.button>
                                  </a>
                                  <motion.button
                                    className="p-1 rounded-full bg-purple-900 text-purple-300 hover:bg-purple-800"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Star className="h-4 w-4" />
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CategoriesView;