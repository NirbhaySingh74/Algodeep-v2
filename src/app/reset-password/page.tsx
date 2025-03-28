"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Code2, Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // New state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Please use the reset link from your email");
      }
    };
    checkSession();
  }, [router]);

  // Password validation
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
    return null;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    // console.log("Starting password reset...");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      // console.log("Passwords do not match");
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      // console.log("Password validation failed:", passwordError);
      return;
    }

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        setLoading(false);
        console.log("Supabase error:", error.message);
        return;
      }

      // Success
      setSuccessMessage("Password updated successfully");
      // console.log("Password updated successfully");

      // Check session and redirect
      const { data: { session } } = await supabase.auth.getSession();
      // console.log("Session after update:", session);

      setTimeout(() => {
        if (session) {
          // console.log("Redirecting to /practice/categories");
          router.push("/practice/categories");
        } else {
          // console.log("Redirecting to /login");
          router.push("/login");
        }
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      // console.log("Caught error:", err);
    } finally {
      setLoading(false);
      // console.log("Loading set to false");
    }
  };

  // console.log("Reset password page rendered");

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow bg-[#1e1e2e] flex items-center justify-center p-4 bg-gradient-to-br from-[#1e1e2e] to-[#2d2d42] overflow-hidden">
          <div className="w-full max-w-md relative mx-auto">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#6c5ce7]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-20 -right-16 w-40 h-40 bg-[#a29bfe]/10 rounded-full blur-xl"></div>
            <div className="backdrop-blur-md bg-[#1e1e2e]/70 border border-[#3d3d5c]/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="text-center pt-8 pb-6 px-4 sm:px-6">
                <div className="flex justify-center mb-4 relative">
                  <div className="absolute -z-10 w-20 h-20 bg-[#a29bfe]/20 rounded-full blur-md"></div>
                  <Code2 className="h-14 w-14 text-[#a29bfe] drop-shadow-lg" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Reset Your Password
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Enter a new password for your account
                </p>
              </div>
              <div className="p-4 sm:p-6 pt-2">
                <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-800/70 border border-gray-700 text-white rounded-lg pl-10 pr-10 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#6c5ce7]/70 focus:border-[#6c5ce7] focus:outline-none transition-all text-sm sm:text-base"
                        placeholder="••••••••"
                        disabled={loading}
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-800/70 border border-gray-700 text-white rounded-lg pl-10 pr-10 py-2.5 sm:py-3 focus:ring-2 focus:ring-[#6c5ce7]/70 focus:border-[#6c5ce7] focus:outline-none transition-all text-sm sm:text-base"
                        placeholder="••••••••"
                        disabled={loading}
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>Password must contain:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>At least 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one number</li>
                      <li>At least one special character</li>
                    </ul>
                  </div>
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  {successMessage && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg text-sm">
                      {successMessage}
                    </div>
                  )}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:from-[#6c5ce7]/90 hover:to-[#a29bfe]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6c5ce7] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
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
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </form>
                <div className="mt-5 text-center">
                  <button
                    onClick={() => router.push("/login")}
                    className="text-sm text-[#a29bfe] hover:text-[#a29bfe]/80 transition"
                  >
                    ← Back to login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;