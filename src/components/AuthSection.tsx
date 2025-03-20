// AuthSection.tsx
"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { memo } from "react";

interface AuthSectionProps {
  user: any; // Consider typing this properly with an interface if possible
}

const AuthSection = ({ user }: AuthSectionProps) => {
  // Optional: Uncomment for debugging only
  // console.log("Received user in AuthSection:", user);

  // Skeleton UI during initial load (only if user is explicitly undefined and no cached data)
  if (user === undefined && !localStorage.getItem("cachedUser")) {
    return (
      <div className="h-8 w-8 rounded-full bg-[#3d3d5c] animate-pulse" />
    );
  }

  return user ? (
    <Link href="/profile">
      <img
        src={
          user.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.email?.split("@")[0] || "User"
          )}&size=256&background=4f46e5&color=fff`
        }
        alt="User Avatar"
        className="h-8 w-8 rounded-full border-2 border-[#a29bfe] cursor-pointer"
      />
    </Link>
  ) : (
    <Link
      href="/login"
      className="bg-[#6c5ce7] hover:bg-[#5a4ad1] text-white px-4 py-2 rounded-md flex items-center"
    >
      <LogIn className="h-4 w-4 mr-1" />
      <span>Login</span>
    </Link>
  );
};

// Memoize to prevent re-renders unless user changes
export default memo(AuthSection, (prevProps, nextProps) => {
  return (
    prevProps.user?.id === nextProps.user?.id &&
    prevProps.user?.avatar_url === nextProps.user?.avatar_url
  );
});