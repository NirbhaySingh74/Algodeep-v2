"use client";
import { useNavbar } from "@/lib/useNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Menu, X, BookOpen, Map, Github, LogIn } from "lucide-react";
import AuthSection from "./AuthSection";
import NavLinks from "./NavLinks";
import { useNavbarStore } from "@/store/useNavbarStore";
// import Image from "next/image";

const Navbar = () => {
  const { user, isLoading } = useNavbar();
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useNavbarStore();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [hasCachedUser, setHasCachedUser] = useState(false);

  // Check localStorage only on the client side
  useEffect(() => {
    setHasCachedUser(!!localStorage.getItem("cachedUser"));
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  useEffect(() => {
    if (!isLoading) setIsInitialRender(false);
  }, [isLoading]);

  const isActive = (path: string) =>
    pathname === path
      ? "text-white border-b-2 border-[#a29bfe]"
      : "text-[#a0a0b0] hover:text-white";

  // Only show loading on initial render if no cached user
  if (isLoading && isInitialRender && !hasCachedUser) {
    return (
      <motion.nav className="fixed w-full z-50 bg-[#1e1e2e]/90 backdrop-blur-sm border-b border-[#3d3d5c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Code2 className="h-8 w-8 text-[#a29bfe] mr-2" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">
                  AlgoGrid
                </span>
              </Link>
            </div>
            <div className="w-8 h-8 animate-pulse bg-[#3d3d5c] rounded-full" />{" "}
            {/* Skeleton */}
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav className="fixed w-full z-50 bg-[#1e1e2e]/90 backdrop-blur-sm border-b border-[#3d3d5c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Code2 className="h-8 w-8 text-[#a29bfe] mr-2" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">
                AlgoGrid
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-6">
            <NavLinks />
          </div>
          <div className="hidden md:block">
            <AuthSection user={user} />
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#a0a0b0] hover:text-white p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1e1e2e] border-b border-[#3d3d5c]"
          >
            <div className="px-4 pt-2 pb-4 space-y-4">
              <Link
                href="/practice/categories"
                className={`block py-2 ${isActive("/practice/categories")}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>Practice</span>
                </div>
              </Link>
              <Link
                href="/roadmap"
                className={`block py-2 ${isActive("/roadmap")}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Map className="h-5 w-5 mr-2" />
                  <span>Roadmap</span>
                </div>
              </Link>
              <a
                href="https://github.com/NirbhaySingh74"
                target="_blank"
                className="block py-2 text-[#a0a0b0] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Github className="h-5 w-5 mr-2" />
                  <span>GitHub</span>
                </div>
              </a>
              <div className="pt-2 border-t border-[#3d3d5c]">
                {user ? (
                  <Link
                    href="/profile"
                    className="flex items-center py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <img
                      src={
                        user.avatar_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.email?.split("@")[0] || "User"
                        )}&size=256&background=4f46e5&color=fff`
                      }
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full border-2 border-[#a29bfe] mr-3"
                    />
                    <span className="text-white">My Profile</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center py-2 text-[#a0a0b0] hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>Login / Sign Up</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
