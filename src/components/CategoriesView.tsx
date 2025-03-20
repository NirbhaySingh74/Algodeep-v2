// CategoriesView.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/store";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ExternalLink, Star, CheckCircle, Clock } from "lucide-react";
import { categories, problems, Problem, Category } from "@/data/problems";
import { useNavbar } from "@/lib/useNavbar";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const difficultyColors = {
  Easy: { bg: "bg-green-900", text: "text-green-300" },
  Medium: { bg: "bg-yellow-900", text: "text-yellow-300" },
  Hard: { bg: "bg-red-900", text: "text-red-300" },
};

interface ExtendedProblem extends Problem {
  solved: boolean;
  favorite: boolean;
  lastAttempted?: string;
  solved_at?: string | null;
}

const CategoriesView: React.FC = () => {
  const { viewMode, selectedCategory, setSelectedCategory, updateStat } = useAppStore();
  const { user, isLoading: sessionLoading } = useNavbar();
  const [problemsData, setProblemsData] = React.useState<ExtendedProblem[]>(problems.map((p) => ({
    ...p,
    solved: false,
    favorite: false,
    lastAttempted: undefined,
    solved_at: null,
  })));
  const [error, setError] = React.useState<string | null>(null);
  const [isInitialFetch, setIsInitialFetch] = React.useState(true);

  React.useEffect(() => {
    if (user?.id) {
      fetchUserProblems();
    } else {
      setProblemsData(problems.map((p) => ({
        ...p,
        solved: false,
        favorite: false,
        lastAttempted: undefined,
        solved_at: null,
      })));
      setIsInitialFetch(false);
    }
  }, [user]);

  const fetchUserProblems = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("user_problems")
        .select("problem_id, last_attempted, favorite, solved_at")
        .eq("user_id", user.id);

      if (error) throw new Error(`Fetch failed: ${error.message}`);

      const solvedProblemIds = new Set(data?.filter((up: any) => up.solved_at !== null).map((up: any) => up.problem_id));
      const favoriteProblemIds = new Set(data?.filter((up: any) => up.favorite).map((up: any) => up.problem_id));
      const lastAttemptedMap = new Map(data?.map((up: any) => [up.problem_id, up.last_attempted]));
      const solvedAtMap = new Map(data?.map((up: any) => [up.problem_id, up.solved_at]));

      setProblemsData(problems.map((problem) => ({
        ...problem,
        solved: solvedProblemIds.has(problem.id.toString()),
        favorite: favoriteProblemIds.has(problem.id.toString()),
        lastAttempted: lastAttemptedMap.get(problem.id.toString()),
        solved_at: solvedAtMap.get(problem.id.toString()),
      })));
    } catch (err: any) {
      console.error("Fetch error:", err.message);
      setError("Failed to fetch user problems");
    } finally {
      setIsInitialFetch(false);
    }
  };

  const updateProblemStatus = async (problemId: number, solved: boolean) => {
    setProblemsData((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, solved, solved_at: solved ? new Date().toISOString() : null } : p))
    );

    if (!user?.id) {
      setError("Changes are not saved. Please log in to save your progress.");
      return;
    }

    try {
      const problem = problemsData.find((p) => p.id === problemId);
      if (!problem) throw new Error(`Problem ${problemId} not found`);

      const difficultyField =
        problem.difficulty === "Easy" ? "easy_solved" : problem.difficulty === "Medium" ? "medium_solved" : "hard_solved";

      if (solved) {
        const { error: upsertError } = await supabase
          .from("user_problems")
          .upsert(
            {
              user_id: user.id,
              problem_id: problemId.toString(),
              favorite: problem.favorite || false,
              last_attempted: problem.lastAttempted || null,
              solved_at: new Date().toISOString(),
            },
            { onConflict: "user_id,problem_id" }
          );
        if (upsertError) throw new Error(`Upsert failed: ${upsertError.message}`);
      } else {
        const { data: existing, error: fetchError } = await supabase
          .from("user_problems")
          .select("favorite, last_attempted")
          .eq("user_id", user.id)
          .eq("problem_id", problemId.toString())
          .single();

        if (fetchError && fetchError.code !== "PGRST116") throw new Error(`Fetch existing failed: ${fetchError.message}`);

        if (existing && (existing.favorite || existing.last_attempted)) {
          const { error: updateError } = await supabase
            .from("user_problems")
            .update({
              favorite: existing.favorite,
              last_attempted: existing.last_attempted,
              solved_at: null,
            })
            .eq("user_id", user.id)
            .eq("problem_id", problemId.toString());
          if (updateError) throw new Error(`Update failed: ${updateError.message}`);
        } else {
          const { error: deleteError } = await supabase
            .from("user_problems")
            .delete()
            .eq("user_id", user.id)
            .eq("problem_id", problemId.toString());
          if (deleteError) throw new Error(`Delete failed: ${deleteError.message}`);
        }
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(difficultyField)
        .eq("id", user.id)
        .single();

      if (profileError) throw new Error(`Profile fetch failed: ${profileError.message}`);

      const currentCount = profileData?.[difficultyField] || 0;
      const newCount = solved ? currentCount + 1 : Math.max(currentCount - 1, 0);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ [difficultyField]: newCount })
        .eq("id", user.id);

      if (updateError) throw new Error(`Profile update failed: ${updateError.message}`);

      updateStat(problem.difficulty as "Easy" | "Medium" | "Hard", solved);
    } catch (err: any) {
      console.error("Update error:", err.message);
      setProblemsData((prev) =>
        prev.map((p) => (p.id === problemId ? { ...p, solved: !solved, solved_at: !solved ? null : p.solved_at } : p))
      );
      setError(err.message || "Failed to update problem status");
    }
  };

  const toggleFavorite = async (problemId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const problem = problemsData.find((p) => p.id === problemId);
    const newFavoriteStatus = !problem?.favorite;

    setProblemsData((prev) => prev.map((p) => (p.id === problemId ? { ...p, favorite: newFavoriteStatus } : p)));

    if (!user?.id) {
      setError("Changes are not saved. Please log in to save your progress.");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_problems")
        .upsert(
          {
            user_id: user.id,
            problem_id: problemId.toString(),
            favorite: newFavoriteStatus,
            last_attempted: problem?.lastAttempted || null,
            solved_at: problem?.solved ? problem.solved_at || new Date().toISOString() : null,
          },
          { onConflict: "user_id,problem_id" }
        );
      if (error) throw new Error(`Favorite upsert failed: ${error.message}`);
    } catch (err: any) {
      console.error("Favorite update error:", err.message);
      setProblemsData((prev) => prev.map((p) => (p.id === problemId ? { ...p, favorite: !newFavoriteStatus } : p)));
      setError(err.message || "Failed to update favorite status");
    }
  };

  const updateLastAttempted = async (problemId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newLastAttempted = new Date().toISOString();
    const problem = problemsData.find((p) => p.id === problemId);

    setProblemsData((prev) => prev.map((p) => (p.id === problemId ? { ...p, lastAttempted: newLastAttempted } : p)));

    if (!user?.id) {
      setError("Changes are not saved. Please log in to save your progress.");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_problems")
        .upsert(
          {
            user_id: user.id,
            problem_id: problemId.toString(),
            last_attempted: newLastAttempted,
            favorite: problem?.favorite || false,
            solved_at: problem?.solved ? problem.solved_at || new Date().toISOString() : null,
          },
          { onConflict: "user_id,problem_id" }
        );
      if (error) throw new Error(`Last attempted upsert failed: ${error.message}`);
    } catch (err: any) {
      console.error("Last attempted update error:", err.message);
      setProblemsData((prev) => prev.map((p) => (p.id === problemId ? { ...p, lastAttempted: undefined } : p)));
      setError(err.message || "Failed to update last attempted");
    }
  };

  const handleProblemClick = (problem: ExtendedProblem) => {
    window.open(problem.link, "_blank");
  };

  // Skeleton UI during initial fetch
  if (isInitialFetch && sessionLoading && !user) {
    return (
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-xl p-5 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gray-700 mr-4" />
                <div>
                  <div className="h-5 w-32 bg-gray-700 rounded" />
                  <div className="h-4 w-20 bg-gray-700 rounded mt-2" />
                </div>
              </div>
              <div className="h-5 w-16 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {viewMode === "categories" && (
        <motion.div className="space-y-4">
          {error && <div className="text-red-500 mb-4">{error}</div>}
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
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold">{category.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-400">
                      {problemsData.filter((p) => p.category === category.id).length} problems
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-3">
                    {problemsData.filter((p) => p.category === category.id && p.solved).length} /{" "}
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
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28">
                              Difficulty
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28">
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
                                className="hover:bg-gray-800 cursor-pointer group"
                                custom={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.02, duration: 0.2 } }}
                                onClick={() => handleProblemClick(problem)}
                                whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                              >
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <motion.div
                                          className="flex items-center justify-center"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateProblemStatus(problem.id, !problem.solved);
                                          }}
                                          whileHover={{ scale: 1.2 }}
                                        >
                                          {problem.solved ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                          ) : (
                                            <div className="h-5 w-5 rounded-full border-2 border-gray-600 group-hover:border-gray-400" />
                                          )}
                                        </motion.div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{problem.solved ? "Mark as unsolved" : "Mark as solved"}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium mr-2 text-gray-500">{problem.id}.</span>
                                    <div className="text-sm font-medium">
                                      {problem.title}
                                      {problem.favorite && <Star className="h-3 w-3 text-amber-400 inline ml-2" />}
                                    </div>
                                  </div>
                                  {problem.lastAttempted && (
                                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Last attempted: {new Date(problem.lastAttempted).toLocaleDateString()}
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span
                                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      difficultyColors[problem.difficulty].bg
                                    } ${difficultyColors[problem.difficulty].text}`}
                                  >
                                    {problem.difficulty}
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
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              window.open(problem.link, "_blank");
                                            }}
                                          >
                                            <ExternalLink className="h-4 w-4" />
                                          </motion.button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Open problem</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <motion.button
                                            className={`p-1 rounded-full ${
                                              problem.favorite
                                                ? "bg-amber-700 text-amber-300"
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                            }`}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => toggleFavorite(problem.id, e)}
                                          >
                                            <Star className="h-4 w-4" />
                                          </motion.button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{problem.favorite ? "Remove from favorites" : "Add to favorites"}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <motion.button
                                            className="p-1 rounded-full bg-blue-900 text-blue-300 hover:bg-blue-800"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => updateLastAttempted(problem.id, e)}
                                          >
                                            <Clock className="h-4 w-4" />
                                          </motion.button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Mark as attempted</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
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