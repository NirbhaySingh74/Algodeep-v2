"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Code2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/lib/authStore";

function App() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  
  const {
    authView,
    loading,
    error,
    successMessage,
    email,
    password,
    fullName,
    setAuthView,
    setEmail,
    setPassword,
    setFullName,
    resetForm,
    clearMessages,
    handleSignIn,
    handleSignUp,
    handleResetPassword,
    checkSession,
  } = useAuthStore();

  // Check session on mount and redirect if authenticated
  useEffect(() => {
    const redirectIfAuthenticated = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        router.push("/practice/categories");
      }
    };

    redirectIfAuthenticated();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setShowToast(true); // Show toast on successful login
          setTimeout(() => {
            setShowToast(false); // Hide toast after 3 seconds
            router.push("/practice/categories");
          }, 3000);
        } else if (event === "SIGNED_OUT") {
          router.push("/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, checkSession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authView === "sign_in") {
      await handleSignIn();
    } else if (authView === "sign_up") {
      await handleSignUp();
    } else if (authView === "forgot_password") {
      await handleResetPassword();
    }
  };

  const switchAuthView = (view: "sign_in" | "sign_up" | "forgot_password") => {
    setAuthView(view);
    resetForm();
    clearMessages();
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-500">
          <div className="bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20">
            <span className="text-2xl animate-bounce">🎉</span>
            <div>
              <p className="font-bold text-lg">Welcome Back!</p>
              <p className="text-sm">Login Successful</p>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow bg-[#1e1e2e] flex items-center justify-center p-4 bg-gradient-to-br from-[#1e1e2e] to-[#2d2d42] overflow-hidden">
          <div className="w-full max-w-md relative mx-auto">
            {/* Decorative elements */}
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#6c5ce7]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-20 -right-16 w-40 h-40 bg-[#a29bfe]/10 rounded-full blur-xl"></div>

            {/* Card with glass effect */}
            <div className="backdrop-blur-md bg-[#1e1e2e]/70 border border-[#3d3d5c]/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Logo and Title */}
              <div className="text-center pt-8 pb-6 px-4 sm:px-6">
                <div className="flex justify-center mb-4 relative">
                  <div className="absolute -z-10 w-20 h-20 bg-[#a29bfe]/20 rounded-full blur-md"></div>
                  <Code2 className="h-14 w-14 text-[#a29bfe] drop-shadow-lg" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Welcome to AlgoGrid
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  {authView === "sign_in" 
                    ? "Sign in" 
                    : authView === "sign_up" 
                      ? "Sign up" 
                      : "Reset password"} to continue
                  your coding journey
                </p>
              </div>

              {/* Auth Toggle - Only show for sign in/up */}
              {authView !== "forgot_password" && (
                <div className="px-4 sm:px-6">
                  <div className="bg-[#282838] rounded-xl p-1 grid grid-cols-2 gap-1 mb-6">
                    <button
                      className={`py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base ${
                        authView === "sign_in"
                          ? "bg-[#6c5ce7] text-white shadow-md"
                          : "bg-transparent text-gray-300 hover:bg-gray-700/40"
                      }`}
                      onClick={() => switchAuthView("sign_in")}
                      disabled={loading}
                    >
                      Sign In
                    </button>
                    <button
                      className={`py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base ${
                        authView === "sign_up"
                          ? "bg-[#6c5ce7] text-white shadow-md"
                          : "bg-transparent text-gray-300 hover:bg-gray-700/40"
                      }`}
                      onClick={() => switchAuthView("sign_up")}
                      disabled={loading}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {/* Back button for forgot password */}
              {authView === "forgot_password" && (
                <div className="px-4 sm:px-6">
                  <button
                    onClick={() => switchAuthView("sign_in")}
                    className="flex items-center mb-6 text-gray-300 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span className="text-sm sm:text-base">Back to Sign In</span>
                  </button>
                </div>
              )}

              {/* Auth Form */}
              <div className="p-4 sm:p-6 pt-2">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Form Fields */}
                  {authView === "sign_up" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="full_name"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="full_name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-gray-800/70 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#6c5ce7]/70 focus:border-[#6c5ce7] focus:outline-none transition-all text-sm sm:text-base"
                          placeholder="Enter your full name"
                          disabled={loading}
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800/70 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#6c5ce7]/70 focus:border-[#6c5ce7] focus:outline-none transition-all text-sm sm:text-base"
                        placeholder="name@example.com"
                        disabled={loading}
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {(authView === "sign_in" || authView === "sign_up") && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Password
                        </label>
                        {authView === "sign_in" && (
                          <button
                            type="button"
                            onClick={() => switchAuthView("forgot_password")}
                            className="text-xs text-[#a29bfe] hover:text-[#6c5ce7] transition-colors"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-gray-800/70 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#6c5ce7]/70 focus:border-[#6c5ce7] focus:outline-none transition-all text-sm sm:text-base"
                          placeholder="••••••••"
                          disabled={loading}
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#6c5ce7] hover:bg-[#5a4bd1] text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors mt-4 sm:mt-6 shadow-lg shadow-[#6c5ce7]/20 flex items-center justify-center text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {authView === "sign_in" 
                          ? "Continue with Email" 
                          : authView === "sign_up" 
                            ? "Create Account" 
                            : "Send Reset Link"}
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-4">
                      <p className="text-red-400 text-sm text-center">
                        {error}
                      </p>
                    </div>
                  )}

                  {successMessage && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-4">
                      <p className="text-green-400 text-sm text-center">
                        {successMessage}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;