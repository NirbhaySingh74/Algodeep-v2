// components/Sidebar.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Code2,
  LayoutGrid,
  Building2,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAppStore } from "@/store/store";
import { problems } from "@/data/problems";
import { useNavbar } from "@/lib/useNavbar";
import { supabase } from "@/lib/supabase";

const sidebarVariants = {
  expanded: { width: "280px" },
  collapsed: { width: "80px" },
};

const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    setSelectedCompany,
    setSelectedCategory,
    stats,
    setStats,
  } = useAppStore();
  const pathname = usePathname();
  const { user, isLoading: sessionLoading } = useNavbar();

  const totalEasy = problems.filter((p) => p.difficulty === "Easy").length;
  const totalMedium = problems.filter((p) => p.difficulty === "Medium").length;
  const totalHard = problems.filter((p) => p.difficulty === "Hard").length;

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) {
        setStats({ easySolved: 0, mediumSolved: 0, hardSolved: 0 });
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("easy_solved, medium_solved, hard_solved")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setStats({
          easySolved: data?.easy_solved || 0,
          mediumSolved: data?.medium_solved || 0,
          hardSolved: data?.hard_solved || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();

    if (user?.id) {
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
    }
  }, [user, setStats]);

  const isCategoriesView = pathname === "/practice/categories";
  const isCompaniesView = pathname
    ? pathname === "/practice/companies" || pathname.startsWith("/practice/companies/")
    : false;
console.log("user", user);

  return (
    <motion.div
      className="fixed top-16 left-0 h-[calc(100vh-64px)] bg-gray-900 flex flex-col z-10 border-r border-gray-800"
      initial="expanded"
      animate={sidebarCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Top Branding Section */}
      <div className="p-4 flex items-center border-b border-gray-800">
        <Code2 className="h-7 w-7 text-indigo-400 mr-3" />
        {!sidebarCollapsed && (
          <Link href="/">
            <motion.span
              className="cursor-pointer text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              AlgoGrid
            </motion.span>
          </Link>
        )}
        <motion.button
          className="ml-auto text-gray-400 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {/* Navigation and Stats Section */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-6">
          <h3
            className={`text-lg font-medium mb-3 ${
              sidebarCollapsed ? "text-center" : "text-gray-200"
            }`}
          >
            {!sidebarCollapsed ? "Problems" : ""}
          </h3>
          <Link href="/practice/companies">
            <motion.div
              className={`flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded ${
                isCompaniesView ? "bg-gray-800" : ""
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedCategory(null);
                setSelectedCompany(null);
              }}
            >
              <Building2 className="h-5 w-5 text-indigo-400 mr-2" />
              {!sidebarCollapsed && <span className="text-gray-200">By Company</span>}
            </motion.div>
          </Link>
          <Link href="/practice/categories">
            <motion.div
              className={`flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded mt-2 ${
                isCategoriesView ? "bg-gray-800" : ""
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedCompany(null);
              }}
            >
              <LayoutGrid className="h-5 w-5 text-indigo-400 mr-2" />
              {!sidebarCollapsed && <span className="text-gray-200">By Category</span>}
            </motion.div>
          </Link>
        </div>

        {/* Stats Section */}
        {!sidebarCollapsed && isCategoriesView && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-gray-200">Stats</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-300">Easy</span>
                  <span className="text-gray-400">
                    {stats.easySolved} / {totalEasy}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${(stats.easySolved / totalEasy) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-yellow-300">Medium</span>
                  <span className="text-gray-400">
                    {stats.mediumSolved} / {totalMedium}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{
                      width: `${(stats.mediumSolved / totalMedium) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-300">Hard</span>
                  <span className="text-gray-400">
                    {stats.hardSolved} / {totalHard}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{
                      width: `${(stats.hardSolved / totalHard) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800 flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <motion.span className="ml-2 text-gray-200">
          {user?.full_name ? user.full_name : "Login"}
        </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;