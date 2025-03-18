"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useNavbar } from "@/lib/useNavbar"; // ✅ Use the custom hook
import Head from "next/head";
// import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Award,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function Profile() {
  const { user, isLoading } = useNavbar(); // ✅ Get user from useNavbar
  const router = useRouter();

  // Sign out function
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Redirect to login if no user
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="animate-pulse text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Profile - AlgoGrid</title>
        <meta name="description" content="Your professional profile on AlgoGrid" />
      </Head>

      {/* <Navbar /> */}

      <main className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/practice"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice
          </Link>

          <motion.div
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <img
                  src={user.avatar_url}
                  alt="User Avatar"
                  className="h-32 w-32 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
                />
                <div className="absolute bottom-0 right-0 flex space-x-2">
                  {/* <button
                    className="bg-indigo-600 p-2 rounded-full hover:bg-indigo-500 transition-colors"
                    title="Edit Profile"
                  > */}
                    {/* <Edit className="h-4 w-4 text-white" /> */}
                  {/* </button> */}
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{user.full_name}</h1>
                <p className="text-gray-400 text-lg">{user.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-indigo-400" />
                <div>
                  <p className="text-gray-300">Member Since</p>
                  <p className="font-semibold">{formatDate(user.created_at)}</p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4">
                <Award className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-300">Problems Solved</p>
                  <p className="font-semibold">{user.total_solved_problems}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                Account Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-indigo-400" />
                  <span className="text-gray-300">User ID:</span>
                  <span className="font-medium">{user.id}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Verified Email:</span>
                  <span className="font-medium">{user.email ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
