"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useNavbar } from "@/lib/useNavbar";
import Footer from "@/components/Footer";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { User, Mail, Calendar, Award, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/store";
import { problems } from "@/data/problems";

// Define types for user and stats
interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

interface Stats {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: string;
}

export default function Profile() {
  const { user, isLoading: sessionLoading } = useNavbar();
  const router = useRouter();
  const { stats, fetchStats, setStats } = useAppStore();
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Cursor effect (matching the hero section)
  const cursorX = useMotionValue<number>(-100);
  const cursorY = useMotionValue<number>(-100);

  // Spring physics for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const totalEasy = problems.filter((p) => p.difficulty === "Easy").length;
  const totalMedium = problems.filter((p) => p.difficulty === "Medium").length;
  const totalHard = problems.filter((p) => p.difficulty === "Hard").length;

  // Mouse movement effects (matching the hero section)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Create particles (matching the hero section)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        // Create particles
        const newParticles: Particle[] = [...Array(20)].map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.7,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 10,
          color:
            Math.random() > 0.7
              ? "#a29bfe"
              : Math.random() > 0.5
              ? "#6c5ce7"
              : "#00b894",
        }));

        setParticles(newParticles);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    if (!sessionLoading && !user) {
      router.push("/login");
      return;
    }

    if (user?.id) {
      // Fetch stats when the component mounts
      const loadStats = async () => {
        setIsStatsLoading(true);
        await fetchStats(user.id);
        setIsStatsLoading(false);
      };
      loadStats();

      // Set up real-time subscription
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
          (payload: { new: { easy_solved?: number; medium_solved?: number; hard_solved?: number } }) => {
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
  }, [user, sessionLoading, router, fetchStats, setStats]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#10101c] via-[#1a1a28] to-[#1e1e2e] text-white">
        <div className="animate-pulse text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (isStatsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#10101c] via-[#1a1a28] to-[#1e1e2e] text-white">
        <div className="animate-pulse text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]">
          Loading stats...
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background elements matching the hero section style */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#10101c] via-[#1a1a28] to-[#1e1e2e] -z-10"></div>

      {/* Perspective grid */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMDAgMCBMIDAgMCAwIDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwOCwgOTIsIDIzMSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30 -z-10"></div>

      {/* Gradient orbs */}
      <div
        className="fixed top-1/3 left-1/4 w-96 h-96 bg-[#6c5ce7]/10 rounded-full filter blur-[100px] opacity-50 animate-pulse -z-10"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="fixed bottom-1/4 right-1/3 w-80 h-80 bg-[#00b894]/10 rounded-full filter blur-[100px] opacity-30 animate-pulse -z-10"
        style={{ animationDuration: "12s" }}
      ></div>

      {/* Cursor follower */}
      <motion.div
        className="hidden md:block fixed w-32 h-32 rounded-full pointer-events-none z-0"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background:
            "radial-gradient(circle, rgba(108,92,231,0.1) 0%, rgba(108,92,231,0) 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated particles */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              filter: "blur(0px)",
            }}
            animate={{
              y: [
                particle.y,
                particle.y - 200 - Math.random() * 200,
                particle.y,
              ],
              x: [
                particle.x,
                particle.x +
                  (Math.random() > 0.5
                    ? 80 + Math.random() * 40
                    : -80 - Math.random() * 40),
                particle.x,
              ],
              opacity: [0, particle.opacity, 0],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <main className="min-h-screen pt-24 pb-16 px-4 text-white relative z-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/practice/categories"
              className="inline-flex items-center text-[#a29bfe] hover:text-[#6c5ce7] mb-6 transition-colors group"
            >
              <motion.span
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:text-[#6c5ce7]" />
                Back to Practice
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            className="bg-[#2d2d42]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#6c5ce7]/20 shadow-2xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <img
                  src={user.avatar_url || "/default-avatar.png"}
                  alt="User Avatar"
                  className="h-32 w-32 rounded-full border-4 border-[#6c5ce7] object-cover shadow-lg"
                />
                
                <motion.div
                  className="absolute bottom-0 right-0 flex space-x-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4 text-white" />
                  </button>
                </motion.div>
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.full_name || "Unknown User"}
                </h1>
                <p className="text-[#a0a0b0] text-lg">{user.email || "No email"}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="bg-[#2d2d42]/70 rounded-xl p-4 flex items-center space-x-4 border border-[#6c5ce7]/10"
                whileHover={{ y: -5, borderColor: "rgba(108, 92, 231, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Calendar className="h-6 w-6 text-[#a29bfe]" />
                <div>
                  <p className="text-[#a0a0b0]">Member Since</p>
                  <p className="font-semibold text-white">
                    {formatDate(user.created_at)}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#2d2d42]/70 rounded-xl p-4 flex items-center space-x-4 border border-[#6c5ce7]/10"
                whileHover={{ y: -5, borderColor: "rgba(108, 92, 231, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Award className="h-6 w-6 text-[#00b894]" />
                <div>
                  <p className="text-[#a0a0b0]">Total Problems Solved</p>
                  <p className="font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]">
                    {stats.easySolved + stats.mediumSolved + stats.hardSolved}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-white border-b border-[#6c5ce7]/20 pb-2 flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]">
                  Problem Solving Stats
                </span>
              </h2>
              <div className="space-y-6">
                {/* Easy Bar */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#00b894]">Easy</span>
                    <span className="text-[#a0a0b0]">
                      {stats.easySolved || 0} / {totalEasy || 0}
                    </span>
                  </div>
                  <div className="w-full bg-[#2d2d42] rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="bg-[#00b894] h-2.5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width:
                          totalEasy > 0
                            ? `${(stats.easySolved / totalEasy) * 100}%`
                            : "0%",
                      }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </motion.div>

                {/* Medium Bar */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-yellow-300">Medium</span>
                    <span className="text-[#a0a0b0]">
                      {stats.mediumSolved || 0} / {totalMedium || 0}
                    </span>
                  </div>
                  <div className="w-full bg-[#2d2d42] rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width:
                          totalMedium > 0
                            ? `${(stats.mediumSolved / totalMedium) * 100}%`
                            : "0%",
                      }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </motion.div>

                {/* Hard Bar */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-300">Hard</span>
                    <span className="text-[#a0a0b0]">
                      {stats.hardSolved || 0} / {totalHard || 0}
                    </span>
                  </div>
                  <div className="w-full bg-[#2d2d42] rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="bg-red-500 h-2.5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width:
                          totalHard > 0
                            ? `${(stats.hardSolved / totalHard) * 100}%`
                            : "0%",
                      }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-white border-b border-[#6c5ce7]/20 pb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a29bfe] to-[#00b894]">
                  Account Details
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center space-x-3 bg-[#2d2d42]/30 p-3 rounded-lg border border-[#6c5ce7]/10"
                  whileHover={{
                    backgroundColor: "rgba(45, 45, 66, 0.5)",
                    borderColor: "rgba(108, 92, 231, 0.2)",
                  }}
                >
                  <User className="h-5 w-5 text-[#a29bfe]" />
                  <span className="text-[#a0a0b0]">User ID:</span>
                  <span className="font-medium text-white">
                    {user.id.substring(0, 8)}...
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3 bg-[#2d2d42]/30 p-3 rounded-lg border border-[#6c5ce7]/10"
                  whileHover={{
                    backgroundColor: "rgba(45, 45, 66, 0.5)",
                    borderColor: "rgba(108, 92, 231, 0.2)",
                  }}
                >
                  <Mail className="h-5 w-5 text-[#00b894]" />
                  <span className="text-[#a0a0b0]">Verified Email:</span>
                  <span className="font-medium text-white">
                    {user.email ? "Yes" : "No"}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}