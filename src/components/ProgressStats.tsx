"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { problems } from "@/data/problems";
import { useAppStore } from "@/store/store";
import { useNavbar } from "@/lib/useNavbar";
import { supabase } from "@/lib/supabase";

const ProgressStats: React.FC = () => {
  const { stats, setStats } = useAppStore();
  const { user, isLoading: sessionLoading } = useNavbar();

  const totalProblems = problems.length;
  const solvedProblems =
    stats.easySolved + stats.mediumSolved + stats.hardSolved;

  useEffect(() => {
    if (user?.id) {
      useAppStore.getState().fetchStats(user.id);

      const channel = supabase
        .channel("profiles_changes")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${user.id}`,
          },
          (payload) => {
            setStats({
              easySolved: payload.new.easy_solved || 0,
              mediumSolved: payload.new.medium_solved || 0,
              hardSolved: payload.new.hard_solved || 0,
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setStats({ easySolved: 0, mediumSolved: 0, hardSolved: 0 });
    }
  }, [user, setStats]);

  if (!user || sessionLoading) {
    return <div className="text-gray-400">Loading progress...</div>;
  }

  return (
    <motion.div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Your Progress</h2>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg">
            <span className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {solvedProblems}
            </span>
            <span className="text-gray-400">
              {" "}
              / {totalProblems} problems solved
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(solvedProblems / totalProblems) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressStats;
